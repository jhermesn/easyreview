---
title: Traffic shifting and health gates
level: associate
order: 30
facts:
  - id: canary-shift
    text: ECS canary sends a selected share of traffic to the new revision, waits for evaluation, then
      moves the remaining traffic together.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/canary-deployment.html
  - id: linear-shift
    text: ECS linear moves traffic in equal percentage increments with waits between increments.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: bake-time
    text: ECS deployment bake time keeps both revisions running after all production traffic has shifted
      and before the old revision is terminated.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: ecs-strategies
    text: The ECS deployment configuration supports ROLLING, BLUE_GREEN, LINEAR, and CANARY strategies.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html#API_DeploymentConfiguration_Contents
  - id: code-configs
    text: CodeDeploy ECS and Lambda deployments support canary, linear, or all-at-once traffic shifting.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
  - id: ec2-configs
    text: CodeDeploy EC2 predefined deployment configurations are AllAtOnce, HalfAtATime, and
      OneAtATime; the default is OneAtATime.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
  - id: cd-alarm
    text: A CodeDeploy deployment group can stop deployment when an associated CloudWatch alarm
      activates.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-create-alarms.html
  - id: cd-auto-rollback
    text: CodeDeploy automatic rollback must be configured to redeploy the last known good revision on
      deployment failure or a specified monitoring threshold.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html
  - id: ec2-validation
    text: CodeDeploy EC2 ValidateService hooks run validation scripts after ApplicationStart.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-server
  - id: lambda-hooks
    text: CodeDeploy Lambda deployments have BeforeAllowTraffic and AfterAllowTraffic validation hooks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-lambda
  - id: ecs-hooks
    text: CodeDeploy ECS deployments provide validation hooks including AfterAllowTestTraffic and
      BeforeAllowTraffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-ecs
  - id: eb-health
    text: Beanstalk rolling deployments wait for batch health before continuing and fail if the command
      timeout expires.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: eb-alb
    text: Beanstalk traffic splitting requires an Application Load Balancer.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: ecs-breaker
    text: The ECS deployment circuit breaker is supported only with rolling deployments and can roll
      back to the latest COMPLETED deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-no-target
    text: An ECS circuit breaker without a COMPLETED deployment cannot start rollback tasks and the
      deployment stalls.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html
  - id: ecs-alarms
    text: ECS rolling deployments can use circuit breaker failure detection for task startup or health
      and CloudWatch alarms for application metrics.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: eks-readiness
    text: A failed EKS readiness probe removes a pod from Kubernetes Service traffic until it becomes
      ready; a liveness probe addresses failures by restarting the workload.
    source: https://docs.aws.amazon.com/eks/latest/best-practices/application.html
  - id: refresh-gates
    text: Instance refresh can pause at checkpoints and use final bake time to validate health before
      completion.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
  - id: refresh-alarms
    text: Instance refresh auto rollback can reverse a failed refresh or one stopped by a configured
      CloudWatch alarm in ALARM.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html
  - id: appconfig-alarms
    text: During deployment, AppConfig rolls configuration back for configured alarms in ALARM or
      INSUFFICIENT_DATA, unless their actions are disabled.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html
diagrams:
  - id: deployment-canary-health-flow
    title: Canary traffic and health feedback
    width: 900
    height: 650
    nodes:
      - id: router
        label: Load balancer
        sub: split production traffic
        icon: elastic-load-balancing
        tone: network
        x: 340
        y: 40
        w: 220
        h: 86
      - id: old
        label: Old version
        sub: remaining traffic
        icon: ec2
        tone: compute
        x: 30
        y: 270
        w: 220
        h: 86
      - id: new
        label: New version
        sub: initial canary share
        icon: ec2
        tone: compute
        x: 650
        y: 270
        w: 220
        h: 86
      - id: health
        label: Health alarms
        sub: evaluate release metrics
        icon: cloudwatch
        tone: mgmt
        x: 340
        y: 510
        w: 220
        h: 86
    edges:
      - from: router
        to: old
        step: 1
      - from: router
        to: new
        step: 2
      - from: new
        to: health
        step: 3
      - from: health
        to: router
        step: 4
    steps:
      - The original version continues serving its traffic share.
      - The load balancer sends the configured initial share to the replacement version.
      - Observe application metrics during evaluation.
      - Use the configured deployment controls to stop or roll back a bad release; otherwise move
        the remaining traffic after evaluation.
cards:
  - id: deployment-strategies-006
    q: Which health controls fit CodeDeploy, Beanstalk, ECS rolling, EKS, and an EC2 Auto Scaling
      instance refresh?
    a: Use CodeDeploy validation hooks and deployment-group alarms; Beanstalk batch health and timeout;
      ECS circuit breaker or metric alarms; EKS readiness probes for traffic eligibility; instance
      refresh checkpoints, bake time, and configured auto rollback.
    facts:
      - cd-alarm
      - ec2-validation
      - lambda-hooks
      - eb-health
      - ecs-alarms
      - eks-readiness
      - refresh-gates
      - refresh-alarms
  - id: deployment-strategies-015
    q: An ECS team wants a small initial traffic share, an evaluation pause, then all remaining traffic
      moved together. Which strategy fits?
    a: Canary. Linear uses repeated equal increments; canary uses an initial share followed by the
      remainder.
    facts:
      - canary-shift
      - linear-shift
  - id: deployment-strategies-016
    q: An EKS application is temporarily unable to serve requests but should not restart. Which probe
      should remove it from Service traffic?
    a: A readiness probe. Its failure removes the pod from Service traffic until readiness succeeds.
    facts:
      - eks-readiness
  - id: deployment-strategies-017
    q: An ECS rolling deployment fails on a newly created service with no COMPLETED deployment. Can the
      circuit breaker restore a previous revision?
    a: No. It needs a COMPLETED deployment as the rollback target; without one, deployment stalls.
    trap: true
    facts:
      - ecs-breaker
      - ecs-no-target
  - id: deployment-strategies-018
    q: A CodeDeploy CloudWatch alarm stops a deployment. Does that alone configure automatic rollback?
    a: No. Configure automatic rollback on the deployment or deployment group as well as alarm-based
      stopping.
    trap: true
    facts:
      - cd-alarm
      - cd-auto-rollback
  - id: deployment-strategies-019
    q: What does ECS deployment bake time protect after all traffic has moved to the new revision?
    a: An observation interval while both revisions still run. The old revision is terminated after that
      interval.
    facts:
      - bake-time
  - id: deployment-strategies-020
    q: An AppConfig deployment alarm enters INSUFFICIENT_DATA. What happens when alarm actions remain
      enabled?
    a: AppConfig rolls configuration back to the previous version during deployment. It responds to
      ALARM as well as INSUFFICIENT_DATA.
    facts:
      - appconfig-alarms
---

Traffic shifting controls how many requests reach a new version while it is evaluated. A health gate is a check that can stop rollout when the new version is not ready. The [ECS canary workflow](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/canary-deployment.html) combines limited initial exposure with evaluation before the remaining traffic moves.

### How it works

1. Prepare the new version alongside the old one. A canary sends it an initial traffic share and then the remainder after evaluation. Linear deployment uses equal traffic increments with a wait between each.
2. Test readiness and application behavior before increasing exposure. In CodeDeploy, a hook is a validation function or script at a named point: EC2 uses ValidateService after application start; Lambda uses BeforeAllowTraffic and AfterAllowTraffic; ECS also offers AfterAllowTestTraffic.
3. Watch health and application metrics. CloudWatch alarms compare a measured signal with a configured condition. CodeDeploy alarm-based stopping and automatic rollback are separate configuration choices.
4. In ECS rolling deployments, the circuit breaker detects startup or health failure. It needs a previously COMPLETED deployment for rollback. EKS readiness probes, which test whether a pod can accept requests, remove an unready pod from Service traffic without using a liveness restart.
5. Keep an observation interval before cleanup. ECS deployment bake time retains both revisions after the final traffic shift. Instance refresh offers checkpoints, which pause after partial replacement, and a final bake time before completion.

### Exam cues

- If the question says expose a small share then move the remainder after a pause, think canary, because it has an initial evaluation phase. Equal repeated increments indicate linear.
- If the question says CodeDeploy must recover after an alarm stops rollout, think configure automatic rollback as well, because stopping alone does not select that recovery behavior.
- If the question says temporary EKS unavailability without restart, think readiness, because unready pods stop receiving Service traffic.
- If the question says AppConfig must revert a bad configuration during deployment, think configured CloudWatch alarms, because ALARM or INSUFFICIENT_DATA can trigger rollback while alarm actions are enabled.

### Remember

| Platform | Relevant controls |
|---|---|
| CodeDeploy EC2 | AllAtOnce, HalfAtATime, OneAtATime; default OneAtATime; ValidateService and alarms |
| CodeDeploy Lambda / ECS | Canary, linear, all-at-once; platform-specific validation hooks and alarms |
| ECS native | ROLLING, BLUE_GREEN, LINEAR, CANARY; circuit breaker is specific to rolling |
| Beanstalk Standard | Batch health and command timeout; traffic splitting requires an Application Load Balancer |
| EKS | Readiness controls Service traffic; liveness addresses failures by restarting the workload |
| EC2 Auto Scaling instance refresh | Checkpoints, final bake time, configured alarm-based auto rollback |
| AppConfig | Alarm-based rollback of configuration during deployment |

> **Trap:** An ECS circuit breaker cannot invent a working revision. Without a COMPLETED deployment, it has no rollback target.
