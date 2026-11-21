---
title: "Control Tower basics"
level: foundational
order: 5
facts:
  - id: landing-zone
    text: "AWS Control Tower sets up and governs a multi-account AWS environment following prescriptive best practices, orchestrating other AWS services."
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower
  - id: controls
    text: AWS Control Tower applies controls (guardrails), which are preventive, detective or proactive rules, to the accounts in its landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
cards:
  - id: control-tower-035
    q: "A company wants a ready, best-practice multi-account setup with governance from day one. Which service fits?"
    a: "AWS Control Tower."
    facts: [landing-zone]
  - id: control-tower-034
    q: Which AWS service sets up a multi-account landing zone and applies preventive and detective guardrails to its accounts?
    a: AWS Control Tower.
    facts: [controls]
---
AWS Control Tower builds and governs a multi-account environment using AWS best practices.

### How it works

1. Set up a landing zone.
2. Control Tower configures accounts and services such as Organizations.
3. Controls keep accounts within the rules.

### Exam cues

- If the question says set up a governed multi-account environment quickly, think Control Tower.

### Remember

- Prescriptive multi-account setup.

> **Trap:** Control Tower builds on AWS Organizations; it does not replace it.
