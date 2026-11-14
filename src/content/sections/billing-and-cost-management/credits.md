---
title: AWS credits
level: foundational
order: 70
facts:
  - id: apply-until
    text: AWS credits apply to eligible charges on the bill until they are used up or they expire.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-credits.html
  - id: credit-order
    text: When an account has several credits, the one that expires soonest applies first, then the one with the fewest eligible services, then the oldest.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-credits.html#selecting-credits-to-apply
  - id: org-order
    text: With credit sharing turned on in AWS Organizations, credits cover the owning account's charges first, then go to the account with the highest spend, and within an account to the group with the highest charges.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-credits.html#selecting-usage-to-apply-credits-to
cards:
  - id: billing-and-cost-management-026
    q: An AWS account has two credits that both cover Amazon EC2. One expires next month, the other next year. Which credit does AWS apply first?
    a: The one that expires next month. AWS applies the soonest-to-expire credit first, then the one with the fewest eligible services, then the oldest.
    facts: [credit-order]
  - id: billing-and-cost-management-027
    q: In an AWS organization with credit sharing turned on, where do a member account's credits apply first?
    a: To the charges of the account that owns the credit. Remaining credit goes to the account with the highest spend.
    facts: [org-order]
---
AWS credits lower an AWS bill, for example credits from a promotion or a program. They apply automatically to eligible charges until they run out or expire. [Applying AWS credits](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-credits.html)

### How it works

1. AWS picks which credit to use: soonest to expire, then fewest eligible services, then oldest.
2. In an organization with credit sharing, the credit covers its own account first.
3. What is left goes to the account with the highest spend, and inside it to the group with the highest charges.

### Exam cues

- If the question says which credit applies first, think the soonest to expire, because AWS uses credits before they lapse.
- If the question says credits in an organization, think credit sharing, because it lets one account's credits cover others.

### Remember

- Order: soonest to expire, fewest eligible services, oldest.
- Shared credits cover the owning account first, then the highest spender.

> **Trap:** Credits are not applied to the largest bill first across the organization. The account that owns the credit is covered first.
