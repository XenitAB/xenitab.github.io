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
