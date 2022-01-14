---
id: starboard
title: Starboard
---

[Starboard](https://github.com/aquasecurity/starboard/) is used to continuously scan different kubernetes resources.
As a developer we will mostly focus on Vulnerability reports

Vulnerability reports uses [trivy](https://github.com/aquasecurity/trivy/) to continuously scan your container image for CVE:s.

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
