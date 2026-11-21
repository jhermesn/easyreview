---
title: The 7 Rs of migration
level: foundational
order: 20
facts:
  - id: seven-rs
    text: The seven migration strategies, the 7 Rs, are retire, retain, rehost, relocate, repurchase, replatform, and refactor or re-architect.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#migration-strategies
  - id: rehost
    text: Rehost, also called lift and shift, moves an application to AWS without changing it.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#rehost
  - id: replatform
    text: Replatform, also called lift, tinker and shift, moves an application and adds some optimization, such as moving a SQL Server database to Amazon RDS for SQL Server.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#replatform
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
  - id: cloud-adoption-018
    q: For a large migration, should a company refactor every application while moving it to AWS?
    a: No. Refactor is the most complex and costly strategy. AWS recommends rehost, relocate or replatform first, then modernize after the migration.
    trap: true
    facts: [refactor-cost]
---
A migration strategy is how one workload moves to AWS. AWS names seven, the 7 Rs, for choosing how to move or handle a workload.

### How it works

1. Assess each application: its business value, dependencies, risk and target.
2. Pick one of the 7 Rs for it.
3. For a large migration, consider rehosting, relocating or replatforming first, then modernizing afterward.

| Strategy | Also called | What happens |
|---|---|---|
| Rehost | Lift and shift | Move unchanged |
| Replatform | Lift, tinker and shift | Move with some optimization, such as a managed database |

### Exam cues

- If the question says move an application without changes, think rehost.
- If the question says move a SQL Server database to Amazon RDS for SQL Server, think replatform, because the move adds an optimization.
- If the question says modernize during a large migration, consider rehost, relocate or replatform first, because refactoring is the most complex and costly strategy.

### Remember

- Seven strategies: retire, retain, rehost, relocate, repurchase, replatform, refactor.
- Refactor is the most complex and costly.
- For a large migration, rehost, relocate or replatform first; modernization can follow.

> **Trap:** Rehosting moves an application without changes. Replatforming adds some optimization during the move.
