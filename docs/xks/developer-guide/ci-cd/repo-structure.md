---
id: structure
title: GitOps Repository Structure
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Repository Structure

There are 2 ways one can structure the GitOps repository, based upon how you want the kustomizations in flux to work.

- Per ENV kustomization
  - Somewhat easier to maintain and configure, every app relies on one reconciliation of the kustomization.
  - One kustomization per ENV in the Flux-configuration, looking something like this:

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: apps-dev
spec:
  serviceAccountName: flux
  interval: "1m"
  timeout: "30s"
  prune: true
  sourceRef:
    kind: GitRepository
    name: giops
  path: "./apps/dev"

```

- Per APP kustomization
  - More granular control and every app has its own reconciliation and kustomization.
  - One kustomization per app in the Flux-configuration, looking something like this:

```yaml
  apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: app1-dev
spec:
  serviceAccountName: flux
  interval: "1m"
  timeout: "30s"
  prune: true
  sourceRef:
    kind: GitRepository
    name: gitops
  path: "./App1/dev"
```

Below we will show examples of the repository structure to achieve both cases.

### Per ENV - Repository Structure

```bash

GitOps
  ├── Apps/
  │   ├── dev/
  │   │   ├── kustomization.yaml
  │   │   ├── App1/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment.yaml
  │   │   │    ├── service.yaml
  │   │   │    └── ingress.yaml
  │   │   ├── App2/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment.yaml
  │   │   │    ├── service.yaml
  │   │   │    └── ingress.yaml
  │   │   ├── secret-provider-class-patch.yaml
  │   │   ├── certificate.yaml
  │   ├── qa/
  │   │   ├── kustomization.yaml
  │   │   ├── App1/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment.yaml
  │   │   │    ├── service.yaml
  │   │   │    └── ingress.yaml
  │   │   ├── App2/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment.yaml
  │   │   │    ├── service.yaml
  │   │   │    └── ingress.yaml
  │   │   ├── secret-provider-class-patch.yaml
  │   │   ├── certificate.yaml
  │   ├── prod/
  │   │   ├── kustomization.yaml
  │   │   ├── App1/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment-patch.yaml
  │   │   │    └── ingress-patch.yaml
  │   │   ├── App2/
  │   │   │    ├── kustomization.yaml
  │   │   │    ├── deployment-patch.yaml
  │   │   │    └── ingress-patch.yaml
  │   │   ├── secret-provider-class-patch.yaml
  │   │   ├── certificate.yaml
  ├── Tenant/
  │   └── Platform / Flux configuration.
```

### Per APP - Repository Structure

```bash

GitOps
  ├── App1/
  │   ├── base/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  │   ├── dev/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  │   ├── qa/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  │   ├── prod/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  ├── App2/
  │   ├── dev/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  │   ├── qa/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  │   ├── prod/
  │   │   ├── kustomization.yaml
  │   │   ├── deployment.yaml
  │   │   ├── service.yaml
  │   │   └── ingress.yaml
  ├── Apps/
  │   ├── dev/
  │   │   ├── kustomization.yaml
  │   │   ├── secret-provider-class.yaml
  │   │   ├── certificate.yaml
  │   ├── qa/
  │   │   ├── kustomization.yaml
  │   │   ├── secret-provider-class.yaml
  │   │   ├── certificate.yaml
  │   ├── prod/
  │   │   ├── kustomization.yaml
  │   │   ├── secret-provider-class.yaml
  │   │   ├── certificate.yaml
  ├── Tenant/
  │   └── Platform / Flux configuration.
```

Note that we in this example also utilize the "Per ENV" method for things that are used by all applications, such as the certificates we create, we only create one certificate resource containing multiple SANs for each application. Each app also uses the same Key Vault, therefor this can be the same also.

Another repository structure worth mentioning is using a **/base** folder for each application, in both the "Per ENV" and "Per App" structures. 
This will enable you to have a "Common" folder containing all the configuration that is the same between your environments and then patch the correct values in each ENV folder.
