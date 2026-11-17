---
title: Integrations and monitoring
level: associate
order: 50
facts:
  - id: integration-types
    text: "REST API integration types are AWS (an AWS service action with mapped request and response), AWS_PROXY (Lambda proxy), HTTP (custom HTTP with mappings), HTTP_PROXY and MOCK."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html#api-gateway-api-integration-types
  - id: lambda-proxy
    text: With Lambda proxy integration (AWS_PROXY) you don't configure the integration request or response; API Gateway passes the client request to the function, and AWS recommends it for calling Lambda.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html#api-gateway-api-integration-types
  - id: custom-mapping
    text: Lambda custom and HTTP custom integrations need mapping templates for the integration request and response, but let you reuse those mappings across backends with similar formats.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html#api-gateway-api-integration-types
  - id: mock
    text: A MOCK integration returns a response from API Gateway without calling a backend, which helps test the integration setup without backend charges and lets teams work in parallel.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html#api-gateway-api-integration-types
  - id: request-validation
    text: REST API request validation checks a request before the integration request; on failure API Gateway returns 400 to the caller and logs the result in CloudWatch Logs, which saves backend calls.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html#api-gateway-method-request-validation
  - id: integration-timeout
    text: The integration timeout is 50 milliseconds to 29 seconds for every integration type; Regional and private APIs can request a higher quota, edge-optimized APIs can't.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-execution-service-limits-table.html#api-gateway-execution-service-limits-table
  - id: latency-metrics
    text: The Latency metric covers the time from receiving a client request to returning the response, including IntegrationLatency, which is only the time the backend takes to respond.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html#api-gateway-metrics
  - id: cache-metrics
    text: With API caching on, CacheHitCount counts requests served from the cache and CacheMissCount counts requests served by the backend; their Average statistic gives the hit and miss rates.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html#api-gateway-metrics
  - id: openapi-import
    text: "API Gateway can create or update a REST API by importing an OpenAPI 2.0 or 3.0 definition file, and can export an API as an OpenAPI definition."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api.html#api-gateway-import-api
cards:
  - id: api-gateway-040
    q: Which REST API integration type should you use to call a Lambda function with the least setup?
    a: Lambda proxy integration (AWS_PROXY). API Gateway passes the whole request to the function, with no integration request or response mappings to configure.
    facts: [integration-types, lambda-proxy]
  - id: api-gateway-041
    q: A frontend team needs a working API endpoint that returns fixed responses before the backend exists. Which integration type fits?
    a: A MOCK integration, which answers from API Gateway without calling any backend.
    facts: [mock]
  - id: api-gateway-042
    q: An API's Latency metric is high, but IntegrationLatency is low. Where is the time going?
    a: In API Gateway itself rather than the backend, since Latency includes IntegrationLatency plus API Gateway overhead.
    facts: [latency-metrics]
  - id: api-gateway-043
    q: A REST API backend keeps receiving malformed requests. How can API Gateway stop them before they reach the integration?
    a: Turn on request validation for the method. Invalid requests get a 400 response and never reach the backend.
    facts: [request-validation]
  - id: api-gateway-044
    q: A Lambda function behind a Regional REST API needs 45 seconds. Does the default integration timeout allow it?
    a: No. The default maximum is 29 seconds. A Regional or private API can request a higher integration timeout quota; an edge-optimized API can't, so long jobs usually move to an asynchronous pattern.
    trap: true
    facts: [integration-timeout]
  - id: api-gateway-045
    q: How do you measure whether an API Gateway cache is effective?
    a: Watch CacheHitCount and CacheMissCount. Their Average statistic gives the cache hit and miss rates.
    facts: [cache-metrics]
  - id: api-gateway-046
    q: "A team keeps its REST API definition in an OpenAPI file in Git. How does it create the API in API Gateway from that file?"
    a: "Import the OpenAPI 2.0 or 3.0 definition into API Gateway, which builds or updates the REST API from it."
    facts: [openapi-import]
---
An integration connects an API method to its backend. The integration type decides how much mapping you configure, and API Gateway metrics show where time and cache hits go. [Choose an API Gateway API integration type](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html)

### How it works

1. A client calls a method. If request validation is on, API Gateway rejects an invalid request with 400 before going further.
2. The integration request sends the call to the backend: as is for proxy types, or through mapping templates for AWS and HTTP custom types.
3. The backend has up to the integration timeout to answer (29 seconds by default).
4. API Gateway returns the response and publishes Latency, IntegrationLatency and, with caching on, CacheHitCount and CacheMissCount. [API Gateway metrics](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html#api-gateway-metrics)

| Integration type | Backend | Mappings |
|---|---|---|
| AWS_PROXY | Lambda function | None |
| AWS | AWS service action, or Lambda custom | Request and response |
| HTTP_PROXY | HTTP endpoint | None |
| HTTP | HTTP endpoint | Request and response |
| MOCK | None | Response from API Gateway |

### Exam cues

- If the question says call Lambda with the least configuration, think Lambda proxy integration.
- If the question says test an API without a backend, think a MOCK integration.
- If the question says reject bad input before it reaches the backend, think request validation.
- If the question says find whether the backend or API Gateway is slow, compare IntegrationLatency with Latency.

### Remember

- Integration timeout: 50 ms to 29 seconds; raise it only for Regional or private APIs.
- Latency includes IntegrationLatency.
- Cache effectiveness: CacheHitCount and CacheMissCount.

> **Trap:** The Lambda function timeout and the API Gateway integration timeout are separate limits. A function allowed 15 minutes still fails the API call after 29 seconds by default.
