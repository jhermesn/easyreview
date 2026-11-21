---
title: Operational settings and diagnostics
level: professional
order: 60
facts:
  - id: invoke
    text: When a Lambda function name is supplied through a stage variable, its invoke permission must
      be configured manually.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html#use-cases
  - id: settings
    text: REST API stage configuration updates do not require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: plan-settings
    text: REST API usage plan configuration updates do not require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: redeploy
    text: REST API resource, method, integration, authorizer and model updates require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: integration-type
    text: Stage variables can change the backend endpoint but cannot switch the integration type between
      HTTP proxy and Lambda proxy.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html#use-cases
  - id: client-sdk
    text: API Gateway GetSdk generates a client SDK for a REST API and a stage.
    source: https://docs.aws.amazon.com/apigateway/latest/api/API_GetSdk.html#API_GetSdk
  - id: stage-cache-ttl
    text: REST API cache TTL defaults to 300 seconds, has a maximum of 3600 seconds, and zero disables caching.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
  - id: stage-cache-method
    text: Default method-level caching applies to GET methods; other methods require a method override.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
  - id: stage-cache-resize
    text: Changing REST API cache capacity replaces the cache instance and deletes its existing cached data.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
  - id: stage-cache-invalidate
    text: A client can refresh a REST API cache entry with Cache-Control max-age=0; if authorization is required, the client needs execute-api:InvalidateCache. Cross-account invalidation is unsupported.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#invalidate-method-caching
  - id: http-default-stage
    text: An HTTP API $default stage is served from the base API URL without a stage name in the path.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-stages.html
  - id: stage-quotas
    text: REST APIs have a default quota of 10 stages per API, which can be increased, and a non-increasable limit of 100 stage variables per stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-execution-service-limits-table.html#api-gateway-execution-service-limits-table
  - id: mapping-template
    text: "A REST API mapping template, written in VTL, transforms the integration request body before API Gateway calls the backend, or the integration response before it reaches the client. Without a template for the Content-Type, the body passes through unchanged."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html#models-mappings-request
  - id: sdk-generation
    text: "API Gateway generates a client SDK for a REST API after it is deployed to a stage, in Java, JavaScript, Java for Android, Objective-C or Swift for iOS, and Ruby; the GetSdk API returns it for automation."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-generate-sdk.html#how-to-generate-sdk
  - id: mock
    text: A MOCK integration returns a response from API Gateway without calling a backend, which helps test the integration setup without backend charges and lets teams work in parallel.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html#api-gateway-api-integration-types
  - id: latency-metrics
    text: The Latency metric covers the time from receiving a client request to returning the response, including IntegrationLatency, which is only the time the backend takes to respond.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html#api-gateway-metrics
  - id: cache-metrics
    text: With API caching on, CacheHitCount counts requests served from the cache and CacheMissCount counts requests served by the backend; their Average statistic gives the hit and miss rates.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html#api-gateway-metrics
  - id: openapi-import
    text: "API Gateway can create or update a REST API by importing an OpenAPI 2.0 or 3.0 definition file, and can export an API as an OpenAPI definition."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api.html#api-gateway-import-api
  - id: proxy-502
    text: "With a Lambda proxy integration, a function response that is not in the required format makes API Gateway return 502 Bad Gateway."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
cards:
  - id: api-gateway-005
    q: An API Gateway REST API stage uses a variable for its Lambda target and receives an invocation
      permission error. What should the team check?
    a: The selected Lambda target's permission for API Gateway to invoke it. Stage-variable targets
      require manual permission configuration.
    facts:
      - invoke
  - id: api-gateway-006
    q: Must an API Gateway REST API be redeployed after changing only its stage variables or usage plan?
    a: No. Stage and usage plan configuration changes do not require redeployment. Resource and
      integration updates do.
    trap: true
    facts:
      - settings
      - plan-settings
      - redeploy
  - id: api-gateway-007
    q: Can an API Gateway stage variable switch a method from an HTTP proxy integration in test to a
      Lambda proxy integration in production?
    a: No. It can select backend values within the configured integration type, but cannot change the
      integration type.
    trap: true
    facts:
      - integration-type
  - id: api-gateway-016
    q: A team needs a generated client SDK for a specific API Gateway REST API stage. Which operation should it use?
    a: GetSdk generates a client SDK for the REST API and stage.
    facts:
      - client-sdk
  - id: api-gateway-019
    q: What are the default and maximum TTL values for an API Gateway REST API cache?
    a: The default is 300 seconds and the maximum is 3600 seconds. Zero disables caching.
    facts:
      - stage-cache-ttl
  - id: api-gateway-020
    q: A team enables default method-level caching for an API Gateway REST API stage. Are POST responses cached automatically?
    a: No. Default method-level caching applies to GET methods; use a method override for POST.
    trap: true
    facts:
      - stage-cache-method
  - id: api-gateway-021
    q: What happens to cached responses when an API Gateway REST API stage cache is resized?
    a: The cache instance is replaced and existing cached data is deleted.
    facts:
      - stage-cache-resize
  - id: api-gateway-023
    q: How can an authorized client refresh one API Gateway REST API cache entry?
    a: Send Cache-Control max-age=0. When authorization is required, the client needs execute-api:InvalidateCache. Cross-account invalidation is unsupported.
    facts:
      - stage-cache-invalidate
  - id: api-gateway-024
    q: Which API Gateway HTTP API stage is served from the base API URL without a stage path?
    a: The $default stage.
    facts:
      - http-default-stage
  - id: api-gateway-026
    q: What are the API Gateway REST API quotas for stages per API and stage variables per stage?
    a: The default is 10 stages per API and can be increased. The limit is 100 variables per stage and cannot be increased.
    facts:
      - stage-quotas
  - id: api-gateway-028
    q: "A backend behind an API Gateway REST API expects request bodies in a different JSON shape than clients send, and the backend cannot change. What in API Gateway can reshape the body?"
    a: "A mapping template on the integration request. It rewrites the body with VTL before API Gateway calls the backend; without a template for that Content-Type, the body passes through unchanged."
    facts:
      - mapping-template
  - id: api-gateway-039
    q: "Engineers download client SDKs for a REST API by hand after each stage update and upload them to S3. How can this be automated?"
    a: "An EventBridge rule on the stage update API call, recorded by CloudTrail, invokes a Lambda function that calls API Gateway GetSdk for the stage and writes the SDK to S3."
    facts: [sdk-generation]
  - id: api-gateway-041
    q: A frontend team needs a working API endpoint that returns fixed responses before the backend exists. Which integration type fits?
    a: A MOCK integration, which answers from API Gateway without calling any backend.
    facts: [mock]
  - id: api-gateway-042
    q: An API's Latency metric is high, but IntegrationLatency is low. Where is the time going?
    a: In API Gateway itself rather than the backend, since Latency includes IntegrationLatency plus API Gateway overhead.
    facts: [latency-metrics]
  - id: api-gateway-045
    q: How do you measure whether an API Gateway cache is effective?
    a: Watch CacheHitCount and CacheMissCount. Their Average statistic gives the cache hit and miss rates.
    facts: [cache-metrics]
  - id: api-gateway-046
    q: "A team keeps its REST API definition in an OpenAPI file in Git. How does it create the API in API Gateway from that file?"
    a: "Import the OpenAPI 2.0 or 3.0 definition into API Gateway, which builds or updates the REST API from it."
    facts: [openapi-import]
  - id: api-gateway-049
    q: "A REST API with Lambda proxy integration returns 502 Bad Gateway although the function runs without errors. What is the likely cause?"
    a: "The function returns a response **not in the proxy integration format** (statusCode, headers, body). API Gateway answers 502 when it cannot use the output."
    facts: [proxy-502]
---
API Gateway offers settings and diagnostics for operating deployed APIs, from stage configuration and caching to integration troubleshooting and client SDK generation.

### How it works

1. For a REST API, redeploy changes to resources, methods, integrations, authorizers or models. Changes to stage settings and usage plans do not need redeployment.
2. Stage variables can select a backend endpoint within the configured integration type. When a variable supplies a Lambda function name, configure invoke permission manually.
3. Configure REST API caching for methods and choose a time to live (TTL). A client can refresh an entry with `Cache-Control: max-age=0`; when authorization is required, it needs `execute-api:InvalidateCache`. Resizing replaces the cache and deletes its data.
4. Use a mapping template in Velocity Template Language (VTL) to transform a REST API integration request or response. A MOCK integration returns a response without calling a backend. Mapping templates | Integration types
5. Compare `Latency`, which includes the backend response time, with `IntegrationLatency`, which measures that backend time. With caching on, use the `Average` statistic of `CacheHitCount` and `CacheMissCount` for hit and miss rates.
6. Import an OpenAPI definition to create or update a REST API, or export the API as a definition. After deploying to a stage, use `GetSdk` to generate a client software development kit (SDK) for that API and stage. OpenAPI import and export | GetSdk

### Exam cues

- If the question says a stage variable selects a Lambda function but invocation fails, check the target's invoke permission, because it must be configured manually.
- If the question says a backend needs a different request body, think an integration request mapping template, because it transforms the payload before the backend is called.
- If the question says a frontend needs responses before the backend exists, think MOCK integration, because API Gateway answers without a backend.
- If the question says overall latency is high but integration latency is low, compare the two metrics, because overall latency includes more than the backend response time.
- If the question says a Lambda proxy integration returns 502, check the function response format, because an incorrectly formatted response causes that error.
- If the question says automate SDK generation for a stage, think `GetSdk`, because it generates an SDK for the specified REST API and stage.

### Remember

- REST API cache TTL defaults to 300 seconds, has a maximum of 3600 seconds, and zero disables caching. Default method caching covers GET; other methods need an override.
- Cross-account cache invalidation is unsupported.
- An HTTP API `$default` stage uses the base API URL without a stage name in the path.
- A REST API defaults to 10 stages per API, an adjustable quota. The limit of 100 stage variables per stage cannot be increased.
- OpenAPI 2.0 and 3.0 definitions can be imported.

> **Trap:** A stage variable can change the backend endpoint, but it cannot switch an HTTP proxy integration to a Lambda proxy integration.
