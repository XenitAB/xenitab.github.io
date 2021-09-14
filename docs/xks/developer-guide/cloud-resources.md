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

<!-- markdownlint-disable -->
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
<!-- markdownlint-restore -->

#### Limiting Permissions

TBD

### AWS

When authenticating towards AWS in XKS we recommend that you utilize [IRSA]([amazon.com.TODO](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM.html)).

You create a IAM rule that matches the minimal access that you need to use the resource.
Annotate the serviceAccount with the IAM arn.

```serviceAccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::111111111111:role/iam-name
  name: application1
```

In your deployment use the serviceAccount.

```pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: aws-cli
spec:
  serviceAccountName: application1
  containers:
  - name: msi-test
      image: amazon/aws-cli
      command: ["sh"]
      stdin: true
      tty: true
```

After the Pod has started you can execute a shell in the Pod and verify that the managed identity is working.

```bash
aws sts get-caller-identity
```

## Secret Provider

If all you need is a secret for example to be able to talk to a database XKS utilize [secret store csi driver](https://secrets-store-csi-driver.sigs.k8s.io/providers.html).
Both AWS and Azure have done there implementation of secret store csi driver where it talks to it's API to get data from there key store solutions.

### Azure SPC

TBD

### AWS SPC

As mentioned before in AWS we use IRSA to connect pods to the AWS API.
You will have to create a IAM rule that gives you read access to the secret solution that you use.
In AWS case it supports both [AWS Secret Manager](https://aws.amazon.com/secrets-manager/) and [AWS System Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

Example IAM policy document, this might have been changed always look at the latest [docs](https://docs.aws.amazon.com/mediaconnect/latest/ug/iam-policy-examples-asm-secrets.html).
The IAM rule only contains the policy not a attachment of it.

```iam.tf
data "aws_iam_policy_document" "db_connection_string" {
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:ListSecrets",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:ListSecretVersionIds"
    ]
    resources = ["arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:application/application1/connectionstring"]
  }
}
```

[IAM docs](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html) for AWS System Manager Parameter Store.

```ssm-iam.tf
data "aws_iam_policy_document" "db_connection_string" {
  statement {
    effect = "Allow"
    actions = [
      "ssm:DescribeParameters",
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
    ]
    resources = ["arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/db-*"]
  }
}
```

This is a example secret provider class for **Secret Manager** and **System Manager Parameter**.

```secretproviderclass.yaml
apiVersion: secrets-st`ore.csi.x-k8s.io/v1alpha1
kind: SecretProviderClass
metadata:
  name: spc1
  namespace: tenant1
spec:
  provider: aws
  parameters:
    objects: |
        # Path to your secret
      - objectName: "application/application1/connectionstring"
        objectType: "secretsmanager"
        # Notice the usage of objectAlias
        objectAlias: "connectionstring"
      - objectName: "db-test"
        objectType: "ssmparameter"
  secretObjects:
    - data:
        - key: password
          objectName: "connectionstring"
      secretName: connectionstring
      type: Opaque
    - data:
        - key: password
          objectName: db-test
      secretName: db-test
      type: Opaque
```

A service account using the IAM rule that we have created.

```sa.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::111111111111:role/iam-name
  name: application1
```

A deployment using the service account and the csi driver.

```deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application1
spec:
  selector:
    matchLabels:
      app: application1
  template:
    metadata:
      annotations:
        secret.reloader.stakater.com/reload: "db-test"
      labels:
        app: application1
    spec:
      serviceAccountName: application1
      containers:
        - name: api
          image: alpine:latest
          env:
            - name: ConnectionStrings
              valueFrom:
                secretKeyRef:
                  key: password
                  name: db-test
          volumeMounts:
            - name: secret-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secret-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: spc1
```

## Resource Creation

TBD
