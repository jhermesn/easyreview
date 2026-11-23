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
  - id: ads-collectors
    text: "Application Discovery Service Agentless Collector is an OVA appliance deployed in VMware vCenter that reports VM performance and utilization without per-VM agents, but cannot see processes or network connections; the Discovery Agent, installed on each server, collects those too."
    source: https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html#what-is-appdiscovery
  - id: vm-export
    text: "VM Import/Export can export most EC2 instances as VMs for Citrix Xen, Microsoft Hyper-V or VMware vSphere, storing the image in S3; instances with Windows, SQL Server or AWS Marketplace software cannot be exported."
    source: https://docs.aws.amazon.com/vm-import/latest/userguide/vmexport-limits.html#vmexport-limits
  - id: migration-factory
    text: Cloud Migration Factory on AWS coordinates and automates tasks in large-scale migrations.
    source: https://docs.aws.amazon.com/solutions/cloud-migration-factory-on-aws/
  - id: transform
    text: AWS Transform provides tools for modernization and migration across workloads.
    source: https://docs.aws.amazon.com/transform/latest/userguide/what-is-service.html
  - id: app2container
    text: AWS App2Container helps move existing applications into containers managed by services including Amazon ECS and Amazon EKS.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html
  - id: app2container-availability
    text: AWS App2Container closed to new customers on November 7, 2025.
    source: https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html
  - id: datasync
    text: AWS DataSync moves file and object data into AWS storage services, out of them and between them.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html
  - id: discovery-agent-ec2
    text: The Application Discovery Agent can run on Amazon EC2 instances and supported on-premises servers.
    source: https://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html
  - id: vm-export-formats
    text: VM Import/Export supports VHD, VMDK and raw image export formats.
    source: https://docs.aws.amazon.com/vm-import/latest/userguide/limits-image-export.html
cards:
  - id: cloud-adoption-023
    q: Which AWS service does AWS recommend first for a lift-and-shift migration of servers?
    a: AWS Application Migration Service (AWS Transform MGN).
    facts: [mgn-rehost]
  - id: cloud-adoption-019
    q: Which AWS service rehosts physical, virtual and cloud servers on AWS with continuous block-level replication and short cutovers?
    a: AWS Application Migration Service, now named AWS Transform MGN.
    facts: [mgn, mgn-replication]
  - id: cloud-adoption-020
    q: Which AWS service collected configuration, usage and network connection data about on-premises servers to plan a migration?
    a: AWS Application Discovery Service. It closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    facts: [ads, ads-closed]
  - id: cloud-adoption-036
    q: Which AWS solution coordinates and automates tasks across a large migration?
    a: Cloud Migration Factory on AWS.
    facts: [migration-factory]
  - id: cloud-adoption-037
    q: Which AWS service provides tools to modernize and migrate workloads?
    a: AWS Transform.
    facts: [transform]
  - id: cloud-adoption-038
    q: Which AWS tool helps move existing applications into containers for Amazon ECS or Amazon EKS?
    a: AWS App2Container. It closed to new customers on November 7, 2025.
    facts: [app2container, app2container-availability]
  - id: cloud-adoption-039
    q: Which AWS service transfers files or objects between storage systems and AWS storage services?
    a: AWS DataSync.
    facts: [datasync]
  - id: cloud-adoption-040
    q: Can the AWS Application Discovery Agent be installed on an EC2 instance as well as an on-premises server?
    a: Yes. The agent supports EC2 instances and supported on-premises servers.
    facts: [discovery-agent-ec2]
  - id: cloud-adoption-041
    q: Which image formats can VM Import/Export use when exporting an image?
    a: VHD, VMDK and raw.
    facts: [vm-export-formats]
---
AWS migration services help discover on-premises servers and move them to AWS. Some were renamed or closed to new customers, so exam questions may use older names.

### How it works

1. **Discovery:** AWS Application Discovery Service collects server configuration, usage and network connections, so servers can be grouped into applications.
2. **Move servers:** AWS Application Migration Service replicates servers continuously and launches them on AWS with short cutovers.

| Service | Stage | Status (November 2026) |
|---|---|---|
| AWS Application Discovery Service | Discover | Closed to new customers since November 7, 2025 |
| AWS Application Migration Service | Move servers (rehost) | Now named AWS Transform MGN |

AWS Transform provides similar capabilities to Application Discovery Service.

Cloud Migration Factory coordinates large migrations. AWS Transform provides modernization and migration tools. AWS App2Container moves existing applications into containers and closed to new customers on November 7, 2025. AWS DataSync transfers file or object data between storage systems. The Discovery Agent supports EC2 and on-premises servers. VM Import/Export supports VHD, VMDK and raw image exports.

### Exam cues

- If the question says lift and shift servers with minimal downtime, think AWS Application Migration Service.
- If the question says discover on-premises servers and their dependencies, think AWS Application Discovery Service.
- If the question says coordinate a large migration, think Cloud Migration Factory, because it automates migration tasks.
- If the question says move an existing application into containers, think AWS App2Container, because it prepares applications for container services.
- If the question says transfer files or objects between storage systems, think AWS DataSync, because it moves file and object data into, out of and between AWS storage services.

### Remember

- Application Migration Service cutovers typically take minutes.
- Application Discovery Service stopped accepting new customers on November 7, 2025.

> **Trap:** AWS DMS moves databases, not servers. A question about migrating whole servers points to AWS Application Migration Service.
