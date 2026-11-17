---
title: "Organizations basics"
level: foundational
order: 5
facts:
  - id: central-management
    text: "AWS Organizations centrally manages many AWS accounts: create accounts, group them, apply governance policies and pay with a single payment method."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#orgs_introduction
  - id: consolidated-bill
    text: "Organizations gives one consolidated bill for all member accounts, and usage across accounts can be viewed in Cost Explorer."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#orgs_introduction
cards:
  - id: organizations-035
    q: "A company with 30 AWS accounts wants one bill and central policies for all of them. Which service fits?"
    a: "AWS Organizations, which gives consolidated billing and governance policies across accounts."
    facts: [central-management, consolidated-bill]
  - id: organizations-036
    q: "What billing feature does AWS Organizations provide?"
    a: "Consolidated billing: one bill and one payment method for all member accounts."
    facts: [consolidated-bill]
  - id: organizations-037
    q: "Does AWS Organizations merge many accounts into one account?"
    a: "No. Each account stays separate; Organizations groups and governs them and combines their bills."
    trap: true
    facts: [central-management]
---
AWS Organizations manages a group of AWS accounts as one organization, with shared billing and central policies. [What is AWS Organizations?](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#orgs_introduction)

### How it works

1. A management account creates the organization and creates or invites member accounts.
2. Accounts are grouped into organizational units.
3. Policies apply to groups of accounts, and all usage lands on one consolidated bill.

### Exam cues

- If the question says many accounts with one bill or central rules, think AWS Organizations.

### Remember

- One consolidated bill for all accounts.
- Accounts stay separate, grouped in organizational units.

> **Trap:** Organizations does not merge accounts. Each keeps its own resources and isolation; only billing and governance are central.
