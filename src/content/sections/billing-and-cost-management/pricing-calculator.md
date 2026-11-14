---
title: AWS Pricing Calculator
level: foundational
order: 40
facts:
  - id: purpose
    text: AWS Pricing Calculator is a free web-based planning tool for creating cost estimates for AWS services before using them.
    source: https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html#what-is-pricing-calculator
  - id: uses
    text: Use cases include modeling solutions before building them, exploring service price points, reviewing the calculations behind estimates, planning AWS spend and finding cost saving opportunities.
    source: https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html#what-is-pricing-calculator
  - id: estimate
    text: An estimate includes upfront, monthly and annual costs for the chosen configuration and payment options.
    source: https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html#what-is-pricing-calculator
  - id: no-account
    text: No experience with cloud computing or AWS is needed to use AWS Pricing Calculator.
    source: https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html#what-is-pricing-calculator
cards:
  - id: billing-and-cost-management-013
    q: A company that has never used AWS wants to estimate the monthly cost of a planned architecture. Which AWS tool fits?
    a: AWS Pricing Calculator, a free tool for estimating costs before building.
    facts: [purpose, no-account]
  - id: billing-and-cost-management-014
    q: What does an AWS Pricing Calculator estimate include?
    a: Upfront, monthly and annual costs for the chosen services, configurations and payment options, with the calculations shown.
    facts: [estimate, uses]
  - id: billing-and-cost-management-015
    q: Can AWS Pricing Calculator show what a company actually spent last month?
    a: No. It estimates future costs; actual spending is in AWS Cost Explorer and the bill.
    trap: true
    facts: [purpose]
---
AWS Pricing Calculator estimates what AWS services will cost before you use them. It's free and needs no AWS experience. [What is AWS Pricing Calculator?](https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html#what-is-pricing-calculator)

### How it works

1. Add the services you plan to use and their configuration, such as instance type, storage and traffic.
2. Choose payment options, such as On-Demand or Savings Plans.
3. Read the estimate: upfront, monthly and annual costs, with the math shown.
4. Save or share the estimate to compare options.

### Exam cues

- If the question says estimate cost before migrating or building, think AWS Pricing Calculator.
- If the question says compare pricing of configurations, think AWS Pricing Calculator.

### Remember

- Free, web-based, for planning.
- Shows upfront, monthly and annual costs.

> **Trap:** Pricing Calculator estimates; Cost Explorer and Budgets work with real spending.
