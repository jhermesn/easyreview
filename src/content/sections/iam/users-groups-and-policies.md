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
  - id: best-practices
    text: IAM best practices include requiring MFA for IAM users and the root user, updating access keys when long-term credentials are needed, and regularly removing unused users, roles, permissions and credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
  - id: groups-flat
    text: "IAM user groups cannot be nested: a group contains only users, and one user can belong to several groups, up to an account quota."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: policy-simulator
    text: "The IAM policy simulator tests identity-based policies, permissions boundaries, SCPs and resource-based policies against a simulated request, without sending a real request to any service."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html#access_policies_testing-policies
  - id: account-alias
    text: "An account alias replaces the numeric account ID in the IAM user sign-in URL with an easier name."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/console-account-alias.html#console-account-alias
  - id: server-certs
    text: "ACM is the preferred place for SSL/TLS server certificates; IAM can also store server certificates, and must be used in Regions that ACM does not support."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html#id_credentials_server-certs
cards:
  - id: iam-078
    q: Ten developers need the same permissions in AWS. What is the simplest way to manage them in IAM?
    a: Put the developers in an IAM user group and attach the policy to the group. Every user in it gets the permissions.
    facts: [group]
  - id: iam-080
    q: What does the principle of least privilege mean for IAM permissions?
    a: Grant only the permissions a task needs, on specific resources and under specific conditions.
    facts: [least-privilege]
  - id: iam-083
    q: Do AWS managed policies always give least-privilege permissions?
    a: No. They cover common use cases and may grant more than a specific task needs. Move to customer managed policies for least privilege.
    trap: true
    facts: [start-managed]
  - id: iam-100
    q: Which IAM best practices apply when a company still needs IAM users with long-term credentials?
    a: Require MFA, update (rotate) their access keys, and regularly remove unused users and credentials.
    facts: [best-practices]
  - id: iam-106
    q: "How can an administrator give the same IAM permissions to several users?"
    a: "Attach a policy to an IAM user group. Its permissions apply to every user in the group."
    facts: [group]
  - id: iam-107
    q: "What does least privilege mean when granting IAM permissions?"
    a: "Give only the permissions needed for the task, scoped to the relevant actions, resources and conditions."
    facts: [least-privilege]
---
IAM controls who can do what in an AWS account. Users are identities for people, groups collect users, and policies hold the permissions. The principle of least privilege decides how much those policies allow. [IAM user groups](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups)

### How it works

1. Create identities. AWS prefers roles and IAM Identity Center users with temporary credentials; an IAM user has long-term credentials.
2. Collect users with the same job into a group.
3. Attach policies to the group, user or role. A policy lists allowed or denied actions on resources.
4. Start from AWS managed policies, then narrow them into customer managed policies that give only what each job needs. [Least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege)

### Exam cues

- If the question says many users need the same permissions, think IAM group, because a group policy gives its permissions to each user in the group.
- If the question says only the permissions needed for a task, think least privilege, because it limits actions on specific resources under specific conditions.
- If the question says a friendly IAM user sign-in URL, think account alias, because it replaces the numeric account ID in the URL. [Account alias](https://docs.aws.amazon.com/IAM/latest/UserGuide/console-account-alias.html#console-account-alias)
- If the question says store a server certificate, think AWS Certificate Manager (ACM), because it is preferred; use IAM in Regions ACM does not support. [Server certificates](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html#id_credentials_server-certs)

### Remember

- Prefer temporary credentials (roles) over long-term IAM user keys.
- For IAM users with long-term credentials, require MFA, update access keys and remove unused users and credentials. [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> **Trap:** AWS managed policies do not always grant least privilege. They cover common use cases and can grant more than a specific task needs. [AWS managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-use-aws-defined-policies)
