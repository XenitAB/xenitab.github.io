---
id: aks
title: AKS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## System Node Pool

AKS requires the configuration of a system node pool when creating a cluster. This system node pool is not like the other additional node pools. It is tightly coupled to the AKS cluster. It is not
possible without manual intervention to change the instance type or taints on this node pool without recreating the cluster. Additionally the system node pool cannot scale down to zero, for AKS to
work there has to be at least one instance present. This is because critical system pods like Tunnelfront and CoreDNS will by default run on the system node pool. For more information about AKS
system node pool refer to the [official documentation](https://docs.microsoft.com/en-us/azure/aks/use-system-pools#system-and-user-node-pools).

XKS follows the Azure recommendation and runs only system critical applications on the system node pool. Doing this protects services like CoreDNS from starvation or memory issues caused by user
applications running on the same nodes. This is achieved by adding the taint `CriticalAddonsOnly` to all of the system nodes.

### Sizing Nodes

Smaller AKS clusters can survive with a single node as the load on the system applications will be moderately low. In larger clusters and production clusters it is recommended to run at least three
system nodes that may be larger in size. This section aims to describe how to properly size the system nodes.

The minimum requirement for a system node is a VM with at least 2 vCPUs and 4GB of memory. Burstable B series VMs are not recommended. A good starting point for all clusters are the D series node
types which have a balance of CPU and memory resources. A good starting point is a node of type `Standard_D2as_v4`.

More work has to be done in this area regarding sizing and scaling of the system node pools to achieve a standardized solution.

### Modifying Nodes

There may come times when Terraform wants to recreate the AKS cluster when the system node pool has been updated. This happens when updating certain properties in the system node pool. It is still
possible to do these updates without recreating the cluster, but it requires some manual intervention. AKS requires at least one system node pool but does not have an upper limit. This makes it
possible to manually add a new temporary system node pool. Remove the existing default node pool created by Terraform. Create a new system node pool with the same name but with the updated parameters.
Finally remove the temporary node pool. Terraform will just assume that the changes have already been applied and import the new state without any other complaints.

Start off with creating a temporary system pool. Make sure to replace the cluster name and resource groups to the correct values.

```shell
az aks nodepool add --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name temp --mode "System" --node-count 1
```

> It may not be possible to create a new node pool with the current Kubernetes version if the cluster has not been updated in a while. Azure will remove minor versions as new versions are released. In
> that case you will need to upgrade the cluster to the latest minor version before making changes to the system pool, as AKS will not allow a node with a newer version than the control plane.

Delete the system node pool created by Terraform:

```shell
az aks nodepool delete --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name default
```

Create a new node pool with the new configuration. In this case it is setting a new instance type and adding a taint:

```shell
az aks nodepool add --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name default --mode "System" --zones 1 2 3 --node-vm-size "Standard_D2as_v4" --node-taints "CriticalAddonsOnly=true:NoSchedule"
--node-count 1
```

Delete the temporary pool:

```shell
az aks nodepool delete --cluster-name aks-dev-we-aks1 --resource-group rg-dev-we-aks --name temp
```

For additional information about updating the system nodes refer to [this blog post](https://pumpingco.de/blog/modify-aks-default-node-pool-in-terraform-without-redeploying-the-cluster/).

## Update AKS cluster

### Useful commands in Kubernetes

When patching an AKS cluster or just upgrading nodes it can be useful to watch your resources in Kubernetes.

```shell
# Show node version
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.metadata.labels.kubernetes\.azure\.com\/node-image-version}{"\n"}{end}'

# Watch nodes
watch kubectl get nodes

# Check the status of all pods in the cluster
kubectl get pods -A
```

### Terraform update Kubernetes version

TBD

### CLI update Kubernetes version

```shell
export RG=rg1
export POOL_NAME=default
export CLUSTER_NAME=cluster1
export AZURE_LOCATION=westeurope
export KUBE_VERSION=1.21.9
```

What AKS versions can I pick in this Azure location:

```shell
az aks get-versions --location $AZURE_LOCATION -o table
```

```shell
az aks get-upgrades --resource-group $RG --name $CLUSTER_NAME --output table
```

We recommend to only upgrade control-plane separately and then upgrade the nodes.

```shell
az aks upgrade --resource-group $RG --name $CLUSTER_NAME --kubernetes-version $KUBE_VERSION --control-plane-only
```

```shell
az aks nodepool upgrade --resource-group $RG --cluster-name $CLUSTER_NAME --name $POOL_NAME --kubernetes-version $KUBE_VERSION
```

### Upgrading node pools without upgrading cluster

From time to time you might want to upgrade your Node Pools without upgrading the Kubernetes version. We always recommend to look at
the [official documentation](https://docs.microsoft.com/en-us/azure/aks/node-image-upgrade)as well.

The node pool will spin up a new node and drain the existing one.
When this is done the old node will be deleted.

The below command works great for smaller clusters. If you want to upgrade more nodes faster it is possible to do so. Read the documentation for more information.

```shell
export RG=rg1
export POOL_NAME=default
export CLUSTER_NAME=cluster1
```

Get the latest available node versions for your node pool:

```shell
az aks nodepool get-upgrades --nodepool-name $POOL_NAME --cluster-name $CLUSTER_NAME --resource-group $RG
```

Upgrade the image on the specified node pool:

```shell
az aks nodepool upgrade --resource-group $RG --cluster-name $CLUSTER_NAME --name $POOL_NAME --node-image-only
```

## Change vm size through Terraform

If you want to use terraform to change the your node pools VM size you **can't** just change the vm_size in the additional_node_pools config.
This will tell Azure to drain all the nodes and then delete the existing ones, then Azure will spin up a new node pool after the existing one is gone.

This might be fine if you already have multiple additional node pools and you pods don't have specific node affinities.

But if that isn't the case terraform will most likely run for ever since it won't be able to destroy the nodes that you already have workload on.
Or even worse it will destroy the existing node and you won't have any node pools in your cluster to manage your workloads.

Instead you have to add a second additional node pool in to your cluster.

For example:

```.hcl
  additional_node_pools = [
    {
      name                 = "standard"
      orchestrator_version = "1.21.2"
      vm_size              = "Standard_E2s_v4"
      min_count            = 1
      max_count            = 5
      node_labels          = {}
      node_taints          = []
      spot_enabled         = false
      spot_max_price       = null
    },
    {
      name                 = "standard2"
      orchestrator_version = "1.21.2"
      vm_size              = "Standard_F4s_v2"
      min_count            = 1
      max_count            = 5
      node_labels          = {}
      node_taints          = []
      spot_enabled         = false
      spot_max_price       = null
    }
  ]
```

Run terraform and see that standard2 is up and running.

Now you can remove the standard node pool and standard2 should be able to handle the new load.

Azure will automatically drain all the data from the old standard node pool.

Remember to set min_count so that your current workload fits, you can always reduce min_count later.
The cluster autoscaler will scale up new vm:s of standard2 but it will take time.
During the creation of more standard2 nodes much of your workload might become pending.

## AKS resources

To get a quick overview of what is happening in AKS you can look at its [changelog](https://github.com/Azure/AKS/releases).
