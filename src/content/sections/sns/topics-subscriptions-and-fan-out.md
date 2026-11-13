---
title: Topics, subscriptions, and fan-out
level: associate
order: 10
facts:
  - id: pubsub
    text: SNS asynchronously delivers messages from publishers to subscribers through topics.
    source: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#welcome
  - id: destinations
    text: SNS Standard topic destinations include SQS, Lambda, HTTP(S), email, SMS, mobile push, and Data Firehose.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-event-destinations.html#sns-event-destinations
  - id: push-poll
    text: SNS pushes notifications; SQS retains messages for applications to process later through polling.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html#sns-sqs-as-subscriber
  - id: fanout
    text: A topic can deliver a published message to multiple subscribed SQS queues.
    source: https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html#subscribe-sqs-queue-to-sns-topic
  - id: email-confirm
    text: Email subscriptions must be confirmed before receiving messages and are supported directly only on
      Standard topics.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-email-notifications.html
  - id: http-confirm
    text: HTTP(S) endpoints must handle SNS POST requests and confirm the subscription before notifications arrive.
    source: https://docs.aws.amazon.com/sns/latest/dg/SendMessageToHttp.prepare.html#SendMessageToHttp.prepare
  - id: fifo-queues
    text: SNS FIFO topics deliver to SQS FIFO and Standard queues; strict consumer ordering requires a FIFO queue.
    source: https://docs.aws.amazon.com/sns/latest/dg/fifo-message-delivery.html#fifo-message-delivery
  - id: fifo-endpoints
    text: SNS FIFO topics cannot directly deliver to email, HTTP(S), SMS, or mobile push endpoints; Lambda
      integration uses a subscribed SQS queue.
    source: https://docs.aws.amazon.com/sns/latest/dg/fifo-message-delivery.html#fifo-message-delivery
  - id: fifo-group
    text: SNS FIFO publishers set MessageGroupId; ordering is maintained within each message group.
    source: https://docs.aws.amazon.com/sns/latest/dg/fifo-message-grouping.html#fifo-message-grouping
  - id: codedeploy
    text: CodeDeploy deployment-group triggers send deployment events, including failures, to an SNS topic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-sns-event-notifications.html
  - id: scaling-success
    text: Auto Scaling SNS notification types autoscaling:EC2_INSTANCE_LAUNCH and
      autoscaling:EC2_INSTANCE_TERMINATE report successful instance launch and termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#ec2-auto-scaling-sns-notifications
  - id: scaling-failure
    text: Auto Scaling SNS notification types autoscaling:EC2_INSTANCE_LAUNCH_ERROR and
      autoscaling:EC2_INSTANCE_TERMINATE_ERROR report failed launch and termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#ec2-auto-scaling-sns-notifications
  - id: commands
    text: Systems Manager Run Command and Maintenance Windows can publish command or per-node invocation status
      changes to SNS Standard topics.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-sns-notifications.html
  - id: database
    text: Aurora event notifications use an SNS destination topic whose policy allows the RDS event service to
      publish.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.GrantingPermissions.html#USER_Events.GrantingPermissions
  - id: organization
    text: Organizations activity can trigger EventBridge rules in us-east-1 with SNS as a notification target.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_cloudwatch-integration.html#orgs_cloudwatch-integration
  - id: advisor
    text: Trusted Advisor check metrics in us-east-1 can be monitored by CloudWatch alarms that notify SNS.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-metrics-ta.html#cloudwatch-metrics-ta
  - id: standard-delivery
    text: SNS Standard topics provide at-least-once delivery and best-effort ordering, so duplicates and
      out-of-order messages can occur.
    source: https://aws.amazon.com/sns/features/
cards:
  - id: sns-003
    q: What do an Amazon SNS topic and subscription represent?
    a: A topic is the publication channel. A subscription connects a recipient endpoint to that channel for
      message delivery.
    facts:
      - pubsub
  - id: sns-004
    q: Two independent applications must each receive every SNS event and process it when ready. What design
      should the team use?
    a: Subscribe a separate SQS queue for each application to the SNS topic. SNS fans out messages and SQS retains
      them for each application to poll.
    facts:
      - fanout
      - push-poll
  - id: sns-005
    q: An SNS Standard topic must notify people and trigger applications. Which destination types can it use?
    a: SQS, Lambda, HTTP(S), email, SMS, mobile push, and Data Firehose.
    facts:
      - destinations
  - id: sns-006
    q: An SNS email subscription exists but receives no messages. What subscription step should be checked first?
    a: Confirmation. The recipient must confirm the email subscription before receiving notifications.
    facts:
      - email-confirm
  - id: sns-007
    q: Can an SNS FIFO topic directly notify an email address or HTTP endpoint?
    a: No. Those direct endpoints require Standard topics. For Lambda processing from FIFO topics, use a
      subscribed SQS queue as the function event source.
    facts:
      - fifo-endpoints
      - email-confirm
    trap: true
  - id: sns-008
    q: An SNS workflow needs consumer ordering for events belonging to each customer. Which topic, queue, and
      field fit?
    a: Use an SNS FIFO topic with an SQS FIFO queue and assign MessageGroupId by customer. Ordering is within each
      message group.
    facts:
      - fifo-queues
      - fifo-group
  - id: sns-009
    q: A team needs email when a CodeDeploy deployment fails, without adding a polling function. How can SNS be
      used?
    a: Configure a failure-event trigger on the CodeDeploy deployment group with an SNS topic, and confirm the
      email subscription.
    facts:
      - codedeploy
      - email-confirm
  - id: sns-010
    q: Which Auto Scaling notification types send successful launch and termination events to SNS?
    a: autoscaling:EC2_INSTANCE_LAUNCH and autoscaling:EC2_INSTANCE_TERMINATE. Failure variants end in _ERROR.
    facts:
      - scaling-success
      - scaling-failure
  - id: sns-011
    q: A Systems Manager operator needs SNS notifications for failed commands on individual nodes. What should be
      configured?
    a: Run Command SNS status notifications at invocation level, selecting the failure states, with an SNS
      Standard topic.
    facts:
      - commands
  - id: sns-012
    q: A team needs SNS notifications for Organizations account activity or Trusted Advisor check changes. Where
      should the routing be configured?
    a: In us-east-1. Use Organizations EventBridge rules targeting SNS, or CloudWatch alarms on Trusted Advisor
      metrics with an SNS action.
    facts:
      - organization
      - advisor
  - id: sns-013
    q: Aurora event notifications must reach an SNS topic. What access policy is required at the destination?
    a: The SNS topic policy must allow the RDS event service to publish the database event notifications.
    facts:
      - database
  - id: sns-026
    q: An SNS Standard subscriber receives a duplicate message and another message out of publication order. Is
      this outside the topic delivery contract?
    a: No. Standard topics provide at-least-once delivery and best-effort ordering. Subscriber applications must
      be able to process duplicates and out-of-order messages.
    facts:
      - standard-delivery
    trap: true
  - id: sns-027
    q: "A team wants an EC2 instance to subscribe directly to an SNS topic so it can react to alarm notifications. Is that possible?"
    a: "No. SNS delivers to SQS, Lambda, HTTP or HTTPS, email, SMS, mobile push and Data Firehose, not to an instance. Subscribe a Lambda function or an SQS queue the instance polls."
    facts:
      - destinations
diagrams:
  - id: sns-independent-queues
    title: One publication, separate subscriber queues
    width: 900
    height: 400
    nodes:
      - id: publisher
        label: Publisher
        icon: lambda
        x: 25
        y: 150
        w: 170
        h: 86
        tone: compute
        info: A publisher sends a message to the topic.
      - id: topic
        label: SNS topic
        icon: res-simple-notification-service-topic
        x: 335
        y: 150
        w: 170
        h: 86
        tone: integration
        info: SNS pushes a copy to each matching subscription.
      - id: queue-a
        label: Consumer A queue
        icon: res-simple-queue-service-queue
        x: 665
        y: 35
        w: 190
        h: 86
        tone: integration
        info: The queue retains messages for its application to poll later.
      - id: queue-b
        label: Consumer B queue
        icon: res-simple-queue-service-queue
        x: 665
        y: 275
        w: 190
        h: 86
        tone: integration
        info: A separate subscription delivers to a separate queue for the other application.
    edges:
      - from: publisher
        to: topic
        step: 1
        label: publish
      - from: topic
        to: queue-a
        step: 2
        label: copy A
      - from: topic
        to: queue-b
        step: 3
        label: copy B
    steps:
      - The publisher sends one message to SNS.
      - SNS pushes the message to the first subscribed queue.
      - SNS also pushes the message to the other subscribed queue; each application polls its own queue.
---
Amazon SNS is a publish/subscribe service: a publisher sends a message to a topic, and subscriptions connect that topic to recipient endpoints. Fan-out means delivering a publication to several independent subscribers.

### How it works

1. Choose a topic type and attach subscriptions for the recipients. Standard topics can deliver duplicates and messages out of publication order, so applications must handle both.

   | Destination on a Standard topic | Use |
   |---|---|
   | SQS | Retain messages for later processing |
   | Lambda | Run application logic |
   | HTTP or HTTPS | Send to a web endpoint |
   | Email | Notify people |
   | SMS | Notify a phone number by text |
   | Mobile push | Notify a mobile application |
   | Data Firehose | Send events to a delivery stream |

2. Confirm email and HTTP(S) subscriptions before expecting notifications. HTTP(S) endpoints must accept SNS POST requests, including subscription confirmation.
3. Publish to the topic. SNS pushes to subscribers; SQS consumers poll, meaning they ask the queue for waiting messages. Separate queues let independent applications retain and process their own copies.
4. For ordered processing, combine an SNS FIFO topic with an SQS FIFO queue. FIFO means first in, first out. Set `MessageGroupId` to identify events whose order must be preserved. Ordering applies within a group.
5. Connect native event producers when they already provide the notification you need.

   | Event source | Configuration that reaches SNS |
   |---|---|
   | CodeDeploy | Deployment-group event trigger, including failure events |
   | EC2 Auto Scaling | Launch or termination notification types, including error variants |
   | Systems Manager | Run Command or Maintenance Windows status notifications on a Standard topic |
   | Aurora | Event notifications with permission for the RDS event service to publish |
   | Organizations | EventBridge rule in `us-east-1` targeting SNS |
   | Trusted Advisor | CloudWatch alarm on check metrics in `us-east-1` with SNS notification |

### Exam cues

- If the question says every application needs an independent copy and can be temporarily offline, think SNS with one SQS queue per application, because each queue retains its delivered messages.
- If the question says deployment failure email without polling, think a native CodeDeploy trigger to SNS, because the deployment group can emit the event directly.
- If the question says an email subscription receives nothing, think confirmation, because SNS waits for the recipient to confirm.
- If the question says an EC2 instance should subscribe to an SNS topic, think Lambda, SQS or HTTPS subscribers instead, because an instance is not an SNS subscription type.

### Remember

- SNS pushes; SQS consumers poll.
- Standard topics: at-least-once delivery and best-effort ordering.
- Auto Scaling success types: `autoscaling:EC2_INSTANCE_LAUNCH` and `autoscaling:EC2_INSTANCE_TERMINATE`. Failure types add `_ERROR`.
- SNS FIFO can deliver to Standard queues, but strict consumer ordering requires FIFO queues.
- FIFO topics do not directly support email, HTTP(S), SMS, or mobile push.

> **Trap:** An SNS FIFO topic alone cannot preserve ordered processing through an SQS Standard queue. Choose a FIFO queue when consumer ordering matters.
