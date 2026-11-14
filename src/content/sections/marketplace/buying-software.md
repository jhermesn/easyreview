---
title: Buying and governing software
level: foundational
order: 10
facts:
  - id: catalog
    text: AWS Marketplace is a curated digital catalog for finding, buying, deploying and managing third-party software, data and services, with thousands of listings in categories such as security, networking, storage, machine learning and DevOps.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace
  - id: formats
    text: AWS Marketplace software comes as Amazon Machine Images (AMIs), software as a service (SaaS) and other formats, and can be launched pre-configured with a few clicks.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace
  - id: pricing
    text: AWS Marketplace pricing options include free trial, hourly, monthly, annual, multi-year and Bring Your Own License (BYOL); AWS handles billing and charges appear on the AWS bill.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace
  - id: sellers
    text: Sellers can be independent software vendors (ISVs), value-added resellers or individuals with something that works with AWS; every product goes through a curation process.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace
  - id: private-marketplace
    text: Private Marketplace lets administrators control what users can procure from AWS Marketplace with curated catalogs of approved products for accounts, OUs or the whole organization.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/private-marketplace-current.html#private-marketplace-current
  - id: licenses
    text: Subscribing to an AWS Marketplace product creates licenses automatically; licenses can be shared with accounts in the organization through AWS License Manager and their usage tracked.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/managing-licenses.html#managing-licenses
  - id: cost-tags
    text: AWS Marketplace AMI usage picks up EC2 instance tags, so activated cost allocation tags track it in AWS Cost Explorer, AWS Cost and Usage Reports and AWS Budgets.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/cost-allocation-tagging-ami-marketplace.html#cost-allocation-tagging-ami-marketplace
  - id: security-products
    text: AWS Marketplace includes third-party security products alongside other categories.
    source: https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace
cards:
  - id: marketplace-001
    q: A company wants to buy a third-party firewall appliance and pay for it on its AWS bill. Where does it find one?
    a: AWS Marketplace, a curated catalog of third-party software, including security products, billed through AWS.
    facts: [catalog, pricing, security-products]
  - id: marketplace-002
    q: Which pricing options can AWS Marketplace products offer?
    a: Free trial, hourly, monthly, annual, multi-year and BYOL. Charges appear on the AWS bill.
    facts: [pricing]
  - id: marketplace-003
    q: A company wants employees to buy only approved products from AWS Marketplace. Which feature does this?
    a: Private Marketplace, which offers curated catalogs of approved products per account, OU or organization.
    facts: [private-marketplace]
  - id: marketplace-004
    q: How can a company share one AWS Marketplace subscription with other accounts in its organization?
    a: Share the license through AWS License Manager. Marketplace creates licenses automatically on subscription.
    facts: [licenses]
  - id: marketplace-005
    q: Which key services does AWS Marketplace offer buyers beyond the catalog itself?
    a: "- Cost management: charges on the AWS bill and cost allocation tags\n- Governance: Private Marketplace catalogs of approved products\n- Entitlements: licenses created on subscription and shared through License Manager"
    facts: [pricing, cost-tags, private-marketplace, licenses]
  - id: marketplace-006
    q: Does AWS write and support every product sold in AWS Marketplace?
    a: No. Most products come from third-party sellers such as ISVs; AWS curates the listings and handles billing.
    trap: true
    facts: [sellers, pricing]
---
AWS Marketplace is a catalog of third-party software, data and services. Customers buy and deploy them without a separate contract, and the charges appear on their AWS bill. [What is AWS Marketplace?](https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html#what-is-marketplace)

### How it works

1. Find a product: AMIs, SaaS, containers and more, from independent software vendors and other sellers. AWS curates every listing.
2. Choose a pricing option: free trial, hourly, monthly, annual, multi-year or BYOL.
3. Deploy with a few clicks; AWS bills it with the rest of the account.
4. Govern buying with Private Marketplace catalogs, share licenses through AWS License Manager, and track costs with cost allocation tags. [Private Marketplace](https://docs.aws.amazon.com/marketplace/latest/buyerguide/private-marketplace-current.html#private-marketplace-current)

| Need | Marketplace feature |
|---|---|
| Buy third-party software on the AWS bill | Catalog and AWS billing |
| Allow only approved products | Private Marketplace |
| Share a subscription across accounts | Licenses through AWS License Manager |
| Track software costs | Cost allocation tags in Cost Explorer, CUR, Budgets |

### Exam cues

- If the question says third-party software or security tools billed through AWS, think AWS Marketplace.
- If the question says restrict which Marketplace products employees can buy, think Private Marketplace.
- If the question says ISV selling software to AWS customers, think AWS Marketplace.

### Remember

- Pricing: free trial, hourly, monthly, annual, multi-year, BYOL.
- Every listing is curated; sellers set price and terms.

> **Trap:** AWS Marketplace is not the Reserved Instance Marketplace. The Reserved Instance Marketplace resells unused EC2 Reserved Instances.
