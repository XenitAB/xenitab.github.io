(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{100:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return O}));var r=a(3),n=a(7),b=(a(0),a(126)),c={title:"GitHub Actions Self-hosted Runner",slug:"/terraform-modules/azure/github-runner",custom_edit_url:"https://github.com/XenitAB/terraform-modules/edit/main/modules/azure/github-runner/README.md"},i={unversionedId:"terraform-modules/azure/github-runner",id:"terraform-modules/azure/github-runner",isDocsHomePage:!1,title:"GitHub Actions Self-hosted Runner",description:"This is the setup for GitHub Actions Self-hosted Runner Virtual Machine Scale Set (VMSS).",source:"@site/docs/terraform-modules/azure/github-runner.md",slug:"/terraform-modules/azure/github-runner",permalink:"/docs/terraform-modules/azure/github-runner",editUrl:"https://github.com/XenitAB/terraform-modules/edit/main/modules/azure/github-runner/README.md",version:"current",sidebar:"docs",previous:{title:"Core",permalink:"/docs/terraform-modules/azure/core"},next:{title:"Governance (Deprecated)",permalink:"/docs/terraform-modules/azure/governance"}},l=[{value:"GitHub Runner Configuration",id:"github-runner-configuration",children:[]},{value:"Requirements",id:"requirements",children:[]},{value:"Providers",id:"providers",children:[]},{value:"Modules",id:"modules",children:[]},{value:"Resources",id:"resources",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Outputs",id:"outputs",children:[]}],u={rightToc:l};function O(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(b.b)("wrapper",Object(r.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("p",null,"This is the setup for GitHub Actions Self-hosted Runner Virtual Machine Scale Set (VMSS)."),Object(b.b)("h2",{id:"github-runner-configuration"},"GitHub Runner Configuration"),Object(b.b)("p",null,"Setup a GitHub App according to the documentation for ",Object(b.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/XenitAB/github-runner"}),"XenitAB/github-runner"),"."),Object(b.b)("p",null,"Setup an image using Packer according ",Object(b.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/XenitAB/packer-templates/tree/main/templates/azure/github-runner"}),"github-runner")," in ",Object(b.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/XenitAB/packer-templates"}),"XenitAB/packer-templates"),"."),Object(b.b)("h2",{id:"requirements"},"Requirements"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_terraform"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#requirement_terraform"}),"terraform")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"0.14.7")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_azurerm"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#requirement_azurerm"}),"azurerm")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"2.55.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"requirement_tls"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#requirement_tls"}),"tls")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"3.1.0")))),Object(b.b)("h2",{id:"providers"},"Providers"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Version"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_azurerm"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#provider_azurerm"}),"azurerm")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"2.55.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"provider_tls"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#provider_tls"}),"tls")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"3.1.0")))),Object(b.b)("h2",{id:"modules"},"Modules"),Object(b.b)("p",null,"No modules."),Object(b.b)("h2",{id:"resources"},"Resources"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/resources/key_vault_access_policy"}),"azurerm_key_vault_access_policy.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/resources/key_vault_secret"}),"azurerm_key_vault_secret.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/resources/linux_virtual_machine_scale_set"}),"azurerm_linux_virtual_machine_scale_set.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/tls/3.1.0/docs/resources/private_key"}),"tls_private_key.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"resource")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/image"}),"azurerm_image.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/key_vault"}),"azurerm_key_vault.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/key_vault_secret"}),"azurerm_key_vault_secret.github_secrets")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/resource_group"}),"azurerm_resource_group.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/subnet"}),"azurerm_subnet.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"https://registry.terraform.io/providers/hashicorp/azurerm/2.55.0/docs/data-sources/subscription"}),"azurerm_subscription.this")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"data source")))),Object(b.b)("h2",{id:"inputs"},"Inputs"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Name"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Description"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Default"),Object(b.b)("th",Object(r.a)({parentName:"tr"},{align:"center"}),"Required"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_environment"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_environment"}),"environment")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The environment (short name) to use for the deploy"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_app_id_kvsecret"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_app_id_kvsecret"}),"github","_","app","_","id","_","kvsecret")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure KeyVault Secret containing the GitHub App ID"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"github-app-id"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_installation_id_kvsecret"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_installation_id_kvsecret"}),"github","_","installation","_","id","_","kvsecret")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure KeyVault Secret containing the GitHub App Installation ID"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"github-installation-id"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_organization_kvsecret"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_organization_kvsecret"}),"github","_","organization","_","kvsecret")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure KeyVault Secret containing the GitHub Organization name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"github-organization"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_private_key_kvsecret"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_private_key_kvsecret"}),"github","_","private","_","key","_","kvsecret")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure KeyVault Secret containing the GitHub App Private Key"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"github-private-key"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_runner_image_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_runner_image_name"}),"github","_","runner","_","image","_","name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure Pipelines agent image name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_github_runner_image_resource_group_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_github_runner_image_resource_group_name"}),"github","_","runner","_","image","_","resource","_","group","_","name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The Azure Pipelines agent image resource group name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_keyvault_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_keyvault_name"}),"keyvault","_","name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The keyvault name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_keyvault_resource_group_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_keyvault_resource_group_name"}),"keyvault","_","resource","_","group","_","name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The keyvault resource group name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_location_short"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_location_short"}),"location","_","short")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The location (short name) for the region"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_name"}),"name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The commonName to use for the deploy"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_resource_group_name"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_resource_group_name"}),"resource","_","group","_","name")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The resource group name"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_unique_suffix"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_unique_suffix"}),"unique","_","suffix")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"Unique suffix that is used in globally unique resources names"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'""')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_admin_username"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_admin_username"}),"vmss","_","admin","_","username")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The admin username"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"ghradmin"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_disk_size_gb"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_disk_size_gb"}),"vmss","_","disk","_","size","_","gb")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The disk size (in GB) for the VMSS instances"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"128")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_instances"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_instances"}),"vmss","_","instances")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The number of instances"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"1")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_sku"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_sku"}),"vmss","_","sku")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The sku for VMSS instances"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},'"Standard_F4s_v2"')),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_subnet_config"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_subnet_config"}),"vmss","_","subnet","_","config")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The subnet configuration for the VMSS instances"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"object({",Object(b.b)("br",null),"    name                 = string",Object(b.b)("br",null),"    virtual_network_name = string",Object(b.b)("br",null),"    resource_group_name  = string",Object(b.b)("br",null),"  })")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"n/a"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"yes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("a",{name:"input_vmss_zones"})," ",Object(b.b)("a",Object(r.a)({parentName:"td"},{href:"#input_vmss_zones"}),"vmss","_","zones")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"The zones to place the VMSS instances"),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"list(string)")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(b.b)("pre",null,"[",Object(b.b)("br",null),'  "1",',Object(b.b)("br",null),'  "2",',Object(b.b)("br",null),'  "3"',Object(b.b)("br",null),"]")),Object(b.b)("td",Object(r.a)({parentName:"tr"},{align:"center"}),"no")))),Object(b.b)("h2",{id:"outputs"},"Outputs"),Object(b.b)("p",null,"No outputs."))}O.isMDXComponent=!0},126:function(e,t,a){"use strict";a.d(t,"a",(function(){return j})),a.d(t,"b",(function(){return o}));var r=a(0),n=a.n(r);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},b=Object.keys(e);for(r=0;r<b.length;r++)a=b[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(r=0;r<b.length;r++)a=b[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var u=n.a.createContext({}),O=function(e){var t=n.a.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},j=function(e){var t=O(e.components);return n.a.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},p=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,b=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),j=O(a),p=r,o=j["".concat(c,".").concat(p)]||j[p]||m[p]||b;return a?n.a.createElement(o,i(i({ref:t},u),{},{components:a})):n.a.createElement(o,i({ref:t},u))}));function o(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var b=a.length,c=new Array(b);c[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var u=2;u<b;u++)c[u]=a[u];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,a)}p.displayName="MDXCreateElement"}}]);