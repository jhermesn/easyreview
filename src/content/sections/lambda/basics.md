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
  - id: serverless-2
    text: AWS Lambda runs code without servers to provision or manage; AWS handles server maintenance, capacity provisioning and scaling, and you pay only for the resources used.
    source: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
  - id: triggers-2
    text: Other AWS services, such as Amazon S3 and Amazon DynamoDB, can invoke Lambda functions with events.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
  - id: edge
    text: Lambda@Edge runs Lambda functions at AWS locations closer to CloudFront viewers.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html
  - id: edge-events
    text: Lambda@Edge runs functions for CloudFront events without requiring customers to manage servers.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html
  - id: image-ecr
    text: A Lambda function can use a container image stored in an Amazon ECR repository in the same Region.
    source: https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create
cards:
  - id: lambda-080
    q: Which Lambda feature runs code at AWS locations close to CloudFront viewers?
    a: Lambda@Edge.
    facts: [edge, edge-events]
  - id: lambda-081
    q: Can an AWS Lambda function use a container image stored in Amazon ECR?
    a: Yes. The ECR repository must be in the same Region as the function.
    facts: [image-ecr]
  - id: lambda-071
    q: "A small piece of code must run each time a file lands in an S3 bucket, with no servers to manage. Which service fits?"
    a: "AWS Lambda, triggered by the S3 event."
    facts: [serverless, triggers]
  - id: lambda-072
    q: "Who patches and scales the servers that run AWS Lambda functions?"
    a: "AWS. Lambda is serverless; you supply only the code."
    facts: [serverless]
  - id: lambda-057
    q: A company wants to run code in response to new uploads to an Amazon S3 bucket, with no servers to manage. Which service fits?
    a: "AWS Lambda, triggered by S3 events.\nAWS manages the servers, capacity and scaling."
    facts: [serverless-2, triggers-2]
  - id: lambda-058
    q: Who patches and scales the servers that run AWS Lambda functions?
    a: AWS. Lambda is serverless; you manage only your code.
    facts: [serverless-2]
---
AWS Lambda runs your code when an event happens, with no servers for you to manage.

### How it works

1. Write a function and choose a trigger.
2. When the event happens, Lambda runs the function.
3. Lambda scales the number of runs with the events.

Lambda@Edge runs functions for CloudFront events near viewers without servers to manage. Lambda also supports function deployment from an Amazon ECR container image.

### Exam cues

- If the question says run code on an event without managing servers, think Lambda.
- If the question says run code near CloudFront viewers, think Lambda@Edge, because its functions run at nearby AWS locations.

### Remember

- Serverless: no servers to provision or patch.

> **Trap:** Lambda is serverless compute for event-driven code; long-running servers you control are EC2.
