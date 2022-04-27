---
id: best-practices
title: Best Practices
---

This page aims to collect best practices and common mistakes that can be made while using XKS.

## Container Resources

## Probes

## Pod Scaling

Pods can be made to scale automatically as needed. For example, we generally recommend that you add a [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
to your applications.

A good starting configuration might look something like this:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: application
spec:
  minReplicas: 2
  maxReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: application
  metrics:
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

Note that Kubernetes may redeploy your application at any time, for example if the node it is running on is deleted. For this reason, it's recommended to always set the minimum number of replicas for your application to at least 2 in the production cluster.

## Disruption Budgets

As mentioned above, your application might be redeployed for a variety of reasons, which you **do not have control over**. What you can do however, is to ensure that when your application is redeployed
at least 1 copy of it is ensured to always be available, thus avoiding downtime.

In the default configuration, even though you may have at least 2 copies of your application running (with the recommended scaling configuration above), they could be running on the same node, which means that if
that node is destroyed, your application experiences downtime. You will also not have any protection against the applications running in different zones, which could also cause issues if a zone suddenly
goes down.

We recommend adding the following configuration under `spec` for each of your deployments.

```yaml
spec:
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: app
                  operator: In
                  values:
                    - application
            topologyKey: kubernetes.io/hostname
          weight: 100
        - podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: app
                  operator: In
                  values:
                    - application
            topologyKey: topology.kubernetes.io/zone
          weight: 100
```

This will ensure that the scheduler tries to schedule pods for your deployment in different zones and different nodes. This will protect you against downtime related to cluster upgrades and
faulty nodes.

## Resources

Here are some good resources to also read on top of this page.

- [https://srcco.de/posts/web-service-on-kubernetes-production-checklist-2019.html](https://srcco.de/posts/web-service-on-kubernetes-production-checklist-2019.html)
