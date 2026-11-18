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
  - id: operational-excellence
    text: Operational excellence is the ability to support development and run workloads effectively, gain insight into their operations, and continuously improve processes and procedures to deliver business value.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: security
    text: The security pillar describes how to use cloud technologies to protect data, systems and assets in a way that improves security posture.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: reliability
    text: Reliability is the ability of a workload to perform its intended function correctly and consistently when expected, including operating and testing it through its total lifecycle.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: performance-efficiency
    text: Performance efficiency is the ability to use computing resources efficiently to meet system requirements and to keep that efficiency as demand changes and technologies evolve.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: cost-optimization
    text: Cost optimization is the ability to run systems that deliver business value at the lowest price point.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: sustainability
    text: Sustainability is the ability to continually improve sustainability impacts by reducing energy consumption and increasing efficiency, getting the most from provisioned resources and minimizing the total resources required.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: workload
    text: In the framework, a workload is a set of components that together deliver business value.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions
  - id: general-principles
    text: The general design principles are to stop guessing capacity needs, test systems at production scale, automate with architectural experimentation in mind, consider evolutionary architectures, drive architectures using data, and improve through game days.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: production-scale
    text: A production-scale test environment can be created on demand and decommissioned after testing, so you pay for it only while it runs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: game-days
    text: Game days simulate events in production on a regular schedule to find improvements and build experience in handling events.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: safely-automate
    text: "An operational excellence design principle is safely automate where possible: define the whole workload and its operations as code and run procedures automatically."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-design-principles.html#ops-design-principles
  - id: security-principles
    text: "Security pillar design principles: implement a strong identity foundation, maintain traceability, apply security at all layers, automate security best practices, protect data in transit and at rest, keep people away from data, and prepare for security events."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design-principles.html#sec-design-principles
  - id: loose-coupling
    text: The reliability pillar recommends loosely coupled dependencies, such as queues, streams and workflows, ideally asynchronous; a monolithic workload is an anti-pattern.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel04-bp02.html#rel04-bp02
  - id: oe-principles
    text: "Operational excellence design principles: implement observability for actionable insights, safely automate where possible, make frequent small reversible changes, refine operations frequently, anticipate failure, learn from all operational events and metrics, and use managed services."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-design-principles.html#ops-design-principles
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
  - id: performance-principles
    text: "Performance efficiency design principles: use managed services to reduce operational complexity, deploy workloads closer to your customers, build scalable architectures, experiment more often, consider mechanical sympathy, and design for change and variable demand."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-design-principles.html#perf-design-principles
  - id: cost-principles
    text: "Cost optimization design principles: implement Cloud Financial Management, adopt a consumption model, measure business outcomes relative to costs, use managed services and automation, and implement granular cost allocation."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-design-principles.html#cost-design-principles
  - id: sustainability-principles
    text: "Sustainability design principles: understand your impact, establish sustainability goals, maximize utilization, anticipate and adopt more efficient hardware and software, align the computational approach to problem complexity, and minimize the footprint of data and its processing."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-design-principles.html#sus-design-principles
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
    q: "What changed in the AWS Well-Architected Framework on November 16, 2026?"
    a: "The six pillar whitepapers became one framework document, nearly all best practices were refreshed, and the guidance was split into Cloud Foundations (organization-wide) and Cloud Workloads (the six pillars)."
    facts: [framework-update-2026, cloud-workloads]
  - id: well-architected-021
    q: "A platform team must set up multi-account structure, central identity, logging, tagging, security tooling, cost visibility and networking before any workload runs. Which part of the AWS Well-Architected Framework guides this?"
    a: "Well-Architected Cloud Foundations, the blueprint for a sound landing zone. Its seven capabilities cover exactly these areas."
    facts: [cloud-foundations, foundations-landing-zone]
  - id: well-architected-025
    q: "Is the six-pillar list of the AWS Well-Architected Framework different after the November 16, 2026 update?"
    a: "No. The six pillars stay the same; they now sit under Cloud Workloads, next to the new Cloud Foundations guidance."
    trap: true
    facts: [framework-update-2026, six-pillars, cloud-workloads]
---
The AWS Well-Architected Framework is AWS's set of best practices for cloud architectures. It is organized in six pillars and comes with questions that show how well a workload follows them. [Definitions](https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html#definitions)

### How it works

1. Pick a workload: a set of components that together deliver business value.
2. Review it against each pillar's questions and best practices.
3. Fix the risks the review finds, starting with the highest.
4. Repeat as the workload changes; the framework treats architecture as something that evolves.

| Pillar | Focus |
|---|---|
| Operational excellence | Run workloads well, gain insight, keep improving processes |
| Security | Protect data, systems and assets |
| Reliability | Perform the intended function correctly and consistently |
| Performance efficiency | Use resources efficiently as demand and technology change |
| Cost optimization | Deliver business value at the lowest price point |
| Sustainability | Reduce energy use and total resources |

Since November 16, 2026, the framework is one document in two parts. Cloud Foundations covers what an organization sets up once for all workloads (accounts, identity, observability, inventory, security, cost, networking), and Cloud Workloads holds the six pillars. [Release notes](https://docs.aws.amazon.com/wellarchitected/latest/framework/release-notes.html#fw-11-16-2026-update)

The general design principles apply across pillars: stop guessing capacity, test at production scale, automate to experiment, evolve the architecture, decide with data, and improve through game days. [Framework design principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles)

### Exam cues

- If the question says recover from failure or work consistently, think reliability.
- If the question says choose the right resource types as demand changes, think performance efficiency.
- If the question says lowest price point for the value delivered, think cost optimization.
- If the question says reduce environmental impact or energy use, think sustainability.
- If the question says improve operations and procedures, think operational excellence.
- If the question says operations as code, think operational excellence, because defining operations as code is part of its safely automate principle.
- If the question says organization-wide setup before the first workload, such as a landing zone, think Well-Architected Cloud Foundations.

### Remember

- Six pillars; sustainability is the sixth.
- November 16, 2026: one framework document, split into Cloud Foundations (seven capabilities) and Cloud Workloads (the pillars).
- A workload is a set of components that deliver business value.
- Game days simulate production events to practice handling them.

> **Trap:** Performance efficiency is not the same as reliability. Using resources efficiently as demand changes is performance efficiency; working correctly and recovering from failure is reliability.
