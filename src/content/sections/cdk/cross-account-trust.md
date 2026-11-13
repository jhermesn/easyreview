---
title: Cross-account trust
level: professional
order: 40
facts:
  - id: bootstrap
    text: CDK Pipelines requires bootstrapping the pipeline environment and each target environment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
  - id: trust
    text: Bootstrap a target with --trust set to the pipeline account ID to permit cross-account
      deployments.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
  - id: policy
    text: --cloudformation-execution-policies selects the policies for future CDK deployments.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
  - id: default-policy
    text: The default CloudFormation execution policy is AdministratorAccess.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
  - id: deploy-role
    text: The CDK CLI assumes DeploymentActionRole to submit deployments.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: execution-role
    text: CloudFormation uses CloudFormationExecutionRole to provision resources.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: publish-files
    text: FilePublishingRole publishes file assets to the bootstrap S3 bucket.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: publish-images
    text: ImagePublishingRole publishes image assets to the bootstrap ECR repository.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
  - id: lookup-only
    text: --trust-for-lookup permits context lookups without granting deployment permission.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-customizing.html#bootstrapping-customizing-cli
  - id: replace-trust
    text: When updating --trust, include every account to retain; previously trusted accounts omitted
      from the list lose trust.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-customizing.html#bootstrapping-customizing-cli
  - id: required-policy
    text: Using --trust also requires --cloudformation-execution-policies.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-customizing.html#bootstrapping-customizing-cli
  - id: missing
    text: Invalid principals in a CDK Pipeline target can indicate missing bootstrap roles; an
      unbootstrapped target is the most likely cause.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-pipelines
  - id: source
    text: CDK Pipelines can build and deploy application changes when source code is committed.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html
  - id: self-update
    text: CDK Pipelines reconfigures itself when application stages or stacks change.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html
  - id: assembly
    text: The synth step produces the cloud assembly of templates and deployment artifacts.
    source: https://docs.aws.amazon.com/cdk/v2/guide/deploy.html#deploy-how-synth
  - id: pre
    text: StageDeployment.addPre adds steps before the attached stage deploys.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: post
    text: StageDeployment.addPost adds steps after the attached stage deploys.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: approval
    text: ManualApprovalStep adds a manual approval step to a CDK Pipeline.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: source-providers
    text: CDK Pipelines supports sources such as GitHub and CodeCommit.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html
  - id: shell-synth
    text: A CDK Pipeline can use a ShellStep to run installation, build and synthesis commands.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-define
  - id: arn
    text: An Amazon Resource Name (ARN) uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
diagrams:
  - id: cdk-pipeline-cross-account
    title: CDK Pipeline deploying into another account
    width: 1260
    height: 504
    groups:
      - label: Pipeline account
        icon: group-aws-account
        x: 28
        y: 28
        w: 560
        h: 448
        tone: mgmt
      - label: Target account (bootstrapped)
        icon: group-aws-account
        x: 644
        y: 28
        w: 588
        h: 448
        tone: mgmt
    nodes:
      - id: src
        label: Source
        sub: repo with the CDK app
        icon: res-git-repository
        h: 86
        x: 56
        y: 94
        w: 150
        tone: user
        info: A commit starts the pipeline. CDK Pipelines can source from GitHub, CodeCommit and other
          providers.
      - id: synth
        label: Synth build
        sub: cdk synth
        icon: codebuild
        h: 86
        x: 364
        y: 94
        w: 140
        tone: devtools
        info: A `ShellStep` runs the install, build and `cdk synth` commands and produces the **cloud
          assembly** (templates plus assets).
      - id: pipe
        label: CodePipeline
        sub: stages, waves, approvals
        icon: codepipeline
        h: 86
        x: 210
        y: 346
        w: 170
        tone: devtools
        info: CDK Pipelines reconfigures itself when application stages or stacks change. Approval before a
          target stage uses addPre().
      - id: dep
        label: Deploy role
        sub: DeploymentActionRole
        icon: res-identity-access-management-role
        h: 86
        x: 672
        y: 94
        w: 140
        tone: security
        info: DeploymentActionRole permits deployment into the target. File and image assets use separate
          publishing roles.
      - id: exec
        label: CFN exec role
        sub: CloudFormationExecutionRole
        icon: res-identity-access-management-role
        h: 86
        x: 952
        y: 94
        w: 190
        tone: security
        info: CloudFormation provisions resources with this service role. Its execution policies default to
          AdministratorAccess.
      - id: cfn
        label: CloudFormation
        sub: stack in target
        icon: res-cloudformation-stack
        h: 86
        x: 812
        y: 346
        w: 180
        tone: mgmt
        info: Assets go to the bootstrap bucket or ECR repository first, then the template is deployed as a
          normal CloudFormation stack.
    edges:
      - from: src
        to: synth
        step: 1
        label: commit
      - from: synth
        to: pipe
        step: 2
        label: cloud assembly
      - from: pipe
        to: dep
        step: 3
        label: assume role
      - from: dep
        to: cfn
        step: 4
        label: change set
      - from: cfn
        to: exec
        step: 5
        dashed: true
    steps:
      - A commit to the source repository starts the pipeline.
      - "The synth build runs the app and produces the cloud assembly: one template per stack plus
        file and image assets."
      - For each deployment stage, the pipeline assumes the target account's bootstrap deploy role.
        That works only if the target was bootstrapped with trust for the pipeline account.
      - Separate publishing roles upload file and image assets; the deployment role submits the
        template as a change set.
      - CloudFormation assumes the CloudFormation execution role and creates or updates the
        resources.
cards:
  - id: cdk-010
    q: How can a CDK pipeline in account A deploy into account B?
    a: Bootstrap each target account and Region with --trust A and --cloudformation-execution-policies
      <policy-ARN>. The deployment role submits the template and CloudFormation uses its execution
      role.
    facts:
      - bootstrap
      - trust
      - required-policy
      - deploy-role
      - execution-role
  - id: cdk-011
    q: What determines the resource permissions of cross-account CDK deployments?
    a: The CloudFormation execution policies selected at bootstrap. AdministratorAccess is the default;
      choose narrower policies for the resources the pipeline needs.
    trap: true
    facts:
      - policy
      - default-policy
  - id: cdk-026
    q: A CDK pipeline reports invalid principals in a target account. Does adding account trust alone
      guarantee that the target is ready?
    a: No. Verify that target bootstrap roles exist. Missing roles often mean the account and Region
      were never bootstrapped.
    trap: true
    facts:
      - missing
      - bootstrap
  - id: cdk-030
    q: An account needs to synthesize CDK stacks using another account's lookups but must not deploy
      there. Which bootstrap option fits?
    a: --trust-for-lookup, which grants lookup access without deployment permission.
    facts:
      - lookup-only
  - id: cdk-031
    q: An administrator adds a trusted account to an existing CDK bootstrap stack. What must the --trust
      list include?
    a: All accounts that must remain trusted. Omitting an existing account removes its trust.
    trap: true
    facts:
      - replace-trust
---
Cross-account CDK deployment lets a pipeline use roles in a separate target account. Trust controls who may enter; the CloudFormation execution policy controls which resources the deployment may change.

### How it works

1. Bootstrap the pipeline environment and every target account and Region.
2. An Amazon Resource Name (ARN) identifies the execution policy to use. In each target, set `--trust <pipeline-account-id>` together with `--cloudformation-execution-policies <policy-ARN>`.
3. Publish assets using the target's file and image publishing roles. Use `DeploymentActionRole` to submit the CloudFormation deployment.
4. CloudFormation assumes `CloudFormationExecutionRole` and provisions the resources allowed by its policies.

### Exam cues

- If the question says a pipeline must deploy into another account, think target bootstrap trust plus execution policies, because both role access and resource permissions are required.
- If the question says synthesis needs read access but deployment must remain prohibited, think `--trust-for-lookup`, because lookup trust does not grant deployment rights.
- If the question says a target reports invalid principals, think missing bootstrap roles, because the policy may reference roles that were never created.

### Remember

- Execution policies default to `AdministratorAccess`. Scope them to the required resources and actions.
- Updating `--trust` replaces the trusted account list; include every account to retain.
- File and image publishing use separate roles from the deployment role.

> **Trap:** Trust grants access to deployment roles. It does not restrict their execution policies to the pipeline author's intended resources.
