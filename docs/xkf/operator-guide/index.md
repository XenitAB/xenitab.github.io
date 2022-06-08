---
id: index
title: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Xenit Kubernetes Service](https://xenit.se/it-tjanster/kubernetes-service/) (XKS) is an opinionated Kubernetes deployment on a public cloud provider's managed Kubernetes service. It combines a cloud provider's managed Kubernetes offering and ancillary services with additional configuration and services that run on top of Kubernetes.

## Architecture

XKF is set up from a set of Terraform modules that when combined creates the full XKF service. There are multiple individual states that all fulfill their own purpose and build
upon each other in a hierarchical manner. The first setup requires applying the Terraform in the correct order, but after that ordering should not matter. Separate states are used
as it allows for a more flexible architecture that could be changed in parallel.
<img alt="XKF Overview" src={useBaseUrl("img/assets/xkf/operator-guide/aks-overview.jpg")} />

## Network diagram

Looking at a cluster, the simple network diagram looks like this:

<img alt="XKF Overview" src={useBaseUrl("img/assets/xkf/operator-guide/simple-network-design.jpg")} />

## Terraform modules

The following Terraform modules are used in XKF.

### Governance

Governance is split into [global](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/governance-global) and [regional](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/governance-regional), it handles the creation and delegation of Azure Resource Groups, Azure KeyVaults, Azure AD groups, Service Principals and resources like that.

### Core

[Core](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/core) sets up the main network for an environment.

### Hub

[Hub](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/hub) is setup in the production subscription and is used for things like Azure Pipelines agents.

### AKS

The AKS Terraform contains three modules that are used to setup a Kubernetes cluster. To allow for blue/green deployments of AKS clusters resources have to be split up into
global resources that can be shared between the clusters, and cluster specific resources.

The aks-global module contains the global resources like ACR, DNS and Azure AD configuration.

The aks and aks-core modules create a AKS cluster and configures it. This cluster will have a suffix, normally a number to allow for temporarily creating multiple clusters
when performing a blue/green deployment of the clusters. Namespaces will be created in the cluster for each of the configured tenants. Each namespaces is linked to a resource
group in Azure where namespace resources are expected to be created.
<img alt="AKS Resource Groups" src={useBaseUrl("img/assets/xkf/operator-guide/aks-rg-xks-overview.jpg")} />
