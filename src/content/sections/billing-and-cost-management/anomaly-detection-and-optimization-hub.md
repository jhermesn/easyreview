---
title: Cost Anomaly Detection and Cost Optimization Hub
level: associate
order: 80
facts:
  - id: cad-what
    text: AWS Cost Anomaly Detection uses machine learning to detect and alert on unusual spend patterns, accounting for seasonality and natural growth to reduce false positives.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html#manage-ad
  - id: cad-alerts
    text: Cost Anomaly Detection sends alerts individually or in aggregated reports by email or to an Amazon SNS topic, which can forward them to Slack or Amazon Chime.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html#manage-ad
  - id: cad-root-cause
    text: Cost Anomaly Detection ranks an anomaly's root causes by dollar impact across AWS service, account, Region and usage type, and runs about three times a day.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html#manage-ad
  - id: hub-what
    text: Cost Optimization Hub consolidates and prioritizes cost optimization recommendations across accounts and Regions, covering rightsizing, idle resource deletion, Savings Plans and Reserved Instances.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html#cost-optimization-hub
  - id: hub-savings
    text: Cost Optimization Hub estimates savings using your own pricing and discounts and deduplicates overlapping recommendations.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html#cost-optimization-hub
cards:
  - id: billing-and-cost-management-033
    q: A finance team wants an alert when daily spend jumps unexpectedly, without setting fixed thresholds for every service. Which AWS feature fits?
    a: "**AWS Cost Anomaly Detection**, which learns spend patterns with ML and alerts by email or SNS."
    trap: true
    facts: [cad-what, cad-alerts]
  - id: billing-and-cost-management-034
    q: Which AWS feature gives one prioritized list of cost-saving actions (rightsizing, idle resources, Savings Plans, RIs) across all accounts and Regions?
    a: "Cost Optimization Hub."
    facts: [hub-what]
  - id: billing-and-cost-management-035
    q: After an anomaly alert, how does AWS Cost Anomaly Detection help find the cause?
    a: "It ranks root causes by dollar impact by service, account, Region and usage type."
    facts: [cad-root-cause]
  - id: billing-and-cost-management-036
    q: Fixed spending limits with alerts versus unexpected spending patterns. Which AWS feature fits each?
    a: "- Fixed limits: **AWS Budgets**.\n- Unexpected patterns: **AWS Cost Anomaly Detection**."
    facts: [cad-what]
---
Budgets alert on limits you set; Cost Anomaly Detection alerts on spending that doesn't look normal; Cost Optimization Hub tells you where to save. [AWS Cost Anomaly Detection](https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html)

### How it works

1. Create a cost monitor (for example per service or account) and an alert subscription.
2. ML models learn normal spend, including seasonality, and check net unblended cost about three times a day.
3. Alerts go by email or SNS, with root causes ranked by impact.
4. Separately, enable Cost Optimization Hub to see deduplicated savings recommendations for all accounts and Regions.

| Need | Feature |
|---|---|
| Alert when spend crosses a limit you set | AWS Budgets |
| Alert on unusual spend without thresholds | AWS Cost Anomaly Detection |
| Prioritized savings recommendations | Cost Optimization Hub |
| Instance and Lambda rightsizing detail | AWS Compute Optimizer |

### Exam cues

- If the question says detect unexpected or anomalous spend, think Cost Anomaly Detection.
- If the question says one view of savings opportunities across the organization, think Cost Optimization Hub.

### Remember

- Anomaly Detection: ML, email or SNS, about three runs a day, root causes by impact.
- Optimization Hub: rightsizing, idle, Savings Plans, RIs; uses your own pricing.

> **Trap:** AWS Budgets needs a threshold you choose. For "alert on anything unusual", Cost Anomaly Detection is the fit.
