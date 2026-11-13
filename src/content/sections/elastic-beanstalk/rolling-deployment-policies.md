---
title: Rolling deployment policies
level: associate
order: 20
facts:
  - id: deployment-default
    text: All at once is the default application deployment policy.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: eb-cli-default
    text: EB CLI scalable environments created without --single use Rolling application deployments.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: all-at-once
    text: All at once updates all instances simultaneously and takes them briefly out of service.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: rolling-batches
    text: Rolling detaches a batch from the load balancer, deploys code, reattaches it, and waits for health before the next batch.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: additional-batch
    text: Rolling with additional batch starts extra instances before taking a batch out of service to maintain full serving capacity.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: batch-cleanup
    text: Rolling with additional batch terminates the additional batch after deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
  - id: batch-options
    text: Application deployments use DeploymentPolicy, BatchSize, and BatchSizeType in aws:elasticbeanstalk:command.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-namespace
  - id: batch-type
    text: BatchSizeType is Fixed for an instance count or Percentage for a share of the group.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-namespace
  - id: batch-bounds
    text: An application deployment percentage batch can be up to 100 percent.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: fixed-bounds
    text: A fixed application deployment batch can be up to the Auto Scaling maximum instance count.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: mixed-deployment
    text: A failed rolling application deployment can leave completed batches on the new version and pending batches on the old one.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: deployment-recovery
    text: Recover from a failed rolling application deployment by deploying a fixed or known-good version.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: failed-instance-replacement
    text: Instances terminated after a failed deployment are replaced with the application version from the most recent successful deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: separate-update-policy
    text: Instance-replacing configuration updates use aws:autoscaling:updatepolicy:rollingupdate separately from application deployment settings.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#rollingupdate-namespace
  - id: config-replacement
    text: A rolling configuration update terminates and replaces each batch; changing instance type or key-pair settings can trigger replacement, including during application deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#environments-cfg-rollingupdates-deployments
  - id: config-batch-options
    text: Configuration updates use MaxBatchSize and MinInstancesInService to control replacement capacity.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#rollingupdate-namespace
  - id: config-update-type
    text: RollingUpdateType selects Health, Time, or Immutable configuration updates.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#rollingupdate-namespace
  - id: config-time-options
    text: Time-based configuration updates use PauseTime; health-based configuration updates use Timeout.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#using-features.rollingupdates
  - id: config-timeout-default
    text: The health-based rolling configuration update timeout defaults to 30 minutes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#using-features.rollingupdates
  - id: config-rollback
    text: A failed rolling configuration update starts another rolling update to restore the prior configuration; a failed rollback can leave mixed configurations.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html#using-features.rollingupdates
  - id: fresh-instances
    text: Immutable and Traffic splitting launch new instances; blue/green deploys to a separate environment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#using-features.rolling-version-deploy
cards:
  - id: elastic-beanstalk-001
    q: What is the Elastic Beanstalk application deployment default, and what does EB CLI choose for a scalable environment?
    a: All at once is the default. EB CLI uses Rolling when creating a scalable environment without --single.
    facts:
      - deployment-default
      - eb-cli-default
  - id: elastic-beanstalk-002
    q: An Elastic Beanstalk team wants a rolling application deployment without reduced serving capacity. Which policy fits?
    a: Rolling with additional batch. It starts extra capacity before taking a batch out of service.
    trap: true
    facts:
      - additional-batch
      - batch-cleanup
  - id: elastic-beanstalk-003
    q: An Elastic Beanstalk rolling application deployment fails after completing some batches. How does the team restore one working version?
    a: Deploy a fixed or known-good version. Completed batches may have the new version while pending batches still have the old version.
    trap: true
    facts:
      - mixed-deployment
      - deployment-recovery
  - id: elastic-beanstalk-008
    q: How do Elastic Beanstalk application policies differ in their use of existing or new instances?
    a: All at once and rolling policies deploy code to existing instances. Immutable and Traffic splitting launch new instances. Blue/green uses a separate environment. Instance-replacing configuration changes follow their own update policy.
    facts:
      - all-at-once
      - rolling-batches
      - fresh-instances
      - separate-update-policy
  - id: elastic-beanstalk-009
    q: Which Elastic Beanstalk option sets the application deployment policy, and what is its default?
    a: DeploymentPolicy in aws:elasticbeanstalk:command. The default is All at once; EB CLI scalable environments use Rolling.
    facts:
      - batch-options
      - batch-type
      - deployment-default
      - eb-cli-default
  - id: elastic-beanstalk-010
    q: An Elastic Beanstalk application can tolerate a brief outage while every instance receives the release simultaneously. Which policy fits?
    a: All at once. Every instance is briefly out of service during deployment.
    facts:
      - all-at-once
  - id: elastic-beanstalk-011
    q: An Elastic Beanstalk application must retain serving capacity while existing instances receive code in batches. Which policy fits?
    a: Rolling with additional batch. Extra instances are launched before existing batches are updated.
    facts:
      - additional-batch
      - batch-cleanup
  - id: elastic-beanstalk-012
    q: What version replaces an instance terminated after a failed Elastic Beanstalk rolling application deployment?
    a: The version from the most recent successful deployment. To restore the whole environment, deploy a known-good version.
    trap: true
    facts:
      - failed-instance-replacement
      - mixed-deployment
      - deployment-recovery
  - id: elastic-beanstalk-041
    q: An Elastic Beanstalk team configured application BatchSize but must control replacement during an instance type change. Which options apply?
    a: MaxBatchSize and MinInstancesInService in aws:autoscaling:updatepolicy:rollingupdate. Instance replacement has a separate policy from application deployment.
    trap: true
    facts:
      - separate-update-policy
      - config-batch-options
      - config-update-type
  - id: elastic-beanstalk-042
    q: How can an Elastic Beanstalk rolling application deployment size each batch?
    a: "Use BatchSize and BatchSizeType: Fixed for an instance count or Percentage for a share of the fleet."
    facts:
      - batch-options
      - batch-type
  - id: elastic-beanstalk-043
    q: An Elastic Beanstalk rolling configuration update fails its health checks. Does it use the application deployment recovery procedure?
    a: It starts another rolling configuration update to restore the previous configuration. A failed application deployment requires a fixed or known-good application deployment.
    trap: true
    facts:
      - config-rollback
      - mixed-deployment
      - deployment-recovery
---
Elastic Beanstalk rolling application deployments update code in batches to limit how much serving capacity is unavailable. Configuration updates that replace instances are a separate mechanism, with separate capacity and rollback settings. A batch is the group of instances processed together.

### How it works

1. Choose the application `DeploymentPolicy` in `aws:elasticbeanstalk:command`. All at once is the default; an EB CLI scalable environment created without `--single` uses Rolling.
2. For rolling application deployments, choose `BatchSize` and `BatchSizeType`: `Fixed` is an instance count and `Percentage` is a share of the group. Percentage can be up to 100 percent; Fixed can be up to the group's maximum instance count.
3. Beanstalk removes a batch from the load balancer, updates its code, reattaches it, and waits for health before continuing. Rolling with additional batch launches extra capacity first and removes the extra batch when done.
4. After an application deployment fails, inspect the mixed versions and deploy a fixed or known-good version. Terminating an instance causes replacement with the last successfully deployed version.
5. For settings that replace instances, such as instance type, configure `aws:autoscaling:updatepolicy:rollingupdate`. A rolling configuration update terminates and replaces batches. If code and a replacement-triggering setting change together, the replacement instances receive the new code.

| Application policy | What happens | Serving capacity |
|---|---|---|
| All at once | Update all instances together | Brief outage |
| Rolling | Update existing instances in batches | Reduced by a batch |
| Rolling with additional batch | Add a batch before updating | Full capacity |
| Immutable | Launch a new fleet | Original fleet remains available |
| Traffic splitting | Launch a new fleet and evaluate a share of traffic | Original fleet remains available |
| Blue/green | Deploy to a separate environment | Old environment remains available |

Configuration updates use `MaxBatchSize` for replacement batch size and `MinInstancesInService` for minimum serving capacity. `RollingUpdateType` selects `Health`, `Time`, or `Immutable`. Time-based updates use `PauseTime`; health-based updates use `Timeout`. A failed rolling configuration update attempts another rolling update to restore the previous configuration. If that rollback fails, fix the underlying problem and update again.

### Exam cues

- If the question says update existing application instances without losing capacity, think Rolling with additional batch, because new capacity starts first.
- If the question says a code deployment failed with mixed versions, think redeploy a known-good version, because application rolling deployments do not automatically restore every batch.
- If the question says an instance type change needs controlled replacement capacity, think the configuration update policy, because application `BatchSize` does not control that mechanism.

### Remember

- Application settings: `DeploymentPolicy`, `BatchSize`, `BatchSizeType`.
- Replacement settings: `MaxBatchSize`, `MinInstancesInService`, `RollingUpdateType`.
- Health-based configuration update timeout defaults to 30 minutes.

> **Trap:** An instance type change is not just a rolling code deployment. It replaces instances and uses the configuration update policy.
