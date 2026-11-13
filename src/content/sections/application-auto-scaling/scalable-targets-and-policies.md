---
title: Scalable targets and policies
level: associate
order: 10
facts:
  - id: service-scope
    text: Application Auto Scaling scales supported resource dimensions including ECS service task
      count, DynamoDB table and index capacity, Aurora replicas and Lambda provisioned concurrency.
    source: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html
  - id: ec2-distinction
    text: EC2 Auto Scaling groups use Amazon EC2 Auto Scaling rather than Application Auto Scaling.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html
  - id: ecs-capacity
    text: ECS cluster auto scaling uses managed scaling on Auto Scaling group capacity providers to
      adjust the EC2 instances available to tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: target-id
    text: A scalable target is uniquely identified by service namespace, resource ID and scalable
      dimension.
    source: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html
  - id: bounds
    text: Registering a scalable target requires minimum and maximum capacity; scaling policies operate
      within these bounds.
    source: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html
  - id: ecs-dimension
    text: For ECS service scaling, the namespace is ecs, the resource ID is
      service/cluster-name/service-name and the dimension is ecs:service:DesiredCount.
    source: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html
  - id: target-tracking
    text: Target tracking maintains a target utilization or throughput metric by managing CloudWatch
      alarms and calculating capacity changes.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: metric
    text: A target tracking metric must represent utilization that changes proportionally with target
      capacity, such as average CPU or requests per target.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: alarm-ownership
    text: Do not manually create, edit or delete CloudWatch alarms managed by a target tracking policy.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: missing-data
    text: Missing target tracking metric data can put alarms into INSUFFICIENT_DATA, preventing scaling
      until new data is available.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: multiple
    text: With multiple target tracking policies, any policy can trigger scale-out, but all policies
      with scale-in enabled must agree before scale-in.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: cooldown
    text: A cooldown gives a previous scaling activity time to take effect; a scale-in cooldown does not
      prevent an urgent scale-out.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: cooldown-defaults
    text: Default target tracking cooldown is 300 seconds for ECS and Aurora, and 0 or null for DynamoDB
      and Lambda provisioned concurrency; null is treated as zero.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html
  - id: step
    text: Step scaling uses customer-managed CloudWatch alarms and capacity adjustments based on the
      size of the alarm breach.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-step-scaling-policies.html
  - id: step-support
    text: Step scaling supports ECS services and Aurora clusters but does not list DynamoDB or Lambda
      provisioned concurrency as supported scalable targets.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-step-scaling-policies.html
  - id: scheduled
    text: Scheduled actions change minimum or maximum capacity at configured times and can work
      alongside dynamic scaling policies.
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-scheduled-scaling.html
  - id: predictive
    text: ECS predictive scaling uses historical demand to forecast capacity, can work with dynamic
      scaling and does not scale in tasks by itself.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/predictive-auto-scaling.html
  - id: predictive-mode
    text: Predictive scaling defaults to ForecastOnly; ForecastAndScale enables capacity changes based
      on forecasts.
    source: https://docs.aws.amazon.com/autoscaling/application/APIReference/API_PredictiveScalingPolicyConfiguration.html
diagrams:
  - id: application-scaling-loop
    title: Target tracking adjusts ECS service task count
    width: 800
    height: 190
    nodes:
      - id: metric
        label: CloudWatch metric
        icon: cloudwatch
        tone: mgmt
        x: 30
        y: 60
        w: 210
        h: 86
      - id: policy
        label: Scaling policy
        icon: application-auto-scaling
        tone: mgmt
        x: 295
        y: 60
        w: 210
        h: 86
      - id: ecs
        label: ECS task count
        icon: elastic-container-service
        tone: compute
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: metric
        to: policy
        step: 1
      - from: policy
        to: ecs
        step: 2
    steps:
      - Managed alarm
      - Adjust within bounds
cards:
  - id: application-auto-scaling-001
    q: Which workloads use Application Auto Scaling, and how does ECS cluster capacity scaling differ?
    a: Application Auto Scaling handles ECS service task count, DynamoDB capacity, Aurora replicas and
      Lambda provisioned concurrency. EC2 groups use EC2 Auto Scaling; ECS cluster auto scaling
      adjusts EC2 instances through ASG capacity providers.
    facts:
      - service-scope
      - ec2-distinction
      - ecs-capacity
  - id: application-auto-scaling-002
    q: What uniquely identifies an Application Auto Scaling scalable target?
    a: The service namespace, resource ID and scalable dimension. Register it with minimum and maximum
      capacity.
    facts:
      - target-id
      - bounds
  - id: application-auto-scaling-003
    q: An ECS service should maintain a chosen average CPU utilization without manually maintained
      alarms. Which Application Auto Scaling policy fits?
    a: Target tracking. It creates and manages CloudWatch alarms and calculates capacity changes to
      approach the target.
    facts:
      - target-tracking
      - metric
  - id: application-auto-scaling-004
    q: An application needs different capacity increments for small and large alarm breaches. Which
      Application Auto Scaling policy fits?
    a: Step scaling. The team manages the CloudWatch alarms and defines adjustments by breach size.
      Check that the resource supports step scaling.
    facts:
      - step
      - step-support
  - id: application-auto-scaling-005
    q: An ECS application expects a known busy window and needs capacity before it starts. Which
      Application Auto Scaling feature fits?
    a: Scheduled scaling. Raise the minimum capacity before the busy window, then let dynamic policies
      operate within the scheduled bounds.
    facts:
      - scheduled
  - id: application-auto-scaling-006
    q: An Application Auto Scaling target tracking alarm enters INSUFFICIENT_DATA. Should missing
      samples be treated as permission to scale in?
    a: No. Target tracking cannot scale while required metric data is missing. Restore metric reporting.
    trap: true
    facts:
      - missing-data
  - id: application-auto-scaling-007
    q: Two Application Auto Scaling target tracking policies disagree about scale-in. What happens?
    a: Scale-in waits until all policies with scale-in enabled agree. Either policy can request
      scale-out.
    facts:
      - multiple
  - id: application-auto-scaling-008
    q: Does increasing an ECS service task count through Application Auto Scaling also directly scale
      its EC2 Auto Scaling group?
    a: No. Service task scaling and cluster instance scaling are separate. Use ECS managed scaling on an
      ASG capacity provider for the underlying EC2 capacity.
    trap: true
    facts:
      - service-scope
      - ecs-capacity
  - id: application-auto-scaling-009
    q: Which default target tracking cooldowns apply to ECS, Aurora, DynamoDB and Lambda provisioned
      concurrency?
    a: "ECS and Aurora: 300 seconds. DynamoDB and Lambda provisioned concurrency: 0 or null, with null
      treated as zero."
    facts:
      - cooldown-defaults
  - id: application-auto-scaling-010
    q: An ECS service has recurring demand patterns and slow task startup. How should the team assess
      predictive scaling?
    a: Start with ForecastOnly, evaluate forecasts, and use ForecastAndScale to enable forecast-driven
      capacity changes. Combine with dynamic scaling for scale-in and unexpected changes.
    facts:
      - predictive
      - predictive-mode
---
Application Auto Scaling changes a supported resource's capacity as demand changes. It scales an application's resource dimension, such as an ECS service's task count or DynamoDB provisioned capacity. A scalable dimension is the particular capacity value the service can change.

### How it works

1. Register a scalable target using its service namespace, resource ID and scalable dimension. The namespace identifies the service. Set minimum and maximum capacity.
2. For ECS, use namespace `ecs`, resource ID `service/cluster-name/service-name` and dimension `ecs:service:DesiredCount`.
3. Choose a scaling mechanism. Target tracking manages its own CloudWatch alarms; step scaling requires alarms you manage. An alarm breach means a metric crossed its configured threshold.
4. Policies adjust capacity within the target's bounds. A cooldown lets a previous change take effect. During a scale-in cooldown, a required scale-out can still run.
5. Use scheduled actions to change capacity bounds before predictable load. For ECS historical demand forecasts, predictive scaling can work alongside dynamic policies.

| Requirement | Mechanism | Control |
|---|---|---|
| Maintain chosen average utilization | Target tracking | Service-managed alarms and adjustments |
| Different increments by alarm breach size | Step scaling | Customer-managed alarms and step adjustments |
| Prepare for a known time window | Scheduled scaling | Timed minimum or maximum changes |
| Forecast recurring ECS demand | Predictive scaling | Historical demand forecasts |

Scaling out adds capacity; scaling in removes it. Target tracking needs a metric that reflects capacity utilization, such as average CPU or requests per target. Missing data can leave its alarm in `INSUFFICIENT_DATA` and prevent scaling. Leave policy-managed alarms under Application Auto Scaling control.

### Exam cues

- If the question says scale ECS tasks, DynamoDB capacity, Aurora readers or Lambda provisioned concurrency, think Application Auto Scaling, because these are supported resource dimensions.
- If the question says keep utilization near a target with minimal alarm management, think target tracking, because it manages alarms and adjustments.
- If the question says ECS tasks lack EC2 capacity, think ASG capacity provider managed scaling, because task count and cluster instance capacity are separate.
- If the question says prepare for known business hours, think scheduled scaling, because it can raise capacity bounds before requests arrive.

### Remember

- A scalable target needs namespace, resource ID, dimension, minimum and maximum.
- Default target tracking cooldown: 300 seconds for ECS and Aurora; 0 or null for DynamoDB and Lambda provisioned concurrency.
- With multiple target tracking policies, any can scale out; all policies with scale-in enabled must agree to scale in.
- Predictive scaling defaults to `ForecastOnly`. `ForecastAndScale` enables forecast-driven scaling. Predictive scaling alone does not remove ECS tasks.
- Policy support varies. Step scaling does not support every Application Auto Scaling target.

> **Trap:** Application Auto Scaling is a separate service from EC2 Auto Scaling. Registering an ECS service target changes task count, not the size of the EC2 Auto Scaling group hosting those tasks.
