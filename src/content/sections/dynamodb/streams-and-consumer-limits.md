---
{
  "title": "Streams and consumer limits",
  "level": "associate",
  "order": 20,
  "facts": [
    {
      "id": "stream",
      "text": "DynamoDB Streams records item modifications in near real time for 24 hours.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    {
      "id": "order",
      "text": "A stream contains each change once and orders changes per item; readers process parent shards before child shards.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    {
      "id": "views",
      "text": "StreamViewType accepts KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, and NEW_AND_OLD_IMAGES for keys, after image, before image, or both.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    {
      "id": "change",
      "text": "Changing StreamViewType requires disabling the current stream and creating another stream.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    },
    {
      "id": "readers",
      "text": "DynamoDB Streams supports up to two simultaneous readers per shard; exceeding this can throttle reads.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html"
    },
    {
      "id": "lambda",
      "text": "AWS recommends at most two simultaneous Lambda functions per shard for single-Region tables and one for global tables.",
      "source": "https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html"
    },
    {
      "id": "retry",
      "text": "Lambda event source mappings process events at least once and can repeat records; handlers should be idempotent.",
      "source": "https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html"
    },
    {
      "id": "kinesis",
      "text": "Kinesis Data Streams for DynamoDB is a separate change-capture option with retention up to one year and enhanced fan-out.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html"
    },
    {
      "id": "adapter",
      "text": "The DynamoDB Streams Kinesis Adapter lets Kinesis Client Library applications read DynamoDB Streams without changing the underlying service.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-002",
      "q": "How can an application react to DynamoDB item changes, and how long are records kept?",
      "a": "Enable DynamoDB Streams and connect Lambda. Retention is 24 hours. For replay up to one year, choose Kinesis Data Streams for DynamoDB. Make processing safe to repeat.",
      "facts": [
        "stream",
        "kinesis",
        "retry"
      ]
    },
    {
      "id": "dynamodb-017",
      "q": "A DynamoDB consumer must compare an item before and after each change. Which setting fits?",
      "a": "NEW_AND_OLD_IMAGES. KEYS_ONLY does not include item values.",
      "facts": [
        "views"
      ]
    },
    {
      "id": "dynamodb-018",
      "q": "Several DynamoDB Streams consumers throttle on one shard. Does the Kinesis Adapter remove that limit?",
      "a": "No. It still reads DynamoDB Streams. Reduce direct readers, distribute records downstream, or choose Kinesis Data Streams with enhanced fan-out.",
      "facts": [
        "readers",
        "adapter",
        "kinesis"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-019",
      "q": "Does one change record in DynamoDB Streams mean Lambda processes it exactly once?",
      "a": "No. Lambda can process a record again. Use an idempotent handler so repeating it does not repeat its business effect.",
      "facts": [
        "order",
        "retry"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-020",
      "q": "How many simultaneous Lambda readers should a team plan per DynamoDB Streams shard?",
      "a": "Up to two functions for a single-Region table; AWS recommends one for a global table to avoid throttling.",
      "facts": [
        "lambda"
      ]
    }
  ],
  "diagrams": [
    {
      "id": "dynamodb-stream-consumption",
      "title": "From table change to handler",
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
          "id": "stream",
          "label": "Item change log",
          "icon": "dynamodb",
          "x": 295,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "handler",
          "label": "Lambda handler",
          "icon": "lambda",
          "x": 560,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "compute"
        }
      ],
      "edges": [
        {
          "from": "table",
          "to": "stream",
          "step": 1
        },
        {
          "from": "stream",
          "to": "handler",
          "step": 2
        }
      ],
      "steps": [
        "Table changes create stream records with the selected images.",
        "An event source mapping reads records and invokes Lambda; processing can repeat."
      ]
    }
  ]
}
---
DynamoDB Streams is a log of item changes for reacting to inserts, updates, and deletes. A consumer reads the log. A shard is a group of stream records.

### How it works

1. Enable the stream and select the item values to capture. An image is a copy of an item before or after a change.
2. DynamoDB records each change once and preserves order for the same item. Readers process parent shards before child shards after a split.
3. A Lambda event source mapping, the connection that polls the stream and invokes a function, delivers records. Make the handler idempotent, meaning repeated processing has no additional business effect.
4. Keep direct readers within shard guidance. For longer replay or independent readers, consider Kinesis Data Streams for DynamoDB. Enhanced fan-out provides dedicated consumer read throughput.

| StreamViewType | Recorded values |
| --- | --- |
| `KEYS_ONLY` | Item keys |
| `NEW_IMAGE` | Item after the change |
| `OLD_IMAGE` | Item before the change |
| `NEW_AND_OLD_IMAGES` | Both images |

### Exam cues

- If the question says react to each table modification, think Streams and Lambda, because the log captures item changes.
- If the question says compare old and new values, think NEW_AND_OLD_IMAGES, because keys alone lack those values.
- If the question says longer replay or independent stream readers, think Kinesis Data Streams for DynamoDB, because its retention and fan-out differ.

### Remember

- Streams retention: 24 hours. Kinesis Data Streams for DynamoDB: up to one year.
- Up to two simultaneous consumers per shard; more can throttle.
- Lambda guidance: up to two functions per shard on single-Region tables, one on global tables.
- Changing StreamViewType requires disabling the old stream and creating a new one.

> **Trap:** One record per change in Streams does not guarantee one Lambda execution. Consumer processing can repeat.

> **Trap:** The Kinesis Adapter changes the client interface, not the underlying stream retention or reader limits.
