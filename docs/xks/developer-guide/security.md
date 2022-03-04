---
id: security
title: Security
---

## Constraint Policies

Certain policies will always be enforced in the cluster as a guard rail to minimize the risk of security exposures. The policies are implemented on the Kubernetes API level so that
any request to create or update a Kubernetes resource will first have to pass through the policy check. If the resource in question does not comform to the policy it will be rejected
<<<<<<< HEAD
by the API server when applying the change. Knowing this is important as certain features or options documented on the internet may not be availible or restricted in the XKS service.
This can include things like certain types of volume mounts, labeling requirements or container capabilities for a pod.
=======
by the API server when applying the change. Knowing this is important as certain features or options documented on the Internet may not be available or are restricted in the XKS service.
This can include things like certain types of volume mounts, labeling requirements or container capabilities for a Pod.
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
A product we use to achieve this is OPA (Open Policy Agent) Gatekeeper, in which we have a set of rules defining how we allow containers to be created. To simplify this for developers, these rules are applied automatically to all Pods created to achive our set standard.
You can read more in [their documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/howto/)
And in [our library](https://github.com/XenitAB/gatekeeper-library)
>>>>>>> a41b39fcc... Small fixes based on feedback

A product we use to achieve this is OPA (Open Policy Agent) Gatekeeper, in which we have a set of rules defining how we allow containers to be created. To simplify this for developers, these rules are applied automatically to all Pods created to achive our set standard.
You can read more in [their documentation](https://open-policy-agent.github.io/gatekeeper/website/docs/howto/)
And XKS SecurityContext definitions in [our library](https://github.com/XenitAB/gatekeeper-library)

## Security Features

### SecurityContext

We have applied basic SecurityContext automatically with OPA Gatekeeper to all Pods in your tenant namespace. The basic YAML code is described below. This configuration is enforced to both initcontainers and containers but you may still want to add this configuration to your manifests to be explicit about the limitations under which containers operate.

```yaml
    securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - NET_RAW
          readOnlyRootFilesystem: true
```

`allowPrivilegeEscalation` is set to `false` to not allow processes to start with higher privileges than its parent.
Kubernetes default configuration assigns the NET_RAW capability to containers in order to allow them to send and receive ICMP packets. However, if an attacker were to get access to the container, dropping this will constrain a variety of network exploits. The most important part of dropping NET_RAW is to stop containers from opening "raw" sockets and allowing IP packets to bypass kernel sanity checks.

`readOnlyRootFilesystem: true` to make sure containers can not write to the root filesystems and to make it harder for an attacker to inject malicious code into a container by overwriting existing files.

XKS enforces `runAsNonRoot: true`, you need to specify a UID for the container entrypoint. In container images that you build yourself, you can use the USER directive to specify a UID, like so:

```bash
FROM ubuntu:latest
RUN useradd -u 1000 -g 1000 appuser
USER appuser
```

For container images built by others, you can use runAsUser and runAsGroup in the security context to specify an override for that container (equivalent to docker run --user):

```yaml
    securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          readOnlyRootFilesystem: true
          runAsGroup: 1000
          runAsNonRoot: true
          runAsUser: 1000
```
<<<<<<< HEAD
This is required SecurityContext configuration of the pod to be able to run, we higly encourage you to improve this configuration where applicable to further improve security.
>>>>>>> ce8055a06... Add initila docs for OPA & SecurityContext
=======

<<<<<<< HEAD
 The `runAsUser` field specifies that for any Containers in the Pod, all processes run with user ID 1000. The runAsGroup field specifies the primary group ID of 1000 for all processes within any containers of the Pod. If this field is not set, the primary group ID of the containers will be root. Using `runAsNonRoot: true` forces the containers to not be able to run as root, it will require a defined non-zero numeric USER directive defined in the container image.
 Below is a basic example for defining a user `appuser` with a UID of `1000` and in a primary group with GID `1000` in the Dockerfile:

```bash
FROM ubuntu:latest
RUN useradd -u 1000 -g 1000 appuser
USER appuser
```

<<<<<<< HEAD
<<<<<<< HEAD
You can read more in the official documentation
<https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>
>>>>>>> afee14d0e... Add docs from feedback
=======
You can read more in the [official documentation](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
>>>>>>> 86a14c5b3... Small fixes based on feedback
=======
=======
>>>>>>> 3c84c040f... Fixed based on feedback
You can read more in the official documentation on [Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)

### Temporary file storage

We don't allow data to be written to our root file system. There is a workaround for this if your applications needs to write to for example a temp disk. If so, you need to mount a disk, most cases can be solved with an emptyDir, it enables you to write small amounts of data to /tmp.

All containers in the Pod can read and write the same files in the emptyDir volume, and can be mounted to different paths in each container. When the Pod is removed, the data in the emptyDir is deleted permanently.
An example configuration of a basic emptyDir mounted to /tmp is:

```yaml
  spec:
    containers:
      volumeMounts:
      - mountPath: /tmp
        name: temp
    volumes:
    - name: temp
      emptyDir: {}
```

You can read more in the official documentation on [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> d1848c7cd... Add more documentation
=======
=======
```yaml
    securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          readOnlyRootFilesystem: true
          runAsGroup: 1000
          runAsNonRoot: true
          runAsUser: 1000
```

 The `runAsUser` field specifies that for any Containers in the Pod, all processes run with user ID 1000. The runAsGroup field specifies the primary group ID of 3000 for all processes within any containers of the Pod

You can read more in the official documentation
<https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>
>>>>>>> Add docs from feedback
>>>>>>> 738876861... Add docs from feedback
=======
>>>>>>> 873ec4eb1... Small fixes based on feedback
=======
=======

>>>>>>> 3598327c8... Add docs from feedback
## Security Features

### SecurityContext

We have applied basic SecurityContext automatically with OPA Gatekeeper to all Pods in your XKS clusters. The basic YAML code is described below. This configuration is enforced to both initcontainers and containers but you may still want to add this configuration to your manifests to be explicit about the limitations under which containers operate.

```yaml
    securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - NET_RAW
          readOnlyRootFilesystem: true
```

`allowPrivilegeEscalation` is set to `false` to not allow processes to start with higher privileges than its parent.

NET_RAW is a default setting in Kubernetes to allow ICMP traffic between containers and enables an application to craft raw packets.
If an attacker were to get access to the containers, dropping this will constrain a variety of network exploits.

`readOnlyRootFilesystem` is set to `true` to make sure containers can not write to the root filesystems.

This is the required SecurityContext configuration of the Pod to be able to run, we higly encourage you to improve this configuration where applicable to further improve security.
For example:

```yaml
    securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          readOnlyRootFilesystem: true
          runAsGroup: 1000
          runAsNonRoot: true
          runAsUser: 1000
```
<<<<<<< HEAD
This is required SecurityContext configuration of the pod to be able to run, we higly encourage you to improve this configuration where applicable to further improve security.
>>>>>>> b8083b7b0... Add initila docs for OPA & SecurityContext
=======

 The `runAsUser` field specifies that for any Containers in the Pod, all processes run with user ID 1000. The runAsGroup field specifies the primary group ID of 1000 for all processes within any containers of the Pod

<<<<<<< HEAD
You can read more in the official documentation
<https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>
>>>>>>> 3598327c8... Add docs from feedback
=======
You can read more in the [official documentation](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
>>>>>>> a41b39fcc... Small fixes based on feedback
