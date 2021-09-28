---
id: index
title: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Xenit Kubernetes Service](https://xenit.se/it-tjanster/kubernetes-service/) (XKS; page in Swedish) is an opinionated Kubernetes deployment on top of a cloud provider's managed Kubernetes service. XKS currently supports Azure Kubernetes Service (AKS) and AWS Kubernetes service (EKS). Xenit Kubernetes Service:

- is secure by default
- is DevOps-oriented
- has batteries included
- has a team-oriented permissions model

This documentation consists of two main sections:

[**Developer Guide**](./developer-guide/introduction): This documentation is targeted towards developers using XKS. It covers the basics of Kubernetes and the custom features that are offered by XKS.

[**Operator Guide**](./operator-guide/index): This section is meant primarily for Xenit's operations staff. It collects Xenit's internal documentation for operating XKS clusters. It is public and part of this documentation because we believe in transparency. It serves as a reference to how the various services included in XKS are set up. It also describes various recurring procedures, such as replacing an existing Kubernetes cluster.

XKS is assembled from Open Source services, some of which are provided to XKS customers. This assembly is itself Open Source and the important components are documented under the Projects section in the menu bar. For more information about the services, please refer to their respective documentation. Some of the more prominent projects:

- [Kubernetes](https://kubernetes.io/)
- [Flux](https://fluxcd.io/)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
