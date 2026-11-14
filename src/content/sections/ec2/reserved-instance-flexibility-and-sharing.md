---
title: Reserved Instance flexibility and sharing
level: foundational
order: 3
facts:
  - id: scope
    text: A Reserved Instance's scope is regional or zonal, and the scope doesn't change its price.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html#reserved-instances-scope
  - id: regional
    text: A regional Reserved Instance doesn't reserve capacity, but its discount applies in any Availability Zone of the Region and, for Linux/Unix with default tenancy, to any size within the instance family.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html#reserved-instances-regional-zonal-differences
  - id: zonal
    text: A zonal Reserved Instance reserves capacity in a specific Availability Zone, and its discount applies only to that AZ, instance family and size.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html#reserved-instances-regional-zonal-differences
  - id: term
    text: Reserved Instances are bought for one or three years; the three-year term gives a bigger discount.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ri-pricing-variable-term-commitment
  - id: classes
    text: Standard Reserved Instances give the biggest discount and can only be modified; Convertible Reserved Instances give a lower discount and can be exchanged.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ri-pricing-variable-offering-class
  - id: sharing
    text: The management account of an organization controls Reserved Instance and Savings Plans discount sharing across its accounts, organization-wide, by account group or per account.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html#ri-turn-off
  - id: ri-marketplace
    text: The EC2 Reserved Instance Marketplace lets customers sell unused Standard Reserved Instances, for example after moving Regions or changing instance types.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html#ri-market-general
cards:
  - id: ec2-044
    q: What is the difference between a regional and a zonal EC2 Reserved Instance?
    a: "- Regional: no capacity reservation; discount applies in any AZ and, for Linux, any size in the family\n- Zonal: reserves capacity in one AZ; discount only for that AZ, family and size"
    facts: [regional, zonal]
  - id: ec2-045
    q: A company bought a regional Linux Reserved Instance for m5.xlarge and now runs two m5.large instances in the same Region. Does the discount still apply?
    a: Yes. Regional Linux/Unix Reserved Instances with default tenancy have instance size flexibility within the family.
    facts: [regional]
  - id: ec2-046
    q: Which EC2 Reserved Instance class can be exchanged for a different configuration?
    a: Convertible. Standard RIs give a bigger discount but can only be modified, not exchanged.
    facts: [classes]
  - id: ec2-047
    q: A company has Reserved Instances in one account of an AWS Organization. Can other accounts in the organization benefit from the discount?
    a: Yes. The management account controls RI and Savings Plans discount sharing across the organization's accounts.
    facts: [sharing]
  - id: ec2-048
    q: A company no longer needs a Standard Reserved Instance after moving Regions. What can it do with it?
    a: Sell it in the EC2 Reserved Instance Marketplace.
    facts: [ri-marketplace]
  - id: ec2-049
    q: Does a regional Reserved Instance guarantee EC2 capacity?
    a: No. Only a zonal Reserved Instance (or a Capacity Reservation) reserves capacity, in one AZ.
    trap: true
    facts: [regional, zonal]
---
Reserved Instances are discounts on EC2 usage that matches their attributes. Their scope decides how flexible the discount is and whether it reserves capacity. In AWS Organizations, the discount can be shared across accounts. [Regional and zonal Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html#reserved-instances-scope)

### How it works

1. Buy for one or three years; three years saves more.
2. Pick the class: Standard (biggest discount, modify only) or Convertible (exchangeable). [Offering class](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html#ri-pricing-variable-offering-class)
3. Pick the scope: regional for flexibility, zonal for a capacity reservation.
4. In an organization, the management account decides how discounts are shared among accounts. [Discount sharing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html#ri-turn-off)
5. Sell unused Standard RIs in the Reserved Instance Marketplace.

| Scope | Reserves capacity | AZ flexibility | Size flexibility |
|---|---|---|---|
| Regional | No | Any AZ in the Region | Within the family (Linux/Unix, default tenancy) |
| Zonal | Yes, in one AZ | No | No |

### Exam cues

- If the question says RI discount across instance sizes, think regional RI size flexibility.
- If the question says reserve capacity in an AZ, think zonal RI or Capacity Reservation.
- If the question says share RI discounts across accounts, think AWS Organizations consolidated billing.
- If the question says change instance family during the term, think Convertible RIs or Savings Plans.

### Remember

- Scope doesn't change the price.
- Standard: modify only; Convertible: exchange.

> **Trap:** Size flexibility applies only to regional RIs on Linux/Unix with default tenancy, not to Windows or zonal RIs.
