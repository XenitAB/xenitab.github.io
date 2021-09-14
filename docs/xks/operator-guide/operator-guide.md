---
id: operator-guide
title: Operator Guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Bootstrap

## Add New Tenant

When creating a new tenant there a number of for now manual processes to make.

In this scenario we are assuming that you are using azure devops and that you have already created a project and organization.

In many places in the text we have provided names, they are just examples, all of these names can be exchanged to fit your needs.

In your project lets call it project1 in the future manually import a repository.
[https://github.com/XenitAB/azure-devops-templates](https://github.com/XenitAB/azure-devops-templates)

### Import azure-devops-templates pipeline

To make sure that the azure-devops-templates repo is up to date we have a automatic CI that fetches updates from upstream to your local azure devops clone.

Go to pipelines -> New pipeline -> Azure Repos Git -> azure-devops-templates -> Existing Azure Pipelines YAML file

Import the pipeline from the following path: /.ci/pipeline.yaml

### Setup XKS

In this case we will only setup a single XKS cluster in one environment, in our case dev.
It's easy to add more environments when you have created your first one.

At Xenit we are using terraform modules that we share [upstream](https://github.com/XenitAB/terraform-modules)

To setup XKS we will utilize 4 modules:

- governance-global
- governance-regional
- core
- aks

### Create terraform repo

Of course we need a place to store our terraform code so create on in your azure devops organization.
TODO create a example repo that uses our terraform modules.

You can today see a example of the [Makefile](https://github.com/XenitAB/github-actions#using)

This is how we normally [structure](https://www.terraform.io/docs/language/modules/develop/structure.html) our tenant repo

```txt
├── Makefile
├── README.md
├── aks
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
├── core
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
├── global.tfvars
├── governance
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
```

### Update repo

We need to update a number of settings in a number of places in your terraform repo.

Generate a SUFFIX that should be tfstate + a few random numbers, for example "tfstate1234"

Update the Makefile SUFFIX variable with the suffix and the random number.

Also update global.tfvars with the same random number.

### Create terraform storage

In order to store a terraform state we need to prepare that.

We have written a small golang tool that will help out with [that](https://github.com/XenitAB/github-actions/tree/main/docker/go-tf-prepare)

Instead of running these a number of these scripts manually we will use the make file.

We use one terrafrom state per DIR and environment.
Lets create the first terraform state, in this case governance.

`make prepare ENV=dev DIR=governance`

You will need to run the prepare command for each separate terraform folder.

### Configure governance

After defining the variables and you have have applied your config

```shell
make plan ENV=dev DIR=governance
# If everything looks good
make apply ENV=dev DIR=governance
```

### Configure core

Get a CIDR network for your AKS env per env.
Define in core/variables/env.tfvars

### Configure AKS cluster

- How big should your cluster be?
- Which version of kubernetes should you run?
- What DNS zone should you use?
- What SKU tier should your cluster have?
- What size should your k8s nodes have?

All of this is configured under aks/variables/prod.tfvars

```prod.tfvars
environment = "prod"
dns_zone    = "prod.aks.xenit.io"

aks_config = {
  kubernetes_version = "1.20.7"
  sku_tier           = "Free"
  default_node_pool = {
    orchestrator_version = "1.20.7"
    vm_size              = "Standard_D2as_v4"
    min_count            = 1
    max_count            = 1
    node_labels          = {}
  },
  additional_node_pools = [
    {
      name                 = "standard2"
      orchestrator_version = "1.20.7"
      vm_size              = "Standard_D2as_v4"
      min_count            = 1
      max_count            = 4
      node_labels          = {}
      node_taints          = []
    },
  ]
}
```

> Notice the vm_size = Standard_D2as_v4

### GitOps using flux

If you want flux to manage your GitOps repo from the get go you can enable this in aks/variables/common.tfvars
In my case I will have flux manage a namespace called monitor and sync a repo under monitor-gitops.

You need to create the repository in Azure Devops that you link to before applying this terraform.
The repository can be empty.

You will also need to create a separate repository for `fleet-infra`, this repo is used to store flux config.
> This repo cannot be empty and needs a README file or something similar to work as intended before you run terraform.

In the example bellow we are using Azure DevOps as our CSM system, but we also support GitHub.
If you want to use GitHub just fill in it's config and make azure_devops empty instead.

```common.tfvars
namespaces = [
  {
    name                    = "monitor"
    delegate_resource_group = true
    labels = {
      "terraform" = "true"
    }
    flux = {
      enabled = true
      azure_devops = {
        org  = "organization1"
        proj = "project1"
        repo = "monitor-gitops"
      }
      github = {
        repo = ""
      }
    }
  }
]
```

## Terraform CI/CD

We have one CI/CD pipeline per terraform directory.
You can find ready to use pipelines under .ci/ in the terraform repo.

### Configure service principal

There are a few manual steps that you need to perform before we can start to configure the CI/CD pipeline.

#### Service principal access

Follow the instructions on how to [create a SP](https://github.com/XenitAB/terraform-modules/blob/main/modules/azure/README.md
).

In some cases it might be useful to create a group where both a admin group for you as an admin the SP can use and assign the group the needed access.
Depending on how your global.tfvars look like it will be called something like: `az-mg-lz-xks-owner`.

#### Create Service principal key

The SP that we use is generated by terraform but we do not store the key any where,
so this is among the few times that we have to do something manual.

First find the SP that you will use, this will depend on your terraform config.

There is no CLI command to create a new key so it's done through the portal.

AAD -> App registrations -> All applications -> *search for the application* -> Certificates & secrets -> New client secret

The key is only shown once, so copy it some where safe for long term storage. This key will be used when creating the service connection in azure devops.

### Setup Service Connection

To be able to talk from Azure DevOps to Azure and be able to run Terraform on push we need to configure service connections.
Now you will also need the key that we created in the SP earlier.

Get the config:

```shell
# Service Principal Id
APP_ID=$(az ad sp list --display-name sp-sub-xks-all-owner -o tsv --query '[].appId')
# Tenant ID
TENANT_ID=$(az account show -o tsv --query tenantId)
# Subscription Id
SUB_ID=$(az account show -o tsv --query id)
```

In Azure DevOps:
Project settings -> Service connections -> New service connection -> Azure Resource Manager -> Service principal (manual)

- Subscription Id = $SUB_ID
- Service Principal Id = $APP_ID
- Service principal key = The key created in the earlier step
- Tenant ID = $TENANT_ID
- Service connection name = xks-<environment\>-owner

### Update pipelines

Update the variable azureSubscriptionTemplate. You can find the value under Project settings -> Service Connections

<img alt="Service Connections" src={useBaseUrl("img/operator/project_settings.png")} />

In my case sp-sub-project1-xks

```yaml
name: $(Build.BuildId)

variables:
  - name: azureSubscriptionTemplate
    value: "sp-sub-project1-xks-{0}-owner"
  - name: terraformFolder
    value: "governance"
  - name: sourceBranch
    value: "refs/heads/main"
```

Also update the project path in name. Also notice the ref, the ref points to witch version of the module that you are using.

```yaml
resources:
  repositories:
    - repository: templates
      type: git
      name: project1/azure-devops-templates
      ref: refs/tags/2021.03.1
```

### Add CI/CD pipelines

Once again add a pipeline.

Assuming that you named your repository to terraform

Pipelines -> New pipeline -> Azure Repos Git -> terraform -> Existing Azure Pipelines YAML file

Import the pipeline from the following path: .ci/pipeline-governance.yaml

Hopefully after adding the pipeline the pipeline should automatically trigger and the plan and apply stage should go through without a problem.

### Create PAT secret

To make it possible for flux to clone repos from azure devops we need to create a Personal Access Token(PAT).

User Settings -> Personal access tokens -> New Token

<img alt="Settings user" src={useBaseUrl("img/operator/settings_user.png")} />

Create a PAT

<img alt="Create PAT" src={useBaseUrl("img/operator/create_pat.png")} />

Copy the generated key, we will need it for the next step.

### Add PAT to Azure Key Vaults

To make it possible for terraform to reach the PAT in a easy and secure way we have chosen to store the PAT in Azure Key Vaults which you need to add manually.

#### az cli

You can add the secret using the az cli.

Call the secret azure-devops-pat and the value should be the token you created in azure devops.

```bash
# List all key vaults
az keyvault list

# Create the secret
az keyvault secret set --vault-name kv-dev-we-core-1234 --name azure-devops-pat --value "SuperSecretToken123"
```

#### Azure portal

Or if you prefer use the UI.

In azure portal search for "Key vaults" and pick the core one that matches the unique_suffix that you have specified in global.tfvars, in our case 1234.

Key vaults -> core-1234 -> Secrets -> Generate/Import

<img alt="Azure Key Vaults" src={useBaseUrl("img/operator/azure_key_vault.jpg")} />

Call the secret "azure-devops-pat" and add the PAT key that you created in the previous step.

## Admin and developer access

Hopefully you should now have one XKS cluster up and running, but currently no developer can actually reach the cluster.

In XKF we see clusters as cattle and at any time we can decide to recreate a XKS cluster.
To be able to do this without our developers even knowing we use blue green clusters, TODO write a document on how blue green clusters works and link.
We use GitOps together with DNS to be able to migrate applications without any impact to end-users assuming that our developers have written 12 step applications.
To store state we utilize the cloud services available in the different clouds that XKF supports.

To make sure that our developers don't notice when we change our the cluster we have written a Kubernetes API Proxy called [azad-kube-proxy](https://github.com/XenitAB/azad-kube-proxy).

### Azure AD Kubernetes Proxy

AZAD as we also call it, is a deployment that runs inside XKS and sits in front of the kubernetes API.

We also supply a krew/kubectl plugin to make it easy for our developers to use AZAD.
For instructions on how to setup and configure [see](https://github.com/XenitAB/azad-kube-proxy).

#### AZAD Usage

Install krew: [https://krew.sigs.k8s.io/docs/user-guide/setup/install/#windows](https://krew.sigs.k8s.io/docs/user-guide/setup/install/#windows)
Install azad-proxy plugin: kubectl krew install azad-proxy
Login with azure cli (a valid session with azure cli is always required): az login
Discover the clusters: `kubectl azad-proxy discover`

There are two ways to connect to the cluster using azad.

Ether use the menu feature:
`kubectl azad-proxy menu`

Or connect by using the generate command:
`kubectl azad-proxy generate --cluster-name dev-cluster --proxy-url https://dev.example.com --resource https://dev.example.com`

### AAD groups

To make it possible for our developers and admins to actually login to the cluster we need to add them to a AAD group.

If you are a AAD guest user you need to add the AAD Role: **Directory Reader** to your user account.
AZAD proxy parses the AAD and that is why the user needs Directory Reader.

#### No subscription

If you haven't gotten any of the RG groups that XKF generates and perform `az login` you might see an error
saying that you don't have any subscriptions.

This is more likely if you are running XKF in AWS but also possible in Azure.
Do as the error suggest and use the `--allow-no-subscription`.

```shell
# The variable TENANT_ID = your tenant id
az login $TENANT_ID --allow-no-subscription
```

AZAD proxy should still work.

#### Developer groups

Depending on what configuration you did in global.tfvars this will differ but the group name should be something like bellow.

This group will give your developers contributor access in the namespaces where they have access.

`<azure_ad_group_prefix>-rg-xks-<cluster-env>-aks-contributor`

Example: `az-rg-xks-dev-aks-contributor`

#### Admin groups

To make it easy for you as a admin you should also use AZAD.

To give your self cluster-admin:

`<azure_ad_group_prefix>-xks-<cluster-env>-clusteradmin`

Example: aks-xks-dev-clusteradmin

#### Verify access

There is a command option in kubernetes called --as, which enables you to see if a specific user got access to a specific resource.

> Note this will not work if you are connecting to the cluster using AZAD-proxy due to it uses the --as option to run the commands for you.

Since we are using OIDC we also need to provide the group id, you can find the group id in AAD.
You can find the UUID of the group in AAD.

`kubectl get pods --as-group=12345678-1234-1234-1234-00000000000 --as="fake`

If you already have a rolebinding where a existing UUID exist you can run the following command:

`kubectl get pods --as-group=$(kubectl get rolebinding <rolebiding-name> -o jsonpath='{.subjects[0].name}') --as="fake`

### Authorized IP

To minimize the exposure of the XKS clusters we define a list of authorized ip:s that is approved to connect the kubernetes cluster API.

We need to approve multiple infrastructure networks and user networks.

- If you are using the HUB module and you are running VMSS Azure Devops Agent you need to approve those IP:s as authorized.
- The AKS public ip
- Your developers public ip

A recommendations is to add a comment with what IP you have added.

aks_authorized_ips = [
  "8.8.8.8/32",  # google dns
  "1.2.3.4/32",  # developer x ip
  "2.3.4.5/30",  # AKS0 dev
]
