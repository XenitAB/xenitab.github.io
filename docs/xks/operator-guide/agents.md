---
id: agents
title: Agents
---

import useBaseUrl from '@docusaurus/useBaseUrl';

It is preferable to use self hosted agents instead of using the default agents in Azure DevOps and GitHub. This is mostly for performance reasons, as the agents will most likely be faster, enable
running multiple jobs and cache container images. Currently agents for Azure DevOps and GitHub are supported, more may come in the future.

The setup of agents relies on the hub module. The hub module is used to create a central VNET that can be peered to multiple other VNETs. One important detail when running agents is that they should
be located in the production subscription if no other shared subscription exists. The agents expects that there is a hub VNET that can be used by the agents. The VNET is then peered to all other
environments vnets to limit the need to expose things to the public internet.

To configure the agents we need to run a few steps in a specific order.

- Create resource groups in governance
- Run Packer to create the VM images
- Create the agent resources
- Add the agents to the git provider
- Peering configuration both ways in hub and core

## Governance

The first step is to create the resource groups for the hub and agents. In the governance Terraform two resource groups have to be added to the `common.tfvars` file in the variables directory. The hub
resource group has to be created for both Azure DevOps and GitHub, the only difference is the name of the resource group where the agents are located.

```hcl
  {
    common_name                = "hub",
    delegate_aks               = false,
    delegate_key_vault         = true,
    delegate_service_endpoint  = false,
    delegate_service_principal = false,
    lock_resource_group        = false,
    tags = {
      "description" = "Hub Network"
    }
  },

# Azure DevOps

  {
    common_name                = "azpagent",
    delegate_aks               = false,
    delegate_key_vault         = true,
    delegate_service_endpoint  = false,
    delegate_service_principal = true,
    lock_resource_group        = false,
    tags = {
      "description" = "Azure Pipelines Agent"
    }
  },

# GitHub

  {
    common_name                = "ghrunner",
    delegate_aks               = false,
    delegate_key_vault         = true,
    delegate_service_endpoint  = false,
    delegate_service_principal = true,
    lock_resource_group        = false,
    tags = {
      "description" = "GitHub Runner"
    }
  },
```

The Service Principal credentials need to be stored as a secret when running Packer from GitHub. This step does not have to be followed when setting up Azure DevOps. The Service Principal id and
credentials can be retrieved after the Terraform has been applied. Read the [getting started guide](./getting-started/#configure-service-principal) for information about how to get the credential
information, the difference being that the application will be named `sp-rg-xks-prod-ghrunner-contributor` instead of `az-mg-lz-xks-owner`. The secret should be added to the repository packer, as the
VM image only has to be built for production it is enough to create the secret `AZURE_CREDENTIALS_PROD`. The format of the secret content should be as in the example below.

<!-- markdownlint-disable -->
<!-- prettier-ignore-start -->
```json
{"clientId": "00000000-0000-0000-0000-000000000000",
  "clientSecret": "super-duper-secret-value",
  "subscriptionId": "00000000-0000-0000-0000-000000000000",
  "tenantId": "00000000-0000-0000-0000-000000000000"}
```
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## VM Image

We make use of [Packer](https://www.packer.io/) to create the VM images. Packer allows for the automation of the process, creating the VM snapshot for us. The VM image has to be created before any VM
image can be created.

Create a repository called `packer` that is going to contain the CI jobs that will build the VM images. Doing this will allow for tracking of versions and automate the complicated build process.

There are templates for Azure DevOps that can be used to build the VM images for the agents. The following pipeline definition should be commited to the file `.ci/azure-pipelines-agent.yaml` in the
new `packer` repository. After that is done create a Azure DevOps pipeline for the given pipeline definition.

```yaml
name: $(Build.BuildId)

trigger: none

resources:
  repositories:
    - repository: templates
      type: git
      name: XKS/azure-devops-templates
      ref: refs/tags/2020.12.5

stages:
  - template: packer-docker/main.yaml@templates
    parameters:
      poolNameTemplate: ""
      azureSubscriptionTemplate: "xks-{0}-owner"
      resourceGroupTemplate: "rg-{0}-we-azpagent"
      packerTemplateRepo: "https://github.com/XenitAB/packer-templates.git"
      packerTemplateRepoBranch: "2021.06.1"
      packerTemplateFile: "templates/azure/azure-pipelines-agent/azure-pipelines-agent.json"
```

There is also a template for GitHub that can be used for building with Packer. The following pipeline definition should be committed to the file `.github/workflows/github-runner.yaml` in the `packer`
repository.

```yaml
name: packer_github_runner

on:
  workflow_dispatch: {}

jobs:
  packer:
    uses: xenitab/azure-devops-templates/.github/workflows/packer-docker.yaml@2021.11.1
    with:
      ENVIRONMENTS: |
        {
          "environments":[
            {"name":"prod"}
          ]
        }
      RESOURCE_GROUP_NAME_SUFFIX: "ghrunner"
      PACKER_TEMPLATE_REPO: "https://github.com/XenitAB/packer-templates.git"
      PACKER_TEMPLATE_REPO_BRANCH: "2021.06.1"
      PACKER_TEMPLATE_FILE: "templates/azure/azure-pipelines-agent/azure-pipelines-agent.json"
    secrets:
      AZURE_CREDENTIALS_PROD: ${{ secrets.AZURE_CREDENTIALS_PROD }}
```

Start the Packer build pipeline and allow it to run until completion. This may take up to 40 minutes to run so give it time. Afte the build is completed a new VM image should be created and stored in the
agent's resource group in Azure.

The name of the image is dynamic and includes a timestamp to allow versioning of the images. The following Azure CLI command gets the name of the image:

```shell
# Assuming that you do not have any other image this RG.
az image list -o json --query '[0].name'
```

The name should be similar to `azp-agent-2021-04-09T08-18-30Z`.

## Pre Setup

### GitHub

When using GitHub Runners a GitHub application has to be created that will allow the agent to communicate back to GitHub. Follow the steps in the [GitHub Runner
Documentation](https://github.com/XenitAB/github-runner#creating-a-github-app) for instructions in how to create the GitHub Application with the correct permissions. In the end you should have
created and installed a GitHub Application and have an application id, installation id, and private key.

These parameters should all be stored in the already created Azure Key Vault in the `ghrunner` resource group. The secrets should be named `github-app-id`, `github-private-key`,
`github-installation-id`, and `github-organization`.

## Terraform

When setting up the Terraform make sure to set the correct value for `azure_pipelines_agent_image_name` or `github_runner_image_name`. If everything has been configured properly the hub VNET and VMs
should be created without any issues.

```hcl
module "hub" {
  source = "github.com/xenitab/terraform-modules//modules/azure/hub?ref=2021.05.12"

  environment           = var.environment
  location_short        = var.location_short
  subscription_name     = var.subscription_name
  azure_ad_group_prefix = var.azure_ad_group_prefix
  name                  = var.name
  vnet_config           = var.vnet_config
  peering_config        = var.peering_config
}

# Azure DevOps

module "azpagent" {
  source = "github.com/xenitab/terraform-modules//modules/azure/azure-pipelines-agent-vmss?ref=2021.05.12"

  environment                      = var.environment
  location_short                   = var.location_short
  unique_suffix                    = var.unique_suffix
  name                             = "azpagent"
  azure_pipelines_agent_image_name = "azp-agent-2021-06-11T06-44-34Z"
  vmss_sku                         = "Standard_F4s_v2"
  vmss_disk_size_gb                = 64
  vmss_subnet_config = {
    name                 = module.hub.subnets["sn-${var.environment}-${var.location_short}-${var.name}-servers"].name
    virtual_network_name = module.hub.virtual_networks.name
    resource_group_name  = module.hub.resource_groups.name
  }
}

# GitHub

module "ghrunner" {
  source = "github.com/xenitab/terraform-modules//modules/azure/github-runner?ref=2021.05.12"

  environment              = var.environment
  location_short           = var.location_short
  name                     = "ghrunner"
  github_runner_image_name = "github-runner-2020-12-07T22-06-18Z"
  vmss_sku                 = "Standard_D2s_v3"
  vmss_instances           = 2
  vmss_disk_size_gb        = 50
  unique_suffix            = var.unique_suffix
  vmss_subnet_config = {
    name                 = module.hub.subnets["sn-${var.environment}-${var.location_short}-${var.name}-servers"].name
    virtual_network_name = module.hub.virtual_networks.name
    resource_group_name  = module.hub.resource_groups.name
  }
}
```

## Post Setup

After the cloud resources have been created their respective git providers have to be configured to be aware of the agent pools. Follow the instructions below to complete the post setup.

### Azure DevOps

This step only has to be followed when setting up Azure DevOps Agents.

To be able to communicate with the VMSS we need to configure a Service Connection. You will find service connection under a random project within Azure DevOps.

To setup the Service Connection you need to get a secret generated by Terraform.

```shell
# Assuming that you are connected to the correct subscription
az keyvault secret show --vault-name <vault-name> --name <secret-name> -o tsv --query value

# Example
az keyvault secret show --vault-name kv-prod-we-core-1337 --name sp-rg-xks-prod-azpagent-contributor -o tsv --query value
```

#### Service Connections

To create a new Service connection from Azure DevOps:

Project settings -> Service connections -> New service connection -> Azure Resource Manager -> Service principal (manual)

`{"clientId":"12345","clientSecret":"SoMuchSecret","subscriptionId":"sub-id","tenantId":"tenant-id"}`

- Subscription Id = subscriptionId
- Service Principal Id = clientId
- Service principal key = clientSecret
- Tenant ID = tenantId
- Service connection name = random-name

#### Agent Pool

In Azure DevOps under project settings.

Agent pools -> Add Pool -> Pick VMSS from dropdown

<img alt="Agent image" src={useBaseUrl("img/assets/xks/operator-guide/agent_pool.png")} />

#### Billing

Configure billing.

This will increase your azure cost. Read up on how much on your own.

Organization Settings -> Billing

Under "Self-Hosted CI/CD" set "Paid parallel jobs" = 3

## Peering Configuration

To complete the setup we need to configure the VNET peering between the new hub VNET and the environments VNETs. This enables the agents to communicate with private resources without having to egress
into the public Internet first.

In the hubs `prod.tfvars` you want to add configuration to all VNETs that the VNET should have access to. If you have multiple environments there should be multiple entries in the list.

```hcl
peering_config = [
  {
    name                         = "core-dev"
    remote_virtual_network_id    = "/subscriptions/your-sub-id/resourceGroups/rg-dev-we-core/providers/Microsoft.Network/virtualNetworks/vnet-dev-we-core"
    allow_forwarded_traffic      = true
    use_remote_gateways          = false
    allow_virtual_network_access = true
  },
]
```

A similar configuration has to be done in the core Terraform to complete the peering.

```hcl
peering_config = [
  {
    name                         = "hub"
    remote_virtual_network_id    = "/subscriptions/your-sub-id/resourceGroups/rg-prod-we-hub/providers/Microsoft.Network/virtualNetworks/vnet-prod-we-hub"
    allow_forwarded_traffic      = true
    use_remote_gateways          = false
    allow_virtual_network_access = true
  },
]
```
