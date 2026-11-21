---
title: "AWS Health basics"
level: foundational
order: 5
facts:
  - id: health-events
    text: "AWS Health gives ongoing visibility into resource performance and the availability of AWS services and accounts, through events that explain how changes might affect applications."
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health
  - id: account-events
    text: AWS Health account-specific events concern an account and its resources.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: affected-resources
    text: The Affected resources tab lists resource IDs or ARNs when available.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#event-details
  - id: service-health
    text: The AWS Health Dashboard service health page needs no sign-in or AWS account, shows service history for the last 12 months and has an RSS feed; your account health requires signing in.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-dashboard-status.html
cards:
  - id: health-017
    q: "An administrator wants to know whether an AWS service event affects the company's own resources. Where do they look?"
    a: "AWS Health (the AWS Health Dashboard)."
    facts: [health-events]
  - id: health-002
    q: A scheduled AWS maintenance event affects particular instances. Where can a team find the affected resources?
    a: Open the account-specific AWS Health event and its Affected resources tab.
    facts: [account-events, affected-resources]
  - id: health-015
    q: Where can anyone, without an AWS account, see the status and 12-month history of AWS services?
    a: The service health page of the AWS Health Dashboard. Your account health needs sign-in.
    facts: [service-health]
---
AWS Health reports AWS events, such as outages and scheduled changes, that affect your account.

### How it works

1. AWS publishes events about services and resources.
2. AWS Health shows the ones that affect your account.
3. You plan around changes or respond to issues.

### Exam cues

- If the question says AWS service events affecting your resources, think AWS Health.

### Remember

- Events about services and accounts.

> **Trap:** AWS Health shows AWS-side events; CloudWatch monitors your own resources' metrics.
