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
  - id: request-validation
    text: REST API request validation checks a request before the integration request; on failure API Gateway returns 400 to the caller and logs the result in CloudWatch Logs, which saves backend calls.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html#api-gateway-method-request-validation
  - id: integration-timeout
    text: The integration timeout is 50 milliseconds to 29 seconds for every integration type; Regional and private APIs can request a higher quota, edge-optimized APIs can't.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-execution-service-limits-table.html#api-gateway-execution-service-limits-table
  - id: http-api-cors
    text: "When CORS is configured on an HTTP API, API Gateway answers preflight OPTIONS requests automatically, even without an OPTIONS route."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
cards:
  - id: api-gateway-040
    q: Which REST API integration type should you use to call a Lambda function with the least setup?
    a: Lambda proxy integration (AWS_PROXY). API Gateway passes the whole request to the function, with no integration request or response mappings to configure.
    facts: [integration-types, lambda-proxy]
  - id: api-gateway-043
    q: A REST API backend keeps receiving malformed requests. How can API Gateway stop them before they reach the integration?
    a: Turn on request validation for the method. Invalid requests get a 400 response and never reach the backend.
    facts: [request-validation]
  - id: api-gateway-044
    q: A Lambda function behind a Regional REST API needs 45 seconds. Does the default integration timeout allow it?
    a: No. The default maximum is 29 seconds. A Regional or private API can request a higher integration timeout quota; an edge-optimized API can't, so long jobs usually move to an asynchronous pattern.
    trap: true
    facts: [integration-timeout]
  - id: api-gateway-050
    q: "A browser app on another origin calls an API Gateway HTTP API and fails on the preflight request. What fixes it?"
    a: "**Configure CORS on the HTTP API.** API Gateway then answers preflight OPTIONS requests automatically and adds the CORS headers."
    facts: [http-api-cors]
---
An integration connects an API method to its backend. The integration type decides how much mapping you configure. [Choose an API Gateway API integration type](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html)

### How it works

1. A client calls a method. If request validation is on, API Gateway rejects an invalid request with 400 before going further.
2. The integration request sends the call to the backend: as is for proxy types, or through mapping templates for AWS and HTTP custom types.
3. The backend has up to the integration timeout to answer (29 seconds by default).
4. API Gateway returns the response. With HTTP API CORS configured, it also answers preflight OPTIONS requests automatically. [HTTP API CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html)

| Integration type | Backend | Mappings |
|---|---|---|
| AWS_PROXY | Lambda function | None |
| AWS | AWS service action, or Lambda custom | Request and response |
| HTTP_PROXY | HTTP endpoint | None |
| HTTP | HTTP endpoint | Request and response |

### Exam cues

- If the question says call Lambda with the least configuration, think Lambda proxy integration.
- If the question says reject bad input before it reaches the backend, think request validation.
- If a browser fails an HTTP API preflight request, configure CORS so API Gateway answers OPTIONS requests automatically.

### Remember

- Integration timeout: 50 ms to 29 seconds; raise it only for Regional or private APIs.

> **Trap:** Regional and private APIs can request a higher integration timeout quota, but edge-optimized APIs cannot.
