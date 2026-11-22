---
title: "OpenSearch basics"
level: foundational
order: 5
facts:
  - id: search
    text: "Amazon OpenSearch Service is a managed service for deploying, operating and scaling OpenSearch clusters, called domains."
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
  - id: serverless-capacity
    text: OpenSearch Serverless automatically manages capacity for search and analytics workloads.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html
cards:
  - id: opensearch-009
    q: "An application needs full-text search and log analytics on a managed cluster. Which service fits?"
    a: "Amazon OpenSearch Service."
    facts: [search]
  - id: opensearch-010
    q: Which Amazon OpenSearch Service option manages capacity automatically for search and analytics?
    a: OpenSearch Serverless.
    facts: [serverless-capacity]
---
Amazon OpenSearch Service runs OpenSearch for search and log analytics.

### How it works

1. Create a domain.
2. Send data to it.
3. Search and analyze it, including with dashboards.

### Exam cues

- If the question says search without managing capacity, think OpenSearch Serverless, because it manages capacity automatically.
- If the question says full-text search or log analytics, think OpenSearch Service.

### Remember

- Managed OpenSearch domains.

> **Trap:** OpenSearch is for search; a relational query workload belongs in a database.
