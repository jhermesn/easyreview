---
title: Incident correlation and bottlenecks
level: professional
order: 20
facts:
  - id: application-map
    text: Application Signals provides application metrics, correlated trace spans, and a map of applications and dependencies.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Intro.html#CloudWatch-Application-Monitoring-Intro
  - id: xray-map
    text: The X-Ray trace map can reveal bottlenecks and latency spikes in downstream calls.
    source: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
  - id: logs
    text: CloudWatch Logs Insights can help identify potential causes and validate fixes.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: cloudtrail
    text: CloudTrail records AWS actions and provides actor and time information.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
  - id: canary-artifacts
    text: A failed Synthetics canary run can show logs, screenshots, and step reports when available.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Troubleshoot.html#CloudWatch_Synthetics_Canaries_Troubleshoot
  - id: scaling-history
    text: Auto Scaling activity history shows the status of scaling activities including success or failure.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-verify-scaling-activity.html#as-verify-scaling-activity
  - id: ecs-stopped
    text: ECS stopped task details provide the stop code and reason, while service events record service actions.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html#stopped-task-errors
  - id: container-insights
    text: Container Insights provides diagnostic information including container restart failures.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html#ContainerInsights
  - id: queue-age
    text: SQS ApproximateAgeOfOldestMessage measures the age of the oldest unprocessed message in a queue.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-available-cloudwatch-metrics.html#sqs-metrics
  - id: lambda-throttles
    text: Lambda Throttles counts throttled invocation requests.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#invocation-metrics
  - id: lambda-concurrency
    text: Lambda ConcurrentExecutions counts function instances processing events.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#concurrency-metrics
  - id: iterator-age
    text: Lambda IteratorAge measures record age for DynamoDB, Kinesis, and DocumentDB event sources.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#performance-metrics
  - id: dynamodb-throttle
    text: DynamoDB ThrottledRequests measures requests that were throttled.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html#ThrottledRequests
diagrams:
  - id: observability-queue-pipeline
    title: Locate pipeline pressure
    width: 720
    height: 150
    nodes:
      - { id: queue, label: SQS, icon: simple-queue-service, x: 25, y: 35, w: 170, h: 72, tone: integration }
      - { id: function, label: Lambda, icon: lambda, x: 275, y: 35, w: 170, h: 72, tone: compute }
      - { id: table, label: DynamoDB, icon: dynamodb, x: 525, y: 35, w: 170, h: 72, tone: database }
    edges:
      - { from: queue, to: function, step: 1 }
      - { from: function, to: table, step: 2 }
    steps:
      - Check queue age and Lambda invocation pressure.
      - Check DynamoDB throttled requests.
cards:
  - id: observability-strategy-001
    q: An application error rate rises after a release. How can an AWS team investigate?
    a: Compare application metrics, logs, correlated traces, and CloudTrail actions over the affected time. Use the trace map to inspect slow dependencies.
    facts: [application-map, logs, cloudtrail, xray-map]
  - id: observability-strategy-004
    q: A CloudWatch Synthetics login canary starts failing after a release. What should the team inspect?
    a: Inspect the failed run's logs, screenshots, and step reports when available, and compare them with a successful run.
    facts: [canary-artifacts]
  - id: observability-strategy-006
    q: An Auto Scaling group cannot add instances and an ECS task stops. Where should the team look?
    a: Check Auto Scaling activity history and the ECS stopped task's stop code, reason, and service events.
    facts: [scaling-history, ecs-stopped]
  - id: observability-strategy-007
    q: An SQS to Lambda to DynamoDB pipeline is delayed. Which metrics help locate the bottleneck?
    a: Check SQS `ApproximateAgeOfOldestMessage`, Lambda `Throttles` and `ConcurrentExecutions`, and DynamoDB `ThrottledRequests`. Lambda `IteratorAge` is for supported stream sources, not SQS.
    facts: [queue-age, lambda-throttles, lambda-concurrency, dynamodb-throttle, iterator-age]
    trap: true
  - id: observability-strategy-013
    q: Which AWS tool can show whether a downstream dependency is causing a latency spike?
    a: The X-Ray trace map shows downstream calls and helps identify latency spikes and bottlenecks.
    facts: [xray-map]
  - id: observability-strategy-014
    q: A team suspects repeated container restarts in an EKS workload. Where can it see diagnostic information?
    a: CloudWatch Container Insights provides diagnostic information including container restart failures.
    facts: [container-insights]
---
Incident correlation compares evidence from the same period to narrow a cause. A bottleneck is a component that constrains the progress of a request or pipeline.

### How it works

1. Find the affected time window in application metrics and search logs for errors.
2. Inspect correlated traces and the application dependency map. A trace follows a request through its components; the X-Ray trace map can reveal slow downstream calls.
3. Compare AWS action times in CloudTrail with the incident, then investigate changes and validate fixes with logs. A timing match is a lead, not proof of cause.
4. For stopped or failed workloads, inspect the service's own activity or task details before choosing a fix.

### Exam cues

- If the question says a canary fails after a release, think failed run logs, screenshots, and step reports, because they show the failing steps when available.
- If the question says an Auto Scaling launch failed, think activity history, because it reports the scaling activity status.
- If the question says an ECS task stopped, think stopped task details and service events, because they record stop reasons and service actions.
- If the question says an SQS to Lambda to DynamoDB pipeline is delayed, think queue age, Lambda throttles and concurrency, and DynamoDB throttled requests, because they expose pressure at different stages.

### Remember

- SQS `ApproximateAgeOfOldestMessage` is an approximate queue age.
- Lambda `IteratorAge` applies to DynamoDB, Kinesis, and DocumentDB event sources, not SQS.
- Lambda `Throttles` counts throttled requests; `ConcurrentExecutions` counts function instances processing events.

> **Trap:** Do not use Lambda `IteratorAge` as the SQS backlog age. Use the SQS age metric for that queue.
