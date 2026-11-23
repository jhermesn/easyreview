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
    text: Managed node groups provision EC2 nodes and manage them using Auto Scaling groups that EKS manages in your account.
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
  - id: fargate-ebs
    text: EBS volumes cannot be mounted by Fargate Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: fargate-efs
    text: Fargate Pods can mount statically provisioned EFS persistent volumes without manual EFS driver
      installation; dynamic provisioning is not supported on Fargate.
    source: https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html#efs-csi-considerations
  - id: envelope-encryption
    text: "EKS clusters on Kubernetes 1.28 or later envelope-encrypt all Kubernetes API data, including Secrets, before it reaches etcd, using KMS with an AWS owned key by default or a customer managed KMS key you choose."
    source: https://docs.aws.amazon.com/eks/latest/userguide/envelope-encryption.html#envelope-encryption
  - id: eks-connector
    text: "Amazon EKS Connector registers any conformant Kubernetes cluster, such as one on premises or in another cloud, so its status, configuration and workloads show in the EKS console."
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-connector.html#eks-connector
  - id: association
    text: Pod Identity associates an IAM role with a service account in a namespace of an EKS cluster;
      Pods use that service account to obtain workload permissions.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html
  - id: trust
    text: Pod Identity roles trust the pods.eks.amazonaws.com service principal, and the same role trust
      can serve associations in multiple clusters without an OIDC provider.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-benefits
  - id: agent
    text: Pod Identity needs the Pod Identity Agent on nodes; Auto Mode includes it without a separate
      installation.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-setup-overview
  - id: irsa
    text: IAM roles for service accounts use a cluster IAM OIDC provider and a service account token
      exchanged with STS using AssumeRoleWithWebIdentity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html#pod-id-credentials
  - id: linux-ec2
    text: Pod Identity is supported for Pods on Linux EC2 workers, not Fargate or Windows EC2 workers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html#pod-id-restrictions
  - id: access-entry
    text: "An EKS access entry associates an IAM principal with cluster access and can grant Kubernetes permissions through EKS access policies or Kubernetes groups and RBAC."
    source: https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html
  - id: kubernetes-conformance
    text: "Amazon EKS is Kubernetes-conformant, so Kubernetes-compatible applications and community tools can be used with it."
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
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
  - id: eks-060
    q: "Kubernetes Secrets on an EKS cluster must be encrypted with a key the company controls and audits in CloudTrail. What should they configure?"
    a: "EKS envelope encryption with their own customer managed KMS key. EKS already envelope-encrypts API data with an AWS owned key by default."
    facts: [envelope-encryption]
  - id: eks-061
    q: "A company wants to see its on-premises Kubernetes clusters next to its EKS clusters in the EKS console. What feature does that?"
    a: "Amazon EKS Connector, which registers the external clusters for viewing in the console."
    facts: [eks-connector]
  - id: eks-001
    q: How do EKS Pod Identity and IAM roles for service accounts differ for workload permissions?
    a: Both associate a workload role with a service account. Pod Identity uses the node agent and
      trusts `pods.eks.amazonaws.com` without a cluster OIDC provider. IRSA uses OIDC and STS web
      identity. Pod Identity supports Linux EC2 Pods, not Fargate.
    facts:
      - association
      - trust
      - agent
      - irsa
      - linux-ec2
  - id: eks-063
    q: "How can an Amazon EKS access entry grant an IAM role Kubernetes permissions?"
    a: "Associate an EKS access policy or map the principal to Kubernetes groups with RBAC permissions."
    facts: [access-entry]
  - id: eks-066
    q: "Can Kubernetes-compatible applications and tools run on Amazon EKS?"
    a: "Yes. EKS is Kubernetes-conformant."
    facts: [kubernetes-conformance]
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

2. A DaemonSet, which runs a copy of a Pod on nodes, cannot run on Fargate. Neither can privileged containers, GPUs, `HostPort`, or `HostNetwork`.
3. Choose how operators and nodes reach the Kubernetes API endpoint, the cluster management address.

| Public access | Private access | API path |
|---|---|---|
| Enabled | Disabled | Default for new clusters; public endpoint |
| Enabled | Enabled | Cluster VPC traffic uses the private endpoint; public access CIDRs restrict internet access |
| Disabled | Enabled | Clients must be in the VPC or a connected network; cluster security group controls access |

4. For persistent storage, use a persistent volume, which holds storage independently of a Pod. The Container Storage Interface (CSI) driver connects Kubernetes storage requests to AWS storage APIs. Give the EBS CSI driver IAM permissions through Pod Identity or IAM roles for service accounts.

| Storage choice | Fargate support |
|---|---|
| EBS | Cannot mount EBS |
| EFS persistent volume | Static provisioning; no manual driver installation required |

### Exam cues

- If the question says use Kubernetes tools and applications on AWS, think Amazon EKS, because it is Kubernetes-conformant.
- If the question says grant an IAM principal Kubernetes permissions, think EKS access entry with an access policy or Kubernetes group and RBAC, because the entry connects the principal to cluster access.
- If the question says an EKS workload needs a GPU or a privileged node agent, think EC2 nodes, because Fargate does not support those features.
- If the question says the Kubernetes API must have no public access, think private endpoint access with public access disabled, because management clients must then use the VPC or a connected network.
- If the question says a Fargate Pod needs persistent file storage, think statically provisioned EFS, because Fargate cannot mount EBS.
- If the question says EBS volume creation fails with `UnauthorizedOperation`, think CSI driver IAM permissions and role association, because the driver calls AWS APIs.

### Remember

- New clusters default to public API access enabled and private access disabled.
- Public access CIDRs, meaning allowed IP address ranges, do not control the private endpoint.
- Managed node groups still require deployment of patched node images.

> **Trap:** Choosing managed node groups does not transfer deployment of patched AMIs to AWS. Auto Mode includes operating system patching.
