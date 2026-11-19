---
title: "AWS Config basics"
level: foundational
order: 5
facts:
  - id: inventory-history
    text: "AWS Config keeps configuration records for selected supported resource types; daily recording retains only the latest changed state over a 24-hour period."
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html#select-resources-recording-frequency
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
  - id: config-055
    q: "Does enabling AWS Config guarantee a history of every change to every AWS resource?"
    a: "No. Recording covers selected supported resource types, and daily recording captures only the latest changed state over 24 hours."
    facts: [inventory-history]
---
AWS Config keeps an inventory of AWS resources with their configuration history, and checks them against rules for compliance. [What is AWS Config?](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig)

### How it works

1. Choose supported resource types for AWS Config to record.
2. Continuous recording captures changes as they occur. Daily recording captures the latest changed state over a 24-hour period.
3. Rules evaluate the settings and mark resources compliant or noncompliant.

### Exam cues

- If the question says configuration history, or continuously check that resources follow a rule, think AWS Config.

### Remember

- Inventory, relationships and history cover the supported resources selected for recording.
- Rules flag noncompliant resources.

> **Trap:** AWS Config tracks how a resource is configured. CloudTrail tracks who made the API call that changed it.
