---
id: architecture-and-design
title: Architecture and design
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview

[Xenit Kubernetes Framework](https://github.com/search?q=topic%3Axenit-kubernetes-framework+org%3AXenitAB+fork%3Atrue) (XKF) are the open source building blocks for a service Xenit AB provides to customers: [Xenit Kubernetes Service](https://xenit.se/it-tjanster/kubernetes-eng/) (XKS)

In the terminology of [Microsoft Cloud Adoption Framework](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/enterprise-scale/architecture) (CAF), Xenit Kubernetes Service is an enterprise-scale landing zone. Additionally, the workload supports multiple cloud providers and AWS is also supported at the moment (but still requires the governance part in Azure).

<img alt="XKS Overview" src={useBaseUrl("img/assets/xks/operator-guide/aks-overview.jpg")} />

### Glossary

- Platform team: the team managing the platform (XKF)
- Tenant: A group of people (team/project/product) at the company using XKS

## Role-based access management

All role-based access control (RBAC) and identity & access management (IAM) is handled with Azure AD. Azure AD groups are created and nested using the framework and framework admins as well as customer end users are granted access through these different groups.

Where possible two different permissions are exposed through Azure AD groups: Reader and Contributor.

These permissions are scoped in many different ways and start at the management group level, subscription level, resource group level and at last namespaces in Kubernetes. These are also split over the different environments (development, quality assurance and production) meaning you can have read/write in one environment but only read in the others.

An owner role and group is also created for most resources, but the recommendation is not to use it as owners will be able to actually change the IAM which in most cases is undesirable.

Usually the tenant is granted read/write to their resource groups and namespaces, meaning they will be able to add/remove whatever they want in their limited scope. This usually means creating deployments in Kubernetes as well as databases and other stateful resources in their Azure Resource Groups. When using AWS Elastic Kubernetes Service (EKS) the delegation is not as rigorous as in Azure and the default setup creates three accounts where all the customer tenants share resources.

Each tenant namespace has the ability to use the cloud provider metadata service to access services in the cloud provider. This is enabled through tools like [Azure AD POD Identity](https://github.com/Azure/aad-pod-identity) (aad-pod-identity) and [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA). These tools enable the tenants to access resources in their respective resource groups or accounts without having to create manually shared secrets (that would also have to be rotated).

## Security and access

### Security

The platform is based on the principle of least privilege and in every layer we try to only delegate what is needed and no more. This is both true for the tenant and platform resources and their respective access.

The second part of the work we do around security is around trying to keep the platform as lean and easy to understand as possible, making sure to remove complexity where needed. Adding security often means selecting a much more complex solution and it is much harder to understand and maintain something complex over something simple. Keeping the cognitive load of maintaining a platform like this as low as possible is always a priority.

Additionally, we try to add products and services into the mix to make it easier for both the platform team and tenant teams to keep the environment secure. This is an ever-changing environment where new things are added as needed and the list below is not an exhaustive one:

#### Tenant security

- GitOps for application delivery to clusters
- CI/CD templates for building containers and promoting applications with GitOps
- Tools for security scanning and linting inside the pipelines
- Admission controllers to make sure unsafe configuration is prohibited
- Mutating admission controllers to make it easier to have sane defaults
- Continuous education from the platform team
- One account to protect instead of having multiple accounts to access different resources
- Infrastructure as Code with corresponding CI/CD templates for secure deployment of resources
- SSO from the tenant namespaces to the tenant resource groups to make sure no secrets have to be shared
- Ability to use mTLS together with a service mesh (linkerd)
- Automated certificate and DNS management from the platform

#### Platform

- Observability of the platform handled by the platform team
- Runtime security in the platform using Falco
- Automated update management of Infrastructure as Code (with code review)

### Access

The primary authentication method to access any resource is based on Azure AD. Most of the actions taken by a tenant engineer will require authentication to Azure AD either using the Azure Management Console or the Azure CLI.

A tenant will be granted access to the clusters using a [proxy](https://github.com/XenitAB/azad-kube-proxy) built by Xenit and provided in the framework, making sure they do not have to reconfigure their computers when a blue/green deployment of the clusters are made and the Kubernetes API endpoint change. The proxy will move with the clusters and it will be seamless for the tenant engineers.

The proxy also provides a CLI (`kubectl` plugin through [krew](https://krew.sigs.k8s.io/)) that makes it easier to both discover and configure access to the clusters. A valid session with Azure CLI is required to use it.

Other than that, most of the access and work with the tenant resources are done through a GitOps repository for changes in regards to applications in Kubernetes and a Terraform repository in regards to resources in the cloud provider.

## Network design

By default, the network setup is expected to be quite autonomous and usually considered to be an external service compared to everything else in the organization using it. It is possible to setup peering with internal networks, but usually it begins with a much simpler setup and then grows organically when required.

<img alt="XKS Simple Network Design" src={useBaseUrl("img/assets/xks/operator-guide/simple-network-design.jpg")} />

The cluster environments are completely separated from each other, but a hub in the production subscription has a peering with them to provide static IP-addresses for CI/CD like terraform to access resources.

Inside an environment the cluster is using kubenet and Calico to keep the amount of IP-addresses to a minimum. Kubernetes Services can either be exposed internally or externally using either a service resource or an ingress resource, where most tenants exclusively use ingress (provided by NGINX Ingress Controller).

Inside the clusters Calico is used to restrict traffic between namespaces.

## Backup

Xenit Kubernetes Framework is built to be ephemeral wich means any cluster can at any time be wiped and a new setup without any loss of data. This means that tenants are not allowed to store state inside of the clusters and are required to store it in the cloud provider (blob storage, databases, message queues etc.).

Since both the platform team and the tenant teams are deploying resources using GitOps, the current state of the environment is stored in git.

The content of stateful resources (including backups) are handled by the cloud provider and it is up to the tenants to configure and manage.

## Cost optimization

The platform team limits how much the clusters can auto scale and a service delivery manager together with the platform team helps the tenants understand their utilization and provides feedback to keep the cost at bay.

## Container management

When a new tenant is being setup, the platform team provides onboarding for them and they then continously work together to assist in any questions. Monthly health checks are done to make sure that no obvious mistakes have been made by the tenants and monitoring is setup to warn the platform team if something is wrong with the platform.

Most of the management of the workloads that the tenants deploy are handled through GitOps but they are also able to work with the clusters directly, with the knowledge that any cluster may at any time be rolled over (blue/green) and anything not in git will not be persisted.

## Xenit Kubernetes Framework

XKF is set up from a set of Terraform modules that when combined creates the full XKS service. There are multiple individual states that all fulfill their own purpose and build
upon each other in a hierarchical manner. The first setup requires applying the Terraform in the correct order, but after that ordering should not matter. Separate states are used
as it allows for a more flexible architecture that could be changed in parallel.
<img alt="XKS Overview" src={useBaseUrl("img/assets/xks/operator-guide/aks-overview.jpg")} />

The AKS Terraform contains three modules that are used to setup a Kubernetes cluster. To allow for blue/green deployments of AKS clusters resources have to be split up into
global resources that can be shared between the clusters, and cluster-specific resources.

The aks-global module contains the global resources like ACR, DNS and Azure AD configuration.

The aks and aks-core module creates an AKS cluster and configures it. This cluster will have a suffix, normally a number to allow for temporarily creating multiple clusters
when performing a blue/green deployment of the clusters. Namespaces will be created in the cluster for each of the configured tenants. Each namespace is linked to a resource
group in Azure where namespace resources are expected to be created.
<img alt="AKS Resource Groups" src={useBaseUrl("img/assets/xks/operator-guide/aks-rg-xks-overview.jpg")} />
