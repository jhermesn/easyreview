---
title: Deployment circuit breaker and alarms
level: professional
order: 40
facts:
  - id: ecs-failure-breaker
    text: The ECS deployment circuit breaker detects rolling deployments that cannot reach a stable
      running state.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentCircuitBreaker.html
  - id: ecs-failure-controller
    text: The ECS deployment circuit breaker is an ECS-controller feature rather than a CodeDeploy
      deployment control.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentCircuitBreaker.html
  - id: ecs-failure-stage-one
    text: The first circuit-breaker stage counts tasks that fail to reach RUNNING.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-stage-two
    text: After a task reaches RUNNING, the circuit breaker evaluates load balancer, Cloud Map, and
      container health-check failures.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-threshold
    text: The default BOUNDED_PERCENT threshold is 50% of the latest desired count, rounded up and
      bounded from 3 to 200.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html#bounded-percent-calculation
  - id: ecs-failure-reset
    text: resetOnHealthyTask defaults to true and resets failures when a task becomes healthy; false
      accumulates failures.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentCircuitBreaker.html
  - id: ecs-failure-unbounded
    text: UNBOUNDED_PERCENT uses a percentage threshold without the default lower and upper bounds.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ThresholdConfiguration.html
  - id: ecs-failure-count
    text: COUNT uses a fixed number of task failures as the threshold.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ThresholdConfiguration.html
  - id: ecs-failure-rollback
    text: With rollback enabled, the circuit breaker chooses the most recent COMPLETED deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-no-target
    text: Without a COMPLETED deployment to use, circuit-breaker rollback stalls and launches no new
      tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-states
    text: DescribeServices exposes rolloutState and rolloutStateReason; failed deployments stop
      launching new tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-events
    text: ECS sends deployment state-change events to EventBridge, including SERVICE_DEPLOYMENT_FAILED.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-failure-alarm
    text: Deployment alarms can fail an ECS deployment when a specified CloudWatch alarm enters ALARM
      and can optionally trigger rollback.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-alarm-failure.html
  - id: ecs-failure-both
    text: When circuit breaker and alarms are enabled together, either can fail the deployment; rollback
      depends on that triggering method having rollback enabled.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-alarm-failure.html
  - id: ecs-failure-already-alarm
    text: If an alarm is already in ALARM at deployment start, ECS ignores the deployment alarm
      configuration for that deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-alarm-failure.html
  - id: ecs-failure-native
    text: Native ECS blue/green supports circuit-breaker failure detection and rollback.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deploy-blue-green-service.html
  - id: ecs-failure-native-date
    text: The October 2026 VPC Lattice launch documents circuit-breaker rollback for native blue/green,
      linear, and canary deployments.
    source: https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments/
diagrams:
  - id: ecs-failed-release
    title: Failure detection and rollback
    width: 800
    height: 220
    nodes:
      - id: tasks
        label: New tasks
        icon: res-elastic-container-service-task
        x: 30
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: startup and health
      - id: failure
        label: Failed deployment
        icon: elastic-container-service
        x: 310
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: failure threshold
      - id: rollback
        label: Prior deployment
        icon: elastic-container-service
        x: 590
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: latest COMPLETED
    edges:
      - from: tasks
        to: failure
        step: 1
      - from: failure
        to: rollback
        step: 2
    steps:
      - The circuit breaker marks the rolling deployment failed when its task-failure threshold is
        reached.
      - With rollback enabled and a completed deployment available, ECS returns to that deployment.
cards:
  - id: ecs-006
    q: An ECS rolling release must automatically recover when replacement tasks cannot start. What
      should be enabled?
    a: Enable the deployment circuit breaker with rollback. It uses the latest COMPLETED deployment and
      is supported for ECS rolling updates.
    facts:
      - ecs-failure-breaker
      - ecs-failure-controller
      - ecs-failure-rollback
  - id: ecs-007
    q: How does the ECS deployment circuit breaker detect task failures by default?
    a: It checks startup and then health-check failures. The default threshold is 50% of desired count,
      rounded up and bounded from 3 to 200. Healthy tasks reset the failure count by default.
    facts:
      - ecs-failure-stage-one
      - ecs-failure-stage-two
      - ecs-failure-threshold
      - ecs-failure-reset
  - id: ecs-008
    q: An ECS rolling deployment fails with circuit-breaker rollback enabled, but no deployment is
      COMPLETED. What happens?
    a: The deployment stalls without launching new tasks. Use deployment failure events to trigger
      investigation.
    trap: true
    facts:
      - ecs-failure-no-target
      - ecs-failure-events
  - id: ecs-020
    q: An ECS rolling deployment needs a fixed failure threshold rather than a percentage. Which
      circuit-breaker option fits?
    a: Set thresholdConfiguration.type to COUNT. Enable rollback to return to the latest COMPLETED
      deployment when the threshold is reached.
    facts:
      - ecs-failure-count
      - ecs-failure-rollback
  - id: ecs-021
    q: When should an ECS rolling service use the circuit breaker versus CloudWatch deployment alarms?
    a: "Circuit breaker: startup and task health failures. Alarms: application metric degradation. Both
      may be enabled; either can fail the deployment."
    facts:
      - ecs-failure-stage-one
      - ecs-failure-stage-two
      - ecs-failure-alarm
      - ecs-failure-both
  - id: ecs-023
    q: An ECS rolling release must catch tasks that cannot start and latency increases after startup.
      Which controls should it use?
    a: Use the circuit breaker and a CloudWatch deployment alarm for latency. Enable rollback on each
      method that must recover automatically.
    trap: true
    facts:
      - ecs-failure-breaker
      - ecs-failure-alarm
      - ecs-failure-both
  - id: ecs-036
    q: An ECS deployment begins while its configured CloudWatch alarm is already ALARM. Will ECS monitor
      that alarm during this deployment?
    a: No. ECS ignores the deployment alarm configuration for that deployment.
    trap: true
    facts:
      - ecs-failure-already-alarm
  - id: ecs-037
    q: An ECS deployment must count intermittent failures even when healthy tasks start between them.
      Which setting should change?
    a: Set resetOnHealthyTask to false. The default true resets the failure counter when a task becomes
      healthy.
    facts:
      - ecs-failure-reset
  - id: ecs-057
    q: Can an ECS native blue/green service use the ECS deployment circuit breaker for rollback?
    a: Yes. Native blue/green setup supports circuit-breaker failure detection and rollback. It is not
      limited to the ROLLING strategy; CodeDeploy is a separate controller.
    trap: true
    facts:
      - ecs-failure-native
      - ecs-failure-controller
---

The ECS deployment circuit breaker stops a release that cannot reach a stable running state. CloudWatch deployment alarms catch failures expressed as application metrics, such as increased latency.

### How it works

1. Enable the circuit breaker under the ECS deployment controller. It first watches whether tasks reach `RUNNING`, then evaluates load balancer, Cloud Map service-discovery, and container health checks. Service discovery is how applications locate their peers.
2. Fail the deployment when the configured task-failure threshold is reached. The default is `BOUNDED_PERCENT`: 50% of the latest desired count, rounded up and limited to 3 through 200.
3. Choose `UNBOUNDED_PERCENT` for an uncapped percentage, or `COUNT` for a fixed failure count. `resetOnHealthyTask: true` resets the counter on a healthy task; false accumulates failures.
4. With rollback enabled, ECS returns to the most recent `COMPLETED` deployment. If none exists, it stalls without launching new tasks.
5. Add CloudWatch alarms for application metrics. With both methods enabled, the first to meet its failure condition fails the release. That method must have rollback enabled to initiate recovery.

Native blue/green setup also supports circuit-breaker rollback. The [October 2026 VPC Lattice announcement](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments/) describes the same protection for native blue/green, linear, and canary deployments.

### Exam cues

- If the question says ECS tasks cannot start or pass health checks, think circuit breaker, because it watches task startup and health.
- If the question says tasks run but application latency rises, think deployment alarm, because task startup alone does not measure that metric.
- If the question says ECS cannot find a rollback target, think missing `COMPLETED` deployment, because rollback requires one.

### Remember

- The circuit breaker belongs to the ECS controller. Native blue/green also supports it; CodeDeploy uses separate deployment controls.
- Default threshold: 50%, rounded up, minimum 3 and maximum 200.
- `resetOnHealthyTask` defaults to true.
- Monitor `SERVICE_DEPLOYMENT_FAILED` through EventBridge and inspect `rolloutStateReason` with `DescribeServices`.

> **Trap:** An alarm already in `ALARM` at deployment start causes ECS to ignore the alarm configuration for that deployment.
