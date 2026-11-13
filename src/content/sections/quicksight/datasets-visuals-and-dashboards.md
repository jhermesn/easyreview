---
title: Datasets, visuals, and dashboards
level: associate
order: 10
facts:
  - id: sight-purpose
    text: AWS Quick Sight provides interactive data visualization and business intelligence, including dashboards and embedded analytics.
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#what-is
  - id: sight-name
    text: Amazon QuickSight continues as AWS Quick Sight, a feature of AWS Quick.
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#what-is
  - id: sight-compatibility
    text: Existing QuickSight APIs, SDKs, and integrations continue to work.
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#what-is
  - id: sight-history
    text: AWS announced Amazon Quick Suite including Quick Sight in October 2025.
    source: https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/
  - id: sight-sources
    text: Supported Quick Sight data sources include Amazon Athena, Amazon Redshift, Amazon OpenSearch Service, and Amazon S3.
    source: https://docs.aws.amazon.com/quick/latest/userguide/supported-data-sources.html#relational-data-sources
  - id: sight-analysis
    text: Quick Sight uses datasets in analyses that can contain charts and graphs.
    source: https://docs.aws.amazon.com/quick/latest/userguide/working-with-data.html#working-with-data
  - id: sight-visual
    text: A visual is a graphical representation of data; an author can select fields and a visual type in an analysis.
    source: https://docs.aws.amazon.com/quick/latest/userguide/creating-a-visual.html#creating-a-visual
  - id: sight-athena-permissions
    text: Quick Sight requires authorization to connect to Athena and the associated S3 buckets, including the query results bucket.
    source: https://docs.aws.amazon.com/quick/latest/userguide/athena.html#athena
  - id: sight-redshift
    text: Amazon Redshift is a managed cloud data warehouse for SQL and business intelligence tools.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: sight-emr
    text: Amazon EMR is a managed platform for running big data frameworks such as Spark to process and analyze data.
    source: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr
  - id: sight-manifest
    text: A Quick Sight S3 dataset uses a manifest identifying the files to import; the manifest can be local or in S3.
    source: https://docs.aws.amazon.com/quick/latest/userguide/create-a-data-set-s3-procedure.html#create-a-data-set-s3-procedure
  - id: sight-athena-files
    text: Athena can query S3 text files as a table without listing each file individually in a manifest.
    source: https://docs.aws.amazon.com/quick/latest/userguide/create-a-data-set-s3-procedure.html#data-sets-based-on-multiple-s3-files
  - id: sight-spice
    text: SPICE is the Quick Sight in-memory engine for imported data.
    source: https://docs.aws.amazon.com/quick/latest/userguide/spice.html#spice
  - id: sight-query-choice
    text: A Quick Sight dataset can use imported SPICE data or a direct query unless it contains uploaded files.
    source: https://docs.aws.amazon.com/quick/latest/userguide/spice.html#spice
  - id: sight-refresh
    text: A data source that charges per query can charge when a SPICE dataset is created and refreshed.
    source: https://docs.aws.amazon.com/quick/latest/userguide/spice.html#spice
  - id: sight-refresh-manual
    text: A SPICE dataset based on S3 or a database can be refreshed manually.
    source: https://docs.aws.amazon.com/quick/latest/userguide/refreshing-imported-data.html#refresh-spice-data
  - id: sight-refresh-schedule
    text: A SPICE dataset can be refreshed on a schedule.
    source: https://docs.aws.amazon.com/quick/latest/userguide/refreshing-imported-data.html#schedule-data-refresh
  - id: sight-publish
    text: Publishing an analysis creates a dashboard.
    source: https://docs.aws.amazon.com/quick/latest/userguide/creating-a-dashboard.html#creating-a-dashboard
  - id: sight-sheets
    text: All sheets are selected by default for publication, but the author can choose which sheets to publish.
    source: https://docs.aws.amazon.com/quick/latest/userguide/creating-a-dashboard.html#creating-a-dashboard
  - id: sight-sharing
    text: By default a Quick Sight dashboard is accessible only to its owner; after publishing, it can be shared with users or groups.
    source: https://docs.aws.amazon.com/quick/latest/userguide/sharing-a-dashboard.html#sharing-a-dashboard
  - id: sight-data-access
    text: Users with dashboard access can see the data used in its associated analysis.
    source: https://docs.aws.amazon.com/quick/latest/userguide/sharing-a-dashboard.html#sharing-a-dashboard
cards:
  - id: quicksight-001
    q: Analysts need a shared Quick Sight visual of archived S3 logs without listing each file in a manifest. What workflow can they use?
    a: Query the S3 files as an Athena table, connect a Quick Sight dataset to Athena, publish the analysis as a dashboard, and share it.
    facts: [sight-athena-files, sight-sources, sight-analysis, sight-publish, sight-sharing]
  - id: quicksight-002
    q: What is AWS Quick Sight used for?
    a: Interactive business intelligence visualizations, dashboards, and embedded analytics.
    facts: [sight-purpose]
  - id: quicksight-003
    q: A team needs business intelligence dashboards from multiple data sources. Which AWS feature fits?
    a: AWS Quick Sight, formerly Amazon QuickSight. It connects to sources such as Athena, Redshift, and S3.
    facts: [sight-purpose, sight-name, sight-sources]
  - id: quicksight-004
    q: How does a direct S3 dataset identify files to import into Quick Sight?
    a: Use a manifest file stored locally or in S3.
    facts: [sight-manifest]
  - id: quicksight-005
    q: A Quick Sight author publishes a dashboard but colleagues cannot see it. What should the author check?
    a: Share it with the intended users or groups. By default only the owner can access it.
    facts: [sight-sharing]
    trap: true
  - id: quicksight-006
    q: How do SPICE and direct queries differ in Quick Sight?
    a: SPICE stores imported data in an in-memory engine; a direct query uses the data source rather than importing into SPICE.
    facts: [sight-spice, sight-query-choice]
  - id: quicksight-007
    q: Does publishing a Quick Sight dashboard automatically hide the analysis data from dashboard users?
    a: No. Users with dashboard access can see data used by the associated analysis.
    facts: [sight-data-access]
    trap: true
  - id: quicksight-008
    q: A Quick Sight dataset cannot query Athena because access is denied. Which foundational access should an administrator verify?
    a: Verify authorization to Athena and the associated S3 buckets, including the Athena query results bucket.
    facts: [sight-athena-permissions]
  - id: quicksight-009
    q: An S3-backed Quick Sight dashboard uses SPICE and needs data added since the last import. What should the author do?
    a: Refresh the SPICE dataset, either manually or on a schedule.
    facts: [sight-spice, sight-refresh-manual, sight-refresh-schedule]
---
AWS Quick Sight, formerly Amazon QuickSight, creates interactive business intelligence visualizations and dashboards from data sources. Think of a dataset as the data used by an analysis, and a dashboard as the published view.

### How it works

1. Connect Quick Sight to a source such as Athena, Redshift, OpenSearch Service, or S3. For Athena, authorize access to Athena and the associated S3 buckets, including the results bucket. For an S3 dataset, provide a manifest, a file identifying the files to import.
2. Create a dataset. SPICE is Quick Sight's in-memory engine for imported data; a direct query accesses the source rather than importing into SPICE. Uploaded files use SPICE rather than a direct query.
3. Build an analysis. Add a visual, a graphical representation of data, by choosing fields and a visual type.
4. Publish the analysis sheets as a dashboard. Share the published dashboard with the intended users or groups.

| Need | Service |
| --- | --- |
| Interactive business dashboards | Quick Sight |
| SQL data warehouse | Amazon Redshift |
| Process data with Spark | Amazon EMR |

### Exam cues

- If the question says analysts need a business dashboard, think Quick Sight, because it provides interactive visualizations and dashboards.
- If the question says S3 text files must be queried without listing each file in a manifest, think Athena as the Quick Sight source, because Athena can query the files as a table.
- If the question says a published dashboard is not visible to colleagues, think dashboard sharing, because only its owner has access by default.

### Remember

- Publishing selects all analysis sheets by default; the author can select a subset.
- AWS announced Quick Suite including Quick Sight in October 2025. AWS now calls the service AWS Quick and its visualization feature AWS Quick Sight.
- A query-charging source can charge when a SPICE dataset is created and refreshed.
- Refresh an S3 or database SPICE dataset manually or on a schedule to update imported data.
- Dashboard users can see data used in the associated analysis.

> **Trap:** Publishing a dashboard does not automatically share it with colleagues. Grant access after publication.
