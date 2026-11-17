---
title: "Transfer Family basics"
level: foundational
order: 5
facts:
  - id: managed-sftp
    text: "AWS Transfer Family is a fully managed service for transferring files into and out of AWS storage over protocols such as SFTP."
    source: https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#what-is-aws-transfer-family
cards:
  - id: transfer-family-009
    q: "Partners upload files by SFTP and the company wants them stored in Amazon S3 without running an SFTP server. Which service fits?"
    a: "AWS Transfer Family."
    facts: [managed-sftp]
---
AWS Transfer Family gives partners a managed SFTP (and similar protocols) endpoint backed by AWS storage. [What is AWS Transfer Family?](https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html#what-is-aws-transfer-family)

### How it works

1. Create a Transfer Family server.
2. Users connect with SFTP or another supported protocol.
3. Files land in AWS storage such as S3.

### Exam cues

- If the question says SFTP into S3 without servers, think Transfer Family.

### Remember

- Managed file transfer protocols.

> **Trap:** Transfer Family serves partners using file protocols; DataSync moves bulk data between storage systems.
