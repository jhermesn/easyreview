---
title: Users, groups, and policies
level: foundational
order: 2
facts:
  - id: group
    text: An IAM user group is a collection of IAM users; policies attached to the group give its permissions to every user in it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: group-change-job
    text: When a person changes jobs, an administrator can remove the user from the old groups and add them to the new ones instead of editing the user's permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: group-rules
    text: A user group can contain many users and a user can belong to multiple groups; groups can't be nested, and no default group includes all users.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: aws-managed
    text: AWS managed policies are standalone policies created and administered by AWS; customers can't modify them, and they can be attached to many identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: customer-managed
    text: Customer managed policies are standalone policies that you create for specific use cases, change as often as you like, and attach to many identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: inline
    text: An inline policy is created for a single user, group or role and keeps a strict one-to-one relationship with that identity.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#access_policies_managed-vs-inline
  - id: least-privilege
    text: Least-privilege permissions grant only the permissions required for a task, by defining the actions allowed on specific resources under specific conditions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege
  - id: start-managed
    text: AWS recommends starting with AWS managed policies for common use cases and moving toward least privilege with customer managed policies, because AWS managed policies may grant more than a specific use case needs.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-use-aws-defined-policies
  - id: temporary
    text: AWS recommends that human users and workloads use temporary credentials, such as IAM roles, instead of IAM users with long-term passwords and access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#root-user-best-practices
  - id: last-accessed
    text: IAM last accessed information shows which services an identity or policy has actually used, to remove unused permissions and keep least privilege.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html
  - id: credential-report
    text: The IAM credential report lists all users in the account and the status of their passwords, access keys and MFA devices.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html
cards:
  - id: iam-078
    q: Ten developers need the same permissions in AWS. What is the simplest way to manage them in IAM?
    a: Put the developers in an IAM user group and attach the policy to the group. Every user in it gets the permissions.
    facts: [group]
  - id: iam-079
    q: What are the three kinds of identity-based policies in IAM?
    a: "- AWS managed: created and maintained by AWS, can't be edited\n- Customer managed: you create and edit them, reusable\n- Inline: embedded in one user, group or role"
    facts: [aws-managed, customer-managed, inline]
  - id: iam-080
    q: What does the principle of least privilege mean for IAM permissions?
    a: Grant only the permissions a task needs, on specific resources and under specific conditions.
    facts: [least-privilege]
  - id: iam-081
    q: A company needs a reusable policy it can edit, attached to several roles. Which IAM policy type fits?
    a: A customer managed policy.
    facts: [customer-managed]
  - id: iam-082
    q: Can one IAM user group contain another group?
    a: No. Groups can't be nested; they contain only users.
    trap: true
    facts: [group-rules]
  - id: iam-083
    q: Do AWS managed policies always give least-privilege permissions?
    a: No. They cover common use cases and may grant more than a specific task needs. Move to customer managed policies for least privilege.
    trap: true
    facts: [start-managed]
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
---
IAM controls who can do what in an AWS account. Users are identities for people, groups collect users, and policies hold the permissions. The principle of least privilege decides how much those policies allow. [IAM user groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups)

### How it works

1. Create identities. AWS prefers roles and IAM Identity Center users with temporary credentials; an IAM user has long-term credentials.
2. Collect users with the same job into a group.
3. Attach policies to the group, user or role. A policy lists allowed or denied actions on resources.
4. Start from AWS managed policies, then narrow them into customer managed policies that give only what each job needs. [Least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege)

| Policy type | Who manages it | Reusable | Typical use |
|---|---|---|---|
| AWS managed | AWS | Yes, attach to many | Quick start for common jobs |
| Customer managed | You | Yes, attach to many | Least-privilege permissions you maintain |
| Inline | You | No, one identity only | A strict one-to-one permission |

### Exam cues

- If the question says many users with the same permissions, think IAM group.
- If the question says only the permissions needed, think least privilege.
- If the question says a reusable policy you can edit, think customer managed policy.
- If the question says audit the status of all users' credentials, think IAM credential report, because it lists passwords, keys and MFA per user.

### Remember

- Groups contain users only; no nesting, no default group of all users.
- AWS managed policies can't be edited.
- Prefer temporary credentials (roles) over long-term IAM user keys.

> **Trap:** A group is not an identity that can sign in or be named as a principal. It only hands permissions to its users.
