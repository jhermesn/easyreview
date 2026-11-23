---
title: "Quick Sight basics"
level: foundational
order: 5
facts:
  - id: bi
    text: "AWS Quick Sight, the business intelligence feature of AWS Quick, connects data sources, builds interactive dashboards and embeds analytics in applications."
    source: https://docs.aws.amazon.com/quicksight/latest/user/welcome.html#what-is
  - id: timestream-source
    text: "AWS Quick Sight can connect to Amazon Timestream data for analysis and dashboards."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/Quicksight.html#Quicksight.create-connection
cards:
  - id: quicksight-011
    q: "Which AWS service helps an analytics team visualize data from connected sources?"
    a: "AWS Quick Sight (part of AWS Quick) provides business intelligence and visualization, including dashboards and embedded analytics."
    facts: [bi]
  - id: quicksight-012
    q: "Which AWS visualization service can build dashboards from Amazon Timestream data?"
    a: "AWS Quick Sight can connect to Timestream and analyze its data in dashboards."
    facts: [timestream-source]
---
AWS Quick Sight is AWS's business intelligence service for dashboards and visual analysis.

### How it works

1. Connect a data source.
2. Build visuals and dashboards.
3. Share them or embed them in applications.

### Exam cues

- If the question says visualize Amazon Timestream data, think Quick Sight, because it can connect to Timestream for dashboards.
- If the question says dashboards or business intelligence, think Quick Sight.

### Remember

- Dashboards and embedded analytics.

> **Trap:** Quick Sight visualizes data; it does not store the data warehouse itself.
