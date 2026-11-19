---
title: Serverless event-driven application
level: associate
order: 20
facts:
  - id: oac
    text: CloudFront can send authenticated requests to an S3 origin with origin access control (OAC), so the bucket that holds a web front end stays private.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
  - id: cognito-authorizer
    text: A REST API in API Gateway can use an Amazon Cognito user pool as its authorizer, as an alternative to IAM permissions or a Lambda authorizer.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html
  - id: api-throttling
    text: API Gateway throttling and quotas protect an API from being overwhelmed by too many requests; they apply on a best-effort basis.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html
  - id: ddb-on-demand
    text: On-demand is the default and recommended DynamoDB throughput mode for most workloads, with no capacity to plan.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/capacity-mode.html
  - id: eventbridge
    text: EventBridge is a serverless service whose event buses receive events and deliver them to zero or more targets, which keeps producers and consumers loosely coupled.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html
  - id: sqs-lambda
    text: Lambda can process messages from standard and FIFO SQS queues; functions should report partial batch failures so successful messages are not retried.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
  - id: sqs-max-concurrency
    text: Maximum concurrency on an SQS event source mapping limits how far Lambda scales for that queue.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html
  - id: dlq
    text: An SQS dead-letter queue receives messages that a source queue could not process successfully, isolating them for debugging; it must be in the same account and Region as the source queue.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
  - id: dlq-alarm
    text: A CloudWatch alarm on a dead-letter queue's ApproximateNumberOfMessagesVisible metric signals when messages land in it.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/dead-letter-queues-alarms-cloudwatch.html
  - id: step-functions
    text: Step Functions workflows, also called state machines, orchestrate microservices and processes as a series of event-driven steps.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html
  - id: waf-api
    text: AWS WAF protects regional resources including an Amazon API Gateway REST API and an Application Load Balancer.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/how-aws-waf-works-resources.html
  - id: xray
    text: AWS X-Ray collects data about the requests an application serves and provides tools to view and filter it to find issues and optimization opportunities.
    source: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
  - id: active-tracing
    text: Lambda Active tracing automatically sends segments for sampled requests.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
diagrams:
  - id: serverless-event-driven-application
    title: Serverless web front end, API and asynchronous event processing
    width: 1240
    height: 640
    groups:
      - { label: Region, x: 180, y: 20, w: 1050, h: 610, tone: neutral, icon: group-region }
    nodes:
      - { id: users, label: Users, x: 20, y: 300, w: 130, h: 72, tone: user, icon: res-users }
      - { id: cdn, label: CloudFront, sub: web front end, x: 200, y: 60, w: 150, h: 86, tone: network, icon: cloudfront }
      - { id: s3, label: S3 bucket, sub: "static site, OAC", x: 420, y: 60, w: 150, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Holds the single-page application. Only the distribution can read it." }
      - { id: xray, label: X-Ray, sub: traces, x: 640, y: 60, w: 150, h: 86, tone: mgmt, icon: x-ray, info: "Active tracing on the functions follows each request through API Gateway, Lambda and DynamoDB." }
      - { id: cognito, label: Cognito, sub: user pool, x: 200, y: 290, w: 150, h: 86, tone: security, icon: cognito, info: "Signs users in and issues the tokens the API checks." }
      - { id: waf, label: AWS WAF, sub: regional web ACL, x: 420, y: 290, w: 150, h: 86, tone: security, icon: waf }
      - { id: api, label: API Gateway, sub: REST API, x: 200, y: 520, w: 150, h: 86, tone: integration, icon: api-gateway, info: "Checks tokens with a **Cognito user pool authorizer** and throttles requests before they reach Lambda." }
      - { id: fn, label: Lambda, sub: orders API, x: 420, y: 520, w: 150, h: 86, tone: compute, icon: lambda }
      - { id: ddb, label: DynamoDB, sub: on-demand table, x: 640, y: 520, w: 150, h: 86, tone: database, icon: dynamodb }
      - { id: bus, label: EventBridge, sub: OrderPlaced, x: 640, y: 290, w: 150, h: 86, tone: integration, icon: eventbridge, info: "Rules route the event to each consumer. New consumers add a rule, not code in the API." }
      - { id: sfn, label: Step Functions, sub: fulfillment flow, x: 860, y: 60, w: 160, h: 86, tone: integration, icon: step-functions }
      - { id: queue, label: SQS queue, sub: email jobs, x: 860, y: 290, w: 160, h: 86, tone: integration, icon: simple-queue-service, info: "Buffers work so a slow consumer never slows the API." }
      - { id: worker, label: Lambda, sub: worker, x: 1060, y: 290, w: 150, h: 86, tone: compute, icon: lambda, info: "Event source mapping with **maximum concurrency** set, and partial batch failure reporting so only failed messages are retried." }
      - { id: dlq, label: SQS DLQ, sub: failed messages, x: 860, y: 520, w: 160, h: 86, tone: integration, icon: simple-queue-service }
      - { id: alarm, label: CloudWatch alarm, sub: messages in DLQ, x: 1060, y: 520, w: 160, h: 86, tone: mgmt, icon: res-cloudwatch-alarm }
    edges:
      - { from: users, to: cdn, step: 1 }
      - { from: cdn, to: s3, step: 1 }
      - { from: users, to: cognito, step: 2 }
      - { from: users, to: api, step: 3 }
      - { from: api, to: cognito, step: 3, dashed: true }
      - { from: api, to: waf, step: 4 }
      - { from: api, to: fn, step: 5 }
      - { from: fn, to: ddb, step: 5 }
      - { from: fn, to: bus, step: 6 }
      - { from: bus, to: sfn, step: 7 }
      - { from: bus, to: queue, step: 7 }
      - { from: queue, to: worker, step: 8 }
      - { from: queue, to: dlq, step: 9, dashed: true }
      - { from: dlq, to: alarm, step: 10, dashed: true }
      - { from: fn, to: xray, step: 11 }
    steps:
      - "The browser loads the single-page application from CloudFront, which reads a private S3 bucket through origin access control."
      - "The user signs in with a Cognito user pool and receives tokens."
      - "The app calls API Gateway with the token. A Cognito user pool authorizer checks it, and throttling protects the backend."
      - "A regional AWS WAF web ACL on the REST API blocks malicious requests before they reach the function."
      - "A Lambda function stores the order in a DynamoDB table in on-demand mode."
      - "The function publishes an OrderPlaced event to EventBridge and returns at once."
      - "EventBridge rules start a Step Functions workflow for fulfillment and send a copy to an SQS queue."
      - "A worker Lambda function polls the queue and sends the confirmation email. Maximum concurrency caps how far it scales, and partial batch failure reporting retries only the failed messages."
      - "Messages that keep failing move to a dead-letter queue for investigation."
      - "A CloudWatch alarm on the dead-letter queue's visible message count tells the team as soon as anything lands there."
      - "Active tracing sends each request's path through API Gateway, Lambda and DynamoDB to X-Ray, so slow or failing calls show up per request."
cards:
  - id: reference-architectures-008
    q: A serverless REST API in API Gateway must accept only users who signed in to the company's web app, with no custom authorization code. Which option fits?
    a: "A **Cognito user pool authorizer** on the API. Users sign in to the user pool and send its token with each request."
    facts: [cognito-authorizer]
  - id: reference-architectures-009
    q: An order API on Lambda must notify billing, email and analytics services, and new consumers keep being added. How can the API stay unchanged as consumers grow?
    a: "Publish an event to an **EventBridge** event bus and give each consumer its own rule and target.\nThe producer never calls consumers directly."
    facts: [eventbridge]
  - id: reference-architectures-010
    q: A Lambda function that consumes an SQS queue calls a legacy database that fails under more than 20 parallel connections. How can the team cap the load without slowing the API that fills the queue?
    a: "Set **maximum concurrency** on the SQS event source mapping. Messages wait in the queue instead of reaching the database all at once."
    facts: [sqs-max-concurrency, sqs-lambda]
  - id: reference-architectures-011
    q: Some messages in an SQS queue fail processing every time and are retried again and again. Which feature isolates them for debugging?
    a: "An **SQS dead-letter queue**. Messages that fail repeatedly move there for debugging. It must be in the same account and Region as the source queue."
    facts: [dlq]
  - id: reference-architectures-012
    q: A serverless order flow must charge a card, reserve stock and ship, with retries and a visible state per order. Which service coordinates the steps?
    a: "**AWS Step Functions**. A workflow (state machine) runs each step and shows where every execution is."
    facts: [step-functions]
  - id: reference-architectures-013
    q: A new serverless application on DynamoDB has unpredictable traffic and no capacity estimate. Which throughput mode fits?
    a: "**On-demand**, the default and recommended mode for most workloads. There is no capacity to plan."
    facts: [ddb-on-demand]
  - id: reference-architectures-073
    q: "A serverless API in API Gateway (REST) receives SQL injection attempts. Can AWS WAF protect it directly, without CloudFront in front?"
    a: "Yes. A **regional AWS WAF web ACL** can be associated with an API Gateway REST API."
    facts: [waf-api]
  - id: reference-architectures-074
    q: "Failed order messages pile up in an SQS dead-letter queue for days before anyone notices. What should the team add?"
    a: "A **CloudWatch alarm** on the dead-letter queue's `ApproximateNumberOfMessagesVisible` metric, so the team is notified as soon as messages arrive."
    facts: [dlq-alarm, dlq]
  - id: reference-architectures-075
    q: "Some requests through API Gateway and Lambda are slow, and the team must see which downstream call causes it, request by request. What fits?"
    a: "**AWS X-Ray** with **Active tracing** on the Lambda functions, which records each sampled request's path and timing."
    facts: [xray, active-tracing]
  - id: reference-architectures-076
    q: "A Lambda function processes SQS messages in batches of ten. When one message fails, all ten are retried. How can only the failed message be retried?"
    a: "Report **partial batch failures** from the function, returning only the failed message IDs, so successful messages are not processed again."
    trap: true
    facts: [sqs-lambda]
---
A serverless design answers questions that ask for no servers to manage, cost that follows usage and components that scale on their own. The pieces fit in two halves: a synchronous path that serves the user, and an asynchronous path that does slower work after the response.

### How it works

1. CloudFront serves the web front end from a private S3 bucket through origin access control.
2. Users sign in with a Cognito user pool. API Gateway checks each token with a user pool authorizer, throttles bursts, and a regional AWS WAF web ACL filters malicious requests.
3. A Lambda function writes to DynamoDB and publishes an event to EventBridge, then answers the user.
4. EventBridge rules fan the event out: a Step Functions workflow coordinates multi-step work, and an SQS queue buffers simpler jobs.
5. A worker function drains the queue at a capped concurrency and reports partial batch failures. Messages that keep failing land in a dead-letter queue, and a CloudWatch alarm on it notifies the team.
6. X-Ray traces each request across API Gateway, Lambda and DynamoDB.

| Need | Service | Why |
|---|---|---|
| Static front end | CloudFront and S3 with OAC | Edge caching; bucket stays private |
| Sign-in and API access | Cognito user pool authorizer | No custom auth code |
| Request handling | API Gateway and Lambda | Throttling; scales per request |
| Web exploit protection | Regional AWS WAF on the REST API | Filters requests without CloudFront |
| Data | DynamoDB on-demand | No capacity planning |
| Fan-out to many consumers | EventBridge | Rules per consumer; producer unchanged |
| Buffer and protect a backend | SQS with maximum concurrency | Work waits in the queue |
| Ordered multi-step process | Step Functions | Retries and visible state |
| Find slow calls | X-Ray with Active tracing | Per-request path and timing |

### Exam cues

- If the question says the API must not wait for slow downstream work, think publish an event or message and return, because the asynchronous path scales on its own.
- If the question says many services must react to one event and more will come, think EventBridge rules, because consumers are added without touching the producer.
- If the question says a downstream system cannot take bursts, think SQS between them with maximum concurrency on the event source mapping, because messages wait instead.
- If the question says authenticate app users for an API without writing code, think a Cognito user pool authorizer.
- If the question says coordinate several steps with retries and track each order, think Step Functions.
- If the question says know when messages fail permanently, think a CloudWatch alarm on the dead-letter queue.

### Remember

- Synchronous path: CloudFront, API Gateway, Lambda, DynamoDB.
- Asynchronous path: EventBridge for fan-out, SQS for buffering, Step Functions for workflows.
- Dead-letter queue: same account and Region as its source queue; alarm on `ApproximateNumberOfMessagesVisible`.
- AWS WAF can attach to an API Gateway REST API directly.

> **Trap:** Calling every downstream service directly from the API function couples them: one slow consumer slows every request. Put an event bus or a queue between them.
