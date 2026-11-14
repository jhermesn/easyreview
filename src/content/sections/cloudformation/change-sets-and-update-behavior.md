---
title: Change sets and update behavior
level: associate
order: 50
facts:
  - id: preview
    text: A change set previews proposed resource and stack changes without applying them until
      execution.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
  - id: prevalidation
    text: Change set creation checks common failures including property syntax, resource name conflicts,
      and service quotas, but runtime execution can still fail.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
  - id: stale-previews
    text: After executing a change set, CloudFormation removes the other change sets associated with
      that stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
  - id: behaviors
    text: Resource property update behavior is no interruption, some interruption, or replacement.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#using-cfn-updating-stacks-update-behaviors
  - id: replacement
    text: Replacement gives a resource a new physical ID; CloudFormation usually creates the replacement
      first, redirects dependents, then removes the old resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement
  - id: replacement-values
    text: ResourceChange.Replacement can be True, False, or Conditional.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ResourceChange.html#API_ResourceChange_Contents
  - id: property-recreation
    text: ResourceTargetDefinition.RequiresRecreation can be Never, Conditionally, or Always.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ResourceTargetDefinition.html#API_ResourceTargetDefinition_Contents
  - id: scope
    text: ResourceChange.Scope identifies the changed resource attributes, including Properties and Tags.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ResourceChange.html#API_ResourceChange_Contents
  - id: custom-name
    text: A resource with a custom name cannot be replaced unless a new name is supplied.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-name.html
  - id: metadata-update
    text: If policy, condition, or output-only changes produce No updates to perform, adding or
      modifying a resource Metadata attribute can trigger the update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-no-updates-to-perform
  - id: nested-preview
    text: IncludeNestedStacks true creates change sets for the full nested hierarchy; execute or delete
      them through the root change set.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/change-sets-for-nested-stacks.html#change-sets-for-nested-stacks
  - id: create-review
    text: A CREATE change set creates a stack record with no resources and leaves it in
      REVIEW_IN_PROGRESS until execution.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateChangeSet.html#API_CreateChangeSet_RequestParameters
  - id: rds-version
    text: EngineVersion on AWS::RDS::DBInstance specifies the requested database engine version.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-rds-dbinstance.html#cfn-rds-dbinstance-engineversion
  - id: rds-major
    text: AllowMajorVersionUpgrade must be true when EngineVersion requests a different major RDS DB
      instance engine version.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-rds-dbinstance.html#cfn-rds-dbinstance-allowmajorversionupgrade
  - id: alarm-guard
    text: A configured rollback-trigger alarm entering ALARM during an operation or its monitoring
      window rolls back the entire stack operation.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: update-order
    text: CloudFormation orders resource updates by dependency.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-dependson.html#aws-attribute-dependson
  - id: lambda-s3-code
    text: A Lambda function whose code is in S3 is updated by CloudFormation only when S3Bucket, S3Key or S3ObjectVersion changes; uploading new code to the same key leaves the stack with nothing to update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-lambda-function-code.html
diagrams:
  - id: cfn-change-flow
    title: Preview and execute a stack update
    width: 1125
    height: 405
    nodes:
      - id: template
        label: New template
        sub: and parameters
        icon: res-cloudformation-template
        x: 25
        y: 60
        w: 150
        h: 86
        tone: mgmt
        info: Submit a changed template or parameter values to create a change set.
      - id: change
        label: Change set
        sub: preview before execution
        icon: res-cloudformation-change-set
        x: 300
        y: 60
        w: 180
        h: 86
        tone: mgmt
        info: Review proposed changes and replacement risk. Runtime execution can still fail.
      - id: stack
        label: Stack
        sub: execute change set
        icon: res-cloudformation-stack
        x: 613
        y: 60
        w: 150
        h: 86
        tone: mgmt
        info: Execution applies the changes and removes the other change sets for this stack.
      - id: resources
        label: Resources
        sub: update or replace
        icon: res-gear
        x: 913
        y: 60
        w: 150
        h: 86
        tone: mgmt
        info: Replacement normally creates a new resource, redirects dependents, and removes the old
          resource.
      - id: alarm
        label: CloudWatch alarm
        sub: rollback trigger
        icon: res-cloudwatch-alarm
        x: 613
        y: 270
        w: 160
        h: 86
        tone: mgmt
        info: A configured alarm entering ALARM during the operation or monitoring period triggers rollback.
    edges:
      - from: template
        to: change
        step: 1
        label: create
      - from: change
        to: stack
        step: 2
        label: execute
      - from: stack
        to: resources
        step: 3
      - from: alarm
        to: stack
        step: 4
        label: ALARM
        dashed: true
    steps:
      - Create a change set without applying resource changes.
      - Review the preview, then execute the selected change set.
      - CloudFormation updates resources according to their dependencies.
      - A configured rollback-trigger alarm can roll back the operation.
cards:
  - id: cloudformation-024
    q: How can a team review the resource impact of a CloudFormation update before applying it?
    a: Create a change set, review replacements and removals, then execute the chosen change set. The
      preview does not guarantee execution success.
    facts:
      - preview
      - replacement-values
      - prevalidation
  - id: cloudformation-034
    q: Which CloudFormation update behaviors can a resource property require, and what happens on
      replacement?
    a: No interruption, some interruption, or replacement. Replacement creates a new physical ID and
      usually creates the new resource before removing the old one.
    facts:
      - behaviors
      - replacement
  - id: cloudformation-036
    q: How does a CloudFormation change set identify replacement risk for a modified resource?
    a: Inspect Replacement (True, False, Conditional), property RequiresRecreation (Never,
      Conditionally, Always), and Scope. Check the resource property reference for interruption
      behavior.
    facts:
      - replacement-values
      - property-recreation
      - scope
      - behaviors
  - id: cloudformation-037
    q: A CloudFormation change set passes creation checks. Can execution still fail, and what happens to
      the other previews?
    a: Execution can still fail on runtime conditions. Executing the change set removes other change
      sets associated with that stack.
    trap: true
    facts:
      - prevalidation
      - stale-previews
  - id: cloudformation-038
    q: A CloudFormation update must replace a resource with a custom name. How should the team avoid the
      name conflict?
    a: Supply a new name for the replacement. CloudFormation cannot replace the resource while reusing
      its custom name.
    trap: true
    facts:
      - custom-name
  - id: cloudformation-044
    q: CloudFormation reports No updates to perform after only policy, condition, or output changes. How
      can the team apply those changes?
    a: Add or modify a Metadata attribute on a resource in the same update. CloudFormation may not
      recognize those changes alone as an update.
    trap: true
    facts:
      - metadata-update
  - id: cloudformation-077
    q: A CloudFormation root stack contains several nested stacks. How can a reviewer preview the entire
      update hierarchy?
    a: Create the change set with IncludeNestedStacks true and inspect the nested changes. Execute or
      delete the hierarchy through its root change set.
    facts:
      - nested-preview
  - id: cloudformation-078
    q: A new CloudFormation stack has REVIEW_IN_PROGRESS after a CREATE change set. Has provisioning
      started?
    a: No. Only the stack record exists; resources are created when the change set is executed.
    trap: true
    facts:
      - create-review
  - id: cloudformation-079
    q: An RDS DB instance managed by CloudFormation needs a major engine upgrade. Which properties
      express the request?
    a: Set EngineVersion to the target version and AllowMajorVersionUpgrade to true. The Boolean permits
      the major upgrade; it does not choose the version.
    trap: true
    facts:
      - rds-version
      - rds-major
  - id: cloudformation-154
    q: A pipeline uploads new Lambda code to the same S3 key and updates the stack, but the function keeps the old code. Why, and what fixes it?
    a: CloudFormation sees no change in S3Bucket, S3Key or S3ObjectVersion. Use a new key or pass the new S3ObjectVersion.
    trap: true
    facts: [lambda-s3-code]
---
A CloudFormation change set is a preview of a proposed stack operation. It separates reviewing changes from executing them, so replacements and removals can be examined before resources change.

### How it works

1. Submit a template or parameter changes to create a change set. Creation checks common errors such as invalid properties, name conflicts, and quota constraints.
2. Review resource changes, `Scope`, and replacement risk. For nested stacks, set `IncludeNestedStacks` to `true` and inspect the whole hierarchy.
3. Execute the selected change set from the root. CloudFormation applies changes in dependency order and removes the stack's other change sets.
4. On replacement, CloudFormation usually creates a new resource, redirects dependents, and removes the old physical resource. A physical ID identifies the actual provisioned resource.

| Update behavior | Resource effect |
|---|---|
| No interruption | Update without disrupting resource operation |
| Some interruption | Update can disrupt resource operation |
| Replacement | Create a resource with a new physical ID |

### Exam cues

- If the question says a database might be replaced, think `Replacement` and `RequiresRecreation`, because the preview exposes resource and property replacement requirements.
- If the question says all child-stack changes need review, think `IncludeNestedStacks`, because it previews the hierarchy before root execution.
- If the question says an RDS DB instance needs a major upgrade, think `EngineVersion` plus `AllowMajorVersionUpgrade: true`, because one selects the version and the other permits that major change.

### Remember

- `Replacement`: `True`, `False`, or `Conditional`.
- `RequiresRecreation`: `Never`, `Conditionally`, or `Always`.
- A `CREATE` change set leaves the stack in `REVIEW_IN_PROGRESS` with no provisioned resources until execution.
- For policy, condition, or output-only changes that report no updates, add or modify resource `Metadata` in the update.

> **Trap:** Passing change set creation checks does not guarantee successful execution. Runtime conditions can still fail.

> **Trap:** Replacement of a custom-named resource requires a new name.
