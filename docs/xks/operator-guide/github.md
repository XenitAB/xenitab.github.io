---
id: github
title: XKF on Github
---

As a XKF user you can use both Azure DevOps and GitHub to store
your terraform and gitops repositories.

In this document we will go through how to use XKF on GitHub focusing
on Infrastructure As Code (IAC) using Terraform.

## Terraform

How to run Terraform plan and apply through a GitHub action workflow.

### Workflow

Just like in azure devops case we have created a
[basic pipeline](https://github.com/XenitAB/azure-devops-templates/terraform-docker-github/README.md)
for easy use.

Below you can find a example pipeline that uses the github action workflow.
Read further down to see how to create the secrets needed to run the pipeline.

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
      runs-on: '["self-hosted", "linux"]' # If you don't want to use the default ubuntu-latest
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

### Azure

Create a Service Principal(SP) with the access that terraform requires to perform all the tasks you want.
You can read more about SP creation in our [operator guide](operator-guide.md)

We are using [Azure Login GitHub Action](https://github.com/marketplace/actions/azure-login#configure-deployment-credentials)
to login to Azure. When uploading your SP to GitHub make sure to follow the formatting in the examples.

This is to prevent unnecessary masking of { } in your logs which are in dictionary form.

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

Upload the entire json as your github secret.
We use one secret per environment and it **have** to follow our namestandard or
else the github action workflow won't be able to find the secret.
The secret name should be **AZURE_CREDENTIALS_\<ENV\>**, for  example **AZURE_CREDENTIALS_DEV**

To upload the secret to github you can use the github UI or you can use the [gh cli](https://github.com/cli/cli) to upload secrets to GitHub.

Assuming that you are storing the SP json data in a file you could do:

```shell
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_DEV < dev-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_QA < qa-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_PROD < prod-secrets.json
```
