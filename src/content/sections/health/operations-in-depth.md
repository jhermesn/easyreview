---
title: "PLACEHOLDER health/operations-in-depth"
level: professional
order: 30
facts:
  - id: organization
    text: Organizational view aggregates Health events across an AWS organization and supports a delegated administrator.
    source: https://docs.aws.amazon.com/health/latest/ug/aggregate-events.html#aggregate-events
  - id: organization-prerequisite
    text: Organizational view requires an organization with all features enabled.
    source: https://docs.aws.amazon.com/health/latest/ug/aggregate-events.html#prerequisites-organizational-view
  - id: lifecycle-status
    text: Planned lifecycle event resource statuses are Pending, Unknown, or Resolved and usually refresh every 24 hours but can take up to 72 hours.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#event-details
  - id: history
    text: The account event log shows events from the past 90 days.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-account-views.html#aws-health-account-views
cards:
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
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
