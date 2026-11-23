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
  - id: cad-what
    text: AWS Cost Anomaly Detection uses machine learning to detect and alert on unusual spend patterns, accounting for seasonality and natural growth to reduce false positives.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html#manage-ad
  - id: cad-alerts
    text: Cost Anomaly Detection sends alerts individually or in aggregated reports by email or to an Amazon SNS topic, which Amazon Q Developer in chat applications can forward to a Slack channel.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html#manage-ad
  - id: reservation-budget-alerts
    text: "AWS Budgets can alert when reservation utilization or coverage falls below its configured threshold."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/create-reservation-budget.html
  - id: forecast-history
    text: "AWS Budgets requires about five weeks of usage data to generate budget forecasts."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-best-practices.html
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
  - id: billing-and-cost-management-033
    q: A finance team wants an alert when daily spend jumps unexpectedly, without setting fixed thresholds for every service. Which AWS feature fits?
    a: "**AWS Cost Anomaly Detection**, which learns spend patterns with ML and alerts by email or SNS."
    trap: true
    facts: [cad-what, cad-alerts]
  - id: billing-and-cost-management-036
    q: Fixed spending limits with alerts versus unexpected spending patterns. Which AWS feature fits each?
    a: "- Fixed limits: **AWS Budgets**.\n- Unexpected patterns: **AWS Cost Anomaly Detection**."
    facts: [cad-what]
  - id: billing-and-cost-management-054
    q: "Which AWS Budgets option alerts when reservation coverage or utilization falls below a target?"
    a: "A reservation budget configured for coverage or utilization."
    facts: [reservation-budget-alerts]
  - id: billing-and-cost-management-057
    q: "Why might AWS Budgets be unable to forecast costs for a new account?"
    a: "Budget forecasts require about five weeks of usage data."
    facts: [forecast-history]

---
AWS Budgets tracks costs against a spending target and can alert on actual or forecasted spending.

### How it works

1. Create a cost budget with a spending target and period, such as a monthly budget.
2. Add a threshold for actual or forecasted spending.
3. Send the alert by email or to an Amazon SNS topic.

### Exam cues

- If the question says a new AWS Budgets forecast is unavailable, think insufficient usage history, because budget forecasts require about five weeks of usage data.
- If the question says alert when reservation utilization or coverage falls below a target, think a reservation budget, because its threshold tracks the selected measure.
- If the question says alert before spending passes a limit, think AWS Budgets with a forecast alert, because it can alert before the cost accrues.
- If the question says alert on spending already incurred, think an actual spend alert, because it tracks costs after they accrue.

### Remember

- Alerts on actual and forecasted spend.

> **Trap:** A forecast alert concerns expected spending, while an actual spend alert tracks costs after they accrue.
