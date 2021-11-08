---
id: architecture
title: Architecture
---

import useBaseUrl from '@docusaurus/useBaseUrl';

XKF is set up from a set of Terraform modules that when combined creates the full XKS service. There are multiple individual states that all fulfill their own purpose and build
upon each other in a hierarchical manner. The first setup requires applying the Terraform in the correct order, but after that ordering should not matter. Separate states are used
as it allows for a more flexible architecture that could be changed in parallel.
<img alt="XKS Overview" src={useBaseUrl("img/assets/xks/operator-guide/aks-overview.jpg")} />

The AKS terraform contains three modules that are used to setup a Kubernetes cluster. To allow for blue/green deployments of AKS clusters resources have to be split up in to
global resources that can be shared between the clusters, and cluster specific resources.

The aks-global module contains the global resources like ACR, DNS and Azure AD configuration.

The aks and aks-core module creates a AKS cluster and configures it. This cluster will have a suffix, normally a number to allow for temporarily creating multiple clusters
when performing a blue/green deployment of the clusters. Namespaces will be created in the cluster for each of the configured tenants. Each namespaces is linked to a resource
group in Azure where namespace resources are expected to be created.
<img alt="AKS Resource Groups" src={useBaseUrl("img/assets/xks/operator-guide/aks-rg-xks-overview.jpg")} />
