---
{
  "title": "DAX read caching",
  "level": "associate",
  "order": 70,
  "facts": [
    {
      "id": "dax",
      "text": "DAX is an in-memory cache for repeated eventually consistent DynamoDB reads with microsecond response times.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html"
    },
    {
      "id": "hit",
      "text": "The DAX client routes requests to a cluster; hits avoid table reads, while misses read DynamoDB and cache results.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html"
    },
    {
      "id": "item",
      "text": "The item cache stores GetItem and BatchGetItem results by primary key with a default TTL of five minutes.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html"
    },
    {
      "id": "query",
      "text": "The query cache stores Query and Scan result sets separately from the item cache.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html"
    },
    {
      "id": "freshness",
      "text": "Item or table writes do not invalidate cached query results; new query results are read after the cached result TTL expires.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html"
    },
    {
      "id": "write",
      "text": "Standard writes through DAX reach DynamoDB before updating its item cache and returning success; direct table writes do not update that cache.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html"
    },
    {
      "id": "strong",
      "text": "DAX forwards strong reads and TransactGetItems to DynamoDB without caching their results.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html"
    },
    {
      "id": "vpc",
      "text": "DAX runs in a VPC and security groups control cluster access.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html"
    },
    {
      "id": "table-ttl",
      "text": "DynamoDB table TTL expires stored items for background deletion, rather than expiring cached copies.",
      "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"
    }
  ],
  "cards": [
    {
      "id": "dynamodb-008",
      "q": "An application repeatedly reads DynamoDB items and accepts eventual consistency. What provides microsecond cache reads?",
      "a": "DAX. Cache hits avoid table reads. Strong and transactional reads pass through to DynamoDB without caching results.",
      "facts": [
        "dax",
        "hit",
        "strong"
      ]
    },
    {
      "id": "dynamodb-037",
      "q": "An application updates a DynamoDB item through DAX but an identical Query still returns an old result. Why?",
      "a": "The query cache is separate. Item writes do not invalidate Query or Scan results; the cached query must expire.",
      "facts": [
        "query",
        "freshness"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-038",
      "q": "A DynamoDB application requires every read to be strongly consistent. Will DAX serve those reads from memory?",
      "a": "No. DAX forwards strong reads and TransactGetItems to DynamoDB without caching results.",
      "facts": [
        "strong"
      ],
      "trap": true
    },
    {
      "id": "dynamodb-039",
      "q": "What keys and default expiration does the DAX item cache use?",
      "a": "Primary keys for GetItem and BatchGetItem results, with a five-minute default item-cache TTL.",
      "facts": [
        "item"
      ]
    },
    {
      "id": "dynamodb-040",
      "q": "An application writes directly to DynamoDB while reading through DAX. Why can a cached item remain stale?",
      "a": "Direct writes bypass the item-cache update. Standard writes through DAX update that cache after DynamoDB succeeds.",
      "facts": [
        "write"
      ]
    }
  ],
  "diagrams": [
    {
      "id": "dynamodb-dax-miss",
      "title": "An eventual read through DAX",
      "width": 800,
      "height": 180,
      "nodes": [
        {
          "id": "app",
          "label": "DAX client",
          "icon": "res-client",
          "x": 30,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "cache",
          "label": "DAX cache",
          "icon": "dynamodb",
          "x": 295,
          "y": 55,
          "w": 210,
          "h": 86,
          "tone": "database"
        },
        {
          "id": "table",
          "label": "DynamoDB table",
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
          "from": "app",
          "to": "cache",
          "step": 1
        },
        {
          "from": "cache",
          "to": "table",
          "step": 2
        }
      ],
      "steps": [
        "The client asks DAX for an item; a cache hit can return it directly.",
        "On a miss, DAX reads DynamoDB and caches the result."
      ]
    }
  ]
}
---
DynamoDB Accelerator (DAX) caches frequently read DynamoDB data in memory. A cache is a temporary data copy. DAX helps repeated reads when the application tolerates eventual consistency, meaning recent writes may not yet appear.

### How it works

1. Connect through the DAX client to a cluster within a VPC, a private virtual network. Security groups control cluster access.
2. For an eventual read, check the cache. A hit returns cached data; a miss reads DynamoDB and caches the result.
3. Store individual reads in the item cache and Query or Scan results in the separate query cache. Cache TTL is the time an entry remains valid.
4. Standard writes through DAX reach DynamoDB first, then update the item cache before success. Direct table writes bypass this cache update. Neither path refreshes existing query-cache entries.
5. Forward strong reads, which require the latest successful value, and transactional `TransactGetItems` reads to DynamoDB without caching their results.

| Read | Behavior |
| --- | --- |
| Eventual GetItem or BatchGetItem | Item cache by primary key |
| Eventual Query or Scan | Separate query-result cache |
| Strong read or TransactGetItems | Forwarded without caching |

### Exam cues

- If the question says repeated eventual reads need microsecond latency, think DAX, because cache hits avoid table reads.
- If the question says a query stays stale after an update, think query-cache TTL, because item writes do not refresh cached query results.
- If the question says every read requires the latest value, think strong DynamoDB reads, because DAX forwards those requests.

### Remember

- Default item-cache TTL: five minutes.
- A Scan fills the query cache, not individual item-cache entries.
- Cache TTL expires cached copies; table TTL controls background deletion of stored items.

> **Trap:** A successful write through DAX updates the item cache but does not refresh a cached Query result.
