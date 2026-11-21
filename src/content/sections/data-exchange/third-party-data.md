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
    q: "An analytics team needs public datasets from other organizations. Which AWS service can help it find them?"
    a: "AWS Data Exchange provides access to public datasets from the Open Data on AWS program."
    facts: [open-data]
  - id: data-exchange-002
    q: "An ML team needs to manage access to data shared by other organizations. What can AWS Data Exchange help the team track?"
    a: "Data grants and AWS Marketplace data subscriptions in one place."
    facts: [what]
  - id: data-exchange-003
    q: "How can AWS Data Exchange help a data provider offer datasets to analytics teams?"
    a: "It helps providers share data without building their own delivery infrastructure. Eligible providers can also sell data products in AWS Marketplace."
    facts: [senders]
---
AWS Data Exchange is where organizations share, sell and subscribe to data sets, so ML and analytics teams can use outside data without building delivery pipelines.

### How it works

1. Data senders publish data sets and grant access, or list data products in AWS Marketplace.
2. Data receivers subscribe and manage all their data grants in one place.
3. Receivers use the data with AWS analytics and ML services.

### Exam cues

- If the question says obtain third-party data sets for training or analytics, think AWS Data Exchange.

### Remember

- Covers data grants, AWS Marketplace data subscriptions and Open Data on AWS.

> **Trap:** Data Exchange shares data between organizations; it isn't an ETL or data preparation tool (that's AWS Glue or DataBrew).
