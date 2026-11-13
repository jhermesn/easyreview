---
{
  "title": "Time to Live",
  "level": "associate",
  "order": 30,
  "facts": [
    {
      "id": "ttl",
      "text": "TTL removes expired items automatically, usually within a few days rather than at an exact deadline.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    },
    {
      "id": "timestamp",
      "text": "TTL uses a configured attribute of Number type containing Unix epoch seconds; non-number attributes are ignored.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    },
    {
      "id": "visible",
      "text": "Expired items waiting for deletion remain readable and updatable; Query and Scan filters can exclude them.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    },
    {
      "id": "cost",
      "text": "The initial TTL delete uses no write capacity locally; replicated deletes on current MREC global tables consume replicated write units in replica Regions.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    },
    {
      "id": "deletion",
      "text": "TTL deletes remove index entries and appear in Streams as service deletions.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    },
    {
      "id": "filter",
      "text": "Scan filters do not reduce read capacity consumption because they run after reading.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html"
    },
    {
      "id": "mrsc",
      "text": "MRSC global tables do not support TTL.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-003",
      "q": "What does DynamoDB TTL guarantee about expired items and deletion timing?",
      "a": "Automatic cleanup, usually within a few days. It does not promise deletion at expiration; pending items remain readable, so exclude them from results when needed.",
      "facts": [
        "ttl",
        "visible"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-021",
      "q": "A DynamoDB application stores TTL values as millisecond strings and items remain. What representation is required?",
      "a": "A Number containing Unix epoch seconds in the configured TTL attribute. Non-number values are ignored.",
      "facts": [
        "timestamp"
      ]
    },
    {
      "id": "dynamodb-022",
      "q": "Are DynamoDB TTL expiration deletes free in every Region of an MREC global table?",
      "a": "No. The initial delete uses no write capacity in its Region, but replicated deletes consume replicated write units in replica Regions.",
      "facts": [
        "cost"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-023",
      "q": "An application must hide expired DynamoDB records immediately. Can it rely on TTL deletion?",
      "a": "No. Enforce expiration in application results, including Query or Scan filters. TTL is background cleanup; Scan filters do not save read capacity.",
      "facts": [
        "ttl",
        "visible",
        "filter"
      ]
    }
  ]
}
---
Time to Live (TTL) is background cleanup for DynamoDB items with expiration timestamps. The timestamp makes an item eligible for deletion; it does not schedule an exact deletion time.

### How it works

1. Enable TTL and choose the table attribute holding expiration.
2. Store that attribute as a Number of Unix epoch seconds, the seconds since the Unix time origin. Non-number TTL attributes are ignored.
3. After expiration, the item can remain readable and updatable until background deletion.
4. Hide expired items in application results when expiration must take effect immediately. Query and Scan filters can exclude them, but Scan filters do not reduce read cost.
5. Deletion removes index entries and appears in Streams as a service deletion. Current MREC global tables replicate that delete.

### Exam cues

- If the question says clean up stale records without application deletes, think TTL, because DynamoDB performs background deletion.
- If the question says hide records exactly when they expire, think application expiration checks, because TTL has no exact deletion deadline.
- If the question says expiration is ignored, think Number and epoch seconds, because strings and millisecond timestamps are not the required representation.

### Remember

- Cleanup usually occurs within a few days.
- Initial TTL deletion consumes no local write capacity; replicated deletions consume replicated write units.
- Expired items can still appear in reads until deleted.
- MRSC global tables do not support TTL.

> **Trap:** TTL is not an exact timer for locks or deadlines. The application must enforce expiration while deletion is pending.
