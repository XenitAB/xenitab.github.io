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

OPA Gatekeeper is a product in which we have a set of rules defining how we allow containers to be created. To simplify this for the developers these rules are then applied automatically to all pods created to achive our set standard. 
### SecurityContext

To limit what a container can do, we have applied basic SecurityContext automatically with OPA Gatekeeper to all pods in our XKS clusters. The basic YAML code is described below.
```yaml
        securityContext:
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - NET_RAW
      readOnlyRootFilesystem: true
```
This is required SecurityContext configuration of the pod to be able to run, we higly encourage you to improve this configuration where applicable to further improve security.
>>>>>>> ce8055a06... Add initila docs for OPA & SecurityContext
