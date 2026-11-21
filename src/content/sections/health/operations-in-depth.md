---
title: Organizational view and lifecycle status
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
AWS Health organizational view brings events from across an AWS organization into one view. It supports a delegated administrator so a member account can access those events for daily operations.

### How it works

1. Enable organizational view for an organization with all features enabled.
2. Delegate administrator access to a member account to use the aggregated view.
3. For a planned lifecycle event, check the affected resource status. The status list can take time to reflect a change.
4. Use the account event log to review recent account events.

### Exam cues

- If the question says a team needs a central view without daily use of the management account, think organizational view and a delegated administrator, because a member account can access aggregated events.
- If the question says a resource still shows Pending after remediation, think delayed status refresh, because the affected resources list is not updated immediately.
- If the question asks how far back to look for account events, think the account event log, because it covers the past 90 days.

### Remember

- Organizational view requires all features enabled in the organization.
- Planned lifecycle resource statuses are Pending, Unknown, or Resolved. The list usually refreshes every 24 hours but can take up to 72 hours.
- The account event log covers the past 90 days.

> **Trap:** A resource can still show Pending after remediation while the affected resources list catches up.
