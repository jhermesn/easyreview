---
title: Nested stacks
level: associate
order: 120
facts:
  - id: nested-resource
    text: An AWS::CloudFormation::Stack resource creates a nested stack from another template for reuse
      within a stack hierarchy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html#using-cfn-nested-stacks
  - id: root
    text: The root stack is the top of a nested hierarchy; each nested stack also has an immediate
      parent.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html#using-cfn-nested-stacks
  - id: nested-update
    text: AWS recommends initiating updates from the root stack; CloudFormation updates only nested
      stacks with template changes and does not recommend direct child updates.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html#perform-stack-operations-on-nested-stacks
  - id: template-url
    text: TemplateURL on AWS::CloudFormation::Stack identifies the nested stack template stored in
      Amazon S3.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-stack.html#cfn-cloudformation-stack-templateurl
  - id: nested-inputs
    text: The Parameters property of AWS::CloudFormation::Stack passes input key-value pairs to the
      child template.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-stack.html#cfn-cloudformation-stack-parameters
  - id: nested-output
    text: Fn::GetAtt on a nested stack resource with Outputs.OutputName returns that child output.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-stack.html#aws-resource-cloudformation-stack-return-values-fn--getatt
  - id: group-values
    text: A parent can pass an output from one nested stack as an input to another nested stack in its
      group.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#output-vs-nested
  - id: root-delete
    text: Root-stack operations should manage nested stacks rather than deleting child stacks directly.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html#perform-stack-operations-on-nested-stacks
cards:
  - id: cloudformation-002
    q: How should a team update a reusable nested CloudFormation stack?
    a: Change the nested template or its inputs and initiate the update from the root stack.
      CloudFormation updates affected nested stacks; direct child updates are not recommended.
    facts:
      - nested-update
      - nested-inputs
  - id: cloudformation-096
    q: A CloudFormation parent stack must send an environment value to a child template. Which property
      should it set?
    a: Parameters on the AWS::CloudFormation::Stack resource. The property supplies the child template
      inputs.
    facts:
      - nested-inputs
  - id: cloudformation-097
    q: Two nested CloudFormation stacks need to share an identifier under one parent. How should the
      parent connect them?
    a: Read the producer with Fn::GetAtt Child.Outputs.OutputName and pass that value in the consumer
      child Parameters.
    facts:
      - nested-output
      - group-values
      - nested-inputs
  - id: cloudformation-098
    q: What is the difference between a root stack and a parent stack in CloudFormation?
    a: The root is the top of the whole hierarchy. A parent is the immediate stack that contains a
      particular child.
    facts:
      - root
diagrams:
  - id: cfn-nested-values
    title: Pass an output between nested stacks
    width: 840
    height: 210
    nodes:
      - id: network
        label: Network child
        icon: res-cloudformation-stack
        info: The child exposes its value in Outputs.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: parent
        label: Parent stack
        icon: res-cloudformation-stack
        info: GetAtt reads Child.Outputs.OutputName.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: app
        label: Application child
        icon: res-cloudformation-stack
        info: The parent supplies the value through the child Parameters property.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: network
        to: parent
        step: 1
      - from: parent
        to: app
        step: 2
    steps:
      - Read the network child output in the parent template.
      - Pass the output as an input to the application child.
---
Nested stacks reuse a CloudFormation template as a child of another stack. They let a root stack manage a hierarchy while passing inputs and outputs between reusable pieces.

### How it works

1. Store the child template in S3 and reference it with `TemplateURL` on an `AWS::CloudFormation::Stack` resource.
2. Pass child inputs through that resource's `Parameters` property.
3. Read child results with `Fn::GetAtt Child.Outputs.OutputName`. The parent can pass one child's result into another child's parameters.
4. Initiate updates and deletion through the root stack. The root is the top of the hierarchy; a parent is the immediate stack containing a child. CloudFormation updates the nested stacks that need changes.

### Exam cues

- If the question says reuse a template inside a stack hierarchy, think a nested stack, because `AWS::CloudFormation::Stack` references the reusable child template.
- If the question says one nested stack needs another child's output, think parent wiring with `GetAtt` and `Parameters`, because child outputs can become sibling inputs.

### Remember

- `TemplateURL` points to the child template in S3.
- Update the hierarchy from its root rather than operating on child stacks directly.

> **Trap:** A child output is read from the nested stack resource using Outputs.OutputName. Passing the child resource's identifying value is not the same as reading that output.
