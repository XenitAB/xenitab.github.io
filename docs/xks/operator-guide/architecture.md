---
id: architecture
title: Architecture
---

import useBaseUrl from '@docusaurus/useBaseUrl';

XKF is a opinionated method to deploy and run Kubernetes clusters. Currently XKF supports running on both AKS in Azure and on EKS in AWS. It's core consists of a set of Terraform Modules which configure everything from developer governance to the actual Kubernetes infrastructure and applications running inside of the cluster. XKF access model is tenant based which allows for multiple development teams to have access to a part of the same Kubernetes cluster in which they can deploy application workloads.

<img alt="XKF Overview" src={useBaseUrl("img/assets/xks/operator-guide/xkf-overview.jpg")} />

XKF aims to enable Kubernetes cluster flexibility, allowing for quick replacement of Kubernetes cluster with limited developer involvement. This has influenced the choice of continuous deployment solution and other tools. Another choice is that XKF is built on the idea that all Kubernetes clusters are stateless. This means that any state like databases, object store, etc. have to be located outside of the Kubernetes cluster. XKF does however provide a golden path for how tenants can connect their applications to external services like databases or other cloud services.

## Tenants

Tenants in XKF are used to separate access between teams or products. There is no real requirement how tenants should be organized or who should belong to which tenant. It should instead reflect the organization structure of the end user. When deploying XKF in Azure a tenant is given a resource group to create cloud resource in, while in AWS the counterpart is a separate account. Currently there is a 1:1 relationship between tenants and Kubernetes namespaces. Meaning that each tenant will only receive a single namespace. This is subject for change in the future but is a strict limitation currently.

## Environments

XKF is designed to be deployed as multiple identical environments. The environments will run separately from each other with no access in between them. Every environment will contain a single Kubernetes cluster, which is where all workloads should be running. Having multiple environments in the same Kubernetes cluster is not supported, and will most likely not work. The goal should be to keep each environment deployment as similar as possible, with the main difference being the resource scaling as certain environments may have more load than others. There are no real requirement on environment names or ordering but the recommended environments to use are `dev`, `qa` and `prod` in that order. Having more or less environments is possible, XKF but remember that running all environments in a single deployment is not possible. There should be a determined ordering of the environments in which changes are applied, this should reflect the order in which applications are deployed.

## Components

### Kubernetes

### DNS

### Container Registry

## Deployment Structure

XKF is built with the help of [Terraform](https://www.terraform.io/) to create and manage cloud resources. XKF consists of multiple Terraform modules from the GitHub repository [xenitab/terraform-modules](https://github.com/xenitAB/terraform-modules). These modules together contain all configuration required ton setup XKF. For instructions how to setup XKF refer to the [getting started guid](./getting-started). XKF is designed to be split up into separate Terraform state. This is partly to keep the blast radius limited in a state corruption event but also to enable multiple deployments of XKF in different regions. Some states will only contain a single module while others can contain multiple modules in the same state. The setup may be different depending on the cloud provider in which XKF is deployed in but they will also share some modules.

:::info
Currently XKF does not support running multiple cloud providers. It is not possible to run different cloud providers per environment, nor is it possible to run two Kubernetes clusters from different cloud providers in the same environment. This is subject for change in the future.
:::

The diagram below gives an overview of the different Terraform states and the modules which are used within each. The green boxes represent the individual Terraform states while the red boxes represent the modules.

<img alt="Deployment Structure" src={useBaseUrl("img/assets/xks/operator-guide/deployment-structure.jpg")} />

<!-- TODO: Diagram for each state -->

### Governance

The governance state configures a Azure AD landing zone, which XKF bases its tenant model on. The governance state consists of two Terraform modules, a [global](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/governance-global) and [regional](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/governance-regional). The global module creates all Azure AD resources which do not belong to a specific region. While the regional module will setup Azure AD resources for a specific region. Azure AD resources are global within a tenant, so any resources created in the regional module has to contain the region name in the identifier to not conflict with the same resource created by other regional modules in the same tenant.

### Core

The core state contains the Azure [core](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/core) or AWS [core](https://github.com/XenitAB/terraform-modules/tree/main/modules/aws/eks-core) module which configures all networking resources required by XKF. This includes resources such as VNET/VPC, subnets, and network peering configuration.

### EKS/AKS

This is most likely the largest state in XKF. It contains three separate modules which create and configure a AKS or EKS cluster. The [aks-global](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/aks-global) or [eks-global](https://github.com/XenitAB/terraform-modules/tree/main/modules/aws/eks-global) module creates resource which are shared across [blue-green clusters](.blue-green clusters) which should not be removed during cluster, these resources are things like IAM/MSI used by containers to authenticate towards the cloud provider. The [aks](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/aks) or [eks](https://github.com/XenitAB/terraform-modules/tree/main/modules/aws/eks) module creates the actual Kubernetes cluster in the cloud provider together with the nodepools. The [aks-core](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/aks-core) or [eks-core](https://github.com/XenitAB/terraform-modules/tree/main/modules/kubernetes/eks-core) module configures resources inside of the Kubernetes cluster. 

#### Blue/Green Clusters

Only a single instance of the global module has to be configured but the other two modules are configured in pairs to handle blue/green deployments of clusters. This deployment strategy allows for changes to Kubernetes clusters to be applied to a new cluster, with the old cluster still running. To differentiate between the clusters they are suffixed with either a `1` or a `2` in their name. The new cluster will deploy the exact same application manifests as the old cluster. It will however provision new certificates as they are ephemeral. The new cluster will also attempt to create DNS records for all Ingress resources in the cluster, but will not be able to as it will not overwrite the older clusters existing records. The DNS record overwrite can be enabled manually when traffic should be shifted from the old to new cluster. Refer to the [blue/green documentation](./blue-green) for detailed information about this process. While traffic is being shifted across clusters there will be two clusters for the same environment.  

<img alt="Blue Green" src={useBaseUrl("img/assets/xks/operator-guide/blue-green.jpg")} />

### Hub

The hub state can contain the modules [hub](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/hub), [azure-pipelines-agent-vmss](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/azure-pipelines-agent-vmss), and [github-runner](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/github-runner). The hub state sets up non application workload resource like CI runners. 

## Cloud Regions

By default XKF should be deployed in a single region, there are however use cases which require multiple regions. Most cloud providers have a concept of regions. A region tends to be a collection of data centers located geographically close to each other. Cloud services can be separated into those which are global and regional. Regional services live in a specific resource and tend to be limited in their data access to other services in the same region. While globally services are not region specific and can be used by multiple regions. These constraints adds some additional constraints to XKF design as there may be requirements to run XKF in multiple regions in the same cloud account. Multi region as a concept can be very broad and have different definitions for different people, XKF supports the following multi region use cases.

* Separate Markets - Separate deployments to comply with GDPR or other legal rest restrictions.
* Parallel - An environment contains multiple clusters located in different regions. Ingress traffic is distributed between the different regions. 
* Failover - Workloads run only in a single region, but traffic can be shifted over to a new region in full region loss situation.

The simplest multi region deployment is serving multiple different markets. This is generally required when laws do not allow data transfer to other countries. In these situations the recommended method is to setup of two totally separate XKF deployments. They will for all intents and purposes be considered two separate customers with a single region each. Doing this gives the highest level of separation between the two market deployments reducing the risk of accidentally transferring data between regions or accidentally exposing information. Managing ingress traffic has to solved separately, either through the use of a CDN or serving DNS records based on geographic location. There are also options for how to manage application deployments. The different clusters can still reconcile from the same Git repository, enabling simpler deployment workflows where the same update can be applied to two different markets at the same time. This is however all up to the end users who should configure this in their tenants GitOps repository.

The other option is to deploy XKF in multiple parallel regions. The method in which these regions are used can be very different but the deployment method will still be the same. XKF has an opinionated method to deal with multi region deployments with Terraform. There are resources linked to boot strapping which have to be located in a specific region. This includes things like Terraform state and encryption keys, which are not possible to replicate across multiple Azure regions. Additionally a resource group has to exist within a specific resource group where metadata is stored. For this reason it is required to have a "home" region from which globally shared resources will be created in. The regional components of XKF should all be located in their own separate regions. This means placing the Terraform state for the regional deployments into separate regions, doing this is important as placing all Terraform state into the same region would create a bottle neck.

:::info
A detail that will not be discussed in this architecture is how to deal with stateful cloud services in multiple regions. This is a separate topic which requires architecture specific to business logic, so there is no one size fits all design. Keep in mind that while XKF may support running in multiple regions at the same time, this may not be the case for applications that depend on existing state.
:::

A core design principal of all XKF Terraform modules is that every resource has to be able to be deployed in a multi region setting. There are some exceptions to this like the global governance resources which are shared across all regions. In Azure individual resource groups are created with the region name in the resource group while in AWS the same account can be used for multiple regions. Some cloud resources, while located in a resource group or region, may have unique naming restrictions. These restrictions can be enforced across all regions in the same account or globally in all of Azure or AWS. Additionally resources like Azure AD are global per tenant, meaning there may occur conflicts between XKF deployments in different regions. For this reason all resources created in XKF should include both the environment name and the region name where possible, to avoid any potential conflicts between XKF deployments in different regions.

When running XKF with multiple regions the Terraform states have to be organized into global states and regional directories. The global states will only have to exist in a single instance, and represent the resources which are shared between resources. While the Kubernetes cluster resources have multiple regional replicas which represent each region deployment.

<img alt="Mulit Region" src={useBaseUrl("img/assets/xks/operator-guide/multi-region.jpg")} />

