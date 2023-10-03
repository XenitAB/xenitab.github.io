---
id: node
title: Node config
---

## Azure

Our Kubernetes nodes are managed by azure.

### Azure Node type selection

TBD

### Azure default node pool

For smaller clusters we normally use Standard_E2s_v4 for default node pool, if you want to use ephemeral OS disk you can use: Standard_E2ds_v4.

TBD

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

This is true for `fsv2-series` but it's not the case when it comes to `Edsv4-series` and both of them say that `Ephemeral OS Disks: Supported`.

When you have decided what type you want you can verify the available disk by running:

```shell
curl https://ephemeraldisk.danielstechblog.de/api/ephemeraldisk?location=northeurope&family=Fsv2

curl https://ephemeraldisk.danielstechblog.de/api/ephemeraldisk?location=northeurope&family=Ddsv4

curl https://ephemeraldisk.danielstechblog.de/api/ephemeraldisk?location=northeurope&family=Edsv4
```

In your terraform config set define `os_disk_type="Ephemeral"` and `os_disk_size_gb = 128` if you are using `Standard_F8s_v2`.

If you define bigger os disk size than what is available you will get an error when using terraform.

```.hcl
aks_config = {
  kubernetes_version = "1.21.2"
  sku_tier           = "Paid"
  default_node_pool = {
    orchestrator_version = "1.21.2"
    vm_size              = "Standard_E2s_v4"
    min_count            = 1
    max_count            = 1
    node_labels          = {}
  },
  additional_node_pools = [
    {
      name                 = "standard2"
      orchestrator_version = "1.21.2"
      vm_size              = "Standard_F8s_v2"
      min_count            = 3
      max_count            = 20
      node_labels          = {}
      node_taints          = []
      os_disk_type         = "Ephemeral"
      os_disk_size_gb      = 128
      spot_enabled         = false
      spot_max_price       = null
    }
  ]
}
```

The minimal AKS image size supported is [30Gb](https://docs.microsoft.com/en-us/azure/aks/cluster-configuration#use-ephemeral-os-on-existing-clusters).
The default value of `os_disk_size_gb` is 128Gb. Many of the smaller node types have rather small ephemeral disks available. For example `Standard_F2s_v2` only have 32Gb available.
This leaves a rather small place for things like container images, logs and emptyDir.

To workaround this issue it is possible to set `kubelet_disk_type = "Temporary"`, this way it will be possible to use the temporary disk
that always is available on all azure vm:s. These disks are in general bigger then the ephemeral disk.
This features got supported very recently in [azurerm](https://github.com/hashicorp/terraform-provider-azurerm/issues/15449) so we haven't had time to implement it.
This is high on our TODO and you can follow the feature [here](https://github.com/XenitAB/terraform-modules/issues/554).
In the mean time you can only use ephemeral or managed os disk.

You can easy see what disk type you are using on your nodepool:

```shell
az aks nodepool show --cluster-name aks-dev-we-aks1 -g rg-dev-we-aks -n default | jq .osDiskType
```

References:

- [https://www.danielstechblog.io/identify-the-max-capacity-of-ephemeral-os-disks-for-azure-vm-sizes/](https://www.danielstechblog.io/identify-the-max-capacity-of-ephemeral-os-disks-for-azure-vm-sizes/)
- [https://github.com/azure/AKS/issues/2672](https://github.com/azure/AKS/issues/2672)

## AWS

TBD
