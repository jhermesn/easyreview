---
title: Apps, stacks, and constructs
level: associate
order: 10
facts:
  - id: iac
    text: AWS CDK defines infrastructure in programming languages and synthesizes CloudFormation
      templates.
    source: https://docs.aws.amazon.com/cdk/v2/guide/core-concepts.html#concepts-cfn
  - id: hierarchy
    text: A CDK app contains stacks.
    source: https://docs.aws.amazon.com/cdk/v2/guide/core-concepts.html#concepts-learn
  - id: stack
    text: A CDK stack represents a CloudFormation stack and contains resource constructs.
    source: https://docs.aws.amazon.com/cdk/v2/guide/core-concepts.html#concepts-learn
  - id: construct
    text: A construct is a reusable component representing one or more CloudFormation resources and
      their configuration.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
  - id: l1
    text: Each L1 construct maps to a single CloudFormation resource.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: l1-name
    text: L1 construct names start with Cfn, such as CfnBucket.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: l2
    text: L2 constructs provide resource defaults and helper methods for permissions and resource
      interactions.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: l2-example
    text: s3.Bucket is an L2 construct.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: l3
    text: L3 patterns compose resources for a use case.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: l3-example
    text: ApplicationLoadBalancedFargateService combines a Fargate service and an application load
      balancer.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
  - id: libraries
    text: Teams can define their own constructs, compose them from other constructs and distribute them
      for reuse.
    source: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-define
  - id: synth-command
    text: cdk synth produces a cloud assembly.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: diff-command
    text: cdk diff compares infrastructure changes.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: deploy-command
    text: cdk deploy deploys stacks.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
cards:
  - id: cdk-003
    q: How do AWS CDK L1, L2 and L3 constructs differ?
    a: L1 maps to a CloudFormation resource; L2 adds defaults and helper methods; L3 combines resources
      into a pattern.
    facts:
      - l1
      - l1-name
      - l2
      - l2-example
      - l3
      - l3-example
  - id: cdk-020
    q: A platform team wants an approved infrastructure pattern reused in several AWS CDK apps. What
      should it distribute?
    a: A shared construct library. Consumers import the construct and configure its exposed properties.
    facts:
      - libraries
      - construct
  - id: cdk-024
    q: Which AWS tool defines infrastructure in programming languages, and how are its resource
      definitions organized?
    a: AWS CDK. An app contains stacks, which contain constructs. Synthesis produces templates for
      CloudFormation deployment.
    facts:
      - iac
      - hierarchy
      - stack
  - id: cdk-027
    q: An AWS CDK team needs direct control over the CloudFormation properties of an S3 bucket. Which
      construct level fits?
    a: L1, such as CfnBucket, because it exposes the CloudFormation resource properties directly.
    facts:
      - l1
      - l1-name
  - id: cdk-028
    q: Which AWS CDK commands synthesize templates, preview changes and deploy stacks?
    a: cdk synth, cdk diff and cdk deploy, respectively.
    facts:
      - synth-command
      - diff-command
      - deploy-command
---
AWS CDK defines infrastructure in a programming language and turns it into CloudFormation templates. A construct is a reusable component that describes resources; a stack groups constructs into a CloudFormation deployment.

### How it works

1. Create an app, the root that contains your stacks.
2. Add stacks and define resources inside them with constructs.
3. Choose the construct level that exposes the control you need. Compose your own constructs when several apps need the same pattern.
4. Run `cdk synth` to produce the deployment files, `cdk diff` to inspect changes, and `cdk deploy` to deploy through CloudFormation.

| Level | What it provides | Example |
|---|---|---|
| L1 | Direct CloudFormation resource properties | `CfnBucket` |
| L2 | Resource defaults and helper methods | `s3.Bucket` |
| L3 | Several resources configured as a pattern | `ApplicationLoadBalancedFargateService` |

### Exam cues

- If the question says several teams need the same infrastructure pattern, think a shared construct library, because constructs can be composed and distributed.
- If the question says a resource needs explicit CloudFormation properties, think L1, because it maps directly to that resource.

### Remember

- An app contains stacks; stacks contain constructs.
- L1 names start with `Cfn`. L2 adds defaults and helpers. L3 combines resources.

> **Trap:** CDK code produces CloudFormation templates. Choosing a higher construct level still leads to a CloudFormation deployment.
