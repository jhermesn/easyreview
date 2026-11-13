---
title: Cluster compute options
level: associate
order: 10
facts:
  - id: control-plane
    text: Standard EKS manages the Kubernetes control plane, which schedules workloads and maintains
      cluster state.
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
  - id: node
    text: A node is a machine that runs containerized applications; its kubelet keeps containers running
      in their Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html
  - id: compute-mix
    text: An EKS cluster can combine Auto Mode nodes, managed node groups, self-managed nodes, Fargate,
      and Hybrid Nodes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html
  - id: managed-group
    text: Managed node groups provision and manage EC2 nodes in EKS-managed Auto Scaling groups in your
      account.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html#managed-node-group-concepts
  - id: managed-patches
    text: For an EKS optimized AMI, AWS builds patched images and the customer deploys those images to
      managed node groups.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html#managed-node-group-concepts
  - id: auto-mode
    text: EKS Auto Mode handles node provisioning, scaling, operating system patching, load balancing,
      and block storage integration.
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
  - id: self-managed
    text: Self-managed nodes require the customer to maintain the nodes; Hybrid Nodes run on
      customer-managed machines outside AWS.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html#_compare_compute_options
  - id: fargate-selector
    text: Fargate profile selectors require a namespace and can include labels; a Pod matching a
      selector can run on Fargate.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  - id: fargate-subnets
    text: EKS Fargate Pods use private subnets without a direct route to an internet gateway.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html#fargate-profile-components
  - id: fargate-limits
    text: EKS Fargate does not support DaemonSets, privileged containers, GPUs, HostPort, or HostNetwork.
    source: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#fargate-considerations
  - id: public-default
    text: New EKS clusters default to public API endpoint access enabled and private endpoint access
      disabled.
    source: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html#modify-endpoint-access
  - id: public-private
    text: With public and private API access enabled, API requests from the cluster VPC use the private
      endpoint; public access CIDRs restrict only the public endpoint.
    source: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html#modify-endpoint-access
  - id: private-only
    text: With public API access disabled and private access enabled, kubectl must run within the VPC or
      a connected network; the cluster security group controls private endpoint access.
    source: https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html#modify-endpoint-access
  - id: csi-ebs
    text: The EBS Container Storage Interface driver manages EBS volumes for Kubernetes persistent
      volumes, storage that persists independently of a Pod.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
  - id: driver-permissions
    text: The EBS CSI driver needs IAM permissions to call AWS APIs; missing permissions can cause
      UnauthorizedOperation during volume provisioning.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-prereqs
  - id: driver-role
    text: Associate the EBS CSI driver IAM role through Pod Identity or IAM roles for service accounts
      when configuring the add-on or controller service account.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role
  - id: auto-storage-class
    text: A StorageClass selects how storage is provisioned; Auto Mode uses ebs.csi.eks.amazonaws.com,
      while the standard EBS CSI driver uses ebs.csi.aws.com and manages separate volumes.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: fargate-ebs
    text: EBS volumes cannot be mounted by Fargate Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: fargate-efs
    text: Fargate Pods can mount statically provisioned EFS persistent volumes without manual EFS driver
      installation; dynamic provisioning is not supported on Fargate.
    source: https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html#efs-csi-considerations
  - id: update-strategies
    text: Managed node group default updates create new nodes before terminating old nodes; minimal
      updates terminate old nodes first to avoid increasing total capacity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade
  - id: update-max-unavailable
    text: Managed node group updates default to one unavailable node and allow a maximum of 100 nodes
      unavailable in parallel.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-set-up
  - id: update-eviction
    text: If Pods do not leave a node within 15 minutes, a managed node update fails with
      PodEvictionFailure unless forced; force deletes the Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#managed-node-update-upgrade
  - id: update-pdb
    text: Restrictive or overlapping Pod disruption budgets can cause PodEvictionFailure during a
      managed node group update.
    source: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-update-behavior.html#_podevictionfailure_errors_during_the_upgrade_phase
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
cards:
  - id: eks-004
    q: Does Amazon EKS always manage only the control plane?
    a: No. Standard EKS manages the control plane; Auto Mode also manages compute and infrastructure
      integration. Managed node groups still require you to deploy patched node images.
    facts:
      - control-plane
      - auto-mode
      - managed-patches
    trap: true
  - id: eks-007
    q: An EKS team needs GPU workloads and a privileged node agent. Should it choose Fargate?
    a: Use suitable EC2 nodes. Fargate supports neither GPUs nor privileged containers nor DaemonSets.
    facts:
      - fargate-limits
  - id: eks-008
    q: EKS Fargate Pods remain Pending after a profile is created. What selection settings should the
      team check?
    a: Check that the Pods match a profile selector namespace and any required labels, and that the
      profile uses private subnets.
    facts:
      - fargate-selector
      - fargate-subnets
  - id: eks-009
    q: An EKS team disables public API access. Where must its kubectl client run?
    a: Inside the cluster VPC or a connected network, with access allowed by the cluster security group.
      Public access CIDRs do not grant private endpoint access.
    facts:
      - private-only
      - public-private
  - id: eks-010
    q: An EKS application on Fargate needs persistent file storage. Can it mount an EBS volume?
    a: Use a statically provisioned EFS persistent volume. Fargate cannot mount EBS volumes and does not
      support EFS dynamic provisioning.
    facts:
      - fargate-ebs
      - fargate-efs
    trap: true
  - id: eks-011
    q: An EKS EBS persistent volume claim fails with UnauthorizedOperation. What should the team
      configure?
    a: Give the EBS CSI driver an IAM role with EBS API permissions, associated through Pod Identity or
      IAM roles for service accounts. A storage request alone does not grant AWS permissions.
    facts:
      - driver-permissions
      - driver-role
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
---
Amazon EKS runs Kubernetes, a system that places and maintains container workloads. Its control plane stores cluster state and schedules work. A node is the machine running that work; its kubelet agent keeps containers running inside Pods, the units Kubernetes schedules.

### How it works

1. Choose compute for the workload. A cluster can mix the options below.

| Compute | Who manages it | Selection cue |
|---|---|---|
| Managed node group | EKS provisions an EC2 Auto Scaling group; you deploy patched node images | EC2 capacity with managed node lifecycle |
| Self-managed nodes | You maintain the nodes | Direct node maintenance |
| Fargate | AWS provides compute for matching Pods | Avoid managing virtual machines |
| Auto Mode | EKS provisions, scales, and patches nodes and integrates load balancing and block storage | Managed cluster infrastructure |
| Hybrid Nodes | You manage machines outside AWS | On-premises compute |

For managed node updates, the default strategy adds replacement nodes before terminating old nodes. The minimal strategy terminates old nodes first, which avoids temporarily increasing capacity but reduces available capacity during replacement. A Pod disruption budget limits voluntary Pod evictions. Restrictive or overlapping budgets can block an update; forcing it can delete Pods after the eviction timeout.

For hardware isolation on supported EC2 instances, opt into an isolated or confidential Pod using its `runtimeClassName`. Each Pod runs in a Nitro Sandbox, a hardware-isolated virtual machine.

In Auto Mode, a `SecurityGroupPolicy` selects Pods for dedicated security groups, including different groups on the same node. Unmatched Pods use node security groups. Auto Mode and VPC CNI policies use different API groups and incompatible specs.

2. For Fargate, create a profile. Its selectors match a namespace, a named grouping of Kubernetes resources, and optional labels, key-value tags on Pods. Use private subnets. A DaemonSet, which runs a copy of a Pod on nodes, cannot run on Fargate. Neither can privileged containers, GPUs, `HostPort`, or `HostNetwork`.
3. Choose how operators and nodes reach the Kubernetes API endpoint, the cluster management address.

| Public access | Private access | API path |
|---|---|---|
| Enabled | Disabled | Default for new clusters; public endpoint |
| Enabled | Enabled | Cluster VPC traffic uses the private endpoint; public access CIDRs restrict internet access |
| Disabled | Enabled | Clients must be in the VPC or a connected network; cluster security group controls access |

4. For persistent storage, choose a StorageClass, a configuration naming the storage provisioner. A persistent volume holds storage independently of a Pod. The Container Storage Interface (CSI) driver connects Kubernetes storage requests to AWS storage APIs. Give the EBS CSI driver IAM permissions through Pod Identity or IAM roles for service accounts.

| Storage choice | Provisioner or method | Fargate support |
|---|---|---|
| Standard EBS CSI | `ebs.csi.aws.com` | Cannot mount EBS |
| Auto Mode EBS | `ebs.csi.eks.amazonaws.com`; separate volume management | Cannot mount EBS |
| EFS persistent volume | Static provisioning on Fargate; no manual driver installation there | Supported; dynamic provisioning is unavailable |

### Exam cues

- If the question says an EKS workload needs a GPU or a privileged node agent, think EC2 nodes, because Fargate does not support those features.
- If the question says the Kubernetes API must have no public access, think private endpoint access with public access disabled, because management clients must then use the VPC or a connected network.
- If the question says a Fargate Pod needs persistent file storage, think statically provisioned EFS, because Fargate cannot mount EBS.
- If the question says EBS volume creation fails with `UnauthorizedOperation`, think CSI driver IAM permissions and role association, because the driver calls AWS APIs.
- If an EKS managed node update must avoid extra GPU capacity, think the minimal strategy, because it terminates old nodes before creating replacements.
- If a managed node update reports `PodEvictionFailure`, inspect Pod disruption budgets, because they can block eviction.

### Remember

- New clusters default to public API access enabled and private access disabled.
- Public access CIDRs, meaning allowed IP address ranges, do not control the private endpoint.
- Managed node groups still require deployment of patched node images.
- Auto Mode and the standard EBS driver use different provisioners and manage separate volumes.
- Managed node updates default to one unavailable node and allow at most 100. Pod eviction can fail after 15 minutes unless the update is forced.
- Nitro Sandboxes for EKS Pods and Auto Mode security groups for Pods launched in November 2026; both require Kubernetes 1.36 or later.

> **Trap:** Choosing managed node groups does not transfer deployment of patched AMIs to AWS. Auto Mode includes operating system patching.
