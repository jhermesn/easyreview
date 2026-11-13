---
title: Rollout capacity and cost
level: associate
order: 20
facts:
  - id: all-at-once
    text: For Beanstalk Standard, all-at-once deploys to every instance together and can cause a short
      outage.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html#deployments-scenarios
  - id: rolling
    text: Beanstalk Standard rolling deployment updates existing instances in batches while other
      batches keep serving.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: rolling-mixed
    text: During a Beanstalk rolling deployment, old and new application versions can serve requests
      simultaneously.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: additional-batch
    text: Beanstalk Standard Rolling with additional batch launches a batch before removing any instance
      from service and terminates the extra batch afterwards.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: immutable-fleet
    text: Beanstalk immutable deployment launches a full replacement set in a temporary Auto Scaling
      group.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: immutable-quota
    text: Beanstalk immutable environment updates briefly double instance capacity and require enough
      instance quota.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html
  - id: traffic-fleet
    text: Beanstalk traffic splitting launches as many new instances as the original fleet and keeps
      both group sizes constant during evaluation.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: blue-green-env
    text: Beanstalk blue/green deploys to a separate environment and swaps environment CNAME records to
      redirect traffic.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
  - id: batch-units
    text: Beanstalk Standard rolling batch size can be configured as an instance count or a percentage.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: ecs-minimum
    text: ECS minimumHealthyPercent is a lower healthy-task bound rounded up from desired count.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-maximum
    text: ECS maximumPercent is an upper running-task bound rounded down from desired count.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-progress
    text: ECS rolling deployment settings must permit at least one task to start or stop for the rollout
      to progress.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: ecs-linear-capacity
    text: ECS linear deployments temporarily run both old and new revisions and may double resource
      usage.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-linear.html
cards:
  - id: deployment-strategies-004
    q: For Beanstalk Standard, which deployment policies need a full replacement fleet and which needs
      only an extra batch?
    a: Immutable and traffic splitting create a full replacement instance set. Rolling with additional
      batch temporarily adds one batch. Plain rolling updates existing batches; blue/green runs a
      separate environment.
    facts:
      - immutable-fleet
      - traffic-fleet
      - additional-batch
      - rolling
      - blue-green-env
  - id: deployment-strategies-011
    q: A Beanstalk Standard application must retain serving capacity during a rolling release while
      adding only one temporary batch. Which policy fits?
    a: Rolling with additional batch. Beanstalk starts the extra batch before taking existing instances
      out of service.
    facts:
      - additional-batch
  - id: deployment-strategies-012
    q: A Beanstalk immutable environment update cannot launch its replacement fleet because the EC2
      quota is too low. What was missing from the capacity plan?
    a: Headroom for a full second set of instances. Immutable updates briefly double instance capacity.
    facts:
      - immutable-quota
  - id: deployment-strategies-013
    q: An ECS rolling service has minimumHealthyPercent 100 and maximumPercent 100 with no tasks allowed
      to stop or start. Why is deployment stuck?
    a: Its configuration permits no progress. The lower healthy bound prevents stopping tasks and the
      upper bound prevents starting replacements. Adjust the bounds so at least one task can start
      or stop.
    trap: true
    facts:
      - ecs-minimum
      - ecs-maximum
      - ecs-progress
  - id: deployment-strategies-014
    q: How can Beanstalk Standard rolling deployment batch size be expressed?
    a: As an instance count or a percentage. Smaller batches update fewer instances at a time while old
      and new versions can coexist.
    facts:
      - batch-units
      - rolling
      - rolling-mixed
---

Deployment capacity planning asks how much of the old application can stay available while the new version starts. The [Beanstalk deployment policies](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments) provide a concrete comparison for EC2-based Beanstalk Standard environments. Other platforms have their own capacity controls.

### How it works

1. For all-at-once, update every existing instance together. The application can briefly lose service while its servers restart.
2. For rolling, update a batch while the remaining batches serve traffic. A batch is a subset of instances, configured by count or percentage. Old and new versions can coexist.
3. For rolling with an additional batch, start extra instances first to retain serving capacity. Remove the extra batch after deployment.
4. For immutable or traffic splitting, reserve a full replacement fleet. Immutable updates briefly double instance capacity; traffic splitting maintains both fleet sizes throughout evaluation. Blue/green uses a separate environment.
5. For ECS rolling, size the lower and upper task bounds so the scheduler can make progress. The lower bound rounds up; the upper bound rounds down. ECS linear deployments also keep both revisions running temporarily and may double resource usage.

### Exam cues

- If the question says Beanstalk must keep full capacity with only one extra batch, think Rolling with additional batch, because replacement capacity starts before existing instances leave service.
- If the question says Beanstalk immutable or traffic splitting, think capacity for a full second fleet, because these policies start new instance sets.
- If the question says ECS cannot start or stop any task during deployment, think minimumHealthyPercent and maximumPercent, because their rounded bounds can prevent progress.

### Remember

| Beanstalk Standard policy | Temporary capacity implication |
|---|---|
| All at once | Updates the existing fleet together; can briefly interrupt service |
| Rolling | Uses existing batches; a batch leaves service during its update |
| Rolling with additional batch | Adds one batch before updating existing instances |
| Immutable | Creates a full replacement set in a temporary Auto Scaling group |
| Traffic splitting | Keeps a full new set alongside the original set during evaluation |
| Blue/green | Runs the new application in a separate environment |

> **Trap:** A small canary traffic share does not imply a small replacement fleet. Beanstalk traffic splitting starts a full new instance set even while that set receives only a fraction of traffic.
