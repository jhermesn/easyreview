---
title: "AWS Config basics"
level: foundational
order: 5
facts:
  - id: inventory-history
    text: "AWS Config shows the configuration of AWS resources, how they relate to each other, and how their configurations changed over time."
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
  - id: rules-basic
    text: "AWS Config rules evaluate resource settings continuously and flag resources that break a rule as noncompliant."
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
  - id: audit-basic
    text: "Configuration history from AWS Config helps prove compliance during audits."
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#scenarios-auditing-and-compliance
cards:
  - id: config-051
    q: "A company must know whether any S3 bucket in its account allows public access, and keep checking as buckets change. Which service fits?"
    a: "AWS Config, with a rule that flags noncompliant buckets continuously."
    facts: [rules-basic]
  - id: config-052
    q: "Which AWS service shows what a security group looked like last month?"
    a: "AWS Config, which keeps the configuration history of resources."
    facts: [inventory-history, audit-basic]
  - id: config-053
    q: "Is AWS Config the service that records which user called an API?"
    a: "No. AWS CloudTrail records API calls; AWS Config records resource configurations and checks them against rules."
    trap: true
    facts: [inventory-history]
---
AWS Config keeps an inventory of AWS resources with their configuration history, and checks them against rules for compliance.

### How it works

1. AWS Config records each supported resource and its settings.
2. Every change becomes a new configuration item, building a history.
3. Rules evaluate the settings and mark resources compliant or noncompliant.

### Exam cues

- If the question says configuration history, or continuously check that resources follow a rule, think AWS Config.

### Remember

- Inventory, relationships and history of resource configurations.
- Rules flag noncompliant resources.

> **Trap:** AWS Config tracks how a resource is configured. CloudTrail tracks who made the API call that changed it.
