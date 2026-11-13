---
title: Aspects and synthesis checks
level: professional
order: 80
facts:
  - id: scope
    text: A CDK Aspect applies an operation to a construct and its children in a specified scope, such
      as validation or tagging.
    source: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html
  - id: register
    text: Aspects.of(scope).add registers an Aspect.
    source: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-detail
  - id: visit
    text: CDK calls an Aspect's visit method from parent to child during preparation.
    source: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-detail
  - id: stage
    text: Aspects do not cross Stage boundaries; apply an Aspect on the Stage itself or below it to
      visit its constructs.
    source: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-detail
  - id: error
    text: An Aspect can use Annotations.of(node).addError to fail synthesis and prevent deployment of
      that cloud assembly.
    source: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-example
  - id: bypass
    text: CDK Pipelines cannot prevent malicious developers who control its code from bypassing
      compliance checks.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-security
  - id: hooks
    text: CloudFormation Hooks provide preventive compliance checks outside the CDK pipeline.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-security
  - id: config
    text: AWS Config provides reactive compliance checks outside the CDK pipeline.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-security
  - id: disable-controls
    text: The CloudFormation execution role must not be allowed to disable external compliance controls.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-security
cards:
  - id: cdk-018
    q: An AWS CDK team wants synthesis to fail when an S3 bucket lacks versioning. What should it use?
    a: An Aspect that inspects bucket constructs and adds an error annotation. Apply it on each Stage or
      below, because Aspects do not cross Stage boundaries.
    facts:
      - scope
      - error
      - stage
  - id: cdk-019
    q: Can compliance checks inside a CDK Pipeline prevent a developer who controls the pipeline code
      from bypassing them?
    a: No. Use external controls such as preventive CloudFormation Hooks or reactive AWS Config checks
      that the CloudFormation execution role cannot disable.
    trap: true
    facts:
      - bypass
      - hooks
      - config
      - disable-controls
  - id: cdk-040
    q: A CDK Aspect applied above a Stage fails to inspect that Stage's buckets. What should change?
    a: Apply the Aspect to the Stage itself or below it. Aspects do not propagate across Stage
      boundaries.
    trap: true
    facts:
      - stage
  - id: cdk-041
    q: When does AWS CDK run an Aspect's visit method?
    a: During preparation, visiting the scope construct and then its children from parent to child.
    facts:
      - register
      - visit
---
An Aspect applies a rule across a CDK construct tree, such as requiring bucket versioning or adding tags. It visits constructs during synthesis so a shared rule can inspect resources without being repeated in each definition.

### How it works

1. Register an Aspect with `Aspects.of(scope).add(...)`; scope means the construct and children the operation covers.
2. CDK calls `visit()` on the parent and then its children during preparation.
3. Inspect or modify each relevant resource. Add `Annotations.of(node).addError(...)` when a requirement fails, so synthesis fails.
4. Apply the Aspect on a `Stage`, a group of stacks, or below it when checking that Stage's resources.

### Exam cues

- If the question says bucket versioning must be checked during synthesis, think an Aspect with an error annotation, because the annotation prevents producing a deployable assembly.
- If the question says developers must not bypass infrastructure policy, think external CloudFormation Hooks or AWS Config, because developers control code inside the CDK Pipeline.

### Remember

- Aspects run during preparation and visit parent before children.
- Aspects do not cross `Stage` boundaries.
- Hooks provide preventive checks; AWS Config provides reactive checks. The execution role must not be able to disable these controls.

> **Trap:** An Aspect is code in the app. It cannot enforce a security boundary against someone who can change that code.
