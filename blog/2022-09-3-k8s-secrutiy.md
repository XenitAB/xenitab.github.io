---
title: Kubernetes security basics
description: How to make your kubernetes clusters and applications secure by default.
authors: nissessenap
tags:
  - security
  - kubernetes
keywords:
  - security
  - kubernetes
---

import useBaseUrl from '@docusaurus/useBaseUrl';

There are many blogs like this but this one is mine.

Scanning your cluster

To make sure that your kubernetes cluster as secure as possible it's always good to follow [CSI kubernetes benchmark](https://www.cisecurity.org/benchmark/kubernetes)
But it's not a light read and you still need a way to verify that you are following it's standards preferably a way that is reproducible between patches and configuration changes.
In enters [kube-bench](https://github.com/aquasecurity/kube-bench) by Aqua security, it's a tool that you can run in your cluster to make sure that you follow the CSI kubernetes benchmark.

## Holistic solutions

There are a number of great holistic tools that will scan your everything from images, yaml to your infrastructure.

Most of them have some parts that are open-source and others are completely open-source.

A good example here is Sysdig. They make amazing tools like [falco](https://github.com/falcosecurity/falco) but the glue that gives you a good user experience is closed source. To find out more about Sysdig go to [sysdig.com](https://sysdig.com/)

[AquaSecurity](https://www.aquasec.com/) is another option where the glue is closed source but they have multiple great tools like [trivy](https://github.com/aquasecurity/trivy).

### open-source

Stackrox was bought by RedHat a few years ago and since they have worked hard on open-sourcing there entire stack.
If you are a Openshift customer you can get [Red Hat Advanced Cluster Security for Kubernetes](https://www.redhat.com/en/resources/advanced-cluster-security-for-kubernetes-datasheet). Or you can check out the project directly at there [github](https://github.com/stackrox/.stackrox/).
They have a monthly community meeting that I can recommend.

Another option is [Neu Vector](https://neuvector.com/), I haven't tried out this tool but I have looked at a few demos and it looks like another good option
They have been bought by Suse and they are currently working on making a good integration with there Rancher kubernetes offering.
And just like StackRox you can check out there solution at [github](https://github.com/neuvector/neuvector).

## Kubernetes application configuration

Writing good kubernetes deployments is hard, to mitigate this you should help your developers to write good yaml out of the box.

There are two ways of doing this, ether help them when they are writing the yaml with tools like [kube-linter](https://github.com/stackrox/kube-linter).

Or you use [mutating webhooks](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) to automatically apply configuration for your developers and at the same time make sure that they cant do dangerous stuff like using hostPaths or some other features that **only** should be applied to platform pods.

A great tool to help out with this is Open Policy Agent [gatekeeper](https://github.com/open-policy-agent/gatekeeper).
To get a number of good default policies I recommend looking at the [gatekeeper-libary](https://github.com/open-policy-agent/gatekeeper-library), at Xenit we have also wrote some [extra rules](https://github.com/XenitAB/gatekeeper-library).
