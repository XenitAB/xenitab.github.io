---
id: starboard
title: Starboard
---

[Starboard](https://github.com/aquasecurity/starboard/) is used to continuously scan different kubernetes resources.
As a developer we will mostly focus on two of them:

- Vulnerability reports
- Config audit reports

Vulnerability reports uses [trivy](https://github.com/aquasecurity/trivy/) to continuously scan your container image for CVE:s.

While Config audit reports uses [polaris](https://github.com/FairwindsOps/polaris) to search for yaml best practices.

## Vulnerability reports

To get specific data about your container image you need to login in to the kubernetes cluster and look at the generated CRD:s.

To view all the vulnerability reports that you have in current namespace:

```shell
kubectl get vulnerabilityreports
```

To get a specific vulnerabilityreport just run a describe on the object in current namespace.

```shell
kubectl describe vulnerabilityreports.aquasecurity.github.io <the-specific-report>
```

For more specific questions around starboard we recommend reading the [official documentation](https://aquasecurity.github.io/starboard/latest/faq).

## Config audit reports

Polaris provides a number of best practices on how to configure your kubernetes pods,
both from a security point of view but also setting things like memory limits.

```shell
kubectl get configauditreports.aquasecurity.github.io
```

To get a specific configauditreports just run a describe on the object in current namespace.

```shell
kubectl describe configauditreports.aquasecurity.github.io <the-specific-report>
```
