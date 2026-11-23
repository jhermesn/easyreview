---
title: Pod and node scaling
level: associate
order: 60
facts:
  - id: hpa
    text: The Horizontal Pod Autoscaler changes Pod replica counts to meet a configured metric target;
      it does not provision nodes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html
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
  - id: hpa-downscale
    text: The EKS HPA walkthrough documents a default five-minute scale-down timeframe that can be
      changed.
    source: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html#hpa-sample-app
  - id: hpa-metrics
    text: "The EKS HPA needs a metrics source such as Metrics Server to obtain CPU and memory resource metrics."
    source: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html
  - id: vpa-requests
    text: "The Kubernetes Vertical Pod Autoscaler adjusts CPU and memory reservations for Pods."
    source: https://docs.aws.amazon.com/eks/latest/userguide/vertical-pod-autoscaler.html
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
  - id: eks-025
    q: Does an EKS cluster need a separately managed Karpenter installation to get Auto Mode compute
      scaling?
    a: Auto Mode provides managed compute scaling built on Karpenter, including provisioning nodes for
      Pods that do not fit and consolidation.
    facts:
      - auto-mode
  - id: eks-064
    q: "An Amazon EKS HPA cannot obtain CPU utilization. What component should the team check?"
    a: "A resource metrics source such as Metrics Server."
    facts: [hpa-metrics]
  - id: eks-065
    q: "Which Amazon EKS autoscaler adjusts Pod CPU and memory reservations rather than the replica count?"
    a: "Vertical Pod Autoscaler. HPA adjusts the replica count."
    facts: [vpa-requests ,hpa]
---
EKS scaling has separate workload and compute decisions. The Horizontal Pod Autoscaler (HPA) changes the number of Pod replicas. A node autoscaler supplies machines where those Pods can run. More requested replicas need somewhere to fit.

### How it works

1. Give Pods resource requests, the CPU and memory reservations used for placement. Configure HPA with a metric target.
2. HPA adjusts the replica count to meet its metric target.
3. When replicas cannot be scheduled, use a compute scaling mechanism.

| Mechanism | Scaling action | Capacity model |
|---|---|---|
| Cluster Autoscaler | Simulates placement and adjusts desired capacity | Existing EC2 Auto Scaling groups |
| Karpenter | Provisions compute for workload requirements | Instance selection from workload constraints |
| EKS Auto Mode | Provisions, consolidates, and removes nodes | Managed compute scaling built on Karpenter |

4. Check that resource requests fit the possible nodes. A node group must have compatible labels, key-value attributes, and taints, restrictions on which Pods it accepts. More nodes with incompatible scheduling properties will not solve placement.

### Exam cues

- If the question says adjust Pod CPU and memory reservations, think Vertical Pod Autoscaler, because HPA changes replica counts.
- If the question says HPA cannot read CPU utilization, think Metrics Server, because HPA needs a source for resource metrics.
- If the question says HPA increased replicas but they cannot be scheduled, think node capacity and placement constraints, because HPA changes replicas without provisioning nodes.

### Remember

- The HPA walkthrough documents a five-minute default scale-down timeframe; it is configurable.

> **Trap:** HPA changes Pod replicas, but it does not add nodes. Unschedulable Pods need compatible node capacity.
