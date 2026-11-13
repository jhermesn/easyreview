---
title: Aggregators and advanced queries
level: professional
order: 50
facts:
  - id: aggregator-sources
    text: A Config aggregator collects configuration and compliance data from multiple accounts and
      Regions, one account across Regions, or an organization whose accounts have Config enabled.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: aggregator-readonly
    text: Aggregators replicate data into a read-only view and cannot mutate source accounts, deploy
      rules, or push snapshots back to sources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: aggregation-authorization
    text: Individually specified source accounts grant the aggregator account and Region permission to
      collect data; authorization is not required for organization sources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: recording-separate
    text: Aggregation collects data already recorded in Config; creating an aggregator does not enable
      recording in source accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: query-state
    text: Advanced queries use a subset of SQL SELECT to query current configuration items in one
      account and Region or through an aggregator across accounts and Regions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html
  - id: query-functions
    text: Advanced queries support AVG, COUNT, MAX, MIN, and SUM aggregation functions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html
  - id: query-limits
    text: Advanced queries do not support FROM, JOIN, or UNION and cannot query deleted resources or
      ResourceNotRecorded configuration items.
    source: https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html
  - id: query-coverage
    text: Not every Config-supported resource type or configuration item field is searchable with
      advanced queries.
    source: https://docs.aws.amazon.com/config/latest/developerguide/querying-AWS-resources.html
  - id: query-scope
    text: In the query editor, selecting an aggregator as query scope runs the advanced query against
      that aggregator.
    source: https://docs.aws.amazon.com/config/latest/developerguide/query-using-sql-editor-console.html#query-using-sql-editor-console-considerations
  - id: query-account-region
    text: Including accountId and awsRegion in an aggregator query identifies the source account and
      Region in the results.
    source: https://docs.aws.amazon.com/config/latest/developerguide/query-using-sql-editor-console.html#query-using-sql-editor-console-considerations
  - id: query-export
    text: The Config console query editor can export results as CSV or JSON.
    source: https://docs.aws.amazon.com/config/latest/developerguide/query-using-sql-editor-console.html#query-using-sql-editor-console-considerations
  - id: ebs-query-properties
    text: Config's EBS volume query example selects resourceId, accountId, awsRegion, and
      configuration.encrypted for the AWS::EC2::Volume resource type.
    source: https://docs.aws.amazon.com/config/latest/developerguide/example-query.html#example-query
  - id: historical-timeline
    text: Resource configuration history is available through the console timeline and API.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-concepts.html#config-history
  - id: organization-deploy
    text: Organization conformance packs deploy rules and remediation actions across member accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: dashboard-delivery
    text: The Config Resource Compliance Dashboard uses Config files delivered to a central S3 bucket
      and requires Amazon QuickSight for its visualizations.
    source: https://docs.aws.amazon.com/guidance/latest/cloud-intelligence-dashboards/config-resource-prerequisites.html
  - id: sql-definition
    text: SQL is a language for storing, processing, and retrieving information in relational databases.
    source: https://aws.amazon.com/what-is/sql/
  - id: sql-filter-syntax
    text: Config advanced queries select properties with SELECT and can filter them with a WHERE
      condition.
    source: https://docs.aws.amazon.com/config/latest/developerguide/query-components.html
diagrams:
  - id: config-aggregation-flow
    title: Source data flows into a central read-only query scope
    width: 900
    height: 330
    nodes:
      - id: source-a
        label: Source account A
        sub: Config in source Region
        icon: config
        x: 20
        y: 25
        w: 200
        h: 86
        tone: mgmt
        info: Recording is enabled separately. Individual account sources authorize collection.
      - id: source-b
        label: Source account B
        sub: Config in source Region
        icon: config
        x: 20
        y: 215
        w: 200
        h: 86
        tone: mgmt
        info: Organization sources do not need per-account aggregation authorization.
      - id: aggregator
        label: Aggregator
        sub: central account
        icon: config
        x: 390
        y: 120
        w: 180
        h: 86
        tone: mgmt
        info: Replicates configuration and compliance data without mutating the sources.
      - id: query
        label: Advanced query
        sub: current recorded state
        icon: config
        x: 690
        y: 120
        w: 190
        h: 86
        tone: mgmt
        info: Choose the aggregator as query scope and select accountId and awsRegion to identify each
          result's source.
    edges:
      - from: source-a
        to: aggregator
        step: 1
        label: collect
      - from: source-b
        to: aggregator
        step: 2
        label: collect
      - from: aggregator
        to: query
        step: 3
        label: query scope
    steps:
      - The aggregator collects recorded data from a source account and Region it is permitted to
        read.
      - It collects data from other included sources; organization aggregation does not require
        per-account authorization.
      - Advanced query reads the collected current configuration data. There is no deployment or
        write path back to the sources.
cards:
  - id: config-015
    q: What does an AWS Config aggregator collect, and when is source-account authorization needed?
    a: It collects configuration and compliance data across accounts and Regions. Individual source
      accounts authorize the aggregator account and Region; organization sources do not need that
      authorization.
    facts:
      - aggregator-sources
      - aggregation-authorization
  - id: config-016
    q: Does creating an AWS Config aggregator enable source recorders or deploy compliance rules?
    a: No. Enable recording separately and use organization deployments for rules or packs. Aggregation
      is read-only.
    trap: true
    facts:
      - recording-separate
      - aggregator-readonly
      - organization-deploy
  - id: config-017
    q: A security team needs a list of recorded unencrypted EBS volumes across accounts and Regions.
      Which AWS Config feature fits?
    a: Run an advanced query with the aggregator as scope. Select source account and Region with the
      volume ID, and filter the recorded encryption property.
    facts:
      - query-state
      - query-scope
      - query-account-region
      - ebs-query-properties
  - id: config-044
    q: A team creates an AWS Config aggregator for individually listed source accounts but sees no data.
      What setup should it inspect?
    a: Check source recording and permission granted to the aggregator account and Region. Individual
      sources need aggregation authorization; organization sources do not.
    facts:
      - recording-separate
      - aggregation-authorization
  - id: config-045
    q: An auditor uses an AWS Config advanced query to find deleted resources or yesterday's
      configurations. Is this the right query path?
    a: No. Advanced queries target current recorded state and exclude deleted resources. Use
      configuration history through the resource timeline or API for historical configurations.
    trap: true
    facts:
      - query-state
      - query-limits
      - historical-timeline
  - id: config-046
    q: A team wants an Amazon QuickSight dashboard built from AWS Config compliance evidence. What data
      delivery does AWS's Config Resource Compliance Dashboard require?
    a: Enable Config in the accounts and Regions being tracked and deliver its files to a centralized S3
      bucket. The dashboard uses that data and QuickSight for visualization.
    facts:
      - dashboard-delivery
---
An AWS Config **aggregator** copies configuration and compliance data from source accounts and Regions into one read-only view. **Advanced query** searches current recorded properties using a subset of **SQL**, a language for selecting and summarizing data. The aggregator supplies the data scope; the query selects what to inspect.

### How it works

1. Enable Config recording in the source accounts and Regions. Choose the individual account sources or organization source for the aggregator.
2. For individual sources, grant **aggregation authorization**, permission for the aggregator account and Region to collect data. Organization sources do not require per-account authorization.
3. The aggregator copies configuration and compliance data into the central account. It provides no write access back to sources and cannot deploy rules or enable their recording.
4. In Advanced queries, select the aggregator as the query scope. Include `accountId`, `awsRegion`, and `resourceId` so each result identifies its source. For example, this query filters recorded EBS volume encryption properties:

```sql
SELECT accountId, awsRegion, resourceId, configuration.encrypted
WHERE resourceType = 'AWS::EC2::Volume'
AND configuration.encrypted = false
```

5. Summarize current data with functions such as `COUNT` or export console query results as comma-separated values (CSV) or structured JSON data. For historical configurations, use the resource timeline or API configuration history.
6. For a QuickSight dashboard based on delivered files, AWS's Config Resource Compliance Dashboard uses a central S3 bucket receiving Config data. This is a separate reporting path from selecting an aggregator in Advanced queries.

### Exam cues

- If the question says one view of compliance across accounts and Regions, think an aggregator, because it collects source configuration and compliance data.
- If the question says deploy checks to new organization accounts, think organization rules or conformance packs, because an aggregator cannot deploy rules.
- If the question says find current recorded properties across accounts without separate service API calls, think an advanced query with aggregator scope, because it searches collected configuration items.
- If the question says individual source accounts have no aggregated data, think recording and authorization, because collection requires recorded source data and permission to read it.
- If the question says investigate yesterday's resource settings, think configuration history, because advanced queries target current state.

### Remember

| Need | Config path |
|---|---|
| Current properties in one account and Region | Local advanced query |
| Current properties across accounts and Regions | Advanced query with aggregator scope |
| Historical resource configurations | Resource timeline or configuration history API |
| Config data visualized in the documented QuickSight dashboard | Config file delivery to central S3 and the dashboard deployment |

- SQL support is a subset: `FROM`, `JOIN`, and `UNION` are unsupported.
- Supported summary functions include `AVG`, `COUNT`, `MAX`, `MIN`, and `SUM`.
- Deleted resources and `ResourceNotRecorded` CIs are not queryable. Recording support alone does not guarantee that every type or field is searchable.
- An organization source does not need individual aggregation authorizations.

> **Trap:** Data can be absent because it was never recorded. An aggregator does not create missing configuration history.

> **Trap:** A central read-only compliance view cannot enforce or repair source configurations.
