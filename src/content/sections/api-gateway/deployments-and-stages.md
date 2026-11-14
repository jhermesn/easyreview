---
title: Deployments and stages
level: associate
order: 10
facts:
  - id: snapshot
    text: A REST API Deployment is an immutable representation of an API.
    source: https://docs.aws.amazon.com/apigateway/latest/api/API_Deployment.html
  - id: callable
    text: A deployment must be associated with a stage before callers can invoke it.
    source: https://docs.aws.amazon.com/apigateway/latest/api/API_Deployment.html
  - id: stage
    text: A REST API deployment can be associated with a new or existing stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-deployments.html#create-deployment
  - id: redeploy
    text: REST API resource, method, integration, authorizer and model updates require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: settings
    text: REST API stage configuration updates do not require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: plan-settings
    text: REST API usage plan configuration updates do not require redeployment.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/updating-api.html
  - id: variables
    text: Stage variables are per-stage key-value configuration used to select backend URLs or pass
      integration settings.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html
  - id: alias
    text: Stage variables can substitute a Lambda function name, version or alias in an integration URI.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/aws-api-gateway-stage-variables-reference.html#stage-variables-in-integration-lambda-functions
  - id: invoke
    text: When a Lambda function name is supplied through a stage variable, its invoke permission must
      be configured manually.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html#use-cases
  - id: same-account
    text: Lambda functions referenced through stage variables must be in the same account as the API.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/aws-api-gateway-stage-variables-reference.html#stage-variables-in-integration-lambda-functions
  - id: integration-type
    text: Stage variables can change the backend endpoint but cannot switch the integration type between
      HTTP proxy and Lambda proxy.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html#use-cases
  - id: sensitive
    text: Stage variables are not intended to hold sensitive data such as credentials.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html
  - id: http-auto
    text: HTTP API stages can enable automatic deployments so API changes are released automatically.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-stages.html
  - id: alias-definition
    text: A Lambda alias is an updatable pointer to a function version.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html
  - id: client-sdk
    text: API Gateway GetSdk generates a client SDK for a REST API and a stage.
    source: https://docs.aws.amazon.com/apigateway/latest/api/API_GetSdk.html#API_GetSdk
  - id: stage-cache
    text: With a provisioned API Gateway REST API stage cache and method caching enabled, cached responses can be served instead of calling the endpoint, reducing calls.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
  - id: stage-rollback
    text: A REST API stage can be pointed to an earlier deployment to roll back the API snapshot.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-deployments.html#apigateway-deployment-next-steps
  - id: stage-cache-ttl
    text: REST API cache TTL defaults to 300 seconds, has a maximum of 3600 seconds, and zero disables caching.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
  - id: stage-cache-method
    text: Default method-level caching applies to GET methods; other methods require a method override.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
  - id: stage-cache-resize
    text: Changing REST API cache capacity replaces the cache instance and deletes its existing cached data.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
  - id: stage-cache-keys
    text: REST API cache keys can include request parameters such as headers, paths, or query strings; requests sharing the selected key can reuse a cached response.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-cache-keys
  - id: stage-cache-invalidate
    text: A client can refresh a REST API cache entry with Cache-Control max-age=0; if authorization is required, the client needs execute-api:InvalidateCache. Cross-account invalidation is unsupported.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#invalidate-method-caching
  - id: http-default-stage
    text: An HTTP API $default stage is served from the base API URL without a stage name in the path.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-stages.html
  - id: stage-logging-role
    text: CloudWatch Logs for a REST API stage requires an IAM role configured on the API Gateway account that permits API Gateway to write logs.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-stages.html#how-to-stage-settings
  - id: stage-quotas
    text: REST APIs have a default quota of 10 stages per API, which can be increased, and a non-increasable limit of 100 stage variables per stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-execution-service-limits-table.html#api-gateway-execution-service-limits-table
  - id: stage-cfn-dependency
    text: When a CloudFormation template creates a REST API, its methods and its deployment together, the deployment must depend on the methods.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-apigateway-deployment.html#aws-resource-apigateway-deployment--examples--AWS::ApiGateway::Method_Dependency
  - id: mapping-template
    text: "A REST API mapping template, written in VTL, transforms the integration request body before API Gateway calls the backend, or the integration response before it reaches the client. Without a template for the Content-Type, the body passes through unchanged."
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html#models-mappings-request
  - id: front-door
    text: Amazon API Gateway creates, publishes and secures REST, HTTP and WebSocket APIs and acts as a front door to backends such as Lambda functions, EC2 and web applications.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html
  - id: aws-integration
    text: An API Gateway REST API can integrate directly with AWS services, for example as a proxy to Amazon Kinesis, without a Lambda function in between.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-kinesis.html
diagrams:
  - id: api-deployment-stage
    title: Publishing a REST API configuration
    width: 1000
    height: 160
    nodes:
      - id: config
        label: API configuration
        icon: api-gateway
        x: 30
        y: 45
        w: 180
        h: 72
        tone: network
      - id: snapshot
        label: Deployment
        icon: res-documents
        x: 410
        y: 45
        w: 180
        h: 72
        tone: user
      - id: stage
        label: Stage
        icon: api-gateway
        x: 790
        y: 45
        w: 180
        h: 72
        tone: network
    edges:
      - from: config
        to: snapshot
        step: 1
      - from: snapshot
        to: stage
        step: 2
    steps:
      - Create an immutable deployment from the API configuration.
      - Associate the deployment with a new or existing stage for callers.
cards:
  - id: api-gateway-001
    q: When does a changed API Gateway REST API integration take effect for callers of an existing
      stage?
    a: After creating a deployment containing the change and associating it with the stage. Stage
      settings themselves can be updated without redeploying the API.
    trap: true
    facts:
      - snapshot
      - callable
      - stage
      - redeploy
      - settings
      - plan-settings
  - id: api-gateway-004
    q: An API Gateway REST API must call different Lambda aliases for test and production. How can the
      stages select their backends?
    a: Use a stage variable in the integration URI for the Lambda alias. Configure invoke permission
      manually for each selected target; the function must be in the API's account.
    facts:
      - variables
      - alias
      - invoke
      - same-account
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
  - id: api-gateway-017
    q: An API Gateway REST API receives repeated requests and the team wants fewer calls to its backend. Which stage feature can help?
    a: Provision a stage cache and enable method caching. API Gateway can serve cached responses instead of calling the endpoint.
    facts:
      - stage-cache
  - id: api-gateway-018
    q: A newly deployed API Gateway REST API breaks production. How can the team restore the prior API snapshot?
    a: Change the stage's active deployment to an earlier deployment.
    facts:
      - stage-rollback
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
  - id: api-gateway-022
    q: An API Gateway REST API serves the wrong cached response for requests with different query values. What should the team configure?
    a: Include the relevant query parameter in the cache key so different values are cached separately.
    facts:
      - stage-cache-keys
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
  - id: api-gateway-025
    q: An API Gateway REST API stage has CloudWatch logging enabled but cannot write logs. Which account setting should the team check?
    a: Configure an IAM role on the API Gateway account that permits API Gateway to write to CloudWatch Logs.
    facts:
      - stage-logging-role
  - id: api-gateway-026
    q: What are the API Gateway REST API quotas for stages per API and stage variables per stage?
    a: The default is 10 stages per API and can be increased. The limit is 100 variables per stage and cannot be increased.
    facts:
      - stage-quotas
  - id: api-gateway-027
    q: A CloudFormation stack creates an API Gateway REST API, methods and a deployment together but deploys before the methods exist. How should the template be fixed?
    a: Add a DependsOn dependency from the deployment to the methods.
    facts:
      - stage-cfn-dependency
  - id: api-gateway-028
    q: "A backend behind an API Gateway REST API expects request bodies in a different JSON shape than clients send, and the backend cannot change. What in API Gateway can reshape the body?"
    a: "A mapping template on the integration request. It rewrites the body with VTL before API Gateway calls the backend; without a template for that Content-Type, the body passes through unchanged."
    facts:
      - mapping-template
  - id: api-gateway-029
    q: A team wants a managed front door for a REST API whose backend is AWS Lambda. Which service fits?
    a: Amazon API Gateway.
    facts: [front-door]
  - id: api-gateway-030
    q: Can Amazon API Gateway send requests straight to Amazon Kinesis without a Lambda function?
    a: Yes. A REST API can use an AWS service integration as a Kinesis proxy.
    facts: [aws-integration]
---
A REST API deployment is a fixed snapshot of the API configuration. A stage is the named reference clients use to reach a deployment, allowing a release to be attached to a new or existing stage.

### How it works

1. Define the API resources, methods and integrations, the connections to backend services.
2. Create a deployment containing that configuration and associate it with a stage.
3. After resource or integration changes, deploy the updated API to the stage. Updates to stage settings or usage plans do not require redeployment.
4. Use stage variables, per-stage key-value settings, to select a backend URL or Lambda version or alias. A Lambda alias is an updatable pointer to a function version.
5. Configure Lambda invoke permissions manually for stage-variable targets. The selected function must belong to the API's account.
6. Use `GetSdk` to generate a client software development kit (SDK) for a REST API stage. Provision a stage cache and enable method caching to serve cached responses and reduce calls to the endpoint.
7. Roll back an API snapshot by changing the stage's active deployment to an earlier deployment. Configure an API Gateway account IAM role for CloudWatch Logs when enabling stage logging.
8. Select request parameters as cache keys when responses differ by those parameters. To refresh one entry, a client can use `Cache-Control: max-age=0`. If authorization is required, grant `execute-api:InvalidateCache`.

### Exam cues

- If the question says a REST API integration edit is invisible to callers, think create and associate a new deployment, because the stage still references an earlier snapshot.
- If the question says test and production should call different Lambda aliases, think stage variables plus explicit invoke permissions, because selecting a function does not grant permission to call it.
- If the question says HTTP API changes publish automatically, think automatic deployments on that HTTP API stage, because that option releases changes without a manual deployment.
- If the question says generate a client library for a REST API stage, think `GetSdk`, because it generates a client SDK for that API and stage.
- If the question says reduce repeated backend calls, think REST API stage caching, because cached responses can be served without calling the endpoint.
- If an API Gateway deployment breaks production, think changing the active deployment back to an earlier snapshot.
- If requests with different query values receive the same cached response, include the distinguishing parameter in the cache key.
- If CloudFormation deploys a REST API before its methods exist, add deployment dependencies on the methods.
- If the question says reshape a REST API request body before the backend receives it, think an integration request mapping template, because it transforms the payload with VTL.

### Remember

- Resource changes need deployment; stage configuration changes do not.
- Stage variables can select backend values, but cannot switch the integration type.
- Keep credentials out of stage variables.
- REST API caching defaults to 300 seconds, permits at most 3600 seconds, and is disabled by a zero TTL. Default method-level caching covers GET; other methods need an override.
- Resizing the cache deletes its entries. Cross-account cache invalidation is unsupported.
- The HTTP API `$default` stage uses the base URL without a stage path.
- The default REST API quota is 10 stages per API, adjustable; the limit of 100 variables per stage is not adjustable.

> **Trap:** A stage variable containing a Lambda target does not create its invoke permission. Configure that permission on the selected target.
