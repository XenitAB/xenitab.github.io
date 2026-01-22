---
id: eks
title: EKS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Xenit Kubernetes Framework supports both AKS and EKS.
In this document we will describe how to setup XKF on EKS and how it differs from AKS.

## Differences

To setup XKF using EKS you still need an Azure environment.

XKF is heavily relying on Azure AD (AAD) and we have developed our own tool to
manage access to our clusters called [azad-kube-proxy](https://github.com/XenitAB/azad-kube-proxy).

Our governance solution is still fully located in Azure together with our Terraform state.

### Repo structure

This is how an AWS repo structure can look like:

```txt
├── Makefile
├── README.md
├── aws-core
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
├── aws-eks
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
├── azure-governance
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables
│   │   ├── common.tfvars
│   │   ├── dev.tfvars
│   │   ├── prod.tfvars
│   │   └── qa.tfvars
│   └── variables.tf
├── global.tfvars
```

### EKS

Just like in AKS we use Calico as our CNI.

- AWS CNI does not support network policies
- AWS CNI heavily limits how many pods we can run on a single node
- We want to be consistent with AKS

Just after setting up the EKS cluster we use a null_resource to first delete
the AWS CNI daemon set and then install calico.
This is all done before we add a single node to the cluster.

After this we add an EKS node group and Calico starts.

### IRSA

In AKS we use AAD Pod Identity to support access to Azure resources.
We support the same thing in EKS but use IAM roles for service accounts IRSA.

To make it easier to use IRSA we have developed a small terraform [module](https://github.com/XenitAB/terraform-modules/blob/main/modules/aws/irsa/README.md).

## Bootstrap

By default AWS CNI limits the amount of pods that you can have on a single node.
Since we are using Calico we do not have this limit,
but when setting up a default EKS environment the EKS [bootstrap script](https://github.com/awslabs/amazon-eks-ami/blob/master/files/bootstrap.sh)
defines a pod limit. To remove this limit we have created our own AWS launch template for our EKS node group. It sets `--use-max-pods false` and some needed Kubernetes node labels. If these labels are not set the EKS cluster is unable to "find" the nodes in the node group.

## Tenants account peering

In Azure we separates XKF and our tenants by using Resource Groups, in AWS we use separate accounts.

To setup a VPC peering you need to know the target VPC id, this creates a chicken and egg problem.
To workaround this problem we sadly have to run the eks/core module multiple times on both the XKF side and the tenant side.

Run Terraform in the following order:

- XKF core without any `vpc_peering_config_requester` defined.
- Tenant core without any `vpc_peering_config_accepter` defined.
- XKF core defines `vpc_peering_config_requester`, manually getting the needed information from the tenant account.
- Tenant core defines `vpc_peering_config_accepter`, manually getting the needed information from the XKF account.

Make sure that you only have one peering request open at the same time, else the accepter side will not be able to find a unique request.
Now you should be able to see the VPC peering connected on both sides.

## Update cluster version

Updating the EKS cluster version can not be done by updating Terraform code only, it also involves the AWS CLI and kubectl. Find your EKS version to upgrade to here: [EKS versions](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)

For further information on the AWS CLI commands used in this section, please refer to the [AWS EKS CLI](https://docs.aws.amazon.com/cli/latest/reference/eks/index.html) documentation.

### Update the control plane using AWS CLI

Get the name of the cluster to update:

```bash
aws eks list-clusters --region eu-west-1
```

Update the control plane version by running the following command:

```bash
aws eks update-cluster-version --region eu-west-1 --name <cluster-name> --kubernetes-version <version>
```

The above command provides an id that can be use to check the status of the update:

```bash
aws eks describe-update --region eu-west-1 --name <cluster-name> --update-id <id>
```

The update is finished when status is `Successful`. Previous updates have taken approximately **45 minutes**.

In the `aws-eks/variables/<environment>.tfvars` Terraform file that corresponds to the actual environment, update the `kubernetes_version` in `eks_config` and make a `terraform plan`. No difference in the plan output is expected. Also perform a `terraform apply` just to make sure state the state is updated (might not be needed).

### Update the control plane using Terraform

TBD

### Update the nodes

In the `aws-eks/variables/<environment>.tfvars` Terraform file that corresponds to the actual environment, add a new node group in `eks_config`. The example below shows a node upgrade from `1.20` to `1.21` where `standard2` is the new node group. The value of `release_version` must match an AMI version (preferrably the latest) for the actual Kubernetes version (can be found in the [EKS Linux AMI versions documentation](https://docs.aws.amazon.com/eks/latest/userguide/eks-linux-ami-versions.html)):

```terraform
eks_config = {
  kubernetes_version = "1.21"
  cidr_block         = "10.100.64.0/18"
  node_groups = [
    {
      name            = "standard"
      release_version = "1.20.4-20210621"
      min_size        = 3
      max_size        = 4
      instance_types  = ["t3.large"]
    },
    {
      name            = "standard2"
      release_version = "1.21.5-20220123"
      min_size        = 3
      max_size        = 4
      instance_types  = ["t3.large"]
    },
  ]
}
```

When this change is applied, there will be a new set of nodes running the new version added to the cluster. The following command will show all nodes and their versions:

```terraform
kubectl get nodes
```

Now it is time to drain the old nodes one by one with:

```bash
kubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data
```

When all nodes are drained, remove the old node group in `eks_config`. From the example above:

```terraform
eks_config = {
  kubernetes_version = "1.21"
  cidr_block         = "10.100.64.0/18"
  node_groups = [
    {
      name            = "standard2"
      release_version = "1.21.5-20220123"
      min_size        = 3
      max_size        = 4
      instance_types  = ["t3.large"]
    },
  ]
}
```

When applied, the old nodes are removed. The update is now complete.

### Command examples

The following AWS CLI commands are an example of an update from 1.20 to 1.21:

Control plane:

```bash
aws eks list-clusters --region eu-west-1
aws eks update-cluster-version --region eu-west-1  --name qa-eks2  --kubernetes-version 1.21
aws eks describe-update --region eu-west-1 --name qa-eks2 --update-id 25b9f04f-0be3-40ca-bc37-aaf841070012
```

## Break glass

We are very dependent on azad-proxy to work but if something happens with the
ingress, azad-proxy or the AAD we need to have ways of reaching the cluster:

```bash
aws eks --region eu-west-1 update-kubeconfig --name dev-eks1 --alias dev-eks1 --role-arn arn:aws:iam::111111111111:role/xkf-eu-west-1-dev-eks-admin
```

## EKS resources

To get a quick overview of what is happening in EKS you can look at its [changelog](https://github.com/awslabs/amazon-eks-ami/blob/master/CHANGELOG.md#changelog).

When upgrading node groups you need to correlate with your Kubernetes release, you can find which node group is available to [which node group](https://docs.aws.amazon.com/eks/latest/userguide/eks-linux-ami-versions.html).

AWS general [security information](https://aws.amazon.com/security/security-bulletins/)

Public [containers roadmap](https://github.com/aws/containers-roadmap).
