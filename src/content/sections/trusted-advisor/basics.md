---
title: "Trusted Advisor basics"
level: foundational
order: 5
facts:
  - id: recommends
    text: "AWS Trusted Advisor inspects an AWS environment and recommends ways to save money, improve availability and performance, and close security gaps."
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html#trusted-advisor
  - id: basic-checks
    text: "With Basic Support, Trusted Advisor offers all Service Limits checks and selected Security and Fault Tolerance checks."
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html#trusted-advisor
  - id: categories
    text: Checks cover Security, Performance, Cost optimization, Service limits, Fault tolerance and Operational Excellence.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html#view-check-categories
  - id: eventbridge
    text: EventBridge rules can match Trusted Advisor check status changes and invoke targets such as Lambda or SNS.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: event-region
    text: Trusted Advisor events are emitted to EventBridge in US East (N. Virginia), and delivery is best effort.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: event-support
    text: Creating an EventBridge rule for Trusted Advisor checks requires Business Support+, Enterprise Support or Unified Operations.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: basic-security-examples
    text: Basic Support includes checks for S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports.
    source: https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html
  - id: cloudtrail-check
    text: The AWS CloudTrail Management Event Logging security check checks whether CloudTrail is recording management events in the account.
    source: https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html#aws-cloudtrail-man-events-log
  - id: ebs-underutilized
    text: The Underutilized Amazon EBS volumes check flags volumes that are unattached or have had very low write activity.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cost-optimization-checks.html#underutilized-amazon-ebs-volumes
cards:
  - id: trusted-advisor-016
    q: "Which AWS service recommends cost savings, security fixes and service limit warnings based on AWS best practices?"
    a: "AWS Trusted Advisor."
    facts: [recommends]
  - id: trusted-advisor-017
    q: "Does an account on Basic Support get every AWS Trusted Advisor check?"
    a: "No. Basic Support gets all Service Limits checks and selected Security and Fault Tolerance checks; the full set needs a higher support plan."
    trap: true
    facts: [basic-checks]
  - id: trusted-advisor-001
    q: What does Trusted Advisor check, and how can its check events trigger automation?
    a: "Trusted Advisor recommends improvements in security, performance, cost, service limits, fault tolerance and operational excellence. EventBridge rules in us-east-1 can invoke targets such as Lambda or SNS; eligible support is required."
    facts: [categories, eventbridge, event-region, event-support]
  - id: trusted-advisor-013
    q: Which security checks can a Basic Support customer use in Trusted Advisor?
    a: "Examples include S3 bucket permissions, MFA on the root account and security groups with specific unrestricted ports."
    facts: [basic-security-examples]
  - id: trusted-advisor-015
    q: Which AWS Trusted Advisor category checks whether AWS CloudTrail is logging management events?
    a: Security, through the AWS CloudTrail Management Event Logging check.
    facts: [cloudtrail-check]
  - id: trusted-advisor-014
    q: Which AWS Trusted Advisor check finds EBS volumes that are unattached or barely used?
    a: Underutilized Amazon EBS volumes, a cost optimization check.
    facts: [ebs-underutilized]
---
AWS Trusted Advisor checks an account against AWS best practices and recommends improvements for cost, performance, security, fault tolerance and service limits.

### How it works

1. Trusted Advisor inspects the resources in the account.
2. Each check reports items that need attention, with a recommendation.
3. The support plan decides how many checks are available.

### Exam cues

- If the question says best-practice recommendations to cut cost or close security gaps, think Trusted Advisor.

### Remember

- Basic Support: Service Limits checks plus selected Security and Fault Tolerance checks.

> **Trap:** Trusted Advisor recommends; it does not fix resources by itself.
