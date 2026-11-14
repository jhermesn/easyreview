---
title: Event buses and patterns
level: associate
order: 10
facts:
  - id: bus-routing
    text: A rule on an event bus compares arriving events with a pattern and sends matching events to its targets.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html
  - id: bus-types
    text: The default bus receives AWS service events; custom Classic buses receive application events; partner
      buses receive SaaS partner events.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is-how-it-works-concepts.html
  - id: classic-scope
    text: Custom Event Bus - Classic uses rules and targets, while the Custom Event Bus uses subscribers.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus.html
  - id: subscriber-target
    text: Each Custom Event Bus subscriber filters events, optionally transforms them, and delivers matching
      events to one target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus.html
  - id: five-targets
    text: A rule can have at most five targets.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets
  - id: pattern-fields
    text: An event must contain all pattern fields at the same nesting level; fields omitted from the pattern are
      ignored.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern.html#eb-create-pattern
  - id: pattern-and-or
    text: Pattern fields combine with AND, values in one array combine with OR, and $or combines alternatives
      across fields.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
  - id: exact-match
    text: Ordinary string matching is case sensitive.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern.html#eb-create-pattern-considerations
  - id: prefix
    text: The prefix operator matches the beginning of a string.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-prefix-matching
  - id: suffix
    text: The suffix operator matches the end of a string.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-suffix-matching
  - id: numeric
    text: The numeric operator compares numeric values and ranges.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#filtering-numeric-matching
  - id: exists
    text: The exists operator tests the presence or absence of a leaf field.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-exists-matching
  - id: anything-but
    text: The anything-but operator excludes specified values.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-anything-but
  - id: ignore-case
    text: The equals-ignore-case operator matches strings regardless of letter case.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-equals-ignore-case-matching
  - id: cidr
    text: The cidr operator matches IP addresses within an IPv4 or IPv6 network range.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
  - id: test-pattern
    text: TestEventPattern tests whether a supplied event matches an event pattern.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern.html#eb-create-pattern
  - id: ec2-state
    text: EC2 sends EC2 Instance State-change Notification events with source aws.ec2 and state in detail.state.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: trail-required
    text: CloudTrail API events use detail-type AWS API Call via CloudTrail on the default bus and require a trail
      with logging enabled.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: api-filter
    text: CloudTrail API events expose eventSource and eventName inside detail for rule matching.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-log-s3-data-events.html
  - id: s3-data
    text: Matching S3 object API calls through CloudTrail requires a trail configured for the relevant data events.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-log-s3-data-events.html
  - id: read-only
    text: Read-only CloudTrail management events require rule state ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS;
      forwarding them requires that state on both forwarding and receiving rules.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: pipeline-failed
    text: CodePipeline emits CodePipeline Pipeline Execution State Change events, and rules can select FAILED
      executions and send SNS notifications.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
  - id: guardduty-findings
    text: GuardDuty publishes findings to EventBridge for automated processing and notification.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html
  - id: securityhub-findings
    text: Rules can match source aws.securityhub and detail-type Security Hub Findings - Imported and filter
      finding attributes.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html
  - id: direct-targets
    text: Rule targets include SNS, Lambda, Step Functions, Systems Manager Automation, Run Command, ECS tasks,
      and the EBS CreateSnapshot API.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-console-targets
  - id: run-command
    text: An EventBridge rule can run a Systems Manager Command document when an Auto Scaling group creates a
      managed node.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-systems-manager-targets.html
  - id: target-permissions
    text: EventBridge needs permission to invoke the target resource.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets
  - id: input-transform
    text: An input transformer extracts values from the original event using JSONPath and inserts them into a
      template sent to a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html#eb-transform-target-input
  - id: schema-bindings
    text: A schema describes event structure; EventBridge can infer schemas and generate downloadable code
      bindings.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema.html
  - id: schema-versions
    text: Schema discovery creates a new schema version when event structure changes.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schemas-infer.html#eb-schemas-infer
  - id: schema-original
    text: Schema discovery infers the original event, not the target payload produced by an input transformer.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema.html
  - id: api-destination
    text: An API destination is an HTTPS endpoint used as a rule or pipe target; its connection defines
      authorization and connectivity.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
  - id: api-timeout
    text: API destination requests time out after five seconds and timed-out requests are retried according to the
      retry policy.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
  - id: codedeploy-events
    text: CodeDeploy sends CodeDeploy Deployment State-change Notification events with source aws.codedeploy.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-codedeploy.html
  - id: beanstalk-events
    text: Elastic Beanstalk emits environment health transitions and operation state changes for EventBridge
      response rules.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.eventbridge.html
  - id: asg-lifecycle
    text: Auto Scaling lifecycle hooks generate EventBridge events when instances enter a wait state.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html
  - id: asg-scaling
    text: Auto Scaling emits successful and unsuccessful scaling events that EventBridge rules can match.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html
  - id: asg-refresh
    text: Auto Scaling instance refresh emits events for checkpoints, start, success, failure, cancellation, and
      rollback state changes.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-eventbridge-events.html
  - id: health-exposure
    text: An AWS Health AWS_RISK_CREDENTIALS_EXPOSED event can trigger a rule that starts a Step Functions
      remediation workflow.
    source: https://aws.amazon.com/blogs/compute/automate-your-it-operations-using-aws-step-functions-and-amazon-cloudwatch-events/
  - id: ta-events
    text: Trusted Advisor check status changes can trigger EventBridge targets, and those events are emitted in US
      East (N. Virginia).
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-events-ta.html
  - id: ta-weekly
    text: Trusted Advisor built-in email notifications summarize results weekly.
    source: https://docs.aws.amazon.com/awssupport/latest/user/get-started-with-aws-trusted-advisor.html
  - id: ta-low-use
    text: Trusted Advisor has a low-utilization EC2 instance check for identifying potential cost savings.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cost-optimization-checks.html
  - id: xray-insights
    text: Enable insights and notifications on an X-Ray group to send insight events through EventBridge.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html
  - id: org-events
    text: Organizations activity can trigger EventBridge notification rules in US East (N. Virginia).
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_cloudwatch-integration.html
  - id: s3-to-eventbridge
    text: Once EventBridge notifications are turned on for a bucket, S3 sends events such as Object Created to EventBridge, where a rule can start a Step Functions workflow.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html
diagrams:
  - id: eventbridge-bus-routing
    title: "Classic bus: select events before invoking a target"
    width: 1030
    height: 200
    nodes:
      - id: producer
        label: Application
        sub: publishes events
        icon: res-generic-application
        x: 30
        y: 60
        w: 190
        h: 86
        tone: user
      - id: bus
        label: Event bus
        sub: receives events
        icon: eventbridge
        x: 290
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: rule
        label: Rule
        sub: matches a pattern
        icon: res-eventbridge-rule
        x: 550
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: target
        label: Lambda
        sub: invoked on a match
        icon: lambda
        x: 810
        y: 60
        w: 190
        h: 86
        tone: compute
    edges:
      - from: producer
        to: bus
        step: 1
      - from: bus
        to: rule
        step: 2
      - from: rule
        to: target
        step: 3
    steps:
      - A producer sends an event to the bus.
      - The rule evaluates its event pattern.
      - EventBridge invokes the authorized target when the event matches.
cards:
  - id: eventbridge-001
    q: How does an EventBridge event-bus rule select events and how many targets can it invoke?
    a: It compares event fields with a JSON event pattern and sends matches to up to five targets.
    facts:
      - bus-routing
      - pattern-fields
      - five-targets
  - id: eventbridge-002
    q: An operations team wants an EventBridge workflow when an EC2 instance stops. What should the rule match?
    a: Match source `aws.ec2`, detail-type `EC2 Instance State-change Notification`, and `detail.state` equal to
      `stopped`; select an authorized response target.
    facts:
      - ec2-state
      - bus-routing
      - target-permissions
  - id: eventbridge-003
    q: An EventBridge rule must detect S3 object API calls through CloudTrail. What logging and event fields are
      needed?
    a: Enable a trail with the relevant S3 data events. Match `AWS API Call via CloudTrail`, `detail.eventSource`,
      and `detail.eventName` on the default bus.
    facts:
      - trail-required
      - api-filter
      - s3-data
  - id: eventbridge-014
    q: A team wants EventBridge to route selected GuardDuty or Security Hub CSPM findings to response automation.
      What should it configure?
    a: Create a finding event pattern and choose an authorized Lambda, Step Functions, or Systems Manager
      Automation target. Security Hub CSPM finding attributes can narrow the rule.
    facts:
      - guardduty-findings
      - securityhub-findings
      - direct-targets
      - target-permissions
  - id: eventbridge-015
    q: A team wants an email notification when CodePipeline execution fails. How should EventBridge route the
      event?
    a: Match `CodePipeline Pipeline Execution State Change` with state `FAILED` and target SNS.
    facts:
      - pipeline-failed
  - id: eventbridge-016
    q: Which EventBridge buses receive AWS service, custom application, and SaaS partner events in the Classic
      rules model?
    a: Default bus for AWS service events, custom Classic bus for application events, and partner bus for SaaS
      partner events.
    facts:
      - bus-types
  - id: eventbridge-017
    q: An EventBridge pattern must accept either of two states and also require one source. How do its conditions
      combine?
    a: Put both states in one array for OR and specify the source in a separate field for AND. Use `$or` for
      alternatives across fields.
    facts:
      - pattern-and-or
  - id: eventbridge-018
    q: Which EventBridge operators match a filename ending, a network range, and a string regardless of case?
    a: Use `suffix`, `cidr`, and `equals-ignore-case`, respectively. Ordinary string matching is case sensitive.
    facts:
      - suffix
      - cidr
      - ignore-case
      - exact-match
  - id: eventbridge-019
    q: An EventBridge target needs a short message containing selected fields from the original event. What avoids
      a formatting Lambda?
    a: Use an input transformer with JSONPath variables and an input template.
    facts:
      - input-transform
  - id: eventbridge-020
    q: An application team wants EventBridge to track changing event shapes and generate language bindings. Which
      features fit?
    a: Enable schema discovery and use the schema registry and downloadable code bindings. Changes create new
      schema versions; discovery sees the original event.
    facts:
      - schema-bindings
      - schema-versions
      - schema-original
  - id: eventbridge-021
    q: An EventBridge rule must call an HTTPS application with configured authorization. Which target fits and
      what response deadline matters?
    a: Use an API destination with a connection. The endpoint must respond within five seconds or EventBridge
      times out and applies its retry policy.
    facts:
      - api-destination
      - api-timeout
  - id: eventbridge-022
    q: An EventBridge rule must launch an ECS task or run a command on a new Auto Scaling managed node. Is a
      Lambda intermediary required?
    a: No. ECS tasks and Systems Manager Run Command are direct rule targets. Configure target permissions and
      parameters.
    facts:
      - direct-targets
      - run-command
      - target-permissions
  - id: eventbridge-038
    q: A team needs an EventBridge response when an Auto Scaling instance is held for launch preparation, and
      progress alerts during an instance refresh. Which events should it select?
    a: Select lifecycle action events for the hook wait state and instance refresh events for checkpoints and
      refresh status changes.
    facts:
      - asg-lifecycle
      - asg-refresh
  - id: eventbridge-039
    q: A team wants EventBridge to start remediation for an exposed IAM access key reported by AWS Health. Which
      event identifies the condition?
    a: Match the AWS Health event type code `AWS_RISK_CREDENTIALS_EXPOSED` and target a Step Functions remediation
      workflow.
    facts:
      - health-exposure
  - id: eventbridge-040
    q: A team needs EventBridge automation on Trusted Advisor status changes sooner than the built-in email
      summary. What should it configure?
    a: Create rules for Trusted Advisor check status changes in US East (N. Virginia). Built-in summary emails are
      weekly; a low-utilization EC2 finding can supply a cost-review candidate.
    facts:
      - ta-events
      - ta-weekly
      - ta-low-use
  - id: eventbridge-041
    q: A team enabled an X-Ray group but receives no EventBridge notifications for detected fault-rate insights.
      Which settings are required?
    a: Enable both insights and notifications on the group.
    facts:
      - xray-insights
  - id: eventbridge-050
    q: How can every new object in an S3 bucket start a Step Functions workflow without a Lambda function in between?
    a: Turn on EventBridge notifications for the bucket and add an EventBridge rule on Object Created that targets the state machine.
    facts: [s3-to-eventbridge]
---
An EventBridge event bus routes JSON events, which are messages describing something that happened, to matching targets. A target is the resource or endpoint that receives the event. Think of a Classic bus as a sorting desk: rules select events, then send them to the configured destinations.

### How it works

1. Choose the bus for the producer, the system sending events. The default bus receives AWS service events. A custom Classic bus separates application traffic, and a partner bus receives events from a software as a service (SaaS) provider.
2. Create a rule with an event pattern, a JSON filter over fields such as `source`, `detail-type`, and `detail.state`. Required fields must exist at the same nesting level. Omitted fields are ignored.
3. Combine different fields with AND and values in one array with OR. Use `$or` for alternatives across fields. Test the pattern with `TestEventPattern`.
4. Grant permission to invoke each target. A rule can send matches directly to SNS, Lambda, Step Functions, Systems Manager Automation or Run Command, or an ECS task.
5. If the target needs a different message shape, use an input transformer. JSONPath, a path expression that selects a JSON value, extracts fields from the original event into a target template.

| Matching need | Operator | Meaning |
| --- | --- | --- |
| Start of a string | `prefix` | Matches the beginning of the value |
| End of a string, such as a file extension | `suffix` | Matches the end of the value |
| Any letter case | `equals-ignore-case` | Ordinary string matching is case sensitive |
| Number or range | `numeric` | Compares numeric values and ranges |
| Field present or absent | `exists` | Tests a leaf field |
| Everything except some values | `anything-but` | Excludes the listed values |
| IP address in a network | `cidr` | Matches an IPv4 or IPv6 range |

AWS API calls reach the default bus as `AWS API Call via CloudTrail` events only when a trail with logging is enabled. Match `detail.eventSource` and `detail.eventName`. S3 object calls also need the trail's data events, and read-only management events need the rule state `ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS`.

A schema describes an event's structure. Schema discovery infers schemas from the original events, creates a new version when the structure changes, and offers downloadable code bindings. An API destination sends events to an HTTPS endpoint, with a connection that holds its authorization.

The Custom Event Bus model uses subscribers instead of rules. Each subscriber filters events, can transform them, and delivers to one target.

### Exam cues

- If the question says react when an EC2 instance stops, think a rule on `aws.ec2` with `EC2 Instance State-change Notification` and `detail.state`, because EC2 publishes that state in the event detail.
- If the question says catch a specific API call, think `AWS API Call via CloudTrail` with `eventSource` and `eventName`, because those fields sit inside `detail` and need an enabled trail.
- If the question says email the team when a pipeline fails, think a rule on `CodePipeline Pipeline Execution State Change` with state `FAILED` and an SNS target.
- If the question says route GuardDuty or Security Hub findings to remediation, think a finding pattern with a Lambda, Step Functions, or Systems Manager Automation target.
- If the question says an exposed access key must start a remediation workflow, think the AWS Health `AWS_RISK_CREDENTIALS_EXPOSED` event with a Step Functions target.
- If the question says reformat an event for a target without code, think an input transformer, because JSONPath variables fill a target template.
- If the question says call a third-party HTTPS API with credentials, think an API destination with a connection, because it holds the authorization.

### Remember

- At most five targets per rule.
- API destination requests time out after five seconds, then follow the retry policy.
- Trusted Advisor and Organizations events arrive in US East (N. Virginia). Trusted Advisor's built-in emails are weekly.
- X-Ray insight events need both insights and notifications enabled on the group.
- Auto Scaling emits lifecycle hook, scaling, and instance refresh events. CodeDeploy uses source `aws.codedeploy`, and Elastic Beanstalk emits health transitions and operation state changes.

> **Trap:** A rule that matches CloudTrail API calls receives nothing without a trail that has logging enabled, and S3 object calls also need the trail's data events.

> **Trap:** Schema discovery sees the original event, not the payload an input transformer sends to the target.
