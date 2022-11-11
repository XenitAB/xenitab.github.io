---
id: cve
title: CVE Information
---

This page is a way for us to inform about CVE:s that we see in the wilde and have given extra attention to.

This list is not complete but we try to keep it up to date around CVE:s related to our space wether they are Kubernetes, Linux och developer centric.

We hope that it can be a help for you.

## General

### OpenSSL CVE-2022-3602/CVE-2022-3786 Spooky SSL

Limited impact due to openssl 3 not being broadly used in the ecosystem.

No impact on our kubernetes nodes

We recommend developers to verify if there container images or application runtimes are effected.
To get a quick overview of impacted system you can start to look at [https://github.com/NCSC-NL/OpenSSL-2022/blob/main/software/README.md](https://github.com/NCSC-NL/OpenSSL-2022/blob/main/software/README.md).

EKS specific [information](https://aws.amazon.com/security/security-bulletins/AWS-2022-008/).

AKS specific [information](https://github.com/Azure/AKS/issues/3299).

## Kubernetes

### CVE-2022-3294 Node address isn't always verified when proxying

Not a problem in AKS clusters due to the usage of [Konnectivity](https://github.com/Azure/AKS/issues/3327).

In XKS developer can't modify Node objects so it shouldn't be a problem in EKS ether.

### CVE-2022-3162 Unauthorized read of Custom Resources

Developers shouldn't have cluster wide read access on any CRD.
