---
title: "Organizations basics"
level: foundational
order: 5
facts:
  - id: central-management
    text: "AWS Organizations centrally manages many AWS accounts: create accounts, group them, apply governance policies and pay with a single payment method."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#orgs_introduction
  - id: consolidated-bill
    text: "Organizations provides one consolidated bill per seller of record for member accounts, and usage across accounts can be viewed in Cost Explorer."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: organizations-accounts-management
    text: The management account manages the organization and pays its member-account charges.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: organizations-scp-ceiling
    text: An SCP limits the available permissions of principals in member accounts and never grants
      access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-scp-all-features
    text: SCPs require the organization all-features mode and the SCP policy type enabled.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: combined-volume
    text: "Eligible combined usage across member accounts can receive volume pricing discounts."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: billing-no-fee
    text: "Consolidated billing has no additional fee."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: s3-volume-pricing
    text: "Consolidated billing combines eligible Amazon S3 usage across accounts to determine volume pricing tiers."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-effective.html
cards:
  - id: organizations-035
    q: "A company with 30 AWS accounts under one seller of record wants one bill and central policies. Which service fits?"
    a: "AWS Organizations, which gives consolidated billing and governance policies across accounts."
    facts: [central-management, consolidated-bill]
  - id: organizations-036
    q: "What billing feature does AWS Organizations provide?"
    a: "Consolidated billing: one bill per seller of record for member accounts."
    facts: [consolidated-bill]
  - id: organizations-037
    q: "Does AWS Organizations merge many accounts into one account?"
    a: "No. Each account stays separate; Organizations groups and governs them and combines their bills."
    trap: true
    facts: [central-management]
  - id: organizations-016
    q: "A company wants to combine charges from multiple AWS accounts. How does AWS Organizations handle billing?"
    a: "The management account pays member account charges through consolidated billing."
    facts:
      - organizations-accounts-management
  - id: organizations-001
    q: What does an AWS Organizations service control policy grant?
    a: Nothing. An SCP sets the permission ceiling for member-account principals. IAM or resource
      policies must supply access within that ceiling, and SCPs require all-features mode.
    facts:
      - organizations-scp-ceiling
      - organizations-scp-all-features
  - id: organizations-038
    q: "How can AWS Organizations consolidated billing affect volume pricing for member accounts?"
    a: "Eligible usage can be combined across accounts to receive volume pricing discounts."
    facts: [combined-volume]

revised:
  - date: 2026-11-22
    note: Consolidated billing produces one bill per seller of record.
    cards: [organizations-036]
---
AWS Organizations manages a group of AWS accounts as one organization, with shared billing and central policies.

### How it works

1. A management account creates the organization and creates or invites member accounts.
2. Accounts are grouped into organizational units.
3. Policies apply to groups of accounts, and usage is consolidated into a bill for each seller of record.

### Exam cues

- If the question says S3 usage is spread across member accounts, think consolidated billing, because eligible usage can count toward volume pricing tiers.
- If the question says several accounts need volume pricing, think consolidated billing, because eligible usage can be combined.
- If the question says many accounts with one bill or central rules, think AWS Organizations.

### Remember

- Consolidated billing has no additional fee.
- One consolidated bill per seller of record.
- Accounts stay separate, grouped in organizational units.

> **Trap:** Organizations does not merge accounts. Each keeps its own resources and isolation; only billing and governance are central.
