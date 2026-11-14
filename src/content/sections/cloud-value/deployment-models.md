---
title: Cloud deployment models
level: foundational
order: 20
facts:
  - id: cloud
    text: In a cloud deployment, all parts of the application run in the cloud, either built there or migrated from existing infrastructure.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#cloud
  - id: cloud-levels
    text: Cloud-based applications can be built on low-level infrastructure or on higher-level services that abstract away managing, architecting and scaling core infrastructure.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#cloud
  - id: on-premises
    text: Deploying resources on premises with virtualization and resource management tools is sometimes called private cloud; it provides dedicated resources but few of the benefits of cloud computing.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#on-premises
  - id: hybrid
    text: A hybrid deployment connects infrastructure and applications between cloud resources and existing resources outside the cloud, most commonly on-premises infrastructure.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#hybrid
  - id: control
    text: Each type of cloud computing gives a different level of control, flexibility and management.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#types-of-cloud-computing
cards:
  - id: cloud-value-010
    q: What are the three cloud deployment models AWS describes?
    a: "- Cloud: every part of the application runs in the cloud\n- Hybrid: cloud resources connected to resources outside the cloud\n- On-premises (private cloud): virtualized resources in your own data center"
    facts: [cloud, hybrid, on-premises]
  - id: cloud-value-011
    q: A company keeps its mainframe in its data center and connects it to new applications running on AWS. Which deployment model is this?
    a: Hybrid. It connects cloud resources to existing resources outside the cloud.
    facts: [hybrid]
  - id: cloud-value-012
    q: A company moves every component of an application to AWS and shuts down the old servers. Which deployment model is this?
    a: Cloud. All parts of the application run in the cloud.
    facts: [cloud]
  - id: cloud-value-013
    q: Does a private cloud built with virtualization in a company's own data center give the same benefits as the AWS Cloud?
    a: No. On-premises private cloud offers dedicated resources but few of the benefits of cloud computing, and it works much like legacy IT.
    trap: true
    facts: [on-premises]
---
A deployment model says where an application's parts run. AWS describes three: all in the cloud, hybrid, and on-premises. Each gives a different level of control, flexibility and management. [Types of cloud computing](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html#types-of-cloud-computing)

### How it works

1. **Cloud**: every part of the application runs in the cloud. It may use low-level infrastructure, such as virtual servers, or higher-level services that take over management and scaling.
2. **Hybrid**: cloud resources connect to resources that stay outside the cloud, usually an existing data center. Companies use it to grow into the cloud while keeping internal systems.
3. **On-premises (private cloud)**: virtualization and resource management tools run in your own data center. You get dedicated resources but keep most of the work of legacy IT.

| Model | Where it runs | Typical reason |
|---|---|---|
| Cloud | Entirely on AWS | New applications, or full migrations |
| Hybrid | AWS plus your data center | Systems that must stay put, gradual migration |
| On-premises | Your data center only | Dedicated resources; few cloud benefits |

### Exam cues

- If the question says some systems stay in the data center and connect to AWS, think hybrid.
- If the question says the whole application runs on AWS, think cloud.
- If the question says virtualization in the company's own data center, think on-premises (private cloud).

### Remember

- Three models: cloud, hybrid, on-premises.
- Hybrid most often means cloud plus an existing data center.
- On-premises private cloud gives dedicated resources, not the cloud's benefits.

> **Trap:** Hybrid does not mean using two cloud providers. AWS uses it for cloud resources connected to resources outside the cloud, most commonly on-premises.
