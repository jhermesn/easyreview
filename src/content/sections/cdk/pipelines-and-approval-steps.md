---
title: Pipelines and approval steps
level: professional
order: 50
facts:
  - id: self-update
    text: CDK Pipelines automatically reconfigures its pipeline when application stages or stacks are
      added.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html
  - id: initial
    text: Bootstrap and provision the initial pipeline before using it to deploy subsequent changes.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
  - id: pipeline-definition
    text: The CodePipeline construct defines the pipeline source and synthesis commands.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-define
  - id: synth
    text: A synth ShellStep can build the app and run cdk synth.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-define
  - id: stage
    text: A CDK Stage groups related stacks.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: add-stage
    text: pipeline.addStage returns a StageDeployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: pre
    text: StageDeployment.addPre runs steps before deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: post
    text: StageDeployment.addPost runs steps after deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: manual
    text: ManualApprovalStep adds a human approval step to a CDK Pipeline.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: wave
    text: pipeline.addWave groups application stages that can deploy in parallel.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: test
    text: A post-deployment ShellStep can run validation tests.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-validation
  - id: outputs
    text: envFromCfnOutputs passes deployed CfnOutput values as environment variables.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-validation
  - id: credentials
    text: After bootstrapping and initial provisioning, developers can deploy changes through the
      pipeline without direct production account credentials.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-security
diagrams:
  - id: cdk-pipeline-stage-gates
    title: Steps around an application stage
    width: 1000
    height: 160
    nodes:
      - id: approval
        label: Approval
        icon: res-users
        tone: user
        x: 30
        y: 45
        w: 180
        h: 72
      - id: deploy
        label: Deploy stage
        icon: cloudformation
        tone: mgmt
        x: 410
        y: 45
        w: 180
        h: 72
      - id: test
        label: Smoke test
        icon: codebuild
        tone: devtools
        x: 790
        y: 45
        w: 180
        h: 72
    edges:
      - from: approval
        to: deploy
        step: 1
        label: addPre
      - from: deploy
        to: test
        step: 2
        label: addPost
    steps:
      - A pre-deployment ManualApprovalStep must complete before the application stage deploys.
      - A post-deployment ShellStep tests the deployed resources and can receive stack outputs.
cards:
  - id: cdk-013
    q: What is a self-updating AWS CDK Pipeline?
    a: A pipeline that reconfigures itself when its app adds stages or stacks. Bootstrap and provision
      it initially, then deploy subsequent changes through the pipeline.
    facts:
      - self-update
      - initial
  - id: cdk-014
    q: How does a CDK Pipeline add approvals and tests around a stage and pass deployed URLs to a test?
    a: Use addPre or addPost on the returned StageDeployment with ManualApprovalStep or ShellStep. Use
      envFromCfnOutputs to expose deployed outputs. addWave groups stages for parallel deployment.
    facts:
      - pre
      - post
      - manual
      - test
      - outputs
      - wave
  - id: cdk-032
    q: A CDK Pipeline must wait for human approval before its production stage starts. Where should the
      approval be attached?
    a: Use productionStage.addPre(new ManualApprovalStep(...)). addPost on production runs after that
      stage has deployed.
    trap: true
    facts:
      - pre
      - post
      - manual
  - id: cdk-033
    q: A CDK Pipeline smoke test needs the URL created by a deployed stack. How should it receive that
      value?
    a: Expose it as CfnOutput and pass it through envFromCfnOutputs in a post-deployment ShellStep.
    facts:
      - test
      - outputs
---
CDK Pipelines builds and deploys CDK apps through a pipeline that can update its own structure. A stage groups related stacks; a wave groups stages that may deploy in parallel.

### How it works

1. Bootstrap the environments and provision the initial pipeline.
2. Configure a source and a synth `ShellStep`, a step that runs build commands and `cdk synth`.
3. Add application stages with `pipeline.addStage()`. The pipeline reconfigures itself when stages or stacks change.
4. Add `ManualApprovalStep` before a stage with `addPre()`. Use `addPost()` for tests after deployment.
5. Pass stack outputs to a test through `envFromCfnOutputs`. Use `addWave()` when several stages may deploy in parallel.

### Exam cues

- If the question says approval must precede production, think `addPre()` on the production stage, because it runs before that stage's deployment.
- If the question says a test needs a newly created endpoint, think a post-deployment `ShellStep` with `envFromCfnOutputs`, because the endpoint is available as a deployed stack output.

### Remember

- `addStage()` returns a `StageDeployment`.
- `addPre()` means before the attached stage; `addPost()` means after it.
- After initial provisioning, developers can submit changes through the pipeline without direct production credentials.

> **Trap:** An approval attached with `addPost()` to production occurs after production deployment. Attach it before the stage that must wait.
