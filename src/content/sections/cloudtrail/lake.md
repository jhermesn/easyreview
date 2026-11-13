---
title: Lake
level: associate
order: 80
facts:
  - id: lake-query
    text: CloudTrail Lake supports SQL queries over events and converts row-based JSON to columnar
      Apache ORC format.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake
  - id: lake-store
    text: A Lake event data store is an immutable collection of events selected through advanced event
      selectors.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake
  - id: lake-retention-extend
    text: The One-year extendable retention pricing option allows retention up to 3,653 days.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake
  - id: lake-retention-seven
    text: The Seven-year retention pricing option allows retention up to 2,557 days.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake
  - id: lake-organization
    text: An organization event data store can collect events from multiple accounts and Regions.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-eds
  - id: lake-scan-cost
    text: CloudTrail Lake queries are billed according to data scanned.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-queries
  - id: lake-copy
    text: Previously retained trail events can be copied into a new or existing event data store.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-eds
  - id: lake-key
    text: Lake event data stores are encrypted by default; an associated customer KMS key cannot later
      be removed or changed.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-eds
  - id: lake-closure
    text: CloudTrail Lake closed to new customers on May 31, 2026; existing customers retain access and
      Lake receives critical bug fixes and security updates.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html#cloudtrail-lake-service-availability-change
  - id: lake-existing-org
    text: Existing organization event data stores continue to support new member accounts and expansion
      to additional Regions.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html#cloudtrail-lake-service-availability-change
  - id: lake-existing-account
    text: Existing account-level event data stores support their existing accounts and additional
      Regions but do not extend ingestion to newly added organization accounts.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html#cloudtrail-lake-service-availability-change
  - id: lake-other-features
    text: The Lake availability change does not close CloudTrail trails or Insights.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html#cloudtrail-lake-service-availability-change
cards:
  - id: cloudtrail-020
    q: An existing CloudTrail Lake customer needs SQL analysis over retained activity from multiple
      organization accounts. Which feature fits?
    a: An organization event data store. Lake stores immutable selected events in ORC and supports SQL
      queries. Maximum retention is 3,653 or 2,557 days depending on pricing. Lake closed to new
      customers on May 31, 2026.
    facts:
      - lake-query
      - lake-store
      - lake-organization
      - lake-retention-extend
      - lake-retention-seven
      - lake-closure
  - id: cloudtrail-043
    q: An existing CloudTrail Lake customer has only account-level event data stores and adds
      organization accounts after the availability change. Will those stores ingest the new
      accounts' events automatically?
    a: No. Existing account-level stores do not extend ingestion to newly added accounts. An
      organization event data store provides that organization coverage.
    trap: true
    facts:
      - lake-existing-account
      - lake-existing-org
  - id: cloudtrail-044
    q: A team associates a customer KMS key with a CloudTrail Lake event data store and later wants to
      switch keys. Can it replace the association?
    a: No. The associated KMS key cannot be removed or changed.
    trap: true
    facts:
      - lake-key
  - id: cloudtrail-045
    q: How is a CloudTrail Lake SQL query billed?
    a: By the amount of data scanned.
    facts:
      - lake-scan-cost
---
CloudTrail Lake lets existing customers analyze retained audit events with SQL, a language for selecting and combining stored records. It stores selected events in an event data store, an immutable collection whose retained records cannot be changed. [AWS Lake model](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake)

### How it works

1. Choose the events using advanced selectors. An organization event data store can collect activity across accounts and Regions.
2. Lake converts JSON records into Apache ORC, a columnar format that organizes stored data by field for queries. Previously retained trail events can also be copied into a store.
3. Choose the retention pricing option, which determines how long events can remain available. Retention means how long stored events are kept.
4. Query the retained events with SQL. Charges depend on data scanned. Stores are encrypted by default; once a customer KMS key is associated, it cannot be removed or changed. [Stores](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-eds) · [Queries](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html#cloudtrail-lake-queries)

Since May 31, 2026, Lake has been closed to new customers. Existing customers retain access, with critical bug fixes and security updates. Existing organization stores support new member accounts; account-level stores do not extend ingestion to newly added organization accounts. CloudTrail trails and Insights remain available. [Availability change](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html#cloudtrail-lake-service-availability-change)

### Exam cues

- If the question says an existing Lake customer needs SQL over organization activity, think an organization event data store, because it collects across accounts and Regions.
- If the question says account-level stores must cover newly added accounts, think organization store coverage, because account-level stores do not extend to those accounts after the availability change.
- If the question says swap the KMS key associated with a store, think an immutable key association, because Lake does not allow removing or replacing that key.

### Remember

- One-year extendable retention pricing: maximum 3,653 days.
- Seven-year retention pricing: maximum 2,557 days.
- SQL query charges follow data scanned.
- New-customer closure: May 31, 2026. Older questions may describe Lake as available to new customers.

> **Trap:** The Lake availability change applies to Lake. It does not mean that CloudTrail trails or Insights have closed.
