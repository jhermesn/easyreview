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
    text: "Other than the primary key, a DynamoDB table is schemaless: items can have different attributes and data types."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
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
    q: "A company stores product records whose attributes differ from item to item. Which AWS database fits without defining a fixed schema?"
    a: "Amazon DynamoDB. Only the primary key is fixed; each item can have different attributes."
    facts: [schemaless]
---
DynamoDB tables allow items with different attributes and provide settings for deletion protection and storage costs. DynamoDB also replicates table data across Availability Zones automatically.

### How it works

1. Define the primary key. Other attributes and their data types can differ between items in the same [table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html).
2. Choose a [table class](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.TableClasses.html). Standard is the default; Standard-IA targets infrequently accessed data where storage dominates costs.
3. Enable [deletion protection](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html#WorkingWithTables.Basics.DeletionProtection) to prevent table deletion until an authorized administrator turns it off.
4. DynamoDB [replicates data](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/disaster-recovery-resiliency.html) across three Availability Zones in the Region. For provisioned capacity, [reserved capacity](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/reserved-capacity.html) can discount read and write capacity for a commitment term.

### Exam cues

- If the question says items have different attributes, think DynamoDB, because only the primary key requires a fixed schema.
- If the question says infrequent access and storage dominates costs, think Standard-IA, because it targets that usage.
- If the question says prevent accidental table deletion, think deletion protection, because it blocks deletion until an authorized administrator disables it.
- If the question says steady provisioned traffic and a one-year commitment, think reserved capacity, because it discounts provisioned read and write capacity.

### Remember

- Standard is the default table class; deletion protection is off by default.
- Data is automatically replicated across three Availability Zones in a Region.
- Reserved capacity has a one-year term, or three years in some Regions, and is unavailable for on-demand capacity.

> **Trap:** A table does not need extra setup for replication across Availability Zones. Deletion protection, however, must be enabled.
