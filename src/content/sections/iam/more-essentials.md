---
title: "PLACEHOLDER iam/more-essentials"
level: foundational
order: 120
facts:
  - id: aws-managed
    text: AWS managed policies are standalone policies created and administered by AWS; customers can't modify them, and they can be attached to many identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: customer-managed
    text: Customer managed policies are standalone policies that you create for specific use cases, change as often as you like, and attach to many identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: inline
    text: An inline policy is created for a single user, group or role and keeps a strict one-to-one relationship with that identity.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: group-rules
    text: A user group can contain many users and a user can belong to multiple groups; groups can't be nested, and no default group includes all users.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: group-change-job
    text: When a person changes jobs, an administrator can remove the user from the old groups and add them to the new ones instead of editing the user's permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: credential-report
    text: The IAM credential report lists all users in the account and the status of their passwords, access keys and MFA devices.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html
  - id: last-accessed
    text: IAM last accessed information shows which services an identity or policy has actually used, to remove unused permissions and keep least privilege.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html
  - id: groups-flat
    text: "IAM user groups cannot be nested: a group contains only users, and one user can belong to several groups, up to an account quota."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: policy-simulator
    text: "The IAM policy simulator tests identity-based policies, permissions boundaries, SCPs and resource-based policies against a simulated request, without sending a real request to any service."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html#access_policies_testing-policies
cards:
  - id: iam-079
    q: What are the three kinds of identity-based policies in IAM?
    a: "- AWS managed: created and maintained by AWS, can't be edited\n- Customer managed: you create and edit them, reusable\n- Inline: embedded in one user, group or role"
    facts: [aws-managed, customer-managed, inline]
  - id: iam-081
    q: A company needs a reusable policy it can edit, attached to several roles. Which IAM policy type fits?
    a: A customer managed policy.
    facts: [customer-managed]
  - id: iam-082
    q: Can one IAM user group contain another group?
    a: No. Groups can't be nested; they contain only users.
    trap: true
    facts: [group-rules]
  - id: iam-084
    q: An employee moves from the support team to the finance team. How should an administrator change the employee's IAM permissions?
    a: Remove the user from the support group and add them to the finance group, instead of editing the user's own permissions.
    facts: [group-change-job]
  - id: iam-095
    q: An auditor needs a list of all IAM users with the status of their passwords, access keys and MFA. Which IAM feature provides it?
    a: The IAM credential report.
    facts: [credential-report]
  - id: iam-096
    q: An administrator wants to see which permitted services an IAM role never uses, to trim its permissions. Which IAM feature helps?
    a: IAM last accessed information, which shows when each service was last used.
    facts: [last-accessed]
  - id: iam-104
    q: "Which is true of IAM user groups: they can be nested, a user can be in several groups, or every account has a default group with all users?"
    a: "A user can belong to several groups. Groups cannot be nested, and there is no default group that holds every user."
    trap: true
    facts: [groups-flat]
  - id: iam-105
    q: "Which IAM feature tests whether policies would allow an action without making the real request?"
    a: "The IAM policy simulator. It evaluates identity-based policies, permissions boundaries, SCPs and resource-based policies against a simulated request."
    facts: [policy-simulator]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
