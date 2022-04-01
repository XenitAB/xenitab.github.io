---
id: introduction
title: Introduction
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation is targeted towards developers using [XKS](https://xenit.se/it-tjanster/kubernetes-framework/). It covers the basics of Kubernetes and the additional features that are offered by XKS. It is recommended to read this page in its entirety to get a lay of the land. By the end of reading this guide new users should have all the prerequisites for access to their clusters and be ready to deploy applications.

Right now, this introduction is only targeted towards Azure users.

## Getting Started

A good starting point is to get CLI access to the clusters. It is useful to have manual access to the clusters for debugging purposes. Try to avoid
doing any changes to cluster resources with the CLI as the changes will be difficult to track and update in the future. There are a couple of
prerequisites that have to be met before getting access however.

Start off by [installing the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

```shell
az login
```

## Kubectl Configuration

You can run the following commands to add the AKS cluster to your kubeconfig, assuming that you have installed the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
and [authenticated with the Azure portal](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).

### Using AZAD Proxy

If you use the AZAD proxy you can find documentation to help you set it up here: [AZAD Documentation](https://github.com/XenitAB/azad-kube-proxy)

### Otherwise

Once you have logged in you can list your subscriptions

```bash
az account list -o table
```

In the case where you have more than one subscription, you might want to change the default subscription in order to target the correct environment.

```bash
az account set -s <SubscriptionId>
```

To get information about cluster name and resource group for your current default subscription you can use:

```bash
az aks list -o table
```

Once you know the resource group and name of the cluster, you can run the following to add the credentials to your `kubekonfig`:

```bash
az aks get-credentials --resource-group <ResourceGroup> --name <Name>
```

## My First Application

TBD

## Next Steps

TBD

## Troubleshoot applications in Kubernetes

There is a great guide how to debug Kubernetes deployment over at [learnk8s.io](https://learnk8s.io/troubleshooting-deployments).

To debug flux issues have a look at our [Flux docs](ci-cd/flux.md).
