---
{
  "title": "Indexes and read consistency",
  "level": "associate",
  "order": 10,
  "facts": [
    {
      "id": "items",
      "text": "A table contains items made of named attributes; non-key attributes may differ between items.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html"
    },
    {
      "id": "keys",
      "text": "A simple primary key is a partition key; a composite primary key adds a sort key and its combined values uniquely identify an item.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html"
    },
    {
      "id": "size",
      "text": "The item maximum is 400 KB including attribute names and values.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html"
    },
    {
      "id": "query",
      "text": "Query requires partition-key equality and optionally a sort-key comparison, BETWEEN range, or begins_with prefix.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.KeyConditionExpressions.html"
    },
    {
      "id": "pages",
      "text": "Query reads at most 1 MB before filtering; a non-null LastEvaluatedKey means the client must paginate.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.KeyConditionExpressions.html"
    },
    {
      "id": "sort",
      "text": "Query sorts ascending by sort key by default; ScanIndexForward=false reverses order.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.KeyConditionExpressions.html"
    },
    {
      "id": "scan",
      "text": "Scan reads all items in a table or index; its post-read filter does not reduce read capacity consumption.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html"
    },
    {
      "id": "lsi",
      "text": "An LSI keeps the table partition key, changes the sort key, is created with the table, and supports eventual or strong reads.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html"
    },
    {
      "id": "gsi",
      "text": "A GSI can use different keys, can be added or removed later, and only supports eventual reads.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html"
    },
    {
      "id": "projection",
      "text": "KEYS_ONLY projects table/index keys, INCLUDE adds chosen attributes, and ALL projects all attributes.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html"
    },
    {
      "id": "fetch",
      "text": "An LSI query can fetch unprojected attributes from the table at extra latency and read capacity cost.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html"
    },
    {
      "id": "collection",
      "text": "An LSI item collection is limited to 10 GB for one partition key including base table and local index entries.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html"
    },
    {
      "id": "default",
      "text": "GetItem reads are eventually consistent by default; strong reads return the latest successfully updated value.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html"
    },
    {
      "id": "conditional",
      "text": "A conditional write succeeds only if the current item satisfies its condition, protecting against concurrent conflicting updates.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-001",
      "q": "How do DynamoDB LSI and GSI keys, creation, and consistency differ?",
      "a": "An LSI keeps the table partition key, changes the sort key, must exist at table creation, and supports strong reads. A GSI can change both keys, be added later, and only supports eventual reads.",
      "facts": [
        "lsi",
        "gsi"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-009",
      "q": "A new DynamoDB table needs an alternate sort key with strongly consistent reads. Which index fits?",
      "a": "An LSI, defined at table creation, with the same partition key.",
      "facts": [
        "lsi"
      ]
    },
    {
      "id": "dynamodb-011",
      "q": "An existing DynamoDB table needs strong reads through a new alternate sort key. Can the team add an LSI?",
      "a": "No. Create a replacement table with the LSI and migrate the data. An LSI cannot be added later.",
      "facts": [
        "lsi"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-012",
      "q": "A DynamoDB application knows an asset partition key and needs revisions within a date range. Which request fits?",
      "a": "Query with partition-key equality and BETWEEN on the date sort key. Use begins_with for a sort-key prefix.",
      "facts": [
        "query"
      ]
    },
    {
      "id": "dynamodb-013",
      "q": "A filtered DynamoDB Scan returns few items but consumes high read capacity. Why?",
      "a": "The filter runs after reading. Use a suitable table or index key for Query when the access pattern permits it.",
      "facts": [
        "scan",
        "query"
      ]
    },
    {
      "id": "dynamodb-014",
      "q": "A DynamoDB LSI query repeatedly fetches extra attributes from the table. How can the team reduce those reads?",
      "a": "Project required attributes with INCLUDE or ALL. This trades index storage for fewer base table fetches.",
      "facts": [
        "projection",
        "fetch"
      ]
    },
    {
      "id": "dynamodb-015",
      "q": "How do DynamoDB keys and size limits constrain flexible item attributes?",
      "a": "Non-key attributes can vary. A simple key identifies by partition key; a composite key identifies by partition and sort key. Each item is at most 400 KB, including names and values.",
      "facts": [
        "items",
        "keys",
        "size"
      ]
    },
    {
      "id": "dynamodb-016",
      "q": "Concurrent workers claim free resources in a DynamoDB allocation table. How should they prevent duplicate assignment?",
      "a": "Use a conditional write that updates an allocation only while it is free. DynamoDB checks the latest item version.",
      "facts": [
        "conditional"
      ]
    }
  ]
}
---
DynamoDB stores items, or records, in tables. Each item contains attributes, or named values. A primary key identifies an item; a secondary index supplies another key for queries. Non-key attributes can vary between items.

### How it works

1. Choose a partition key to group items. A simple primary key uses it alone; a composite primary key adds a sort key that orders items within a group. Each complete key must be unique.
2. Use `Query` with one partition-key value and an optional sort-key comparison, `BETWEEN` range, or `begins_with` prefix. Results are ascending unless `ScanIndexForward=false`.
3. Choose a local secondary index (LSI) for another sort key under the same partition key. Choose a global secondary index (GSI) when different keys and eventual reads fit.
4. Select a projection, the attributes copied into the index. An LSI can fetch missing attributes from the table, at extra read cost and latency.
5. For competing allocation claims, use a conditional write, a write that succeeds only if the current item meets a condition. Reading an allocation alone does not reserve it.

| Projection | Copied attributes |
| --- | --- |
| `KEYS_ONLY` | Table and index keys |
| `INCLUDE` | Keys and selected attributes |
| `ALL` | All item attributes |

### Exam cues

- If the question says alternate sort key and strong reads on a new table, think LSI, because it supports strong reads and must exist at table creation.
- If the question says add an alternate key later, think GSI, because it can be added to an existing table if eventual reads suffice.
- If the question says a known asset key and date range, think Query, because a key condition narrows reads while Scan reads all items.
- If the question says repeated LSI fetches, think project the required attributes, because an index-only result avoids those reads.

### Remember

- Item maximum: 400 KB including attribute names and values.
- LSI item collection maximum: 10 GB per partition key including table and local index entries.
- Query page maximum: 1 MB before filtering. Continue with `LastEvaluatedKey`.
- GetItem defaults to eventual consistency. LSIs support strong reads; GSIs do not.

> **Trap:** A filter does not make Scan cheaper. Reading happens before filtering.

> **Trap:** Adding an LSI to an existing table is unsupported. Create a replacement table and migrate data when that access pattern needs strong reads.
