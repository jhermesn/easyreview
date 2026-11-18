---
title: "PLACEHOLDER billing-and-cost-management/more-essentials"
level: foundational
order: 90
facts:
  - id: actions
    text: A budget can trigger an action at a threshold, for example applying a custom IAM policy that denies provisioning more resources in an account.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: purpose
    text: AWS Budgets tracks and takes action on AWS costs and usage, and can monitor utilization and coverage of Reserved Instances and Savings Plans.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: notifications
    text: Budget notifications can go to email and Amazon SNS topics, for example when RI or Savings Plans utilization drops below 80 percent for a day.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: coverage-budgets
    text: "AWS Budgets can track Reserved Instance and Savings Plans coverage as well as utilization, and alert when coverage drops below a threshold."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html#budgets-create
  - id: budget-templates
    text: "AWS Budgets templates create a budget in one step: a zero spend budget notifies once spending exceeds the AWS Free Tier limits, and a monthly cost budget notifies on actual or forecasted spend above the amount."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html#budget-templates
cards:
  - id: billing-and-cost-management-002
    q: A team wants AWS to stop people from launching new resources in an account once it reaches its budget. What can do this?
    a: An AWS Budgets action that applies a custom IAM policy denying new provisioning at the threshold.
    facts: [actions]
  - id: billing-and-cost-management-003
    q: Which AWS service alerts when Reserved Instance or Savings Plans utilization falls below a target?
    a: AWS Budgets, with a utilization or coverage budget notifying by email or Amazon SNS.
    facts: [purpose, notifications]
  - id: billing-and-cost-management-038
    q: "A team must be told when too much EC2, Fargate and Lambda usage runs outside its Compute Savings Plans. What fits?"
    a: "An AWS Budgets Savings Plans coverage budget with a coverage threshold and notifications. A utilization budget tracks the opposite problem, unused commitment."
    facts: [coverage-budgets]
  - id: billing-and-cost-management-040
    q: "A new learner wants an email as soon as the account spends anything beyond the Free Tier. What is the quickest setup?"
    a: "The zero spend budget template in AWS Budgets."
    facts: [budget-templates]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
