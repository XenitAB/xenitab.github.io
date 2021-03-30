---
id: monitoring-guide
title: Monitoring Guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';

XKS monitoring is a central monitoring solution built on:

- Thanos
- Grafana
- Prometheus
- Object storage

It currently supports Azure container storage as a object store.

## Architecture

As a service provider we don't want to login to multiple customer Grafanas, nor do we want to open our customers Prometheus instances to the internet. So instead of reading data from our customers we make the customers push data to our central Thanos infrastructure using prometheus remote-write with mTLS.

To get a good understanding how Thanos receiver works we strongly recomend that you read the original [implementation proposal](https://thanos.io/tip/proposals/201812_thanos-remote-receive.md/).

Bellow you can see a simplified overview how our monitoring stack looks like.

<img alt="XKS Monitoring" src={useBaseUrl("img/diagrams/xks-monitoring.drawio.jpeg")} />

## Kubernetes

XKS-monitoring is currently built to be deployed and used in kubernetes.
In the future we might also support prometheus instances that scrape none kubernetes objects.

The Thanos project have decided to not implement any way of deploying Thanos, instead they just ship a container/binary. We use a number of different deployment solutions to create XKS-monitoring.

### Prometheus operator

To manage our Prometheus instances with our customer we are using the
[prometheus operator](https://github.com/prometheus-operator/prometheus-operator).

But to have a simple way of managing the configuration of the prometheus-operator and the extra
scrapers that is need to get a good overview of your cluster, for example the prometheus node-exporter
we are utilizing the [kube-prometheus-stack helm chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

### Thanos operator

We utilize the [thanos-operator by banzaicloud](https://github.com/banzaicloud/thanos-operator) to manage the following Thanos objects.

- Querier
- Store Gateway
- Ruler
- Compactor

When we created XKS-monitoring the thanos-operator didn't support the receiver.

### Thanos receiver

After looking around for a few different solutions on how to deploy the Thanos receiver to kubernetes we found that RedHat have created a [Thanos controller](https://github.com/observatorium/thanos-receive-controller).
This is a internal project for RedHat that they share publicly so the documentation is rather laking but one of there contributors had a great presentation at [Kubecon 2020](https://www.youtube.com/watch?v=5MJqdJq41Ms).

Buy using the Thanos receive controller we can automatically scale the receiver depending on how much metrics our different customers generate.

### Grafana operator

We use Grafana to visualize the metrics that we have gathered from our customers environments.

To manage graphs in a GitOps workflow we use [grafana-operator](https://github.com/integr8ly/grafana-operator).
Where we define Thanos querier as a data source. This way we can view data from all our customers in a single dashboard.

### Nginx ingress

Since we are sending our metrics over the Internet we use mTLS in our remote write prometheus config.
To be able to write as generic yaml as possible for our customers we have chosen to tag all our incoming metrics at the ingress.
When metrics comes in to our ingress from our customers prometheus remote write. We look at the `common name` in the mTLS certificate that was used to communicate with our ingress and add the http HEADER THANOS-TENANT=common name.

Which then is forwarded to the receiver, the receiver will then store the data with the correct labels so we can easily
differentiate the different customer environments.
