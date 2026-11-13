---
title: Stack policies
level: professional
order: 230
facts:
  - id: policy
    text: A stack policy is a JSON document that restricts update actions on selected stack resources
      for all users.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources
  - id: before-policy
    text: Without a stack policy, all resource update actions are allowed to a caller with stack-update
      permission.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources
  - id: default-deny
    text: After a stack policy is set, resource updates require explicit Allow statements.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources
  - id: deny-wins
    text: An explicit Deny in a stack policy overrides Allow.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#stack-policy-intro-example
  - id: update-actions
    text: Stack policy actions are Update:Modify, Update:Replace, and Update:Delete.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#stack-policy-reference
  - id: temporary-policy
    text: A temporary stack policy supplied with an update overrides protection only for that update
      without changing the permanent policy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources-updating
  - id: override-permission
    text: Updating protected resources requires permission for cloudformation:SetStackPolicy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources-updating
  - id: policy-removal
    text: A stack policy cannot be deleted; edit it to allow all update actions if protection must be
      removed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources-modifying
  - id: update-only
    text: Stack policies apply to stack updates, not stack deletion or resource access authorization,
      which is controlled by IAM.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html#protect-stack-resources
cards:
  - id: cloudformation-023
    q: A CloudFormation database must resist accidental updates but allow one approved exception. What
      should the team use?
    a: A stack policy restricting its update actions, plus a temporary override policy for the approved
      update. Explicit Deny wins; the policy guards updates and does not replace IAM or prevent
      stack deletion.
    trap: true
    facts:
      - policy
      - update-actions
      - temporary-policy
      - deny-wins
      - update-only
  - id: cloudformation-125
    q: A CloudFormation stack policy was added with only one Allow statement. Why are other resource
      updates denied?
    a: After a stack policy is set, updates need explicit Allow coverage. Resources without it are
      protected by default.
    trap: true
    facts:
      - default-deny
  - id: cloudformation-126
    q: A CloudFormation stack policy denies replacement of a database. Can a temporary policy allow a
      single intended replacement?
    a: Yes. Supply a temporary override for that update with the required SetStackPolicy permission. It
      does not permanently change the stack policy.
    facts:
      - temporary-policy
      - override-permission
  - id: cloudformation-127
    q: Does a CloudFormation stack policy prevent a user from deleting the entire stack?
    a: No. It restricts actions during stack updates. IAM controls authorization; stack deletion needs
      separate protection.
    trap: true
    facts:
      - update-only
---
A CloudFormation stack policy protects selected resources from accidental changes during a stack update. It describes which update actions are allowed, rather than which users may access AWS resources.

### How it works

1. Set a JSON stack policy. Before a policy exists, a caller with stack-update permission can update all stack resources; afterward, resources need explicit `Allow` coverage.
2. Allow ordinary updates and deny the actions that must be protected. An explicit `Deny` wins over `Allow`.
3. For an intended exception, supply a temporary override policy with that update. This requires `cloudformation:SetStackPolicy` permission and leaves the permanent policy unchanged.

| Action | Restricts |
|---|---|
| `Update:Modify` | Changes to an existing resource |
| `Update:Replace` | Replacement with a new resource |
| `Update:Delete` | Removal during a stack update |

### Exam cues

- If the question says protect a database from accidental replacement during updates, think a stack policy denying `Update:Replace`, because it restricts that resource update action.
- If the question says allow one approved change without removing ongoing protection, think a temporary policy override, because it applies to that update only.

### Remember

- A stack policy applies to all users updating the stack.
- It cannot be deleted; edit it to allow all update actions when removing protection.
- IAM controls resource access authorization.

> **Trap:** Update:Delete means removal during an update. It does not block deletion of the entire stack.
