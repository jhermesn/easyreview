---
title: Deployment troubleshooting
level: professional
order: 110
facts:
  - id: agent
    text: For skipped EC2 lifecycle events, check that the CodeDeploy agent is installed and running.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
  - id: network
    text: Skipped events can result from missing outbound HTTPS connectivity to CodeDeploy or S3 on port
      443.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
  - id: iam
    text: Skipped events can result from insufficient CodeDeploy service role or EC2 instance profile
      permissions.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
  - id: clock
    text: Incorrect instance time can cause InvalidSignatureException and Signature expired deployment
      errors.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-ec2-instances.html#troubleshooting-instance-time-failures
  - id: space
    text: Memory or disk pressure can stop the agent; reducing max_revisions reduces retained deployment
      archives.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
  - id: health-check
    text: EC2 blue/green AllowTraffic failures without deployment log errors are typically caused by
      incorrectly configured load balancer health checks.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-allowtraffic-no-logs
  - id: s3-download
    text: "DownloadBundle UnknownError: not opened for reading can result from an S3 service error,
      missing S3 permissions, or a revision bucket in a different Region."
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-downloadbundle
  - id: wire
    text: Wire logging can diagnose DownloadBundle errors and should be disabled after investigation
      because output can contain sensitive data.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-downloadbundle
  - id: background
    text: A long-running Linux hook child process should run in the background with standard input,
      output, and error redirected so the hook can complete.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-long-running-processes
  - id: previous-hooks
    text: ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic use previous successful revision
      scripts; ignore-application-stop-failures can bypass their failures for a corrective
      deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
  - id: log-files
    text: Linux script output is in
      /opt/codedeploy-agent/deployment-root/<group-id>/<deployment-id>/logs/scripts.log; agent
      activity is in /var/log/aws/codedeploy-agent/codedeploy-agent.log.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-view-logs.html#deployments-view-logs-instance-unix
  - id: combined-log
    text: Linux combined deployment logs are in
      /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-view-logs.html#deployments-view-logs-instance-unix
  - id: cloudwatch-logs
    text: The CloudWatch agent can collect EC2/On-Premises CodeDeploy logs for central viewing.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-view-logs.html#deployments-view-logs-cloudwatch
  - id: weighted-alias
    text: A manually stopped Lambda deployment without rollback may leave a two-version alias; choose
      none under Weighted alias and redeploy the selected version.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments-lambda.html#troubleshooting-manually-stopped-lambda-deployment
  - id: sns
    text: CodeDeploy deployment group triggers publish event notifications to an SNS topic and its
      subscribers, including email recipients.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-sns-event-notifications.html#monitoring-sns-event-notifications
  - id: failure-trigger
    text: Failure and Rollback are supported deployment event types for CodeDeploy SNS notification
      triggers.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-sns-event-notifications.html#monitoring-sns-event-notifications
  - id: sns-permission
    text: The deployment group service role must have permission to publish to the trigger SNS topic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html#deployment-groups-configure-advanced-options
  - id: eventbridge
    text: CodeDeploy sends deployment and instance state-change notifications directly to EventBridge
      with source aws.codedeploy and best-effort delivery.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-codedeploy.html#events-ref-codedeploy-events
  - id: event-filter
    text: An EventBridge event pattern can select CodeDeploy Deployment State-change Notification events
      by detail-type.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-codedeploy.html#events-ref-codedeploy-events
  - id: success-event
    text: CodeDeploy deployment state-change notifications support SUCCESS, FAILURE, START, STOP,
      QUEUED, and READY status filtering.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-cloudwatch-events.html#monitoring-cloudwatch-events
  - id: event-target
    text: A CodeDeploy state-change rule can invoke a target such as a Lambda function when the selected
      deployment state occurs.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/monitoring-cloudwatch-events.html#monitoring-cloudwatch-events
  - id: instance-profile
    text: An instance profile provides an IAM role to software running on an EC2 instance.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html#id_roles_use_switch-role-ec2_instance-profiles
  - id: service-role
    text: A CodeDeploy service role authorizes the service to act on deployment resources.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-service-role
  - id: event-rule
    text: An EventBridge rule uses an event pattern to match events and send matching events to a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
  - id: delivery-meaning
    text: Best-effort service event delivery does not guarantee that every CodeDeploy event reaches
      EventBridge.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/event-delivery-level.html#event-delivery-level
  - id: health-check-definition
    text: A load balancer periodically sends health check requests to registered targets to determine
      whether they can receive traffic.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-group-health-checks
  - id: recreated-group
    text: Recreating a deployment group gives it a different underlying ID, so CodeDeploy does not
      recognize files installed by the old group for cleanup.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-same-files-different-app-name
cards:
  - id: codedeploy-018
    q: An EC2 CodeDeploy deployment fails with HEALTH_CONSTRAINTS and every lifecycle event is skipped.
      What should be checked?
    a: Check agent status, outbound CodeDeploy and S3 access on port 443, the instance profile and
      service role, accurate instance time, and memory or disk pressure. Reduce max_revisions if
      archive space contributes.
    trap: true
    facts:
      - agent
      - network
      - iam
      - clock
      - space
  - id: codedeploy-019
    q: An EC2 CodeDeploy blue/green deployment fails at AllowTraffic but its deployment log has no
      error. What should be investigated?
    a: The load balancer health check configuration. Incorrect checks can prevent replacement instances
      from accepting traffic successfully.
    trap: true
    facts:
      - health-check
  - id: codedeploy-020
    q: "What can cause CodeDeploy DownloadBundle to report UnknownError: not opened for reading?"
    a: Missing S3 permissions, an S3 revision bucket in a different Region from the instances, or a
      transient S3 service error. Wire logging can identify the cause; disable it after
      investigation.
    facts:
      - s3-download
      - wire
  - id: codedeploy-021
    q: A CodeDeploy Linux hook starts a server with a trailing ampersand but deployment still waits and
      times out. How should the process be launched?
    a: "Background it and redirect stdin, stdout, and stderr, for example: `server > /dev/null 2>
      /dev/null < /dev/null &`."
    trap: true
    facts:
      - background
  - id: codedeploy-022
    q: Where can EC2 CodeDeploy operators inspect hook output and agent activity on Linux?
    a: Read scripts.log under the deployment group and deployment directories, the combined
      codedeploy-agent-deployments.log, and /var/log/aws/codedeploy-agent/codedeploy-agent.log. Use
      the CloudWatch agent to collect them centrally.
    facts:
      - log-files
      - combined-log
      - cloudwatch-logs
  - id: codedeploy-026
    q: A manually stopped CodeDeploy Lambda deployment had no rollback configured, and subsequent
      deployments fail. What recovery does AWS document?
    a: Edit the Lambda alias, choose none under Weighted alias, and redeploy the version selected by the
      alias. The stopped deployment may have left it splitting traffic across two versions.
    trap: true
    facts:
      - weighted-alias
  - id: codedeploy-060
    q: A team needs email when CodeDeploy deployment fails. Which built-in configuration avoids a
      polling function?
    a: Create a deployment group Failure trigger targeting an SNS topic with email subscribers. Give the
      service role permission to publish to that topic.
    facts:
      - sns
      - failure-trigger
      - sns-permission
  - id: codedeploy-061
    q: A team wants a Lambda workflow to run after CodeDeploy succeeds. Which event integration should
      it use?
    a: Use an EventBridge rule for source aws.codedeploy and detail-type CodeDeploy Deployment
      State-change Notification, filtered to SUCCESS, with the Lambda function as target.
    facts:
      - eventbridge
      - event-filter
      - success-event
      - event-target
  - id: codedeploy-071
    q: A CodeDeploy deployment group was deleted and recreated with the same name. Why can deploying
      to the same EC2 paths fail with existing-file conflicts?
    a: The recreated group has a different ID, so the agent does not identify the old group's files
      for cleanup. Remove the conflicting files or choose an appropriate overwrite or retain option.
    facts:
      - recreated-group
---
Troubleshooting CodeDeploy starts with the failed lifecycle event and its logs. Separate a server that cannot receive instructions from an application that installs but cannot pass validation or receive traffic.

### How it works

1. Identify the failed event and read its script or agent log. On Linux, hook output is in `/opt/codedeploy-agent/deployment-root/<group-id>/<deployment-id>/logs/scripts.log`; agent activity is in `/var/log/aws/codedeploy-agent/codedeploy-agent.log`.
2. If all events are skipped, check the agent, outbound HTTPS on port 443, the EC2 instance profile, and the CodeDeploy service role. An instance profile supplies permissions to instance software; the service role supplies permissions to CodeDeploy itself.
3. Check accurate instance time and available memory or disk space. The `max_revisions` agent setting controls retained deployment archives.
4. Use the symptom table to narrow down an event failure. The combined Linux deployment log is `/opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log`. A CloudWatch agent can collect these logs centrally.
5. Add event notifications for future failures. A deployment group trigger publishes to an SNS topic, which distributes messages to subscribers such as email recipients. For automation after success, use an EventBridge rule, which matches events and invokes a target.

A health check is a recurring request that a load balancer uses to decide whether a target can receive traffic.

| Symptom | First explanation to investigate |
|---|---|
| `AllowTraffic` fails without a deployment log error | Load balancer health checks |
| `DownloadBundle`: `not opened for reading` | S3 access permissions, bucket Region, or S3 service error |
| Old `ApplicationStop` script keeps failing | Previous successful revision supplies the script |
| Background server leaves hook waiting | Standard input, output, and error still attached |
| Later Lambda deployments fail after a manual stop | Alias still splits traffic between two versions |

### Exam cues

- If the question says all EC2 lifecycle events are skipped, think agent, connectivity, IAM, and host health, because deployment work may never have started.
- If the question says a stop hook is broken in the old revision, think `ignore-application-stop-failures` for a corrective deployment, because replacing the script in the new bundle does not change the old hook.
- If the question says email on deployment failure, think deployment group Failure trigger plus SNS, because CodeDeploy can publish the event directly.
- If the question says automate work after a successful deployment, think an EventBridge rule matching the deployment state, because CodeDeploy sends state-change notifications.
- If a recreated deployment group fails on files installed by the old group, think its new underlying ID, because cleanup tracks files by group ID.

### Remember

- EventBridge source: `aws.codedeploy`; detail type: `CodeDeploy Deployment State-change Notification`; success state: `SUCCESS`.
- CodeDeploy-to-EventBridge delivery is best effort: some service events might not arrive.
- SNS triggers need service-role permission to publish to the topic.
- For a stuck Lambda weighted alias, choose `none` under Weighted alias before redeploying the selected version.

> **Trap:** A trailing `&` alone may leave a hook waiting. A background process must also redirect its standard input, output, and error.

> **Trap:** Wire logging can reveal sensitive data. Enable it for diagnosis and disable it afterward.
