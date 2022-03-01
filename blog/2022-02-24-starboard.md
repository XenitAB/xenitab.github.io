---
title: Improving XKS security using Starboard
description: Xenit evolves Starboard for continuous scanning of production workloads.
authors:
  - name: Edvin Norling
tags:
  - security
  - kubernetes
---

TODO write a better introduction.
Just like for all companies today security is top of mind for Xenit.

We already scan our images in our CI/CD pipeline why should we do it in the cluster? The gap between build time scanning and the time it takes for the application to run in production a new CVE could already have been found.
To mitigate this we need to continuously scan all the images that is running inside our clusters.

The increasing rates of cyber crime (by some measures, cyber crimes now outnumber all other crimes put together) which makes it harder for companies to protect our selfs.
The faster we can fix relatively simple problems like patching a CVE on container level the more secure we will be.

Xenit is hosting a number of Kubernetes clusters for our self and our customers and we want a quick way of visualizing CVEs on a platform and a customer level without having to jump on to each cluster and run some script.

So how can we solve this?

As mentioned earlier we already scan our images in our CI/CD pipeline and there we use [Trivy](https://github.com/aquasecurity/trivy/).

It was a natural fit for us to got with [Aqua Securitys](https://www.aquasec.com/) [Starboard](https://github.com/aquasecurity/starboard).
Starboard is a reporting tool that supports multiple Aqua Security tools like Trivy for vulnerability report, but also kube-hunter and kube-bench. In this post we will only focus on the vulnerability reports.

As part of improving Xenit Kubernetes Service (XKS), we have the last few months working on adding support for Starboard in XKS and after a few open source PR:s we have managed to do so.

<!-- truncate -->

But when starting to use Starboard we noticed a few features that where missing and we really wanted. Since Starboard is open source we thought: why not help to implement these features?

The first issue we found was that the Starboard operator doesn't generate any metrics of how many CVEs that we have per container image.
As a part of XKS we supply our customers with monthly reports and we want to be able to provide them with simple visualization to see the number of critical CVEs on their applications.
It turns out that we weren't the only ones with this problem and the great people over at giantswarm had implemented a solution for this called [starboard-exporter](https://github.com/giantswarm/starboard-exporter).

We helped out to clean up their [helm chart](https://github.com/giantswarm/starboard-exporter/pull/27) a bit and then started to use their exporter in production.

This made it possible for us to start generating the metrics but we noticed that the data was strange. And we realized that it was due to duplicate data.

By default Starboard generates a vulnerability report per replica set, instead of one per deployment. This can be a good thing to be able to simply compare CVEs between versions of your application.
But when trying to get a overview of the number of CVEs in a Kubernetes cluster it creates a few issues.

To solve this we introduced a new environment variable `OPERATOR_VULNERABILITY_SCANNER_SCAN_ONLY_CURRENT_REVISIONS` in [#870](https://github.com/aquasecurity/starboard/pull/870) and if set to true it will only create vulnerability report for the latest replica set in a deployment.
Another good thing with this is that we will decrease the number of starboard jobs that is created thus lowering the amount of resources used by Starboard.

Great now we have metrics that are correct, but wasn't the whole point of this to continuously scan for new CVEs in the cluster?

The problem was that once a vulnerability report got generated it didn't get updated unless the current vulnerability report is deleted and this creates issues for long-running deployments.
To solve this we have helped out to introduce a TTL(Time To Live) for reports [#879](https://github.com/aquasecurity/starboard/pull/879) by implementing a new controller.
Setting the following config in the operator `OPERATOR_VULNERABILITY_SCANNER_REPORT_TT=24h` will automatically delete any vulnerability report older then 24 hours.

TODO write about the ACR support implementation.

TODO write something about our documentation about repots and vuln repots

Thanks to this we are now able to quickly generate dashboards with the amount of critical CVEs in our clusters for both public and private images.

TODO write about future https://github.com/aquasecurity/starboard/pull/740

We at Xenit love open-source and think it's really important to be able to give back to the community when we can.
A big thanks to the maintainers over at Aqua Security and Giantswarm for there great job and being extremely helpful getting these new features merged quickly.
It's amazing to always be able to stand on the shoulders of giants.
