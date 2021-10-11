---
id: get-started
title: Get Started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Setup Subscriptions

## Azure AD Configuration

A couple of manual steps are required before Terraform can be applied. A main service principal has to be created in the tenants Azure AD, as it will be used by the Terraform modules.

Create the new service principal. It should have a name with the format `sp-sub-<subscription_name>-all-owner`. Most likely the subscription name will be `xks`.

```shell
AZ_APP_NAME="sp-sub-<subscription_name>-all-owner"
AZ_APP_ID=$(az ad app create --display-name ${AZ_APP_NAME} --query appId -o tsv)
AZ_APP_OBJECT_ID=$(az ad app show --id ${AZ_APP_ID} --output tsv --query objectId)
az ad sp create --id ${AZ_APP_OBJECT_ID}
```

Grant the service principal additional permissions in the App Registration. The permissions `Group.ReadWrite.All` and `Application.ReadWrite.All` in Microsoft Graph should be added. After the
permissions are added grant admin consent for the Tenant.

Make the service principal `Owner` of all the XKS subscriptions. This is done in the IAM settings of each individual subscription. Additionaly the service principal also needs to be member of the User
administrator role.

Create three Azure AD groups. These will be used to assing users a owner, contributor, or reader role for all resources..

```shell
az ad group create --display-name az-sub-<subscription_name>-all-owner --mail-nickname az-sub-<subscription_name>-all-owner
az ad group create --display-name az-sub-<subscription_name>-all-contributor --mail-nickname az-sub-<subscription_name>-all-contributor
az ad group create --display-name az-sub-<subscription_name>-all-reader --mail-nickname az-sub-<subscription_name>-all-reader
```

## Setup Terraform


## Run Terraform


