---
{
  "title": "Capacity scaling and throttling",
  "level": "associate",
  "order": 60,
  "facts": [
    {
      "id": "on-demand",
      "text": "On-demand capacity bills per request and scales without provisioning read or write units.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html"
    },
    {
      "id": "quotas",
      "text": "On-demand requests can throttle at quotas or configured maximum throughput.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html"
    },
    {
      "id": "provisioned",
      "text": "Provisioned mode sets capacity units; Application Auto Scaling adjusts table and GSI capacity within minimum/maximum bounds toward target utilization.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html"
    },
    {
      "id": "target",
      "text": "Auto scaling target utilization can be from 20 to 90 percent.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html"
    },
    {
      "id": "delay",
      "text": "Scale-out triggers after two consecutive minutes above target; alarms and UpdateTable processing add delay during which excess requests can throttle.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html"
    },
    {
      "id": "flow",
      "text": "DynamoDB publishes consumed capacity to CloudWatch; an alarm invokes Application Auto Scaling, which issues UpdateTable.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html"
    },
    {
      "id": "reads",
      "text": "Item reads round up to 4 KB blocks; a strong read uses 1 unit per block, an eventual read 0.5, and a transactional read 2.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html"
    },
    {
      "id": "writes",
      "text": "Item writes round up to 1 KB blocks; standard writes use 1 unit per block and transactional writes use 2.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html"
    },
    {
      "id": "gsi",
      "text": "Insufficient GSI write capacity can throttle base table writes through back-pressure, identified by IndexWriteProvisionedThroughputExceeded.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/throttling-provisioned-capacity-exceeded-mitigation.html"
    },
    {
      "id": "metrics",
      "text": "WriteThrottleEvents counts throttled write events; ReadThrottleEvents distinguishes read throttles, and index metrics use TableName with GlobalSecondaryIndexName.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html"
    },
    {
      "id": "classes",
      "text": "Standard is the default table class; Standard-IA targets infrequently accessed tables where storage dominates costs.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.TableClasses.html"
    },
    {
      "id": "example",
      "text": "An 8 KB item read uses 2 strong, 1 eventual, or 4 transactional read units.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html"
    },
    {
      "id": "three-az",
      "text": "DynamoDB automatically replicates table data across three Availability Zones in a Region.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/disaster-recovery-resiliency.html"
    },
    {
      "id": "reserved-capacity",
      "text": "DynamoDB reserved capacity discounts provisioned read and write capacity for a one-year term (three years in some Regions); it is not available for on-demand mode.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/reserved-capacity.html"
    },
    {
      "id": "schemaless",
      "text": "Other than the primary key, a DynamoDB table is schemaless: items can have different attributes and data types.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html"
    },
    {
      "id": "partition-key-uniform",
      "text": "DynamoDB uses provisioned throughput best when the workload is spread across many distinct partition key values; a key with few values, such as a creation date, concentrates traffic on a few partitions.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html#bp-partition-key-uniform-load"
    },
    {
      "id": "on-demand-default",
      "text": "On-demand is the default and recommended throughput mode for most DynamoDB workloads.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/capacity-mode.html"
    },
    {
      "id": "mode-switch",
      "text": "A table can switch from provisioned to on-demand up to four times in a rolling 24-hour window; switching from on-demand to provisioned is allowed at any time.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/provisioned-capacity-mode.html"
    },
    {
      "id": "burst-capacity",
      "text": "DynamoDB retains up to five minutes (300 seconds) of unused read and write capacity that short bursts can consume.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/burst-adaptive-capacity.html"
    },
    {
      "id": "encryption-default",
      "text": "DynamoDB encrypts all table data at rest; the default AWS owned key has no extra charge, while AWS managed and customer managed keys incur KMS charges.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/EncryptionAtRest.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-007",
      "q": "How should a team choose and scale DynamoDB on-demand or provisioned capacity?",
      "a": "On-demand avoids provisioning units. Provisioned sets read/write capacity and can use Application Auto Scaling within minimum and maximum bounds. Scaling has delay, so spikes can still throttle.",
      "facts": [
        "on-demand",
        "provisioned",
        "delay"
      ]
    },
    {
      "id": "dynamodb-010",
      "q": "DynamoDB base table writes fail with IndexWriteProvisionedThroughputExceeded. What should the team inspect?",
      "a": "GSI write capacity and scaling limits. Index write back-pressure can throttle the base table.",
      "facts": [
        "gsi"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-032",
      "q": "How many read units does a DynamoDB 8 KB item read use for strong, eventual, and transactional reads?",
      "a": "2 strong, 1 eventual, or 4 transactional. Round size in 4 KB blocks, then apply the consistency multiplier.",
      "facts": [
        "reads",
        "example"
      ]
    },
    {
      "id": "dynamodb-033",
      "q": "How does DynamoDB calculate standard and transactional item write units?",
      "a": "Round item size up to 1 KB blocks. A standard write uses 1 unit per block; a transactional write uses 2.",
      "facts": [
        "writes"
      ]
    },
    {
      "id": "dynamodb-036",
      "q": "Does DynamoDB on-demand guarantee that requests can never throttle?",
      "a": "No. Quotas and any configured maximum throughput still apply.",
      "facts": [
        "quotas"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-046",
      "q": "A DynamoDB table throttles writes while most of its provisioned capacity sits unused. What partition key change helps?",
      "a": "Choose a high-cardinality partition key, one with many distinct values, so requests spread evenly across partitions.",
      "facts": [
        "partition-key-uniform"
      ]
    },
    {
      "id": "dynamodb-051",
      "q": "A provisioned DynamoDB table briefly exceeds its write capacity for a few seconds without throttling. Which feature explains it?",
      "a": "**Burst capacity**: DynamoDB keeps up to **300 seconds** of unused capacity for short bursts. It is not guaranteed, because background work can use it.",
      "facts": [
        "burst-capacity"
      ]
    },
    {
      "id": "dynamodb-052",
      "q": "A DynamoDB workload has unpredictable request traffic and the team does not want to provision capacity units. Which capacity mode fits?",
      "a": "Use on-demand capacity. It scales without provisioning read or write units and bills per request.",
      "facts": [
        "on-demand"
      ]
    }
  ],
  "diagrams": [
    {
      "id": "dynamodb-capacity-control",
      "title": "Provisioned capacity control loop",
      "width": 800,
      "height": 180,
      "nodes": [
        {
          "id": "table",
          "label": "DynamoDB table",
          "icon": "dynamodb",
          "x": 30,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "alarm",
          "label": "CloudWatch",
          "icon": "cloudwatch",
          "x": 295,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "scale",
          "label": "Auto Scaling",
          "icon": "application-auto-scaling",
          "x": 560,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        }
      ],
      "edges": [
        {
          "from": "table",
          "to": "alarm",
          "step": 1
        },
        {
          "from": "alarm",
          "to": "scale",
          "step": 2
        }
      ],
      "steps": [
        "DynamoDB publishes consumed capacity; CloudWatch evaluates the target alarm.",
        "The alarm invokes Application Auto Scaling, which issues UpdateTable to adjust capacity."
      ]
    }
  ]
}
---
DynamoDB capacity controls how much read and write work a table can accept. On-demand bills for requests and scales automatically. Provisioned capacity sets read and write units available each second.

### How it works

1. Choose on-demand to avoid provisioning capacity units. Quotas and any configured maximum throughput still apply.
2. With provisioned capacity, calculate read capacity units (RCUs) and write capacity units (WCUs) from item size and operation type. Round size before applying multipliers.
3. Configure Application Auto Scaling for the table and global secondary indexes (GSIs), which have separate capacity. Set minimum, maximum, and target utilization, the desired consumed share of provisioned capacity.
4. DynamoDB sends capacity measurements to CloudWatch. An alarm invokes Application Auto Scaling to issue `UpdateTable`. Capacity changes take time.
5. Diagnose throttling, rejected work beyond a throughput limit, with exception reasons and metrics. GSI back-pressure means an index cannot keep up and table writes throttle too.

| Item operation | Size rounding | Units per block |
| --- | --- | --- |
| Strong read | 4 KB | 1 |
| Eventual read | 4 KB | 0.5 |
| Transactional read | 4 KB | 2 |
| Standard write | 1 KB | 1 |
| Transactional write | 1 KB | 2 |

### Exam cues

- If the question says avoid provisioning units, think on-demand, because capacity scales with requests.
- If the question says table writes fail because of an index, think GSI write capacity, because index back-pressure can throttle base writes.
- If the question says distinguish write bottlenecks from reads, think WriteThrottleEvents, because it counts write throttles.

### Remember

- Auto scaling utilization target: 20 to 90 percent, within capacity bounds.
- Scale-out triggers after two consecutive minutes above target, followed by alarm and update delay.
- An 8 KB item read uses 2 strong, 1 eventual, or 4 transactional read units.
- Index metrics use TableName and GlobalSecondaryIndexName.

> **Trap:** Auto scaling does not react instantly to spikes. On-demand can also throttle at quotas or configured maximums.
