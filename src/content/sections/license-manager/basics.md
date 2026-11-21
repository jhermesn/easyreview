---
title: "License Manager basics"
level: foundational
order: 5
facts:
  - id: licenses
    text: "AWS License Manager manages software licenses from vendors such as Microsoft, SAP, Oracle and IBM across Regions and accounts in an organization."
    source: https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html#license-manager
cards:
  - id: license-manager-010
    q: "A company must track Microsoft and Oracle license usage across many AWS accounts. Which service fits?"
    a: "AWS License Manager."
    facts: [licenses]
---
AWS License Manager tracks and controls software license use.

### How it works

1. Define license rules.
2. Attach them to resources or AMIs.
3. License Manager tracks usage across accounts.

### Exam cues

- If the question says track or limit software license usage, think License Manager.

### Remember

- Vendor licenses across accounts and Regions.

> **Trap:** License Manager tracks licenses; it does not sell them.
