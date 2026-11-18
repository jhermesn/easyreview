---
title: "PLACEHOLDER cloud-adoption/more-essentials"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
