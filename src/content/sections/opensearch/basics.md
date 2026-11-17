---
title: "OpenSearch basics"
level: foundational
order: 5
facts:
  - id: search
    text: "Amazon OpenSearch Service is a managed service for deploying, operating and scaling OpenSearch clusters, called domains."
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
cards:
  - id: opensearch-009
    q: "An application needs full-text search and log analytics on a managed cluster. Which service fits?"
    a: "Amazon OpenSearch Service."
    facts: [search]
---
Amazon OpenSearch Service runs OpenSearch for search and log analytics. [What is Amazon OpenSearch Service?](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is)

### How it works

1. Create a domain.
2. Send data to it.
3. Search and analyze it, including with dashboards.

### Exam cues

- If the question says full-text search or log analytics, think OpenSearch Service.

### Remember

- Managed OpenSearch domains.

> **Trap:** OpenSearch is for search; a relational query workload belongs in a database.
