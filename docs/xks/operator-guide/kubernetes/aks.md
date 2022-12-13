---
id: aks
title: AKS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Node Pools

### VM Disk Type

XKF makes an opinionated choice with regards to the disk type. AKS has the option of either using managed disks och ephemeral storage. Managed disks offer the simplest solution, they can be sized according to requirements and are persisted across the whole nodes life cycle. The downside of managed disks is that the performance is limited as the disks are not located on the hardware. Disk performance is instead based on the size of the disk. The standard size used by AKS for the managed OS disk is 128 GB which makes it a [P10](https://azure.microsoft.com/en-us/pricing/details/managed-disks/) disk that will max out at 500 IOPS. It is important to remember that the OS disk is used by all processes. Pulled OCI binaries, container logs, and ephemeral Kubernetes volumes. All these processes will share the same disk performance. An application that for example writes large amount of requests, logs every HTTP request, can consume large amounts of IOPS as logs written to STDOUT will be written to disk. Another smaller downside with managed disks is that the disks are billed per GB on top of the VM cost, this represents a very small percentage of the total AKS cost.

Ephemeral storage on the other hand offer higher IOPS out of the box at the cost of not persisting data and increased dependency on the VM type. This storage type uses the cache disk on the VM as storage for the OS and other kubelet related resources. The size of the cache will vary based on the VM type and size, meaning that different node pools may have different amounts of available storage for example ephemeral volumes. A general rule is however that the [cache disk has to be at least 30GB](https://docs.microsoft.com/en-us/azure/aks/cluster-configuration#use-ephemeral-os-on-existing-clusters) which removes some of the smallest VM sizes from the pool of possibilities. Remember that a cache disk of 30GB does not mean 30GB of free space as the OS will consume some of that space. It may be wise to lean towards fewer larger VMs instead of more smaller VMs to increase the amount of disk available.

Instance type availability is not properly documented currently, partly because the feature is relatively new. Regional differences has been observed where ephemeral VMs may be available in one region but not the other for the same VM type and size. There is no proper way currently to determine which regions are available, instead this has to be done through trial and error. The same can be said about the cache instance size. Some instance types have the cache size documented others do not, but will still work. Check the [VM sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes) documentation for availability information first. The cache size is given as the value in the parentheses in the "Max cached and temp storage throughput" column. XKF does not allow configuration of the OS disk size because the configuration is so error prone. Instead it has a list of [know chache sizes](https://github.com/XenitAB/terraform-modules/blob/main/modules/azure/aks/aks.tf#L100-L150) for each VM type and size. The correct OS disk size will be set based on the VM selected.

### System Pool

AKS requires the configuration of a system node pool when creating a cluster. This system node pool is not like the other additional node pools. It is tightly coupled to the AKS cluster. It is not possible without manual intervention to change the instance type or taints on this node pool without recreating the cluster. Additionally the system node pool cannot scale down to zero. For AKS to work there has to be at least one instance present. This is because critical system pods like Tunnelfront or Konnectivity and CoreDNS will by default run on the system node pool. For more information about AKS system node pool refer to the [official documentation](https://docs.microsoft.com/en-us/azure/aks/use-system-pools#system-and-user-node-pools). XKF follows the Azure recommendation and runs only system critical applications on the system node pool. Doing this protects services like CoreDNS from starvation or memory issues caused by user applications running on the same nodes. This is achieved by adding the taint `CriticalAddonsOnly` to all of the system nodes.

The VM size and family of the default node pool is [hard coded](https://github.com/XenitAB/terraform-modules/blob/main/modules/azure/aks/aks.tf#L48-L63) in XKF. This is to assure standard configuration that follows best practices across all clusters. The default node pool VM will be a `Standard_D2ds_v5` instance configured to be ephemeral. There is currently only one configuration parameter for the default node pool. The parameter [production grade](https://github.com/XenitAB/terraform-modules/blob/56180e65d303469ca973d882760adacc82fdb740/modules/azure/aks/variables.tf#L37) determines if the default node pool should have one or two instances.

#### Updating Configuration

There may come times when Terraform wants to recreate the AKS cluster when the system node pool has been updated. This happens when updating certain properties in the system node pool. It is still possible to do these updates without recreating the cluster, but it requires some manual intervention. AKS requires at least one system node pool but does not have an upper limit. This makes it possible to manually add a new temporary system node pool. Remove the existing default node pool created by Terraform. Create a new system node pool with the same name but with the updated parameters. Finally remove the temporary node pool. Terraform will just assume that the changes have already been applied and import the new state without any other complaints.

Start off with creating a temporary system pool. Make sure to replace the cluster name and resource groups to the correct values.

```shell
az aks nodepool add --cluster-name <cluster_name> --resource-group <resource_group> --name temp --mode "System" --node-count 1
```

> It may not be possible to create a new node pool with the current Kubernetes version if the cluster has not been updated in a while. Azure will remove minor versions as new versions are released. In that case you will need to upgrade the cluster to the latest minor version before making changes to the system pool, as AKS will not allow a node with a newer version than the control plane.

Delete the system node pool created by Terraform.

```shell
az aks nodepool delete --cluster-name <cluster_name> --resource-group <resource_group> --name default
```

Create a new node pool with the new configuration.

```shell
az aks nodepool add --cluster-name <cluster_name> --resource-group <resource_group> --name default --mode "System" --node-count 1 --node-osdisk-type Ephemeral --node-osdisk-size 75 --node-vm-size Standard_D2ds_v5 --node-taints "CriticalAddonsOnly=true:NoSchedule" --zones 1 2 3
```

Delete the temporary pool.

```shell
az aks nodepool delete --cluster-name <cluster_name> --resource-group <resource_group> --name temp
```

For additional information about updating the system nodes refer to [this blog post](https://pumpingco.de/blog/modify-aks-default-node-pool-in-terraform-without-redeploying-the-cluster/).

### Worker Pool

Worker node pools are all other node pools in the cluster. The main purpose of the worker node pools are to run application workloads. They do not run any system critical Pods. However they will run system Pods if they are deployed from a Daemonset, this includes applications like Kube Proxy and CSI drivers.

All node pools created within XKF will have autoscaling enabled and set to scale across all availability zones in the region. These settings cannot be changed, it is however possible to set a static amount of instances by specifying the min and max count to be the same. XKF exposes few settings to configure the node instances. The main one being the instance type, min and max count, and Kubernetes version. Other non default node pool settings will not be exposed as a setting as XKF is a opinionated solution. This means at times that default settings can be changed in the future.

#### Updating Configuration

Updating the configuration of the worker pools may result in three different outcomes. The change can cause a simple update, force replacement of all of the nodes, or require a full re-creation of the node pool resource. It is fine to make a parameter change in place if it results in a quick update. However in the latter two cases it is better to replace the node pool all together. It is a safer option which allows for rollbacks.

```hcl
aks_config = {
  node_pools = [
    {
      name      = "standard1"
      version   = "1.21.9"
      vm_size   = "Standard_D2ds_v5"
      min_count = 1
      max_count = 3
      node_labels = {}
      node_taints    = []
      spot_enabled   = false
      spot_max_price = null
    },
  ]
}
```

Add a new node pool to the cluster which is identical to the existing node pool minus any configuration changes that are supposed to be done. Notice that the existing node pool is called `standard1` and the new node pool is called `standard2`. This is a naming standard in XKF to be able to replace node pools. If the existing node pool was named `standard2` the new one should be called `standard1`. Apply the Terraform to create the new node pool.

```hcl
aks_config = {
  node_pools = [
    {
      name      = "standard1"
      version   = "1.21.9"
      vm_size   = "Standard_D2ds_v5"
      min_count = 1
      max_count = 3
      node_labels = {}
      node_taints    = []
      spot_enabled   = false
      spot_max_price = null
    },
    {
      name      = "standard2"
      version   = "1.22.6"
      vm_size   = "Standard_D2ds_v5"
      min_count = 1
      max_count = 3
      node_labels = {}
      node_taints    = []
      spot_enabled   = false
      spot_max_price = null
    },
  ]
}
```

Remove the existing node pool `standard1` from the configuration and apply the Terraform. This will safely cordon and drain all the nodes in the node pool before removing the VMs when all Pods have moved off of the node.

```hcl
aks_config = {
  node_pools = [
    {
      name      = "standard2"
      version   = "1.22.6"
      vm_size   = "Standard_D2ds_v5"
      min_count = 1
      max_count = 3
      node_labels = {}
      node_taints    = []
      spot_enabled   = false
      spot_max_price = null
    },
  ]
}
```

## FAQ

### Are there useful commands when upgrading clusters or node pools?

Show node version.

```shell
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.metadata.labels.kubernetes\.azure\.com\/node-image-version}{"\n"}{end}'
```

Watch all nodes.

```shell
watch kubectl get nodes
```

Check the status of all pods in the cluster.

```shell
kubectl get pods -A
```

### Which Kubernetes versions are available in my region?

View all Kubernetes versions in a region.

```shell
az aks get-versions --location <location> -o table
```

Get Kubernets version upgrade paths for a specific cluster.

```shell
az aks get-upgrades --resource-group <resource_group> --name <cluster_name> -o table
```
