---
id: cloud-resources
title: Cloud Resources
---

Sometimes applications will need to integrate with other cloud resources as they require things like persistent data storage. When working with XKS
each namespace is accompanied by a Azure resource group or a AWS account. This is where cloud resources can be created by each tenant. To keep things
simple it may be a good idea to not share these resources across multiple tenants, as one of the tenants has to own the resource. Instead look at
other options like exposing an API inside the cluster instead.

## Authentication

As many things the authentication methods differ when running XKS in Azure and AWS. This is because the APIs and underlying authentication methods
differ greatly. It is important to take this into consideration when reading these documentation.

### Azure

The reccomended way to authenticate towards Azure in XKS is to make use of [AAD Pod Identity](https://github.com/Azure/aad-pod-identity) which runs
inside the cluster. AAD Pod Identity allows Pods within the cluster to use [managed identities](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview)
to authenticate towards Azure. This removes the need for static credentials that have to be passed to the Pods. It works by intercepting API requests
before the leave the cluster and will attach the correct credential based on the Pod source of the request.

Each tenant namespace comes preconfigured with an [AzureIdentity](https://azure.github.io/aad-pod-identity/docs/concepts/azureidentity/) and
[AzureIdentityBinding](https://azure.github.io/aad-pod-identity/docs/concepts/azureidentitybinding/). These have been setup so that the identity has
access to the tenants resource group. All that has to be done to enable the managed identity is to add the label `foo` to the Pod. The preconfigured
AzureIdentity has a labelselector which expects the label to have the same value as the namespace name.

This example will deploy a Pod with the Azure CLI so that you can test access to the Azure API.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: msi-test
  labels:
    aadpodidbinding: ${NAMESPACE_NAME}
spec:
  containers:
  - name: msi-test
    image: mcr.microsoft.com/azure-cli
    tty: true
    volumeMounts:
      - name: az-cli
        mountPath: /root/.azure
  volumes:
    - name: az-cli
      emptyDir: {}

```

After the Pod has started you can execute a shell in the Pod and verify that the managed identity is working.

```bash
az login --identity
az account show
```

#### SDK Configuration

A more realistic scenario is an internally developed application needs to access an Azure resources. In these cases the best solution is to use the
language specific SDKs which will most of the time support MSI credentials. Below are examples for how to create a client using MSI credentials that
can interact with Azure storage account blobs.

** Golang **

```golang
package main

import (
	"time"

  "github.com/Azure/go-autorest/autorest/azure/auth"
	blob "github.com/Azure/azure-storage-blob-go/azblob"
)

func main() {
  msiConfig := auth.NewMSIConfig()

  spt, err := msiConfig.ServicePrincipalToken()
  if err != nil {
    return nil, err
  }
  if err := spt.Refresh(); err != nil {
    return nil, err
  }

  tc, err := blob.NewTokenCredential(spt.Token().AccessToken, func(tc blob.TokenCredential) time.Duration {
    err := spt.Refresh()
    if err != nil {
      return 30 * time.Second
    }
    tc.SetToken(spt.Token().AccessToken)
    return spt.Token().Expires().Sub(time.Now().Add(2 * time.Minute))
  }), nil
}
```

** C# **

```c#
using Azure;
using Azure.Identity;
using Azure.Storage.Blobs;

async static Task CreateBlockBlobAsync(string accountName, string containerName, string blobName)
{
    string containerEndpoint = string.Format("https://{0}.blob.core.windows.net/{1}",
                                                accountName,
                                                containerName);
    BlobContainerClient containerClient = new BlobContainerClient(new Uri(containerEndpoint),
                                                                    new DefaultAzureCredential());
}
```

#### Limiting Permissions

TBD

### AWS

TBD

## Resource Creation

TBD
