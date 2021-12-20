---
id: observability
title: Observability
---

import useBaseUrl from '@docusaurus/useBaseUrl';

First what is observability?
Within observability we normally talk about three pillars.

- metrics
- logging
- tracing

Some people could argue that there is more steps to it but for now we will focus on these three.

We currently support two solutions to gather observability data in XKF, Datadog and the opentelemetry stack which is a open-source solution.

## Datadog

TODO

## Opentelemetry

To gather opentelemtry data we rely on the [grafana agent operator](https://github.com/grafana/agent).

### Metrics

To gather metrics data we use servicemonitors or podmonitors that is managed in XKF using the [prometheus-operator](https://github.com/prometheus-operator/prometheus-operator/).

The prometheus-operator have great [getting started guide](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/getting-started.md)
But if you want a quick example you can look below.

The most important part for you as a developer you have to label the pod/service monitor yaml with `xkf.xenit.io/monitoring: tenant`,
else the grafana agent won't find the rule to gather the metric.

```podmonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: podmonitor-example
  labels:
    xkf.xenit.io/monitoring: tenant
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: app1
      app.kubernetes.io/instance: app1
  podMetricsEndpoints:
    - port: http-metrics
```

```servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  labels:
    xkf.xenit.io/monitoring: tenant
  name: servicemonitor-example
spec:
  endpoints:
  - interval: 60s
    port: metrics
  selector:
    matchLabels:
      app.kubernetes.io/instance: app1
```

You can do allot of configuration when it comes to metrics gathering but the above config will get you started.

#### networkpolicy metrics

Don't forget to define a networkpolicy that allows incoming traffic from the opentelemetry namespace to gather metrics from your application.

If you can see `scrape_duration_seconds = 10` your servicemonitor/podmonitor is trying to get scraped but it most likely times out after 10 seconds
and don't provide you with any "real" data from your metrics endpoint.

Verify that you have defined a networkpolicy that allows you to talk to your application from you the opentelemetry namespace.

TODO (Edvin) when we have decided on a standard for the prometheus agent write it down to narrow down the networkpolicy even more.

```networkpolicy-app1.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-opentelemetry-example-app
spec:
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: opentelemetry
  podSelector:
    matchLabels:
      app: app1
  policyTypes:
    - Ingress
```

### Logging

To gather logs we use the grafana agent operator that deploys a deamonset and runs all the nodes in the cluster and reads the logs from the kubernetes log location.
Just like metrics you have to define label `xkf.xenit.io/monitoring: tenant` in your PodLogs.
The PodLogs CRD is created by the grafana agent-operator and functions very similar to how the prometheus operator works especially when it comes to selectors.
Below you will find a very basic example that will scrape a single pod in the namespace where it's created.

```podlogs.yaml
apiVersion: monitoring.grafana.com/v1alpha1
kind: PodLogs
metadata:
  name: app1
  labels:
    xkf.xenit.io/monitoring: tenant
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: app1
  pipelineStages:
    - cri: {}
```

You can do allot of configuration when it comes to log filtering using PodLogs. For example you can remove drop specific log types that you don't want to send to your long time storage.
Sadly the grafana agent operator don't supply great documentation around how to define this configuration in the operator.
But together with running `kubectl explain podlogs.monitoring.grafana.com.spec.pipelineStages` on the cluster and
reading [official documentation](https://grafana.com/docs/loki/latest/clients/promtail/pipelines/) how to create pipelines you can get a good understanding how to create the configuration that you need.

If you don't have any needs to filter or do any custom config per application you can create a namespace wide PodLogs gatherer.

```podlogs.yaml
apiVersion: monitoring.grafana.com/v1alpha1
kind: PodLogs
metadata:
  name: tenant-namespace-log
  labels:
    xkf.xenit.io/monitoring: tenant
spec:
  selector: {}
  pipelineStages:
    - cri: {}
```

### Tracing

The tracing setup is a bit different compared to logging and metrics, instead of having some yaml file where you define the grafana agent how to gather
data from it your application, you instead push data to the grafana agent on a specific URL within your application.

Opentelemetry supports both http and grpc communication to gather traces from your application.

To send http data we use `4318` and for gRPC we use `4317`.

Assuming that you are using XKF the URL will be

- [http://grafana-agent-traces.opentelemetry.svc.cluster.local:4318/v1/traces](http://grafana-agent-traces.opentelemetry.svc.cluster.local:4318/v1/traces)
- [http://grafana-agent-traces.opentelemetry.svc.cluster.local:4317/v1/traces](http://grafana-agent-traces.opentelemetry.svc.cluster.local:4317/v1/traces)

#### networkpolicy tracing

Don't forget to define a networkpolicy that allows egress traffic to the opentelemetry namespace, else your tracing data won't be forwarded to the opentelemetry collector.

TODO (Edvin) verify the networkpolicy in a clean env

```networkpolicy-app1.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-opentelemetry-example-app
spec:
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: opentelemetry
        - podSelector:
            matchLabels:
              app: grafana-agent-traces
      ports:
        - protocol: TCP
          port: 4317
        - protocol: TCP
          port: 4318
  podSelector:
    matchLabels:
      app: app1
  policyTypes:
    - Egress
```
