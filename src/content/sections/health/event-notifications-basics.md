---
title: Event notification basics
level: associate
order: 15
facts:
  - id: delivery
    text: AWS Health sends events to Amazon EventBridge.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: matching
    text: An EventBridge rule invokes its targets when an event matches the rule.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: sns
    text: An Amazon SNS topic can be a target for an EventBridge rule that handles AWS Health events.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: lambda
    text: An AWS Lambda function can be a target for an EventBridge rule that handles AWS Health events.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: automation
    text: An EventBridge rule can invoke an AWS Systems Manager Automation document in response to an AWS Health event.
    source: https://docs.aws.amazon.com/health/latest/ug/automating-instance-actions.html
  - id: scheduled
    text: AWS Health can notify an account about scheduled updates to its resources.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: issues
    text: AWS Health reports service issues that affect resources in an account.
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html
  - id: action
    text: EventBridge targets can send notifications or take corrective action in response to AWS Health events.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: rule
    text: EventBridge rules match AWS Health events and invoke targets such as SNS, Lambda, and SQS.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: source
    text: The source value aws.health matches both public and account-specific Health events; aws.health* does not.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
cards:
  - id: health-021
    q: A team wants an automatic response to an AWS Health event affecting its resources. Which services can route and run the response?
    a: Amazon EventBridge can invoke AWS Systems Manager Automation or AWS Lambda as a target for a matching event.
    facts: [delivery, matching, automation, lambda]
  - id: health-022
    q: Does AWS Health require an Amazon SNS target for every Amazon EventBridge rule that handles its events?
    a: No. A rule can target AWS Lambda or AWS Systems Manager Automation for automated actions.
    facts: [lambda, automation]
    trap: true
  - id: health-001
    q: How can a team receive notifications for AWS Health events affecting its account?
    a: Create an EventBridge rule matching source `aws.health` and target an SNS topic.
    facts: [rule, source]
---
AWS Health reports service issues and scheduled changes that affect resources. It sends events to Amazon EventBridge, where a rule can route them for notification or an automated response.

### How it works

1. AWS Health sends an event to EventBridge.
2. An EventBridge rule checks the event against its pattern. The pattern uses the exact source `aws.health`.
3. When the event matches, the rule invokes a target such as an Amazon SNS topic, an AWS Lambda function, or an AWS Systems Manager Automation document.
4. The target can notify the team or take corrective action.

### Exam cues

- If the question says notify a team about a scheduled change affecting its resources, think AWS Health, EventBridge and Amazon SNS, because a matching rule can invoke an SNS topic.
- If the question says respond automatically to an AWS Health event, think an EventBridge rule with a Lambda or Systems Manager Automation target, because the rule can invoke automation.

### Remember

- EventBridge rules invoke targets for matching AWS Health events.
- Targets include Amazon SNS, AWS Lambda and AWS Systems Manager Automation.
- Match the source `aws.health` exactly; the pattern `aws.health*` does not match.

> **Trap:** Amazon SNS is one possible target. EventBridge can also invoke automation for an AWS Health event.
