---
title: Cross-stack exports
level: associate
order: 130
facts:
  - id: export
    text: Outputs.Export publishes a value that another stack reads with Fn::ImportValue.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
  - id: export-scope
    text: Fn::ImportValue works only within the same AWS account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
  - id: export-unique
    text: Export names must be unique within an account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
  - id: export-lock
    text: An imported export value cannot be modified and its producing stack cannot be deleted until
      all imports are removed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
  - id: export-expression
    text: Export names and ImportValue expressions cannot depend on resource-dependent Ref or GetAtt
      values.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
  - id: independent
    text: Exports support independently managed stacks, while nested stacks compose resources under one
      root hierarchy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#output-vs-nested
  - id: list-imports
    text: The list-imports operation identifies stacks importing a specified export.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports
cards:
  - id: cloudformation-003
    q: Two independent CloudFormation stacks in one account and Region need a shared identifier with
      deletion protection. What should they use?
    a: Export an output and read it with Fn::ImportValue. Export names are unique within the account and
      Region, and imports block changing that value or deleting its source stack.
    trap: true
    facts:
      - export
      - export-scope
      - export-unique
      - export-lock
  - id: cloudformation-057
    q: Several independently managed CloudFormation application stacks need subnet IDs from a network
      stack. How should they share them?
    a: Export the network outputs and use Fn::ImportValue in each application stack in the same account
      and Region. Nested stacks fit a shared root hierarchy instead.
    trap: true
    facts:
      - export
      - export-scope
      - independent
  - id: cloudformation-099
    q: A CloudFormation network stack cannot be deleted because another stack imports an output. What
      must the team do first?
    a: Remove every import of the export. Use list-imports to identify consumers, update them, and then
      delete the producer.
    facts:
      - export-lock
      - list-imports
  - id: cloudformation-100
    q: Can a CloudFormation export name depend on an identifier returned by a resource Ref?
    a: No. Export names and ImportValue expressions cannot depend on resource-dependent Ref or GetAtt
      values.
    trap: true
    facts:
      - export-expression
---
Cross-stack exports share values between independently managed CloudFormation stacks in the same account and Region. An import also protects its source from deletion while consumers depend on the exported value.

### How it works

1. Define an output in the producing stack and give it an `Export` name unique within the account and Region.
2. Use `Fn::ImportValue` with that name in a consuming stack in the same account and Region.
3. To change the export value or delete the producer, find consumers with `list-imports` and remove all imports first.

### Exam cues

- If the question says independent application stacks share a network identifier in one account and Region, think exports and `Fn::ImportValue`, because they share outputs across separate stack lifecycles.
- If the question says deletion of an exporting stack is blocked, think remaining imports, because consumers lock the exported value and its producing stack.

### Remember

- Export names are unique per account and Region.
- Export names and import expressions cannot depend on resource-dependent `Ref` or `GetAtt` values.
- Nested stacks compose a hierarchy managed from one root; exports connect independent stacks.

> **Trap:** An imported value cannot be changed while consumers still import it. Remove every import before changing that value or deleting the source stack.
