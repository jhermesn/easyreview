---
title: AWS Cost Explorer
level: foundational
order: 20
facts:
  - id: purpose
    text: AWS Cost Explorer views and analyzes costs and usage with a main graph, cost and usage reports and Reserved Instance reports.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is
  - id: history-forecast
    text: Cost Explorer shows data for up to the last 13 months and forecasts spending for the next 18 months.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is
  - id: ri-recommendations
    text: Cost Explorer recommends which Reserved Instances to purchase.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is
  - id: free-ui
    text: The Cost Explorer user interface is free; each paginated Cost Explorer API request costs 0.01 USD, and Cost Explorer can't be disabled once enabled.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is
  - id: assistant
    text: Cost Explorer can answer cost questions asked in plain words through AWS assistant, explaining trends, top drivers and anomalies.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is
cards:
  - id: billing-and-cost-management-005
    q: A manager wants to see which AWS services drove last quarter's cost increase. Which tool fits?
    a: AWS Cost Explorer, which analyzes costs and usage over up to the last 13 months.
    facts: [purpose, history-forecast]
  - id: billing-and-cost-management-006
    q: How far back and how far forward does AWS Cost Explorer show costs?
    a: Up to 13 months back, and a forecast for the next 18 months.
    facts: [history-forecast]
  - id: billing-and-cost-management-007
    q: Which AWS tool recommends which Reserved Instances to buy based on past usage?
    a: AWS Cost Explorer.
    facts: [ri-recommendations]
  - id: billing-and-cost-management-008
    q: Is the AWS Cost Explorer console free to use?
    a: Yes. The console is free; only API requests cost 0.01 USD each.
    facts: [free-ui]
  - id: billing-and-cost-management-009
    q: Does AWS Cost Explorer send alerts when spending passes a threshold?
    a: No. Cost Explorer analyzes costs; threshold alerts come from AWS Budgets.
    trap: true
    facts: [purpose]
---
AWS Cost Explorer is the analysis tool for past and forecast costs. It charts spending by service, account, tag or other dimensions and helps find what drives cost. [AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html#ce-what-is)

### How it works

1. Open Cost Explorer in the Billing and Cost Management console; the interface is free.
2. Filter and group costs by service, account, Region, tag and more.
3. Look back up to 13 months, or forecast 18 months ahead.
4. Read Reserved Instance reports and purchase recommendations.

| Tool | Question it answers |
|---|---|
| AWS Cost Explorer | Where did the money go, and where is it heading? |
| AWS Budgets | Are we about to pass our limit? |
| AWS Cost and Usage Reports | What is every line item, in full detail? |

### Exam cues

- If the question says visualize, analyze or understand cost trends, think AWS Cost Explorer.
- If the question says Reserved Instance purchase recommendations, think Cost Explorer.

### Remember

- 13 months of history, 18 months of forecast.
- Console free; API 0.01 USD per paginated request.

> **Trap:** Cost Explorer can't be turned off after it's enabled; that's not a reason to avoid it, since the console is free.
