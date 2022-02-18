---
id: node
title: Node config
---

## Azure

Our nodes are managed by azure but we set a number of

For smaller clusters we normally use Standard_E2s_v4 for default node pool.

### Azure Node type selection

### Azure default node pool

### Azure ephemeral nodes

Should I use ephemeral nodes?
The short answer is yes, using Ephemeral nodes is the new standard in Azure but it's not the standard in terraform.
This is probably due to terraform azurerm provider don't want to do breaking changes.
Using Ephemeral nodes will give you better IO on your OS disk, for example it will speed up the boot time of your Kubernetes nodes.
For more information look at the official [Azure Ephemeral os disk](https://docs.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks) documentation.

But there is a problem when starting to us ephemeral disk and it's that if you try to use more disk then the available cache disk that is available on your node type Azure will automatically change you from `Ephemeral` disk to `Managed`.
If you are using the azure cli to create your cluster you don't have to think about this (it will use the default value for the node) but when using Terraform you have to define `os_disk_size_gb`.

So how do I know how much disk I can use?

At the time of writing these docs there is no good answer to that question. The Azure documentation is rather inconsistent.
According to there docs you should be able see how much cache disk you can use by looking at the `()` in the table in: [fsv2](https://docs.microsoft.com/en-us/azure/virtual-machines/fsv2-series)

This is true for `fsv2-series` but it's not the case when it comes to.

When you have decided what type you want you can verify the available disk by running:

```shell
curl https://ephemeraldisk.danielstechblog.de/api/ephemeraldisk?location=northeurope&family=Ddsv4

curl https://ephemeraldisk.danielstechblog.de/api/ephemeraldisk?location=northeurope&family=Edsv4
```

Instead our default node will be: `Standard_E2ds_v4`

To verify that you have changed the disk type:

```shell
az aks nodepool show --cluster-name aks-dev-we-aks1 -g rg-dev-we-aks -n default | jq .osDiskType
```

Instead of we `Standard_D2s_v5` change to `Standard_D2d_v5`

References:

- [https://www.danielstechblog.io/identify-the-max-capacity-of-ephemeral-os-disks-for-azure-vm-sizes/](https://www.danielstechblog.io/identify-the-max-capacity-of-ephemeral-os-disks-for-azure-vm-sizes/)
- [https://github.com/azure/AKS/issues/2672](https://github.com/azure/AKS/issues/2672)

## AWS
