---
id: security
title: Security
---

## Network Policies

By default each namespace is limited in the permitted network trafic. Pods in the namespaces are allowed to egress freely out to the internet and comminicate with other pods
in the same namespace. It is however restricted when it comes to communicating with other pods in other namespaces, unless explicitly configured to be allowed this is not possible.

## Constraint Policies

Certain policies will always be enforced in the cluster as a guard rail to minimize the risk of security exposures. The policies are implemented on the Kubernetes API level so that
any request to create or update a Kubernetes resource will first have to pass through the policy check. If the resource in question does not comform to the policy it will be rejected
by the API server when applying the change. Knowing this is important as certain features or options documented on the internet may not be availible or restricted in the XKS service.
This can include things like certain types of volume mounts, labeling requirements or container capabilities for a pod.
