---
title: Endpoint types and throttling
level: associate
order: 40
facts:
  - id: edge
    text: An edge-optimized API Gateway endpoint routes requests through the nearest CloudFront point of presence, helps geographically distributed clients, and is the default endpoint type for REST APIs.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html#api-gateway-api-endpoint-types-edge-optimized
  - id: regional
    text: A Regional API Gateway endpoint is meant for clients in the same Region, such as EC2 callers, and can sit behind your own CloudFront distribution or use Route 53 latency routing across Regions.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html#api-gateway-api-endpoint-types-regional
  - id: private
    text: A private API Gateway endpoint is reachable only from your VPC through an interface VPC endpoint.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html#api-gateway-api-endpoint-types-private
  - id: token-bucket
    text: API Gateway throttles with a token bucket per account and Region; requests beyond the rate and burst limits get 429 Too Many Requests, and clients should retry with backoff.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#api-gateway-request-throttling
  - id: account-quota
    text: The default API Gateway throttle quota is 10,000 requests per second per account per Region across HTTP, REST and WebSocket APIs, with a burst bucket of 5,000 requests, and the rate can be raised on request.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html
  - id: order
    text: API Gateway applies throttles in this order, per-client or per-method limits in a usage plan, per-method limits on the stage, the account limit per Region, then AWS Regional throttling.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#api-gateway-request-throttling
  - id: stateful-websocket
    text: "REST and HTTP APIs in API Gateway give stateless client-server communication, while WebSocket APIs give stateful, full-duplex communication between client and server."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#welcome
  - id: stage-cache
    text: "REST API stage caching returns cached endpoint responses for a TTL that defaults to 300 seconds and can be at most 3,600 seconds; a TTL of 0 turns caching off, and methods can override the stage setting."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
  - id: appsync
    text: "AWS AppSync provides serverless GraphQL and Pub/Sub APIs that read from one or more data sources, such as DynamoDB, through a single GraphQL endpoint; pipeline resolvers run several functions in sequence to resolve one field."
    source: https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html#what-is-appsync
cards:
  - id: api-gateway-031
    q: A REST API serves mobile users worldwide from one Region. Which API Gateway endpoint type reduces their latency with no extra setup?
    a: "**Edge-optimized** (the default for REST APIs): requests enter at the nearest CloudFront point of presence."
    facts: [edge]
  - id: api-gateway-032
    q: An internal API must be callable only from inside a VPC, never from the internet. Which API Gateway endpoint type fits?
    a: "A **private** API, reached through an interface VPC endpoint."
    facts: [private]
  - id: api-gateway-033
    q: An API deployed in two Regions must send each user to the closest Region under one custom domain. Which endpoint type and DNS feature fit?
    a: "Regional endpoints in each Region with the same custom domain, and Route 53 latency-based routing."
    facts: [regional]
  - id: api-gateway-034
    q: Clients of an API Gateway API start getting HTTP 429 during a traffic spike. What does that mean and what should clients do?
    a: "Throttling: requests exceeded the rate or burst limit.\nRetry with exponential backoff; raise limits or add caching if the load is expected."
    facts: [token-bucket]
  - id: api-gateway-035
    q: What is the default API Gateway request rate quota per account and Region?
    a: "10,000 requests per second with a burst of 5,000, shared by all APIs in the account and Region (increase on request)."
    facts: [account-quota]
  - id: api-gateway-036
    q: One noisy API in an account consumes all of the Region's API Gateway throughput and starves other APIs. What limits it?
    a: "Set stage or method throttling (or usage plan limits per client) on that API, below the account-level quota."
    trap: true
    facts: [order, account-quota]
  - id: api-gateway-037
    q: "Which API Gateway API type keeps a stateful, two-way connection between client and server?"
    a: "A WebSocket API. REST and HTTP APIs are stateless request-response APIs."
    facts: [stateful-websocket]
  - id: api-gateway-038
    q: "A read-heavy REST API behind Lambda and Aurora serves data that changes rarely. What cuts backend load with the least change?"
    a: "Turn on API Gateway stage caching. Responses are served from the cache for the TTL, which defaults to 300 seconds and goes up to 3,600 seconds."
    facts: [stage-cache]
  - id: api-gateway-047
    q: "A mobile app needs a serverless GraphQL API that reads and writes several DynamoDB tables. Which service fits better than API Gateway?"
    a: "AWS AppSync, a managed GraphQL service; pipeline resolvers can combine operations on several tables for one field."
    facts: [appsync]
---
API Gateway endpoint type decides where requests enter AWS, and throttling decides how many get through. [API endpoint types](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html)

### How it works

1. Choose an endpoint type per REST API: edge-optimized, Regional or private.
2. Every request takes a token from a bucket that refills at the allowed rate.
3. Limits apply from narrowest to widest: usage plan per client or method, stage method limits, account per Region, then AWS Regional limits.
4. When the bucket is empty, API Gateway answers 429 Too Many Requests.

| Endpoint type | Reach | Fits |
|---|---|---|
| Edge-optimized (REST default) | Nearest CloudFront point of presence | Clients around the world |
| Regional | Same Region | Same-Region clients, your own CloudFront, multi-Region with Route 53 |
| Private | Interface VPC endpoint only | Internal APIs |

### Exam cues

- If the question says global clients, think edge-optimized; same-Region or multi-Region with latency routing, think Regional.
- If the question says API reachable only from a VPC, think a private API.
- If the question says 429 errors or protect the backend from bursts, think throttling settings, usage plans and caching.

### Remember

- Default account quota: 10,000 requests per second, burst 5,000, per Region, shared by all APIs.
- Throttle order: usage plan, stage method, account, AWS Regional.
- 429 means throttled; retry with backoff.

> **Trap:** The account quota is shared by every API in the Region. Without stage or usage plan limits, one busy API can throttle all the others.
