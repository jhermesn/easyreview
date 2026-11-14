---
title: Migration services
level: foundational
order: 30
facts:
  - id: mgn
    text: AWS Application Migration Service, now named AWS Transform MGN, automates migrating physical, virtual and cloud servers to AWS with minimal downtime, typically with cutover windows of minutes.
    source: https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html#what-is-mgn
  - id: mgn-replication
    text: AWS Transform MGN continuously replicates source servers at the block level and converts them to launch on AWS.
    source: https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html#what-is-mgn
  - id: mgn-rehost
    text: AWS Application Migration Service is the primary service AWS recommends for lift-and-shift migrations.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: ads
    text: AWS Application Discovery Service plans migrations by collecting usage and configuration data about on-premises servers and databases, including network connections between servers.
    source: https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html#what-is-appdiscovery
  - id: ads-closed
    text: AWS Application Discovery Service closed to new customers on November 7, 2025; AWS Transform provides similar capabilities.
    source: https://docs.aws.amazon.com/application-discovery/latest/userguide/application-discovery-service-availability-change.html#application-discovery-service-availability-change
  - id: hub
    text: AWS Migration Hub provides a single place to discover servers, plan migrations and track the status of each application migration, whichever migration tool is used.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: hub-closed
    text: AWS Migration Hub closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: evaluator
    text: Migration Evaluator builds a data-driven business case for AWS, discovers over-provisioned on-premises instances and compares BYOL with License Included options.
    source: https://aws.amazon.com/migration-evaluator/
  - id: dms-tracking
    text: AWS Migration Hub receives migration status updates from AWS Application Migration Service and AWS Database Migration Service.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
cards:
  - id: cloud-adoption-019
    q: Which AWS service rehosts physical, virtual and cloud servers on AWS with continuous block-level replication and short cutovers?
    a: AWS Application Migration Service, now named AWS Transform MGN.
    facts: [mgn, mgn-replication]
  - id: cloud-adoption-020
    q: Which AWS service collected configuration, usage and network connection data about on-premises servers to plan a migration?
    a: AWS Application Discovery Service. It closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    facts: [ads, ads-closed]
  - id: cloud-adoption-021
    q: Which AWS service gives one place to track the migration status of each application across migration tools?
    a: AWS Migration Hub. It closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    facts: [hub, hub-closed, dms-tracking]
  - id: cloud-adoption-022
    q: A company needs a business case comparing its current on-premises costs with AWS before deciding to migrate. Which AWS offering helps?
    a: Migration Evaluator. It finds over-provisioned servers and compares license options.
    facts: [evaluator]
  - id: cloud-adoption-023
    q: Which AWS service does AWS recommend first for a lift-and-shift migration of servers?
    a: AWS Application Migration Service (AWS Transform MGN).
    facts: [mgn-rehost]
  - id: cloud-adoption-024
    q: Does AWS Migration Hub itself copy servers to AWS?
    a: No. It discovers, plans and tracks migrations; tools such as AWS Application Migration Service and AWS DMS do the moving.
    trap: true
    facts: [hub, dms-tracking]
---
AWS migration services cover the three stages of a move: build the case, discover what you run, then move and track it. Several were renamed or closed to new customers in late 2025, so exam questions may use older names. [Migration Hub](https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub)

### How it works

1. **Business case:** Migration Evaluator compares on-premises costs with AWS and finds over-provisioned servers. [Migration Evaluator](https://aws.amazon.com/migration-evaluator/)
2. **Discovery:** AWS Application Discovery Service collects server configuration, usage and network connections, so servers can be grouped into applications. [Application Discovery Service](https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html#what-is-appdiscovery)
3. **Move servers:** AWS Application Migration Service replicates servers continuously and launches them on AWS with short cutovers. [AWS Transform MGN](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html#what-is-mgn)
4. **Move databases:** AWS Database Migration Service (AWS DMS) migrates data, and schema conversion handles engine changes.
5. **Track:** AWS Migration Hub shows each application's migration status across tools.

| Service | Stage | Status (November 2026) |
|---|---|---|
| Migration Evaluator | Business case | Available |
| AWS Application Discovery Service | Discover | Closed to new customers since November 7, 2025 |
| AWS Application Migration Service | Move servers (rehost) | Now named AWS Transform MGN |
| AWS DMS | Move databases | Available |
| AWS Migration Hub | Track | Closed to new customers since November 7, 2025 |

AWS Transform is the newer service AWS points to for discovery and migration capabilities.

### Exam cues

- If the question says lift and shift servers with minimal downtime, think AWS Application Migration Service.
- If the question says discover on-premises servers and their dependencies, think AWS Application Discovery Service.
- If the question says track migration progress in one place, think AWS Migration Hub.
- If the question says business case or TCO before migrating, think Migration Evaluator.

### Remember

- Application Migration Service cutovers typically take minutes.
- Application Discovery Service and Migration Hub stopped accepting new customers on November 7, 2025.

> **Trap:** AWS DMS moves databases, not servers. A question about migrating whole servers points to AWS Application Migration Service.
