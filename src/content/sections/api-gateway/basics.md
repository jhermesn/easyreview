---
title: "API Gateway basics"
level: foundational
order: 5
facts:
  - id: apis
    text: "Amazon API Gateway creates, publishes, maintains, monitors and secures REST, HTTP and WebSocket APIs at any scale."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#welcome
  - id: aws-integration
    text: An API Gateway REST API can integrate directly with AWS services, for example as a proxy to Amazon Kinesis, without a Lambda function in between.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-kinesis.html
  - id: websocket-cost
    text: "API Gateway WebSocket API pricing includes connection minutes."
    source: https://aws.amazon.com/api-gateway/pricing/
  - id: cache-cost
    text: "Optional API Gateway API caching is charged by the hour according to cache size."
    source: https://aws.amazon.com/api-gateway/pricing/
cards:
  - id: api-gateway-048
    q: "A team needs a managed front door for a REST API backed by Lambda functions. Which service fits?"
    a: "Amazon API Gateway."
    facts: [apis]
  - id: api-gateway-030
    q: Can Amazon API Gateway send requests straight to Amazon Kinesis without a Lambda function?
    a: Yes. A REST API can use an AWS service integration as a Kinesis proxy.
    facts: [aws-integration]
  - id: api-gateway-055
    q: "What extra usage should a team include when estimating API Gateway WebSocket and REST API cache costs?"
    a: "Include WebSocket connection minutes and hourly charges for an enabled REST API cache."
    facts: [websocket-cost, cache-cost]
---
Amazon API Gateway is a managed front door for APIs that call Lambda functions or other backends.

### How it works

1. Define the API and its routes.
2. Connect each route to a backend such as Lambda.
3. Clients call the API through API Gateway.

### Exam cues

- If the question says estimate a WebSocket API or REST API cache, think connection minutes and cache hours, because both contribute to API Gateway charges.
- If the question says create or secure an API, think API Gateway.

### Remember

- REST, HTTP and WebSocket APIs.

> **Trap:** API Gateway exposes APIs; it does not run the business logic, which lives in the backend.
