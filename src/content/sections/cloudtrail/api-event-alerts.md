---
title: API event alerts
level: associate
order: 60
facts:
  - id: metric-filter
    text: A CloudWatch Logs metric filter turns matching CloudTrail log events into a metric that a
      CloudWatch alarm can evaluate.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html#cloudwatch-alarms-for-cloudtrail
  - id: security-alert
    text: CloudTrail security group configuration changes can be matched by eventName and connected to a
      CloudWatch alarm and SNS notification.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html#cloudwatch-alarms-for-cloudtrail
  - id: root-alert
    text: AWS documents a metric filter on userIdentity.type Root, excluding service-invoked and
      AwsServiceEvent activity, with an alarm and SNS topic for root usage.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-1
  - id: eventbridge-trail
    text: CloudTrail-derived EventBridge events require a trail with logging enabled.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: eventbridge-bus
    text: CloudTrail events arrive on the default EventBridge event bus; a rule can forward them to
      another bus.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: eventbridge-types
    text: EventBridge uses AWS API Call via CloudTrail for API calls and AWS Console Signin via
      CloudTrail for sign-in attempts.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: write-rule
    text: EventBridge rules in ENABLED state match CloudTrail write management events.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: read-rule
    text: Read-only management events require EventBridge rule state
      ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS, including both forwarding and destination rules
      when forwarding.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: data-rule
    text: CloudTrail data events match normally enabled EventBridge rules only if the trail captures the
      relevant data event types.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: lambda-target
    text: An EventBridge rule can invoke a Lambda function as a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets
  - id: central-alert
    text: Organization trails cover the management and member accounts and members cannot change the
      trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: config-periodic
    text: The cloudtrail-enabled AWS Config rule evaluates periodically and reports NON_COMPLIANT when a
      trail is not enabled.
    source: https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-enabled.html#cloudtrail-enabled
  - id: config-remediation
    text: AWS Config remediation actions must be configured separately and use Systems Manager
      Automation documents.
    source: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
  - id: resume-trail
    text: StartLogging begins recording and log delivery for an existing trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StartLogging.html#API_StartLogging
  - id: create-log-group-route
    text: CloudWatch Logs records CreateLogGroup API calls as CloudTrail events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/logging_cw_api_calls_cwl.html#logging_cw_api_calls_cwl
  - id: subscription-filter
    text: PutSubscriptionFilter attaches a real-time CloudWatch Logs subscription, with Firehose
      supported as a destination.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter
  - id: organizations-alert-region
    text: AWS Organizations activity monitoring with CloudTrail and EventBridge is configured in
      us-east-1, and an SNS topic can receive matching events.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_cwe.html#tutorial-cwe-step1
  - id: root-identity
    text: The root user has unrestricted access to services and resources in its AWS account.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-1
diagrams:
  - id: cloudtrail-api-response
    title: React to a CloudTrail API event
    width: 800
    height: 190
    nodes:
      - id: trail
        label: CloudTrail
        sub: trail logging
        icon: cloudtrail
        x: 20
        y: 65
        w: 160
        h: 86
        tone: mgmt
        info: The trail must capture the activity of interest.
      - id: rule
        label: EventBridge
        sub: default bus rule
        icon: eventbridge
        x: 315
        y: 65
        w: 170
        h: 86
        tone: integration
        info: Match API events by detail-type and event details. Read-only management events require the
          special rule state.
      - id: function
        label: Lambda
        sub: response function
        icon: lambda
        x: 620
        y: 65
        w: 160
        h: 86
        tone: compute
        info: The matched rule invokes the configured Lambda target.
    edges:
      - from: trail
        to: rule
        step: 1
      - from: rule
        to: function
        step: 2
    steps:
      - CloudTrail sends the event to the default EventBridge bus.
      - The rule matches the event and invokes its Lambda target.
cards:
  - id: cloudtrail-013
    q: How can CloudTrail generate a notification when someone changes a security group or uses root
      credentials?
    a: Deliver the trail to CloudWatch Logs, create a matching metric filter, and connect its metric to
      a CloudWatch alarm and SNS topic.
    facts:
      - metric-filter
      - security-alert
      - root-alert
  - id: cloudtrail-014
    q: An active CloudTrail trail records read-only management calls, but an enabled EventBridge rule
      never invokes its target for them. What setting is missing?
    a: Set the rule state to ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS. The ordinary ENABLED state
      does not match read-only management events.
    trap: true
    facts:
      - eventbridge-trail
      - read-rule
      - write-rule
  - id: cloudtrail-023
    q: An AWS organization needs central auditing plus notifications about root usage. Which CloudTrail
      design fits?
    a: Use an organization trail, deliver to CloudWatch Logs, and add a root-usage metric filter, alarm
      and SNS topic. Members cannot change the trail.
    facts:
      - central-alert
      - metric-filter
      - root-alert
  - id: cloudtrail-037
    q: An AWS Config cloudtrail-enabled rule reports a stopped trail. Will evaluating the rule restart
      logging?
    a: No. Evaluation reports compliance. Configure remediation separately; StartLogging resumes an
      existing trail.
    trap: true
    facts:
      - config-periodic
      - config-remediation
      - resume-trail
  - id: cloudtrail-038
    q: A team forwards CloudTrail read-only management events to another EventBridge bus. Which rules
      need the special management-event state?
    a: Both the forwarding rule on the default bus and the matching rule on the destination bus need
      ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS.
    trap: true
    facts:
      - eventbridge-bus
      - read-rule
  - id: cloudtrail-039
    q: A team wants new CloudWatch log groups subscribed to Firehose automatically. How can it react to
      their creation using CloudTrail?
    a: Match CreateLogGroup in an EventBridge rule and invoke Lambda to call PutSubscriptionFilter for
      the new group. Keep the CloudTrail trail logging.
    facts:
      - create-log-group-route
      - lambda-target
      - subscription-filter
      - eventbridge-trail
      - eventbridge-bus
      - eventbridge-types
  - id: cloudtrail-046
    q: A team wants notifications when an AWS Organizations member attempts to leave. In which Region
      should it configure CloudTrail and EventBridge monitoring?
    a: Use us-east-1, US East (N. Virginia). Match the Organizations activity and route it to an SNS
      topic for notification.
    facts:
      - organizations-alert-region
      - eventbridge-trail
---
CloudTrail events can drive notifications or automated responses. A metric filter counts log records matching a pattern; an alarm evaluates that metric. EventBridge uses rules to match events on an event bus, the place events enter its routing system, and sends matches to targets. [CloudWatch alert examples](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html#cloudwatch-alarms-for-cloudtrail) · [EventBridge integration](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail)

### How it works

1. Keep a trail logging the activity of interest. For CloudWatch alarms, configure delivery to a CloudWatch Logs group.
2. Match security changes with a metric filter on `eventName`. The root user has unrestricted account access. To monitor root usage, AWS documents a filter on `userIdentity.type = Root` that excludes service-invoked activity and `AwsServiceEvent` records. Attach an alarm and SNS notification. [Root-usage filter](https://docs.aws.amazon.com/securityhub/latest/userguide/cloudwatch-controls.html#cloudwatch-1)
3. For an event-driven response, match CloudTrail-derived events on the default EventBridge bus. API requests use `AWS API Call via CloudTrail`; sign-in attempts use `AWS Console Signin via CloudTrail`. A Lambda function can be the target.
4. Set the rule state for the activity being watched. Read-only management calls need the special state below; data calls must also be selected by the trail. [AWS routing rules](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail)

| Activity | Trail requirement | EventBridge rule state |
|---|---|---|
| Write management event | Logging enabled | `ENABLED` |
| Read-only management event | Logging enabled | `ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS` |
| Data event | Relevant data type selected | `ENABLED` |

For new log groups, a rule can match `CreateLogGroup` and invoke Lambda to call `PutSubscriptionFilter`, attaching a subscription that streams matching logs to Firehose. A subscription is an ongoing log-delivery connection. [EventBridge targets](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets) · [Subscription API](https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter) · [CloudWatch Logs events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/logging_cw_api_calls_cwl.html#logging_cw_api_calls_cwl)

For AWS Organizations API activity, configure CloudTrail and EventBridge monitoring in `us-east-1`. An SNS topic can receive matching events for notifications. [Organizations monitoring](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_cwe.html#tutorial-cwe-step1)

### Exam cues

- If the question says send email for security group changes, think metric filter, alarm and SNS, because CloudWatch converts matching audit records into an alarm signal.
- If the question says automate a reaction to an API request, think an EventBridge rule and Lambda target, because the rule can route the matching CloudTrail event.
- If the question says detect a stopped trail and restore it, think periodic `cloudtrail-enabled` evaluation plus separately configured remediation, because compliance evaluation alone does not restart logging. `StartLogging` resumes an existing trail. [Config rule](https://docs.aws.amazon.com/config/latest/developerguide/cloudtrail-enabled.html#cloudtrail-enabled) · [Remediation](https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation)

### Remember

- CloudTrail-derived EventBridge events require an active trail and enter the default bus.
- Forwarded read-only management events need the special state on both the forwarding and destination rules.
- The `cloudtrail-enabled` Config rule runs periodically; remediation is a separate configuration.

> **Trap:** A default `ENABLED` EventBridge rule does not match read-only management events even when the trail records them.
