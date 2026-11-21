---
title: License tracking operations
level: professional
order: 20
facts:
  - id: inventory
    text: Systems Manager Inventory can discover on-premises applications so licensing rules can be attached and tracked alongside AWS servers.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/inventory.html
  - id: inventory-limit
    text: License Manager cannot validate licensing rules for non-AWS servers at launch or termination, and their inventory must be refreshed periodically.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/inventory.html
  - id: asset-groups
    text: License asset groups manage and monitor usage across accounts and Regions, with rules managed from a management or delegated administrator account.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-asset-groups-overview.html
  - id: stopped
    text: The include stopped instances rule defaults to false, releasing stopped instances' licenses back to the available pool.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/config-overview.html
  - id: discovery-uninstall
    text: Automated discovery does not stop tracking an instance after software is uninstalled by default, but it can be configured to do so.
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/automated-discovery.html
cards:
  - id: license-manager-005
    q: Does AWS License Manager validate on-premises licensing rules when a server launches or terminates?
    a: No. Use Systems Manager Inventory for discovery, attach rules, and refresh inventory periodically.
    facts: [inventory, inventory-limit]
    trap: true
  - id: license-manager-006
    q: A company wants one view of license usage across AWS accounts and Regions. What AWS License Manager feature helps?
    a: License asset groups provide centralized monitoring and rule management.
    facts: [asset-groups]
  - id: license-manager-007
    q: By default, does AWS License Manager count stopped instances against a self-managed license?
    a: No. The include stopped instances rule defaults to false, releasing their licenses to the pool.
    facts: [stopped]
  - id: license-manager-009
    q: Does AWS License Manager automatically stop tracking an instance when discovered software is uninstalled?
    a: No. Configure automated discovery to stop tracking on uninstall if needed.
    facts: [discovery-uninstall]
    trap: true
---
AWS License Manager can track licenses for on-premises applications alongside AWS servers and monitor usage across accounts and Regions. Inventory search and license asset groups support these views.

### How it works

1. Use Systems Manager Inventory to discover on-premises applications, attach licensing rules, and refresh non-AWS inventory periodically. License Manager cannot validate those servers' rules at launch or termination.
2. Use license asset groups to monitor usage across accounts and Regions. Manage their rules from a management or delegated administrator account.
3. Review the stopped instances rule and automated discovery behavior. The former controls whether stopped instances count; the latter can be configured to stop tracking instances after software is uninstalled. License rules, automated discovery

### Exam cues

- If the question says track on-premises applications, think Systems Manager Inventory and periodic refresh, because License Manager cannot validate non-AWS servers at launch or termination.
- If the question says monitor license usage across accounts and Regions, think license asset groups, because they centralize monitoring and rule management.
- If the question says stop tracking after software uninstall, think automated discovery configuration, because tracking continues by default.

### Remember

- Include stopped instances defaults to false, so their licenses return to the available pool.
- Automated discovery keeps tracking instances after software uninstall by default.

> **Trap:** Discovering an on-premises application does not mean License Manager validates its licensing rules when the server launches or terminates.
