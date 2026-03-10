---
id: best-practices
title: Best Practices
---

This page aims to collect best practices and common mistakes that can be made while using XKS.

## Container Resources

## Probes

## Pod Scaling

## Disruption Budgets

## Resources

Here are some good resources to also read on top of this page.

- [https://srcco.de/posts/web-service-on-kubernetes-production-checklist-2019.html](https://srcco.de/posts/web-service-on-kubernetes-production-checklist-2019.html)

## Labels

There are multiple reasons to label your workloads.

- Grouping
- Searchability
- Billing

The Kubernetes communnity have a number of default labels that they recommend to put on all your workloads.
There are also a number of extra labels that might be useful for you, remember that these labels are only
examples and you will have to try around to find which labels fits best for you.

### Kubernetes standard Labels

```.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment
  labels:
    app.kubernetes.io/name: user-api
    app.kubernetes.io/version: "42"
    app.kubernetes.io/component: api
    app.kubernetes.io/part-of: payment-gateway
```
