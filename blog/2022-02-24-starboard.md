---
title: Improving XKS security using Starboard
description: Xenit evolves Starboard for continuous scanning of production workloads.
authors:
  - name: Edvin Norling
tags:
  - security
  - kubernetes
  - starboard
  - trivy
---

How sure are you that you have close to 0 critical CVEs in your Kubernetes cluster?

Just like for all companies today security is top of mind for Xenit and we try to come with a solution for this question.

Today we already scan our images in our CI/CD pipeline at creation time using Trivy but what about new CVEs that get found every day?

The increasing rates of cyber crime (by some measures, cyber crimes now outnumber all other crimes put together) which makes it harder for companies to protect them selfs.
The faster we can fix relatively simple problems like patching a CVE on container level the more secure we will be.

Xenit is hosting a number of Kubernetes clusters for our self and our customers and we want a quick way of visualizing CVEs on a platform and a customer level.
Without having to jumping around to different customers and run some script to find out the answer to that question.

<!-- truncate -->

Could one solution be to scan the container images continuously that is running in our Kubernetes clusters?
Or should we just continuously scan the images in our private repository? But what about the images that isn't our private repository?

Do we and our customers even store all the images of our cluster in the private repositories?

Since we have a central monitoring solution that we use to monitor the status of all our clusters why not think of CVEs just like another metric?

To be able to solve all our questions we decided to go with continuously scanning the images that is in the Kubernetes cluster.

As mentioned earlier we already scan our images in our CI/CD pipeline and there we use [Trivy](https://github.com/aquasecurity/trivy/).

So it was a natural fit for us to got with [Aqua Securitys](https://www.aquasec.com/) [Starboard](https://github.com/aquasecurity/starboard).
Starboard is a reporting tool that supports multiple Aqua Security tools like Trivy for vulnerability report, but it also supports kube-hunter and kube-bench among others.
In this post we will only focus on the vulnerability reports.

But when we started using Starboard we noticed a few features that where missing and we really needed. Since Starboard is open source we thought: why not help to implement these features?

The first issue we found was that the Starboard operator is only able to scan the images and show the result as a CR (Custom Resource) but no metrics of how many CVEs we have per container image.

As a part of XKS we supply our customers with monthly reports and we want to be able to provide them with simple visualization to see the number of critical CVEs on their applications.
It turns out that we weren't the only ones with this problem and the great people over at Giantswarm had implemented a solution for this called [starboard-exporter](https://github.com/giantswarm/starboard-exporter).

We helped out to clean up their [helm chart](https://github.com/giantswarm/starboard-exporter/pull/27) a bit and then started to use their exporter in production.

This made it possible for us to start generating metrics but after some time we realized that the data was strange, this was due to duplicate multiple metrics for the same CVE.

By default Starboard generates a vulnerability report per Kubernetes replica set, instead of one per Kubernetes deployment. This can be a good thing to be able to simply compare CVEs between versions of your application.
But when trying to get a overview of the number of CVEs in a Kubernetes cluster it creates a few issues.

To solve this we introduced a new environment variable `OPERATOR_VULNERABILITY_SCANNER_SCAN_ONLY_CURRENT_REVISIONS` to Starboard in [#870](https://github.com/aquasecurity/starboard/pull/870) and if set to true it will only create vulnerability report for the latest replica set in a deployment.

Great now we have metrics that we can trust, but wasn't the whole point of this work to continuously scan for new CVEs in the cluster?

The problem was that once a vulnerability report got generated it didn't get updated unless the current vulnerability report was deleted and this creates issues for long-running deployments.
To solve this we introduce a TTL(Time To Live) for vulnerability reports [#879](https://github.com/aquasecurity/starboard/pull/879) by implementing a new controller.
The controller currently only supports managing TTL for vulnerability reports but could easily add the same feature to other Starboard reports.
Setting the following config in the operator `OPERATOR_VULNERABILITY_SCANNER_REPORT_TT=24h` will automatically delete any vulnerability report older then 24 hours.

So now we can scan our public images, we can get metrics from them and we can get updated scans as often as we want. But what about privates repositories?

Support in Trivy for AWS [ECR](https://aws.amazon.com/ecr/) (Elastic Container Registry) have been around for a long time and same thing with starboard.
The problem was until recently there was no support for Azure [ACR](https://azure.microsoft.com/en-us/services/container-registry) (Azure Container Registry).

Luckily just as we were thinking of starting to work on this feature someone else from the community did the heavy [lifting](https://github.com/aquasecurity/fanal/pull/371) and added support for Azure in Fanal.
Fanal is the library that Trivy uses to scan images, and by fixing this together with a number of other commits to both Starboard and Trivy the problem was solved.

Or so we thought...

There had been a PR to add to the possibility of setting a custom label on your Starboard [jobs](https://github.com/aquasecurity/starboard/pull/902) thus giving us the possibility to of using [aad-pod-identity](https://github.com/Azure/aad-pod-identity) per Starboard job.
Aad-pod-identity makes it possible to talk to Azure from a container without having to worry about passwords so it's something we definitely want to use.
But instead of running Starboards vulnerability scan jobs in server mode (which is the default), we are running Starboard in client mode.
We have deployed a separate Trivy instance in our cluster to cache all the images that we scan and this saves us allot of time per image that is used in the cluster.

The problem was that the Trivy helm chart didn't support setting custom labels on the Trivy stateful set so we created a [PR](https://github.com/aquasecurity/trivy/pull/1767) to solve it.

Thanks to this we are now able to quickly generate dashboards with the amount of critical CVEs in our clusters for both public and private images.

So what does the future bring for Xenit security scanning?

Short term the feature I'm mostly looking forward in Starboard is the possibility to cache the result of scanned images cluster wide.
This would reduce the amount of scans allot especially when it comes to images like Linkerd side-cars.
There is already a design [PR](https://github.com/aquasecurity/starboard/pull/740) open and the discussion is ongoing, so feel free to jump in to the discussion.

We at Xenit love open-source and think it's really important to be able to give back to the community when we can.
A big thanks to the maintainers over at Aqua Security and Giantswarm for there great job and being extremely helpful getting these new features merged quickly.
It's amazing to always be able to stand on the shoulders of giants.
