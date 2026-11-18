---
title: "PLACEHOLDER dynamodb/design-details"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
