---
id: networking
title: Networking
---

There are a lot of moving parts when looking at networking and Kubernetes. There are both Kubernetes specific components such as kube-proxy and CoreDNS but also cloud specific components such as the
underlying VNET/VPC, load balancer, and NAT gateways. The page aims to describe the architecture and some of the limitations and problems which can be experienced when working with XKS to help with
debugging networking issues.

## Kubernetes

TBD

## Azure

XKS in Azure uses a single VNET with a single subnet per AKS cluster. The VNET and subnets are created by the [core module](https://github.com/XenitAB/terraform-modules/tree/main/modules/azure/core).
Additionally each AKS cluster also creates a load balancer. The load balancer is used for both ingress and egress traffic.

When a Kubernetes service of type `LoadBalancer` is created a new IP is attached to the load balancer. An Azure load balancer can have multiple IPs attached to it so unlike AWS it does not have to
create a new load balancer.

During the creation of the AKS cluster a public IP prefix is attached to the load balancer for egress traffic. This ensures that all traffic egress with the same source IP, enabling the use of IP
white listing in external sources. This does however mean that all outbound traffic will also go through the same load balancer as the incoming traffic. There is currently work underway to enable the
use of managed NAT gateways for egress traffic in AKS, but it is currently [in preview](https://docs.microsoft.com/en-us/azure/aks/nat-gateway) right now.

### SNAT Exhaustion

Applications making large numbers of outgoing TCP or UDP connections to the same IP and port can cause an issue known as SNAT port exhaustion. This is mostly due to the network architecture in Azure
and AKS. All of the outgoing traffic from AKS goes through the load balancer, and for each outgoing request the load balancer needs to allocate an SNAT port to receive the response. Each Azure load
balancer will allocate 64000 SNAT ports. This may seem like a lot, but there is a caveat as AKS will limit the amount of SNAT ports per node. The amount of SNAT ports availible per node depends on
the amount of nodes per cluster.

| Node Count | SNAT Ports per Node |
|:-----:|:-----:|
| 1-50 | 1024 |
| 51-100 | 512 |
| 101-200 | 256 |
| 201-400 | 128 |
| 401-800 | 64 |
| 801-1000 | 32 |

A symptom of exhausting the SNAT ports is that outgoing requests will just fail. This is of course not a good situation, and may be hard to debug as a failing request could be caused by many different
factors.

#### Links

* https://docs.microsoft.com/en-us/azure/aks/load-balancer-standard#troubleshooting-snat
* https://docs.microsoft.com/en-us/azure/load-balancer/troubleshoot-outbound-connection
* https://www.danielstechblog.io/detecting-snat-port-exhaustion-on-azure-kubernetes-service/
* https://medium.com/asos-techblog/an-aks-performance-journey-part-1-sizing-everything-up-ee6d2346ea99
* https://medium.com/asos-techblog/an-aks-performance-journey-part-2-networking-it-out-e253f5bb4f69

## AWS

TBD
