---
title: "Security Hub basics"
level: foundational
order: 5
facts:
  - id: posture
    text: "AWS Security Hub CSPM gives a comprehensive view of security state across accounts, collecting findings from AWS services and partners and checking the environment against standards such as AWS Foundational Security Best Practices and CIS."
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
cards:
  - id: security-hub-034
    q: "A security team wants one dashboard of findings from GuardDuty, Inspector and Macie across accounts, plus checks against security standards. Which service fits?"
    a: "AWS Security Hub."
    facts: [posture]
---
AWS Security Hub gathers security findings in one place and checks accounts against security standards. [Introduction to AWS Security Hub CSPM](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub)

### How it works

1. Turn on Security Hub.
2. It collects findings from AWS services and partner products.
3. It runs checks against standards and highlights the top issues.

### Exam cues

- If the question says single view of security findings or compliance standards across accounts, think Security Hub.

### Remember

- Aggregates findings and checks standards.

> **Trap:** Security Hub aggregates findings; it relies on services such as GuardDuty and Inspector to detect issues.
