---
id: github
title: XKF on Github
---

## Terraform

In GitHub there is no service connection like there is in Azure DevOps.
Instead we utilize a Azure SP to talk to Azure when running our CI pipelines.

Create a SP with the access that terraform requires to perform all the tasks you want.
You can read more about SP creation in our [operator guide](operator-guide.md)

The SP should look something like this when your SP is created:

```.json
{"clientId": "<GUID>",
  "clientSecret": "<CLIENT_SECRET_VALUE>",
  "subscriptionId": "<GUID>",
  "tenantId": "<GUID>"}
```

For example:

```.json
{"clientId": "00000000-0000-0000-0000-000000000000",
  "clientSecret": "super-duper-secret-value",
  "subscriptionId": "00000000-0000-0000-0000-000000000000",
  "tenantId": "00000000-0000-0000-0000-000000000000"}
```

Upload the entire json to your github secret.
We use one secret per environment and the secrets **have** to follow the namestandard that we have set for our secrets,
else the github action workflow won't be able to find the secret.

The secret name should be **AZURE_CREDENTIALS_\<ENV\>**, for  example **AZURE_CREDENTIALS_DEV**

To upload the secret to github you can use the github UI or you can use the [gh cli](https://github.com/cli/cli) to upload secrets to GitHub.

Assuming that you are storing the SP json data in a file you could do:

```shell
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_DEV < dev-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_QA < qa-secrets.json
gh secret -R ORG/xks-terraform set AZURE_CREDENTIALS_PROD < prod-secrets.json
```

### CI/CD

Just like in azure devops case we have created a
[basic pipeline](https://github.com/XenitAB/azure-devops-templates/terraform-docker-github/README.md)
for easy use.

Bellow you can find a example pipeline that uses the github action workflow.

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
    uses: xenitab/azure-devops-templates/.github/workflows/terraform-docker.yaml@2021.09.3
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
