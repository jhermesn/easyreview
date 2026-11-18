---
title: EKS operational controls
level: professional
order: 80
facts:
  - id: fargate-selector
    text: Fargate profile selectors require a namespace and can include labels; a Pod matching a
      selector can run on Fargate.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  - id: fargate-subnets
    text: EKS Fargate Pods use private subnets without a direct route to an internet gateway.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html#fargate-profile-components
  - id: auto-storage-class
    text: A StorageClass selects how storage is provisioned; Auto Mode uses ebs.csi.eks.amazonaws.com,
      while the standard EBS CSI driver uses ebs.csi.aws.com and manages separate volumes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: update-strategies
    text: Managed node group default updates create new nodes before terminating old nodes; minimal
      updates terminate old nodes first to avoid increasing total capacity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade
  - id: update-eviction
    text: If Pods do not leave a node within 15 minutes, a managed node update fails with
      PodEvictionFailure unless forced; force deletes the Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade
  - id: update-pdb
    text: Restrictive or overlapping Pod disruption budgets can cause PodEvictionFailure during a
      managed node group update.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#_podevictionfailure_errors_during_the_upgrade_phase
  - id: update-max-unavailable
    text: Managed node group updates default to one unavailable node and allow a maximum of 100 nodes
      unavailable in parallel.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-set-up
  - id: sandbox-pods
    text: EKS isolated and confidential Pods use individual Nitro Sandboxes on supported EC2 instances
      with Kubernetes 1.36 or later; runtimeClassName selects the opt-in mode.
    source: https://docs.aws.amazon.com/eks/latest/userguide/sandboxing.html
  - id: sandbox-date
    text: AWS announced Nitro Sandboxes for EKS Pods in November 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/
  - id: auto-pod-sg
    text: EKS Auto Mode security groups for Pods use SecurityGroupPolicy to assign different security
      groups to Pods on the same node; unmatched Pods use node security groups.
    source: https://docs.aws.amazon.com/eks/latest/userguide/auto-sgp.html
  - id: auto-pod-sg-date
    text: EKS Auto Mode added security groups for Pods in November 2026 for Kubernetes 1.36 or later.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-eks-auto-mode-security-groups-for-pods/
  - id: auto-pod-sg-api
    text: Auto Mode SecurityGroupPolicy uses eks.amazonaws.com/v1 and is not spec-compatible with the
      VPC CNI SecurityGroupPolicy in vpcresources.k8s.aws/v1beta1.
    source: https://docs.aws.amazon.com/eks/latest/userguide/auto-sgp.html#_how_this_compares_to_other_ways_to_assign_security_groups
  - id: metrics
    text: HPA requires a metrics source such as Metrics Server; resource metrics provide CPU and memory
      data, while adapters can expose custom or external metrics.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_horizontal_pod_autoscaler_hpa
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
cards:
  - id: eks-008
    q: EKS Fargate Pods remain Pending after a profile is created. What selection settings should the
      team check?
    a: Check that the Pods match a profile selector namespace and any required labels, and that the
      profile uses private subnets.
    facts:
      - fargate-selector
      - fargate-subnets
  - id: eks-012
    q: Which EKS StorageClass provisioners distinguish Auto Mode EBS storage from the standard EBS CSI
      driver?
    a: Auto Mode uses `ebs.csi.eks.amazonaws.com`; the standard driver uses `ebs.csi.aws.com`. They
      manage separate volumes.
    facts:
      - auto-storage-class
  - id: eks-053
    q: An EKS managed node group has scarce GPU capacity and cannot temporarily add nodes during an
      update. Which update strategy fits?
    a: Use the minimal strategy, which terminates old nodes before creating replacements. The default
      strategy creates replacements first to maintain capacity.
    facts:
      - update-strategies
  - id: eks-054
    q: An EKS managed node group update fails with PodEvictionFailure because a Pod disruption budget
      blocks eviction. What should the operator consider?
    a: Review the budget and workload availability before retrying. A forced update deletes Pods if
      eviction cannot complete within 15 minutes.
    facts:
      - update-eviction
      - update-pdb
  - id: eks-055
    q: What is the default maximum unavailable node count during an EKS managed node group update?
    a: One node. The configured maximum unavailable is capped at 100 nodes.
    facts:
      - update-max-unavailable
  - id: eks-056
    q: An EKS application requires hardware isolation between Pods sharing an EC2 node. What option
      provides this on supported instances?
    a: Use isolated or confidential Pods with the appropriate runtimeClassName. Each runs in a Nitro
      Sandbox; Kubernetes 1.36 or later is required.
    facts:
      - sandbox-pods
      - sandbox-date
  - id: eks-057
    q: An EKS Auto Mode cluster needs different security groups for Pods sharing one node so only
      selected workloads can connect to an RDS database. What should the team configure?
    a: Use an Auto Mode SecurityGroupPolicy selecting those Pods. Unmatched Pods keep node security
      groups. This feature requires Kubernetes 1.36 or later.
    facts:
      - auto-pod-sg
      - auto-pod-sg-date
  - id: eks-058
    q: Can an EKS team reuse a VPC CNI SecurityGroupPolicy manifest unchanged for EKS Auto Mode Pods?
    a: No. Auto Mode uses eks.amazonaws.com/v1 and its policy spec differs from the VPC CNI
      vpcresources.k8s.aws/v1beta1 resource.
    trap: true
    facts:
      - auto-pod-sg-api
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
---
Amazon EKS operations involve choices about Pod placement, node updates, isolation and scaling. The right setting depends on the workload and on how much capacity is available during changes.

### How it works

1. For Fargate placement, check that a profile selector matches the Pod's namespace and any specified labels. The profile uses private subnets without a direct route to an internet gateway. [Fargate profiles](https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html) and [subnets](https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html#fargate-profile-components)
2. For EBS storage, a StorageClass selects the provisioner. Auto Mode uses `ebs.csi.eks.amazonaws.com`; the standard EBS CSI driver uses `ebs.csi.aws.com`. They manage separate volumes. [EBS CSI considerations](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations)
3. Choose a managed node group update strategy. The default creates new nodes before terminating old ones. The minimal strategy terminates old nodes first, avoiding an increase in total capacity. A Pod disruption budget can block eviction; restrictive or overlapping budgets can cause `PodEvictionFailure`. A forced update deletes Pods that do not leave within the eviction period. [Update strategies and eviction](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade) and [disruption budgets](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#_podevictionfailure_errors_during_the_upgrade_phase)
4. For hardware isolation on supported EC2 instances, opt into isolated or confidential Pods with `runtimeClassName`. Each Pod uses its own Nitro Sandbox. In Auto Mode, a `SecurityGroupPolicy` assigns security groups to selected Pods; unmatched Pods use the node security groups. Auto Mode uses `eks.amazonaws.com/v1`, whose policy spec differs from the VPC CNI `vpcresources.k8s.aws/v1beta1` spec. [Pod sandboxing](https://docs.aws.amazon.com/eks/latest/userguide/sandboxing.html), [Auto Mode Pod security groups](https://docs.aws.amazon.com/eks/latest/userguide/auto-sgp.html) and [policy comparison](https://docs.aws.amazon.com/eks/latest/userguide/auto-sgp.html#_how_this_compares_to_other_ways_to_assign_security_groups)
5. Supply the Horizontal Pod Autoscaler (HPA) with metrics. Metrics Server provides CPU and memory resource metrics; adapters can expose custom or external metrics. [HPA metrics](https://docs.aws.amazon.com/eks/latest/best-practices/application.html#_horizontal_pod_autoscaler_hpa)
6. For Cluster Autoscaler scale-down, compare requested resources with node capacity. A node below the utilization threshold is a candidate, while a Pod marked `cluster-autoscaler.kubernetes.io/safe-to-evict=false` can prevent removal. For EBS workloads, use similar node groups per Availability Zone and enable `balance-similar-node-groups=true`, because an EBS volume is limited to one zone. [Scale-down parameters](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_additional_parameters), [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html) and [EBS volumes](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_ebs_volumes)

### Exam cues

- If the question says Fargate Pods remain Pending, think profile namespace, labels and private subnets, because the selector and subnet settings determine their placement.
- If the question says an update cannot add capacity, think the minimal strategy, because it terminates old nodes first.
- If the question says a node update fails with `PodEvictionFailure`, think Pod disruption budgets, because restrictive or overlapping budgets can block eviction.
- If the question says Pods on one node need hardware isolation, think isolated or confidential Pods, because each uses a Nitro Sandbox.
- If the question says Pods on one Auto Mode node need different security groups, think `SecurityGroupPolicy`, because it assigns groups to selected Pods.
- If the question says HPA must scale on queue depth, think an external metrics adapter, because resource metrics supply CPU and memory data.
- If the question says stateful Pods use EBS in different zones, think similar per-zone node groups, because each volume is limited to one Availability Zone.

### Remember

- Managed node updates default to one unavailable node, with a maximum of 100 in parallel. [Update setup](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-set-up)
- Pod eviction can fail after 15 minutes; forcing the update deletes Pods that have not left. [Update upgrade phase](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade)
- Cluster Autoscaler's default utilization threshold is 0.5 of requested resources divided by capacity; its default unneeded time is 10 minutes. [Scale-down parameters](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html#_additional_parameters)
- Nitro Sandboxes for EKS Pods and Auto Mode Pod security groups were announced in November 2026. Both require Kubernetes 1.36 or later. [Nitro announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/) and [Auto Mode announcement](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-eks-auto-mode-security-groups-for-pods/)

> **Trap:** A node below the Cluster Autoscaler utilization threshold is only a scale-down candidate. The unneeded time and a Pod's safe-to-evict annotation can affect removal. Auto Mode and VPC CNI `SecurityGroupPolicy` specs are also incompatible.
