---
title: Canary release with automatic rollback
level: professional
order: 90
facts:
  - id: canary
    text: Canary shifts traffic in an initial increment and moves the remainder after a waiting interval.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: linear
    text: Linear shifts traffic in equal increments separated by equal time intervals.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: all-at-once
    text: All-at-once moves all traffic to the replacement in one step.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: lambda-canary
    text: CodeDeployDefault.LambdaCanary10Percent5Minutes shifts 10 percent first and the remaining 90 percent five minutes later.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-lambda
  - id: lambda-alias
    text: Lambda AppSpec identifies a function alias, current version, and target version for traffic shifting.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-lambda
  - id: lambda-hooks
    text: Lambda deployment validation functions run at BeforeAllowTraffic and AfterAllowTraffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#API_PutLifecycleEventHookExecutionStatus
  - id: alarm-stop
    text: CodeDeploy can stop deployments when an attached CloudWatch alarm reaches its threshold.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: alarm-rollback
    text: Automatic rollback on alarm thresholds must be configured to redeploy the last known good revision when an attached alarm activates.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: rollback-new
    text: CodeDeploy rollback redeploys a previous revision as a new deployment with a new deployment ID.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy
  - id: service-role
    text: A CodeDeploy service role authorizes operations on target resources, publishing SNS notifications, and reading CloudWatch alarms.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-service-role
  - id: ecs-alb
    text: CodeDeploy ECS canary and linear traffic shifting can use an Application Load Balancer.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-ecs
  - id: ecs-test
    text: The optional ECS test listener reaches the replacement before production traffic shifts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#ecs-allow-test-traffic
  - id: weighted-stop
    text: Manually stopping a Lambda deployment without rollback can leave its alias referencing two versions and cause later deployments to fail.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments-lambda.html#troubleshooting-manually-stopped-lambda-deployment
diagrams:
  - id: canary-release-with-automatic-rollback
    title: CodeDeploy shifts a Lambda alias in a canary and rolls back on an alarm
    width: 1100
    height: 600
    nodes:
      - { id: pipe, label: CodePipeline, sub: deploy stage, x: 40, y: 60, w: 160, h: 86, tone: devtools, icon: codepipeline }
      - { id: cd, label: CodeDeploy, sub: canary 10% 5 min, x: 300, y: 60, w: 160, h: 86, tone: devtools, icon: codedeploy, info: "Deployment group has the CloudWatch alarm attached and automatic rollback on alarm turned on." }
      - { id: hook, label: Lambda, sub: validation hook, x: 300, y: 300, w: 160, h: 86, tone: compute, icon: lambda, info: "Runs at `BeforeAllowTraffic` and `AfterAllowTraffic` and reports success or failure to CodeDeploy." }
      - { id: alias, label: Lambda alias, sub: live, x: 600, y: 60, w: 160, h: 86, tone: compute, icon: lambda }
      - { id: users, label: Clients, x: 860, y: 67, w: 150, h: 72, tone: user, icon: res-users }
      - { id: v1, label: Version 1, sub: 90% during canary, x: 600, y: 260, w: 160, h: 86, tone: compute, icon: lambda }
      - { id: v2, label: Version 2, sub: 10% canary, x: 860, y: 260, w: 160, h: 86, tone: compute, icon: lambda }
      - { id: alarm, label: CloudWatch alarm, sub: errors on new version, x: 600, y: 460, w: 170, h: 86, tone: mgmt, icon: res-cloudwatch-alarm }
    edges:
      - { from: pipe, to: cd, step: 1 }
      - { from: cd, to: hook, step: 2 }
      - { from: cd, to: alias, step: 3 }
      - { from: users, to: alias, step: 4 }
      - { from: alias, to: v1, step: 4 }
      - { from: alias, to: v2, step: 4 }
      - { from: v2, to: alarm, step: 5 }
      - { from: alarm, to: cd, step: 5 }
    steps:
      - "The pipeline's deploy stage starts a CodeDeploy deployment whose AppSpec names the alias, the current version and the target version."
      - "The BeforeAllowTraffic hook validates the new version before it gets any traffic."
      - "CodeDeploy points 10 percent of the alias at version 2, waits five minutes, then shifts the rest."
      - "Clients call the alias, which splits requests between the two versions while the canary runs."
      - "If the alarm on the new version's errors fires, CodeDeploy stops the deployment and rolls back to the last known good version as a new deployment."
cards:
  - id: reference-architectures-054
    q: "A Lambda function update must reach 10 percent of requests first and then everyone if nothing breaks, with no custom traffic code. What fits?"
    a: "A CodeDeploy deployment with a **canary** configuration such as `CodeDeployDefault.LambdaCanary10Percent5Minutes`, shifting the function's **alias** from the current to the target version."
    facts: [canary, lambda-canary, lambda-alias]
  - id: reference-architectures-055
    q: "How do CodeDeploy canary, linear and all-at-once deployments differ?"
    a: "**Canary**: one first increment, then the rest after a wait.\n**Linear**: equal increments at equal intervals.\n**All-at-once**: everything in one step."
    facts: [canary, linear, all-at-once]
  - id: reference-architectures-056
    q: "A canary deployment must undo itself if the new version's error rate rises during the shift. What must the CodeDeploy deployment group have?"
    a: "A **CloudWatch alarm** on the error metric attached to the deployment group, with **automatic rollback on alarm** turned on, so CodeDeploy redeploys the last known good revision."
    facts: [alarm-stop, alarm-rollback]
  - id: reference-architectures-057
    q: "An alarm is attached to a CodeDeploy deployment group and fires during a canary, but the previous version is not redeployed. What was missed?"
    a: "**Automatic rollback on alarm** was not configured. Without it, the alarm can stop the deployment, but CodeDeploy does not redeploy the last known good revision."
    trap: true
    facts: [alarm-stop, alarm-rollback]
  - id: reference-architectures-058
    q: "Before any user traffic reaches a new Lambda version in a CodeDeploy deployment, a smoke test must pass. Where does it run?"
    a: "In a validation Lambda function on the **BeforeAllowTraffic** hook. `AfterAllowTraffic` can check again after the shift."
    facts: [lambda-hooks]
  - id: reference-architectures-059
    q: "After an automatic CodeDeploy rollback, a team searches for the original deployment ID to see the rollback. Where is it?"
    a: "A rollback is a **new deployment with a new ID** that redeploys the previous revision."
    trap: true
    facts: [rollback-new]
  - id: reference-architectures-060
    q: "An Amazon ECS service behind an Application Load Balancer needs a canary release, with testers reaching the new task set before customers. What fits?"
    a: "A CodeDeploy ECS blue/green deployment with a **canary** configuration on the ALB and an optional **test listener** that reaches the replacement before production traffic shifts."
    facts: [ecs-alb, ecs-test, canary]
---
Release questions ask how to ship a change to a small share of users, watch it and undo it automatically if it misbehaves. With Lambda or ECS, CodeDeploy does the traffic shifting, hooks run the checks, and a CloudWatch alarm on the deployment group triggers the rollback.

### How it works

1. The pipeline starts a CodeDeploy deployment. For Lambda, the AppSpec names the alias, the current version and the target version. [Deployment configurations](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html)
2. The `BeforeAllowTraffic` hook runs a validation function before the new version gets traffic.
3. A canary configuration moves a first share of traffic, waits, then moves the rest. Linear moves equal shares at equal intervals.
4. A CloudWatch alarm on the new version's errors is attached to the deployment group. With automatic rollback on alarm, CodeDeploy stops and redeploys the last known good revision as a new deployment.
5. For ECS, the same pattern shifts an Application Load Balancer between task sets, with an optional test listener first.

| Configuration | How traffic moves | Fits |
|---|---|---|
| Canary | One increment, then the rest after a wait | Fast check on real traffic |
| Linear | Equal increments at equal intervals | Gradual ramp with time to watch |
| All-at-once | Everything in one step | Speed over safety |

### Exam cues

- If the question says send a small percentage first and the rest later, think a canary deployment configuration.
- If the question says increase traffic gradually in equal steps, think linear.
- If the question says roll back automatically when errors rise, think a CloudWatch alarm on the deployment group plus automatic rollback on alarm.
- If the question says test before any traffic, think the `BeforeAllowTraffic` hook (or the ECS test listener).

### Remember

- `LambdaCanary10Percent5Minutes`: 10 percent, then 90 percent five minutes later.
- The CodeDeploy service role must be able to read CloudWatch alarms.
- A rollback is a new deployment with a new ID.
- Stopping a Lambda deployment by hand without rollback can leave the alias on two versions.

> **Trap:** Attaching an alarm alone does not revert anything. Automatic rollback on alarm must be configured too.
