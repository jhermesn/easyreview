---
title: The 7 Rs of migration
level: foundational
order: 20
facts:
  - id: seven-rs
    text: The seven migration strategies, the 7 Rs, are retire, retain, rehost, relocate, repurchase, replatform, and refactor or re-architect.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#migration-strategies
  - id: retire
    text: Retire decommissions or archives an application that has no business value to keep or move, which removes its maintenance and hosting cost.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retire
  - id: retain
    text: Retain keeps an application in the source environment, for example for data residency, high risk, unresolved dependencies, recent upgrades or specialized hardware.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retain
  - id: rehost
    text: Rehost, also called lift and shift, moves an application to AWS without changing it.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#rehost
  - id: relocate
    text: Relocate moves many servers at once from an on-premises platform to a cloud version of that platform without new hardware, rewrites or operational changes, and can also move resources to another VPC, Region or account.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#relocate
  - id: repurchase
    text: Repurchase, also called drop and shop, replaces an application with a different version or product, such as moving from a traditional license to software as a service (SaaS).
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#repurchase
  - id: replatform
    text: Replatform, also called lift, tinker and shift, moves an application and adds some optimization, such as moving a SQL Server database to Amazon RDS for SQL Server.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#replatform
  - id: refactor
    text: Refactor or re-architect modifies the application's architecture to use cloud-native features for agility, performance and scalability.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor
  - id: refactor-cost
    text: Refactoring is the most complex and costly migration strategy; for large migrations AWS recommends rehosting, relocating or replatforming first and modernizing afterward.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor
cards:
  - id: cloud-adoption-010
    q: What are the 7 Rs of migration to AWS?
    a: Retire, retain, rehost, relocate, repurchase, replatform, and refactor (re-architect).
    facts: [seven-rs]
  - id: cloud-adoption-011
    q: A company moves its servers to Amazon EC2 exactly as they are, with no code changes. Which migration strategy is this?
    a: Rehost (lift and shift).
    facts: [rehost]
  - id: cloud-adoption-012
    q: A company moves its self-managed SQL Server database to Amazon RDS for SQL Server during migration. Which migration strategy is this?
    a: Replatform (lift, tinker and shift). It adds an optimization, a managed database, without rewriting the application.
    facts: [replatform]
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
  - id: cloud-adoption-018
    q: For a large migration, should a company refactor every application while moving it to AWS?
    a: No. Refactor is the most complex and costly strategy. AWS recommends rehost, relocate or replatform first, then modernize after the migration.
    trap: true
    facts: [refactor-cost]
---
A migration strategy is how one workload moves to AWS. AWS names seven, the 7 Rs, from not moving at all to rebuilding for the cloud. [Migration strategies](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#migration-strategies)

### How it works

1. Assess each application: its business value, dependencies, risk and target.
2. Pick one of the 7 Rs for it.
3. Move the simple ones first; modernize after the migration when the strategy allows.

| Strategy | Also called | What happens |
|---|---|---|
| Retire | | Turn off what has no value |
| Retain | | Keep in place for now |
| Rehost | Lift and shift | Move unchanged |
| Relocate | | Move to a cloud version of the same platform |
| Repurchase | Drop and shop | Replace with another product, often SaaS |
| Replatform | Lift, tinker and shift | Move with some optimization, such as a managed database |
| Refactor | Re-architect | Redesign with cloud-native features |

### Exam cues

- If the question says no changes, as fast as possible, think rehost.
- If the question says move to a managed service such as Amazon RDS without rewriting, think replatform.
- If the question says switch to a SaaS product, think repurchase.
- If the question says redesign as microservices or serverless, think refactor.
- If the question says decommission, think retire; keep on premises for now, think retain.

### Remember

- Seven strategies: retire, retain, rehost, relocate, repurchase, replatform, refactor.
- Refactor is the most complex and costly.
- Rehost is the quick first step; modernization can follow.

> **Trap:** Replatform is not refactor. Moving a database to Amazon RDS changes the platform, not the application's architecture.
