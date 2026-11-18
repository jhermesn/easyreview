---
title: "DocumentDB basics"
level: foundational
order: 5
facts:
  - id: mongo-compatible
    text: "Amazon DocumentDB is a fully managed database service for MongoDB-compatible workloads."
    source: https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#what-is
cards:
  - id: documentdb-009
    q: "Which managed AWS database service supports MongoDB-compatible workloads?"
    a: "Amazon DocumentDB is a fully managed service for MongoDB-compatible workloads."
    facts: [mongo-compatible]
---
Amazon DocumentDB is a managed document database compatible with MongoDB. [What is Amazon DocumentDB?](https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#what-is)

### How it works

1. Create a DocumentDB cluster.
2. Applications connect with MongoDB drivers.
3. AWS manages the database.

### Exam cues

- If the question says MongoDB-compatible managed database, think DocumentDB.

### Remember

- MongoDB compatible.

> **Trap:** DocumentDB is for documents; graphs use Amazon Neptune.
