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

The [sig-security](https://github.com/kubernetes/sig-security) community recently released a [security checklist](https://kubernetes.io/docs/concepts/security/security-checklist/) that you should read through before reading this blog.
The document is very generic and this blog focuses more tools that can help out to solve a number of tasks that is mentioned in this lists.

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

### Cloud solutions

The big cloud providers are starting to integrate there own security solutions more and more in to there basic kubernetes offerings.

If you are a Azure Kubernetes Service user looking at [Microsoft Defender for Containers](https://docs.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction) is worth checking out.

## Kubernetes application configuration

Writing good kubernetes deployments is hard, to mitigate this you should help your developers to write good yaml out of the box.

There are two ways of doing this, ether help them when they are writing the yaml with tools like [kube-linter](https://github.com/stackrox/kube-linter).

Or you use [mutating webhooks](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) to automatically apply configuration for your developers and at the same time make sure that they cant do dangerous stuff like using hostPaths or some other features that **only** should be applied to platform pods.

A great tool to help out with this is Open Policy Agent [gatekeeper](https://github.com/open-policy-agent/gatekeeper).
To get a number of good default policies I recommend looking at the [gatekeeper-libary](https://github.com/open-policy-agent/gatekeeper-library), at Xenit we have also wrote some [extra rules](https://github.com/XenitAB/gatekeeper-library).

OPA is a more general tool that can be used for everything from auth solutions to configuration verification of terraform.
If you want a kubernetes centric solution I recommend [Kuverno](https://github.com/kyverno/kyverno).

You could argue that using mutating webhooks creates to much magic and can be a big confusion for your developers, and I would agree.
But none the less you more or less have to use it to lower the risk of misconfiguration and hackers creating pods with node access.

They bad thing is that you hide what is happening for your developers and they don't know what configuration is applied to there yaml.
I would recommend to use both linting to make the developers write good kubernetes yaml from the get go and you more or less have to use mutating webhooks.
The bad thing with getting your developers to write good yaml out of the box is that they have to understand what they are writing and there are many many configuration options that you can make on a kubernetes deployment which makes it much harder for new kubernetes users.

So as always it's a tradeoff.

## Network policies

Like a firewall inside kubernetes.
Set deny by default on all traffic except DNS.

## Observability

As any SRE will tell you Observability is key, both for developers but of course on a platform level.

## Service mesh

Yes it's cool but it's hard. Both for your platform team and your developers.
If you don't have to use it due to legal reasons I recommend that you don't until you have done everything else in this blog.

## Runtime security

Is someone currently trying to hack me?
Have they managed to apply cryptominer/ransomware on your pods?

To find out these kind of things you need some runtime security.

Together with Falco you can notice this and with some extra config you can even delete pods that is seeing [issues](https://falco.org/blog/falcosidekick-response-engine-part-4-tekton/).

The new kid on the block is [tetragon](https://github.com/cilium/tetragon) by [Isovalent](https://isovalent.com/).

## Red/blue team

Security is hard and if you don't have a red team at your company I recommend to get some external team to do some tests on your application and cluster.
But before doing so I think you should get your developers to try to do some attacks on there own.

This will force them to think about application security in general and they will probably come up with possible improvements thanks to that.

To get started I recommend looking at [Kubernetes Goat](https://github.com/madhuakula/kubernetes-goat) which provides multiple fun scenarios to try out.

While the red team tries to hack you lets see if the blue team notices :).
