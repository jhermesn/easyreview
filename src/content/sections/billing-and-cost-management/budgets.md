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
  - id: coverage-budgets
    text: "AWS Budgets can track Reserved Instance and Savings Plans coverage as well as utilization, and alert when coverage drops below a threshold."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html#budgets-create
  - id: budget-templates
    text: "AWS Budgets templates create a budget in one step: a zero spend budget notifies once spending exceeds the AWS Free Tier limits, and a monthly cost budget notifies on actual or forecasted spend above the amount."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html#budget-templates
cards:
  - id: billing-and-cost-management-001
    q: A company wants an email before its monthly AWS spend goes over 1,000 USD. Which AWS service does this?
    a: AWS Budgets, with an alert on forecasted spend, which fires before the cost accrues.
    facts: [purpose, actual-forecast]
  - id: billing-and-cost-management-004
    q: Does AWS Budgets only report costs after they happen?
    a: No. It can alert on forecasted spend before it accrues, as well as on actual spend.
    trap: true
    facts: [actual-forecast]
---
AWS Budgets tracks costs against a spending target and can alert on actual or forecasted spending. [Managing costs with AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs)

### How it works

1. Create a cost budget with a spending target and period, such as a monthly budget.
2. Add a threshold for actual or forecasted spending.
3. Set notifications by email or Amazon SNS.

### Exam cues

- If the question says alert before spending passes a limit, think AWS Budgets with a forecast alert, because it can alert before the cost accrues.
- If the question says alert on spending already incurred, think an actual spend alert, because it tracks costs after they accrue.

### Remember

- Alerts on actual and forecasted spend.
- Notifications through email and Amazon SNS.

> **Trap:** AWS Budgets doesn't stop spending by itself. A cost budget alerts when actual or forecasted spending crosses its threshold.
