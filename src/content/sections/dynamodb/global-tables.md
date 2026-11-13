---
{
  "title": "Global tables",
  "level": "professional",
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
      "id": "mrec-streams",
      "text": "MREC replication reads changes from DynamoDB Streams, which are enabled by default on every replica and cannot be disabled there.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html#global-tables-streams"
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
      "id": "topology",
      "text": "MRSC needs exactly three Regions, using three replicas or two replicas and a witness that cannot serve application reads or writes.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "create",
      "text": "Conversion to MRSC requires an empty table and additional replicas cannot be added later.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "limits",
      "text": "MRSC does not support TTL, LSIs, or DynamoDB transaction operations.",
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
      "id": "dynamodb-030",
      "q": "A DynamoDB MRSC design needs only two full replicas. What else is required?",
      "a": "A witness in a third Region. MRSC needs exactly three Regions; the witness cannot serve application reads or writes.",
      "facts": [
        "topology"
      ]
    },
    {
      "id": "dynamodb-031",
      "q": "Can a DynamoDB MRSC table use TTL, local secondary indexes, and transactions?",
      "a": "No. MRSC does not support those features.",
      "facts": [
        "limits"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-041",
      "q": "A team wants to disable DynamoDB Streams on an MREC global table replica. Is that supported?",
      "a": "No. MREC replication reads changes from DynamoDB Streams, which are enabled by default and cannot be disabled on its replicas.",
      "facts": [
        "mrec-streams"
      ],
      "trap": true
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
2. Multi-Region eventual consistency (MREC) accepts a local write and copies it asynchronously. It reads changes from DynamoDB Streams, a log of item changes enabled by default on each replica. Simultaneous changes to an item resolve to the version with the latest internal timestamp.
3. Multi-Region strong consistency (MRSC) copies a write synchronously to another Region before success. Strong reads at any replica return the latest item.
4. Plan MRSC's arrangement: three replicas, or two replicas with a witness in a third Region. A witness supports availability but cannot serve application requests.
5. If application processing is impaired in a Region, shift traffic to another replica that can serve reads and writes.

| Property | MREC | MRSC |
| --- | --- | --- |
| Replication | Asynchronous | Synchronous before success |
| Strong read | May miss remote writes in transit | Latest item across replicas |
| Region arrangement | Regional replicas | Exactly three Regions |
| TTL, LSIs, transactions | Supported | Unsupported |

### Exam cues

- If the question says regional writes with eventual convergence, think MREC, because replication is asynchronous.
- If the question says strong reads must include remote writes, think MRSC, because write success requires synchronous replication.
- If the question says two full MRSC replicas, think a third-Region witness, because MRSC needs three Regions.

### Remember

- Default: MREC. The mode cannot change or differ between replicas.
- MREC replicas have DynamoDB Streams enabled by default; they cannot be disabled on those replicas.
- MRSC conversion needs an empty table; additional replicas cannot be added afterward.
- MRSC supports same-account configurations only. MREC also supports multi-account configurations.
- MRSC does not support TTL, local secondary indexes (LSIs), or transaction operations.

> **Trap:** Strong reads on an MREC replica do not make cross-Region replication synchronous. A remote write can still be missing.
