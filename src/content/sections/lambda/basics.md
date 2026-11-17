---
title: "Lambda basics"
level: foundational
order: 5
facts:
  - id: serverless
    text: "AWS Lambda runs code without provisioning or managing servers; AWS handles capacity, scaling and patching."
    source: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#welcome
  - id: triggers
    text: "A Lambda function runs in response to events or API calls from triggers such as API Gateway, Amazon S3, Amazon SQS and EventBridge."
    source: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#welcome
cards:
  - id: lambda-071
    q: "A small piece of code must run each time a file lands in an S3 bucket, with no servers to manage. Which service fits?"
    a: "AWS Lambda, triggered by the S3 event."
    facts: [serverless, triggers]
  - id: lambda-072
    q: "Who patches and scales the servers that run AWS Lambda functions?"
    a: "AWS. Lambda is serverless; you supply only the code."
    facts: [serverless]
---
AWS Lambda runs your code when an event happens, with no servers for you to manage. [What is AWS Lambda?](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#welcome)

### How it works

1. Write a function and choose a trigger.
2. When the event happens, Lambda runs the function.
3. Lambda scales the number of runs with the events.

### Exam cues

- If the question says run code on an event without managing servers, think Lambda.

### Remember

- Serverless: no servers to provision or patch.

> **Trap:** Lambda is serverless compute for event-driven code; long-running servers you control are EC2.
