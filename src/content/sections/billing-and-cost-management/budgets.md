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
  - id: usage-budget
    text: A usage budget with forecasted notifications helps stay within a service's limits.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: custom-period
    text: Budgets can use a custom period aligned with a fiscal year, project duration or grant period.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
  - id: notifications
    text: AWS Budgets sends its alerts by email or to Amazon SNS topics.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs
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
  - id: billing-and-cost-management-048
    q: How can AWS Budgets tell a team that spending crossed a budget threshold?
    a: It sends an alert by email or to an Amazon SNS topic.
    facts: [notifications]
---
AWS Budgets tracks costs against a spending target and can alert on actual or forecasted spending. [Managing costs with AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html#budgets-managing-costs)

### How it works

1. Create a cost budget with a spending target and period, such as a monthly budget.
2. Add a threshold for actual or forecasted spending.
3. Send the alert by email or to an Amazon SNS topic.

### Exam cues

- If the question says alert before spending passes a limit, think AWS Budgets with a forecast alert, because it can alert before the cost accrues.
- If the question says alert on spending already incurred, think an actual spend alert, because it tracks costs after they accrue.

### Remember

- Alerts on actual and forecasted spend.

> **Trap:** A forecast alert concerns expected spending, while an actual spend alert tracks costs after they accrue.
