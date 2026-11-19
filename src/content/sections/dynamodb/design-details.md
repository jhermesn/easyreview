---
title: "Table settings and cost choices"
level: associate
order: 90
facts:
  - id: deletion-protection
    text: "DynamoDB deletion protection, off by default, stops a table from being deleted until an authorized administrator turns the property off."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html#WorkingWithTables.Basics.DeletionProtection
  - id: classes
    text: "Standard is the default table class; Standard-IA targets infrequently accessed tables where storage dominates costs."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.TableClasses.html
  - id: three-az
    text: "DynamoDB automatically replicates table data across three Availability Zones in a Region."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/disaster-recovery-resiliency.html
  - id: reserved-capacity
    text: "DynamoDB reserved capacity discounts provisioned read and write capacity for a one-year term (three years in some Regions); it is not available for on-demand mode."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/reserved-capacity.html
  - id: schemaless
    text: "Other than the primary key, a DynamoDB table is schemaless: items can have different attributes and data types, including nested attributes for document-shaped data."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.TablesItemsAttributes
  - id: billing-components
    text: "DynamoDB bills for table storage and enabled extra features in addition to read and write throughput."
    source: https://aws.amazon.com/dynamodb/pricing/
  - id: capacity-cost-choice
    text: "DynamoDB on-demand charges for requests consumed; provisioned capacity charges hourly for the capacity allocated, even when some goes unused."
    source: https://aws.amazon.com/dynamodb/pricing/
  - id: query-projection-cost
    text: "Returning fewer attributes from a DynamoDB Query does not lower its read capacity charge, which depends on the items read rather than the response size."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Other.html#Query.CapacityUnits
  - id: lsi-read-capacity
    text: "A DynamoDB Query against a local secondary index consumes the base table's read capacity; a global secondary index uses its own read capacity."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Other.html#Query.CapacityUnits
  - id: partiql
    text: "DynamoDB supports a subset of PartiQL for SQL-compatible reads, inserts, updates and deletes."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html#ql-reference.what-is
  - id: single-digit-latency
    text: "DynamoDB is a serverless, fully managed NoSQL database with single-digit millisecond performance at any scale."
    source: https://aws.amazon.com/dynamodb/
cards:
  - id: dynamodb-045
    q: "A DynamoDB table holding orders must never be dropped by mistake during routine administration. Which table setting fits?"
    a: "Enable **deletion protection** on the table (it is off by default)."
    facts: [deletion-protection]
  - id: dynamodb-035
    q: "A DynamoDB history table is rarely read and storage dominates cost. Which class fits?"
    a: "Standard-IA. Standard is the default, while Standard-IA targets storage-heavy infrequent access."
    facts: [classes]
  - id: dynamodb-042
    q: "Does a DynamoDB table need extra setup to keep its data in more than one Availability Zone?"
    a: "No. DynamoDB automatically replicates table data across three Availability Zones in the Region."
    trap: true
    facts: [three-az]
  - id: dynamodb-043
    q: "A company runs steady DynamoDB traffic in provisioned capacity mode and wants a lower price for a one-year commitment. What should it buy?"
    a: "DynamoDB reserved capacity. It discounts provisioned read and write capacity; it does not apply to on-demand mode."
    facts: [reserved-capacity]
  - id: dynamodb-044
    q: "Can an Amazon DynamoDB table store product records with different fields and nested document data?"
    a: "Yes. Only the primary key is fixed; each item can have different attributes, including nested document data."
    facts: [schemaless]
  - id: dynamodb-057
    q: "A team estimates Amazon DynamoDB costs using only read and write traffic. What else belongs in its budget?"
    a: "Table storage and any enabled extra features. Request or capacity charges cover only part of the bill."
    facts: [billing-components]
  - id: dynamodb-058
    q: "An Amazon DynamoDB workload has predictable traffic and the team can forecast throughput. Which capacity pricing option should it evaluate?"
    a: "Provisioned capacity. Compare the hourly allocation cost with on-demand request charges; unused provisioned capacity still costs money."
    facts: [capacity-cost-choice]
  - id: dynamodb-059
    q: "An Amazon DynamoDB Query returns only two attributes from each large item. Does the smaller response reduce its read capacity charge?"
    a: "No. Query charges for the items read, so requesting fewer attributes does not save read capacity."
    facts: [query-projection-cost]
  - id: dynamodb-060
    q: "A provisioned Amazon DynamoDB table uses a local secondary index for a second query pattern. Where must the team budget the index query read capacity?"
    a: "In the base table capacity. Local secondary index queries share it; global secondary index queries use the index capacity."
    facts: [lsi-read-capacity]
  - id: dynamodb-062
    q: "An application team wants SQL-compatible statements for reading and modifying Amazon DynamoDB items. Which interface can it use?"
    a: "PartiQL. DynamoDB supports a subset for reads, inserts, updates and deletes."
    facts: [partiql]
  - id: dynamodb-070
    q: "An application needs a serverless NoSQL database with consistent single-digit millisecond latency as traffic grows to millions of requests. Which AWS service fits?"
    a: "Amazon DynamoDB."
    facts: [single-digit-latency]
---
DynamoDB tables allow items with different attributes and provide settings for deletion protection and storage costs. DynamoDB also replicates table data across Availability Zones automatically.

### How it works

1. Define the primary key. Other attributes and their data types can differ between items, and nested attributes can represent document data in the same [table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html).
2. Choose a [table class](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.TableClasses.html). Standard is the default; Standard-IA targets infrequently accessed data where storage dominates costs.
3. Enable [deletion protection](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html#WorkingWithTables.Basics.DeletionProtection) to prevent table deletion until an authorized administrator turns it off.
4. DynamoDB [replicates data](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/disaster-recovery-resiliency.html) across three Availability Zones in the Region. For provisioned capacity, [reserved capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/reserved-capacity.html) can discount read and write capacity for a commitment term.
5. Compare on-demand charges for requests consumed with provisioned charges for capacity allocated each hour. Include table storage and enabled extra features in the budget.
6. Budget local secondary index (LSI) queries against the base table read capacity. Global secondary indexes (GSIs) use their own read capacity. Returning fewer attributes from a `Query` does not reduce its read capacity cost.
7. Use PartiQL when SQL-compatible statements fit the application. DynamoDB supports a subset for reading and modifying items.

### Exam cues

- If the question says items have different attributes, think DynamoDB, because only the primary key requires a fixed schema.
- If the question says infrequent access and storage dominates costs, think Standard-IA, because it targets that usage.
- If the question says prevent accidental table deletion, think deletion protection, because it blocks deletion until an authorized administrator disables it.
- If the question says steady provisioned traffic and a one-year commitment, think reserved capacity, because it discounts provisioned read and write capacity.
- If the question says a small Query response still costs the same, think item sizes, because selecting fewer attributes does not reduce read capacity.
- If the question says SQL-compatible statements against DynamoDB, think PartiQL, because it supports reads and data modifications.

### Remember

- Standard is the default table class; deletion protection is off by default.
- Data is automatically replicated across three Availability Zones in a Region.
- Reserved capacity has a one-year term, or three years in some Regions, and is unavailable for on-demand capacity.
- On-demand bills consumed requests; provisioned bills allocated capacity by the hour.
- LSI reads share table capacity; GSI reads use index capacity.
- Single-digit millisecond performance at any scale.

> **Trap:** A table does not need extra setup for replication across Availability Zones. Deletion protection, however, must be enabled.
