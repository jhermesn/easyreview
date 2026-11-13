---
title: Synthesis and deployment
level: associate
order: 20
facts:
  - id: assembly
    text: Synthesis produces a cloud assembly containing CloudFormation templates and deployment
      artifacts such as file and image assets.
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-synth
  - id: lifecycle
    text: The synthesis lifecycle is construction, preparation with Aspects, validation, then synthesis
      triggered by app.synth().
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-synth
  - id: output
    text: The CDK CLI writes the cloud assembly to cdk.out by default.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-options
  - id: deployment
    text: During deployment, assets are uploaded to bootstrap S3 and ECR resources and templates are
      submitted to CloudFormation.
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-deploy
  - id: runtime
    text: The CDK app has exited before CloudFormation deployment starts.
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-deploy
  - id: custom-resource
    text: Deploy-time code can be represented by a CloudFormation custom resource.
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-deploy
  - id: method
    text: cdk deploy defaults to change-set, creating and executing a CloudFormation change set.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: direct
    text: The direct method deploys without creating a change set.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: prepared
    text: prepare-change-set creates a change set without deploying it.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: execute
    text: execute-change-set executes a previously prepared change set.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: approval-options
    text: --require-approval accepts any-change, broadening and never.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: approval
    text: --require-approval defaults to broadening.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: approval-broadening
    text: broadening prompts when changes widen permissions or security group rules.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: alarm-limit
    text: --rollback-trigger-alarm-arns accepts up to 5 CloudWatch metric alarms.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: alarms
    text: An alarm entering ALARM during rollback monitoring causes CloudFormation to roll back the
      deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: monitoring
    text: --monitoring-time-minutes accepts whole numbers from 0 to 180 when used with rollback trigger
      alarms.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: monitoring-default
    text: The monitoring-time default is 0, so alarms are monitored only during deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: file-role
    text: FilePublishingRole publishes file assets.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: image-role
    text: ImagePublishingRole publishes image assets.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: deploy-role
    text: DeploymentActionRole submits deployments.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: execution-role
    text: CloudFormationExecutionRole grants CloudFormation resource permissions.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
diagrams:
  - id: cdk-synth-deploy
    title: CDK app to deployed stack
    width: 800
    height: 340
    nodes:
      - id: app
        label: CDK app
        sub: stacks + constructs
        icon: cloud-development-kit
        x: 20
        y: 40
        w: 160
        h: 86
        tone: devtools
        info: An app holds **stacks**; each CDK stack becomes one CloudFormation stack. Constructs (L1
          `Cfn*`, L2, L3) are the building blocks inside a stack.
      - id: assembly
        label: Cloud assembly
        sub: templates + assets
        icon: res-documents
        x: 280
        y: 40
        w: 170
        h: 86
        tone: user
        info: A cloud assembly contains CloudFormation templates and deployment artifacts. cdk synth writes
          it to cdk.out.
      - id: cfn
        label: CloudFormation
        sub: stack create/update
        icon: cloudformation
        x: 580
        y: 40
        w: 180
        h: 86
        tone: mgmt
        info: The deployment role submits the template. CloudFormation uses the execution role to provision
          resources.
      - id: boot
        label: CDKToolkit stack
        sub: S3, ECR, IAM roles
        icon: res-cloudformation-stack
        x: 280
        y: 230
        w: 170
        h: 86
        tone: mgmt
        info: Bootstrapping provisions the S3 bucket, ECR repository and roles used to publish assets and
          deploy stacks.
    edges:
      - from: app
        to: assembly
        step: 1
        label: cdk synth
      - from: assembly
        to: boot
        step: 2
        label: publish assets
      - from: boot
        to: cfn
        step: 3
        label: execution role
    steps:
      - Synthesis constructs the app, applies Aspects, validates constructs and writes a cloud
        assembly.
      - File and image publishing roles upload assets to the bootstrap S3 bucket and ECR repository.
      - The deployment role submits the template to CloudFormation, which uses the execution role to
        provision resources.
cards:
  - id: cdk-001
    q: What does AWS CDK synthesize, and how does cdk deploy use the result?
    a: A cloud assembly of CloudFormation templates and deployment artifacts. Deployment uploads assets
      and submits templates to CloudFormation, using a change set by default.
    facts:
      - assembly
      - deployment
      - method
      - direct
  - id: cdk-002
    q: What are the AWS CDK synthesis lifecycle phases, and when does deployment start?
    a: Construction, preparation with Aspects, validation, then synthesis. The CDK app exits before
      CloudFormation deployment; deploy-time code can use a custom resource.
    facts:
      - lifecycle
      - runtime
      - custom-resource
  - id: cdk-004
    q: What does the AWS CDK deploy --require-approval option control?
    a: "Approval prompts: any-change, broadening or never. The default broadening prompts when
      permissions or security group rules widen."
    facts:
      - approval-options
      - approval
      - approval-broadening
  - id: cdk-005
    q: An AWS CDK team must inspect a CloudFormation change set with external tooling before execution.
      Which deployment methods fit?
    a: Use --method prepare-change-set, review the change set, then --method execute-change-set.
    facts:
      - prepared
      - execute
  - id: cdk-022
    q: An AWS CDK team wants CloudFormation to roll back when application alarms fire. Which deployment
      options apply?
    a: Use --rollback-trigger-alarm-arns with up to 5 metric alarms. Set --monitoring-time-minutes from
      0 to 180 for monitoring after completion; the default is 0.
    facts:
      - alarm-limit
      - alarms
      - monitoring
      - monitoring-default
  - id: cdk-029
    q: An AWS CDK app must run custom logic after CloudFormation creates a resource. Can ordinary code
      following the construct constructor wait for that creation?
    a: No. The app finishes before deployment starts. Represent deploy-time logic with a custom
      resource.
    trap: true
    facts:
      - runtime
      - custom-resource
---
Synthesis turns a CDK app into deployment files called a cloud assembly. Deployment uploads the assets, such as function packages or container images, and asks CloudFormation to create or update resources.

### How it works

1. Construct the app and its resource tree.
2. Prepare constructs, apply Aspects (operations across that tree), and validate the result.
3. Synthesize CloudFormation templates and assets into `cdk.out` by default.
4. Publish file and image assets with their bootstrap publishing roles. Submit the template with the deployment role; CloudFormation provisions resources with its execution role.

A change set is a proposed CloudFormation update that can be reviewed before execution.

| Deployment method | Effect |
|---|---|
| `change-set` | Create and execute a change set; default |
| `prepare-change-set` | Create the change set for review |
| `execute-change-set` | Execute a prepared change set |
| `direct` | Apply the update without creating a change set |

### Exam cues

- If the question says external tooling must review a proposed stack update, think `prepare-change-set` followed by `execute-change-set`, because preparation does not execute the update.
- If the question says a health alarm should undo a deployment, think rollback trigger alarms, because CloudFormation monitors them during deployment and the configured monitoring period.
- If the question says code must react during resource creation, think a custom resource, because the CDK app has already exited.

### Remember

- `--require-approval` accepts `any-change`, `broadening` and `never`; default `broadening`.
- Rollback triggers accept up to 5 metric alarms.
- Post-deployment monitoring is 0 to 180 whole minutes; default 0 monitors only during deployment.

> **Trap:** Template generation and resource creation happen at different times. A CDK constructor cannot wait for a resource that CloudFormation has not deployed yet.
