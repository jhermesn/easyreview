---
title: "SDKs basics"
level: foundational
order: 5
facts:
  - id: sdk-libraries
    text: "AWS SDKs provide libraries and APIs that let application code use AWS services from a programming language."
    source: https://aws.amazon.com/what-is/sdk/#amsc3--1chu1sx
  - id: direct-api
    text: "Direct HTTPS requests to AWS APIs can be signed with temporary credentials and their session token."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html
cards:
  - id: sdks-010
    q: "An application written in Java must store files in Amazon S3. What should it use to call S3?"
    a: "The AWS SDK for Java, a library that calls AWS APIs from code."
    facts: [sdk-libraries]
  - id: sdks-011
    q: "Must an application use an AWS SDK to sign a direct HTTPS API request with temporary credentials?"
    a: "No. It can sign the request directly and include the session token."
    facts: [direct-api]
---
AWS SDKs let programs call AWS services from languages such as Python, Java and JavaScript.

### How it works

1. Add the SDK for your language to the application.
2. Configure credentials.
3. Call AWS services from the code.

### Exam cues

- If the question says sign a direct HTTPS request with temporary AWS credentials, think request signing and the session token, because an SDK is not required.
- If the question says call AWS services from application code, think an AWS SDK.

### Remember

- Libraries per programming language.

> **Trap:** The SDK is for code; the AWS CLI is for commands and scripts in a shell.
