---
title: "RAM basics"
level: foundational
order: 5
facts:
  - id: share
    text: "AWS Resource Access Manager shares supported resources across AWS accounts, within an organization or with organizational units."
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is
cards:
  - id: resource-access-manager-010
    q: "A company wants one account to share subnets with other accounts in its organization instead of copying them. Which service fits?"
    a: "AWS Resource Access Manager (RAM)."
    facts: [share]
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
