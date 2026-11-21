---
title: Cost allocation tags
level: foundational
order: 50
facts:
  - id: tag
    text: A tag is a label with a key and a value that you or AWS assigns to a resource; each tag key on a resource is unique and has one value.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#cost-alloc-tags
  - id: types
    text: "There are two types of cost allocation tags: AWS-generated tags, created by AWS or an AWS Marketplace ISV, and user-defined tags, created by you."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#cost-alloc-tags
  - id: activate
    text: Both types of cost allocation tags must be activated separately before they appear in Cost Explorer or on a cost allocation report.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#cost-alloc-tags
  - id: report
    text: After activation, AWS uses cost allocation tags to organize resource costs on the cost allocation report so costs can be categorized and tracked.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#cost-alloc-tags
  - id: cur-tags
    text: Cost and Usage Reports can break down costs by tags that you define.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html#what-is-cur
  - id: tag-prefixes
    text: "AWS-generated cost allocation tags carry the reserved aws: prefix, such as aws:createdBy, while user-defined tags appear with the user: prefix in the cost allocation report."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/custom-tags.html#custom-tags
  - id: activation-delay
    text: "After user-defined tags are applied, their keys can take up to 24 hours to appear for activation as cost allocation tags, and up to another 24 hours to activate."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
  - id: backfill
    text: "The management account can request a backfill that applies the current activation status of cost allocation tags to up to twelve past months."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-allocation-backfill.html#cost-allocation-backfill
cards:
  - id: billing-and-cost-management-016
    q: A company wants to see AWS costs per department. What should it do?
    a: Tag resources with a key such as Department, activate it as a cost allocation tag, then group costs by it in Cost Explorer or the Cost and Usage Report.
    facts: [tag, activate, cur-tags]
  - id: billing-and-cost-management-017
    q: What are the two types of AWS cost allocation tags?
    a: AWS-generated tags, created by AWS or a Marketplace ISV, and user-defined tags, created by you.
    facts: [types]
  - id: billing-and-cost-management-018
    q: A team tagged all its resources with Project but the tag doesn't appear in Cost Explorer. Why?
    a: The tag wasn't activated as a cost allocation tag. Both types must be activated before they show in billing tools.
    trap: true
    facts: [activate]
  - id: billing-and-cost-management-044
    q: "After a company activates its cost allocation tags, how does AWS use them?"
    a: "It organizes resource costs by those tags on the cost allocation report, so the company can categorize and track its costs."
    facts: [report]
  - id: billing-and-cost-management-046
    q: "How do cost allocation tags help a company understand its AWS spending?"
    a: "They organize resource costs in a cost allocation report so the company can categorize and track them."
    facts: [report]
---
Cost allocation tags split the AWS bill by business dimension, such as team, project or environment. A tag is a key and value on a resource; activating it makes billing tools use it.

### How it works

1. Tag resources, for example `CostCenter = 1234`.
2. Activate the tag key as a cost allocation tag in the Billing and Cost Management console. AWS-generated tags need activating too.
3. Costs then group by the tag in Cost Explorer, the cost allocation report and the Cost and Usage Report.

| Type | Created by | Example |
|---|---|---|
| AWS-generated | AWS or an AWS Marketplace ISV | Who created the resource |
| User-defined | You | Department, Project, Environment |

### Exam cues

- If the question says track costs by department or project, think cost allocation tags.
- If the question says a tag is missing from billing reports, think the tag isn't activated.

### Remember

- Two types: AWS-generated and user-defined.
- Both need activation before they appear in billing tools.

> **Trap:** Tagging alone doesn't change the bill's breakdown. The tag must be activated as a cost allocation tag.
