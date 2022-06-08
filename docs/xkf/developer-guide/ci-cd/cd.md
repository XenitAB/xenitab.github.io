---
id: cd
title: Continuous Delivery
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Continuous Delivery (CD) should be the only way to make changes to running applications in the XKF service.
This is to ensure that changes are consistent and tracked in a centralized manner that can be observed by all.

## GitOps

## Azure AD Identity

## Setup CI/CD pipeline

At Xenit we have created a CI/CD template to make it easier to get started with GitOps in our case using FluxV2 and the [GitOps toolkit](https://toolkit.fluxcd.io/).

You can find the base for all our Azure DevOps pipelines in our [Azure Devops Templates repo](https://github.com/XenitAB/azure-devops-templates/tree/main/gitops-v2).

Follow the example documentation on how to setup your base repo.
Below we will explain how to do the manual steps that is needed to get Azure DevOps to enable some of the flows that we are creating.

### Enable CI user to push to gitops repo

The core feature of the gitops repo is that one of the pipelines automatically updates the image tag in your repository so Flux will automatically update your deployment in Kubernetes.

We have to grant it permissions to do this, sadly manually...

<img alt="CI access" src={useBaseUrl("img/assets/xkf/developer-guide/gitops_repo_settings.png")} />

### Service connections

To be able to talk from Azure DevOps to AKS using our gitops pipelines we also need to configure service connections to tenant namespace.
Sadly setting up the Service Connections is a manual step.

Get the needed config.

```shell
az keyvault secret show --vault-name <vault-name> --name <secret-name> -o tsv --query value
# Example
az keyvault secret show --vault-name kv-prod-we-core-1337 --name sp-rg-xks-prod-backend-contributor -o tsv --query value

# The output will look something like this
{"clientId":"12345","clientSecret":"SoMuchSecret","subscriptionId":"sub-id","tenantId":"tenant-id"}
```

In Azure DevOps:
Project settings -> Service connections -> New service connection -> Azure Resource Manager -> Service principal (manual)

- Subscription Id = subscriptionId
- Service Principal Id = clientId
- Service principal key = clientSecret
- Tenant ID = tenantId
- Service connection name = random-name
