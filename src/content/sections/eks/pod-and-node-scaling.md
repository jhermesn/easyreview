---
title: Pod and node scaling
level: professional
order: 60
facts:
  - id: hpa
    text: The Horizontal Pod Autoscaler changes Pod replica counts to meet a configured metric target;
      it does not provision nodes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html
  - id: metrics
    text: HPA requires a metrics source such as Metrics Server; resource metrics provide CPU and memory
      data, while adapters can expose custom or external metrics.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_horizontal_pod_autoscaler_hpa
  - id: requests
    text: Resource requests are the CPU and memory reservations used when scheduling Pods; node groups
      must have capacity and scheduling properties that fit unscheduled Pods.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html
  - id: ca
    text: Cluster Autoscaler watches unschedulable Pods and underused nodes, simulates placement
      changes, and changes EC2 Auto Scaling group desired capacity.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_overview
  - id: node-shape
    text: Cluster Autoscaler expects nodes within a node group to have identical scheduling properties,
      including labels, taints, and resources.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html
  - id: karpenter
    text: Karpenter provisions compute according to workload compute, storage, acceleration, and
      scheduling requirements.
    source: https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html
  - id: auto-mode
    text: Auto Mode builds on Karpenter, creates nodes when Pods do not fit existing nodes, and
      consolidates workloads and removes nodes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html#_eks_auto_mode
  - id: ca-utilization
    text: The default Cluster Autoscaler scale-down-utilization-threshold is 0.5, based on requested
      resources divided by capacity; being below it makes a node a candidate for scale-down.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_additional_parameters
  - id: ca-delay
    text: The default Cluster Autoscaler scale-down-unneeded-time is 10 minutes.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_additional_parameters
  - id: eviction
    text: A Pod annotated cluster-autoscaler.kubernetes.io/safe-to-evict=false can prevent its node from
      being scaled down.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html
  - id: zonal-ebs
    text: EBS volumes are limited to one Availability Zone; AWS recommends balancing similar per-zone
      node groups for these workloads with balance-similar-node-groups=true.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_ebs_volumes
  - id: hpa-downscale
    text: The EKS HPA walkthrough documents a default five-minute scale-down timeframe that can be
      changed.
    source: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html#hpa-sample-app
diagrams:
  - id: eks-scaling-layers
    title: Replica demand and node capacity are separate
    width: 1000
    height: 170
    nodes:
      - id: hpa
        label: HPA
        x: 25
        y: 50
        w: 180
        h: 72
        tone: neutral
      - id: pods
        label: Pending replicas
        x: 280
        y: 50
        w: 180
        h: 72
        tone: compute
        icon: elastic-kubernetes-service
      - id: scaler
        label: Node autoscaler
        x: 535
        y: 50
        w: 180
        h: 72
        tone: neutral
      - id: nodes
        label: Node capacity
        x: 790
        y: 50
        w: 180
        h: 72
        tone: compute
        icon: res-ec2-instance
    edges:
      - from: hpa
        to: pods
        step: 1
      - from: pods
        to: scaler
        step: 2
      - from: scaler
        to: nodes
        step: 3
    steps:
      - HPA requests more replicas from its metric target.
      - Unschedulable replicas expose the need for additional compute.
      - The node autoscaler supplies compatible node capacity.
cards:
  - id: eks-002
    q: Which autoscaling components change EKS Pod counts and node capacity?
    a: HPA changes Pod replicas. Cluster Autoscaler changes Auto Scaling group desired capacity.
      Karpenter provisions compute for workload requirements. Auto Mode builds on Karpenter and
      manages node scaling and consolidation.
    facts:
      - hpa
      - ca
      - karpenter
      - auto-mode
  - id: eks-003
    q: An EKS HPA adds replicas but the Pods remain unschedulable. What should the team check?
    a: Check resource requests and node scheduling requirements against available node-group capacity.
      HPA does not add nodes; a node autoscaler must be able to create capacity that fits those
      Pods.
    facts:
      - hpa
      - requests
      - ca
      - node-shape
    trap: true
  - id: eks-022
    q: An EKS team wants replicas to scale from queue depth. What does HPA need?
    a: An external metrics source exposed through an appropriate metrics API adapter, plus an HPA
      configured for that metric. CPU Metrics Server data alone does not supply queue depth.
    facts:
      - metrics
  - id: eks-023
    q: An EKS node is below 50% requested utilization. Must Cluster Autoscaler delete it immediately?
    a: No. The default 0.5 threshold makes it a candidate. The default unneeded time is 10 minutes, and
      a Pod marked `cluster-autoscaler.kubernetes.io/safe-to-evict=false` can prevent removal.
    facts:
      - ca-utilization
      - ca-delay
      - eviction
    trap: true
  - id: eks-024
    q: EKS stateful Pods use EBS volumes in different Availability Zones. What node-group design helps
      Cluster Autoscaler place them?
    a: Use similar node groups scoped to individual Availability Zones and enable
      `balance-similar-node-groups=true`, because an EBS volume is tied to its zone.
    facts:
      - zonal-ebs
  - id: eks-025
    q: Does an EKS cluster need a separately managed Karpenter installation to get Auto Mode compute
      scaling?
    a: Auto Mode provides managed compute scaling built on Karpenter, including provisioning nodes for
      Pods that do not fit and consolidation.
    facts:
      - auto-mode
---
EKS scaling has separate workload and compute decisions. The Horizontal Pod Autoscaler (HPA) changes the number of Pod replicas. A node autoscaler supplies machines where those Pods can run. More requested replicas need somewhere to fit.

### How it works

1. Give Pods resource requests, the CPU and memory reservations used for placement. Configure HPA with a metric target and a metrics source.
2. HPA adjusts replica count. Metrics Server supplies CPU and memory metrics. An adapter can expose custom or external metrics, such as queue depth, through a metrics API.
3. When replicas cannot be scheduled, use a compute scaling mechanism.

| Mechanism | Scaling action | Capacity model |
|---|---|---|
| Cluster Autoscaler | Simulates placement and adjusts desired capacity | Existing EC2 Auto Scaling groups |
| Karpenter | Provisions compute for workload requirements | Instance selection from workload constraints |
| EKS Auto Mode | Provisions, consolidates, and removes nodes | Managed compute scaling built on Karpenter |

4. Check that resource requests fit the possible nodes. A node group must have compatible labels, key-value attributes, and taints, restrictions on which Pods it accepts. More nodes with incompatible scheduling properties will not solve placement.
5. For EBS workloads, account for the volume's Availability Zone. AWS recommends similar node groups per zone and `balance-similar-node-groups=true`.
6. On scale-in, Cluster Autoscaler considers underused nodes and whether workloads can move. A Pod with `cluster-autoscaler.kubernetes.io/safe-to-evict=false` can keep its node from removal.

### Exam cues

- If the question says HPA increased replicas but they cannot be scheduled, think node capacity and placement constraints, because HPA changes replicas without provisioning nodes.
- If the question says scale EKS Pods using queue backlog, think an external metrics adapter with HPA, because Metrics Server supplies resource usage rather than queue depth.
- If the question says a stateful Pod must use its EBS volume, think capacity in that volume's zone, because EBS storage is zonal.

### Remember

- Cluster Autoscaler's default utilization threshold is 0.5 of requested resources divided by capacity. It identifies candidates, not guaranteed removals.
- Its default `scale-down-unneeded-time` is 10 minutes.
- The HPA walkthrough documents a five-minute default scale-down timeframe; it is configurable.

> **Trap:** A low observed CPU graph is not the same as low requested utilization. Autoscaler placement and scale-down decisions depend on reservations and whether Pods can move.
