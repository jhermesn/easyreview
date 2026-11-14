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
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/general-design-principles.html#general-design-principles
  - id: production-scale
    text: A production-scale test environment can be created on demand and decommissioned after testing, so you pay for it only while it runs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/general-design-principles.html#general-design-principles
  - id: game-days
    text: Game days simulate events in production on a regular schedule to find improvements and build experience in handling events.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/general-design-principles.html#general-design-principles
  - id: safely-automate
    text: "An operational excellence design principle is safely automate where possible: define the whole workload and its operations as code and run procedures automatically."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html
  - id: security-principles
    text: "Security pillar design principles: implement a strong identity foundation, maintain traceability, apply security at all layers, automate security best practices, protect data in transit and at rest, keep people away from data, and prepare for security events."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design.html
  - id: loose-coupling
    text: The reliability pillar recommends loosely coupled dependencies, such as queues, streams and workflows, ideally asynchronous; a monolithic workload is an anti-pattern.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_prevent_interaction_failure_loosely_coupled_system.html
  - id: oe-principles
    text: "Operational excellence design principles: organize teams around business outcomes, implement observability, safely automate where possible, make frequent small reversible changes, refine operations procedures frequently, anticipate failure, learn from all operational events and metrics, and use managed services."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html
cards:
  - id: well-architected-001
    q: What are the six pillars of the AWS Well-Architected Framework?
    a: Operational excellence, security, reliability, performance efficiency, cost optimization and sustainability.
    facts: [six-pillars]
  - id: well-architected-002
    q: A team wants to run its workload effectively, learn from operations and keep improving its procedures. Which AWS Well-Architected pillar covers this?
    a: Operational excellence.
    facts: [operational-excellence]
  - id: well-architected-003
    q: A workload must perform its intended function correctly and consistently, and recover from failures. Which AWS Well-Architected pillar covers this?
    a: Reliability.
    facts: [reliability]
  - id: well-architected-004
    q: A company wants to keep using compute resources efficiently as demand changes and new instance types appear. Which AWS Well-Architected pillar covers this?
    a: Performance efficiency.
    facts: [performance-efficiency]
  - id: well-architected-005
    q: A company wants to deliver business value at the lowest price point. Which AWS Well-Architected pillar covers this?
    a: Cost optimization.
    facts: [cost-optimization]
  - id: well-architected-006
    q: A company wants to reduce the energy its workload consumes and the total resources it needs. Which AWS Well-Architected pillar covers this?
    a: Sustainability.
    facts: [sustainability]
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
  - id: well-architected-010
    q: How does the AWS Cloud make testing at production scale affordable, according to the Well-Architected Framework?
    a: Create the production-scale environment on demand, test, then decommission it. You pay only while it runs.
    facts: [production-scale]
  - id: well-architected-015
    q: Which Well-Architected pillar includes the design principle of defining the workload and its operations as code?
    a: Operational excellence (safely automate where possible).
    facts: [safely-automate]
  - id: well-architected-016
    q: Which Well-Architected pillar has the design principles "maintain traceability" and "keep people away from data"?
    a: Security.
    facts: [security-principles]
  - id: well-architected-017
    q: A monolithic application fails completely when one component fails. Which Well-Architected recommendation addresses this?
    a: Loosely coupled dependencies (reliability pillar), for example with Amazon SQS queues between components.
    facts: [loose-coupling]
  - id: well-architected-018
    q: "\"Make frequent, small, reversible changes\" and \"anticipate failure\" are design principles of which Well-Architected pillar?"
    a: Operational excellence.
    facts: [oe-principles]
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

The general design principles apply across pillars: stop guessing capacity, test at production scale, automate to experiment, evolve the architecture, decide with data, and improve through game days. [General design principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/general-design-principles.html#general-design-principles)

### Exam cues

- If the question says recover from failure or work consistently, think reliability.
- If the question says choose the right resource types as demand changes, think performance efficiency.
- If the question says lowest price point for the value delivered, think cost optimization.
- If the question says reduce environmental impact or energy use, think sustainability.
- If the question says improve operations and procedures, think operational excellence.
- If the question says operations as code, think operational excellence, because defining operations as code is part of its safely automate principle.

### Remember

- Six pillars; sustainability is the sixth.
- A workload is a set of components that deliver business value.
- Game days simulate production events to practice handling them.

> **Trap:** Performance efficiency is not the same as reliability. Using resources efficiently as demand changes is performance efficiency; working correctly and recovering from failure is reliability.
