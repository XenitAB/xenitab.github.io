---
id: github
title: XKF on Github
---

As a XKF user you can use both Azure DevOps and GitHub to store
your Terraform and GitOps repositories.

In this document we will go through how to use XKF on GitHub focusing
on Infrastructure As Code (IAC) using Terraform.

## GitOps promotion

In XKF we use the cloud providers container registry to store custom application images.

### Azure

Assuming that you are using XKF to setup your AKS cluster it will automatically create a SP that you can use
to send images to ACR.
Depending on your input values it will be called something like `sp-rg-xks-dev-tenant-contributor`.
That SP is added to a group that have ACR push access.

The generated SP stores it's secrets in a key vault `kv-dev-we-core-1337` with the SP name.
In it you will find all the secrets you need.

TODO write instructions how to extract the AZ key vault secret and push to GitHub.

Create [GitHub secrets](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-github-action#save-credentials-to-github-repo)
named as follows.

| Secret                       | Value                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| REGISTRY_LOGIN_SERVER_\<ENV> | The login server name of your registry (all lowercase). Example: myregistry.azurecr.io |
| REGISTRY_USERNAME_\<ENV>     | the clientId from the JSON output from the service principal creation                  |
| REGISTRY_PASSWORD_\<ENV>     | The clientSecret from the JSON output from the service principal creation              |

## Terraform

How to run Terraform plan and apply through a GitHub action workflow.

### Workflow

Just like in the Azure DevOps case we have created a [basic pipeline](https://github.com/XenitAB/azure-devops-templates/terraform-docker-github/README.md) for easy use.

Below you can find an example pipeline that uses the Github Actions workflow.
Read further down to see how to create the secrets needed to run the pipeline.

You should store this GitHub action in your Terraform repository under `.github/workflows/name.yaml`

```.github/workflows/core.yaml
name: terraform_core

on:
  push:
    branches:
      - main
    paths:
      - core/**
  pull_request:
    paths:
      - core/**
  workflow_dispatch:
    inputs:
      OPA_BLAST_RADIUS:
        description: OPA Blast Radius
        required: true
        default: "50"

jobs:
  terraform:
    uses: xenitab/azure-devops-templates/.github/workflows/terraform-docker.yaml@2021.10.1
    with:
      DIR: core
      runs-on: '["self-hosted", "linux"]' # If you do not want to use the default ubuntu-latest
      ENVIRONMENTS: |
        {
          "environments":[
            {"name":"dev"},
            {"name":"qa"},
            {"name":"prod"}
          ]
        }
    secrets:
      AZURE_CREDENTIALS_DEV: ${{ secrets.AZURE_CREDENTIALS_DEV }}
      AZURE_CREDENTIALS_QA: ${{ secrets.AZURE_CREDENTIALS_QA }}
      AZURE_CREDENTIALS_PROD: ${{ secrets.AZURE_CREDENTIALS_PROD }}
```

### Self-hosted runners

It is currently not possible to use self-hosted runners hosted in GitHub organization X while calling on workflows in GitHub organization Y.

To be able to use self-hosted runners you have to **import (not fork)** the repository to organization X the [workflow repository](https://github.com/XenitAB/azure-devops-templates)
and make it public. If you do not do this private repositories located in organization X will not be able to find the workflows.

### Azure Service Principal

Create a Service Principal(SP) with the access that Terraform requires to perform all the tasks you want.
You can read more about SP creation in our [getting started guide](getting-started.md)

The workflow is using [Azure Login GitHub Action](https://github.com/marketplace/actions/azure-login#configure-deployment-credentials)
to login to Azure. When uploading your SP to GitHub make sure to follow the formatting in the examples.

This is to prevent unnecessary masking of `{ }` in your logs which are in dictionary form.

**For example, do**:

```.json
{"clientId": "00000000-0000-0000-0000-000000000000",
  "clientSecret": "super-duper-secret-value",
  "subscriptionId": "00000000-0000-0000-0000-000000000000",
  "tenantId": "00000000-0000-0000-0000-000000000000"}
```

**instead of**:

```.json
{
  "clientId": "00000000-0000-0000-0000-000000000000",
  "clientSecret": "super-duper-secret-value",
  "subscriptionId": "00000000-0000-0000-0000-000000000000",
  "tenantId": "00000000-0000-0000-0000-000000000000"
}
```

Upload the entire JSON as your GitHub secret.
The workflow uses one secret per environment and we recommend that you follow our naming standard.
The secret name the workflow uses is **AZURE*CREDENTIALS*\<ENV\>**, for example **AZURE_CREDENTIALS_DEV**.

To upload the secret to GitHub you can use the GitHub UI or you can use the [GitHub CLI](https://github.com/cli/cli) to upload secrets to GitHub.

Assuming that you are storing the SP JSON data in a file you could do:

```shell
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_DEV < dev-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_QA < qa-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_PROD < prod-secrets.json
```
