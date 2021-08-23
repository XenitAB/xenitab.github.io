---
id: index
title: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This documentation is targeted towards developers using XKS to deploy their applications. All information needed including helpful links can be found here to get the most out of XKS.

## Get Access

## Kubectl Configuration
You can run the following commands to add the AKS cluster to your kubeconfig assuming that you have installed the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
and [authenticated with the azure portal](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).

### Using AZAD Proxy
If you use the AZAD proxy you can setup configuration using: AZAD Documentation

### Otherwise

Once you have logged in you can list your subscriptions
```bash
az account list -o table
```

In the case that you have more than one subscription, you might want to change the default subscription in order to target the correct environment.
```bash
az account set -s <SubscriptionId>
```
To get information about cluster name and resource group for your current default subscription you can use.
```bash
az aks list -o table
```

Once you know the resource group and name of the cluster, you can run the following to add the credentials to your kubekonfig.
```bash
az aks get-credentials --resource-group <ResourceGroup> --name <Name>
```
