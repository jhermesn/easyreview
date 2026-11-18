---
title: License inventory and rules
level: associate
order: 10
facts:
  - id: purpose
    text: AWS License Manager tracks software license usage across AWS Regions and accounts and can use Systems Manager to manage licenses on servers outside AWS.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html#related-services
  - id: byol
    text: Bring Your Own License means repurposing existing license inventory for cloud resources.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html
  - id: self-managed
    text: Self-managed licenses contain rules based on enterprise agreements that determine how AWS processes commands consuming licenses.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-configurations.html
  - id: counting
    text: Self-managed licenses count by vCPUs, cores, sockets, or instances.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/config-overview.html
  - id: tenancy
    text: Core and socket counting require Dedicated Hosts; instance and vCPU counting support shared, Dedicated Host, and Dedicated Instance tenancy.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/config-overview.html
  - id: stopped
    text: The include stopped instances rule defaults to false, releasing stopped instances' licenses back to the available pool.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/config-overview.html
  - id: affinity
    text: Host affinity applies to core or socket counting for 1 to 180 days; after the period licenses become available for reuse within 24 hours.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/config-overview.html
  - id: inventory
    text: Systems Manager Inventory can discover on-premises applications so licensing rules can be attached and tracked alongside AWS servers.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/inventory.html
  - id: inventory-limit
    text: License Manager cannot validate licensing rules for non-AWS servers at launch or termination, and their inventory must be refreshed periodically.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/inventory.html
  - id: inventory-sync
    text: Querying Systems Manager Inventory requires a Resource Data Sync that stores inventory in an S3 bucket.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/inventory.html
  - id: asset-groups
    text: License asset groups manage and monitor usage across accounts and Regions, with rules managed from a management or delegated administrator account.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-asset-groups-overview.html
  - id: limits
    text: When a license limit is exceeded, a soft limit notifies the administrator while a hard limit prevents a resource from deploying.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/create-license-configuration.html
  - id: discovery
    text: Automated discovery uses Systems Manager Inventory and product information in a self-managed license to track instances with matching software.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/automated-discovery.html
  - id: discovery-uninstall
    text: Automated discovery does not stop tracking an instance after software is uninstalled by default, but it can be configured to do so.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/automated-discovery.html
  - id: sharing
    text: AWS Resource Access Manager can share self-managed licenses with AWS accounts or an organization.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/share-license-configuration.html
  - id: rds-limitations
    text: Automated discovery of RDS for Oracle or RDS for Db2 uses vCPU counting and does not support rules or hard license limits.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/create-license-configuration.html
cards:
  - id: license-manager-001
    q: Which AWS service tracks software licenses across AWS and on-premises servers?
    a: AWS License Manager, using Systems Manager for servers outside AWS.
    facts: [purpose]
  - id: license-manager-002
    q: A company wants to apply its software contract rules to licenses used by AWS resources. What AWS License Manager feature should it use?
    a: A self-managed license. Its rules reflect the enterprise agreement and govern commands that consume licenses.
    facts: [self-managed]
  - id: license-manager-003
    q: What license counting types does AWS License Manager support for self-managed licenses?
    a: vCPUs, cores, sockets, and instances.
    facts: [counting]
  - id: license-manager-004
    q: A company counts AWS License Manager licenses by physical sockets. What EC2 tenancy is required?
    a: Dedicated Hosts. Core and socket counting require them.
    facts: [tenancy]
  - id: license-manager-008
    q: A company must prevent a new deployment when its AWS License Manager license count would be exceeded. Which limit should it choose?
    a: A hard limit. A soft limit notifies when exceeded but does not prevent deployment.
    facts: [limits]
---

AWS License Manager tracks software license use across AWS accounts and Regions and can manage licenses on servers outside AWS. Bring Your Own License (BYOL) means using existing licenses with cloud resources.

### How it works

1. Review the software agreement and create a self-managed license with rules that reflect its terms.
2. Select a counting type: virtual CPUs (vCPUs), cores, sockets, or instances. Rules can include tenancy restrictions and license limits. A hard limit prevents deployment when exceeded; a soft limit notifies instead.
3. Use Systems Manager to manage licenses on servers outside AWS.

| Counting type | Supported tenancy |
| --- | --- |
| Cores or sockets | Dedicated Hosts |
| Instances or vCPUs | Shared, Dedicated Instances, or Dedicated Hosts |

### Exam cues

- If the question says reuse existing software licenses on AWS, think BYOL and self-managed licenses, because their rules reflect the agreement.
- If the question says track licenses on servers outside AWS, think License Manager with Systems Manager, because it can manage those servers' licenses.
- If the question says count physical cores or sockets, think Dedicated Hosts, because those counting types require that tenancy.
- If the question says prevent deployment above a license limit, think a hard limit, because a soft limit only notifies.

### Remember

- Counting types are vCPUs, cores, sockets, and instances.
- Core and socket counting require Dedicated Hosts.
- A hard limit prevents deployment when the license limit is exceeded; a soft limit notifies the administrator.

> **Trap:** A soft limit does not prevent deployment when the license limit is exceeded. Choose a hard limit for that.
