---
title: AWS AppSync basics
level: foundational
order: 5
facts:
  - id: service
    text: AWS AppSync provides serverless GraphQL and publish-subscribe APIs.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html
  - id: multiple-sources
    text: An AppSync GraphQL API can access multiple data sources through one endpoint.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html
  - id: graphql-selection
    text: GraphQL lets a client specify the data it needs.
    source: https://docs.aws.amazon.com/appsync/latest/devguide/graphql-overview.html
  - id: events-publish
    text: An AppSync Event API accepts published events over HTTP or WebSocket.
    source: https://docs.aws.amazon.com/appsync/latest/eventapi/event-api-concepts.html#API
  - id: events-subscribe
    text: An AppSync Event API lets clients subscribe to events over WebSockets.
    source: https://docs.aws.amazon.com/appsync/latest/eventapi/event-api-concepts.html#API
  - id: channel
    text: An AppSync Events channel routes published events to clients subscribed to that channel.
    source: https://docs.aws.amazon.com/appsync/latest/eventapi/event-api-concepts.html#channel
  - id: rest
    text: Amazon API Gateway REST APIs use HTTP methods and stateless client-server communication.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#welcome
  - id: gateway-websocket
    text: Amazon API Gateway also supports WebSocket APIs with stateful two-way communication.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#welcome
cards:
  - id: appsync-001
    q: A mobile app needs one managed GraphQL endpoint for data from several sources. Which AWS service fits?
    a: AWS AppSync. Its GraphQL API can access multiple data sources through one endpoint.
    facts: [service, multiple-sources]
  - id: appsync-002
    q: A web app needs to publish events and deliver them to subscribed clients over WebSockets. Which AWS AppSync API fits?
    a: An AppSync Event API. Clients subscribe to channels to receive published events.
    facts: [events-publish, events-subscribe, channel]
  - id: appsync-003
    q: How does an AWS AppSync GraphQL API differ from an Amazon API Gateway REST API?
    a: GraphQL lets clients specify the data they need. API Gateway REST APIs use HTTP methods and stateless communication.
    facts: [graphql-selection, rest]
  - id: appsync-004
    q: Does choosing Amazon API Gateway rule out WebSocket APIs when comparing it with AWS AppSync?
    a: No. API Gateway also offers WebSocket APIs for stateful two-way communication.
    trap: true
    facts: [gateway-websocket]
---
AWS AppSync provides managed GraphQL APIs for accessing application data and Event APIs for publishing and subscribing to real-time events. It helps applications retrieve data from several sources or deliver updates to connected clients.

### How it works

1. Choose a GraphQL API when clients need to request selected data from data sources.
2. Choose an Event API when publishers send events to channels and subscribers receive them over WebSockets. Publishers can use HTTP or WebSockets.
3. For a REST API, Amazon API Gateway provides HTTP methods and stateless requests. API Gateway also offers a separate WebSocket API type.

### Exam cues

- If the question says a mobile app needs data from several sources through a GraphQL endpoint, think AWS AppSync, because one API can access those sources.
- If the question says connected clients need published events, think an AppSync Event API, because clients can subscribe to channels over WebSockets.
- If the question says a REST API uses HTTP methods, think Amazon API Gateway, because its REST APIs use those methods.

### Remember

- AppSync provides GraphQL APIs and Event APIs.
- Event API publishers can use HTTP or WebSockets. Subscribers use WebSockets.

> **Trap:** API Gateway also has WebSocket APIs. A WebSocket requirement alone does not make AppSync the only choice.
