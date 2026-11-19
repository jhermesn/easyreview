---
title: Check automation and security
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
---
AWS Trusted Advisor check results can drive custom notifications or be retrieved through the AWS Support API. Security checks also identify issues such as S3 bucket permissions and whether AWS CloudTrail records management events. [Event notifications](https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html), [security checks](https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html#aws-cloudtrail-man-events-log)

### How it works

1. Create an EventBridge rule in US East (N. Virginia) to match Trusted Advisor check status changes and invoke a target such as Lambda or SNS. Event delivery is best effort. [EventBridge monitoring](https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html)
2. To retrieve fresh results through the Support API, use the US East (N. Virginia) endpoint and request a refresh for an eligible check. Some automatically refreshed checks reject refresh requests. [API endpoint](https://docs.aws.amazon.com/awssupport/latest/APIReference/API_DescribeTrustedAdvisorCheckResult.html), [refresh](https://docs.aws.amazon.com/awssupport/latest/APIReference/API_RefreshTrustedAdvisorCheck.html)
3. Poll refresh status until it reports success, then call `DescribeTrustedAdvisorCheckResult`. Handle an abandoned status as a failed refresh. The result operation does not generate updated results. [Polling](https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#getcheckstatus), [refresh status](https://docs.aws.amazon.com/awssupport/latest/APIReference/API_TrustedAdvisorCheckRefreshStatus.html), [results](https://docs.aws.amazon.com/awssupport/latest/user/trustedadvisor.html#requestcheck)

### Exam cues

- If the question says custom notifications for check status changes, think EventBridge in US East (N. Virginia), because Trusted Advisor emits events there on a best effort basis.
- If the question says a program needs fresh results, think refresh, poll and retrieve, because reading a result does not refresh the check.
- If the question says CloudTrail management event logging, think the Trusted Advisor Security category and its AWS CloudTrail Management Event Logging check. [Security check](https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html#aws-cloudtrail-man-events-log)
- If the question says security checks available with Basic Support, think S3 bucket permissions, root account multi-factor authentication (MFA), and security groups with specific unrestricted ports. [Check reference](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html)

### Remember

- Trusted Advisor events and Support API operations use US East (N. Virginia).
- Refresh status `success` means the check refreshed; `abandoned` means it failed.

> **Trap:** A result request does not refresh a check. A refresh request also does not guarantee that every check accepts it or that fresh results are ready immediately.
