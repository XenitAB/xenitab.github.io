---
id: eks
title: EKS
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Xenit Kubernetes Framework supports both AKS and EKS, though AKS is our main platform.
In this document we will describe how to setup XKF on EKS and how it differs from AKS.

## Differences

To setup XKF using EKS you still need a Azure environment.

XKF is heavy relying on Azure AD (AAD) and we have developed our own tool to
manage access to our clusters called [azad-kube-proxy](https://github.com/XenitAB/azad-kube-proxy).

So our governance solution is still fully located in Azure together with our Terraform state

### Repo structure

This is how a AWS repo structure can look like:

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

- AWS CNI don't support network policies
- AWS CNI heavily limits how many pods we can run on a single node
- We want to be consistent with AKS

Just after setting up the EKS cluster we use a null_resource to first delete
the AWS CNI daemon set and then install calico.
This is all done before we add a single node to the cluster.

After this we add a eks node group and Calico starts.

### IRSA

In AKS we use AAD Pod Identity to support access to Azure resources.
We support the same thing in EKS but use IAM roles for service accounts IRSA.

To make it easier to use IRSA we have developed a small terraform [module](https://github.com/XenitAB/terraform-modules/blob/main/modules/aws/irsa/README.md).

## Bootstrap

By default AWS CNI limits the amount of pods that you can have on a single node.
Since we are using Calico we don't have this limit,
but when setting up a default EKS environment the EKS [bootstrap script](https://github.com/awslabs/amazon-eks-ami/blob/master/files/bootstrap.sh)
defines a pod limit. To remove this limit we have created our own AWS launch template for our EKS node group.

It sets `--use-max-pods false` and some needed kubernetes node labels, if these labels aren't set the EKS cluster is unable to "find" the nodes in the node group.

## Tenants account peering

In Azure we separates XKF and our tenants by using Resource Groups, in AWS we use separate accounts.

To setup a VPC peering you need to know the target VPC id, this creates a chicken and egg problem.
To workaround this problem we sadly have to run the eks/core module multiple times in both the XKF side and the tenant.

Run Terraform in the following order:

- XKF core without any vpc_peering_config_requester defined.
- Tenant core without any vpc_peering_config_accepter defined.
- XKF core define vpc_peering_config_requester, manually getting the needed information from the tenant account.
- Tenant core define vpc_peering_config_accepter, manually getting the needed information from the XKF account.

Make sure that you only have one peering request open at the same time, else the accepter side won't be able to find a unique request.
Now you should be able to see the VPC peering connected on both sides.
