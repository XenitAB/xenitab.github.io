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

## Security Features

### OPA Gatekeeper

OPA (Open Policy Agent) Gatekeeper is a product in which we have a set of rules defining how we allow containers to be created. To simplify this for the developers these rules are then applied automatically to all Pods created to achive our set standard.
You can read more in their documentation: <https://open-policy-agent.github.io/gatekeeper/website/docs/howto/>
And in our library: <https://github.com/XenitAB/gatekeeper-library>

### SecurityContext

We have applied basic SecurityContext automatically with OPA Gatekeeper to all Pods in our XKS clusters. The basic YAML code is described below. This configuration is applied to both initcontainers and containers and we encourage you to set this up in your own gitops repository to make it more visible for developers.

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

`readOnlyRootFilesystem` is set to `true` to make sure containers cant write to the root filesystems.

An emptyDir volume is created when a Pod is assigned to a node and exists while that Pod is running. The emptyDir volume is initially empty. All containers in the Pod can read and write the same files in the emptyDir volume and can be mounted to different paths in each container. When the Pod is removed, the data in the emptyDir is deleted permanently.

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
>>>>>>> ce8055a06... Add initila docs for OPA & SecurityContext
=======

 The `runAsUser` field specifies that for any Containers in the Pod, all processes run with user ID 1000. The runAsGroup field specifies the primary group ID of 3000 for all processes within any containers of the Pod

You can read more in the official documentation
<https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>
>>>>>>> afee14d0e... Add docs from feedback
