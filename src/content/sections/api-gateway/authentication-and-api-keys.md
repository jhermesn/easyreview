---
title: Authentication and API keys
level: associate
order: 30
facts:
  - id: iam
    text: A REST API method configured with AWS_IAM requires IAM-authorized signed requests.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html#api-gateway-control-access-iam-permissions-model-for-calling-api
  - id: signatures
    text: REST API IAM authentication supports SigV4 and SigV4a.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html#api-gateway-control-access-iam-permissions-model-for-calling-api
  - id: invoke
    text: execute-api:Invoke permits calling deployed API methods.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html
  - id: management
    text: API management permissions are separate from API invocation permissions.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html
  - id: lambda
    text: REST API Lambda authorizers use a function to decide access from bearer tokens or request
      information.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html
  - id: cognito
    text: REST APIs can use Amazon Cognito user pool authorizers to control invocation access.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html
  - id: resource
    text: REST API resource policies can allow or deny access based on source IP addresses or VPC
      endpoints.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html
  - id: http
    text: HTTP APIs support IAM, Lambda authorizers and JWT authorizers.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html
  - id: jwt
    text: An HTTP API JWT authorizer validates token signatures and claims including issuer, audience
      and expiration.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html#http-api-jwt-authorizer.evaluation
  - id: scopes
    text: A token must contain at least one configured HTTP API route scope.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html#http-api-jwt-authorizer.evaluation
  - id: keys
    text: API keys identify clients for REST API usage plans.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#apigateway-usage-plans-best-practices
  - id: keys-not-auth
    text: API keys must not be used as API authentication or authorization.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#apigateway-usage-plans-best-practices
  - id: plans
    text: A usage plan associates API stages and client API keys with request throttling targets and
      quotas.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#api-gateway-api-usage-plans-overview
  - id: aggregation
    text: Usage plan throttles and quotas aggregate each key across API stages in the plan.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#api-gateway-api-usage-plans-overview
  - id: key-plan
    text: An API key can belong to only one usage plan for a given API stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#api-gateway-api-usage-plans-overview
  - id: best-effort
    text: Usage plan throttles and quotas are best-effort targets that clients can exceed; do not rely
      on them to control costs or block access.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#api-gateway-api-usage-plans-overview
  - id: authentication
    text: Authentication establishes the identity making a request.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html
  - id: authorization
    text: Authorization determines whether an identity may perform the requested action.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html
  - id: sigv4a-date
    text: API Gateway added SigV4a support for REST APIs in August 2025.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/history.html
cards:
  - id: api-gateway-003
    q: Which API Gateway features authenticate or authorize callers, and what do API keys do?
    a: REST APIs support IAM signed requests, Lambda authorizers and Cognito user pool authorizers. HTTP
      APIs also support JWT authorizers. API keys identify usage-plan clients; they do not
      authenticate or authorize callers.
    trap: true
    facts:
      - iam
      - signatures
      - lambda
      - cognito
      - http
      - keys
      - keys-not-auth
  - id: api-gateway-012
    q: An AWS workload must invoke an API Gateway REST API using its IAM identity. What should the
      method and caller use?
    a: Set the method authorization to AWS_IAM, grant execute-api:Invoke and sign requests using a
      supported AWS signature version.
    facts:
      - iam
      - signatures
      - invoke
      - management
  - id: api-gateway-013
    q: A team protects an API Gateway REST API only with API keys and wants strong caller identity
      checks. What should it add?
    a: An IAM, Lambda or Cognito authorizer suited to the clients. API keys serve usage plans and do not
      establish caller identity.
    trap: true
    facts:
      - keys
      - keys-not-auth
      - iam
      - signatures
      - lambda
      - cognito
  - id: api-gateway-014
    q: An API Gateway HTTP API accepts tokens from an identity provider and requires route permissions.
      Which control fits?
    a: A JWT authorizer with the expected issuer and audience, plus route authorization scopes. The
      token must contain at least one configured route scope.
    facts:
      - jwt
      - scopes
  - id: api-gateway-015
    q: Can an API Gateway usage plan guarantee a strict request ceiling or spending cap?
    a: No. Throttles and quotas are best-effort targets and can be exceeded.
    trap: true
    facts:
      - best-effort
---
API Gateway access controls decide who may invoke an API. Authentication checks a caller's identity; authorization checks which calls that identity may make. API keys identify clients for usage measurement and throttling targets.

### How it works

1. Choose an access mechanism for the API type and its callers.
2. For a REST API using IAM, set `AWS_IAM` on the method. Give the caller `execute-api:Invoke` and require a signed request.
3. Use a Lambda authorizer for custom access decisions or a Cognito user pool authorizer for REST API users. HTTP APIs also support JWT authorizers, which validate a JSON Web Token, a signed token containing identity claims.
4. Separately associate client API keys and deployed stages with a usage plan when you need per-client request targets and quotas.

| Control | API type | Purpose |
|---|---|---|
| IAM | REST and HTTP | Authorize calls with AWS identities |
| Lambda authorizer | REST and HTTP | Run custom access logic |
| Cognito user pool authorizer | REST | Control access for user pool users |
| JWT authorizer | HTTP | Validate tokens and configured route scopes |
| API key and usage plan | REST | Identify clients and apply request targets |

### Exam cues

- If the question says an AWS workload should invoke an API with its role credentials, think IAM authorization and signed requests, because invocation permission belongs to the caller's AWS identity.
- If the question says an HTTP API must accept identity-provider tokens and require a permission scope, think a JWT authorizer with route scopes, because token validation and scope checks happen before integration.
- If the question says measure usage per customer, think API keys and usage plans, because a key identifies the client's traffic across stages in that plan.

### Remember

- REST IAM calls support SigV4 and SigV4a signatures. SigV4a support was added in August 2025.
- A JWT route with scopes requires at least one matching token scope.
- A key belongs to at most one usage plan for a given stage.
- Usage plan quotas are best effort and can be exceeded.

> **Trap:** An API key is not proof of caller identity. It also does not create a hard spending cap or guaranteed request ceiling.
