---
title: "AWS Health basics"
level: foundational
order: 5
facts:
  - id: health-events
    text: "AWS Health gives ongoing visibility into resource performance and the availability of AWS services and accounts, through events that explain how changes might affect applications."
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health
cards:
  - id: health-017
    q: "An administrator wants to know whether an AWS service event affects the company's own resources. Where do they look?"
    a: "AWS Health (the AWS Health Dashboard)."
    facts: [health-events]
---
AWS Health reports AWS events, such as outages and scheduled changes, that affect your account. [What is AWS Health?](https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health)

### How it works

1. AWS publishes events about services and resources.
2. AWS Health shows the ones that affect your account.
3. You plan around changes or respond to issues.

### Exam cues

- If the question says AWS service events affecting your resources, think AWS Health.

### Remember

- Events about services and accounts.

> **Trap:** AWS Health shows AWS-side events; CloudWatch monitors your own resources' metrics.
