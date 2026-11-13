---
title: Lambda and ECS traffic shifting
level: professional
order: 80
facts:
  - id: lambda-alias
    text: Lambda AppSpec identifies a function alias, current version, and target version for traffic
      shifting.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-lambda
  - id: canary
    text: Canary shifts traffic in an initial increment and moves the remainder after a waiting interval.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: linear
    text: Linear shifts traffic in equal increments separated by equal time intervals.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: all
    text: All-at-once moves all traffic to the replacement in one step.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-configuration
  - id: lambda-canary
    text: CodeDeployDefault.LambdaCanary10Percent5Minutes shifts 10 percent first and the remaining 90
      percent five minutes later.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-lambda
  - id: lambda-linear
    text: CodeDeployDefault.LambdaLinear10PercentEvery1Minute shifts 10 percent of traffic every minute
      until all traffic is shifted.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-lambda
  - id: ecs-controller
    text: An ECS service deployed by CodeDeploy must use the CODE_DEPLOY deployment controller.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-process-workflow-ecs
  - id: ecs-targets
    text: An ECS CodeDeploy deployment needs two target groups, a required production listener, and an
      optional test listener on an Application or Network Load Balancer.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
  - id: ecs-green
    text: CodeDeploy creates the replacement ECS task set from the AppSpec task definition and
      associates it with the alternate target group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#ecs-install
  - id: ecs-shift
    text: The optional ECS test listener reaches the replacement before production traffic shifts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#ecs-allow-test-traffic
  - id: ecs-termination
    text: After an ECS deployment, the original task set is terminated according to the configured wait.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-process-workflow-ecs
  - id: ecs-nlb
    text: With a Network Load Balancer, CodeDeploy supports only CodeDeployDefault.ECSAllAtOnce.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-ecs
  - id: ecs-alb
    text: CodeDeploy ECS canary and linear traffic shifting can use an Application Load Balancer.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-ecs
  - id: alarm-stop
    text: CodeDeploy can stop deployments when an attached CloudWatch alarm reaches its threshold.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: alarm-rollback
    text: Automatic rollback on alarm thresholds must be configured to redeploy the last known good
      revision when an attached alarm activates.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: lambda-hooks
    text: Lambda deployment validation functions run at BeforeAllowTraffic and AfterAllowTraffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#API_PutLifecycleEventHookExecutionStatus
  - id: ecs-hooks
    text: ECS CodeDeploy lifecycle validation hooks invoke Lambda functions.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#API_PutLifecycleEventHookExecutionStatus
  - id: weighted-stop
    text: Manually stopping a Lambda deployment without rollback can leave its alias referencing two
      versions and cause later deployments to fail.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments-lambda.html#troubleshooting-manually-stopped-lambda-deployment
  - id: alias-definition
    text: A Lambda alias points to a function version and can split traffic between two versions.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html#configuration-aliases
  - id: task-definition
    text: An ECS task definition describes how application containers run.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
  - id: task-set-definition
    text: An ECS task set runs an application version as a group of tasks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
  - id: canary-weights
    text: In a ten-percent Lambda canary, the original version initially receives ninety percent; after
      the shift completes, the target receives all traffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined-lambda
diagrams:
  - id: codedeploy-lambda-canary
    title: Lambda traffic shifting with an alias
    width: 950
    height: 450
    nodes:
      - id: client
        label: Callers
        icon: res-users
        x: 25
        y: 180
        w: 120
        h: 72
        tone: user
      - id: alias
        label: "alias: live"
        sub: weighted routing
        icon: lambda
        x: 275
        y: 180
        w: 160
        h: 86
        tone: compute
        info: For requests sent to this alias, CodeDeploy changes the traffic split between current and
          target versions.
      - id: v1
        label: Version 1
        sub: 90% → 0%
        icon: res-lambda-lambda-function
        x: 625
        y: 45
        w: 150
        h: 86
        tone: compute
      - id: v2
        label: Version 2
        sub: 10% → 100%
        icon: res-lambda-lambda-function
        x: 625
        y: 315
        w: 150
        h: 86
        tone: compute
      - id: cw
        label: CloudWatch alarms
        icon: res-cloudwatch-alarm
        x: 275
        y: 360
        w: 160
        h: 72
        tone: mgmt
        info: Attach an alarm to stop deployment at its threshold. Enable rollback on alarm thresholds to
          return to the last known good revision.
    edges:
      - from: client
        to: alias
        step: 1
      - from: alias
        to: v1
        label: 90%
      - from: alias
        to: v2
        step: 2
        label: 10% canary
      - from: cw
        to: alias
        step: 3
        label: alarm + rollback
        dashed: true
    steps:
      - Requests sent to the alias initially reach the current version.
      - BeforeAllowTraffic validates the target. CodeDeployDefault.LambdaCanary10Percent5Minutes
        sends 10 percent to the target, then the remaining 90 percent five minutes later;
        AfterAllowTraffic follows.
      - With alarm monitoring and automatic rollback on alarm thresholds configured, an alarm stops
        deployment and starts recovery.
  - id: ecs-blue-green
    title: ECS blue/green traffic shift
    width: 800
    height: 470
    nodes:
      - id: deploy
        label: CodeDeploy
        sub: CODE_DEPLOY
        icon: codedeploy
        x: 30
        y: 30
        w: 150
        h: 86
        tone: devtools
        info: The ECS service delegates deployment to CodeDeploy. The deployment group names the service,
          listeners, and two target groups.
      - id: listener
        label: ALB listeners
        sub: production + test
        icon: res-elastic-load-balancing-application-load-balancer
        x: 30
        y: 230
        w: 150
        h: 86
        tone: network
        info: The optional test listener can route validation traffic to the replacement task set before
          production shifts.
      - id: blue
        label: Blue task set
        sub: original targets
        icon: res-elastic-container-service-task
        x: 570
        y: 360
        w: 170
        h: 86
        tone: compute
        info: The original task set serves production until traffic moves. CodeDeploy can return traffic to
          it on rollback.
      - id: green
        label: Green task set
        sub: replacement targets
        icon: res-elastic-container-service-task
        x: 570
        y: 230
        w: 170
        h: 86
        tone: compute
        info: The new task set uses the updated task definition and the alternate target group.
    edges:
      - from: deploy
        to: green
        step: 1
        label: create replacement
      - from: listener
        to: green
        step: 2
        label: test, then shift
      - from: listener
        to: blue
        step: 3
        label: drain original
        dashed: true
    steps:
      - CodeDeploy creates the replacement task set from the AppSpec task definition and associates
        the alternate target group.
      - The optional test listener reaches green before CodeDeploy shifts production using the
        deployment configuration.
      - The original task set is terminated after the configured wait.
cards:
  - id: codedeploy-006
    q: How do CodeDeployDefault.LambdaCanary10Percent5Minutes and
      CodeDeployDefault.LambdaLinear10PercentEvery1Minute differ?
    a: Canary sends 10 percent first and the remaining 90 percent five minutes later. Linear adds 10
      percent every minute until all traffic has moved.
    facts:
      - lambda-canary
      - lambda-linear
  - id: codedeploy-013
    q: A Lambda team needs gradual releases with automatic recovery when errors rise. How should it
      configure CodeDeploy?
    a: Shift an alias with canary or linear traffic settings. Attach CloudWatch alarms and enable
      rollback when alarm thresholds are met; optionally add pre-traffic and post-traffic validation
      hooks.
    facts:
      - lambda-alias
      - canary
      - linear
      - alarm-stop
      - alarm-rollback
      - lambda-hooks
  - id: codedeploy-031
    q: How does CodeDeploy blue/green update an ECS service?
    a: Create a replacement task set from the task definition, attach the alternate target group,
      optionally test it, and shift production traffic. Terminate the original after the configured
      wait.
    facts:
      - ecs-green
      - ecs-targets
      - ecs-shift
      - ecs-termination
  - id: codedeploy-032
    q: An ECS service uses CodeDeploy and a Network Load Balancer but needs gradual traffic shifting.
      What should change?
    a: Use an Application Load Balancer. CodeDeploy supports only CodeDeployDefault.ECSAllAtOnce with a
      Network Load Balancer.
    trap: true
    facts:
      - ecs-nlb
      - ecs-alb
  - id: codedeploy-036
    q: A team needs a CodeDeploy canary release for ECS behind a Network Load Balancer. What load
      balancer meets the requirement?
    a: An Application Load Balancer. The CodeDeploy controller cannot provide canary shifting through a
      Network Load Balancer.
    trap: true
    facts:
      - ecs-nlb
      - ecs-alb
  - id: codedeploy-037
    q: How can CodeDeploy shift a Lambda release gradually and reverse it on an alarm?
    a: Use an alias with canary or linear settings, attach a CloudWatch alarm, and enable automatic
      rollback on its threshold. Validation hooks can test before and after the shift.
    facts:
      - lambda-alias
      - canary
      - linear
      - alarm-rollback
      - lambda-hooks
  - id: codedeploy-053
    q: For an ECS service deployed by CodeDeploy, where are the controller, listeners, target groups,
      and task definition configured?
    a: Set the ECS service controller to CODE_DEPLOY. Put listeners and two target groups in the
      deployment group; put the task definition in AppSpec.
    facts:
      - ecs-controller
      - ecs-targets
      - ecs-green
---
CodeDeploy releases Lambda and ECS applications by shifting traffic to a replacement version. For Lambda, an alias is a stable function name that routes requests to function versions. For ECS, a task set is a group of tasks running an application version. CodeDeploy creates a replacement task set alongside the original.

### How it works

1. For Lambda, identify the function alias and its current and target versions in AppSpec. Route the application requests through that alias.
2. For ECS, use the `CODE_DEPLOY` deployment controller, the service setting that delegates deployment to CodeDeploy. Specify two target groups and a production listener in the deployment group. A listener receives load balancer requests and routes them to a target group, a set of registered destinations.
3. CodeDeploy creates the ECS replacement from the AppSpec task definition, the configuration for running its containers. Optionally route a test listener to this replacement before production moves.
4. Shift traffic using the chosen configuration. Run optional Lambda validation functions at the supported hooks.
5. To recover automatically on a CloudWatch alarm, attach the alarm and enable rollback on alarm thresholds. For ECS, terminate the original task set after the configured wait.

| Traffic pattern | Mechanism | Example |
|---|---|---|
| Canary | Initial portion, wait, then remainder | LambdaCanary10Percent5Minutes: 10 percent, then 90 percent five minutes later |
| Linear | Equal portions at equal intervals | LambdaLinear10PercentEvery1Minute: 10 percent each minute |
| All-at-once | Move all traffic in one step | Required for CodeDeploy ECS with an NLB |

The example configuration names use the `CodeDeployDefault.` prefix. NLB means Network Load Balancer; ALB means Application Load Balancer.

### Exam cues

- If the question says try a small portion and then move everyone else, think canary, because it has an initial increment and a remaining increment.
- If the question says equal portions at regular intervals, think linear, because it repeats the same traffic increment.
- If the question says ECS canary through CodeDeploy behind an NLB, think change to an ALB, because the NLB option supports only all-at-once.
- If the question says automatic recovery on errors, think alarm plus rollback configuration, because stopping on an alarm and rolling back are separate settings.

### Remember

- ECS needs two target groups and a production listener; its test listener is optional.
- NLB with CodeDeploy: `CodeDeployDefault.ECSAllAtOnce` only.
- Lambda and ECS deployment hooks invoke Lambda validation functions.

> **Trap:** A manually stopped Lambda deployment without rollback can leave a weighted alias, an alias splitting requests across two versions. Resolve that state before another deployment.
