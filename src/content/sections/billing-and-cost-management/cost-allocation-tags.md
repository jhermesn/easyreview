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
---
Cost allocation tags split the AWS bill by business dimension, such as team, project or environment. A tag is a key and value on a resource; activating it makes billing tools use it. [Cost allocation tags](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#cost-alloc-tags)

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
