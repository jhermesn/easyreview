---
title: "PLACEHOLDER trusted-advisor/operations-in-depth"
level: professional
order: 20
facts:
  - id: event-region
    text: Trusted Advisor events are emitted to EventBridge in US East (N. Virginia), and delivery is best effort.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: eventbridge
    text: EventBridge rules can match Trusted Advisor check status changes and invoke targets such as Lambda or SNS.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: refresh
    text: The Support API can refresh eligible checks; some automatically refreshed checks reject refresh requests.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_RefreshTrustedAdvisorCheck.html
  - id: refresh-status
    text: Poll refresh status after submitting a refresh request to determine when new data is ready.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#getcheckstatus
  - id: refresh-outcome
    text: Refresh status success means the check refreshed successfully; abandoned means refresh failed.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_TrustedAdvisorCheckRefreshStatus.html
  - id: result
    text: DescribeTrustedAdvisorCheckResult returns check results but does not generate updated results.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#requestcheck
  - id: api-endpoint
    text: Trusted Advisor operations in the Support API require the US East (N. Virginia) endpoint.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_DescribeTrustedAdvisorCheckResult.html
  - id: basic-security-examples
    text: Basic Support includes checks for S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html
  - id: cloudtrail-check
    text: The AWS CloudTrail Management Event Logging security check checks whether CloudTrail is recording management events in the account.
    source: https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html#aws-cloudtrail-man-events-log
cards:
  - id: trusted-advisor-004
    q: A team wants immediate custom notifications for Trusted Advisor status changes. Where should it create the EventBridge rule?
    a: "US East (N. Virginia), or us-east-1. Trusted Advisor emits events there; delivery is best effort."
    facts: [event-region, eventbridge]
  - id: trusted-advisor-007
    q: How should a program retrieve fresh Trusted Advisor check results through the Support API?
    a: "Refresh a supported check, poll its refresh status until success, then call DescribeTrustedAdvisorCheckResult. Handle failed refreshes."
    facts: [refresh, refresh-status, refresh-outcome, result]
  - id: trusted-advisor-008
    q: Can every Trusted Advisor check be refreshed with RefreshTrustedAdvisorCheck?
    a: "No. Some automatically refreshed checks reject refresh requests."
    trap: true
    facts: [refresh]
  - id: trusted-advisor-010
    q: Which endpoint must an application use for Trusted Advisor operations in the AWS Support API?
    a: "The US East (N. Virginia) endpoint."
    facts: [api-endpoint]
  - id: trusted-advisor-013
    q: Which security checks can a Basic Support customer use in Trusted Advisor?
    a: "Examples include S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports."
    facts: [basic-security-examples]
  - id: trusted-advisor-015
    q: Which AWS Trusted Advisor category checks whether AWS CloudTrail is logging management events?
    a: Security, through the AWS CloudTrail Management Event Logging check.
    facts: [cloudtrail-check]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
