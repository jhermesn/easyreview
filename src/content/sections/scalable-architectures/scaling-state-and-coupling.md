---
title: Scaling, state and loose coupling
level: associate
order: 10
facts:
  - id: horizontal
    text: AWS Well-Architected recommends scaling horizontally, replacing one large resource with several small ones so that a single failure has less impact and requests don't share a common point of failure.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html#rel-dp
  - id: vertical
    text: Vertical scaling on EC2 means resizing an instance by changing its instance type, for example from t2.micro to t2.large, and you then pay the new type's rate.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-resize.html#ec2-instance-resize
  - id: stateless
    text: A stateless system keeps no session data on local disk or memory between requests, so servers can be replaced at will and any instance or Lambda function can serve any request, which allows horizontal scaling.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_stateless.html#rel_mitigate_interaction_failure_stateless
  - id: offload
    text: To make systems stateless, AWS suggests storing large unstructured data such as images in Amazon S3 and data such as user profiles in Amazon DynamoDB instead of in server memory.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_stateless.html#rel_mitigate_interaction_failure_stateless
  - id: sticky
    text: Sticky sessions on an Application Load Balancer keep a client on one instance, but the session is lost if that instance fails and load can become uneven.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-asp-net-web-forms/ha-scaling.html#sticky-sessions
  - id: shared-store
    text: AWS recommends storing session state in a shared backing store such as Amazon DynamoDB, Amazon RDS or Amazon ElastiCache, so the application scales across instances without losing sessions.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-asp-net-web-forms/ha-scaling.html#backing-store
  - id: loose
    text: Loose coupling through queues, streams, workflows and load balancers isolates a component's behavior from those that depend on it, so a change or failure in one component doesn't spread.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_prevent_interaction_failure_loosely_coupled_system.html#rel_prevent_interaction_failure_loosely_coupled_system
  - id: async
    text: Making interactions asynchronous, for example with Amazon SQS, AWS Step Functions, Amazon EventBridge or Amazon SNS, suits any request that only needs an acknowledgment rather than an immediate response.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_prevent_interaction_failure_loosely_coupled_system.html#rel_prevent_interaction_failure_loosely_coupled_system
cards:
  - id: scalable-architectures-001
    q: A web app on EC2 keeps user sessions in instance memory, so users are logged out when Auto Scaling removes an instance. What is the recommended fix?
    a: "Move session state to a shared store such as **Amazon ElastiCache** or **Amazon DynamoDB**, making the web tier stateless."
    facts: [shared-store, stateless]
  - id: scalable-architectures-002
    q: Why are sticky sessions a weak fix for session state on an Application Load Balancer?
    a: "If the instance fails the session is lost, and load can become uneven across instances."
    trap: true
    facts: [sticky]
  - id: scalable-architectures-003
    q: Horizontal versus vertical scaling for an EC2 web tier. What does each mean, and which does AWS Well-Architected prefer for availability?
    a: "- Horizontal: add more instances (behind a load balancer).\n- Vertical: change to a larger instance type.\nWell-Architected prefers horizontal: many small resources, no single point of failure."
    facts: [horizontal, vertical]
  - id: scalable-architectures-004
    q: An order front end calls a slow fulfillment service synchronously, and fulfillment outages take the front end down. Which design change isolates them?
    a: "Decouple with a queue (Amazon SQS) or events (Amazon EventBridge): the front end records the order and returns, and fulfillment consumes at its own pace."
    facts: [loose, async]
  - id: scalable-architectures-005
    q: Which two AWS services does Well-Architected suggest for moving state off servers, for files and for user profile data?
    a: "Amazon S3 for large unstructured data such as images; Amazon DynamoDB for data such as user profiles."
    facts: [offload]
  - id: scalable-architectures-006
    q: What does a stateless web tier make possible?
    a: "Replacing servers at will and scaling horizontally, because any instance or Lambda function can serve any request."
    facts: [stateless]
---
Most SAA architecture questions test the same ideas: scale out instead of up, keep compute stateless, and decouple tiers so one slow or failed part doesn't take down the rest.

### How it works

1. Put several small instances (or containers, or functions) behind a load balancer instead of one large server.
2. Move session data, files and profiles off the servers into ElastiCache, DynamoDB, RDS or S3.
3. With no local state, Auto Scaling can add and remove instances freely.
4. Between tiers that don't need an immediate answer, put a queue, stream or event bus so each side scales and fails on its own.

| Approach | How | Trade-off |
|---|---|---|
| Vertical scaling | Larger instance type | Simple, but one point of failure and a size ceiling |
| Horizontal scaling | More instances behind a load balancer | Needs a stateless design |
| Sticky sessions | ALB keeps a client on one instance | Session lost when that instance fails |
| Shared session store | ElastiCache, DynamoDB or RDS | Recommended; any instance serves any user |

### Exam cues

- If the question says users lose sessions when instances scale in or fail, think a shared session store (ElastiCache or DynamoDB).
- If the question says one tier overwhelms or blocks another, think SQS (or EventBridge, SNS, Step Functions) between them.
- If the question says avoid a single point of failure, think horizontal scaling across AZs.

### Remember

- Scale horizontally; keep compute stateless.
- Session state goes to ElastiCache, DynamoDB or RDS; files to S3.
- Asynchronous where an acknowledgment is enough.

> **Trap:** Sticky sessions look like a fix for session loss, but they only pin users to an instance. When that instance goes away, so does the session.
