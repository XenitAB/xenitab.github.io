---
id: linkerd
title: Linkerd
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Linkerd](https://linkerd.io/) is an optional service mesh that can be added to XKS. The component is opt-in as it adds a certain amount of overhead,
so unless it has bee done Linkerd will not be present in XKS. A service mesh extends the networking functionality in a Kubernetes cluster. It is
useful when features such as end to end encryption or GRPC load balancing is required. Linkerd will automatically handle TCP loadbalancing so when
GRPC is used Linkerd will detect this and loadbalance between instances of GRPC servers.

Refer to the [oficial documentation](https://linkerd.io/2.10/overview/) for documentation that may be missing from this page.

Linkerd works by injecting a sidecar into every Pod which uses Linkerd. All network requests have to be sent through the sidecar which will then be
responsible with forwarding it. The sidecar will hanlde things like traffic encryption before sending the packets outside of the node.

<img alt="Linkerd Overview" src={useBaseUrl("img/docs/xks/linkerd-overview.jpg")} />

## Get Started

To enable sidecar injection the Pod has to have the annotation `linkerd.io/inject: enabled` added to it. A common misstake when enabling Linkerd is
that the annotation is added to Deployment and not the Pod template, make sure that you do not do this misstake as the sidecar will not be injected if
you do.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: linkerd-test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: linkerd-test
  template:
    metadata:
      annotations:
        linkerd.io/inject: enabled
      labels:
        app: linkerd-test
    spec:
      containers:
      - name: app-api
        image: alpine:latest
        ports:
        - containerPort: 8080
          name: http
          protocol: TCP
```

Eventually a Pod should be created. A important detail is that there should be two containers in the Pod. One container should be the one defined in
the Deployment and the other one the Linkerd sidecar. This can be verified by getting the Pods containers.

```shell
$ kubectl get pods <POD_NAME> -o jsonpath="{.spec.containers[*].name}"
linkerd-test linkerd-proxy
```

With the sidecar added all traffic going out of the container will automatically be proxied through the sidecar.

## FAQ

### What overhead can I expect?

Each Pod will at minimum consume and additional 10 MB due to the extra sidecar and the number can grow as traffic increases.
