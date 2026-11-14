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
  - id: lifecycle-status
    text: Planned lifecycle event resource statuses are Pending, Unknown, or Resolved and usually refresh every 24 hours but can take up to 72 hours.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#event-details
  - id: history
    text: The account event log shows events from the past 90 days.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#aws-health-account-views
  - id: organization
    text: Organizational view aggregates Health events across an AWS organization and supports a delegated administrator.
    source: https://docs.aws.amazon.com/health/latest/ug/aggregate-events.html#aggregate-events
  - id: organization-prerequisite
    text: Organizational view requires an organization with all features enabled.
    source: https://docs.aws.amazon.com/health/latest/ug/aggregate-events.html#prerequisites-organizational-view
  - id: eks-support-notice
    text: Amazon EKS sends a notice through AWS Health when an account has clusters running a Kubernetes version approaching the end of standard support.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html#version-faqs
  - id: service-health
    text: The AWS Health Dashboard service health page needs no sign-in or AWS account, shows service history for the last 12 months and has an RSS feed; your account health requires signing in.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-dashboard-status.html
cards:
  - id: health-002
    q: A scheduled AWS maintenance event affects particular instances. Where can a team find the affected resources?
    a: Open the account-specific AWS Health event and its Affected resources tab.
    facts: [account-events, affected-resources]
  - id: health-004
    q: How do public AWS Health events differ from account-specific events?
    a: Public events describe regional service availability; account-specific events concern the account and its resources.
    facts: [account-events, public-events]
  - id: health-005
    q: A team needs a central view of AWS Health events across an organization without using its management account for daily work. What should it use?
    a: Enable organizational view and delegate administrator access to a member account. The organization must have all features enabled.
    facts: [organization, organization-prerequisite]
  - id: health-006
    q: After remediation of a planned AWS Health lifecycle event, can an affected resource remain listed as pending?
    a: Yes. Resource status usually refreshes every 24 hours, but can take up to 72 hours.
    facts: [lifecycle-status]
    trap: true
  - id: health-007
    q: How far back does the AWS Health account event log show events?
    a: The past 90 days.
    facts: [history]
  - id: health-014
    q: Where can a team find an AWS notice that an Amazon EKS cluster's Kubernetes version is approaching the end of standard support?
    a: AWS Health Dashboard. Amazon EKS sends a notice for accounts with affected clusters.
    facts: [eks-support-notice]
  - id: health-015
    q: Where can anyone, without an AWS account, see the status and 12-month history of AWS services?
    a: The service health page of the AWS Health Dashboard. Your account health needs sign-in.
    facts: [service-health]
---
AWS Health reports service events and changes that can affect AWS resources. The account dashboard helps a team find the specific resources involved.

### How it works

1. Review open issues, scheduled changes, notifications, or the event log in the account dashboard.
2. Select an event to see its description, update timeline, Region, status, and affected resource count.
3. Open Affected resources to find resource IDs or Amazon Resource Names (ARNs), which identify AWS resources.
4. For multiple accounts, enable organizational view in an organization with all features enabled. A delegated administrator, a member account authorized to manage the view, can access the aggregated events.

### Exam cues

- If the question says a maintenance notice identifies instances, think account-specific event and Affected resources, because the event concerns the account's resources.
- If the question says a team needs a central view across accounts, think organizational view and a delegated administrator, because the view aggregates organization events.
- If the question says a regional service is impaired, think public event, because public events describe regional service availability rather than a particular account.
- If the question says an Amazon EKS cluster version is approaching the end of standard support, think AWS Health, because EKS sends a notice to accounts with affected clusters.

### Remember

- The account event log covers the past 90 days.
- Planned lifecycle resource status is Pending, Unknown, or Resolved. It usually refreshes every 24 hours and can take up to 72 hours.

> **Trap:** A public event is not proof that a particular account resource is affected. Check the account-specific event and affected resources.
