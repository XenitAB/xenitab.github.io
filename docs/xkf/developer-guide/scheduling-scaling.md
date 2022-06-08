---
id: scheduling-scaling
title: Scheduling and Scaling
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Kubernetes scheduler is responsible for assigning new Pods to Nodes. This functionality is a core component of Kubernetes. The Kuberetes Scheduler in its simplest form assigns Pods based on two main criteria.

1. Filtering - Checks Nodes for available resources and if they meet the requirements of the Pod.
2. Scoring - Ranks the filtered Nodes and chooses the highest ranked one.

Most Kubernetes users encounter the scheduler for the first time when creating either a Deployment or Pod. The scheduler has to decide which Node to assign the Pod to. In the case of a Deployment the replica count can be increased and decreased at a moment's notice by the user. When replica is changed for example from three to twenty the scheduler will have a lot of Pods all of a sudden to assign to Nodes. Having a deeper understanding of the Kubernetes scheduler will allow for efficient resource consumption and debugging any scheduling issues. This section will give an overview overscheduling and scaling features in Kubernetes and how they relate to each other.

## Pod Resources

Setting good [resource requests and limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for a container is an important component in helping the scheduler select the correct Node to schedule a Pod to. There are two types of resource configuration fields, and these are configured for each container in a Pod.
The resource request tells the scheduler how much of each resource each container in a Pod is expected to consume, though a Pod is allowed to consume more. The limit sets the maximum amount of resources each container in a Pod can consume. There are two main resource types that one should be aware of, CPU and memory.
The CPU resource is defined in CPU units where one CPU unit is the equivalent of one CPU core. Fractional units can also be requested, in either decimals like `0.1` but also in terms of millicores where `100m` would be the same amount. The memory resource is defined in whole integers with the quantity suffixes
`Ei, Pi, Ti, Gi, Mi, Ki`.

If you do not specify any resources for a container the default resource request and limit will be applied as shown below. These resources are low on purpose, both to minimize the effects of overprovisioning but also to make it obvious for XKF users that resources have not been specified. The keen-eyed may notice that
a CPU limit is not set by default, this is on purpose and the reasons for it will be discussed later.

```yaml
resources:
  request:
    cpu: 50m
    memory: 32Mi
  limits:
    memory: 256Mi
```

The scheduler will look at the cumulative resource requests across all containers in a Pod during the scheduling phase. The scheduler will exclude any Node which does not have capacity for the Pods resource request. Capacity is determined based on the total resources available in a Node minus the sum of all the
resource requests of all Pods currently scheduled to the Node. A Pod may at times request more resource than any Node has capacity for, there are two possible outcomes for this situation. If the Pods resource request is less than a Nodes total available resources, a new Node will be added to the cluster. The Pod will
however be considered unschedulable if the resource request exceeds the total resources available on a single node. In these cases either the resource request has to change or a new Node type has to be added to the cluster to cater to these needs.

<img alt="Pod Scheduling" src={useBaseUrl("img/assets/xkf/developer-guide/pod-scheduling.jpg")} />

It is possible to overprovision Node resources in cases where the resource request for each container is much larger that the actual resource consumption. Efficient resource allocation is a constant battle between requesting enough resources to avoid under allocation while not
requesting too much which would result in overallocation. The easiest way to think about resources consumption and availability is to imaging the capacity as a glass, as more resources are consumed water is added to the glass. If the consumption increase does not stop the glass will eventually overfill.

<!-- TODO: Should we reccomend most users to just use the same memory request and limit? -->

<img alt="Pod Scheduling" src={useBaseUrl("img/assets/xkf/developer-guide/pod-resource-request.jpg")} />

The resource limit defined for a Pod has no affect on the scheduling of a Pod. Limits instead comes into play for a Pod during runtime. Exceeding the resource limit for CPU and memory will have
different affects. A Pod which exceeds the memory limit will be terminated with an out of memory error (OOM Error).  The Pod will after termination be started again, it may start to exceed the limit again which will result in another OOM error. These types of errors can either be resolved by having the application
consume less memory alternatively increasing the memory limit. Without a memory limit a Pod would be able to continue consuming memory until the Node runs out. This would not only affect critical
system processes that runs in the node but other Pods which may not even be able to consume the resources it requested.

CPU limits should be treated slightly differently from memory limits. When memory is overconsumed applications will crash when there is no place to store new data. However when CPU is overconsumed throttling will occur. Applications will not immediately crash even if performance may be severely deprecated. CPU differs from memory as a resource in the sense that CPU time will be wasted if not consumed and applications required CPU time can vary a lot. Reserving CPU time that is not used is a waste if another application would benefit from using it. Setting a CPU limit for a Pod will result in artificial CPU throttling even if it would not necessarily be required. It is for that reason that a CPU limit is not enforced for Pods by default, instead it is something that should be opted into when the effects of CPU throttling is understood. It is still important to set a reasonable CPU request for Kubernetes to determine the minimal resource requirements, but CPU limits should be avoided in most cases where it is not fully understood.

<!-- TODO: Discussion about what the effects of throttling has on applications and the bugs it can cause. -->

<!-- TODO: Something about detecting CPU throtlling and adjusting CPU requests -->

<!-- TODO: Something about VPA or link to how to use VPA -->

<!-- TODO: Different strategies around requests and limits, like setting them to be the same-->

## Scheduling on Specific Nodes

[Node Selectors](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) are the easiest may to make sure that a Pod runs on a specific Node. It is a label selector which filters out which Nodes the Pod can be scheduled to. Any Node which does not match the label selector will not be considered for scheduling.

> A Pod with a Node Selector which does not match with any Node will never be scheduled.

Given the two nodes with different values for the `agentpool` label.

```yaml
apiVersion: v1
kind: Node
metadata:
  name: aks-standard-node
  labels:
    agentpool: standard
---
apiVersion: v1
kind: Node
metadata:
  name: aks-memory-node
  labels:
    agentpool: memory
```

The Node Selector would make sure that the Pod would only be scheduled on the second Node `aks-memory-node` and never on the first Node.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  nodeSelector:
    agentpool: memory
```

## Affinity and Anti Affinity

This is similar to `nodeSelector` bur greatly enhances the types of constraints you can express.

1. The affinity/anti-affinity language is more expressive. The language offers more matching rules.
2. Rules can be "preferred" rather than hard requirements, so if the scheduler can't satisfy them, the pod will still be scheduled
3. You can constrain against labels on other pods running on the node (or other topological domain), rather than against labels on the node itself.

### Nodes

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

### Pods

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
                    - xkf
            topologyKey: kubernetes.io/hostname
          weight: 100
        - podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: prometheus
                  operator: In
                  values:
                    - xkf
            topologyKey: topology.kubernetes.io/zone
          weight: 100
```

This is an example configuration of podAntiAffinity for Prometheus. Spreading the pod deployment based on `topology.kubernetes.io/zone` and `topology.kubernetes.io/hostname` to only allow 1 pod on each node and to mitigate downtime in case an entire zone goes down, e.g: if a pod runs in zone A with key `prometheus` and value `xkf` do not schedule it in zone A - choose zone B or C. Note that these settings are "preferred" and not required.

We recommend using this configuration, as critical services should be distributed to multiple zones to minimize downtime.

You can read more about this [in the official documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/).

## Pod Disruption Budget

[Pod Disruption Budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) are critical for any production deployment of an application. It enforces so that there are always a set amount of replicas of an application running. There is a risk that an application will during a short period of time have zero replicas
running without if a Pod Disruption Budget has not been defined. XKF depends heavily on the existence of Pod Disruption Budgets to make sure that a cluster node pool can be scaled safely and upgrades can be applied to node pools without involving individual developers. During these types of event multiple Nodes will be drained.
The Node will block any new Pods from being scheduled to it and start evicting all existing Pods running the Node during a drain. Without a Pod Disruption Budget all Pods belonging to the same Deployment may be stopped at the same time, before any new Pods have had the time to start. With a Pod Disruption Budget a limited
amount of Pods will be stopped, and then started on a new Node. Eviction will continue with the remaining Pods after the new Pods are running and passed their readiness probe. This documentation is only relevant for applications that are deployed with multiple replicas. It is not possible to create a Pod Disruption Budget for
a single replica application, one has to assume that downtime will most likely happen and an application is deployed as a single replica.

Creating a Pod Disruption Budget can be very simple. Assume a Deployment named podinfo with the label `app: podinfo` and a replica count of three exists in a cluster. The Pod Disruption Budget below would make sure that at least two of the replicas will be running at all times. It is important that `minAvailible` is always
smaller than `replicas`. It would be impossible to evict a Pod if the two values were equal. Removing a Pod would go against the Pod Disruption Budget, and creating an extra Pod would go against the replica count. This result is that a Node will never be able to evict Pods safely.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: podinfo
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: podinfo
```

## Horizontal Pod Autoscaler

<!-- Will update this with more detailed documentation when autoscaling/v2 is GA -->

A static replica count may work for a lot of applications but may not be optimal for production workloads. The goal should be to achieve good stability and latency while avoiding overprovisioning. As discussed earlier one way to scale an application is through increasing its resource requests and limits, this type of scaling is known as vertical scaling. Another option is to increase the amount of replicas instead, this type of scaling is known as horizontal scaling. Increasing the replica count will result in more Pods which can share the workload and increase the through put. Changing the replica count manually during the day would just be time consuming and impossible to achieve at scale.

The [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) can do this automatically. The version `autoscaling/v1` of the Horizontal Pod Autoscaler only supports scaling based on CPU utilization. Future versions will support scaling based on more metrics types.

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: app
spec:
  minReplicas: 1
  maxReplicas: 5
  targetCPUUtilizationPercentage: 60
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app
```

> The Pod Disruption Budget discusses the problems related to setting a minimum availability which is the same or higher than the static replica count. The same problem can occur with Horizontal Pod Autoscalers if the value is smaller than the minimum replica value.

For more details refer to the [Horizontal Pod Autoscaler walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/).

<!-- Section about custom metrics -->

## Priority Class

The Kubernetes scheduler will out of the box treat each Pod with the same priority. The scheduler will assign Pods to Nodes in the order in which they were created, when multiple Pods without a set priority are waiting to be scheduled. This is usually not an issue as Pods tend to be assigned to Nodes quickly. However them
scheduling duration may increase if multiple Horizontal Pod Autoscalers were to increase the replica count at the same time, as new Nodes would have to be provisioned first. In this case the queue would grow while waiting for more capacity in the cluster. Some applications may be more critical than others for the survival
of a product. Waiting for the applications turn may not be the optimal solution if other applications have no problem waiting a bit longer to start running.

Setting Priority Class to a Pod can help the scheduler decide which Pods are more important and should be assigned to a Node first. In XKF there are three Priority Classes available.

* `tenant-low`
* `tenant-medium`
* `tenant-high`

The Priority Class is set with the `priorityClassName` field. Always start off with using the Priority Class `tenant-low`, and decide later on if it should be changed. This is for the simple reason that if every Pod has a high priority no Pod will be considered of high priority as it would be the same as setting no priority
at all. Setting `tenant-medium` could be a good choice for applications that are user facing and may scale up and down frequently.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  priorityClassName: tenant-low
  containers:
    - name: nginx
      image: nginx
```
