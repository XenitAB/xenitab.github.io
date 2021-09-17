---
id: monitoring
title: Monitoring
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Monitoring applications is an especially important feature when developing microservices. Currently the only supported monitoring solution XKS
supports is [Datadog](https://www.datadoghq.com), but more can be added in the future.

## Datadog

When Datadog monitoring is used the [Datadog Operator](https://github.com/DataDog/datadog-operator) will be added to the cluster. Ontop of deploying a
Datadog agent to every node to collect, metrics, logs, and traces it also adds the ability to create Datadog monitors from the cluster. The Datadog
agent handles all communication with the Datadog API meaning that individual applications do not have to deal with thing such as authentication.

### Logging

All logs written to `stdout` from applications in the tenant namespace will be collected by the Datadog agents. This means that no additional
configuration has to be done to the application, other than making sure the logs are written to the correct destination.

Check the oficial [Datadog Logging Documentation](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset) for more detailed information.

### Metrics

Datadog can collect exposed Prometheus or OpenMetrics from your application. In simple terms this means that the application needs to expose an
endpoint which the Datadog agent can scrape to get the metrics. All that is required is that the Pod contains annotations whihc tells Datadog where to
find the metrics.

Given that your application is exposing metrics on port 8080 your pod should contain the following annotations.
```yaml
```

Check the oficial [Datadog Logging Documentation](https://docs.datadoghq.com/agent/kubernetes/prometheus/) for more detailed information.

### Tracing

Datadog tracing is done with Application Performance Monitoring (APM), which sends traces from an application to Datadog. For traces to work the
application needs to be configured with the language specific libraries. Check the [Langugage
Documentation](https://docs.datadoghq.com/tracing/setup_overview/) for language specific instructions. Some of the languages that are supported are.
* Golang
* C#
* Java
* Python

Configure your Deployment with the `DD_AGENT_HOST` environment for the APM agent to know where to send the traces.
```
apiVersion: apps/v1
kind: Deployment
spec:
  containers:
    - env:
        - name: DD_AGENT_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
```

Check the oficial [Datadog Tracing Documentation](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm) for more detailed information.
