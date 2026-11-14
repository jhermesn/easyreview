---
title: Deletion and replacement policies
level: associate
order: 60
facts:
  - id: deletion-scope
    text: DeletionPolicy applies when a stack is deleted or a resource is removed from its template, but
      not when an update replaces its physical resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy
  - id: deletion-default
    text: DeletionPolicy defaults to Delete except that RDS DBCluster and RDS DBInstance without
      DBClusterIdentifier default to Snapshot.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy
  - id: delete
    text: Delete removes the resource and applicable contents.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
  - id: retain
    text: Retain keeps the physical resource while removing it from CloudFormation management when it
      leaves the stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
  - id: retain-create
    text: RetainExceptOnCreate retains a resource except when the operation that initially created it
      rolls back, when CloudFormation deletes it.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
  - id: snapshot
    text: Snapshot takes a snapshot before deleting a resource that supports this policy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
  - id: replacement-scope
    text: UpdateReplacePolicy controls the old physical resource when an update requires replacement.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatereplacepolicy.html#aws-attribute-updatereplacepolicy
  - id: replacement-options
    text: UpdateReplacePolicy supports Delete, Retain, and Snapshot, with Delete as its default.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatereplacepolicy.html#aws-attribute-updatereplacepolicy-options
  - id: snapshot-fallback
    text: UpdateReplacePolicy Snapshot falls back to Delete on a resource type without snapshot support.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatereplacepolicy.html#aws-attribute-updatereplacepolicy-options
  - id: retain-cost
    text: Retained resources and snapshots continue to incur applicable charges until deleted.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
  - id: replace-sequence
    text: Replacement normally creates a new physical resource and redirects dependents before removing
      the old one.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatereplacepolicy.html#aws-attribute-updatereplacepolicy
  - id: rename-stack
    text: A stack can't be renamed; to move resources to a stack with a new name, set DeletionPolicy Retain on them, delete the old stack, then import the retained resources into a new stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import.html
cards:
  - id: cloudformation-035
    q: A CloudFormation change set would replace an RDS database. Which policy protects the old physical
      database?
    a: "UpdateReplacePolicy: Retain or Snapshot on a supported type. Replacement normally creates the
      new resource before disposing of the old one."
    trap: true
    facts:
      - replacement-scope
      - replacement-options
      - replace-sequence
  - id: cloudformation-046
    q: When does CloudFormation DeletionPolicy apply, and what is its default?
    a: It applies to stack deletion and removal from a template. Delete is the default, except Snapshot
      for RDS DBCluster and RDS DBInstance without DBClusterIdentifier. Options are Delete, Retain,
      RetainExceptOnCreate, and Snapshot for supported types.
    facts:
      - deletion-scope
      - deletion-default
      - delete
      - retain
      - retain-create
      - snapshot
  - id: cloudformation-047
    q: "Does DeletionPolicy: Retain protect the old resource during a CloudFormation replacement
      update?"
    a: "No. Use UpdateReplacePolicy: Retain or Snapshot. Snapshot on an unsupported UpdateReplacePolicy
      resource falls back to Delete."
    trap: true
    facts:
      - deletion-scope
      - replacement-scope
      - snapshot-fallback
  - id: cloudformation-080
    q: A CloudFormation resource should survive normal stack deletion but be removed if its initial
      creation rolls back. Which policy fits?
    a: "DeletionPolicy: RetainExceptOnCreate. It deletes the resource when its creating operation rolls
      back and retains it for later removals."
    facts:
      - retain-create
  - id: cloudformation-081
    q: "A CloudFormation resource is removed from its template with DeletionPolicy: Retain. Is
      CloudFormation still managing it?"
    a: No. The physical resource remains and can still incur charges, but leaves CloudFormation
      management.
    trap: true
    facts:
      - retain
      - retain-cost
  - id: cloudformation-151
    q: How can a team give a CloudFormation stack a new name without deleting its resources?
    a: Set DeletionPolicy Retain on every resource, delete the stack, then import the retained resources into a new stack with the new name.
    facts: [rename-stack]
---
Deletion and replacement policies decide what CloudFormation does with a physical resource when it leaves a stack. Choose the policy by the event: removal from the stack or replacement during an update.

### How it works

1. Set `DeletionPolicy` for stack deletion or removal of a resource definition from the template.
2. Set `UpdateReplacePolicy` separately when an update might replace the resource. Replacement normally creates the new resource and redirects dependents before disposing of the old one.
3. Select the retention behavior. A snapshot is a saved copy of a resource's data, available only for supported types.

| Behavior | DeletionPolicy | UpdateReplacePolicy |
|---|---|---|
| Delete the resource | `Delete` | `Delete` |
| Keep the physical resource outside stack management | `Retain` | `Retain` |
| Keep it except on rollback of its creating operation | `RetainExceptOnCreate` | Not an option |
| Snapshot, then delete | `Snapshot` on supported types | `Snapshot` on supported types |

### Exam cues

- If the question says deleting a stack must preserve a database, think `DeletionPolicy`, because that policy controls removal from the stack.
- If the question says an update replaces a database and its old copy must survive, think `UpdateReplacePolicy`, because replacement has a separate disposal policy.
- If the question says failed initial provisioning must leave no unused resource, think `RetainExceptOnCreate`, because it deletes on rollback of the creating operation.

### Remember

- `DeletionPolicy` defaults to `Delete`, except `Snapshot` for RDS DBCluster and RDS DBInstance without `DBClusterIdentifier`.
- `UpdateReplacePolicy` defaults to `Delete`.
- Retained resources and snapshots can keep incurring charges.

> **Trap:** DeletionPolicy does not cover replacement. UpdateReplacePolicy: Snapshot falls back to Delete when the resource does not support snapshots.
