---
id: container-security
title: Container Security
---

Container security is a critical component of the framework. Kubernetes in its vanilla form is by design open, but that also means that to a certain extent Kuberentes is insecure. In a multi-tenant context this statement holds even more truth. Container security in Kubernetes can be seen from two different perspectives. One is protecting the cluster from being exploited by maliciously configured Pods. The other is mitigating the attack surface of an application in a cluster. Sometimes these two perspectives are one and the same. XKF tries to balance between enforcing good security practices by default while allowing for developer flexibility. For this reason some security measures are required while others are merely recommendations to help developers achieve a higher security standard.

## Default Security Context

All Pods in the cluster will have a default security context enforced. Any default security context setting which has not been configured properly when applying the Pod to the cluster will be automatically set before the Pod is created. No action has to be taken from the end user but it is important to be aware that the Pod applied may not be identical to the Pod created and what these settings mean.

The Pod below is the most basic yet valid Pod which can be applied to a Kubernetes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: busybox:1.35.0
```

When applied to an XKF Kubernetes cluster the following mutations occur.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: busybox:1.35.0
      securityContext:
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - NET_RAW
            - CAP_SYS
```

### Read Only Root Filesystem

This setting is the one that may have the largest impact on a deployed application if it is expected to write to the file system. Containers may be ephemeral but that does not mean that certain applications may still want to write temporary files. Enabling read only root filesystem blocks the container from writing to its filesystem by default. The reasoning for this is that if an attacker is able to gain access to a container the attacker will not be able to modify any files or add any additional binaries to the container.

Of course there is a solution for applications that still do want to write to the filesystem. The solution is to create an [`emptyDir`](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir) volume and mount it to the directory to which files should be written. In the example below the `emptyDir` volume `tmp` is mounted to the path `/tmp` making it possible to write files to the directory.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: app
      image: busybox:1.35.0
      securityContext:
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop:
            - NET_RAW
            - CAP_SYS_ADMIN
      volumeMounts:
        - mountPath: /tmp
          name: tmp
  volumes:
    - emptyDir: {}
      name: tmp
```

### Allow Privilege Escalation

Disabling privilege escalation for all Pods is critical for applications to not gain greater access to the Node than they need to. This setting will probably never affect most applications.

### Dropped Capabilities

Linux capabilities are certain root permissions that can be given to containers without giving root access. Certain capabilities should never be given to a container as they would give too much access, for this reason they are always dropped.

* `CAP_SYS_ADMIN` - Is the same as making the container root, as it would allow a container to escalate privileges.
* `NET_RAW` - Allows a container to craft raw network packets which can be exploited for malicious actions.

## Pod Constraints

In addition to the default security context there are certain configuration settings which are not allowed in XKF. They have a lower impact on end users as they are opted into, but they are good to be aware of and can explain why a Pods creation may be blocked by the cluster. The enforcement is done before the Pod is created, this means that a Deployment may be allowed to be created but the Pods that result will not, causing a Deployment to always have zero replicas.

### Host Namespaces

Being able to share process IDs or memory between a container and a host means that the container would in theory have access to the host or any containers also running on the host. Setting `hostPID` or `hostIPC` to `true` would allow for this to happen. For this reason that is not allowed.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  hostPID: true
  hostIPC: true
```

### Host Networking

Allowing a Pod access to the host network namespace would mean giving it access to the hosts loopback device and enable it to listen to the network traffic of all Pods on the host.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  hostNetwork: true
```

Using a host port for a Pod's container will result in binding that hosts port to the container port. This would expose the container to the network outside of the cluster. This can cause issues in cases where the ports have to be unique, and is generally a feature that is not needed in XKF, which is why it is not allowed.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - ports:
        - hostPort: 10902
```

### Privileged Containers

Privileged containers have root capabilities on the host machine and are therefore not allowed in XKF. There would be no separation between the container and the host if this setting were to be allowed.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - securityContext:
        privileged: true
```

### Capabilities

As stated in the default security context section certain capabilities will always be dropped. It is however also possible to grant capabilities to a Pod. Therefore any Pods that attempt to add extra capabilities are not allowed, as it could lead to privilege escalation.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - securityContext:
        capabilities:
          add:
            - NEW_RAW
```

### Proc Mount

There are certain files in the `/proc` directory that may be sensitive if exposed to a container. By default the container runtime will apply a filter to the files mounted to the container from the directory, so opting out of it is not allowed.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - securityContext:
        procMount: UnmaskedProcMount
```

### Volume Type

The types of volumes are limited to a known set to mitigate host path mounting and the use of unknown volume types. The allowed volume types cover the majority of use cases. The following volume types are currently allowed in XKF, `configMap`, `downwardAPI`, `emptyDir`, `persistentVolumeClaim`, `secret`, `projected`, `csi`.

As stated before blocking any `hostPath` volumes is critical as mounting certain directories or files on the host would give a container insight to or control over the host.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  volumes:
    - hostPath:
        path: /proc
```

### Flex Volumes

[Flex Volumes](https://kubernetes.io/docs/concepts/storage/volumes/#flexvolume) are a deprecated type of volume that are no longer maintained in the Kubernetes project. Flex volume drives are not installed in XKF clusters but are still not allowed to be used.

## Non Root User

A common practice for a lot of images is to, by default, run the containers as the user root. It is widespread because it is the deafault in a lot of the base images, but it does not mean that it is the best choice. Running the container as root is generally not a problem as it is not the same as root on the node. It does however become a problem when new container runtime vulnerabilities are found which allow escaping the sandbox. An example of such a vulnerability is [CVE-2019-5736](https://avd.aquasec.com/nvd/2019/cve-2019-5736/) which allowed containers running as root users to escalate its privileges to becoming root on the node. A mitigation for this vulnerability would have been to make sure that the container is running as user other than root. With the knowledge that the mitigation for future container vulnerabilities is so simple it would be lazy not to take the precautionary steps.

Changing the user has to be solved both at the source of the image and in Kubernetes to ensure no issues appear. A common problem is that the new non root user does not have the correct permissions for required files and directories.
A general recommendation is also to use a user ID (UID) and group ID (GID) greater than `10000` to avoid overlapping with other system users.

Create a Dockerfile which changes the UID and GID from the default of the base image.

```Dockerfile
FROM alpine:latest
RUN addgroup -g 10000 app && adduser -u 10000 -G app -D app
USER 10000

```

Configure the Pod that that is runs with a non root user. The field `runAsUser` has to be configured when `runAsNonRoot` is set to `true`. Set both these values to be the UID and GID configured in the Dockerfile.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 10000
    runAsGroup: 10000
```

In the future enforcement of running as a non root users will be handled by XKF. When this is enabled a containers attempting to run with the UID 0 will not be permitted. The minimum UID and GID will also be enforced to `10000`.

## Seccomp

Secure computing mode ([seccomp](https://docs.docker.com/engine/security/seccomp/)) is a pod wide securityContext setting and is a way to restrict which system calls a application can make inside a container.

XKF is configured to mutate all Pods, which do not specify a seccomp profile, with the profiler `RuntimeDefault`.
This is a security measure to give you as a developer a good base to stand-on while minimizing the risk of getting issues in your application.

It is possible to use a different profile if the application for some reason does not work as intended with the `RuntimeDefault`profile. To allow all system calls the application can use the profile `Unconfined`. The Pod will not be mutated as long as a seccomp profile has been set in the security context.

```.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test
spec:
  securityContext:
    seccompProfile:
      type: Unconfined
  containers:
    - command:
        - /bin/sh
      resources:
        requests:
          memory: "16Mi"
          cpu: "10m"
        limits:
          memory: "64Mi"
          cpu: "100m"
      image: alpine:latest
      name: container-00
      tty: true
```

To see which system calls is disabled in `RuntimeDefault` the most human readable option we have found is [dockers profile page](https://docs.docker.com/engine/security/seccomp/#significant-syscalls-blocked-by-the-default-profile).
Another option is to read the containerd [code](https://github.com/containerd/containerd/blob/v1.6.1/contrib/seccomp/seccomp_default.go), they might not be identical but it's close enough.

RuntimeDefault isn't a ideal solution and in the long run we hope to add support to something like [security-profile-operator](https://github.com/kubernetes-sigs/security-profiles-operator) to XKF.

## Vulnerability Reports

Containers can use the same image for a very long time, either because the application has not been updated for a long time, or because an external image is used and not updated as new versions are released. These old image versions may collect security vulnerabilities as new ones are discovered and patched in later releases, but it does not mean that an image is insecure just because an image version is old. XKF helps developers detect security vulnerabilities in container images with the help of [Starboard](https://github.com/aquasecurity/starboard/). One thing Starboard does is to continuously scan images used in the cluster with the help of [Trivy](https://github.com/aquasecurity/trivy/). Any vulnerability found will be stored as a resource in the Namespace in which it was found in.

View all the vulnerability reports that exists in the current namespace.

```shell
kubectl get vulnerabilityreports
```

Describe a specific vulnerability report to view specific details.

```shell
kubectl describe vulnerabilityreports.aquasecurity.github.io <report-name>
```

Below is an example of how the output may look. It includes information of the scanner used, when the scan was run, and the vulnerabilities found. Each vulnerability has a CVE ID and a link for more information about the vulnerability.

```yaml
Report:
  Scanner:
    Name:     Trivy
    Vendor:   Aqua Security
    Version:  0.24.3
  Summary:
    Critical Count:  0
    High Count:      3
    Low Count:       0
    Medium Count:    1
    Unknown Count:   0
  Update Timestamp:  2022-04-04T08:49:01Z
  Vulnerabilities:
    Fixed Version:      1.1.1n-r0
    Installed Version:  1.1.1l-r0
    Links:
    Primary Link:       https://avd.aquasec.com/nvd/cve-2022-0778
    Resource:           libcrypto1.1
    Score:              7.5
    Severity:           HIGH
    Title:              openssl: Infinite loop in BN_mod_sqrt() reachable when parsing certificates
    Vulnerability ID:   CVE-2022-0778
    Fixed Version:      3.3.3p1-r3
    Installed Version:  3.3.3p1-r2
    Links:
    Primary Link:       https://avd.aquasec.com/nvd/cve-2022-0778
    Resource:           libretls
    Score:              7.5
    Severity:           HIGH
    Title:              openssl: Infinite loop in BN_mod_sqrt() reachable when parsing certificates
    Vulnerability ID:   CVE-2022-0778
    Fixed Version:      1.1.1n-r0
    Installed Version:  1.1.1l-r0
    Links:
    Primary Link:       https://avd.aquasec.com/nvd/cve-2022-0778
    Resource:           libssl1.1
    Score:              7.5
    Severity:           HIGH
    Title:              openssl: Infinite loop in BN_mod_sqrt() reachable when parsing certificates
    Vulnerability ID:   CVE-2022-0778
    Fixed Version:      1.2.12-r0
    Installed Version:  1.2.11-r3
    Links:
    Primary Link:      https://avd.aquasec.com/nvd/cve-2018-25032
    Resource:          zlib
    Score:             4.4
    Severity:          MEDIUM
    Title:             zlib: A flaw in zlib-1.2.11 when compressing (not decompressing!) certain inputs.
    Vulnerability ID:  CVE-2018-25032
```

The presence of a vulnerability does not mean that a patched version exists yet, or even that the image is inherently insecure. The vulnerability may affect components that are not used or have low risk to being exposed. It is however important to be conscious of the vulnerabilities that exist and consider future work to take responsibility for fixing them. Refer to the [official Starboard documentation](https://aquasecurity.github.io/starboard/latest/faq) for more specific documentation.
