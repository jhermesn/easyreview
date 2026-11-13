---
title: Rollbacks
level: associate
order: 90
facts:
  - id: new-deployment
    text: CodeDeploy rollback redeploys a previous revision as a new deployment with a new deployment ID.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy
  - id: automatic
    text: Automatic rollback can be configured for deployment failure or an alarm threshold and deploys
      the last known good revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
  - id: override
    text: An individual deployment can override its deployment group automatic rollback configuration.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
  - id: manual
    text: Manual rollback creates a deployment using a previously deployed application revision.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-manual-rollbacks
  - id: alarm-stop
    text: A deployment group can stop a deployment when a configured CloudWatch alarm activates.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: alarm-rollback
    text: The Roll back when alarm thresholds are met setting redeploys the last known good revision on
      an attached alarm.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: ignore-poll
    text: Continue deployments even if alarm status is unavailable corresponds to ignorePollAlarmFailure.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: cleanup
    text: EC2 rollback removes files tracked in the cleanup file before reinstalling revision content.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-workflow
  - id: script-effects
    text: CodeDeploy rollback does not reverse arbitrary actions performed by hook scripts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-workflow
  - id: originals
    text: EC2 blue/green rollback can return traffic to the original instances only if they have not
      been terminated.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview-blue-green
  - id: lambda
    text: Lambda rollback redeploys a previous revision and receives a new deployment ID.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-lambda.html#deployment-rollback-lambda
  - id: alarm-definition
    text: A CloudWatch metric alarm evaluates a metric against a threshold over time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: alarm-poll-default
    text: ignorePollAlarmFailure defaults to false, stopping deployment if CodeDeploy cannot retrieve
      CloudWatch alarm status; true allows it to continue.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_AlarmConfiguration.html#CodeDeploy-Type-AlarmConfiguration-ignorePollAlarmFailure
  - id: alarm-override
    text: CreateDeployment can override a deployment group's alarm configuration, and the caller needs
      the UpdateDeploymentGroup IAM permission to specify the override.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_CreateDeployment.html#CodeDeploy-CreateDeployment-request-overrideAlarmConfiguration
  - id: alarm-role
    text: CodeDeploy alarm monitoring requires CloudWatch access on the service role, including
      cloudwatch:DescribeAlarms.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-create-alarms-grant-permissions.html
cards:
  - id: codedeploy-007
    q: What does CodeDeploy do when a failed deployment triggers configured automatic rollback?
    a: Deploy the last known good revision as a new deployment with its own ID. It does not restore an
      earlier deployment record.
    trap: true
    facts:
      - new-deployment
      - automatic
  - id: codedeploy-054
    q: A CodeDeploy release must recover when a latency alarm fires. Is attaching the alarm enough?
    a: Attach the CloudWatch alarm and enable Roll back when alarm thresholds are met. Alarm monitoring
      can stop a deployment, but rollback requires its own configuration.
    trap: true
    facts:
      - alarm-stop
      - alarm-rollback
  - id: codedeploy-055
    q: An EC2 CodeDeploy rollback restores application files but leaves changes made by a hook script.
      Why?
    a: Rollback removes tracked deployment files and redeploys revision content. CodeDeploy does not
      automatically reverse arbitrary script actions.
    trap: true
    facts:
      - cleanup
      - script-effects
  - id: codedeploy-056
    q: How can a CodeDeploy operator manually return to a known working revision without automatic
      rollback configured?
    a: Create a new deployment using a previously deployed revision. The rollback has its own deployment
      ID.
    facts:
      - manual
      - new-deployment
  - id: codedeploy-063
    q: A CodeDeploy deployment cannot retrieve its CloudWatch alarm status. What happens by default,
      and which option allows it to continue?
    a: The deployment stops by default. Set ignorePollAlarmFailure to true to continue when alarm
      status cannot be retrieved.
    facts:
      - alarm-poll-default
  - id: codedeploy-064
    q: A CodeDeploy operator must deploy a known working revision while overriding a deployment group's
      CloudWatch alarm configuration. What permission is required for the override?
    a: The CreateDeployment caller also needs codedeploy:UpdateDeploymentGroup. Specify
      overrideAlarmConfiguration for that deployment.
    facts:
      - alarm-override
      - manual
  - id: codedeploy-068
    q: A CodeDeploy deployment group must stop a release when a CloudWatch alarm activates. What
      permission must the CodeDeploy service role have to monitor the alarm?
    a: Grant the service role cloudwatch:DescribeAlarms. Configure the alarm on the deployment group;
      configure rollback separately if recovery is also required.
    facts:
      - alarm-role
      - alarm-stop
      - alarm-rollback
---
Rollback releases a previously deployed revision again so the application can return to a known working version. In CodeDeploy, this creates a new deployment with its own ID.

### How it works

1. Configure automatic rollback on deployment failure, alarm thresholds, or both. Automatic recovery uses the last known good revision.
2. To monitor application behavior, attach a CloudWatch alarm, a rule that watches a metric against a threshold. Grant the CodeDeploy service role `cloudwatch:DescribeAlarms`. Enable rollback on alarm thresholds as well as alarm monitoring.
3. If rollback triggers, CodeDeploy starts another deployment. An individual release can override its deployment group's rollback settings.
4. For EC2 in-place rollback, remove files tracked in the cleanup file and install the older revision. For EC2 blue/green, traffic can return to originals that still exist.
5. For manual recovery, create a deployment that selects a previously deployed revision.
6. To deploy a known working revision without an alarm configuration blocking it, override the alarm configuration for that deployment. The caller also needs `codedeploy:UpdateDeploymentGroup`.

### Exam cues

- If the question says rollback created a different deployment ID, think expected behavior, because CodeDeploy records recovery as a new deployment.
- If the question says latency must trigger automatic recovery, think CloudWatch alarm plus rollback on alarm thresholds, because an alarm alone can stop without recovering.
- If the question says a rollback must undo script side effects, think explicit recovery logic, because CodeDeploy does not reconcile arbitrary script actions.
- If the question says CloudWatch alarm status is unavailable, think `ignorePollAlarmFailure`, because its default stops the deployment.

### Remember

- Automatic rollback uses the last known good revision.
- A deployment can override the deployment group's rollback configuration.
- `Continue deployments even if alarm status is unavailable` is the `ignorePollAlarmFailure` option.
- `ignorePollAlarmFailure` defaults to false. Set it to true to continue without an alarm status.
- EC2 blue/green traffic recovery needs original instances that have not been terminated.

> **Trap:** A rollback is not a snapshot restore. Files created or external changes made by scripts need their own recovery logic.
