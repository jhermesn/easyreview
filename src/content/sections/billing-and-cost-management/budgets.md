---
title: AWS Budgets
level: foundational
order: 10
facts:
  - id: purpose
    text: AWS Budgets tracks and takes action on AWS costs and usage, and can monitor utilization and coverage of Reserved Instances and Savings Plans.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: actual-forecast
    text: A cost budget can alert on actual spend (after it accrues) and on forecasted spend (before it accrues).
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: actions
    text: A budget can trigger an action at a threshold, for example applying a custom IAM policy that denies provisioning more resources in an account.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: usage-budget
    text: A usage budget with forecasted notifications helps stay within a service's limits.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: notifications
    text: Budget notifications can go to email and Amazon SNS topics, for example when RI or Savings Plans utilization drops below 80 percent for a day.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: custom-period
    text: Budgets can use a custom period aligned with a fiscal year, project duration or grant period.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
cards:
  - id: billing-and-cost-management-001
    q: A company wants an email before its monthly AWS spend goes over 1,000 USD. Which AWS service does this?
    a: AWS Budgets, with an alert on forecasted spend, which fires before the cost accrues.
    facts: [purpose, actual-forecast]
  - id: billing-and-cost-management-002
    q: A team wants AWS to stop people from launching new resources in an account once it reaches its budget. What can do this?
    a: An AWS Budgets action that applies a custom IAM policy denying new provisioning at the threshold.
    facts: [actions]
  - id: billing-and-cost-management-003
    q: Which AWS service alerts when Reserved Instance or Savings Plans utilization falls below a target?
    a: AWS Budgets, with a utilization or coverage budget notifying by email or Amazon SNS.
    facts: [purpose, notifications]
  - id: billing-and-cost-management-004
    q: Does AWS Budgets only report costs after they happen?
    a: No. It can alert on forecasted spend before it accrues, as well as on actual spend.
    trap: true
    facts: [actual-forecast]
---
AWS Budgets sets a spending or usage target and alerts, or acts, when the target is at risk. It looks forward, while Cost Explorer looks back. [Managing costs with AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs)

### How it works

1. Create a budget: cost, usage, or Reserved Instance and Savings Plans utilization or coverage.
2. Choose the period: monthly, daily, or a custom one such as a fiscal year.
3. Add thresholds on actual or forecasted values, with notifications by email or Amazon SNS.
4. Optionally attach an action, such as applying an IAM policy that blocks new resources.

### Exam cues

- If the question says alert before spending passes a limit, think AWS Budgets with a forecast alert.
- If the question says automatically restrict provisioning at a budget threshold, think a Budgets action.
- If the question says track Reserved Instance or Savings Plans utilization, think AWS Budgets.

### Remember

- Alerts on actual and forecasted spend.
- Notifications through email and Amazon SNS.

> **Trap:** AWS Budgets doesn't cap spending by itself. It alerts, and acts only if you configure an action.
