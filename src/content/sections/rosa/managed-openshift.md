---
title: Managed OpenShift
level: associate
order: 10
facts:
  - id: rosa-purpose
    text: ROSA is a managed service for building, scaling and deploying containerized applications on the Red Hat OpenShift Kubernetes platform on AWS.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#what-is-rosa
  - id: container-definition
    text: Containerization packages an application with the files and libraries it needs to run.
    source: https://aws.amazon.com/what-is/containerization/#amsc1--1u81ae8
  - id: control-plane-definition
    text: Kubernetes control plane components manage nodes and schedule workloads.
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html#_amazon_eks_simplified_kubernetes_management
  - id: zone-definition
    text: Availability Zones are isolated locations within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
  - id: rosa-operations
    text: AWS and Red Hat jointly operate and support ROSA, with Red Hat support for cluster installation, maintenance and upgrades.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#features
  - id: rosa-availability
    text: ROSA can run and scale its Kubernetes control plane across multiple Availability Zones.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#features
  - id: rosa-creation
    text: After enabling ROSA and configuring permissions, create clusters using the Red Hat Hybrid Cloud Console or ROSA CLI.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#get-started-with-rosa
  - id: rosa-identity
    text: Configure an identity provider for cluster user access when the cluster is ready.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#get-started-with-rosa
  - id: distro-self-managed
    text: Amazon EKS Distro provides Kubernetes components for self-managed infrastructure on AWS, on premises and on other clouds.
    source: https://aws.amazon.com/eks/eks-distro/
  - id: rosa-price
    text: ROSA costs consist of service fees and AWS infrastructure fees.
    source: https://docs.aws.amazon.com/rosa/latest/userguide/what-is-rosa.html#pricing
cards:
  - id: rosa-001
    q: A team requires managed Red Hat OpenShift clusters on AWS. Which service fits?
    a: Red Hat OpenShift Service on AWS (ROSA), which runs the OpenShift platform as a managed service.
    facts: [rosa-purpose]
  - id: rosa-002
    q: Who operates and supports ROSA clusters?
    a: AWS and Red Hat jointly operate and support ROSA; Red Hat supports installation, maintenance and upgrades.
    facts: [rosa-operations]
  - id: rosa-003
    q: A team wants Kubernetes components on its own infrastructure rather than managed OpenShift. Should it choose ROSA or Amazon EKS Distro?
    a: Amazon EKS Distro provides Kubernetes components for self-managed infrastructure.
    facts: [distro-self-managed, rosa-purpose]
    trap: true
  - id: rosa-004
    q: How can a ROSA cluster's Kubernetes control plane achieve high availability?
    a: Run and scale it across multiple Availability Zones.
    facts: [rosa-availability]
  - id: rosa-005
    q: A ROSA cluster is ready and its users need access. What should the administrator configure?
    a: Configure an identity provider for cluster users.
    facts: [rosa-identity]
---
Red Hat OpenShift Service on AWS (ROSA) runs the Red Hat OpenShift Kubernetes platform as a managed service on AWS. Kubernetes manages containerized applications, whose software and dependencies are packaged as containers.

### How it works

1. Configure the required AWS permissions and enable ROSA.
2. Create a cluster to run the platform with the Red Hat Hybrid Cloud Console or ROSA CLI.
3. Configure an identity provider, which authenticates users, for cluster access.
4. Deploy workloads. AWS and Red Hat jointly operate and support ROSA; Red Hat supports installation, maintenance and upgrades.

### Exam cues

- If the question says managed OpenShift on AWS, think ROSA, because it provides the OpenShift platform as a managed service.
- If the question says Kubernetes components on self-managed infrastructure, think Amazon EKS Distro, because it supports infrastructure on AWS, on premises and on other clouds.
- If the question says a highly available ROSA control plane, the components that manage nodes and schedule workloads, think multiple Availability Zones, isolated locations in an AWS Region, because ROSA can run and scale it across them.

### Remember

- ROSA charges include service fees and AWS infrastructure fees.
- An identity provider grants users access after a cluster is ready.

> **Trap:** EKS Distro is for self-managed Kubernetes infrastructure; it is not the managed OpenShift platform provided by ROSA.
