---
title: The six pillars
level: foundational
order: 10
facts:
  - id: framework
    text: The AWS Well-Architected Framework provides a consistent set of best practices for evaluating architectures and a set of questions to check how well an architecture aligns with AWS best practices.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: six-pillars
    text: "The framework has six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: security
    text: The security pillar describes how to use cloud technologies to protect data, systems and assets in a way that improves security posture.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: reliability
    text: Reliability is the ability of a workload to perform its intended function correctly and consistently when expected, including operating and testing it through its total lifecycle.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: cost-optimization
    text: Cost optimization is the ability to run systems that deliver business value at the lowest price point.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: workload
    text: In the framework, a workload is a set of components that together deliver business value.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: general-principles
    text: The general design principles are to stop guessing capacity needs, test systems at production scale, automate with architectural experimentation in mind, consider evolutionary architectures, drive architectures using data, and improve through game days.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: game-days
    text: Game days simulate events in production on a regular schedule to find improvements and build experience in handling events.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: loose-coupling
    text: The reliability pillar recommends loosely coupled dependencies, such as queues, streams and workflows, ideally asynchronous; a monolithic workload is an anti-pattern.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel04-bp02.html#rel04-bp02
  - id: reliability-principles
    text: "Reliability pillar design principles: automatically recover from failure, test recovery procedures, scale horizontally to increase aggregate workload availability, stop guessing capacity, and manage change through automation."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-design-principles.html#rel-design-principles
  - id: framework-update-2026
    text: "On November 16, 2026, AWS consolidated the six pillar whitepapers into one Well-Architected Framework document, refreshed nearly all best practices, and split the guidance into Cloud Foundations and Cloud Workloads."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/release-notes.html#fw-11-16-2026-update
  - id: cloud-foundations
    text: "Well-Architected Cloud Foundations covers organization-wide capabilities to set up before production workloads, in seven areas: multi-account environment, identity and access management, central observability, resource and inventory management, security and compliance, cloud financial management, and networking and connectivity."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/cloud-foundations.html#capabilities
  - id: foundations-landing-zone
    text: "AWS describes Well-Architected Cloud Foundations as the blueprint for a sound landing zone, a well-architected multi-account AWS environment."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/cloud-foundations.html#cloud-foundations
  - id: cloud-workloads
    text: "Cloud Workloads holds the six pillars and their workload best practices, which can be evaluated and tracked continually."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/release-notes.html#release-notes-workloads
  - id: replace-failed-resource
    text: A stateless failed component can be replaced instead of repaired as part of Well-Architected reliability practices.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel11-bp03.html
cards:
  - id: well-architected-001
    q: What are the six pillars of the AWS Well-Architected Framework?
    a: Operational excellence, security, reliability, performance efficiency, cost optimization and sustainability.
    facts: [six-pillars]
  - id: well-architected-003
    q: A workload must perform its intended function correctly and consistently, and recover from failures. Which AWS Well-Architected pillar covers this?
    a: Reliability.
    facts: [reliability]
  - id: well-architected-007
    q: A company wants to protect data, systems and assets using cloud technologies. Which AWS Well-Architected pillar covers this?
    a: Security.
    facts: [security]
  - id: well-architected-008
    q: Which AWS Well-Architected general design principle says to simulate production events regularly to find weaknesses?
    a: Improve through game days.
    facts: [game-days, general-principles]
  - id: well-architected-009
    q: Is cost optimization in the AWS Well-Architected Framework about spending as little as possible?
    a: No. It means delivering business value at the lowest price point; the cheapest option can fail other pillars such as reliability.
    trap: true
    facts: [cost-optimization]
  - id: well-architected-017
    q: A monolithic application fails completely when one component fails. Which Well-Architected recommendation addresses this?
    a: Loosely coupled dependencies (reliability pillar), for example with Amazon SQS queues between components.
    facts: [loose-coupling]
  - id: well-architected-019
    q: A company runs its Amazon RDS database in multiple Availability Zones so it fails over automatically. Which Well-Architected pillar does this serve?
    a: "Reliability: automatically recover from failure and remove single points of failure."
    facts: [reliability-principles, reliability]
  - id: well-architected-020
    q: "What is the AWS Well-Architected Framework used for?"
    a: "It provides best practices and questions for evaluating how well an architecture aligns with AWS guidance."
    facts: [framework]
  - id: well-architected-021
    q: "Which AWS Well-Architected pillar focuses on a workload performing its intended function consistently?"
    a: "The reliability pillar focuses on a workload performing its intended function correctly and consistently when expected."
    facts: [reliability]
  - id: well-architected-025
    q: "Which AWS Well-Architected pillar recommends scaling horizontally to improve workload availability?"
    a: "The reliability pillar recommends horizontal scaling to increase availability."
    facts: [reliability-principles]
  - id: well-architected-029
    q: How can an AWS Well-Architected workload recover a failed stateless component?
    a: Replace the component instead of repairing it in place.
    facts: [replace-failed-resource]
---
The AWS Well-Architected Framework is AWS's set of best practices for cloud architectures. It is organized in six pillars and comes with questions that show how well a workload follows them.

### How it works

1. Pick a workload: a set of components that together deliver business value.
2. Review it against each pillar's questions and best practices.
3. Fix the risks the review finds, starting with the highest.
4. Repeat as the workload changes; the framework treats architecture as something that evolves.

| Pillar | Focus |
|---|---|
| Security | Protect data, systems and assets |
| Reliability | Perform the intended function correctly and consistently |
| Cost optimization | Deliver business value at the lowest price point |

The other pillars are operational excellence, performance efficiency and sustainability.

Since November 16, 2026, the framework is one document in two parts. Cloud Foundations covers what an organization sets up once for all workloads (accounts, identity, observability, inventory, security, cost, networking), and Cloud Workloads holds the six pillars.

The general design principles apply across pillars: stop guessing capacity, test at production scale, automate to experiment, evolve the architecture, decide with data, and improve through game days.

### Exam cues

- If the question says a stateless component has failed, think replacement, because a new component can restore it without repairing the failed one in place.
- If the question says recover from failure or work consistently, think reliability.
- If the question says lowest price point for the value delivered, think cost optimization.
- If the question says protect data, systems and assets, think security.
- If the question says simulate production events to find improvements, think game days.
- If the question says reduce dependencies between components, think loosely coupled dependencies under reliability.
- If the question says organization-wide setup before the first workload, such as a landing zone, think Well-Architected Cloud Foundations.

### Remember

- Six pillars; sustainability is the sixth.
- November 16, 2026: one framework document, split into Cloud Foundations (seven capabilities) and Cloud Workloads (the pillars).
- A workload is a set of components that deliver business value.
- Game days simulate production events to practice handling them.

> **Trap:** Reliability includes both performing the intended function consistently and testing recovery procedures.
