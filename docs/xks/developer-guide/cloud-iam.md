---
id: cloud-iam
title: Cloud IAM
---

Sometimes applications will need to integrate with other cloud resources as they require things like persistent data storage. When working with XKS each namespace is accompanied by an Azure resource
group or an AWS account. This is where cloud resources can be created by each tenant. To keep things simple it may be a good idea to not share these resources across multiple tenants, as one of the
tenants has to own each resource. Instead look at other options like exposing an API inside the cluster instead. As one may expect the authentication methods differ when running XKS in Azure and AWS,
this is because the APIs and underlying authentication methods differ greatly. It is important to take this into consideration when reading this documentation.

## Cloud Providers

### Azure

The recommended way to authenticate towards Azure in XKS is to make use of [AAD Pod Identity](https://github.com/Azure/aad-pod-identity) which runs inside the cluster. AAD Pod Identity allows Pods
within the cluster to use [managed identities](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview) to authenticate towards Azure. This removes the need
for static credentials that have to be passed to the Pods. It works by intercepting API requests before they leave the cluster and will attach the correct credential based on the source Pod of the
request.

Each tenant namespace comes preconfigured with an [AzureIdentity](https://azure.github.io/aad-pod-identity/docs/concepts/azureidentity/) and
[AzureIdentityBinding](https://azure.github.io/aad-pod-identity/docs/concepts/azureidentitybinding/). These have been setup so that the identity has access to the tenant's resource group. All that has
to be done to enable the managed identity is to add the label `foo` to the Pod. The preconfigured AzureIdentity has a labelselector which expects the label to have the same value as the namespace
name.

This example will deploy a Pod with the Azure CLI so that you can test access to the Azure API.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: msi-test
  namespace: tenant
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
kubectl -n tenant exec -it msi-test
az login --identity
az account show
```

Make sure your application supports retries when retrieving tokens. It should at least be able to retry for 60 seconds. Read more about [token retrieval retry best practices](https://azure.github.io/aad-pod-identity/docs/best-practices/#retry-on-token-retrieval). More good practices can be found in the [aad-pod-identity docs](https://azure.github.io/aad-pod-identity/docs/best-practices).

#### SDK

A common scenario is that an application may need API access to Azure resources through the API. In these cases the best solution is to use the language specific SDKs which will most of the time
support MSI credentials. Below are examples for how to create a client using MSI credentials which can interact with Azure storage account blobs.

<!-- markdownlint-disable -->

** Golang **

```go
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

** C# with ASP.NET **

```aspnet
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

When authenticating towards AWS in XKS we recommend using [IAM Roles for Service Accounts](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM.html) (IRSA). IRSA
works by intercepting AWS API calls before leaving the cluster and appending the correct authentication token to the request. This removes the need for static security credentials as it is handled
outside the app. IRSA works by annotating a Service Account with a reference to a specfic AWS IAM role. When that Service Account is attached to a Pod, the Pod will be able to assume the IAM role.
The reason IRSA works in a multi-tenant cluster is because the reference is multi-directional. The Service Account has to specify the full role ARN it wants to assume and the IAM role has to specify
the name and namespace of the Service Account which is allowed to assume the role. So it is not enough to know the ARN of the role unless you have access to the correct namespace and Service Account.

Start by defining a variable for the OIDC URLs that should be trusted. Currently this is a static definition that needs to be specified but work is planned to make this value discoverable in the
future.

```hcl
variable "oidc_urls" {
  description = "List of EKS OIDC URLs to trust."
  type        = list(string)
}
```

A new OIDC provider has to be created for each trusted URL. The simplest way to do this is to iterate the URL list. This should only be done once per tenant account, so try to define all roles in the
same Terraform state.

```hcl
data "tls_certificate" "this" {
  for_each = {
    for v in var.oidc_urls :
    v => v
  }
  url = each.value
}

resource "aws_iam_openid_connect_provider" "this" {
  for_each = {
    for v in var.oidc_urls :
    v => v
  }
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.this[each.value].certificates[0].sha1_fingerprint]
  url             = each.value
}
```

Define an AWS IAM policy document and an instance of the [IRSA Terraform module](https://github.com/XenitAB/terraform-modules/tree/main/modules/aws/irsa). The policy document describes which
permissions should be granted to a Pod and the IRSA module creates the IAM policy and role for a Service Account in a specific namespace. The example below will for example only work with a Service
Account called `irsa-test` in the namespace `tenant`. Keep in mind that a policy document and module instance is required for each unique permission set.

```hcl
data "aws_iam_policy_document" "get_login_profile" {
  statement {
    effect = "Allow"
    actions = [
      "iam:GetLoginProfile",
    ]
    resources = ["*"]
  }
}

module "irsa_test" {
  source = "github.com/xenitab/terraform-modules//modules/aws/irsa?ref=2021.08.9"

  name = "irsa-test"
  oidc_providers = [
    for v in var.oidc_urls :
    {
      url = v
      arn = aws_iam_openid_connect_provider.this[v].arn
    }
  ]
  kubernetes_namespace       = "tenant"
  kubernetes_service_account = "irsa-test"
  policy_json                = data.aws_iam_policy_document.get_login_profile.json
}
```

It is a good idea to output the ARN of the created role, as it will be needed in the next step.

```hcl
output "irsa_test_arn" {
  value = module.irsa_test.role_arn
}
```

The correct IAM roles and policies should be created after the Terraform has been applied. The next step is to create a Service Account with the same name as specified in the IRSA module and annotate it
with the key `eks.amazonaws.com/role-arn`. The value should be the full ARN of the created IAM role. Note that the account id is part of the ARN as the IAM role is created in a different account
than the one the cluster is located in.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: irsa-test
  namespace: tenant
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::111111111111:role/irsa-test
```

Create a Pod using the newly created Service Account to test using the IAM role.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: irsa-test
  namespace: tenant
spec:
  serviceAccountName: irsa-test
  containers:
  - name: irsa-test
      image: amazon/aws-cli
      command: ["sh"]
      stdin: true
      tty: true
```

After the Pod has started you can execute a shell in the Pod and verify that the managed identity is working.

```bash
kubectl -n tenant exec -it irsa-test
aws sts get-caller-identity
```

#### SDK

TBD
