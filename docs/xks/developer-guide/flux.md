---
id: flux
title: Flux
---

Flux is very tightly coupled with XKF and it's how we deploy all tenant yaml to our clusters.
The goal of this document is to give you as a developer a quick overview of
how to get use flux in XKF and perform simple debugging tasks.
Flux have it's own [official documentation](https://fluxcd.io/) and where you can find much more information.

Before reading any further please read through the [core concepts](https://fluxcd.io/docs/concepts/) of flux.

## CLI

You don't have to use the cli but it can be very helpful especially if want to force a reconcile of a flux resource.
In some of the commands and debugging we assume that you have the cli installed.

Here you can find more information on how to setup the [flux cli](https://fluxcd.io/docs/installation/).

## XKF and flux

In the XKF framework we talk allot about tenants, from a Kubernetes point of view a tenant is a namespace that have been generated using terraform.
If you want more information how that works you can look at the [AZDO module](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-azdo)
and the [GitHub module](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-github).

What these modules do is to setup a basic config with a flux gitRepository and Kustomization pointing to a pre-defined repository and path.
It stores this in a central repository that normally your platform team manages and it should only be updated using terraform.

At the time of writing these docs the files generated could look something like this if you are using Azure DevOps (AZDO) and [AZDO-proxy](https://github.com/XenitAB/azdo-proxy).

```yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: GitRepository
metadata:
  name: tenant1
  namespace: tenant1
spec:
  # If you are using github libgit2 won't be defined
  gitImplementation: libgit2
  interval: 1m
  # This example url assumes that you are using AZDO-proxy https://github.com/XenitAB/azdo-proxy
  url: http://azdo-proxy.flux-system.svc.cluster.local/Org1/project1/_git/gitops
  secretRef:
    name: flux
  ref:
    branch: main
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: tenant1
  namespace: tenant1
spec:
  serviceAccountName: flux
  interval: 5m
  path: ./tenant/dev
  sourceRef:
    kind: GitRepository
    name: tenant1
  prune: true
  validation: client
```

As a member of tenant1 you will be able to see this data in your namespace, in this case tenant1.
You should never update this config manually, flux will automatically change back to the config defined in the git repository.
