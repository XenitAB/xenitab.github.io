---
id: architecture-and-design
title: Architecture and design
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview

[Xenit Kubernetes Framework](https://github.com/search?q=topic%3Axenit-kubernetes-framework+org%3AXenitAB+fork%3Atrue) (XKF) is the open source building blocks for a service Xenit AB provides customers: [Xenit Kubernetes Service](https://xenit.se/it-tjanster/kubernetes-eng/) (XKS)

In the perspective of [Microsoft Cloud Adoption Framework](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/enterprise-scale/architecture) (CAF), Xenit Kubernetes Service is an enterprise-scale landing zone.

The primary goal of the framework is to provide a standardized service to customers where the creators of the framework (employees at Xenit) can manage multiple environments without having to be the one who set it up - because it looks just about the same in all places. This also provides the ability to fix issues, change standards in one place and not having to repeat the same thing over and over at all customer (or two engineers solving the same problem at two different customers).

<img alt="XKS Overview" src={useBaseUrl("img/assets/xks/operator-guide/aks-overview.jpg")} />

## Role-based access management

All role-base access control (RBAC) and identity & access management (IAM) is handled with Azure AD. Azure AD groups are created and nested using the framework and framework admins as well as customer end users are granted access through these different groups.

Everything, where possible, exposes two different permissions: Reader and Contributor

These permissions are scoped in many different ways and start at the management group level, subscription level, resource group level and at last namespaces in Kubernetes. These are also split over the different environments (development, quality assurance and production) meaning you can have read/write in one environment but only read in the others.

An owner role and group is also created for most resources, but the recommendation is not to use it as owners will be able to actually change the IAM wich in most cases is undesirable.

The normal customer end user (often an engineer / developer, referred to as a tenant) is granted read/write to their resource groups and namespaces, meaning they will be able to add/remove whatever they want in their limited scope. This usually means creating deployments in Kubernetes as well as databases and other stateful resources in their Azure Resource Groups. When using AWS Elastic Kubernetes Service (EKS) the delegation insn't as rigorous as in Azure and the default setup creates three accounts where all the customer tenants share resources.

As a last step, each tenant namespace has the ability to use the cloud provider metadata service to access services in the cloud provider. This is enabled through the tools like [Azure AD POD Identity](https://github.com/Azure/aad-pod-identity) (aad-pod-identity) and [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA). These tools enable the tenants to access resources in their respective resource groups or accounts without having to creat manually shared secrets (that also would have to be rotated).

## Security and access

## Network design

## Backup

## Cost optimization

## Container management

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
