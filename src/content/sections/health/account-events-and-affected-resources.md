---
title: Account events and affected resources
level: associate
order: 10
facts:
  - id: account-events
    text: AWS Health account-specific events concern an account and its resources.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: public-events
    text: Public events describe regional service availability and are not specific to an account.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: dashboard-tabs
    text: The account dashboard offers open and recent issues, scheduled changes, other notifications, and an event log.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#aws-health-account-views
  - id: event-details
    text: Event details include the service, status, Region, category, description, update timeline, and affected resource count.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#event-details
  - id: eks-support-notice
    text: Amazon EKS sends a notice through AWS Health when an account has clusters running a Kubernetes version approaching the end of standard support.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html#version-faqs
  - id: all-customers
    text: The AWS Health Dashboard is available to all AWS customers at no additional cost, on every Support plan.
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html
  - id: eventbridge-sns
    text: "Amazon EventBridge rules can route account-specific AWS Health events to an Amazon SNS topic."
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
cards:
  - id: health-004
    q: How do public AWS Health events differ from account-specific events?
    a: Public events describe regional service availability; account-specific events concern the account and its resources.
    facts: [account-events, public-events]
  - id: health-014
    q: Where can a team find an AWS notice that an Amazon EKS cluster's Kubernetes version is approaching the end of standard support?
    a: AWS Health Dashboard. Amazon EKS sends a notice for accounts with affected clusters.
    facts: [eks-support-notice]
  - id: health-016
    q: Does a company on AWS Basic Support get the AWS Health Dashboard view of events affecting its account?
    a: Yes. The AWS Health Dashboard is available to all AWS customers at no additional cost.
    facts: [all-customers]
  - id: health-019
    q: "How can a team send account-specific AWS Health event notifications to an Amazon SNS topic?"
    a: "Use an Amazon EventBridge rule that matches AWS Health events and targets the SNS topic."
    facts: [eventbridge-sns]
---
AWS Health reports service events and changes that can affect AWS resources. The account dashboard helps a team find the specific resources involved.

### How it works

1. Review open issues, scheduled changes, notifications, or the event log in the account dashboard.
2. Select an event to see its description, update timeline, Region, status, and affected resource count.
3. Open Affected resources to find resource IDs or Amazon Resource Names (ARNs), which identify AWS resources.

### Exam cues

- If the question says notify subscribers about account-specific AWS Health events, think an EventBridge rule targeting SNS, because the rule routes matching events to the topic.
- If the question says a maintenance notice identifies instances, think account-specific event and Affected resources, because the event concerns the account's resources.
- If the question says a regional service is impaired, think public event, because public events describe regional service availability rather than a particular account.
- If the question says an Amazon EKS cluster version is approaching the end of standard support, think AWS Health, because EKS sends a notice to accounts with affected clusters.
- If the question says anyone needs service history without an AWS account, think the service health page, because it is public and needs no sign-in.

### Remember

- The service health page shows 12 months of service history. Account health requires sign-in.
- The AWS Health Dashboard is available to all AWS customers at no additional cost, including on Basic Support.

> **Trap:** A public event is not proof that a particular account resource is affected. Check the account-specific event and affected resources.
