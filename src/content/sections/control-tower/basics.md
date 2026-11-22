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
  - id: account-factory
    text: "AWS Control Tower Account Factory provisions member accounts in the landing zone."
    source: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
  - id: dashboard
    text: "The AWS Control Tower dashboard shows provisioned accounts, enabled controls and noncompliant resources."
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
  - id: control-tower-036
    q: "Which AWS Control Tower feature provisions member accounts in a landing zone?"
    a: "Account Factory."
    facts: [account-factory]
  - id: control-tower-037
    q: "Where can an administrator see AWS Control Tower accounts, controls and noncompliant resources?"
    a: "The AWS Control Tower dashboard."
    facts: [dashboard]
---
AWS Control Tower builds and governs a multi-account environment using AWS best practices.

### How it works

1. Set up a landing zone.
2. Control Tower configures accounts and services such as Organizations.
3. Controls keep accounts within the rules.

### Exam cues

- If the question says review landing zone accounts and noncompliant resources, think the AWS Control Tower dashboard, because it shows accounts and control status.
- If the question says provision accounts in an AWS Control Tower landing zone, think Account Factory, because it creates member accounts there.
- If the question says set up a governed multi-account environment quickly, think Control Tower.

### Remember

- Prescriptive multi-account setup.

> **Trap:** Control Tower builds on AWS Organizations; it does not replace it.
