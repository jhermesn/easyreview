---
title: Native traffic shifting
level: professional
order: 50
facts:
  - id: ecs-traffic-strategies
    text: The ECS controller supports ROLLING, BLUE_GREEN, LINEAR, and CANARY; ROLLING is the default
      strategy.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_service-options.html#service_deployment-controllers
  - id: ecs-traffic-controllers
    text: CodeDeploy and EXTERNAL remain separate deployment controller options.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_service-options.html#service_deployment-controllers
  - id: ecs-traffic-blue
    text: Native blue/green runs an old blue service revision alongside a new green revision before
      directing production traffic to green.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-blue-green.html
  - id: ecs-traffic-linear
    text: LINEAR shifts production traffic to the new service revision in equal percentage increments.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: ecs-traffic-canary
    text: CANARY sends a configured fraction of production traffic to the new revision, waits, then
      sends the remainder.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CanaryConfiguration.html
  - id: ecs-traffic-canary-defaults
    text: CanaryConfiguration defaults to canaryPercent 5.0 and canaryBakeTimeInMinutes 10.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CanaryConfiguration.html
  - id: ecs-traffic-routing
    text: ALB, NLB, Service Connect, or VPC Lattice can provide traffic shifting for native deployment
      strategies.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: ecs-traffic-alb
    text: With an ALB, native blue/green uses primary and alternate target groups plus a production
      listener rule.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/alb-resources-for-blue-green.html
  - id: ecs-traffic-test
    text: An optional test listener can route validation traffic to green before production traffic
      moves.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/alb-resources-for-blue-green.html
  - id: ecs-traffic-role
    text: ECS needs an infrastructure IAM role to manage load balancer resources for native traffic
      shifting.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/alb-resources-for-blue-green.html
  - id: ecs-traffic-bake
    text: Deployment bake time retains both revisions after production traffic has shifted, before old
      tasks are terminated.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_DeploymentConfiguration.html
  - id: ecs-traffic-bake-cfn
    text: CloudFormation defaults BakeTimeInMinutes to 15 for blue/green, linear, and canary when
      omitted.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-ecs-service-deploymentconfiguration.html
  - id: ecs-traffic-bake-controllers
    text: CODE_DEPLOY and EXTERNAL do not support the ECS BakeTimeInMinutes property.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-ecs-service-deploymentconfiguration.html
  - id: ecs-traffic-hooks
    text: Lifecycle hooks can invoke Lambda or pause a deployment; a pause resumes through
      ContinueServiceDeployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: ecs-traffic-overlap
    text: Linear deployments keep both revisions running during deployment and can temporarily double
      resource usage.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
  - id: ecs-traffic-rollback
    text: During native ALB blue/green deployment, rollback can route traffic back to the old target
      group.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/alb-resources-for-blue-green.html
  - id: ecs-traffic-codedeploy-nlb
    text: A CodeDeploy ECS deployment with an NLB supports only CodeDeployDefault.ECSAllAtOnce.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html
  - id: ecs-traffic-blue-date
    text: Native ECS blue/green deployments launched in July 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/07/amazon-ecs-built-in-blue-green-deployments/
  - id: ecs-traffic-linear-date
    text: Native ECS linear and canary deployments launched in October 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-ecs-built-in-linear-canary-deployments/
  - id: ecs-traffic-nlb-date
    text: Native ECS linear and canary support for Network Load Balancers launched in February 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/02/amazon-ecs-nlb-linear-canary-deployments/
  - id: ecs-traffic-lattice-date
    text: Native ECS traffic shifting through VPC Lattice launched in October 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-vpc-lattice-blue-green-deployments/
  - id: ecs-traffic-pause-date
    text: ECS pause and continue deployment controls launched in May 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/05/amazon-ecs-pause-continue-deployments/
  - id: ecs-traffic-headless
    text: A headless native blue/green service replaces blue tasks with green tasks without ECS-managed
      traffic shifting.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-blue-green.html
diagrams:
  - id: ecs-native-blue-green-routing
    title: ALB routes requests between revisions
    width: 800
    height: 400
    nodes:
      - id: alb
        label: ALB
        icon: elastic-load-balancing
        x: 40
        y: 155
        w: 180
        h: 86
        tone: network
        sub: listener rule
      - id: blue
        label: Blue tasks
        icon: res-elastic-container-service-task
        x: 560
        y: 40
        w: 180
        h: 86
        tone: compute
        sub: primary target group
      - id: green
        label: Green tasks
        icon: res-elastic-container-service-task
        x: 560
        y: 270
        w: 180
        h: 86
        tone: compute
        sub: alternate target group
    edges:
      - from: alb
        to: blue
        step: 1
        label: before shift
      - from: alb
        to: green
        step: 2
        label: after shift
    steps:
      - Production initially routes to blue; an optional test listener can validate green.
      - ECS moves production to green and retains blue during deployment bake time for rollback.
cards:
  - id: ecs-010
    q: Which deployment strategies can the ECS controller run without CodeDeploy?
    a: ROLLING, BLUE_GREEN, LINEAR, and CANARY. ROLLING is the default. CodeDeploy and EXTERNAL are
      separate controllers.
    facts:
      - ecs-traffic-strategies
      - ecs-traffic-controllers
  - id: ecs-011
    q: An ECS release must test a new revision before production traffic reaches it. Which deployment
      approach fits?
    a: Use native blue/green with test traffic routing. Blue stays available while green is tested;
      deployment bake time retains blue after production shifts.
    facts:
      - ecs-traffic-blue
      - ecs-traffic-test
      - ecs-traffic-bake
  - id: ecs-022
    q: How can an ECS native deployment retain the old revision and run custom validation?
    a: Set deployment bake time and lifecycle hooks. Hooks invoke Lambda or pause until
      ContinueServiceDeployment is called. CloudFormation defaults the native traffic strategies to
      15 minutes of bake time.
    facts:
      - ecs-traffic-bake
      - ecs-traffic-hooks
      - ecs-traffic-bake-cfn
  - id: ecs-038
    q: An ECS team wants a small production trial followed by shifting all remaining traffic. Which
      strategy fits?
    a: CANARY. Its canary configuration defaults to 5% traffic and a 10-minute canary wait; this wait is
      separate from deployment bake time.
    facts:
      - ecs-traffic-canary
      - ecs-traffic-canary-defaults
      - ecs-traffic-bake
  - id: ecs-039
    q: An ECS service must increase production exposure in equal increments. Which deployment strategy
      fits?
    a: LINEAR. Configure the traffic increment and wait between steps. Both revisions run during the
      deployment.
    facts:
      - ecs-traffic-linear
      - ecs-traffic-overlap
  - id: ecs-040
    q: An ECS service uses CodeDeploy with a Network Load Balancer. Can it use a CodeDeploy canary
      deployment configuration?
    a: No. That controller and load balancer combination supports only CodeDeployDefault.ECSAllAtOnce.
      Do not transfer that restriction to native ECS strategies.
    trap: true
    facts:
      - ecs-traffic-codedeploy-nlb
      - ecs-traffic-routing
---

Native ECS traffic shifting runs an old revision, blue, beside a replacement revision, green. It lets you test green before moving production requests and retain blue for rollback.

### How it works

1. Choose a deployment strategy under the `ECS` controller. `CODE_DEPLOY` and `EXTERNAL` are separate controllers.
2. Configure traffic routing through an ALB, NLB, Service Connect, or VPC Lattice. With an Application Load Balancer (ALB), a listener rule chooses a target group, a set of destinations for requests. Configure primary and alternate groups and an ECS infrastructure role for load balancer management.
3. Start green alongside blue. An optional test listener sends validation requests to green before production moves.
4. Shift production using the selected strategy. A lifecycle hook runs custom Lambda checks or pauses until `ContinueServiceDeployment` resumes the deployment.
5. Keep blue running during deployment bake time, the observation period after production has moved. With an ALB, rollback can send traffic back to blue. Terminate blue after successful completion.

| Strategy | Change |
| --- | --- |
| `ROLLING` | Replace tasks in batches; default strategy |
| `BLUE_GREEN` | Validate green, then switch production to it |
| `LINEAR` | Move production in equal increments |
| `CANARY` | Move a fraction, wait, then move the remainder |

Native blue/green launched in July 2025; native linear and canary followed in October 2025. NLB linear/canary support arrived in February 2026, pause controls in May 2026, and VPC Lattice traffic shifting in October 2026. A headless blue/green service, one without a traffic-routing integration, replaces tasks without ECS-managed traffic shifting.

### Exam cues

- If the question says validate ECS green with test requests first, think blue/green and a test listener, because production can stay on blue during testing.
- If the question says equal traffic increments, think linear, because each step increases exposure by the configured amount.
- If the question says a small trial followed by the rest, think canary, because it has an initial production trial.

### Remember

- The canary configuration defaults to 5% and a 10-minute canary wait.
- CloudFormation defaults native blue/green, linear, and canary deployment bake time to 15 minutes when omitted. `CODE_DEPLOY` and `EXTERNAL` do not support this property.
- Running both revisions consumes overlapping capacity; linear deployments can temporarily double usage.

> **Trap:** The NLB all-at-once restriction belongs to CodeDeploy ECS deployments. Native ECS has its own traffic-shifting strategies.
