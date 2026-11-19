---
title: "RAM basics"
level: foundational
order: 5
facts:
  - id: share
    text: "AWS Resource Access Manager shares supported resources across AWS accounts, within an organization or with organizational units."
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is
  - id: ram-purpose
    text: AWS RAM shares supported resources across accounts, organizations, organizational units, and for some resource types IAM roles and users.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is
  - id: ram-ownership
    text: The owning account retains ownership of shared resources.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: stacksets-deploy
    text: "AWS CloudFormation StackSets creates, updates or deletes stacks across multiple AWS accounts and Regions from a common template in one operation."
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html
cards:
  - id: resource-access-manager-010
    q: "A company wants one account to share subnets with other accounts in its organization instead of copying them. Which service fits?"
    a: "AWS Resource Access Manager (RAM)."
    facts: [share]
  - id: resource-access-manager-011
    q: "A team is comparing AWS RAM and AWS CloudFormation StackSets for multiple accounts. Which shares an existing supported resource, and which deploys stacks in each account?"
    a: "AWS RAM shares access to an owned resource. AWS CloudFormation StackSets deploys stacks from a template across accounts and Regions."
    facts: [ram-purpose, ram-ownership, stacksets-deploy]
---
AWS Resource Access Manager (RAM) lets accounts share resources instead of creating copies in each account. [What is AWS Resource Access Manager?](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is)

### How it works

1. The owner account creates a resource share.
2. It names the resources and the accounts or organizational units to share with.
3. The other accounts use the resources directly.

### Exam cues

- If the question says share resources across accounts without duplicating them, think AWS RAM.

### Remember

- Shares supported resources across accounts and OUs.

> **Trap:** RAM shares existing resources; it does not copy them into other accounts.
