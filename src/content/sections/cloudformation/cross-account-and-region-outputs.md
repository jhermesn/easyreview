---
title: Cross-account and Region outputs
level: professional
order: 140
facts:
  - id: get-output
    text: Fn::GetStackOutput reads an output from another stack, including across accounts and Regions,
      without requiring an Export.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: output-name
    text: Fn::GetStackOutput requires StackName and OutputName, where OutputName is the output logical
      ID.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html
  - id: output-region
    text: The Region parameter chooses the source Region and defaults to the consuming stack Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: output-role
    text: For cross-account reads, RoleArn identifies a source-account role with
      cloudformation:DescribeStacks that the consuming stack execution role can assume.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: role-default
    text: RoleArn defaults to the current stack execution role when omitted.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: weak-reference
    text: GetStackOutput resolves at create or update time; later source edits or deletion neither
      update nor notify the consumer and are not blocked by the reference.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: partition
    text: GetStackOutput does not support references across AWS partitions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: import-local
    text: Fn::ImportValue requires an export in the same account and Region and blocks deletion of its
      imported source.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
  - id: introduced
    text: Fn::GetStackOutput support was announced in May 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/05/aws-cloudformation-cdk-stack/
  - id: output-limitations
    text: GetStackOutput is unsupported as a direct Outputs value or inside Sub variable maps, Base64,
      Equals in Conditions, or ImportValue.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/intrinsic-function-reference-getstackoutput.html#intrinsic-function-reference-getstackoutput
cards:
  - id: cloudformation-004
    q: A CloudFormation stack must read an output from another account or Region. Which function
      supports this, and what protection does it provide?
    a: Fn::GetStackOutput. It needs no Export, but its weak reference does not block source deletion or
      automatically refresh the consumer after source changes.
    trap: true
    facts:
      - get-output
      - weak-reference
  - id: cloudformation-101
    q: A CloudFormation GetStackOutput read must cross both account and Region boundaries. Which
      settings and permissions are needed?
    a: Set Region and RoleArn for the source. That source role needs cloudformation:DescribeStacks and
      must be assumable by the consuming stack execution role.
    facts:
      - output-region
      - output-role
  - id: cloudformation-102
    q: A source stack output changes after a consumer used CloudFormation GetStackOutput. Will the
      consumer automatically receive the new value?
    a: No. The value resolves on consumer create or update. The weak reference neither updates the
      consumer nor blocks source changes.
    trap: true
    facts:
      - weak-reference
  - id: cloudformation-103
    q: When should CloudFormation use ImportValue rather than GetStackOutput for a local stack output?
    a: Use ImportValue when a same-account, same-Region export should block deletion of its source.
      GetStackOutput supports broader scope but has a weak reference.
    facts:
      - import-local
      - get-output
      - weak-reference
diagrams:
  - id: cfn-cross-account-output
    title: Read a source-account stack output
    width: 840
    height: 210
    nodes:
      - id: consumer
        label: Consumer stack
        icon: res-cloudformation-stack
        info: GetStackOutput resolves a source output during stack creation or updating.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: role
        label: Source IAM role
        icon: res-identity-access-management-role
        info: RoleArn identifies a role assumable by the consumer execution role with DescribeStacks
          permission.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: source
        label: Source stack
        icon: res-cloudformation-stack
        info: StackName, OutputName, and Region select the output to read. An Export is not required.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: consumer
        to: role
        step: 1
      - from: role
        to: source
        step: 2
    steps:
      - Assume the source-account role specified by RoleArn.
      - Read the source stack output with cloudformation:DescribeStacks.
---
Fn::GetStackOutput reads another CloudFormation stack's output across accounts or Regions without an export. Treat it as a lookup during deployment: later source changes do not flow automatically to its consumers.

### How it works

1. Specify `StackName` and `OutputName`, the logical ID of the output in the source template.
2. Set `Region` for a source in another Region. For another account, set `RoleArn` to a role in the source account.
3. Give that role `cloudformation:DescribeStacks` permission and trust allowing the consumer's execution role to assume it. CloudFormation reads the value when creating or updating the consumer.

### Exam cues

- If the question says read another account's stack output, think `Fn::GetStackOutput` with a source role, because the function supports cross-account lookup.
- If the question says prevent deletion of a local output's producing stack, think `Export` and `Fn::ImportValue`, because `GetStackOutput` has a weak reference that does not enforce that protection.

### Remember

- `Region` defaults to the consumer's Region. `RoleArn` defaults to its execution role.
- Cross-partition lookup is unsupported. A partition is a separate AWS group of Regions, such as the standard AWS partition and AWS GovCloud.
- May 2026: AWS announced native `Fn::GetStackOutput` support across accounts and Regions.
- Current unsupported positions include a direct `Outputs` value, a `Sub` variable map, `Base64`, `Equals` in Conditions, and `ImportValue`.

> **Trap:** A weak reference does not block source deletion or notify the consumer of changes. Re-resolve the lookup with a consumer operation when a new value is needed.
