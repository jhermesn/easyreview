---
title: StackSet constraints
level: professional
order: 50
facts:
  - id: stackset
    text: A StackSet constraint launches a CloudFormation stack set, which deploys the product to multiple accounts and Regions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-stackset.html#constraints-stackset
  - id: targets
    text: The constraint configures target accounts, target Regions, and Region deployment order.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-stackset.html#constraints-stackset
  - id: admin-role
    text: The administrator selects an IAM StackSet Administrator Role; if omitted, StackSets uses its default ARN.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-stackset.html#constraints-stackset
  - id: execution-role
    text: StackSet constraint parameters include AccountList, RegionList, AdminRole, and ExecutionRole.
    source: https://docs.aws.amazon.com/servicecatalog/latest/APIReference/API_CreateConstraint.html#API_CreateConstraint_RequestParameters
  - id: exclusive
    text: A product-portfolio association cannot have both LAUNCH and STACKSET constraints or multiple STACKSET constraints.
    source: https://docs.aws.amazon.com/servicecatalog/latest/APIReference/API_CreateConstraint.html#API_CreateConstraint_RequestParameters
  - id: unsupported
    text: StackSet constraints do not support Terraform Open Source products, and AutoTags do not support CloudFormation StackSets.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-stackset.html#constraints-stackset
  - id: autotags-definition
    text: AutoTags are origin metadata tags automatically applied to provisioned resources by Service Catalog.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/autotags.html#autotags
  - id: stackset-definition
    text: A StackSet groups stacks deployed from a common template across specified accounts and Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html
  - id: sharing
    text: Portfolio sharing distributes catalog products across accounts without itself launching them.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
diagrams:
  - id: catalog-stackset-targets
    title: One catalog launch deploys to StackSet targets
    width: 880
    height: 340
    nodes:
      - id: catalog
        label: Service Catalog
        icon: service-catalog
        x: 20
        y: 125
        w: 190
        h: 72
        tone: mgmt
      - id: set
        label: StackSet
        sub: accounts + Regions
        icon: cloudformation
        x: 340
        y: 118
        w: 180
        h: 86
        tone: mgmt
      - id: a
        label: Target stack A
        sub: account / Region
        icon: res-cloudformation-stack
        x: 660
        y: 25
        w: 190
        h: 86
        tone: mgmt
      - id: b
        label: Target stack B
        sub: account / Region
        icon: res-cloudformation-stack
        x: 660
        y: 225
        w: 190
        h: 86
        tone: mgmt
    edges:
      - from: catalog
        to: set
        step: 1
        label: launch
      - from: set
        to: a
        step: 2
      - from: set
        to: b
        step: 2
    steps:
      - Service Catalog launches a CloudFormation stack set using its StackSet constraint.
      - StackSet deployment settings select target accounts, Regions, and Region order.
cards:
  - id: service-catalog-007
    q: How does AWS Service Catalog configure accounts, Regions, and deployment order for a product launched as a StackSet?
    a: Use a StackSet constraint on the product in its portfolio, with account and Region settings and the StackSet permissions configuration.
    facts:
      - stackset
      - targets
      - admin-role
      - execution-role
  - id: service-catalog-018
    q: A team needs an AWS Service Catalog CloudFormation product deployed to several named accounts and Regions through one catalog launch. What should the administrator configure?
    a: A StackSet constraint with the target accounts, Regions, Region order, and StackSet roles.
    facts:
      - stackset
      - targets
      - execution-role
  - id: service-catalog-032
    q: An AWS Service Catalog administrator tries to add a StackSet constraint where a launch constraint already exists. Why does the request fail?
    a: LAUNCH and STACKSET constraints cannot coexist on the same product-portfolio association.
    trap: true
    facts:
      - exclusive
  - id: service-catalog-033
    q: Which AWS Service Catalog product type does the StackSet constraint guide explicitly exclude?
    a: Terraform Open Source products. The guide also states that AutoTags are unsupported with CloudFormation StackSets.
    facts:
      - unsupported
---
A StackSet constraint lets an AWS Service Catalog product deploy across accounts and Regions through CloudFormation StackSets. A stack set manages related stacks, each deployed in a target account and Region.

### How it works

1. Add a StackSet constraint to a CloudFormation product in its portfolio.
2. Configure the target account list, Region list, and Region deployment order.
3. Configure the StackSet administrator and execution roles. The administrator role manages target accounts; the constraint parameters include AdminRole and ExecutionRole.
4. A product launch creates a CloudFormation stack set using those deployment settings.

### Exam cues

- If the question says one catalog launch must deploy into multiple accounts and Regions, think StackSet constraint, because it launches a stack set with configured targets.
- If the question says adding a StackSet constraint fails on a product that has a launch constraint, think incompatible constraint types, because LAUNCH and STACKSET cannot coexist on that association.

### Remember

- Settings include AccountList, RegionList, AdminRole, and ExecutionRole.
- Omitting an administrator role uses the default StackSet ARN.
- A product-portfolio association can have only one StackSet constraint.
- Terraform Open Source products do not support StackSet constraints.
- AutoTags, the origin metadata tags Service Catalog adds automatically, are not supported with CloudFormation StackSets.

> **Trap:** Sharing a portfolio makes products available in recipient accounts. A StackSet constraint deploys a product across target accounts and Regions. Choose based on whether the question asks for distribution or deployment.
