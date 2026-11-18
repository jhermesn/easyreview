---
title: Migration strategy choices
level: foundational
order: 40
facts:
  - id: repurchase
    text: Repurchase, also called drop and shop, replaces an application with a different version or product, such as moving from a traditional license to software as a service (SaaS).
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#repurchase
  - id: refactor
    text: Refactor or re-architect modifies the application's architecture to use cloud-native features for agility, performance and scalability.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor
  - id: refactor-cost
    text: Refactoring is the most complex and costly migration strategy; for large migrations AWS recommends rehosting, relocating or replatforming first and modernizing afterward.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor
  - id: retire
    text: Retire decommissions or archives an application that has no business value to keep or move, which removes its maintenance and hosting cost.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retire
  - id: retain
    text: Retain keeps an application in the source environment, for example for data residency, high risk, unresolved dependencies, recent upgrades or specialized hardware.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retain
  - id: relocate
    text: Relocate moves many servers at once from an on-premises platform to a cloud version of that platform without new hardware, rewrites or operational changes, and can also move resources to another VPC, Region or account.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#relocate
cards:
  - id: cloud-adoption-013
    q: A company replaces its on-premises CRM with a SaaS CRM product. Which migration strategy is this?
    a: Repurchase (drop and shop).
    facts: [repurchase]
  - id: cloud-adoption-014
    q: A company rebuilds a monolith as microservices on AWS to scale and release features faster. Which migration strategy is this?
    a: Refactor (re-architect). It is the most complex and costly strategy.
    facts: [refactor, refactor-cost]
  - id: cloud-adoption-015
    q: During a migration assessment, a company finds an application nobody uses. Which migration strategy applies?
    a: Retire. Decommissioning it removes its maintenance and hosting costs.
    facts: [retire]
  - id: cloud-adoption-016
    q: An application depends on factory hardware that has no cloud equivalent. Which migration strategy fits for now?
    a: Retain. Keep it in the source environment until it can be migrated.
    facts: [retain]
  - id: cloud-adoption-017
    q: A company moves hundreds of VMware VMs to a cloud version of VMware without buying hardware or changing operations. Which migration strategy is this?
    a: Relocate. It moves servers to a cloud version of the same platform.
    facts: [relocate]
---
Migration strategies describe what to do with an application when moving to the cloud. The choice can be to replace it, redesign it, move it to a cloud version of its platform, keep it where it is, or retire it.

### How it works

1. Consider whether the application has business value. If it does not, retire it by decommissioning or archiving it. If it needs to stay in its source environment, retain it. [Retire](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retire), [retain](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retain)
2. To replace it with a different product or version, choose repurchase. For example, a traditionally licensed application can be replaced by software as a service (SaaS). [Repurchase](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#repurchase)
3. To move servers to a cloud version of the same platform without rewriting applications or changing operations, choose relocate. [Relocate](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#relocate)
4. To change the application's architecture to use cloud-native features, choose refactor. [Refactor](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor)

| Strategy | What happens |
|---|---|
| Retire | Decommission or archive an application with no business value |
| Retain | Keep an application in the source environment |
| Repurchase | Replace an application with another product or version |
| Relocate | Move servers to a cloud version of the same platform |
| Refactor | Change the architecture to use cloud-native features |

### Exam cues

- If the question says replace an on-premises application with SaaS, think repurchase, because a different product takes its place.
- If the question says redesign an application for scalability, think refactor, because its architecture changes to use cloud-native features.
- If the question says an application has no business value, think retire, because decommissioning or archiving it removes maintenance and hosting costs.
- If the question says an application depends on specialized hardware, think retain, because it can remain in the source environment.
- If the question says move servers to a cloud version of the same platform without changing operations, think relocate, because it preserves the existing operations.

### Remember

- Repurchase is also called drop and shop; refactor is also called re-architect.
- Refactor is the most complex and costly strategy. For large migrations, AWS recommends rehosting, relocating or replatforming first, then modernizing.

> **Trap:** Retire and retain are different choices. Retire decommissions or archives an application with no business value; retain keeps it in the source environment.
