---
{
  "title": "Backups and point-in-time recovery",
  "level": "associate",
  "order": 40,
  "facts": [
    {
      "id": "pitr",
      "text": "PITR keeps per-second continuous recovery points for 1 to 35 days; the default is 35 days.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html"
    },
    {
      "id": "restore",
      "text": "PITR restores an earlier table state into a new table rather than rolling back the source in place.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Backup-and-Restore.html"
    },
    {
      "id": "latest",
      "text": "The PITR restore window ends about five minutes before the current time.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Backup-and-Restore.html"
    },
    {
      "id": "reset",
      "text": "Disabling and re-enabling PITR resets the start of the recovery window.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html"
    },
    {
      "id": "replica",
      "text": "PITR is enabled per global table replica, and a restore creates an independent table; cross-Region restores are supported.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html"
    },
    {
      "id": "writes",
      "text": "Global tables replicate application writes, including unwanted modifications, to other replicas.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    },
    {
      "id": "backup",
      "text": "On-demand backups are full table backups for long-term retention and do not affect table performance or availability.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/backuprestore_HowItWorks.html"
    },
    {
      "id": "retention",
      "text": "On-demand DynamoDB backups are retained until explicitly deleted.",
      "source": "https://docs.aws.amazon.com/solutions/latest/spatial-data-management-on-aws/resilience.html"
    },
    {
      "id": "export",
      "text": "S3 export requires PITR, selects a point within its window, and consumes no table read capacity.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html"
    },
    {
      "id": "formats",
      "text": "S3 export supports DynamoDB JSON and Amazon Ion formats.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html"
    },
    {
      "id": "import",
      "text": "S3 import creates a new table without consuming write capacity and does not support import into existing tables.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataImport.HowItWorks.html"
    },
    {
      "id": "import-options",
      "text": "S3 import accepts CSV, DynamoDB JSON, and Amazon Ion, and supports creating GSIs but not LSIs.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataImport.HowItWorks.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-004",
      "q": "A bad deployment overwrote DynamoDB items. How should a team recover if PITR was enabled?",
      "a": "Restore a point before the bad writes into a new table. PITR keeps 1 to 35 days, default 35, with per-second recovery points. Cross-Region restore is supported.",
      "facts": [
        "pitr",
        "restore",
        "replica"
      ]
    },
    {
      "id": "dynamodb-006",
      "q": "Does a DynamoDB global table protect from application writes that corrupt data?",
      "a": "No. Those writes replicate. Restore an earlier PITR point or backup into a new table. A restored replica is independent of the original global table.",
      "facts": [
        "writes",
        "restore",
        "replica"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-024",
      "q": "A team needs DynamoDB backup retention beyond the PITR window. Which option fits?",
      "a": "On-demand full table backups, retained until explicitly deleted.",
      "facts": [
        "backup",
        "retention"
      ]
    },
    {
      "id": "dynamodb-025",
      "q": "A team needs DynamoDB data in S3 for analysis without consuming table read capacity. What should it use?",
      "a": "Enable PITR and export a point within its recovery window to S3.",
      "facts": [
        "export"
      ]
    },
    {
      "id": "dynamodb-026",
      "q": "A team needs to import S3 data into DynamoDB without consuming write capacity. What constraints apply?",
      "a": "S3 import creates a new table and does not use write capacity. It cannot load an existing table; GSIs are supported at import but LSIs are not.",
      "facts": [
        "import",
        "import-options"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-027",
      "q": "Does re-enabling DynamoDB PITR bring back its old recovery window?",
      "a": "No. Disabling and re-enabling PITR resets the beginning of that window.",
      "facts": [
        "reset"
      ],
      "trap": true
    }
  ],
  "diagrams": [
    {
      "id": "dynamodb-pitr-restore",
      "title": "PITR restores another table",
      "width": 800,
      "height": 180,
      "nodes": [
        {
          "id": "source",
          "label": "Source table",
          "icon": "dynamodb",
          "x": 30,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "points",
          "label": "Recovery points",
          "icon": "backup",
          "x": 295,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "target",
          "label": "New table",
          "icon": "dynamodb",
          "x": 560,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        }
      ],
      "edges": [
        {
          "from": "source",
          "to": "points",
          "step": 1
        },
        {
          "from": "points",
          "to": "target",
          "step": 2
        }
      ],
      "steps": [
        "PITR continuously backs up data while enabled.",
        "Choose an earlier point and restore it into a new table."
      ]
    }
  ]
}
---
DynamoDB backups preserve earlier table data for recovery from unwanted writes or deletions. Point-in-time recovery (PITR) keeps continuous recovery points. On-demand backups preserve full table backups for longer retention.

### How it works

1. Enable PITR before an incident and choose the recovery period. Create on-demand backups for long-term retention.
2. After unwanted writes, choose a recovery point before the damage. Global table replication also copies those writes.
3. Restore into a new table, in the source Region or another Region. A restored global table replica is independent of the original global table.
4. For analysis in S3, export a point within the PITR window. To load data from S3, import into a new DynamoDB table.

| Option | Purpose | Capacity or retention |
| --- | --- | --- |
| PITR | Restore an earlier second | 1 to 35 days, default 35 |
| On-demand backup | Long-term full backup | Retained until deleted |
| Export to S3 | Send a PITR point to S3 | No table read capacity |
| Import from S3 | Load a new table | No table write capacity |

### Exam cues

- If the question says recover before an accidental overwrite, think PITR into a new table, because replication does not preserve the earlier state.
- If the question says retain a backup beyond 35 days, think on-demand backup, because PITR has a bounded window.
- If the question says analyze data without table read capacity, think PITR-backed S3 export, because export does not consume RCUs, the table's read capacity units.
- If the question says load S3 data without write capacity, think import into a new table, because existing-table import is unsupported.

### Remember

- PITR window: 1 to 35 days, default 35, with one-second recovery points.
- The latest restorable point is about five minutes behind the current time.
- Disabling and re-enabling PITR resets its recovery window.
- Export: DynamoDB JSON or Amazon Ion. Import also accepts CSV.
- S3 import supports GSIs, or global secondary indexes, but not LSIs, or local secondary indexes.

> **Trap:** Restore creates another table. It does not undo writes in place or automatically rejoin a restored replica to its global table.
