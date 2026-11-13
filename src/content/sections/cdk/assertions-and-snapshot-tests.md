---
title: Assertions and snapshot tests
level: associate
order: 60
facts:
  - id: fine
    text: Fine-grained CDK assertions test specific properties of synthesized CloudFormation templates.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html
  - id: snapshot
    text: Snapshot tests compare a synthesized template with a stored baseline.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html
  - id: snapshot-upgrade
    text: CDK upgrades can change synthesized templates, so snapshots alone do not establish correctness.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html
  - id: framework
    text: The CDK assertions module works with frameworks such as Jest for TypeScript or JavaScript and
      pytest for Python.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html
  - id: template
    text: Template.fromStack creates a template for assertions from a CDK stack.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html#testing-fine-grained
  - id: properties
    text: hasResourceProperties partially matches supplied properties, allowing untested properties to
      exist.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html#testing-fine-grained
  - id: count
    text: resourceCountIs checks the number of resources of a specified CloudFormation type.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing.html#testing-fine-grained
  - id: pipeline
    text: CDK Pipelines supports validation steps before or after a deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-stages
  - id: sam-synth
    text: Run cdk synth before testing a CDK application with SAM local.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing-locally-with-sam-cli.html
  - id: sam
    text: sam local invoke uses the synthesized template path and function identifier.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing-locally-with-sam-cli.html
  - id: local-api
    text: sam local start-api can expose API endpoints from the synthesized CDK template.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing-locally-with-sam-cli.html
  - id: local-lambda
    text: sam local start-lambda exposes a local Lambda endpoint using the synthesized CDK template.
    source: https://docs.aws.amazon.com/cdk/v2/guide/testing-locally-with-sam-cli.html
cards:
  - id: cdk-015
    q: How should a team check AWS CDK resource properties before deploying infrastructure?
    a: Use assertions-module tests against the synthesized template, such as Template.fromStack and
      hasResourceProperties. Run them in the pipeline before deployment.
    facts:
      - fine
      - template
      - properties
      - pipeline
  - id: cdk-016
    q: When should an AWS CDK team use fine-grained assertions versus snapshot tests?
    a: Use fine-grained assertions for specific template requirements. Snapshots detect changes against
      a baseline, but CDK upgrades can change templates too, so do not rely on snapshots alone.
    facts:
      - fine
      - snapshot
      - snapshot-upgrade
  - id: cdk-034
    q: An AWS CDK team wants to invoke a Lambda function locally before deployment. What must it
      generate and pass to AWS SAM?
    a: Run cdk synth, then sam local invoke with the synthesized template path and the function
      identifier.
    facts:
      - sam-synth
      - sam
  - id: cdk-035
    q: An AWS CDK snapshot test changes after a library upgrade. Does that prove the infrastructure is
      incorrect?
    a: No. CDK upgrades can change synthesized templates. Review the change and keep fine-grained
      assertions for required behavior.
    trap: true
    facts:
      - snapshot
      - snapshot-upgrade
      - fine
  - id: cdk-036
    q: Does AWS CDK hasResourceProperties require the listed properties to be the resource's only
      properties?
    a: No. It performs a partial match. Use resourceCountIs separately when the resource count matters.
    trap: true
    facts:
      - properties
      - count
---
CDK assertions inspect generated CloudFormation templates to catch infrastructure mistakes before deployment. A snapshot is a saved template baseline; a fine-grained assertion checks one specific requirement.

### How it works

1. Define the stack in a test using a framework such as Jest or pytest.
2. Create a template with `Template.fromStack()`. Check properties with `hasResourceProperties()` and resource counts with `resourceCountIs()`.
3. Compare snapshots when you need to review the whole template, while retaining specific assertions for required settings.
4. Run validation commands in a pipeline step before deployment.
5. For local Lambda behavior, run `cdk synth` and pass the template to `sam local invoke` with the function identifier. Use `sam local start-api` or `sam local start-lambda` for local endpoints.

### Exam cues

- If the question says an infrastructure property must be checked before deployment, think a fine-grained template assertion, because it examines the generated resource configuration.
- If the question says invoke CDK-defined Lambda code locally, think synthesize first and use SAM local, because SAM reads the resulting template.

### Remember

- `hasResourceProperties()` uses partial matching; other properties may exist.
- `resourceCountIs()` checks a resource type's count.
- CDK upgrades can change snapshots without proving a defect.

> **Trap:** A saved snapshot records the previous template. It does not prove the template met the intended requirements.
