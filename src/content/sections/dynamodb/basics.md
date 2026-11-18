---
title: "DynamoDB basics"
level: foundational
order: 5
facts:
  - id: nosql
    text: "Amazon DynamoDB is a serverless, fully managed, distributed NoSQL database with single-digit millisecond performance at any scale."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#Introduction
cards:
  - id: dynamodb-049
    q: "Which AWS database service is a serverless, fully managed NoSQL database?"
    a: "Amazon DynamoDB is a distributed NoSQL database with single-digit millisecond performance at any scale."
    facts: [nosql]
---
Amazon DynamoDB is a serverless NoSQL database for fast key-value and document access. [What is Amazon DynamoDB?](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#Introduction)

### How it works

1. Create a table with a key.
2. Read and write items through the API.
3. DynamoDB scales without servers to manage.

### Exam cues

- If the question says serverless NoSQL or key-value at any scale, think DynamoDB.

### Remember

- Serverless NoSQL, single-digit millisecond.

> **Trap:** DynamoDB is NoSQL; joins and complex SQL point to a relational database.
