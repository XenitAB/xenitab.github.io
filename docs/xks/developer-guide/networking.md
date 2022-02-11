---
id: networking
title: Networking
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Network Policies

[Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) in Kubernetes add the ability to allow and deny network traffic from specific pods and namespaces. Both
egress traffic from a Pod and ingress traffic to a Pod can be controlled. In a vanilla Kubernetes cluster all traffic between all namespaces is allowed by default. This is not the case in XKS. Out of
the box in XKS all tenant namespaces have a default deny rule added to them. This default deny rule will block any traffic going between namespaces. It will deny both ingress traffic from other
namespaces and egress traffic to other namespaces. All traffic within the namespace between Pods is allowed. The reasoning behind this setup is that Pods should not have more network access than they
require to function, as it reduces the blast radius in case of an exploit.

<img alt="Default Deny Network Policy" src={useBaseUrl("img/assets/xks/developer-guide/network-policy-default-deny.jpg")} />

The default deny Network Policy contains an exception for traffic destined to the clusters DNS service. Without this exception DNS resolution would not work. The pod selector in the Network Policy is
empty, this means that the Network Policy will apply for all Pods in the namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: tenant
spec:
  egress:
    - ports:
        - port: 53
          protocol: UDP
      to:
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
    - to:
        - podSelector: {}
  ingress:
    - from:
        - podSelector: {}
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

There may come a time when you have to create new Network Policies to allow specific Pods traffic as the default can be pretty restrictive. A common situation when this is required is when a Pod needs to
communicate to the public Internet, or communicate between tenant namespaces. When creating new Network Policies make sure that you do not open up more than actually required. A good source of example
Network Policies is the Github repository [kubernetes-network-policy-recipes](https://github.com/ahmetb/kubernetes-network-policy-recipes). It contains a lot of good examples with diagrams and
descriptions. The examples on this page contains the most common use cases to make things simpler for you.

> A helpful tool when create new Network Policies is the [Cilium Network Policy Editor](https://editor.cilium.io/).

### Examples

#### Allow Internet Egress

A common scenario is opening up traffic to the public Internet. A current limitation with Network Policies today is that it is not possible to create egress rules based on DNS names. This means that
the simplest solution is to allow traffic to all public IPs as trying to resolve the DNS to an IP would only work short term.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-internet-egress
spec:
  egress:
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
  podSelector:
    matchLabels:
      app: foo
  policyTypes:
    - Egress
```

#### Allow Ingress Nginx

Traffic from the ingress controller has to be explicitly allowed as no traffic is allowed from outside the namespace by default. This can be considered a fail safe to protect against accidental
Ingress creation where an application is exposed to the internet when that was not the intent. It is enough to allow ingress from the ingress controller even if the traffic actually originates from
outside the cluster.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-controller
spec:
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
  podSelector:
    matchLabels:
      app: foo
  policyTypes:
    - Ingress
```

#### Allow Cross Namespace

When allowing network traffic across tenant namespaces considerations have to be made for the default deny Network Policy in both namespaces. An allow rule has to be created to allow the source
namespace (the side initating the connection) to send traffic to the other namespace. The destination namespace has to allow traffic from the source namespace. The first Network Policy should be used
in the source namespace and the second should be used in the destination namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-egress-to-destination
  namespace: source
spec:
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: destination
          podSelector:
            matchLabels:
              app: bar
  podSelector:
    matchLabels:
      app: foo
  policyTypes:
    - Egress
```

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-from-source
  namespace: destination
spec:
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: source
          podSelector:
            matchLabels:
              app: foo
  podSelector:
    matchLabels:
      app: bar
  policyTypes:
    - Ingress
```

### Debugging

TBD

## Ingress

[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) in Kubernetes is used to allow network traffic from the outside the cluster to reach Pods inside the cluster. Ingress works
as a layer on top of Kubernetes Services by exposing the Service with a hostname. All Ingress traffic is Layer 7 routed meaning that traffic is routed based on the host header in the HTTP request. This
also means that Ingress only works with HTTP traffic. Doing it this way means that only a single load balancer is required reducing cost compared to running multiple load balancers, one per Ingress.

<img alt="Ingress Overview" src={useBaseUrl("img/assets/xks/developer-guide/ingress-overview.jpg")} />

XKS comes with everything pre-configured for Ingress to work. The cluster will either have a single [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/) which is exposed to the
public Internet or two controllers where one is public and one is private. On top of that the cluster is configured with [External DNS](https://github.com/kubernetes-sigs/external-dns) which creates
DNS records and [Cert Manager](https://cert-manager.io/docs/) which deals with certificate creation and renewal. Together these three tools offer an automated solution where the complexity of DNS and
certificates are not handled by the application. The recommendation is to always enabled TLS for all Ingress resources no matter how small the service is. Updating a certificate is
quick and easy so there is no reason not to. Every XKS cluster comes with a preconfigured Cluster Issuer which will provision certificates from [Let's Encrypt](https://letsencrypt.org/).

Start off with creating a Certificate resource for your Ingress. It is possible to have Cert Manager automatically create a Certificate when an Ingress resource is created. This however has the
downside that every Ingress resource will receive its own Certificate. Lets Encrypt has [rate limits](https://letsencrypt.org/docs/rate-limits/) for the same domain, if one were to create a
Certificate per ingress that rate limit would be hit pretty quickly. That is why it is better to create a shared Certificate per tenant namespace with multiple DNS names instead. Each DNS name will be
present in the Certificate so that it can be used for multiple Ingress resources. When the Certificate is provisioned it will be written to a Secret.

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: shared
  namespace: tenant
spec:
  issuerRef:
    group: cert-manager.io
    kind: ClusterIssuer
    name: letsencrypt
  dnsNames:
    - app-one.example.com
    - app-two.example.com
  secretName: shared-cert
```

To complete the ingress configuration an Ingress resource has to be created. The Ingress resource defines the Service where the traffic should be routed to and the DNS name which should resolve to
that Service. An additional configuration is the TLS configuration which configures the certificate to use. Cert Manager writes the certificate data to a Secret which is configured in the Certificate
`secretName`. That same Secret should be referenced in the TLS configuration. A DNS record will be automatically created when the Ingress is applied to the cluster.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-one
  namespace: tenant
spec:
  rules:
    - host: app-one.example.com
      http:
        paths:
          - path: /
            backend:
              service:
                name: app-one
                port:
                  name: http
  tls:
    - hosts:
        - app-one.example.com
      secretName: shared-cert
```

### Private Ingress

TBD

### Nginx Configuration

It is useful to be aware of [annotation configuration](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#annotations) in the Nginx ingress controller.
Sometimes a specific Ingress requires custom behavior that is not default in the ingress controller, this behavior can be customized with the help of annotations for a specific Ingress resource.
For example changing the client body buffer size may be useful if the header size in a request is larger than the buffer.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: foo
  namespace: bar
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/client-body-buffer-size: 1M
spec:
  rules:
    - host: foo.dev.example.com
      http:
        paths:
          - backend:
              serviceName: foo
              servicePort: http
  tls:
    - hosts:
        - foo.dev.example.com
```

### Debugging

Common networking problems include forgetting to set up egress or ingress rules that apply for your pods - or setting them up and then having the requirements change which then causes connection errors.

Remember that you can inspect your network policies with `kubectl get networkpolicies`. If you cannot see your policy there, see if it's listed in your `kustomization.yaml`.

## Linkerd

[Linkerd](https://linkerd.io/) is an optional service mesh that can be added to XKS. The component is opt-in as it adds a certain amount of overhead,
so unless it has been requested Linkerd will not be present in XKS. A service mesh extends the networking functionality in a Kubernetes cluster. It is
useful when features such as end-to-end encryption or GRPC load balancing is required. Linkerd will automatically handle TCP loadbalancing so when
GRPC is used Linkerd will detect this and loadbalance between instances of GRPC servers.

Refer to the [official documentation](https://linkerd.io/2.10/overview/) for documentation that may be missing from this page.

Linkerd works by injecting a sidecar into every Pod which uses Linkerd. All network requests have to be sent through the sidecar which will then be
responsible for forwarding it. The sidecar will hanlde things like traffic encryption before sending the packets outside of the node.

<img alt="Linkerd Overview" src={useBaseUrl("img/assets/xks/developer-guide/linkerd-overview.jpg")} />

### Get Started

To enable sidecar injection the Pod has to have the annotation `linkerd.io/inject: enabled` added to it. A common mistake when enabling Linkerd is
that the annotation is added to Deployment and not the Pod template, make sure that you do not do this as the sidecar will not be injected if
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
        - name: linkerd-test
          image: alpine:latest
          ports:
            - containerPort: 8080
              name: http
              protocol: TCP
```

Eventually a Pod should be created. An important detail is that there should be two containers in the Pod. One container should be the one defined in
the Deployment and the other one the Linkerd sidecar. This can be verified by getting the Pods containers.

```shell
$ kubectl get pods <POD_NAME> -o jsonpath="{.spec.containers[*].name}"
linkerd-test linkerd-proxy
```

With the sidecar added all traffic going out of the container will automatically be proxied through the sidecar.

### FAQ

#### Is all network traffic encrypted?

No, it depends on the traffic type and is something that should be verified rather than assumed. More information can be found in the [Linkerd documentation](https://linkerd.io/2.10/features/automatic-mtls/#).

#### What overhead can I expect?

Each Pod will at minimum consume an additional 10 MB due to the extra sidecar and the number can grow as traffic increases.
