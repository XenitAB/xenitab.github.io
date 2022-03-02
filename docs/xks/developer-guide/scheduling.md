---
id: scheduling
title: Scheduling Pods
---

## Scheduling

### Kubernetes Scheduler

The kube-scheduler looks for newly created pods that do not have any assigned node. A node that meets the requirements to run a pod is called a feasible node.

 Kube-scheduler is responsible for assigning a suitable node to the pod based on 2 criteria:

1. Filtering - Checks available nodes for available resources, to meet requirements specificed in the pod.
2. Scoring - Based on the available resources when Filtering, ranks the available nodes and chooses the highest ranking one. If 2 or more are equal, selection is random.

### Node Selector

You can schedule pods based on labels and nodeSelector, for example, you can force your pod to run on a machine with GPU by setting: `gpuEnabled: true`

Nodeconfig:

```yaml
labels:
    gpuEnabled: true
```

Podconfig:

```yaml
nodeSelector:
    gpuEnabled: true
```

## Affinity & antiAffinity

This is similar to `nodeSelector` bur greatly enhances the types of constraints you can express.

1. The affinity/anti-affinity language is more expressive. The language offers more matching rules.
2. Rules can be "preferred" rather than hard requirements, so if the scheduler can't satisfy them, the pod will still be scheduled
3. You can constrain against labels on other pods running on the node (or other topological domain), rather than against labels on the node itself.

### Node Affinity

There are currently two types of node affinity, called `requiredDuringSchedulingIgnoredDuringExecution` and `preferredDuringSchedulingIgnoredDuringExecution`. You can think of them as "hard" and "soft" requirements to schedule a pod. The `IgnoredDuringExecution` part of the names means that if labels on a node change at runtime such that the affinity rules on a pod are no longer met, the pod continues to run on the node.

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/name
            operator: In
            values:
            - ABC
            - XYZ
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        preference:
          matchExpressions:
          - key: label-key
            operator: In
            values:
            - label-value
```

This example only allows pods to be scheduled on nodes with a key `kubernetes.io/name` with value `ABC` or `XYZ` Among the nodes matching this criteria, nodes with the key `label-key` and the value `label-value` will be preferred.

The `weight` field is ranged 1-100 and for each node matching all scheduling requirements, the kube-scheduler computes a score, as mentioned earlier. It then adds this number to that sum to calculate the best matching node.

### podAffinity and podAntiAffinity

podAffinity and podAntiAffinity lets you constrain which nodes pods are eligible to be scheduled on based of label of the pods running on the node rather than the labels on the node.

podAnitAffinity

```yaml
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: label1
            operator: In
            values:
            - label-value
        topologyKey: topology.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: label2
              operator: In
              values:
              - label-value-anti
          topologyKey: topology.kubernetes.io/zone
```

This shows an example where we use both affinity rules.

Affinity rule: the pod can only be scheduled onto a node if that node is in the same zone as at least one already-running pod that has a label with key `label1` and value `label-value`.

antiAffinity rule: the pod should not be scheduled onto a node if that node is in the same zone as a pod with a label having key `label2` and value `label-value-anti`

```yaml
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: prometheus
                  operator: In
                  values:
                    - xks
            topologyKey: kubernetes.io/hostname
          weight: 100
        - podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: prometheus
                  operator: In
                  values:
                    - xks
            topologyKey: topology.kubernetes.io/zone
          weight: 100
```

This is an example configuration of podAntiAffinity for Prometheus. Spreading the pod deployment based on `topology.kubernetes.io/zone` and `topology.kubernetes.io/hostname` to only allow 1 pod on each node and to mitigate downtime in case an entire zone goes down, e.g: if a pod runs in zone A with key `prometheus` and value `xks` do not schedule it in zone A - choose zone B or C. Note that these settings are "preferred" and not required.

We recommend using this configuration, as critical services should be distributed to multiple zones to minimize downtime.

You can read more about this [in the official documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).
