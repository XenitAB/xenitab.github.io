---
id: security
title: Security
---

## Constraint Policies

Certain policies will always be enforced in the cluster as a guard rail to minimize the risk of security exposures. The policies are implemented on the Kubernetes API level so that
any request to create or update a Kubernetes resource will first have to pass through the policy check. If the resource in question does not comform to the policy it will be rejected
by the API server when applying the change. Knowing this is important as certain features or options documented on the Internet may not be available or are restricted in the XKS service.
This can include things like certain types of volume mounts, labeling requirements or container capabilities for a Pod.

## Seccomp

Secure computing mode ([seccomp](https://docs.docker.com/engine/security/seccomp/))  is a pod wide securityContext setting and is a way to restrict which system calls a application can make inside a container.

XKF is configured to mutate all Pods, which do not specify a seccomp profile, with the profiler `RuntimeDefault`.
This is a security measure to give you as a developer a good base to stand-on while minimizing the risk of getting issues in your application.

If your application for some reason don't work as intended with the RuntimeDefault you can always use another profile.
To allow all system calls you can use `Unconfined`. As long as you have defined a seccompProfile in your securityContext of the pod
the mutating webhook won't perform any changes to to the seccompProfile.

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
This to be able to remove even more system calls but at the same time make it easy for you as a developer.
