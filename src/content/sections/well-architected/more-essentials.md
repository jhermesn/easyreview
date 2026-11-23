---
title: Pillar design principles
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
  - id: performance-right-sizing
    text: The Well-Architected performance efficiency pillar recommends choosing compute resources that match a workload's performance characteristics.
    source: https://docs.aws.amazon.com/wellarchitected/2023-04-10/framework/perf_select_compute_right_sizing.html
  - id: scalability
    text: Scalability measures a system's ability to grow as demand increases.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html
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
  - id: well-architected-027
    q: Which AWS Well-Architected pillar includes choosing compute resources to match workload performance requirements?
    a: Performance efficiency. Use workload characteristics to select suitable compute resources.
    facts: [performance-right-sizing]
  - id: well-architected-028
    q: What does scalability measure in the AWS Well-Architected Framework?
    a: A system's ability to grow to accommodate increased demand.
    facts: [scalability]
---
The AWS Well-Architected pillars address different aspects of a workload, from running it effectively to using resources efficiently and reducing its environmental impact. Their design principles help teams identify practices for each goal.

### How it works

1. For operational excellence, define the workload and its operations as code and automate procedures safely. Make small, reversible changes and anticipate failure.
2. For security, maintain traceability and keep people away from data. Other principles include a strong identity foundation and protection for data in transit and at rest.
3. For performance efficiency, deploy closer to customers and consider mechanical sympathy: choose technology that fits the workload's needs.
4. For cost optimization, measure business outcomes against costs and allocate costs at a granular level.
5. For sustainability, increase resource utilization and reduce the footprint of data and its processing.

### Exam cues

- If the question says a system must grow with demand, think scalability, because it measures the ability to accommodate increased demand.
- If the question says choose compute types and sizes for workload performance, think performance efficiency, because resources should match the workload profile.
- If the question says improve procedures and learn from operations, think operational excellence, because it focuses on running workloads effectively and improving operations.
- If the question says keep computing resources efficient as demand changes, think performance efficiency, because it addresses efficiency as requirements and technology change.
- If the question says deliver business value at the lowest price point, think cost optimization, because its goal includes both value and cost.
- If the question says reduce energy consumption and resources, think sustainability, because it focuses on reducing environmental impact.
- If the question says trace actions or keep people away from data, think security, because both are security design principles.
- If the question says test at production scale without keeping the environment running, think create it on demand and decommission it after testing. You pay while it runs.

### Remember

- Operations as code and frequent, small, reversible changes are operational excellence principles.
- Deploying closer to customers and mechanical sympathy are performance efficiency principles.
- Measuring business outcomes against costs and granular cost allocation are cost optimization principles.
- Maximizing utilization and minimizing the footprint of data processing are sustainability principles.

> **Trap:** Cost optimization focuses on the price of delivering business value. Sustainability focuses on reducing energy consumption and the resources needed.
