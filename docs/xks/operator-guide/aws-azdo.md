---
id: aws-azdo
title: AWS azure-devops
---

We use Azure DevOps to manage git repositories even if you are using AWS to deploy XKF and we run all our pipelines in Azure using VMSS just like in a Azure based XKF.

The main difference is that we use the AWS service connection.
First you need to install the addon to Azure DevOps using the Azure marketplace,
you can find more information how [here](https://docs.aws.amazon.com/vsts/latest/userguide/getting-started.html).

We will use two users when talking to AWS, one for our terraform pipelines and one for
our gitops flow where we use Elastic Container Registry (ECR) to store the container images.

## Terraform

All this is possible to solve using Terraform but we currently don't have any terraform module to handle it so for now you can read about the manual steps.

- Create a IAM user
  - Tip put both these users under a specific path, for example CI
  - Save the credentials in a safe place
- Attach IAM policy
  - AmazonEKSClusterPolicy
  - AdministratorAccess

## GitOps user

In our GitOps pipelines using flux we need to be able to push and delete containers in ECR.
So very similar to how we created the terraform user:

- Create a IAM user
  - Tip put both these users under a specific path, for example CI
  - Save the credentials in a safe place
- Attach IAM policy
  - AmazonEC2ContainerRegistryFullAccess
