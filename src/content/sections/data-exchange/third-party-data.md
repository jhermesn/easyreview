---
title: Third-party data
level: foundational
order: 10
facts:
  - id: what
    text: AWS Data Exchange lets AWS customers share and manage data entitlements from other organizations at scale; receivers track data grants and AWS Marketplace data subscriptions in one place.
    source: https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html#what-is
  - id: senders
    text: For data senders, AWS Data Exchange removes the need to build data delivery and entitlement infrastructure, and eligible senders can sell data products in AWS Marketplace.
    source: https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html#what-is
  - id: open-data
    text: Anyone, with or without an AWS account, can find and use public data sets from the Open Data on AWS program through AWS Data Exchange.
    source: https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html#what-is
cards:
  - id: data-exchange-001
    q: A data science team needs to subscribe to third-party weather data to enrich a forecasting model. Which AWS service fits?
    a: AWS Data Exchange, which provides data subscriptions from other organizations.
    facts: [what]
  - id: data-exchange-002
    q: A company wants to sell its anonymized market data to other AWS customers. Which service handles delivery and entitlements?
    a: AWS Data Exchange, with data products listed in AWS Marketplace.
    facts: [senders]
  - id: data-exchange-003
    q: Do you need to pay or have an AWS account to use Open Data on AWS data sets?
    a: "No account is required; anyone can find and use the public Open Data on AWS sets."
    trap: true
    facts: [open-data]
---
AWS Data Exchange is where organizations share, sell and subscribe to data sets, so ML and analytics teams can use outside data without building delivery pipelines. [What is AWS Data Exchange?](https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html)

### How it works

1. Data senders publish data sets and grant access, or list data products in AWS Marketplace.
2. Data receivers subscribe and manage all their data grants in one place.
3. Receivers use the data with AWS analytics and ML services.

### Exam cues

- If the question says obtain third-party data sets for training or analytics, think AWS Data Exchange.

### Remember

- Covers data grants, AWS Marketplace data subscriptions and Open Data on AWS.

> **Trap:** Data Exchange shares data between organizations; it isn't an ETL or data preparation tool (that's AWS Glue or DataBrew).
