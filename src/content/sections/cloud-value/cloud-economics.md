---
title: Cloud economics
level: foundational
order: 30
facts:
  - id: fixed-to-variable
    text: In the cloud, a fixed upfront investment in data centers and servers becomes a variable expense paid only for the resources consumed.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: no-upfront
    text: With cloud computing you don't make large upfront investments in hardware or spend time managing that hardware.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html#what-is-cloud-computing
  - id: scale-prices
    text: Aggregated usage from many customers gives AWS higher economies of scale, which translate into lower pay-as-you-go prices.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: consumption-model
    text: Adopting a consumption model means paying only for resources consumed; stopping development and test environments outside an 8-hour workday can save about 75% (40 hours instead of 168 per week).
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/design-principles.html#design-principles
  - id: heavy-lifting
    text: AWS does the heavy lifting of data center operations such as racking, stacking and powering servers, and managed services remove the burden of managing operating systems and applications.
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/design-principles.html#design-principles
  - id: attribution
    text: The cloud makes it easier to identify the cost and usage of workloads and attribute IT costs to revenue streams and workload owners.
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/design-principles.html#design-principles
  - id: rightsizing
    text: Right-sizing selects the resource type, size and number that meet technical requirements at the lowest cost, and can repeat as usage, prices or resource types change.
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-correct-resource-type-size-and-number.html#select-the-correct-resource-type-size-and-number
  - id: rightsizing-automatic
    text: Resource type, size and number can be selected automatically based on metrics, as well as from data and cost modeling.
    source: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-correct-resource-type-size-and-number.html#select-the-correct-resource-type-size-and-number
  - id: automation-recovery
    text: Automation can track failures and run recovery processes when a monitored threshold is breached, and more advanced automation can remediate failures before they occur.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html#design-principles
  - id: on-prem-saturation
    text: A common cause of failure in on-premises workloads is resource saturation, when demand exceeds the capacity that was bought.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html#design-principles
  - id: byol-li
    text: Amazon RDS for Oracle offers License Included, where AWS holds the Oracle license, and Bring Your Own License (BYOL), where you use existing Oracle Database licenses.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html#Oracle.Concepts.Licensing
  - id: li-no-purchase
    text: In the License Included model you don't buy database licenses separately; RDS for Oracle supports it only for Standard Edition 2.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html#Oracle.Concepts.Licensing.LicenseIncluded
  - id: dedicated-host-byol
    text: EC2 Dedicated Hosts support BYOL for licenses bound to VMs, sockets or physical cores, such as Windows Server and SQL Server, subject to the license terms.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html#dedicated-hosts-overview
  - id: migration-evaluator
    text: Migration Evaluator builds a data-driven business case for moving to AWS, finds over-provisioned on-premises instances and compares BYOL with License Included options.
    source: https://aws.amazon.com/migration-evaluator/
cards:
  - id: cloud-value-014
    q: How does moving to the AWS Cloud change the way a company pays for servers?
    a: A fixed upfront investment becomes a variable expense. It pays only for the resources it consumes.
    facts: [fixed-to-variable, no-upfront]
  - id: cloud-value-015
    q: A company stops its development and test environments outside an 8-hour workday, 5 days a week. About how much of their running cost does it save on AWS?
    a: About 75%. They run 40 hours instead of 168 hours a week, and AWS charges only for what runs.
    facts: [consumption-model]
  - id: cloud-value-016
    q: Which on-premises costs does a company stop paying when it moves servers to AWS?
    a: The data center work of racking, stacking and powering servers. With managed services, AWS also takes over operating system and application management.
    facts: [heavy-lifting]
  - id: cloud-value-017
    q: What does right-sizing mean in AWS cost optimization?
    a: Choosing the resource type, size and number that meet the requirements at the lowest cost, and repeating it as usage or prices change.
    facts: [rightsizing]
  - id: cloud-value-018
    q: A company owns Oracle Database Enterprise Edition licenses and wants to run the database on Amazon RDS. Which licensing model applies?
    a: Bring Your Own License (BYOL). RDS for Oracle offers License Included only for Standard Edition 2.
    facts: [byol-li, li-no-purchase]
  - id: cloud-value-019
    q: A company has Windows Server licenses bound to physical cores and wants to use them on Amazon EC2. Which EC2 option supports this?
    a: EC2 Dedicated Hosts. They support BYOL for per-socket, per-core and per-VM licenses.
    facts: [dedicated-host-byol]
  - id: cloud-value-020
    q: A company wants a data-driven business case comparing its on-premises costs with AWS, including license options. Which AWS offering helps?
    a: Migration Evaluator. It finds over-provisioned on-premises instances and compares BYOL with License Included costs.
    facts: [migration-evaluator]
  - id: cloud-value-021
    q: How does automation reduce costs and risk in the AWS Cloud?
    a: Automated actions replace manual work, for example recovering from failure when a monitored threshold is breached, or resizing resources based on metrics.
    facts: [automation-recovery, rightsizing-automatic]
  - id: cloud-value-022
    q: Does buying the largest servers on premises protect a workload from capacity problems better than the AWS Cloud?
    a: No. Resource saturation is a common on-premises failure, and oversized servers sit idle. On AWS capacity follows demand and is billed as used.
    trap: true
    facts: [on-prem-saturation, fixed-to-variable]
---
Cloud economics compares what a workload costs in a data center with what it costs on AWS. On premises you buy capacity up front and pay for it whether you use it or not; on AWS you pay for what runs. [Six advantages](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing)

### How it works

1. **Fixed vs variable costs.** A data center needs servers, space, power and staff before the first user arrives. On AWS those become variable costs that follow usage.
2. **On-premises costs.** Beyond hardware, a company pays to rack, stack and power servers and to manage operating systems. AWS takes on the data center work, and managed services take on more. [Cost optimization design principles](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/design-principles.html#design-principles)
3. **Economies of scale.** AWS spreads its costs over many customers, so its prices fall below what one company can reach alone.
4. **Right-sizing.** Pick the resource type, size and number that meet requirements at the lowest cost, and revisit it as usage changes. [Right-sizing](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-correct-resource-type-size-and-number.html#select-the-correct-resource-type-size-and-number)
5. **Automation.** Scripts and services start, stop, resize and recover resources without people, which cuts labor and idle time.
6. **Licensing.** Some software comes license included in the price; with Bring Your Own License (BYOL) you reuse licenses you already own. [RDS for Oracle licensing](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html#Oracle.Concepts.Licensing)

| Licensing model | Who holds the license | Example |
|---|---|---|
| License Included | AWS, built into the price | RDS for Oracle Standard Edition 2 |
| Bring Your Own License (BYOL) | You, from licenses you already own | RDS for Oracle Enterprise Edition; Windows Server on EC2 Dedicated Hosts |

Migration Evaluator builds a business case for a move, finds over-provisioned on-premises servers and compares BYOL with License Included. [Migration Evaluator](https://aws.amazon.com/migration-evaluator/)

### Exam cues

- If the question says no large upfront investment, think variable expense.
- If the question says servers are bigger than the workload needs, think right-sizing.
- If the question says reuse existing licenses, think BYOL; on EC2 for per-core or per-socket licenses, think Dedicated Hosts.
- If the question says build a business case for migration from on-premises data, think Migration Evaluator.

### Remember

- Stopping dev and test outside an 8-hour workday saves about 75% (40 of 168 hours).
- Right-sizing repeats as usage, prices and resource types change.
- RDS for Oracle License Included: Standard Edition 2 only. BYOL: Enterprise Edition and Standard Edition 2.

> **Trap:** Moving to AWS does not remove every cost of running servers. AWS takes on the data center, but you still choose sizes, stop idle resources and manage what you run on unmanaged services.
