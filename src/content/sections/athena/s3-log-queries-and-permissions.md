---
title: S3 log queries and permissions
level: associate
order: 10
facts:
  - id: sql
    text: Athena SQL queries data directly in S3 without requiring users to manage query servers.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html
  - id: logs
    text: Athena supports querying CloudTrail, Application Load Balancer, CloudFront, and VPC flow log
      datasets.
    source: https://docs.aws.amazon.com/athena/latest/ug/querying-aws-service-logs.html
  - id: catalog
    text: Athena uses the Glue Data Catalog for S3 table metadata such as column and table names.
    source: https://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html
  - id: schema
    text: Athena table definitions can be created with CREATE TABLE or inferred from S3 data by a Glue
      crawler.
    source: https://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html
  - id: cloudtrail
    text: A CloudTrail external table defines log fields and an S3 LOCATION pointing at the log files.
    source: https://docs.aws.amazon.com/athena/latest/ug/create-cloudtrail-table.html
  - id: athena-access
    text: Running queries requires permissions for the Athena API actions.
    source: https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html
  - id: source-access
    text: Running queries over S3 requires access to the underlying S3 data locations.
    source: https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html
  - id: catalog-access
    text: Running queries with Glue catalog resources requires access to the relevant metadata and
      resources.
    source: https://docs.aws.amazon.com/athena/latest/ug/security-iam-athena.html
  - id: s3-output
    text: With a customer-owned results bucket, Athena stores result files in S3 and users need
      permissions to write and retrieve them.
    source: https://docs.aws.amazon.com/athena/latest/ug/querying.html
  - id: override
    text: Enabling Override client-side settings makes Athena workgroup result settings take precedence
      over client settings.
    source: https://docs.aws.amazon.com/athena/latest/ug/query-results-specify-location.html
  - id: managed
    text: Athena managed query results removes the need to provide a customer-owned S3 results bucket.
    source: https://docs.aws.amazon.com/athena/latest/ug/managed-results.html
  - id: managed-date
    text: Athena introduced managed query results in June 2025.
    source: https://docs.aws.amazon.com/athena/latest/ug/release-notes.html
  - id: managed-retention
    text: Athena managed query results remain available for 24 hours.
    source: https://docs.aws.amazon.com/athena/latest/ug/managed-results.html
  - id: managed-deletion
    text: Athena automatically deletes managed query results after their retention period.
    source: https://docs.aws.amazon.com/athena/latest/ug/managed-results.html
  - id: managed-access
    text: Managed result access requires GetQueryResults or GetQueryResultsStream permissions on the
      workgroup, according to the retrieval method.
    source: https://docs.aws.amazon.com/athena/latest/ug/managed-results.html
  - id: kms-source
    text: Reading a KMS-encrypted S3 dataset requires kms:Decrypt permission in addition to Athena and
      S3 access.
    source: https://docs.aws.amazon.com/athena/latest/ug/encryption.html#permissions-for-encrypting-and-decrypting-data
  - id: kms-output
    text: For KMS-encrypted S3 query results, Athena users need kms:GenerateDataKey and kms:Decrypt.
    source: https://docs.aws.amazon.com/athena/latest/ug/encryption.html#permissions-for-encrypting-and-decrypting-data
  - id: encryption-separate
    text: Athena reads encrypted table data using its data encryption settings, independently of the
      result encryption settings.
    source: https://docs.aws.amazon.com/athena/latest/ug/encryption.html
  - id: per-query
    text: An Athena per-query data scan limit cancels a query that exceeds it.
    source: https://docs.aws.amazon.com/athena/latest/ug/workgroups-setting-control-limits-cloudwatch.html
  - id: canceled-charge
    text: Athena canceled queries are charged according to its pricing.
    source: https://docs.aws.amazon.com/athena/latest/ug/workgroups-setting-control-limits-cloudwatch.html
  - id: aggregate
    text: Athena workgroup-wide data scan alerts use CloudWatch alarms and SNS; reaching the threshold
      does not automatically cancel queries.
    source: https://docs.aws.amazon.com/athena/latest/ug/workgroups-setting-control-limits-cloudwatch.html
  - id: s3-bypass
    text: A user with S3 GetObject access to customer-owned result files can read them directly even if
      Athena GetQueryResults is denied.
    source: https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryResults.html
  - id: federated
    text: Athena Federated Query uses connectors to query relational, non-relational, object, and custom
      sources outside S3 in place.
    source: https://docs.aws.amazon.com/athena/latest/ug/federated-queries.html
  - id: new-connectors
    text: Starting April 21, 2026, certain newly created Glue Data Catalog federated connectors are
      automatically registered and do not use a Lambda function in the customer account.
    source: https://docs.aws.amazon.com/athena/latest/ug/federated-queries.html
  - id: athena-connectors
    text: Athena data catalog federated connectors, including custom Query Federation SDK connectors,
      require a Lambda function in the customer account.
    source: https://docs.aws.amazon.com/athena/latest/ug/federated-queries.html
  - id: lake
    text: CloudTrail Lake event data store federation exposes metadata through Glue and manages access
      through Lake Formation so Athena can query the events.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/query-federation.html
  - id: lake-date
    text: CloudTrail Lake closed to new customers starting May 31, 2026; existing customers can continue
      using it.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/query-federation.html
  - id: on-demand
    text: Athena SQL on-demand pricing is based on data scanned; Athena also offers capacity-based
      pricing.
    source: https://aws.amazon.com/athena/pricing/
  - id: schema-fields
    text: A CloudTrail external table declares log field names and data types.
    source: https://docs.aws.amazon.com/athena/latest/ug/create-cloudtrail-table.html
diagrams:
  - id: athena-s3-query-results
    title: S3 log query with a customer-owned results bucket
    width: 1000
    height: 230
    nodes:
      - id: logs
        label: S3 log objects
        icon: simple-storage-service
        sub: source read permissions
        x: 30
        y: 75
        w: 270
        h: 86
        tone: storage
      - id: athena
        label: Athena SQL
        icon: athena
        sub: catalog table definition
        x: 360
        y: 75
        w: 270
        h: 86
        tone: database
      - id: results
        label: S3 query results
        icon: simple-storage-service
        sub: result write permissions
        x: 690
        y: 75
        w: 270
        h: 86
        tone: storage
    edges:
      - from: logs
        to: athena
        step: 1
      - from: athena
        to: results
        step: 2
    steps:
      - Athena reads log objects using the catalog table definition.
      - Athena writes output to the configured customer-owned S3 result location.
cards:
  - id: athena-001
    q: A team needs SQL analysis of CloudTrail trail logs stored in S3. How can it use Athena?
    a: Define an external table with the CloudTrail fields and the S3 log location, then run SQL
      queries. Existing CloudTrail Lake customers can also federate an event data store through Glue
      and Lake Formation.
    facts:
      - sql
      - cloudtrail
      - lake
      - lake-date
  - id: athena-002
    q: A team needs ad hoc SQL queries over ALB, CloudTrail, or VPC flow logs in S3 without managing
      servers. Which service fits?
    a: Athena SQL, with log table definitions in the Glue Data Catalog. SQL on-demand queries are billed
      by data scanned.
    facts:
      - sql
      - logs
      - catalog
      - on-demand
  - id: athena-004
    q: An Athena user can start queries but cannot read S3 logs or write S3 query results. Which
      permissions should the team review?
    a: Review source S3 access, result-bucket write and read permissions, Glue catalog access, and
      relevant KMS permissions. Athena API permission alone does not grant data access.
    facts:
      - athena-access
      - source-access
      - catalog-access
      - s3-output
      - kms-source
      - kms-output
  - id: athena-005
    q: A team needs Athena SQL to query supported data outside S3 without first copying all of it. What
      feature fits?
    a: "Athena Federated Query with a suitable data source connector. Check the connector type: some
      Glue catalog connectors created from April 21, 2026 do not use a Lambda in the customer
      account; Athena catalog connectors do."
    facts:
      - federated
      - new-connectors
      - athena-connectors
  - id: athena-006
    q: Does every Athena SQL workgroup require a customer-owned S3 results bucket?
    a: No. Athena managed query results handles result storage and deletes results after 24 hours.
      Access is controlled through workgroup query-result permissions.
    facts:
      - managed
      - managed-retention
      - managed-deletion
      - managed-access
    trap: true
  - id: athena-007
    q: An Athena administrator sets a workgroup-wide scan alert, but queries continue after its
      threshold. Which control cancels an oversized individual query?
    a: A per-query data scan limit. Workgroup-wide alerts notify and do not automatically cancel
      queries; canceled queries still incur charges.
    facts:
      - per-query
      - canceled-charge
      - aggregate
    trap: true
  - id: athena-008
    q: A team denies Athena GetQueryResults but users can still retrieve files from its S3 results
      bucket. Why?
    a: Their S3 GetObject access still allows direct file retrieval. Restrict the S3 result location as
      well as Athena API access.
    facts:
      - s3-bypass
    trap: true
  - id: athena-009
    q: An Athena workgroup must enforce its S3 output location despite different client settings. What
      should the administrator enable?
    a: Override client-side settings in the workgroup. Its configured result settings then take
      precedence.
    facts:
      - override
  - id: athena-010
    q: An Athena query reads data encrypted with one KMS key and writes results encrypted with another.
      Which keys must be authorized?
    a: Authorize decrypt access to the data key and the required GenerateDataKey and Decrypt access for
      the result key. Data and output encryption settings are separate.
    facts:
      - kms-source
      - kms-output
      - encryption-separate
---
Athena runs SQL, the language used to select and aggregate table data, directly over logs stored in S3. It is serverless: you do not manage the query servers. A table supplies the schema, meaning field names and types, while the log objects stay in S3.

### How it works

1. Store supported logs in S3. Athena documentation covers CloudTrail, Application Load Balancer, CloudFront, and VPC flow logs.
2. Define a table in the Glue Data Catalog, the metadata store for table definitions. Create it with SQL or use a Glue crawler, which infers the schema from data. For CloudTrail, point the external table LOCATION at the log files.
3. Authorize Athena API calls, the source data, and catalog resources. Identity and Access Management (IAM) policies govern these permissions. If keys from KMS, AWS's encryption-key service, protect the data, authorize the keys too.
4. Select result storage through a workgroup, the query configuration and access boundary. Use a customer-owned S3 result location or Athena managed results.
5. Run SQL and apply scan controls where needed. SQL on-demand pricing charges for data scanned; capacity-based pricing is also available.

| Access boundary | What to authorize |
|---|---|
| Athena | Query actions and workgroup access |
| Source S3 objects | Read access to the log data |
| Glue Data Catalog | Access to the database and table metadata |
| Customer-owned results bucket | Write and read access to result files |
| KMS-encrypted data and S3 results | Decrypt for data; GenerateDataKey and Decrypt for results |

Workgroup Override client-side settings enforces its result configuration. A per-query scan limit cancels an oversized query, which still incurs charges. A workgroup-wide scan alert uses CloudWatch and SNS without automatically canceling queries.

Managed query results became available in June 2025. This option needs no customer-owned results bucket and deletes results after 24 hours. Retrieve them through GetQueryResults or GetQueryResultsStream permissions on the workgroup, according to the access method.

Federated queries use connectors to read supported sources outside S3 in place. Since April 21, 2026, certain newly created Glue Data Catalog connectors use no Lambda function in your account. Athena data catalog connectors, including custom connectors, still require one. For existing CloudTrail Lake customers, event data store federation uses Glue metadata and Lake Formation access control. CloudTrail Lake closed to new customers on May 31, 2026.

### Exam cues

- If the question says occasional SQL over S3 service logs without servers, think Athena, because it queries those objects through table definitions.
- If the question says access denied despite Athena permissions, think source data, catalog, results, and KMS permissions, because query permission alone does not grant those other accesses.
- If the question says query supported databases outside S3 in place, think Federated Query, because its connectors access external sources.
- If the question says cancel a query that scans too much, think per-query limit, because aggregate workgroup alerts only notify.

### Remember

- KMS-encrypted source data requires kms:Decrypt.
- KMS-encrypted S3 results require kms:GenerateDataKey and kms:Decrypt.
- Managed results expire after 24 hours.
- Workgroup result settings override clients only when Override client-side settings is enabled.

> **Trap:** Denying GetQueryResults does not block direct access to customer-owned S3 result files. A user with S3 GetObject can still read those files.
