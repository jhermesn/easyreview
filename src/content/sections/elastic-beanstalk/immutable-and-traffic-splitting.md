---
title: Immutable deployments and traffic splitting
level: associate
order: 30
facts:
  - id: immutable-group
    text: An immutable update starts one new instance in a temporary Auto Scaling group behind the existing load balancer.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-scale
    text: After the first replacement passes health checks, Beanstalk grows the temporary group to match the original fleet.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-success
    text: After all replacements pass, Beanstalk transfers them to the original group and removes the old fleet and temporary group.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-failure
    text: A failed immutable deployment removes the temporary group and leaves original instances untouched.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-health
    text: Immutable updates require enhanced health reporting.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-quota
    text: Immutable updates temporarily double instance capacity and require sufficient instance quota.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: credits
    text: Replacing instances with immutable updates or traffic splitting loses their accumulated EC2 burst balances.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: dual-policy
    text: "Configure DeploymentPolicy: Immutable in aws:elasticbeanstalk:command and RollingUpdateType: Immutable in aws:autoscaling:updatepolicy:rollingupdate to use immutable behavior for both application deployments and instance configuration changes."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#updates-immutable-namespace
  - id: resource-restriction
    text: An immutable update cannot concurrently change other resource configuration such as load balancer settings; use separate updates for independent changes or blue/green for dependent changes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: split-fleet
    text: Traffic splitting launches a full fleet in a temporary Auto Scaling group and keeps each fleet at its starting count throughout deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: split-settings
    text: Traffic splitting requires an Application Load Balancer.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: split-options
    text: NewVersionPercent and EvaluationTime in aws:elasticbeanstalk:trafficsplitting set the traffic share and evaluation duration in minutes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: split-success
    text: If the new fleet stays healthy for the evaluation period, Beanstalk moves all traffic to it, transfers it to the original group, and removes old instances and the temporary group.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: split-failure
    text: If traffic-splitting health checks fail or the deployment is aborted, traffic returns to the old fleet and the new instances are terminated.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: abort-api
    text: AbortEnvironmentUpdate can abort an ongoing deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
diagrams:
  - id: beanstalk-immutable-deploy
    title: Immutable replacement behind the existing load balancer
    width: 1040
    height: 350
    nodes:
      - id: eb
        label: Elastic Beanstalk
        icon: elastic-beanstalk
        x: 20
        y: 220
        w: 180
        h: 86
        sub: creates replacements
        tone: compute
      - id: alb
        label: Load balancer
        icon: elastic-load-balancing
        x: 370
        y: 70
        w: 180
        h: 86
        sub: same environment endpoint
        tone: network
      - id: old
        label: Original group
        icon: res-ec2-auto-scaling
        x: 730
        y: 20
        w: 180
        h: 86
        sub: old version
        tone: compute
      - id: temp
        label: Temporary group
        icon: res-ec2-auto-scaling
        x: 730
        y: 220
        w: 180
        h: 86
        sub: new version
        tone: compute
    edges:
      - from: eb
        to: temp
        step: 1
        label: launch
      - from: alb
        to: old
        step: 2
        label: old fleet serves
      - from: alb
        to: temp
        step: 3
        label: new fleet health
    steps:
      - Create a temporary group and launch one instance.
      - The original fleet remains available while the first replacement is evaluated.
      - After the first passes, launch the remaining replacements. Move the healthy fleet to the original group on success; discard the temporary group on failure.
  - id: beanstalk-traffic-evaluation
    title: Traffic splitting during the evaluation period
    width: 1060
    height: 360
    nodes:
      - id: client
        label: Client
        icon: res-client
        x: 20
        y: 120
        w: 180
        h: 72
        tone: user
      - id: alb
        label: ALB
        icon: elastic-load-balancing
        x: 360
        y: 120
        w: 180
        h: 86
        sub: splits requests
        tone: network
      - id: old
        label: Original fleet
        icon: res-ec2-auto-scaling
        x: 740
        y: 20
        w: 180
        h: 86
        sub: remaining traffic
        tone: compute
      - id: new
        label: New fleet
        icon: res-ec2-auto-scaling
        x: 740
        y: 240
        w: 180
        h: 86
        sub: configured share
        tone: compute
    edges:
      - from: client
        to: alb
        step: 1
      - from: alb
        to: new
        step: 2
        label: NewVersionPercent
      - from: alb
        to: old
        step: 3
        label: remaining traffic
    steps:
      - Requests reach the environment ALB.
      - The ALB sends the configured share to the new fleet during EvaluationTime.
      - The old fleet serves the remainder. Healthy evaluation switches all traffic; failure or abort returns it to the old fleet.
cards:
  - id: elastic-beanstalk-004
    q: An Elastic Beanstalk deployment failure must leave the original instances untouched. Which policies fit?
    a: Immutable and Traffic splitting. Both launch a new fleet in a temporary Auto Scaling group and discard it on failure.
    facts:
      - immutable-failure
      - split-failure
      - abort-api
  - id: elastic-beanstalk-005
    q: What does Elastic Beanstalk traffic splitting require and which options control the evaluation?
    a: An Application Load Balancer. Set NewVersionPercent for the new fleet traffic share and EvaluationTime for the evaluation duration in minutes.
    facts:
      - split-settings
      - split-options
  - id: elastic-beanstalk-013
    q: An Elastic Beanstalk team wants replacement instances and recovery that leaves the original fleet untouched. How does Immutable work?
    a: Launch one instance in a temporary group, expand after health checks, then transfer the healthy fleet. On failure, remove the temporary group.
    facts:
      - immutable-group
      - immutable-scale
      - immutable-success
      - immutable-failure
  - id: elastic-beanstalk-014
    q: What must an Elastic Beanstalk team account for before enabling immutable updates?
    a: Enhanced health reporting, quota for a temporary doubling of instances, and loss of accumulated EC2 burst balances when instances are replaced.
    trap: true
    facts:
      - immutable-health
      - immutable-quota
      - credits
  - id: elastic-beanstalk-015
    q: How does Elastic Beanstalk traffic splitting add testing beyond an immutable deployment?
    a: It sends a configured percentage of traffic to the new fleet for an evaluation period before switching all traffic. It requires an Application Load Balancer.
    facts:
      - split-settings
      - split-options
      - split-success
  - id: elastic-beanstalk-016
    q: An Elastic Beanstalk team needs a new version to receive a configurable traffic share for an evaluation window. Which policy fits?
    a: Traffic splitting. Configure NewVersionPercent and EvaluationTime.
    facts:
      - split-settings
      - split-options
  - id: elastic-beanstalk-032
    q: An Elastic Beanstalk release changes code and instance type. Can immutable behavior cover both?
    a: Yes, configure immutable application deployments and immutable configuration updates, or separate the changes. Concurrent changes to other resource settings, such as the load balancer, still need separate updates or blue/green.
    trap: true
    facts:
      - dual-policy
      - resource-restriction
  - id: elastic-beanstalk-044
    q: An Elastic Beanstalk release changes a load balancer setting that depends on new application code. Can it use one immutable update?
    a: Use blue/green. An immutable update cannot concurrently apply other resource configuration changes; separate updates work when the changes are independent.
    trap: true
    facts:
      - resource-restriction
  - id: elastic-beanstalk-045
    q: An Elastic Beanstalk traffic-splitting release starts failing during evaluation. How does the team stop it?
    a: Abort the operation, including with AbortEnvironmentUpdate. Beanstalk returns traffic to the old fleet and terminates the new instances.
    facts:
      - split-failure
      - abort-api
---
Immutable updates build a replacement fleet beside the running fleet so a failed deployment can discard the replacements. Traffic splitting adds a canary evaluation: a selected share of real requests reaches the new version before the final switch. An Auto Scaling group is the set that maintains a fleet's desired instance count.

### How it works

1. For Immutable, Beanstalk creates a temporary Auto Scaling group behind the existing load balancer and launches one new instance.
2. After that instance passes health checks, Beanstalk starts enough new instances to match the original fleet. Enhanced health reporting is required, and instance capacity temporarily doubles.
3. After every new instance passes, Beanstalk moves the replacements into the original group, removes the old instances, and deletes the temporary group. Failure removes the temporary group and leaves the old fleet untouched.
4. For Traffic splitting, Beanstalk launches a full replacement fleet and an Application Load Balancer sends it the `NewVersionPercent` share for `EvaluationTime` minutes. Both fleets keep their starting instance counts during evaluation.
5. A healthy evaluation moves all requests to the new fleet and completes replacement. Failed health checks or an abort return traffic to the original fleet and remove the new one. `AbortEnvironmentUpdate` can stop the operation.

Application deployment and instance configuration policies are independent. To use immutable behavior for both, set `DeploymentPolicy: Immutable` in `aws:elasticbeanstalk:command` and `RollingUpdateType: Immutable` in `aws:autoscaling:updatepolicy:rollingupdate`.

Other resource changes, such as load balancer settings, cannot be combined with an immutable update. Apply independent changes separately. Use blue/green when resource changes depend on the new application or instance configuration.

### Exam cues

- If the question says failure must leave the original instances untouched, think Immutable, because the replacement group can be discarded.
- If the question says evaluate a percentage of real requests before full rollout, think Traffic splitting, because its ALB separates traffic during the evaluation window.
- If the question says code and instance type both need immutable replacement, think configure both policies, because application and configuration update settings are separate.
- If the question says dependent load balancer and application changes in one release, think blue/green, because concurrent resource changes are restricted during immutable updates.

### Remember

- Immutable needs enhanced health and quota for temporary double capacity.
- Traffic splitting needs an ALB and a full second fleet for the evaluation period.
- Instance replacement loses accumulated EC2 burst balances, the credits used by burstable instances.
- `NewVersionPercent` controls the traffic share; `EvaluationTime` is in minutes.

> **Trap:** Rolling with additional batch preserves capacity while updating existing instances. It does not provide Immutable's guarantee that failure leaves the original instances untouched.
