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
  - id: affected-resources
    text: The Affected resources tab lists resource IDs or ARNs when available.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#event-details
  - id: eks-support-notice
    text: Amazon EKS sends a notice through AWS Health when an account has clusters running a Kubernetes version approaching the end of standard support.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html#version-faqs
  - id: service-health
    text: The AWS Health Dashboard service health page needs no sign-in or AWS account, shows service history for the last 12 months and has an RSS feed; your account health requires signing in.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-dashboard-status.html
  - id: all-customers
    text: The AWS Health Dashboard is available to all AWS customers at no additional cost, on every Support plan.
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html
cards:
  - id: health-002
    q: A scheduled AWS maintenance event affects particular instances. Where can a team find the affected resources?
    a: Open the account-specific AWS Health event and its Affected resources tab.
    facts: [account-events, affected-resources]
  - id: health-004
    q: How do public AWS Health events differ from account-specific events?
    a: Public events describe regional service availability; account-specific events concern the account and its resources.
    facts: [account-events, public-events]
  - id: health-014
    q: Where can a team find an AWS notice that an Amazon EKS cluster's Kubernetes version is approaching the end of standard support?
    a: AWS Health Dashboard. Amazon EKS sends a notice for accounts with affected clusters.
    facts: [eks-support-notice]
  - id: health-015
    q: Where can anyone, without an AWS account, see the status and 12-month history of AWS services?
    a: The service health page of the AWS Health Dashboard. Your account health needs sign-in.
    facts: [service-health]
  - id: health-016
    q: Does a company on AWS Basic Support get the AWS Health Dashboard view of events affecting its account?
    a: Yes. The AWS Health Dashboard is available to all AWS customers at no additional cost.
    facts: [all-customers]
---
AWS Health reports service events and changes that can affect AWS resources. The account dashboard helps a team find the specific resources involved.

### How it works

1. Review open issues, scheduled changes, notifications, or the event log in the account dashboard.
2. Select an event to see its description, update timeline, Region, status, and affected resource count.
3. Open Affected resources to find resource IDs or Amazon Resource Names (ARNs), which identify AWS resources.

### Exam cues

- If the question says a maintenance notice identifies instances, think account-specific event and Affected resources, because the event concerns the account's resources.
- If the question says a regional service is impaired, think public event, because public events describe regional service availability rather than a particular account.
- If the question says an Amazon EKS cluster version is approaching the end of standard support, think AWS Health, because EKS sends a notice to accounts with affected clusters.
- If the question says anyone needs service history without an AWS account, think the service health page, because it is public and needs no sign-in.

### Remember

- The service health page shows 12 months of service history. Account health requires sign-in.
- The AWS Health Dashboard is available to all AWS customers at no additional cost, including on Basic Support.

> **Trap:** A public event is not proof that a particular account resource is affected. Check the account-specific event and affected resources.
