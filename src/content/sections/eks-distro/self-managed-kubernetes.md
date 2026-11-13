---
title: Self-managed Kubernetes
level: associate
order: 10
facts:
  - { id: distro, text: "Amazon EKS Distro is the AWS distribution of Kubernetes components underlying Amazon EKS offerings.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#tooling-deployment-options" }
  - { id: open-source, text: "Amazon EKS Distro is an open-source distribution of Kubernetes.", source: "https://aws.amazon.com/eks/eks-distro/" }
  - { id: managed, text: "EKS Distro can be used to self-manage Kubernetes clusters with the tooling of your choice.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#tooling-deployment-options" }
  - { id: locations, text: "EKS Distro can run on self-provisioned infrastructure on AWS, on premises and on other clouds.", source: "https://aws.amazon.com/eks/eks-distro/" }
  - { id: components, text: "EKS Distro includes control plane and networking components, including etcd, kube-apiserver, CoreDNS and kube-proxy.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#tooling-deployment-options" }
  - { id: setup, text: "To create an EKS Distro cluster, set up servers, networking and an operating system on each server.", source: "https://aws.amazon.com/eks/eks-distro/faqs/" }
  - { id: patches, text: "EKS Distro provides security patches and extended support aligned with the EKS version lifecycle policy.", source: "https://aws.amazon.com/eks/eks-distro/" }
  - { id: reproducible, text: "EKS Distro provides source code and tools for reproducible builds.", source: "https://aws.amazon.com/eks/eks-distro/" }
  - { id: support, text: "AWS Support Plans do not cover EKS Distro deployments.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#tooling-deployment-options" }
  - { id: eks, text: "For EKS in AWS Regions, AWS manages the Kubernetes control plane.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#eks-cloud-deployment-options" }
  - { id: anywhere, text: "EKS Anywhere is customer-managed and automates infrastructure setup and cluster lifecycle operations for on-premises and edge environments.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#air-gapped-deployment-options" }
  - { id: anywhere-airgap, text: "EKS Anywhere can run in air-gapped environments.", source: "https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#air-gapped-deployment-options" }
cards:
  - id: eks-distro-001
    q: Which AWS offering provides a Kubernetes distribution for self-managed clusters outside Amazon EKS?
    a: Amazon EKS Distro. It provides the Kubernetes components used by EKS for self-managed clusters.
    trap: true
    facts: [distro, managed]
  - id: eks-distro-002
    q: A team wants the Kubernetes components used by Amazon EKS on its own servers in another cloud. What should it consider?
    a: Amazon EKS Distro. It runs on self-provisioned infrastructure, including other clouds.
    facts: [distro, locations]
  - id: eks-distro-003
    q: Does an AWS Support Plan cover an Amazon EKS Distro deployment?
    a: No. EKS Distro deployments are not covered by AWS Support Plans.
    trap: true
    facts: [support]
  - id: eks-distro-004
    q: A team needs an AWS-managed Kubernetes control plane in an AWS Region. Should it choose Amazon EKS or a self-managed EKS Distro cluster?
    a: Amazon EKS. AWS manages the control plane for EKS in AWS Regions.
    facts: [eks, managed]
  - id: eks-distro-005
    q: A team needs customer-managed Kubernetes with automated cluster lifecycle operations in an air-gapped data center. Which EKS option fits?
    a: EKS Anywhere. It automates cluster lifecycle operations and can run in air-gapped environments.
    facts: [anywhere, anywhere-airgap]
  - id: eks-distro-006
    q: What must a team prepare before creating an Amazon EKS Distro cluster?
    a: Servers, networking and a supported operating system on each server.
    facts: [setup]
---

Amazon EKS Distro is an open-source distribution of Kubernetes components used by Amazon EKS. It lets teams run Kubernetes clusters on infrastructure they manage.

### How it works

1. Prepare servers, networking and a supported operating system. Kubernetes coordinates container workloads across a cluster of machines.
2. Obtain EKS Distro builds and use your chosen tooling to create and manage the cluster.
3. The distribution includes control plane components, which manage the cluster, and networking components. The control plane includes the API server and etcd, the cluster configuration database.
4. Apply available security patches as you manage your cluster. Releases align with the EKS version lifecycle.

| Option | Management |
| --- | --- |
| EKS Distro | Choose your tooling and manage the cluster yourself. |
| EKS in an AWS Region | AWS manages the control plane. |
| EKS Anywhere | Customers manage the cluster; the product automates setup and lifecycle operations on premises or at the edge. |

### Exam cues

- If the question says EKS components on self-managed infrastructure in another cloud, think EKS Distro, because it can run there.
- If the question says AWS-managed control plane in an AWS Region, think Amazon EKS, because AWS manages that control plane.
- If the question says automated cluster lifecycle operations in an air-gapped data center, think EKS Anywhere, because it supports that environment.

### Remember

- EKS Distro provides source and tooling for reproducible builds.
- EKS Distro deployments are not covered by AWS Support Plans.
- EKS Anywhere is customer-managed, even though it automates lifecycle operations.

> **Trap:** EKS Distro is a distribution for self-managed clusters, not an AWS-managed EKS control plane.
