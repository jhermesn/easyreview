---
{
  "title": "Indexes and read consistency",
  "level": "associate",
  "order": 10,
  "facts": [
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
    },
    {
      "id": "lsi-limit",
      "text": "A DynamoDB table can have at most five local secondary indexes, and this quota cannot be increased.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html"
    },
    {
      "id": "sparse-index",
      "text": "DynamoDB writes an index entry only when the item has the index key attributes, so a sparse index holds just the items that carry them.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-indexes-general-sparse-indexes.html"
    },
    {
      "id": "consistent-read-param",
      "text": "GetItem, Query and Scan take an optional ConsistentRead parameter; setting it to true requests a strongly consistent read.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html"
    },
    {
      "id": "gsi-projected-only",
      "text": "A global secondary index query returns only attributes projected into the index; it cannot fetch other attributes from the base table.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html"
    },
    {
      "id": "gsi-key-schema",
      "text": "Every global secondary index has a partition key and an optional sort key, and its key schema can differ from the table's.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html"
    },
    {
      "id": "projection-cost",
      "text": "A global secondary index that projects fewer attributes costs less to store and less to write.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html#GSI.StorageConsiderations"
    },
    {
      "id": "lsi-lifecycle",
      "text": "Local secondary indexes are created with the table and are deleted when the table is deleted.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html"
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
      "id": "dynamodb-016",
      "q": "A DynamoDB application needs to query the same items using a different partition key. Which index fits?",
      "a": "Use a global secondary index. It can use different keys, but its reads are eventually consistent.",
      "facts": [
        "gsi"
      ]
    },
    {
      "id": "dynamodb-053",
      "q": "Only orders with an open status should be queryable cheaply in a large DynamoDB table. How can an index hold just those items?",
      "a": "A **sparse index**: set the index key attribute (such as OpenFlag) only on open orders. DynamoDB writes index entries only for items that have the index key attributes.",
      "facts": [
        "sparse-index"
      ]
    },
    {
      "id": "dynamodb-065",
      "q": "An Amazon DynamoDB query on a global secondary index needs an attribute that is not projected into the index. Can the query fetch it from the base table?",
      "a": "No. A GSI query returns only projected attributes.\nProject the attribute into the index, or read the item from the table.",
      "trap": true,
      "facts": [
        "gsi-projected-only"
      ]
    },
    {
      "id": "dynamodb-066",
      "q": "A team wants to remove an Amazon DynamoDB local secondary index but keep the table. Is that possible?",
      "a": "No. An LSI is created with the table and is deleted only with the table.\nA global secondary index can be added or removed later.",
      "trap": true,
      "facts": [
        "lsi-lifecycle"
      ]
    },
    {
      "id": "dynamodb-067",
      "q": "An Amazon DynamoDB global secondary index serves a query that needs only three attributes. Why project only those attributes?",
      "a": "A smaller index costs less to store and less to write.\nThe query still gets every attribute it needs from the index.",
      "facts": [
        "projection-cost",
        "gsi-projected-only"
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
4. For competing allocation claims, use a conditional write, a write that succeeds only if the current item meets a condition. Reading an allocation alone does not reserve it.

### Exam cues

- If the question says alternate sort key and strong reads on a new table, think LSI, because it supports strong reads and must exist at table creation.
- If the question says add an alternate key later, think GSI, because it can be added to an existing table if eventual reads suffice.
- If the question says a known asset key and date range, think Query, because a key condition narrows reads while Scan reads all items.
- If the question says only some items need an index entry, think sparse index, because DynamoDB indexes items that have the index key attributes.

### Remember

- Item maximum: 400 KB including attribute names and values.
- LSI item collection maximum: 10 GB per partition key including table and local index entries.
- Query page maximum: 1 MB before filtering. Continue with `LastEvaluatedKey`.
- GetItem defaults to eventual consistency. LSIs support strong reads; GSIs do not.
- A GSI query returns only projected attributes; it cannot fetch others from the table.
- GSI: partition key plus optional sort key, any schema. Fewer projected attributes cost less to store and write.
- LSIs are created and deleted with the table.

> **Trap:** A filter does not make Scan cheaper. Reading happens before filtering.

> **Trap:** Adding an LSI to an existing table is unsupported. Create a replacement table and migrate data when that access pattern needs strong reads.
