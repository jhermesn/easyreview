---
title: On-premises Kubernetes options
level: associate
order: 10
facts:
  - id: what
    text: Amazon EKS Anywhere automates infrastructure setup and Kubernetes cluster lifecycle operations in on-premises and edge environments.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#air-gapped-deployment-options
  - id: customer-managed
    text: Unlike Amazon EKS, EKS Anywhere is customer-managed; the control plane runs in your data center or edge site and you own cluster lifecycle and maintenance.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#air-gapped-deployment-options
  - id: platforms
    text: EKS Anywhere runs on VMware vSphere, bare metal, Nutanix, Apache CloudStack and AWS Snow, and can run air-gapped.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#air-gapped-deployment-options
  - id: outposts-hybrid
    text: For on-premises nodes with an AWS-managed control plane, Amazon EKS offers EKS on AWS Outposts or EKS Hybrid Nodes on your own physical or virtual machines.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#dc-or-edge-deployment-options
  - id: local-wavelength
    text: Amazon EKS can also run nodes in Local Zones and Wavelength Zones while AWS manages the control plane in the Region.
    source: https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html#eks-cloud-deployment-options
cards:
  - id: eks-anywhere-001
    q: A factory with no internet connection must run Kubernetes on its own VMware vSphere servers using EKS tooling. Which AWS option fits?
    a: "**Amazon EKS Anywhere**, which runs air-gapped on vSphere with a customer-managed control plane."
    facts: [what, platforms, customer-managed]
  - id: eks-anywhere-002
    q: A company wants Kubernetes nodes in its own data center but wants AWS to manage the control plane. Which Amazon EKS options fit?
    a: "Amazon EKS Hybrid Nodes (your machines) or Amazon EKS on AWS Outposts."
    trap: true
    facts: [outposts-hybrid, customer-managed]
  - id: eks-anywhere-003
    q: Who manages the Kubernetes control plane in Amazon EKS Anywhere?
    a: "The customer. It runs on your infrastructure and you handle lifecycle and maintenance."
    facts: [customer-managed]
  - id: eks-anywhere-004
    q: Which infrastructure can Amazon EKS Anywhere run on?
    a: "VMware vSphere, bare metal, Nutanix, Apache CloudStack and AWS Snow."
    facts: [platforms]
---
Amazon EKS offers several ways to run Kubernetes outside a Region. The deciding question is who runs the control plane: AWS (EKS, EKS on Outposts, EKS Hybrid Nodes) or you (EKS Anywhere).

### How it works

1. Install EKS Anywhere tooling and create a cluster on your platform (vSphere, bare metal, Nutanix, CloudStack, Snow).
2. The control plane and nodes run on your hardware, even with no connection to AWS.
3. You upgrade and maintain the clusters; optional integrations add AWS observability and identity.

| Option | Control plane | Nodes |
|---|---|---|
| Amazon EKS in a Region, Local Zone or Wavelength Zone | AWS, in the Region | AWS |
| EKS on AWS Outposts | AWS (Region or Outposts) | Outposts EC2 |
| EKS Hybrid Nodes | AWS, in the Region | Your machines |
| EKS Anywhere | You, on premises | Your machines |

### Exam cues

- If the question says air-gapped or disconnected Kubernetes on premises, think EKS Anywhere.
- If the question says on-premises nodes but AWS-managed control plane, think EKS Hybrid Nodes or EKS on Outposts.

### Remember

- EKS Anywhere is customer-managed; supports air-gapped sites.
- Platforms: vSphere, bare metal, Nutanix, CloudStack, Snow.

> **Trap:** EKS Anywhere is not "EKS managed by AWS in your data center". AWS manages nothing in the cluster; you run it.
