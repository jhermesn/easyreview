---
title: Canary releases
level: associate
order: 20
facts:
  - id: split
    text: A canary release randomly sends a configured share of requests to a test deployment while the
      base deployment serves the rest on the same stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html
  - id: settings
    text: Stage canarySettings includes deploymentId, percentTraffic, stageVariableOverrides and
      useStageCache.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: range
    text: Canary traffic percentage can be from 0.0 through 100.0 inclusive.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: override
    text: Canary stage variables can override the base stage variables.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: logs
    text: Canary requests have separate logs and metrics when logging is enabled.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: log-suffix
    text: The canary execution log group name ends in /Canary.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: cache
    text: useStageCache enables canary caching only if the stage cache is enabled.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: cache-versions
    text: Different base and canary deployments cache responses separately.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: cache-same
    text: The same base and canary deployment uses a shared cache key for equivalent requests.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
  - id: promote
    text: Promotion copies the canary deployment ID to the base stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/promote-canary-deployment.html
  - id: promote-variables
    text: Promotion copies canary stage variables to the base stage.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/promote-canary-deployment.html
  - id: promote-traffic
    text: Promotion sets canary traffic to 0.0%.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/promote-canary-deployment.html
  - id: disable
    text: Promotion does not disable the stage canary configuration.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/promote-canary-deployment.html
  - id: remove
    text: Remove the stage canary settings to disable it.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/promote-canary-deployment.html
  - id: restriction
    text: While canary is enabled, a stage cannot be associated with another non-canary deployment until
      the canary settings are removed.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html#api-gateway-canary-release-deployment-overview
diagrams:
  - id: api-canary-split
    title: Random request split on one REST API stage
    width: 1000
    height: 360
    nodes:
      - id: client
        label: Clients
        icon: res-client
        x: 30
        y: 140
        w: 160
        h: 72
        tone: user
      - id: stage
        label: REST stage
        icon: api-gateway
        x: 390
        y: 140
        w: 180
        h: 72
        tone: network
      - id: base
        label: Base deployment
        icon: res-documents
        x: 790
        y: 35
        w: 180
        h: 72
        tone: user
      - id: canary
        label: Canary deployment
        icon: res-documents
        x: 790
        y: 245
        w: 180
        h: 72
        tone: user
    edges:
      - from: client
        to: stage
        step: 1
        label: request
      - from: stage
        to: base
        step: 2
        label: remaining traffic
      - from: stage
        to: canary
        step: 3
        label: percentTraffic
    steps:
      - Clients invoke the same stage.
      - Random selection leaves the remaining requests on the base deployment.
      - The configured percentage goes to the canary deployment, with its variable overrides.
cards:
  - id: api-gateway-002
    q: How does an API Gateway REST API canary release route requests?
    a: Stage canarySettings selects a canary deployment and a percentTraffic from 0.0 to 100.0. Requests
      are split randomly between the canary and base on the same stage.
    facts:
      - split
      - settings
      - range
  - id: api-gateway-008
    q: A team wants a new API Gateway REST API release to use different backend settings for a small
      share of traffic. Which feature fits?
    a: Use a canary release with stageVariableOverrides and a small percentTraffic. The base stage keeps
      its settings for the remaining requests.
    facts:
      - split
      - override
      - settings
  - id: api-gateway-009
    q: An API Gateway REST API canary has passed testing. What does promotion change, and does it
      disable the canary?
    a: Promotion copies the deployment ID and stage variables to the base stage and sets canary traffic
      to 0.0%. Remove canary settings separately to disable it.
    trap: true
    facts:
      - promote
      - promote-variables
      - promote-traffic
      - disable
      - remove
  - id: api-gateway-010
    q: Will enabling useStageCache alone activate caching for an API Gateway canary release?
    a: No. The stage cache must also be enabled. Different deployments cache separately; the same
      deployment shares a cache key for equivalent requests.
    trap: true
    facts:
      - cache
      - cache-versions
      - cache-same
  - id: api-gateway-011
    q: Where can a team distinguish API Gateway canary execution logs from base-stage execution logs?
    a: In the canary-specific execution log group, whose name ends in /Canary, when logging is enabled.
    facts:
      - logs
      - log-suffix
---
A canary release tests a new REST API deployment with a share of real requests on an existing stage. API Gateway selects requests randomly, while the base deployment handles the remaining traffic.

### How it works

1. Add `canarySettings` to the stage, including the canary `deploymentId` and `percentTraffic`.
2. Use `stageVariableOverrides` when the test deployment needs different backend settings.
3. Inspect canary logs and metrics. With logging enabled, the canary execution log group ends in `/Canary`.
4. Promote the release by copying its deployment ID and stage variables to the base stage and setting canary traffic to 0.0%.
5. Remove canary settings to disable the canary configuration.

### Exam cues

- If the question says expose a new REST API deployment to a small random share of requests, think a stage canary, because the base and test versions can share a stage.
- If the question says promotion succeeded but the stage still has a canary configuration, think remove canary settings, because promotion alone does not disable it.
- If the question says the canary needs a different backend value, think `stageVariableOverrides`, because those values override the base stage variables.

### Remember

- `percentTraffic` accepts 0.0 through 100.0 inclusive.
- Canary caching requires both `useStageCache` and an enabled stage cache.
- Different deployments cache separately; equivalent requests to the same deployment share a cache key.
- Remove canary settings before associating the stage with another non-canary deployment.

> **Trap:** Setting canary traffic to 100% sends all requests to it but does not perform the documented promotion steps. Promotion also updates the stage's deployment and variables.
