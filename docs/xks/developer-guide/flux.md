---
id: flux
title: Flux
---

Flux is very tightly coupled with XKF and it's how we deploy all tenant yaml to our clusters.
The goal of this document is to give you as a developer a quick overview of
how to get use flux in XKF and perform simple debugging tasks.
Flux has it's own [official documentation](https://fluxcd.io/) and where you can find much more information.

> In this document we are only talking about Flux v2
> Before reading any further please read through the [core concepts](https://fluxcd.io/docs/concepts/) of flux.

Our very own Philip Laine [presented](https://www.youtube.com/watch?v=F7B_TBcIyl8) on KubeCon 2021 show a similar workflow that we use.

## Flux CLI

You don't have to use the flux cli but it can be very helpful especially if want to force a reconcile of a flux resource.
In some of the commands and debugging we assume that you have the cli installed.
Here you can find more information on how to setup the [flux cli](https://fluxcd.io/docs/installation/).

## XKF and Flux

In the XKF framework we talk allot about tenants, from a Kubernetes point of view a tenant is a namespace that have been generated using terraform.
If you want more information how that works you can look at the [AZDO module](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-azdo)
and the [GitHub module](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/fluxcd-v2-github).

The module populate the tenant namespaces by creating a basic config with a flux gitRepository and Kustomization pointing to a pre-defined repository and path.
It stores this in a central repository that normally your platform team manages and it should only be updated using terraform.

At the time of writing these docs the files generated could look something like this if you are using Azure DevOps (AZDO) and [AZDO-proxy](https://github.com/XenitAB/azdo-proxy).

As a member of tenant1 you will be able to see these resources in your namespace, in this case tenant1.
You should never modify these resources manually, flux will automatically change back to the config defined in the git repository.

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

## Debugging

Below, you will find a few good base commands to debug why flux haven't applied your changes.

### Normal error

When adding a new file to your GitOps repository don't forget to update the `kustomization.yaml` file.

It can easily happen that you create a file in your repository and you commit it and when you look in the cluster it haven't been synced.
This is most likely due to that you have missed to update the kustomization.yaml file.

```kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - ingress.yaml
  - networkpolicy.yaml
```

### git repositories

Shows you the status if your changes have been synced to the cluster.

```shell
$ kubectl get gitrepositories
NAME   URL                                                                         READY   STATUS                                                            AGE
wt     http://azdo-proxy.flux-system.svc.cluster.local/Org1/project1/_git/gitops   True    Fetched revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   2d2h
```

Flux should automatically pull the changes to the cluster but if you think they sync takes
to long time or you want to sync it for some other reason you can.

> Remember to provide the --namespace flag, else flux will assume the source is in the flux-system namespace.

```shell
flux reconcile source git tenant1 --namespace tenant1
```

### Kustomization

It's always good to check if flux have applied your changes and if your health checks have passed.
Overall the sha of your source and the kustomization resource should be the same.

```shell
$ kubectl get kustomizations
NAME       READY   STATUS                                                            AGE
apps-dev   True    Applied revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   47h
tenant1    True    Applied revision: main/9baa401630894b78ecc5fa5ebdf72c978583dea8   2d2h
```
