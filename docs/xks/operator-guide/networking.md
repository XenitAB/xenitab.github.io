---
id: networking
title: Networking
---

There are a lot of moving parts when looking at networking and Kubernetes. There are both Kubernetes specific components such as kube-proxy and CoreDNS but also cloud specific components such as the
underlying VNET/VPC, load balancer, and NAT gateways. The page aims to describe the architecture and some of the limitations and problems which can be experienced when working with XKS to help with
debugging networking issues.

## Kubernetes

### Ingress

Ingress is all traffic that originates from outside the Kubernetes cluster with a destination inside the cluster. The majority of ingress traffic is HTTP but TCP ingress traffic is also possible. There are multiple components which makes ingress work. Load balancers, DNS records, TLS certificates, and Ingress Controllers are all required to achieve a production ready ingress solution in Kubernetes. The diagram below shows an overview of all the components involved in ingress networking. 

<img alt="Ingress Networking" src={useBaseUrl("img/assets/xks/operator-guide/ingress-networking.jpg")} />

An important note is that the DNS zone in which the records are create does not belong to a specific cluster or region. It is instead global to the specific region. This is the case regardless of the cloud or DNS provider used. Additionally XKF supports multiple DNS zones in the same cluster. This is useful if for example different applications should be exposed with totally different DNS records.

The ingress controller is the application where all HTTP traffic will first reach inside of the Kubernetes cluster. It will forward request to the correct destination based on request parameters. The ingress controller has an accompanying load balancer with an IP which is routable from outside of the Kubernetes cluster. Requests to this IP will reach the ingress controller. It is possible to run multiple ingress controller in Kubernetes but XKF only has a single [NGINX ingress controller](https://github.com/kubernetes/ingress-nginx). DNS records are managed by [external-dns](https://github.com/kubernetes-sigs/external-dns) in the Kubernetes clusters. It looks at Ingress resources in the Kubernetes cluster and creates DNS records in the correct zone. The IP which the DNS record points towards is the load balancer which directs traffic to the ingress controller. Lastly certificates have to be provisioned. This is done with the help of [cert-manager](https://github.com/cert-manager/cert-manager). It runs in each cluster and provisions new certificates through [Let's Encrypt](Let's Encrypt). The certificate provisioning process includes a validation process to verify ownership of the DNS record for which the certificate is being created for. XKF uses [DNS01 challenges](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge) in favor of [HTTP01 challenges](https://letsencrypt.org/docs/challenge-types/#http-01-challenge) to accomplish this for two specific reasons. The first being that HTTP01 challenges do not allow creation of wildcard certificates. The second being that the validation process would not work with how XKF implements blue/green cluster upgrades, as the requests to `http://<DOMAIN>/.well-known/acme-challenge/<TOKEN>` has to routed to the new cluster. The DNS01 works by creating a TXT record at `_acme-challenge.<DOMAIN>` with the value of the TXT record being a specific token value. The record only has to exist during the certificate provisioning and can be removed after it is complete.

### Node Local DNS

To lower DNS query latency and a number of other [reasons](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/#motivation)
we are using [NodeLocal DNS](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/) in XKS.

Node Local DNS is an application that runs on each node and creates a loopback interface on each node together with a number of iptables rules. The iptables rules intercepts all the DNS traffic from all pods that is sent to the clusters DNS server.

#### Node Local DNS Configuration

To configure Node Local DNS you need to provide two values.
The IP of the central DNS server in your cluster, you can find this by running: `kubectl get svc kube-dns -n kube-system -o jsonpath={.spec.clusterIP}`.
The second value is a random IP that you know that nothing else in the cluster is ever going to use, in our case we used the example ip `169.254.20.10`.
These values are defined for you in XKS but it's good to know about them and where to find them.

Here you can view the example [configuration](https://github.com/kubernetes/kubernetes/blob/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml) provided in the docs.

Node Local DNS is built on top of CoreDNS and is plugin based. Depending on your needs you can easily enable new features.
By default NodeLocal DNS don't log the DNS requests it gets but it can make it hard to debug.

In XKS we haven't enabled any debug logs ether but if you need to enable it all you need to do is to add `log` as part of the plugins defined in your yaml.

For example:

```.yaml
data:
  Corefile: |
    .:53 {
        errors
        log
        cache 30
        reload
        loop
        bind 169.254.20.10 10.0.0.10
        forward . __PILLAR__UPSTREAM__SERVERS__
        prometheus :9253
        }
```

For you as a XKS administrator the biggest chance to change is in the [cache plugin](https://coredns.io/plugins/cache/).
Instead of me trying to rewrite the docs I recommend you to read it but we have changed the default value and at the time of writing we use the following config:

```.yaml
data:
  Corefile: |
    .:53 {
        log
        errors
        cache {
                success 9984 30
                denial 9984 10
                prefetch 20 60s 15%
        }
        reload
        loop
        bind 169.254.20.10 10.0.0.10
        forward . /etc/resolv.conf
        prometheus :9253
        }
```

The prefetch feature allows us to automatically get DNS entries that is in the cache and automatically update it before the DNS TTL ends.
Remember that the cache TTL won't change the TTL of your cached DNS entries.
If the DNS entry have a TTL of 1 minute and the cache have a TTL of 5 minutes the DNS entry will disappear after 1 minute.

If you for example define a cache without setting success and denial but set the prefetch config the default TTL cache value will still be applied.

```.yaml
data:
  Corefile: |
    .:53 {
        log
        errors
        cache {
            prefetch 20 60s 15%
        }
        reload
        loop
        bind 169.254.20.10 10.0.0.10
        forward . /etc/resolv.conf
        prometheus :9253
        }
```

#### Node local DNS networkpolicy

Sadly when using NodeLocal DNS together with Networkpolicy and the Calico CNI you need to write a networkpolicy that instead of using label selectors on a pod level you need to write a ruler
that will work on the [node level](https://github.com/kubernetes/kubernetes/blob/master/cluster/addons/dns/nodelocaldns/README.md#network-policy-and-dns-connectivity)
What it doesn't say in the docs is that you need to define the internal vnet IP as well.

These are the same values that was defined when doing the configuration.
The default values on XKS `AKS` is `169.254.20.10` and `10.0.0.10` and on `AWS` it's `169.254.20.10` and `172.20.0.10`.

The needed networkpolicy exist by default in all the tenant namespaces and is called `default-deny` and is managed by terraform.

To view the rule run:

`kubectl get networkpolicies default-deny -n <tenant>`

## Azure

XKS in Azure uses a single VNET with a single subnet per AKS cluster. The VNET and subnets are created by the [core module](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/core).
Additionally each AKS cluster also creates a load balancer. The load balancer is used for both ingress and egress traffic.

When a Kubernetes service of type `LoadBalancer` is created a new IP is attached to the load balancer. An Azure load balancer can have multiple IPs attached to it so unlike AWS it does not have to
create a new load balancer.

During the creation of the AKS cluster a public IP prefix is attached to the load balancer for egress traffic. This ensures that all traffic egress with the same source IP, enabling the use of IP
white listing in external sources. This does however mean that all outbound traffic will also go through the same load balancer as the incoming traffic. There is currently work underway to enable the
use of managed NAT gateways for egress traffic in AKS, but it is currently [in preview](https://docs.microsoft.com/en-us/azure/aks/nat-gateway) right now.

### SNAT Exhaustion

Applications making large numbers of outgoing TCP or UDP connections to the same IP and port can cause an issue known as _SNAT port exhaustion_. This is mostly due to the network architecture in Azure
and AKS. All of the outgoing traffic from AKS goes through the load balancer, and for each outgoing request the load balancer needs to allocate an SNAT port to receive the response. Each Azure load
balancer will allocate 64000 SNAT ports. This may seem like a lot, but there is a caveat as AKS will limit the amount of SNAT ports per node. The amount of SNAT ports available per node depends on
the amount of nodes per cluster.

| Node Count | SNAT Ports per Node |
| :--------: | :-----------------: |
|    1-50    |        1024         |
|   51-100   |         512         |
|  101-200   |         256         |
|  201-400   |         128         |
|  401-800   |         64          |
|  801-1000  |         32          |

A symptom of exhausting the SNAT ports is that outgoing requests will just fail. This is of course not a good situation, and may be hard to debug as a failing request could be caused by many different
factors.

#### Links

- [https://docs.microsoft.com/en-us/azure/aks/load-balancer-standard#troubleshooting-snat](https://docs.microsoft.com/en-us/azure/aks/load-balancer-standard#troubleshooting-snat)
- [https://docs.microsoft.com/en-us/azure/load-balancer/troubleshoot-outbound-connection](https://docs.microsoft.com/en-us/azure/load-balancer/troubleshoot-outbound-connection)
- [https://www.danielstechblog.io/detecting-snat-port-exhaustion-on-azure-kubernetes-service/](https://www.danielstechblog.io/detecting-snat-port-exhaustion-on-azure-kubernetes-service/)
- [https://medium.com/asos-techblog/an-aks-performance-journey-part-1-sizing-everything-up-ee6d2346ea99](https://medium.com/asos-techblog/an-aks-performance-journey-part-1-sizing-everything-up-ee6d2346ea99)
- [https://medium.com/asos-techblog/an-aks-performance-journey-part-2-networking-it-out-e253f5bb4f69](https://medium.com/asos-techblog/an-aks-performance-journey-part-2-networking-it-out-e253f5bb4f69)

## AWS

TBD
