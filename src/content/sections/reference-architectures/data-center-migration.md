---
title: Migrating a data center to AWS
level: foundational
order: 6
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
  - id: mgn
    text: AWS Application Migration Service, now named AWS Transform MGN, automates migrating physical, virtual and cloud servers to AWS with minimal downtime, typically with cutover windows of minutes.
    source: https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html#what-is-mgn
  - id: mgn-replication
    text: AWS Transform MGN continuously replicates source servers at the block level and converts them to launch on AWS.
    source: https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html#what-is-mgn
  - id: mgn-rehost
    text: AWS Application Migration Service is the primary service AWS recommends for lift-and-shift migrations.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: evaluator
    text: Migration Evaluator builds a data-driven business case for AWS, discovers over-provisioned on-premises instances and compares BYOL with License Included options.
    source: https://aws.amazon.com/migration-evaluator/
  - id: hub
    text: AWS Migration Hub provides a single place to discover servers, plan migrations and track the status of each application migration, whichever migration tool is used.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: hub-closed
    text: AWS Migration Hub closed to new customers on November 7, 2025; AWS Transform offers similar capabilities.
    source: https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html#whatishub
  - id: dms
    text: AWS Database Migration Service (AWS DMS) migrates relational databases, data warehouses, NoSQL databases and other data stores into AWS or between cloud and on-premises setups.
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html#Welcome
  - id: dms-ongoing
    text: AWS DMS can do a one-time migration or replicate ongoing changes to keep source and target in sync.
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html#Welcome
  - id: sct
    text: The AWS Schema Conversion Tool (AWS SCT) converts an existing database schema from one database engine to another, for OLTP or data warehouse schemas.
    source: https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html#CHAP_Welcome
  - id: schema-not-data
    text: DMS Schema Conversion converts the database schema, not the data; data migration uses the data migration features of AWS DMS.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion
  - id: datasync
    text: AWS DataSync securely transfers file or object data at high speed between AWS storage services, as well as to and from them.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
  - id: snow-closed
    text: AWS Snowball Edge is no longer available to new customers; AWS points new customers to DataSync for online transfers, AWS Data Transfer Terminal for physical transfers, and Outposts for edge computing.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#whatisedge
  - id: storage-gateway
    text: AWS Storage Gateway connects an on-premises software appliance with AWS cloud storage so on-premises applications can use it.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html#WhatIsStorageGateway
  - id: file-gateway
    text: S3 File Gateway exposes S3 objects as files through Network File System (NFS) or Server Message Block (SMB) shares.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html
  - id: vpn
    text: AWS Site-to-Site VPN connects a VPC to a remote network, such as an on-premises site, which instances in a VPC cannot reach by default.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#VPC_VPN
  - id: vpn-tunnels
    text: Configure both tunnels for redundancy; when one becomes unavailable traffic automatically uses the available tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html
  - id: dx
    text: AWS Direct Connect links an internal network to a Direct Connect location over a standard Ethernet fiber-optic cable, without the public internet.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#Welcome
  - id: dx-preferred
    text: For identical destination prefixes at a virtual private gateway, BGP routes from Direct Connect take priority over Site-to-Site VPN routes, subject to endpoint health.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html
  - id: vpn-backup
    text: A Site-to-Site VPN can act as a backup path that keeps VPC connectivity if the Direct Connect connection fails.
    source: https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc
  - id: dx-no-encryption
    text: Direct Connect does not encrypt traffic in transit by default.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html
diagrams:
  - id: data-center-migration
    title: Servers, a database and files move to AWS over a private connection
    facts: [seven-rs, rehost, replatform, refactor-cost, mgn, mgn-replication, mgn-rehost, evaluator, hub, hub-closed, dms, dms-ongoing, sct, schema-not-data, datasync, snow-closed, storage-gateway, file-gateway, vpn, vpn-tunnels, dx, dx-preferred, vpn-backup, dx-no-encryption]
    width: 1240
    height: 1000
    groups:
      - { label: Corporate data center, x: 20, y: 20, w: 360, h: 960, tone: neutral, icon: group-corporate-data-center }
      - { label: Region, x: 620, y: 20, w: 600, h: 960, tone: neutral, icon: group-region }
    nodes:
      - { id: servers, label: App servers, sub: VMware VMs, x: 50, y: 80, w: 160, h: 86, tone: compute, icon: res-servers }
      - { id: db, label: Oracle database, sub: on premises, x: 50, y: 290, w: 160, h: 86, tone: database, icon: res-database }
      - { id: files, label: File server, sub: shared folders, x: 50, y: 500, w: 160, h: 86, tone: storage, icon: res-server }
      - { id: sgw, label: Storage Gateway, sub: S3 File Gateway, x: 50, y: 700, w: 160, h: 86, tone: storage, icon: storage-gateway, info: "Gives on-premises applications NFS or SMB shares whose files are stored as objects in S3." }
      - { id: router, label: Customer router, sub: on premises, x: 50, y: 880, w: 160, h: 86, tone: network, icon: res-vpc-customer-gateway }
      - { id: vpn, label: Site-to-Site VPN, sub: backup path, x: 420, y: 760, w: 160, h: 86, tone: network, icon: site-to-site-vpn, info: "Two tunnels; if one is unavailable, traffic uses the other." }
      - { id: dx, label: Direct Connect, sub: private link, x: 420, y: 880, w: 160, h: 86, tone: network, icon: direct-connect }
      - { id: mgn, label: Transform MGN, sub: lift and shift, x: 660, y: 80, w: 170, h: 86, tone: compute, icon: transform, info: "Formerly AWS Application Migration Service. Replicates servers at the block level and converts them to run on AWS." }
      - { id: ec2, label: EC2 instances, sub: rehosted, x: 960, y: 80, w: 170, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: dms, label: AWS DMS, sub: ongoing replication, x: 660, y: 290, w: 170, h: 86, tone: database, icon: database-migration-service, info: "Schema conversion (AWS SCT or DMS Schema Conversion) converts the schema first; DMS then moves the data." }
      - { id: aurora, label: Aurora PostgreSQL, sub: replatformed, x: 960, y: 290, w: 170, h: 86, tone: database, icon: aurora }
      - { id: datasync, label: DataSync, sub: online transfer, x: 660, y: 500, w: 170, h: 86, tone: storage, icon: datasync }
      - { id: s3, label: S3 bucket, sub: migrated files, x: 960, y: 500, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: vgw, label: VPC gateway, sub: attached to the VPC, x: 660, y: 880, w: 170, h: 86, tone: network, icon: virtual-private-cloud }
    edges:
      - { from: router, to: dx, step: 1 }
      - { from: dx, to: vgw, step: 1 }
      - { from: servers, to: mgn, step: 2 }
      - { from: mgn, to: ec2, step: 2 }
      - { from: db, to: dms, step: 3 }
      - { from: dms, to: aurora, step: 3 }
      - { from: files, to: datasync, step: 4 }
      - { from: datasync, to: s3, step: 4 }
      - { from: sgw, to: s3, step: 5 }
      - { from: router, to: vpn, step: 6, dashed: true }
      - { from: vpn, to: vgw, step: 6, dashed: true }
    steps:
      - "A Direct Connect connection links the data center to AWS without going over the public internet, so migration traffic has a private path."
      - "Rehost: AWS Transform MGN replicates the servers continuously and launches them as EC2 instances, unchanged."
      - "Replatform: the schema is converted for Aurora, then AWS DMS copies the data and keeps replicating changes until the cutover."
      - "DataSync copies the file shares to an S3 bucket online."
      - "Applications that stay on premises keep writing files through Storage Gateway, which stores them in S3."
      - "If the Direct Connect link is down, a Site-to-Site VPN over the internet keeps the data center connected."
cards:
  - id: reference-architectures-187
    q: "A company wants to move hundreds of servers to AWS quickly, without changing the applications. Which strategy and service fit?"
    a: "**Rehost** (lift and shift) with **AWS Transform MGN**, formerly AWS Application Migration Service, which replicates servers and launches them on AWS."
    facts: [rehost, mgn, mgn-rehost]
  - id: reference-architectures-188
    q: "During migration, a self-managed Oracle database moves to a managed engine on AWS with small changes. Which strategy is this?"
    a: "**Replatform** (lift, tinker and shift): move and make some optimizations, such as a managed database."
    facts: [replatform, seven-rs]
  - id: reference-architectures-189
    q: "Which AWS tools convert a database schema to a new engine and then copy the data while the source keeps running?"
    a: "**AWS SCT** (or DMS Schema Conversion) converts the schema; **AWS DMS** migrates the data and can keep replicating changes."
    facts: [sct, schema-not-data, dms, dms-ongoing]
  - id: reference-architectures-190
    q: "Does DMS Schema Conversion also move the rows of the database?"
    a: "No. It converts only the **schema**. The data moves with AWS DMS."
    trap: true
    facts: [schema-not-data]
  - id: reference-architectures-191
    q: "Large file shares must be copied to S3 over the network as fast as possible. Which service fits?"
    a: "**AWS DataSync**, a secure, high-speed online transfer service."
    facts: [datasync, snow-closed]
  - id: reference-architectures-192
    q: "On-premises applications must keep using file shares, but the files should be stored in Amazon S3. Which service fits?"
    a: "**AWS Storage Gateway** with an **S3 File Gateway**, which offers NFS or SMB shares backed by S3."
    facts: [storage-gateway, file-gateway]
  - id: reference-architectures-193
    q: "What is the difference between AWS Direct Connect and AWS Site-to-Site VPN?"
    a: "**Direct Connect** is a dedicated link that does not use the public internet. **Site-to-Site VPN** connects over the internet and can be the backup path."
    trap: true
    facts: [dx, vpn, vpn-backup]
  - id: reference-architectures-194
    q: "Before migrating, management wants a data-driven business case that compares on-premises costs with AWS. Which tool fits?"
    a: "**Migration Evaluator**, which builds a business case and finds over-provisioned on-premises servers."
    facts: [evaluator]
  - id: reference-architectures-195
    q: "Which migration strategy is usually the most complex and costly?"
    a: "**Refactor** (re-architect). For large migrations, AWS recommends starting with rehost, relocate or replatform."
    trap: true
    facts: [refactor-cost]
---
Migration questions describe a company leaving its data center and ask which strategy fits each workload and which AWS service moves it. This design shows the common pieces together: servers rehosted, a database replatformed, files transferred, a gateway for files that stay and a private network link.

### How it works

1. Direct Connect gives a private connection for migration traffic; a Site-to-Site VPN is the backup.
2. AWS Transform MGN rehosts servers on EC2 without changing them.
3. Schema conversion and AWS DMS replatform the database onto Aurora, keeping it in sync until cutover.
4. DataSync copies file shares to S3, and Storage Gateway lets on-premises applications keep using S3 through file shares.

| Strategy | What changes | Example |
|---|---|---|
| Rehost | Nothing | Servers to EC2 with Transform MGN |
| Replatform | Some optimization | Oracle to Aurora with DMS |
| Refactor | The application is re-architected | Most complex and costly |
| Retire, retain, relocate, repurchase | The other four of the 7 Rs | Chosen per application |

| Need | Service |
|---|---|
| Move servers unchanged | AWS Transform MGN |
| Convert a database schema | AWS SCT or DMS Schema Conversion |
| Move database data | AWS DMS |
| Copy files online | AWS DataSync |
| On-premises access to S3 storage | AWS Storage Gateway |
| Private dedicated network link | AWS Direct Connect |
| Connection over the internet, or backup | AWS Site-to-Site VPN |
| Business case for migration | Migration Evaluator |

### Exam cues

- If the question says lift and shift, think rehost with AWS Transform MGN.
- If the question says migrate a database with minimal downtime, think AWS DMS with ongoing replication.
- If the question says convert the schema to another engine, think AWS SCT or DMS Schema Conversion.
- If the question says transfer files online, think DataSync.
- If the question says on-premises applications use cloud storage, think Storage Gateway.
- If the question says a private connection that avoids the internet, think Direct Connect.

### Remember

- The 7 Rs: retire, retain, rehost, relocate, repurchase, replatform, refactor.
- Schema conversion changes the schema; DMS moves the data.
- Direct Connect does not use the public internet; a VPN does.

> **Trap:** Snowball Edge is no longer offered to new customers. For online transfers, think DataSync.
