---
id: developer-guide
title: Developer Guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide assumes that you have been added to one or more resource groups with a configured Kubernetes namespace. Before going through the developer guide it is good to make
sure that you understand the basics in the [101](../../documentation/kubernetes/oneoone) guide.

## Kubectl Configuration

You can run the following command to add the AKS cluster to your kubeconfig assuming that you have installed the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
and [authenticated with the azure portal](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).

```bash
az aks get-credentials --resource-group rg-dev-we-aks --name aks-dev-we-aks1
```

## Continous Delivery

Continous Delivery (CD) should be the only way to make changes to running applications in the XKS service. This is to ensure that changes are consistent and tracked in a centrailized
manner that can be observed by all.

## Network Policies

By default each namespace is limited in the permitted network trafic. Pods in the namespaces are allowed to egress freely out to the internet and comminicate with other pods
in the same namespace. It is however restricted when it comes to communicating with other pods in other namespaces, unless explicitly configured to be allowed this is not possible.

## Constraint Policies

Certain policies will always be enforced in the cluster as a guard rail to minimize the risk of security exposures. The policies are implemented on the Kubernetes API level so that
any request to create or update a Kubernetes resource will first have to pass through the policy check. If the resource in question does not comform to the policy it will be rejected
by the API server when applying the change. Knowing this is important as certain features or options documented on the internet may not be availible or restricted in the XKS service.
This can include things like certain types of volume mounts, labeling requirements or container capabilities for a pod.

**Need full list of default constraints**

## Ingress

The XKS service comes pre configured with external dns, cert manager and the nginx ingress controller to provide a secure method for external traffic to reach applications in the
Kubernetes cluster. The three projects work together to enable automatic DNS configuration, certificate provisioning and traffic routing. Below is an example of a ingress resource
which configures securet HTTPS ingress.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: foo
  namespace: bar
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: foo.dev.example.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: http
  tls:
    - hosts:
      - foo.dev.example.com
```

It is useful to be aware of [annotation configuration](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#annotations) in the nginx ingress controller.
Sometimes a specific ingress requires custom behavior that is not default in the ingress controller, this behavior can be customized with the help of annotations for a specific ingress resource.
For example changing the client body buffer size may be useful if the header size in a request is larger than the buffer.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: foo
  namespace: bar
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/client-body-buffer-size: 1M
spec:
  rules:
  - host: foo.dev.example.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: http
  tls:
    - hosts:
      - foo.dev.example.com
```

## Azure AD Identity

## Setup CI/CD pipeline

At Xenit we have created a CI/CD template to make it easier to get started with GitOps in our case using FluxV2 and the [GitOps toolkit](https://toolkit.fluxcd.io/).

You can find the base for all our azure devops pipelines in our [Azure Devops Templates repo](https://github.com/XenitAB/azure-devops-templates/tree/main/gitops-v2).

Follow the example documentation on how to setup your base repo.
Bellow we will explain how to do the manual steps that is needed to get Azure Devops to allow some of the flows that we are making.

### Enable CI user to push to gitops repo

The core feature of the gitops repo is that one of the pipelines automatically updates the image tag in your repository so flux will automatically update your deployment in kubernetes.

We have to grant it permissions to do this, sadly manually...

<img alt="CI access" src={useBaseUrl("img/developer-guide/gitops_repo_settings.png")} />
