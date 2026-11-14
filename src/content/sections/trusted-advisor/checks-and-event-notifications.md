---
title: Checks and event notifications
level: associate
order: 10
facts:
  - id: recommendations
    text: Trusted Advisor inspects AWS environments and recommends ways to reduce costs, improve availability and performance, or address security gaps.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html
  - id: categories
    text: Check categories are Cost optimization, Performance, Security, Fault tolerance, Service limits and Operational Excellence.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html#view-check-categories
  - id: basic-security-examples
    text: Basic Support includes checks for S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html
  - id: basic
    text: Basic Support provides all Service Limits checks and selected Security and Fault tolerance checks in the console; automatic check updates are unavailable.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html
  - id: full
    text: Business Support+, Enterprise Support and Unified Operations provide console and Trusted Advisor API access to all checks.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html
  - id: legacy
    text: Developer Support, Business Support and Enterprise On-Ramp are discontinued on January 1, 2027, but remain available in AWS GovCloud (US).
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html
  - id: api-legacy
    text: Business, Enterprise On-Ramp or Enterprise Support can use the Support API in Regions without a current eligible plan or before transition.
    source: https://docs.aws.amazon.com/awssupport/latest/APIReference/API_RefreshTrustedAdvisorCheck.html
  - id: eventbridge
    text: EventBridge rules can match Trusted Advisor check status changes and invoke targets such as Lambda or SNS.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: event-region
    text: Trusted Advisor events are emitted to EventBridge in US East (N. Virginia), and delivery is best effort.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: event-support
    text: Creating an EventBridge rule for Trusted Advisor checks requires Business Support+, Enterprise Support or Unified Operations.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: event-status
    text: EventBridge check item statuses are ERROR, INFO, OK and WARN.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: metrics
    text: When checks refresh, Trusted Advisor publishes check-result metrics to CloudWatch; alarms in US East (N. Virginia) can notify an SNS topic.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-metrics-ta.html
  - id: email
    text: Trusted Advisor sends a check summary by email once a week to configured recipients.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html#notification-preferences
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
  - id: low-utilization
    text: The Low Utilization Amazon EC2 Instances check identifies low-usage instances for cost review.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html#view-specific-checks
  - id: tags
    text: The console can filter check results by resource tag.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html#filter-check-results
  - id: ec2-tags-api
    text: The EC2 DescribeTags API can retrieve tags filtered by resource ID.
    source: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeTags.html
  - id: scheduled-lambda
    text: EventBridge Scheduler can invoke a Lambda function on a recurring schedule.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-eventbridge-scheduler.html
  - id: sns-publish
    text: Messages published to an SNS topic are delivered on an attempted basis to its subscribed endpoints.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-publishing.html
  - id: ebs-underutilized
    text: The Underutilized Amazon EBS volumes check flags volumes that are unattached or have had very low write activity.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cost-optimization-checks.html#underutilized-amazon-ebs-volumes
  - id: cloudtrail-check
    text: The AWS CloudTrail Management Event Logging security check checks whether CloudTrail is recording management events in the account.
    source: https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html#aws-cloudtrail-man-events-log
diagrams:
  - id: trusted-advisor-events
    title: Check status notification
    width: 800
    height: 180
    nodes:
      - { id: advisor, label: Trusted Advisor, x: 20, y: 54, w: 160, h: 72, tone: mgmt, icon: trusted-advisor }
      - { id: events, label: EventBridge, x: 320, y: 54, w: 160, h: 72, tone: integration, icon: eventbridge }
      - { id: topic, label: SNS topic, x: 620, y: 54, w: 160, h: 72, tone: integration, icon: simple-notification-service }
    edges:
      - { from: advisor, to: events, step: 1 }
      - { from: events, to: topic, step: 2 }
    steps:
      - Trusted Advisor emits a check event to EventBridge in US East (N. Virginia).
      - A matching rule sends the event to an SNS topic.
cards:
  - id: trusted-advisor-001
    q: What does Trusted Advisor check, and how can its check events trigger automation?
    a: "Trusted Advisor recommends improvements across cost, performance, security, fault tolerance, service limits and operational excellence. EventBridge rules in us-east-1 can invoke targets such as Lambda or SNS; eligible support is required."
    facts: [categories, eventbridge, event-region, event-support]
  - id: trusted-advisor-002
    q: Which Trusted Advisor checks can a Basic Support customer access?
    a: "All Service Limits checks and selected Security and Fault tolerance checks in the console. Automatic check updates are unavailable."
    facts: [basic]
  - id: trusted-advisor-003
    q: Which current support plans provide all Trusted Advisor checks and API access?
    a: "Business Support+, Enterprise Support and Unified Operations."
    facts: [full]
  - id: trusted-advisor-004
    q: A team wants immediate custom notifications for Trusted Advisor status changes. Where should it create the EventBridge rule?
    a: "US East (N. Virginia), or us-east-1. Trusted Advisor emits events there; delivery is best effort."
    facts: [event-region, eventbridge]
  - id: trusted-advisor-005
    q: Can a Trusted Advisor weekly summary email replace a timely check-status event notification?
    a: "No. The built-in summary is weekly. Use an EventBridge rule for check status events, noting that delivery is best effort."
    trap: true
    facts: [email, eventbridge, event-region]
  - id: trusted-advisor-006
    q: How can a CloudWatch alarm notify an SNS topic about Trusted Advisor check results?
    a: "Monitor the published Trusted Advisor metric with an alarm in US East (N. Virginia), and configure an SNS alarm action."
    facts: [metrics]
  - id: trusted-advisor-007
    q: How should a program retrieve fresh Trusted Advisor check results through the Support API?
    a: "Refresh a supported check, poll its refresh status until success, then call DescribeTrustedAdvisorCheckResult. Handle failed refreshes."
    facts: [refresh, refresh-status, refresh-outcome, result]
  - id: trusted-advisor-008
    q: Can every Trusted Advisor check be refreshed with RefreshTrustedAdvisorCheck?
    a: "No. Some automatically refreshed checks reject refresh requests."
    trap: true
    facts: [refresh]
  - id: trusted-advisor-009
    q: A team wants to investigate low-usage EC2 instances with Trusted Advisor before reducing costs. Which check and filter help?
    a: "Use Low Utilization Amazon EC2 Instances and filter check results by resource tag."
    facts: [low-utilization, tags]
  - id: trusted-advisor-010
    q: Which endpoint must an application use for Trusted Advisor operations in the AWS Support API?
    a: "The US East (N. Virginia) endpoint."
    facts: [api-endpoint]
  - id: trusted-advisor-011
    q: How can a team run a scheduled custom Trusted Advisor check notification?
    a: "Schedule a Lambda function to query check results through the Support API and publish a message to an SNS topic."
    facts: [scheduled-lambda, result, sns-publish, api-endpoint]
  - id: trusted-advisor-012
    q: How can automation select tagged low-utilization EC2 instances from Trusted Advisor events?
    a: "Route check events to Lambda, retrieve EC2 tags for the resource and apply the team's selection policy before acting."
    facts: [low-utilization, eventbridge, ec2-tags-api]
  - id: trusted-advisor-013
    q: Which security checks can a Basic Support customer use in Trusted Advisor?
    a: "Examples include S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports."
    facts: [basic-security-examples]
  - id: trusted-advisor-014
    q: Which AWS Trusted Advisor check finds EBS volumes that are unattached or barely used?
    a: Underutilized Amazon EBS volumes, a cost optimization check.
    facts: [ebs-underutilized]
  - id: trusted-advisor-015
    q: Which AWS Trusted Advisor category checks whether AWS CloudTrail is logging management events?
    a: Security, through the AWS CloudTrail Management Event Logging check.
    facts: [cloudtrail-check]
---
AWS Trusted Advisor inspects your AWS environment and recommends improvements to cost, availability, performance and security. A check evaluates resources and reports results for review.

### How it works

1. Trusted Advisor checks resources in categories including cost optimization, security, performance, fault tolerance, service limits and operational excellence.
2. Review check results and recommended actions. Security examples include S3 bucket permissions, root account multi-factor authentication (MFA), and security groups with unrestricted ports. The low-utilization EC2 check identifies instances for cost review; the console can filter results by resource tag.
3. Configure notifications: a weekly summary email, an EventBridge rule for check status events, or a CloudWatch metric alarm that sends to an SNS topic.
4. For custom polling, use the Support API in US East (N. Virginia). Refresh a supported check, poll its refresh status until success, then retrieve the result. Handle a failed refresh rather than treating it as fresh data.

### Exam cues

- If the question says a team needs custom check status notifications, think EventBridge in US East (N. Virginia), because Trusted Advisor emits events there. Delivery is best effort.
- If the question says alert on a check-result metric, think a CloudWatch alarm and SNS, because Trusted Advisor publishes metrics when checks refresh.
- If the question says a scheduled function needs fresh check results, think Support API refresh, status polling and result retrieval, because retrieving a result alone does not refresh it.
- If the question says notify on a schedule, think EventBridge Scheduler invoking Lambda to query results and publish to SNS, because the Support API exposes check results.
- If the question says automate selection of low-usage EC2 instances by tag, think check events routed to Lambda, because the function can retrieve resource tags and apply the team's policy before acting. A recommendation alone does not establish that deletion is safe.

### Remember

| Access | Checks and tools |
| --- | --- |
| Basic Support | All Service Limits checks and selected Security and Fault tolerance checks in the console; no automatic check updates |
| Business Support+, Enterprise Support, Unified Operations | All checks in the console and Trusted Advisor API; eligible for EventBridge rules |

- Business Support and Enterprise On-Ramp are discontinued in January 2027, but remain available in AWS GovCloud (US). Legacy Support API eligibility also applies before transition or in Regions without a current eligible plan.
- Weekly email is a summary, not an immediate event. EventBridge events are best effort.
- Some automatically refreshed checks reject API refresh requests.

> **Trap:** A successful refresh request does not mean new results are ready. Poll for refresh success before reading fresh results.
