---
title: AWS Cloud Adoption Framework
level: foundational
order: 10
facts:
  - id: purpose
    text: The AWS Cloud Adoption Framework (AWS CAF) uses AWS experience and best practices to help organizations digitally transform and accelerate business outcomes through innovative use of AWS.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html#welcome
  - id: uses
    text: AWS CAF helps identify and prioritize transformation opportunities, evaluate and improve cloud readiness, and iteratively evolve a transformation roadmap.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html#welcome
  - id: outcomes
    text: Key business outcomes of cloud transformation in AWS CAF include reduced business risk, improved environmental, social and governance (ESG) performance, and increased revenue and operational efficiency.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/accelerating-business-outcomes.html#accelerating-business-outcomes
  - id: domains
    text: "AWS CAF describes four transformation domains in a value chain: technological transformation enables process transformation, which enables organizational transformation, which enables product transformation."
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/accelerating-business-outcomes.html#accelerating-business-outcomes
  - id: perspectives
    text: "AWS CAF groups its foundational capabilities in six perspectives: Business, People, Governance, Platform, Security and Operations."
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: business
    text: The Business perspective helps ensure cloud investments accelerate digital transformation and business outcomes; common stakeholders include the CEO, CFO, COO, CIO and CTO.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: people
    text: The People perspective bridges technology and business, focusing on culture, organizational structure, leadership and workforce.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: governance
    text: The Governance perspective helps orchestrate cloud initiatives while maximizing organizational benefits and minimizing transformation-related risks.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: platform
    text: The Platform perspective helps build an enterprise-grade, scalable hybrid cloud platform, modernize existing workloads and implement new cloud-native solutions.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: security
    text: The Security perspective helps achieve the confidentiality, integrity and availability of data and cloud workloads.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities
  - id: operations
    text: The Operations perspective focuses on delivering cloud services at a level agreed with business stakeholders.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/operations-perspective.html#operations-perspective
  - id: phases
    text: "AWS CAF recommends four iterative and incremental phases: Envision, Align, Launch and Scale."
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/your-cloud-transformation-journey.html#your-cloud-transformation-journey
  - id: phase-details
    text: Envision shows how cloud accelerates business outcomes; Align finds capability gaps across the six perspectives; Launch delivers pilots in production; Scale expands pilots to the desired scale.
    source: https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/your-cloud-transformation-journey.html#your-cloud-transformation-journey
cards:
  - id: cloud-adoption-001
    q: What are the six perspectives of the AWS Cloud Adoption Framework (AWS CAF)?
    a: Business, People, Governance, Platform, Security and Operations.
    facts: [perspectives]
  - id: cloud-adoption-002
    q: Which AWS Cloud Adoption Framework perspective focuses on culture, organizational structure, leadership and workforce?
    a: The People perspective.
    facts: [people]
  - id: cloud-adoption-003
    q: Which AWS Cloud Adoption Framework perspective focuses on minimizing transformation risks while maximizing organizational benefits?
    a: The Governance perspective.
    facts: [governance]
  - id: cloud-adoption-004
    q: Which AWS Cloud Adoption Framework perspective covers building a scalable hybrid cloud platform and modernizing workloads?
    a: The Platform perspective.
    facts: [platform]
  - id: cloud-adoption-005
    q: Which business outcomes does the AWS Cloud Adoption Framework name for cloud transformation?
    a: Reduced business risk, improved ESG performance, and increased revenue and operational efficiency.
    facts: [outcomes]
  - id: cloud-adoption-006
    q: What are the four phases of the AWS Cloud Adoption Framework transformation journey, in order?
    a: Envision, Align, Launch, Scale.
    facts: [phases, phase-details]
  - id: cloud-adoption-007
    q: In the AWS Cloud Adoption Framework journey, in which phase does a company find capability gaps and stakeholder concerns?
    a: Align.
    facts: [phase-details]
  - id: cloud-adoption-008
    q: Which AWS Cloud Adoption Framework perspective has the CFO and CEO among its common stakeholders and makes sure cloud investments serve business outcomes?
    a: The Business perspective.
    facts: [business]
  - id: cloud-adoption-009
    q: Is the AWS Cloud Adoption Framework a migration tool that moves servers to AWS?
    a: No. It is guidance for planning and running the organizational change; migration services such as AWS Application Migration Service move the servers.
    trap: true
    facts: [purpose, uses]
---
The AWS Cloud Adoption Framework (AWS CAF) is AWS guidance for the organizational side of moving to the cloud. It helps find and prioritize opportunities, check how ready the organization is, and plan the transformation in steps. [AWS CAF overview](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html#welcome)

### How it works

1. AWS CAF ties cloud adoption to business outcomes: less business risk, better ESG performance, more revenue and more operational efficiency. [Business outcomes](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/accelerating-business-outcomes.html#accelerating-business-outcomes)
2. Its capabilities sit in six perspectives, each owned by a group of stakeholders. [Foundational capabilities](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html#foundational-capabilities)
3. The journey repeats four phases: Envision, Align, Launch and Scale. [Transformation journey](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/your-cloud-transformation-journey.html#your-cloud-transformation-journey)

| Perspective | Focus |
|---|---|
| Business | Cloud investments that serve business outcomes |
| People | Culture, structure, leadership, workforce |
| Governance | Orchestrating initiatives, managing risk |
| Platform | Scalable hybrid platform, modernization, cloud-native builds |
| Security | Confidentiality, integrity and availability of data and workloads |
| Operations | Services delivered at the level the business agreed |

Business, People and Governance are the business side; Platform, Security and Operations are the technical side.

### Exam cues

- If the question says culture, training or organizational structure, think People perspective.
- If the question says risk and benefits of cloud initiatives, think Governance perspective.
- If the question says pilots in production, think Launch phase; finding gaps, think Align.

### Remember

- Six perspectives: Business, People, Governance, Platform, Security, Operations.
- Four phases: Envision, Align, Launch, Scale.
- Outcomes: reduced business risk; improved ESG performance; increased revenue; increased operational efficiency.

> **Trap:** AWS CAF has six perspectives and the Well-Architected Framework has six pillars. Security appears in both; questions about workforce or governance point to CAF, questions about workload design point to Well-Architected.
