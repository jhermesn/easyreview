---
title: Draining, slow start, and stickiness
level: associate
order: 40
facts:
  - id: drain
    text: ALB stops new requests to a deregistering target while allowing in-flight work to finish
      during deregistration delay.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#deregistration-delay
  - id: drain-time
    text: ALB deregistration delay defaults to 300 seconds and supports 0 to 3600 seconds.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-attributes
  - id: drain-state
    text: A deregistering ALB target enters draining and later unused; a connection closed by the target
      before the delay ends can produce a 500-level client response.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#deregistration-delay
  - id: slow
    text: ALB slow start linearly increases the request share sent to a newly healthy target.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
  - id: slow-time
    text: ALB slow start defaults to 0 seconds, meaning disabled; the enabled duration range is 30 to
      900 seconds.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-attributes
  - id: slow-existing
    text: ALB slow start does not apply to already healthy targets when enabled, or to the first batch
      registered together in an empty target group.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
  - id: slow-baseline
    text: A newly registered ALB target enters slow start only when another healthy target is outside
      slow start.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
  - id: algorithms
    text: ALB defaults to round robin; least outstanding requests selects targets with the least
      in-progress work, and weighted random is another algorithm.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-routing-algorithm
  - id: algorithm-limits
    text: ALB slow start cannot use least outstanding requests or weighted random; weighted random also
      cannot use sticky sessions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-routing-algorithm
  - id: sticky
    text: ALB stickiness binds a client session to a target through cookies, is enabled per target
      group, and is disabled by default.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#sticky-sessions
  - id: cookie
    text: ALB duration-based stickiness uses AWSALB; application-based stickiness requires the
      configured application cookie and a load balancer-generated cookie.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#sticky-sessions
  - id: sticky-failure
    text: If the ALB duration-based cookie refers to an unhealthy or deregistered target, the load
      balancer selects a new target and updates the cookie.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#duration-based-stickiness
  - id: shared-session
    text: A shared session store such as DynamoDB or ElastiCache keeps session data independent of an
      application instance and preserves it when that instance fails.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_stateless.html
  - id: session-state
    text: Session state is user data retained between requests during use of an application.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_mitigate_interaction_failure_stateless.html
  - id: tg-stickiness
    text: "Weighted target groups do not honor sticky sessions by default. With target group stickiness enabled on the rule, an AWSALBTG cookie keeps a client on the target group it first reached for the configured duration."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html#forward-actions
cards:
  - id: elastic-load-balancing-006
    q: How can an ALB target finish active requests before it is removed during scale-in?
    a: Use the target group deregistration delay, which defaults to 300 seconds. New requests stop while
      active work drains; closing connections early can cause 500-level errors.
    facts:
      - drain
      - drain-time
      - drain-state
  - id: elastic-load-balancing-007
    q: New ALB targets become overloaded as soon as they pass health checks. Which setting can ramp
      their traffic?
    a: Slow start. It increases their request share linearly over 30 to 900 seconds and requires a
      healthy target outside slow start. It cannot use least outstanding requests or weighted
      random.
    facts:
      - slow
      - slow-time
      - slow-baseline
      - algorithm-limits
  - id: elastic-load-balancing-008
    q: Does ALB stickiness make instance-local application sessions survive target failure?
    a: No. ALB chooses another target when the original becomes unhealthy or is deregistered. Keep
      session state in a shared store such as DynamoDB or ElastiCache so it is independent of the
      failed instance.
    facts:
      - sticky-failure
      - shared-session
    trap: true
  - id: elastic-load-balancing-025
    q: A team enables ALB slow start before registering the first batch into an empty target group. Will
      that batch ramp traffic?
    a: No. The first batch registered together in an empty target group does not enter slow start. A new
      target needs another healthy target outside slow start.
    facts:
      - slow-existing
      - slow-baseline
    trap: true
  - id: elastic-load-balancing-026
    q: An ALB target group uses least outstanding requests, but new targets need slow start. What must
      change?
    a: Use a compatible algorithm such as the default round robin. Slow start cannot run with least
      outstanding requests or weighted random.
    facts:
      - algorithms
      - algorithm-limits
  - id: elastic-load-balancing-027
    q: Which ALB target group defaults control draining, warm-up, and session affinity?
    a: Deregistration delay is 300 seconds. Slow start is disabled with value 0. Sticky sessions are
      disabled.
    facts:
      - drain-time
      - slow-time
      - sticky
  - id: elastic-load-balancing-057
    q: "An ALB rule sends 10 percent of requests to a new target group for a short test, and target group stickiness is enabled with a long duration. What happens to clients first routed to the new group?"
    a: "They keep returning to it for the stickiness duration because the AWSALBTG cookie pins them, so the test reaches more traffic over time than the weight suggests."
    facts:
      - tg-stickiness
---
ALB target group attributes control how targets enter service, leave service, and keep a client's requests together. Draining means finishing active work after new requests stop. Slow start spreads a new target's warm-up over time. Stickiness, also called session affinity, uses cookies to keep a session on one target.

### How it works

1. A newly healthy target normally receives its full share of requests. Enable slow start to raise that share linearly over a configured duration. A newly registered target needs another healthy target outside slow start; the first batch in an empty group does not ramp.
2. Select a routing algorithm.

   | Algorithm | Target selection | Restrictions |
   |---|---|---|
   | Round robin | Take turns across healthy targets; the default | Supports slow start |
   | Least outstanding requests | Choose the target with the least in-progress work | No slow start |
   | Weighted random | Choose randomly across healthy targets | No slow start or sticky sessions |

3. Enable stickiness per target group if a client session needs one target. Duration-based stickiness uses `AWSALB`. Application-based stickiness uses the configured application cookie plus a load balancer cookie. A cookie is a value the client returns with later requests.
4. Deregister a leaving target. It enters `draining`, stops receiving new requests, and allows active work to complete. The default delay is 300 seconds before it becomes `unused`.
5. If a duration-based cookie points to an unhealthy or deregistered target, ALB chooses a new target and updates the cookie.

Session state is the application data retained between a user's requests. A shared store such as DynamoDB or ElastiCache keeps it independent of an application instance, so it can survive that instance's failure.

### Exam cues

- If the question says active requests fail during removal, think deregistration delay and target shutdown behavior, because closing connections before draining finishes can cause 500-level errors.
- If the question says a new target needs warm-up, think slow start with a compatible algorithm, because it raises the target's share gradually.
- If the question says each request in a session should use one target, think stickiness, because cookies identify the selected target.
- If the question says sessions must survive a failed target, think a shared session store, because routing affinity does not preserve instance-local data.
- If the question says keep a weighted ALB test small, think leave target group stickiness off, because the AWSALBTG cookie keeps clients on the group they first reached.

### Remember

- Deregistration delay: 300 seconds by default, configurable from 0 to 3600 seconds.
- Slow start: disabled by default with value 0; enabled range 30 to 900 seconds.
- Stickiness: disabled by default, enabled per target group.
- Enabling slow start does not put already healthy targets into slow start.
- Duration-based cookie: `AWSALB`.

> **Trap:** Stickiness does not keep a failed target available. ALB selects another target when the duration-based cookie points to an unhealthy or deregistered target.
