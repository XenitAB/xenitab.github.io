---
title: Improving XKS security using Starboard
description: Xenit evolves Starboard for continuous scanning of production workloads.
authors:
  - name: Edvin Norling
tags:
  - security
  - kubernetes
---

Just like for all companies today security is top of mind for Xenit.
As part of improving Xenit Kubernetes Service (XKS), we have the last few months working on implementing [Aqua Securitys](https://www.aquasec.com/) [Starboard](https://github.com/aquasecurity/starboard) to our clusters.

Thanks to this we will be able to quickly generate dashboards with the amount of critical CVEs in our clusters. This will make it much easier for us to find if our platform container images or our customers for example is
having issues with the latest [log4j CVEs](https://nvd.nist.gov/vuln/detail/CVE-2021-44228).

We use Starboard to continuously scan all container images for running on on XKS, both from a platform point of view but also our customers images.
In the background Starboard uses [Trivy](https://github.com/aquasecurity/trivy/) to scan the container images. Trivy is the same tool that we use to scan our container images at build time so our XKS customers will have experience reading the Trivy output.

<!-- truncate -->

When starting to use Starboard we noticed a few feature that where missing, that we really wanted. And since Starboard is open-source we thought why not help to implement these features.

The first issue we found was that the Starboard operator don't generate any metrics of how many CVEs that we have per container image.
Since we want a simple way of visualizing these kind of data in the reports that we generate to our customers every month we started to look for a solution.
It turns out that we wasn't the only ones with this problem and the great people over at [giantswarm starboard-exporter](https://github.com/giantswarm/starboard-exporter) had implemented a solution for this.

We helped out to clean-up there [helm chart](https://github.com/giantswarm/starboard-exporter/pull/27) a bit and then started to use there exporter in production.

By default Starboard generates a vulnerability report per replica set, instead of one per deployment. This can be a good thing to be able to simply compare CVEs between versions of your application but when trying to get a overview
of the number of CVEs in a kubernetes cluster it creates a few issues.

To solve this we introduced a new environment variable `OPERATOR_VULNERABILITY_SCANNER_SCAN_ONLY_CURRENT_REVISIONS` in [#870](https://github.com/aquasecurity/starboard/pull/870) and if set to true it will only create vulnerability report for the latest replica set in a deployment.
Another good thing with this is that we will decrease the number of starboard job that is created thus lowering the amount of resources used by Starboard.

As mentioned earlier we wanted a way of continuously scan for new CVEs in the cluster.
The problem was that once a vulnerability report gets generated it doesn't get updated unless it's deleted and this creates issues for long running deployments.
To solve this we have helped out to introduce a TTL for reports [#879](https://github.com/aquasecurity/starboard/pull/879).
Setting the following config in the operator `OPERATOR_VULNERABILITY_SCANNER_REPORT_TT=24h` will automatically delete any vulnerability report older then 24 hours.

TODO write something about our documentation about repots and vuln repots

We at Xenit love open-source and think it's really important to be able to give back to the community when we can.
A big thanks to the maintainers over at Aqua Security and Giantswarm for there great job and being extremely helpful getting these new features merged quickly.
