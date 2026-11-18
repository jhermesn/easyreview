---
title: "Trusted Advisor basics"
level: foundational
order: 5
facts:
  - id: recommends
    text: "AWS Trusted Advisor inspects an AWS environment and recommends ways to save money, improve availability and performance, and close security gaps."
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html#trusted-advisor
  - id: basic-checks
    text: "With Basic Support, Trusted Advisor offers all Service Limits checks and selected Security and Fault Tolerance checks."
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html#trusted-advisor
cards:
  - id: trusted-advisor-016
    q: "Which AWS service recommends cost savings, security fixes and service limit warnings based on AWS best practices?"
    a: "AWS Trusted Advisor."
    facts: [recommends]
  - id: trusted-advisor-017
    q: "Does an account on Basic Support get every AWS Trusted Advisor check?"
    a: "No. Basic Support gets all Service Limits checks and selected Security and Fault Tolerance checks; the full set needs a higher support plan."
    trap: true
    facts: [basic-checks]
---
AWS Trusted Advisor checks an account against AWS best practices and recommends improvements for cost, performance, security, fault tolerance and service limits. [AWS Trusted Advisor](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html#trusted-advisor)

### How it works

1. Trusted Advisor inspects the resources in the account.
2. Each check reports items that need attention, with a recommendation.
3. The support plan decides how many checks are available.

### Exam cues

- If the question says best-practice recommendations to cut cost or close security gaps, think Trusted Advisor.

### Remember

- Basic Support: Service Limits checks plus selected Security and Fault Tolerance checks.

> **Trap:** Trusted Advisor recommends; it does not fix resources by itself.
