---
title: GraphQL APIs and real-time data
level: associate
order: 10
facts:
  - id: schema
    text: A GraphQL schema defines the shape of the data available to clients.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: selection
    text: GraphQL clients can specify the data they need in a request.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/graphql-overview.html
  - id: multiple-sources
    text: An AppSync GraphQL API can access multiple data sources through one endpoint.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html
  - id: resolver
    text: An AppSync resolver is code attached to a schema field that determines how to resolve the field.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/resolver-components.html
  - id: dynamodb
    text: Amazon DynamoDB is a supported AppSync GraphQL data source.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: lambda
    text: AWS Lambda is a supported AppSync GraphQL data source.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: http
    text: HTTP endpoints are supported AppSync GraphQL data sources.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: opensearch
    text: Amazon OpenSearch Service is a supported AppSync GraphQL data source.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: relational
    text: AppSync GraphQL APIs support relational databases as data sources.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/data-source-components.html
  - id: mutation
    text: GraphQL mutations describe changes to data.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/graphql-overview.html
  - id: subscription-trigger
    text: AppSync GraphQL subscriptions are triggered by mutations.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html#graphql-schema-subscription-directives
  - id: websocket
    text: AppSync establishes and maintains a WebSocket connection when a client invokes a GraphQL subscription.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html
  - id: external-change
    text: AppSync GraphQL subscriptions are triggered by mutations rather than arbitrary changes to the data source.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html#graphql-schema-subscription-directives
  - id: authorization
    text: An AppSync GraphQL API can authorize requests with Amazon Cognito user pools, IAM, OpenID Connect, a Lambda authorizer or an API key.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html#authorization-types
  - id: api-key
    text: AppSync API keys are intended for development or APIs that can safely be public.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html#api-key-authorization
  - id: cache
    text: AppSync server-side caching stores data in memory to reduce direct access to data sources.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/enabling-caching.html
  - id: cache-resolver
    text: AppSync per-resolver caching requires each cached resolver to be explicitly enabled.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/enabling-caching.html#caching-behavior
  - id: appsync-writes
    text: "AppSync DynamoDB pipeline resolvers can use GetItem to read and PutItem to write items."
    source: https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-pipeline-resolvers.html
  - id: appsync-domain
    text: "An AppSync custom domain needs an ACM certificate covering the name in us-east-1 and a DNS record pointing to its CloudFront distribution."
    source: https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html
cards:
  - id: appsync-006
    q: What do a schema and a resolver do in an AWS AppSync GraphQL API?
    a: The schema defines the data shape. A resolver handles how a field is resolved.
    facts: [schema, resolver]
  - id: appsync-007
    q: A web app using AWS AppSync must receive live updates after its users change data through GraphQL. What should it use?
    a: GraphQL subscriptions tied to mutations. AppSync maintains the client WebSocket connection.
    facts: [mutation, subscription-trigger, websocket]
  - id: appsync-008
    q: Will every direct database change automatically trigger an AWS AppSync GraphQL subscription?
    a: No. AppSync GraphQL subscriptions are triggered by mutations. A direct data source change alone is not a GraphQL mutation.
    trap: true
    facts: [subscription-trigger, external-change]
  - id: appsync-009
    q: Which authorization modes can protect an AWS AppSync GraphQL API?
    a: API keys, AWS Lambda, AWS IAM, OpenID Connect and Amazon Cognito user pools.
    facts: [authorization]
  - id: appsync-010
    q: An AWS AppSync GraphQL API repeatedly reads the same data. What feature can reduce direct data source access?
    a: Server-side caching. It stores data in memory; per-resolver caching requires opting in each resolver.
    facts: [cache, cache-resolver]
  - id: api-gateway-053
    q: "Can AWS AppSync DynamoDB resolvers read and write items?"
    a: "Yes. Resolver functions can use GetItem and PutItem."
    facts: [appsync-writes]
  - id: api-gateway-054
    q: "What certificate and DNS setup does an AWS AppSync custom domain need?"
    a: "Use an ACM certificate covering the name in us-east-1 and point DNS to the AppSync CloudFront distribution."
    facts: [appsync-domain]
---
An AWS AppSync GraphQL API gives clients a way to request selected data from several sources. A schema describes the available data, while resolvers handle the fields in a request.

### How it works

1. Define a schema for the data clients can request. Clients choose the fields they need.
2. Attach resolvers to fields. A resolver processes the request and obtains data from a data source when needed.
3. Connect data sources such as Amazon DynamoDB, AWS Lambda, HTTP endpoints, Amazon OpenSearch Service or relational databases.
4. Choose authorization for the API. Options include API keys, AWS Identity and Access Management (IAM), Amazon Cognito user pools, OpenID Connect and AWS Lambda.
5. For live updates, link a subscription to a mutation. AppSync maintains a WebSocket connection for the subscribing client and delivers updates when the mutation triggers the subscription.
6. Enable server-side caching when repeated requests benefit from data held in memory. Per-resolver caching requires enabling each resolver.

### Exam cues

- If the question says a mobile app needs data from multiple sources through one GraphQL endpoint, think AWS AppSync, because it can connect those sources to one API.
- If the question says a web app needs live updates after GraphQL mutations, think AppSync subscriptions, because mutations trigger them over managed WebSocket connections.
- If the question says a GraphQL API needs to read and write DynamoDB items, think AppSync resolvers, because they can use GetItem and PutItem.
- If the question says an AppSync custom domain needs HTTPS, think an ACM certificate in us-east-1 and DNS to CloudFront, because AppSync uses a CloudFront distribution for the domain.
- If the question says repeated requests should reduce data source access, think AppSync caching, because cached data is held in memory.

### Remember

- A schema describes data; resolvers handle fields and can access data sources.
- GraphQL subscriptions respond to mutations. Direct data source changes alone do not trigger them.
- API keys suit development or APIs that can safely be public.

> **Trap:** An AppSync GraphQL subscription does not automatically observe every direct database change. It responds to its linked mutation.
