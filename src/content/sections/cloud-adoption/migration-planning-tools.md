---
title: Migration planning and tracking
level: foundational
order: 50
facts:
  - id: hub
    text: AWS Migration Hub provides a single place to discover servers, plan migrations and track the status of each application migration, whichever migration tool is used.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: hub-closed
    text: AWS Migration Hub closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: dms-tracking
    text: AWS Migration Hub receives migration status updates from AWS Application Migration Service and AWS Database Migration Service.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: evaluator
    text: Migration Evaluator builds a data-driven business case for AWS, discovers over-provisioned on-premises instances and compares BYOL with License Included options.
    source: https://aws.amazon.com/migration-evaluator/
cards:
  - id: cloud-adoption-021
    q: Which AWS service gives one place to track the migration status of each application across migration tools?
    a: AWS Migration Hub. It closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    facts: [hub, hub-closed, dms-tracking]
  - id: cloud-adoption-022
    q: A company needs a business case comparing its current on-premises costs with AWS before deciding to migrate. Which AWS offering helps?
    a: Migration Evaluator. It finds over-provisioned servers and compares license options.
    facts: [evaluator]
  - id: cloud-adoption-031
    q: "Which licensing options can Migration Evaluator compare in an AWS business case?"
    a: "Bring Your Own License and License Included options."
    facts: [evaluator]
revised:
  - date: 2026-11-23
    note: The Migration Evaluator card now tests the licensing options it compares.
    cards: [cloud-adoption-031]
---
Migration planning tools help a company build a business case for AWS and follow application migrations. Migration Evaluator supports the business case, while AWS Migration Hub provides one place to plan and track migrations.

### How it works

1. **Build the case:** Migration Evaluator finds over-provisioned on-premises instances and compares bring your own license (BYOL) with License Included options.
2. **Plan and track:** Migration Hub discovers servers, helps plan migrations and shows each application's migration status across tools. It receives updates from AWS Application Migration Service and AWS Database Migration Service.

### Exam cues

- If the question asks for a data-driven business case for AWS, think Migration Evaluator, because it identifies over-provisioned instances and compares licensing options.
- If the question asks for one place to track application migrations across tools, think AWS Migration Hub, because it receives migration status updates from other services.

### Remember

- Migration Hub closed to new customers on November 7, 2025. AWS Transform offers similar capabilities.

> **Trap:** Migration Hub tracks migration status across tools; Migration Evaluator builds the business case. Choose the tool that fits the question.
