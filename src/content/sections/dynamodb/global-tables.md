---
{
  "title": "Global tables",
  "level": "associate",
  "order": 50,
  "facts": [
    {
      "id": "global",
      "text": "Global tables provide managed replication across Regions and every replica can serve reads and writes.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    },
    {
      "id": "default",
      "text": "MREC is the default mode; consistency mode cannot change after creation or differ between replicas.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    },
    {
      "id": "mrec",
      "text": "MREC replicates asynchronously and resolves concurrent item updates by latest internal timestamp, called last writer wins.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "local",
      "text": "Strong reads on MREC can miss recent writes in another Region that have not replicated locally.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "mrsc",
      "text": "MRSC synchronously replicates a write to at least one other Region before success; strong reads at any replica return the latest item.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "create",
      "text": "Conversion to MRSC requires an empty table and additional replicas cannot be added later.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "accounts",
      "text": "Global tables support same-account and multi-account configurations; MRSC supports same-account configurations only.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    },
    {
      "id": "failover",
      "text": "Applications can shift traffic to another global table replica if application processing is interrupted in a Region.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    },
    {
      "id": "database-encryption-sdk",
      "text": "The AWS Database Encryption SDK encrypts chosen DynamoDB attributes on the client before they are sent, so the table holds only ciphertext for those fields.",
      "source": "https://docs.aws.amazon.com/database-encryption-sdk/latest/devguide/what-is-database-encryption-sdk.html#what-is-database-encryption-sdk"
    },
    {
      "id": "create-by-replica",
      "text": "In the current global tables version (2019.11.21), which AWS recommends over the legacy 2017.11.29 version, an MREC global table is created by adding a replica to an existing DynamoDB table.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "mrec-latency",
      "text": "MREC replicates item changes to the other replicas asynchronously, typically within a second or less; its RPO equals the replication delay, usually a few seconds depending on the Regions.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-005",
      "q": "How do DynamoDB global tables MREC and MRSC differ?",
      "a": "MREC is the default, using asynchronous replication and last-writer-wins conflicts. MRSC replicates synchronously before write success and supports strong reads across replicas. Mode is fixed and cannot be mixed.",
      "facts": [
        "default",
        "mrec",
        "mrsc"
      ]
    },
    {
      "id": "dynamodb-028",
      "q": "A DynamoDB application must keep serving reads and writes after a Region becomes impaired. What fits?",
      "a": "Global tables, with application traffic shifted to a healthy regional replica. Every replica can accept reads and writes.",
      "facts": [
        "global",
        "failover"
      ]
    },
    {
      "id": "dynamodb-029",
      "q": "A DynamoDB MREC replica uses strong reads immediately after a remote write. Must the read include that write?",
      "a": "No. A strong read does not remove MREC replication delay. MRSC provides strong reads across replicas.",
      "facts": [
        "local",
        "mrsc"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-048",
      "q": "A DynamoDB global table must provide the latest item on strong reads in each replica Region. Which consistency mode fits?",
      "a": "Use multi-Region strong consistency (MRSC). It replicates a write to at least one other Region before reporting success.",
      "facts": [
        "mrsc"
      ]
    },
    {
      "id": "dynamodb-063",
      "q": "A team wants an existing single-Region Amazon DynamoDB table to replicate to a second Region with the current global tables version. How does it create the global table?",
      "a": "Add a replica in the second Region to the existing table.\nCreating separate tables first and linking them belongs to the legacy 2017 version.",
      "trap": true,
      "facts": [
        "create-by-replica"
      ]
    },
    {
      "id": "dynamodb-064",
      "q": "How quickly does an Amazon DynamoDB MREC global table usually copy a write to the other Regions, and what does that mean for RPO?",
      "a": "Typically within a second or less.\nThe RPO equals that replication delay, usually a few seconds.",
      "facts": [
        "mrec-latency"
      ]
    }
  ],
  "diagrams": [
    {
      "id": "dynamodb-mrec-replication",
      "title": "MREC replication between Regions",
      "width": 800,
      "height": 180,
      "nodes": [
        {
          "id": "a",
          "label": "Replica Region A",
          "icon": "dynamodb",
          "x": 30,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "b",
          "label": "Replica Region B",
          "icon": "dynamodb",
          "x": 295,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        }
      ],
      "edges": [
        {
          "from": "a",
          "to": "b",
          "step": 1
        }
      ],
      "steps": [
        "A write accepted in Region A replicates asynchronously to Region B; both replicas accept application writes."
      ]
    }
  ]
}
---
DynamoDB global tables replicate data across Regions so applications can read and write through regional replicas. A replica is a regional table participating in that replication.

### How it works

1. Choose the consistency mode at creation; it is fixed across the global table.
2. Multi-Region eventual consistency (MREC) accepts a local write and copies it asynchronously. Simultaneous changes to an item resolve to the version with the latest internal timestamp.
3. Multi-Region strong consistency (MRSC) copies a write synchronously to another Region before success. Strong reads at any replica return the latest item.
4. If application processing is impaired in a Region, shift traffic to another replica that can serve reads and writes.

| Property | MREC | MRSC |
| --- | --- | --- |
| Replication | Asynchronous | Synchronous before success |
| Strong read | May miss remote writes in transit | Latest item across replicas |

### Exam cues

- If the question says regional writes with eventual convergence, think MREC, because replication is asynchronous.
- If the question says strong reads must include remote writes, think MRSC, because write success requires synchronous replication.

### Remember

- Default: MREC. The mode cannot change or differ between replicas.
- MRSC conversion needs an empty table; additional replicas cannot be added afterward.
- MRSC supports same-account configurations only. MREC also supports multi-account configurations.
- Current version (2019.11.21): create an MREC global table by adding a replica to an existing table.
- MREC replication: typically a second or less; RPO equals that delay, usually a few seconds.

> **Trap:** Strong reads on an MREC replica do not make cross-Region replication synchronous. A remote write can still be missing.
