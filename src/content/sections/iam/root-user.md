---
title: The root user
level: foundational
order: 1
facts:
  - id: definition
    text: The AWS account root user is the single sign-in identity created with the account, with complete access to all AWS services and resources; it signs in with the email address and password used to create the account.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#id_root-user
  - id: not-daily
    text: AWS strongly recommends not using the root user for everyday tasks, and using it only for tasks that require root user credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#id_root-user
  - id: admin-instead
    text: Instead of the root user, create an administrative user for everyday tasks, such as an administrative user in IAM Identity Center.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#root-user-best-practices
  - id: mfa-enforced
    text: MFA is enforced for the root user of all account types; the customer adds the MFA device at account creation or when prompted at sign-in.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#id_root-user
  - id: protections
    text: Root user best practices include a strong password, MFA on sign-in, not creating access keys for the root user, and securing the account recovery mechanisms.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#root-user-best-practices
  - id: central-root
    text: With AWS Organizations, centralized root access lets the management account remove root user credentials from member accounts; new member accounts then have no root user credentials by default.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#id_root-user-access-management
  - id: tasks-account
    text: Root-only account tasks include changing a standalone account's email address, root password and root access keys, closing a standalone account, reopening a closed account, and restoring permissions when the only IAM administrator revoked their own.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#root-user-tasks
  - id: tasks-other
    text: Root-only tasks also include activating IAM access to the Billing and Cost Management console, registering as a seller in the Reserved Instance Marketplace, enabling MFA delete on an S3 bucket, editing an S3 bucket policy that denies all principals, and signing up for AWS GovCloud (US).
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#root-user-tasks
  - id: monitor-root
    text: AWS recommends alerting on root user sign-in and use, for example with an Amazon EventBridge rule that detects root user activity and notifies administrators through Amazon SNS.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#ru-bp-monitor
  - id: cloudwatch-events-rule
    text: The root user best practices describe the sign-in alert both as an Amazon CloudWatch Events rule that notifies the security administrator and as an Amazon EventBridge rule with Amazon SNS.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#ru-bp-monitor
cards:
  - id: iam-071
    q: What is the AWS account root user, and when should it be used?
    a: The identity created with the account, with complete access to everything in it. Use it only for the few tasks that require root credentials, never for daily work.
    facts: [definition, not-daily]
  - id: iam-072
    q: Name four ways to protect the AWS account root user.
    a: "- A strong password\n- MFA on sign-in\n- No access keys for the root user\n- Daily work done by an administrative user instead"
    facts: [protections, admin-instead]
  - id: iam-073
    q: The only IAM administrator in a standalone AWS account removed their own permissions by mistake. Who can restore them?
    a: The root user. Restoring IAM user permissions in that case is a root-only task.
    facts: [tasks-account]
  - id: iam-074
    q: Which identity must close a standalone AWS account that is not in AWS Organizations?
    a: The root user.
    facts: [tasks-account]
  - id: iam-075
    q: "Which of these tasks requires the AWS account root user: creating an IAM user, enabling MFA delete on an S3 bucket, or launching an EC2 instance?"
    a: Enabling MFA delete on an S3 bucket. The others work with IAM permissions.
    facts: [tasks-other]
  - id: iam-076
    q: A company with AWS Organizations wants member accounts to have no root user passwords at all. What feature does this?
    a: Centralized root access management. The management account removes member root credentials, and new member accounts have none by default.
    facts: [central-root]
  - id: iam-077
    q: Should a team create access keys for the AWS account root user so scripts can run with full access?
    a: No. AWS recommends never creating root access keys; scripts should use roles with least-privilege permissions.
    trap: true
    facts: [protections, not-daily]
  - id: iam-097
    q: A security team wants a notification whenever someone signs in as the AWS account root user. What can it set up?
    a: An Amazon EventBridge rule on root user activity recorded by CloudTrail, sending the alert through Amazon SNS.
    facts: [monitor-root]
  - id: iam-098
    q: Which AWS services can notify a security team when the AWS account root user signs in?
    a: A CloudWatch Events (EventBridge) rule that matches root user sign-in, with an Amazon SNS notification.
    facts: [cloudwatch-events-rule, monitor-root]
---
Every AWS account starts with a root user: the email address and password used to create it, with complete access to everything in the account. That power makes it the most valuable credential to protect, and AWS recommends keeping it locked away for the few tasks only it can do. [AWS account root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#id_root-user)

### How it works

1. Sign up: the root user exists, and MFA is enforced for it.
2. Create an administrative user for daily work, for example in IAM Identity Center. [Root user best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html#root-user-best-practices)
3. Lock the root user away: a strong password, MFA, no access keys, and safe recovery details.
4. Sign in as root only for root-only tasks.
5. In AWS Organizations, the management account can remove member accounts' root credentials altogether.

Tasks that require the root user: [Tasks that require root user credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-tasks.html#root-user-tasks)

| Area | Root-only task |
|---|---|
| Account | Change a standalone account's email, root password or root access keys; close or reopen a standalone account |
| IAM | Restore permissions when the only administrator removed their own |
| Billing | Activate IAM access to the Billing and Cost Management console |
| Amazon EC2 | Register as a seller in the Reserved Instance Marketplace |
| Amazon S3 | Enable MFA delete; edit a bucket policy that denies all principals |
| AWS GovCloud (US) | Sign up |

### Exam cues

- If the question says first steps after creating an account, think enable MFA on root and create an administrative user.
- If the question says close the account or change the root email, think root user.
- If the question says daily administration, think an administrative user, never root.

### Remember

- Root has complete access; it can't be limited by IAM policies in its own account.
- MFA is enforced for root users.
- Never create root access keys.

> **Trap:** Most account settings, such as the account name, contact details and Regions, don't need the root user. Only the listed tasks do.
