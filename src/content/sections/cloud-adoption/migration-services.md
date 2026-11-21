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
  - id: dms-tracking
    text: AWS Migration Hub receives migration status updates from AWS Application Migration Service and AWS Database Migration Service.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: ads-collectors
    text: "Application Discovery Service Agentless Collector is an OVA appliance deployed in VMware vCenter that reports VM performance and utilization without per-VM agents, but cannot see processes or network connections; the Discovery Agent, installed on each server, collects those too."
    source: https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html#what-is-appdiscovery
  - id: vm-export
    text: "VM Import/Export can export most EC2 instances as VMs for Citrix Xen, Microsoft Hyper-V or VMware vSphere, storing the image in S3; instances with Windows, SQL Server or AWS Marketplace software cannot be exported."
    source: https://docs.aws.amazon.com/vm-import/latest/userguide/vmexport-limits.html#vmexport-limits
cards:
  - id: cloud-adoption-019
    q: Which AWS service rehosts physical, virtual and cloud servers on AWS with continuous block-level replication and short cutovers?
    a: AWS Application Migration Service, now named AWS Transform MGN.
    facts: [mgn, mgn-replication]
  - id: cloud-adoption-020
    q: Which AWS service collected configuration, usage and network connection data about on-premises servers to plan a migration?
    a: AWS Application Discovery Service. It closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    facts: [ads, ads-closed]
  - id: cloud-adoption-023
    q: Which AWS service does AWS recommend first for a lift-and-shift migration of servers?
    a: AWS Application Migration Service (AWS Transform MGN).
    facts: [mgn-rehost]
  - id: cloud-adoption-024
    q: Does AWS Migration Hub itself copy servers to AWS?
    a: No. It discovers, plans and tracks migrations; tools such as AWS Application Migration Service and AWS DMS do the moving.
    trap: true
    facts: [hub, dms-tracking]
  - id: cloud-adoption-030
    q: "A company moves its databases with AWS Database Migration Service and its servers with AWS Application Migration Service. Where can it follow the status of both?"
    a: "In AWS Migration Hub, which receives migration status updates from both services."
    facts: [dms-tracking]
---
AWS migration services help discover on-premises servers, move them to AWS and track migration progress. Some were renamed or closed to new customers, so exam questions may use older names.

### How it works

1. **Discovery:** AWS Application Discovery Service collects server configuration, usage and network connections, so servers can be grouped into applications.
2. **Move servers:** AWS Application Migration Service replicates servers continuously and launches them on AWS with short cutovers.
3. **Track:** AWS Migration Hub shows each application's migration status across tools, including AWS Application Migration Service and AWS Database Migration Service (AWS DMS).

| Service | Stage | Status (November 2026) |
|---|---|---|
| AWS Application Discovery Service | Discover | Closed to new customers since November 7, 2025 |
| AWS Application Migration Service | Move servers (rehost) | Now named AWS Transform MGN |
| AWS Migration Hub | Track | Tracks application migration across tools |

AWS Transform provides similar capabilities to Application Discovery Service.

### Exam cues

- If the question says lift and shift servers with minimal downtime, think AWS Application Migration Service.
- If the question says discover on-premises servers and their dependencies, think AWS Application Discovery Service.
- If the question says track migration progress in one place, think AWS Migration Hub.

### Remember

- Application Migration Service cutovers typically take minutes.
- Application Discovery Service stopped accepting new customers on November 7, 2025.

> **Trap:** AWS DMS moves databases, not servers. A question about migrating whole servers points to AWS Application Migration Service.
