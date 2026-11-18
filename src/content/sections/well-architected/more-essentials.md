---
title: "PLACEHOLDER well-architected/more-essentials"
level: foundational
order: 30
facts:
  - id: operational-excellence
    text: Operational excellence is the ability to support development and run workloads effectively, gain insight into their operations, and continuously improve processes and procedures to deliver business value.
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
  - id: production-scale
    text: A production-scale test environment can be created on demand and decommissioned after testing, so you pay for it only while it runs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/design-principles.html#design-principles
  - id: safely-automate
    text: "An operational excellence design principle is safely automate where possible: define the whole workload and its operations as code and run procedures automatically."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-design-principles.html#ops-design-principles
  - id: security-principles
    text: "Security pillar design principles: implement a strong identity foundation, maintain traceability, apply security at all layers, automate security best practices, protect data in transit and at rest, keep people away from data, and prepare for security events."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design-principles.html#sec-design-principles
  - id: oe-principles
    text: "Operational excellence design principles: implement observability for actionable insights, safely automate where possible, make frequent small reversible changes, refine operations frequently, anticipate failure, learn from all operational events and metrics, and use managed services."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/ops-design-principles.html#ops-design-principles
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
  - id: well-architected-002
    q: A team wants to run its workload effectively, learn from operations and keep improving its procedures. Which AWS Well-Architected pillar covers this?
    a: Operational excellence.
    facts: [operational-excellence]
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
  - id: well-architected-018
    q: "\"Make frequent, small, reversible changes\" and \"anticipate failure\" are design principles of which Well-Architected pillar?"
    a: Operational excellence.
    facts: [oe-principles]
  - id: well-architected-022
    q: "\"Deploy workloads closer to your customers\" and \"consider mechanical sympathy\" are design principles of which Well-Architected pillar?"
    a: "Performance efficiency."
    facts: [performance-principles]
  - id: well-architected-023
    q: "\"Measure business outcomes relative to costs\" and \"implement granular cost allocation\" are design principles of which Well-Architected pillar?"
    a: "Cost optimization."
    facts: [cost-principles]
  - id: well-architected-024
    q: "\"Maximize utilization\" and \"minimize the footprint of data and its processing\" are design principles of which Well-Architected pillar?"
    a: "Sustainability."
    facts: [sustainability-principles]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
