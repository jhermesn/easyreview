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
  - id: rightsizing
    text: Cost Explorer rightsizing recommendations show underutilized EC2 instances across member accounts in one view and suggest downsizing or terminating them.
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-rightsizing.html
  - id: sp-recommendations
    text: AWS gives Savings Plans recommendations based on past usage, viewable from the management account or a member account and through the Cost Explorer API.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-recommendations.html
  - id: ce-api
    text: "The Cost Explorer API lets you query cost and usage data programmatically, from monthly totals down to granular usage, for custom reports and automation."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-api.html#ce-api
  - id: hourly-charge
    text: "Hourly granularity in Cost Explorer is optional and billed daily per hourly usage record kept for the past 14 days."
    source: https://docs.aws.amazon.com/cost-management/latest/userguide/ce-hourly-granularity.html#ce-hourly-granularity
cards:
  - id: billing-and-cost-management-005
    q: Which AWS tool helps a company view and analyze its costs and usage?
    a: AWS Cost Explorer provides graphs and reports for costs and usage.
    facts: [purpose]
  - id: billing-and-cost-management-006
    q: How can AWS Cost Explorer help a team plan its cloud budget?
    a: It shows past costs and forecasts future spending.
    facts: [history-forecast]
  - id: billing-and-cost-management-007
    q: How can AWS Cost Explorer help a company choose Reserved Instances?
    a: It recommends Reserved Instances to purchase.
    facts: [ri-recommendations]
  - id: billing-and-cost-management-008
    q: Does a company pay to use the AWS Cost Explorer user interface?
    a: "No. The user interface is free; API requests have a charge."
    facts: [free-ui]
  - id: billing-and-cost-management-009
    q: How can a team ask AWS Cost Explorer about the drivers of a spending trend?
    a: Use AWS assistant to ask cost questions in plain language.
    facts: [assistant]
  - id: billing-and-cost-management-029
    q: How can AWS Cost Explorer help identify underused Amazon EC2 capacity?
    a: "Its rightsizing recommendations show underutilized instances and suggest downsizing or terminating them."
    facts: [rightsizing]
  - id: billing-and-cost-management-030
    q: What information supports AWS Savings Plans recommendations in Cost Explorer?
    a: Past usage informs the recommendations.
    facts: [sp-recommendations]
  - id: billing-and-cost-management-045
    q: "What kind of information can a company analyze with AWS Cost Explorer?"
    a: "Costs and usage, including Reserved Instance reports."
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
- If the question says underutilized EC2 instances across accounts, think Cost Explorer rightsizing recommendations, because they show them in one view.

### Remember

- 13 months of history, 18 months of forecast.
- Console free; API 0.01 USD per paginated request.

> **Trap:** Cost Explorer can't be turned off after it's enabled; that's not a reason to avoid it, since the console is free.
