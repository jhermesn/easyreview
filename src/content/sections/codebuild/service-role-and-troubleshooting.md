---
title: Service role and troubleshooting
level: associate
order: 100
facts:
  - id: role
    text: CodeBuild uses its service role for operations on the user behalf; grant only required
      permissions.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-service-role.html
  - id: trust
    text: The service role trust policy must allow codebuild.amazonaws.com to assume the role.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-service-role.html
  - id: pipeline-role-override
    text: A CodePipeline CodeBuild action can override the project service role with a role in the
      project's account; the role must trust codebuild.amazonaws.com.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-config
  - id: pipeline-pass-role
    text: The identity creating or updating the pipeline and the CodePipeline service role both need
      iam:PassRole for a CodeBuild action service role override.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-config
  - id: s3-read
    text: The service role can be granted s3:GetObject and s3:GetObjectVersion for required S3 objects.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-service-role.html
  - id: logs-role
    text: CloudWatch logging permissions include logs:CreateLogGroup, logs:CreateLogStream, and
      logs:PutLogEvents.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up-service-role.html
  - id: build-details
    text: Build details are available in the console or with BatchGetBuilds.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/view-build-details.html
  - id: phase-details
    text: Build phase details include the phase type, status, and error contexts.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_BuildPhase.html
  - id: logs
    text: CodeBuild builds can write logs to CloudWatch Logs and S3.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_LogsConfig.html
  - id: metrics
    text: CloudWatch exposes build counts, successes, failures, and build duration.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/monitoring-builds.html
  - id: project-metrics
    text: The ProjectName CloudWatch dimension selects project metrics; omitting dimensions selects
      account metrics.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/monitoring-builds.html
  - id: metric-names
    text: FailedBuilds counts client-error or timeout failures and Duration measures build durations in
      seconds.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/cloudwatch_metrics-codebuild.html
  - id: state-events
    text: CodeBuild sends CodeBuild Build State Change and CodeBuild Build Phase Change events directly
      to EventBridge.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-codebuild.html
  - id: local-agent
    text: The CodeBuild local agent runs builds locally using Docker and requires Git and Docker.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html
  - id: endpoint-policy
    text: An S3 bucket policy can restrict requests to a particular VPC endpoint using aws:sourceVpce.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#bucket-policies-s3
  - id: local-run
    text: The local build script selects a container image and artifact output directory and can select
      a source directory.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html#use-codebuild-agent.run-agent
diagrams: []
cards:
  - id: codebuild-017
    q: Where should a team start when a CodeBuild build fails?
    a: Inspect build phase details and the configured CloudWatch Logs or S3 logs. Phase status and error
      context identify the failing operation; compare it with the service role permissions and
      network path.
    facts:
      - build-details
      - phase-details
      - logs
      - role
  - id: codebuild-021
    q: A CodeBuild build needs deployment scripts from private S3 without embedded access keys. What
      should the team configure?
    a: Grant its service role `s3:GetObject` and `s3:GetObjectVersion` for the required objects. If the
      bucket restricts access with `aws:sourceVpce`, the build must use the permitted VPC endpoint.
    facts:
      - role
      - s3-read
      - endpoint-policy
    trap: true
  - id: codebuild-042
    q: A team wants to reproduce a CodeBuild build on a developer machine to diagnose build commands.
      Which tool fits?
    a: The CodeBuild local agent. Install Git and Docker, select the build image, and run the local
      build script with source and output locations.
    facts:
      - local-agent
      - local-run
  - id: codebuild-043
    q: A team needs to compare CodeBuild failures and build duration for one project over time. What
      should it inspect?
    a: CloudWatch metrics with the `ProjectName` dimension, including `FailedBuilds` and `Duration`.
      Omitting dimensions selects account metrics.
    facts:
      - metrics
      - project-metrics
      - metric-names
  - id: codebuild-044
    q: Which CodeBuild event can EventBridge match to react to a build result?
    a: "`CodeBuild Build State Change`. CodeBuild also sends `CodeBuild Build Phase Change` events for
      phase transitions."
    facts:
      - state-events
  - id: codebuild-046
    q: A shared CodeBuild project needs a separate least-privilege role for each CodePipeline pipeline.
      How can the pipeline use an override role?
    a: Set `ServiceRoleArnOverride` on the CodeBuild action. The role must be in the project account
      and trust CodeBuild; both the pipeline editor and pipeline service role need `iam:PassRole`.
    facts:
      - pipeline-role-override
      - pipeline-pass-role
---
The CodeBuild service role is the permission identity used for operations CodeBuild performs on your behalf. Troubleshooting starts by finding the failed phase, then checking its commands, permissions, and network access.

### How it works

1. Allow `codebuild.amazonaws.com` to assume the service role through its trust policy, the policy naming who may use the role. Grant only the required permissions.
2. Open the build details in the console or call `BatchGetBuilds`. Inspect phase type, status, and error context alongside CloudWatch Logs or S3 logs.
3. For S3 reads, inspect `s3:GetObject` and `s3:GetObjectVersion` on the required objects. If the bucket requires `aws:sourceVpce`, use that permitted VPC endpoint. For CloudWatch logging, inspect `logs:CreateLogGroup`, `logs:CreateLogStream`, and `logs:PutLogEvents`.
4. Use CloudWatch metrics to study recurring failures or duration changes. Use `ProjectName`, a metric filter identifying the project, for project metrics; omit dimensions for account metrics.
5. To reproduce build commands locally, use the CodeBuild local agent with Git, Docker, the build image, and the local build script.
6. For a shared project, a CodePipeline action can override its service role with a role in the project account. The pipeline editor and pipeline service role both need `iam:PassRole`, and the override role must trust CodeBuild.

### Exam cues

- If the question says a build cannot read private S3 scripts, think the CodeBuild service role and bucket restrictions, because that role authorizes the read and an endpoint restriction also controls its path.
- If the question says failures or build time are increasing, think CloudWatch metrics, because they record results and duration over time.
- If the question says developers need to reproduce build commands locally, think the local agent, because it runs builds using Docker.
- If the question says react when a build changes state, think EventBridge's `CodeBuild Build State Change`, because CodeBuild sends that event directly.
- If the question says shared CodeBuild projects need separate pipeline permissions, think `ServiceRoleArnOverride`, because each pipeline can pass its own scoped role.

### Remember

- Service role trust principal: `codebuild.amazonaws.com`.
- `FailedBuilds` counts client-error and timeout failures.
- `Duration` is measured in seconds.
- Local agent prerequisites include Git and Docker.

> **Trap:** Adding permissions to a developer identity does not add them to the CodeBuild service role. Inspect the identity actually used by the build.
