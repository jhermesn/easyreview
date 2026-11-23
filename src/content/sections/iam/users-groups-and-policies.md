---
title: Users, groups, and policies
level: foundational
order: 2
facts:
  - id: resource-wildcards
    text: "Wildcards in an IAM Resource ARN can match multiple resources."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html#reference_policies_elements_resource_wildcards
  - id: s3-putobject
    text: "The s3:PutObject permission is required to add an object to an S3 bucket."
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html
  - id: group
    text: An IAM user group is a collection of IAM users; policies attached to the group give its permissions to every user in it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html#id_groups
  - id: least-privilege
    text: Least-privilege permissions grant only the permissions required for a task, by defining the actions allowed on specific resources under specific conditions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege
  - id: start-managed
    text: AWS recommends starting with AWS managed policies for common use cases and moving toward least privilege with customer managed policies, because AWS managed policies may grant more than a specific use case needs.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-use-aws-defined-policies
  - id: temporary
    text: AWS recommends that human users and workloads use temporary credentials, such as IAM roles, instead of IAM users with long-term passwords and access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#root-user-best-practices
  - id: best-practices
    text: IAM best practices include requiring MFA for IAM users and the root user, updating access keys when long-term credentials are needed, and regularly removing unused users, roles, permissions and credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
  - id: account-alias
    text: "An account alias replaces the numeric account ID in the IAM user sign-in URL with an easier name."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/console-account-alias.html#console-account-alias
  - id: server-certs
    text: "ACM is the preferred place for SSL/TLS server certificates; IAM can also store server certificates, and must be used in Regions that ACM does not support."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html#id_credentials_server-certs
  - id: user-credentials
    text: "An IAM user is an identity in one AWS account with a name and credentials; you choose a console password, access keys or both, and a user created through the CLI or API starts with no credentials."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html#id_users_creds
  - id: action-element
    text: "An IAM Action value joins a service namespace to an operation name, for example s3:GetObject; a wildcard can match multiple operations."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html
cards:
  - id: iam-140
    q: "Why should a team review wildcard resource ARNs in an IAM policy?"
    a: "A wildcard can match resources beyond the intended resource."
    facts: [resource-wildcards]
  - id: iam-138
    q: "Which IAM permission is required to add an object to an Amazon S3 bucket?"
    a: "s3:PutObject."
    facts: [s3-putobject]
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
    q: "How can an administrator make an IAM user sign-in URL easier to remember?"
    a: "Create an account alias to replace the numeric account ID in the sign-in URL."
    facts: [account-alias]
  - id: iam-107
    q: "Where should a team store a server certificate in an AWS Region that ACM does not support?"
    a: "Use IAM to store the server certificate in that Region. ACM is preferred where supported."
    facts: [server-certs]
  - id: iam-126
    q: "Does every IAM user need a console password?"
    a: "No. An IAM user can have a console password, access keys or both.\nA user created through the CLI or API starts with no credentials."
    facts: [user-credentials]
  - id: iam-119
    q: "An IAM author needs to recognize an operation such as s3:GetObject and the scope of s3:*. What do these Action values mean?"
    a: "`s3:GetObject` names a service and an operation. `s3:*` matches the actions in that service namespace."
    facts: [action-element]
revised:
  - date: 2026-11-23
    note: Two cards now cover the account alias and server certificate storage.
    cards: [iam-106, iam-107]
---
IAM controls who can do what in an AWS account. Users are identities for people, groups collect users, and policies hold the permissions. The principle of least privilege decides how much those policies allow.

### How it works

1. Create identities. AWS prefers roles and IAM Identity Center users with temporary credentials; an IAM user has long-term credentials.
2. Collect users with the same job into a group.
3. Attach policies to the group, user or role. A policy lists allowed or denied actions on resources.
4. Start from AWS managed policies, then narrow them into customer managed policies that give only what each job needs.

### Exam cues

- If the question says an IAM resource wildcard grants access too broadly, think multiple matching resources, because an ARN wildcard can extend the scope.
- If the question says grant permission to upload an S3 object, think s3:PutObject, because adding an object requires that permission.
- If the question says many users need the same permissions, think IAM group, because a group policy gives its permissions to each user in the group.
- If the question says only the permissions needed for a task, think least privilege, because it limits actions on specific resources under specific conditions.
- If the question says a friendly IAM user sign-in URL, think account alias, because it replaces the numeric account ID in the URL.
- If the question says store a server certificate, think AWS Certificate Manager (ACM), because it is preferred; use IAM in Regions ACM does not support.

### Remember

- Prefer temporary credentials (roles) over long-term IAM user keys.
- For IAM users with long-term credentials, require MFA, update access keys and remove unused users and credentials.
- An IAM user belongs to one account. Credentials: console password, access keys, both, or none yet when created through the CLI or API.

> **Trap:** AWS managed policies do not always grant least privilege. They cover common use cases and can grant more than a specific task needs.
