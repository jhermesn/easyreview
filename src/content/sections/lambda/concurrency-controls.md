---
title: Concurrency controls
level: associate
order: 40
facts:
  - id: concurrency-definition
    text: Concurrency counts in-flight Lambda requests; average concurrency is average request rate multiplied by average duration in seconds.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: reserved-cap
    text: Reserved concurrency dedicates capacity to a function and caps its simultaneous executions.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: reserved-charge
    text: Configuring reserved concurrency has no additional charge.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: provisioned-init
    text: Provisioned concurrency prepares execution environments ahead of invocation to reduce initialization latency and has additional charges.
    source: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#provisioned-concurrency
  - id: provisioned-version
    text: Provisioned concurrency applies to a published version or alias, not $LATEST; callers must target that version or alias.
    source: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#provisioned-concurrency
  - id: provisioned-scaling
    text: Application Auto Scaling supports schedules and utilization-based target tracking for provisioned concurrency.
    source: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#provisioned-concurrency
  - id: concurrency-default
    text: The default regional concurrent-execution quota is 1,000 and can be increased; new accounts can start with reduced quotas.
    source: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#compute-and-storage
  - id: unreserved-floor
    text: Lambda keeps 100 concurrency units available for functions without reserved concurrency.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: sync-rps
    text: For synchronous invocation, an execution environment serves up to ten requests per second, making the function request-rate limit ten times its concurrency limit.
    source: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#api-requests
  - id: reserved-zero
    text: Reserved concurrency of zero stops a function from processing new events.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: async-zero
    text: New asynchronous events go to a configured function DLQ or on-failure destination without retries when reserved concurrency is zero.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-retain-records
  - id: cold-start
    text: Provisioned concurrency pre-initializes environments; reserved concurrency only reserves capacity and does not perform that initialization.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
  - id: spillover
    text: Requests above provisioned capacity can use on-demand capacity when concurrency remains available and can experience cold starts.
    source: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#provisioned-concurrency
cards:
  - id: lambda-010
    q: How do reserved concurrency and provisioned concurrency differ for Lambda?
    a: Reserved concurrency dedicates capacity and caps a function at no extra charge. Provisioned concurrency prepares environments for a published version or alias and costs extra. Reserved capacity alone does not pre-initialize environments.
    facts:
      - reserved-cap
      - reserved-charge
      - provisioned-init
      - provisioned-version
      - cold-start
  - id: lambda-011
    q: A Lambda automation floods a database. How can the team stop new executions, and what happens to new asynchronous events?
    a: Set reserved concurrency to 0. The function stops processing new events; new asynchronous events go to the configured DLQ or on-failure destination without retries.
    facts:
      - reserved-zero
      - async-zero
  - id: lambda-012
    q: What are the default Lambda concurrency quota and unreserved capacity requirement?
    a: The default is 1,000 concurrent executions per Region, with 100 units kept for functions without reserved concurrency. New accounts can start lower; quota increases are possible.
    facts:
      - concurrency-default
      - unreserved-floor
  - id: lambda-027
    q: A Lambda API has latency spikes after idle periods. The team already reserved concurrency. What should it configure?
    a: Provisioned concurrency on the published version or alias that clients invoke. Reserved concurrency does not pre-initialize environments.
    facts:
      - provisioned-version
      - provisioned-init
      - cold-start
  - id: lambda-028
    q: A Lambda API has a predictable daily traffic peak. How can its prepared capacity follow that schedule?
    a: Use Application Auto Scaling scheduled scaling for provisioned concurrency. Use target tracking when capacity should follow utilization.
    facts:
      - provisioned-scaling
  - id: lambda-029
    q: A Lambda function exceeds its provisioned concurrency but has unused concurrency capacity. Are all additional requests necessarily throttled?
    a: No. They can use on-demand execution environments and may experience cold starts. Provisioned concurrency alone is not the function concurrency cap.
    trap: true
    facts:
      - spillover
      - reserved-cap
---
Lambda concurrency is the number of requests a function handles at the same time. Reserved concurrency protects and limits capacity; provisioned concurrency prepares execution environments so requests avoid initialization delays called cold starts.

### How it works

1. Estimate average concurrency as requests per second multiplied by average duration in seconds. Check the regional quota, because functions share that account capacity.
2. Reserve concurrency for a function that needs dedicated capacity or a ceiling to protect a database. Other functions cannot borrow the reservation, even when it is unused.
3. For predictable response latency, allocate provisioned concurrency to a published version or alias. Send requests to that version or alias to use the prepared environments.
4. Scale provisioned concurrency with Application Auto Scaling using schedules or a target utilization. Requests beyond the prepared capacity can use on-demand environments when capacity remains, so they can still have cold starts.
5. To stop new processing during a runaway automation, set reserved concurrency to 0. New asynchronous events go to a configured DLQ or on-failure destination without retries.

### Exam cues

- If the question says protect a database from too many simultaneous Lambda calls, think reserved concurrency, because it caps executions.
- If the question says remove initialization delay for an interactive API, think provisioned concurrency, because it prepares environments before invocation.
- If the question says prepared capacity must follow office hours, think scheduled scaling, because Application Auto Scaling can change provisioned concurrency on a schedule.

### Remember

- Regional concurrent-execution quota: 1,000 by default, adjustable. New accounts can begin with less.
- Keep 100 units available for functions without reserved concurrency.
- Reserved concurrency has no extra charge. Provisioned concurrency costs extra and cannot target `$LATEST`.
- Synchronous request rate has a separate ceiling of 10 times the concurrency limit. Do not apply that synchronous ceiling to asynchronous invocation.
- Concurrency is simultaneous work; request rate is work arriving per second.

> **Trap:** Reserving concurrency does not prepare runtime environments. It cannot by itself remove cold starts.
