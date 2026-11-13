---
title: Rate controls and error thresholds
level: associate
order: 30
facts:
  - id: rate-concurrency
    text: Run Command max-concurrency limits simultaneous node invocations and accepts a number or
      percentage; the default is 50.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-velocity
  - id: rate-ramp
    text: Run Command starts with one invocation and increases dispatch exponentially as nodes
      acknowledge, up to max-concurrency.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-velocity
  - id: rate-errors
    text: Run Command max-errors accepts a count or percentage; the default is zero, which stops new
      dispatch after the first error.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
  - id: rate-exceeded
    text: A max-errors count of three stops new dispatch when the fourth error is received.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
  - id: rate-running
    text: Invocations already running are allowed to complete after the error threshold is exceeded and
      can also fail.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
  - id: rate-serial
    text: Concurrency of one makes invocations proceed one at a time to avoid additional concurrent
      failures after an error threshold is exceeded.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/send-commands-multiple.html#send-commands-maxerrors
cards:
  - id: systems-manager-014
    q: What are the Systems Manager Run Command defaults for max-concurrency and max-errors?
    a: 50 concurrent invocations and zero allowed errors. Both accept a number or percentage; zero
      errors stops further dispatch after the first error.
    facts:
      - rate-concurrency
      - rate-errors
  - id: systems-manager-015
    q: A Systems Manager Run Command rollout exceeds its error threshold. Are running invocations
      cancelled?
    a: No. Running invocations complete and may also fail. Set max-concurrency to one when the rollout
      must proceed serially.
    trap: true
    facts:
      - rate-running
      - rate-serial
  - id: systems-manager-044
    q: A Systems Manager Run Command rollout sets max-errors to three. At which error does it stop
      dispatching to new nodes?
    a: The fourth error. max-errors is the number allowed before new dispatch stops.
    trap: true
    facts:
      - rate-exceeded
  - id: systems-manager-045
    q: A team must stop a Systems Manager Run Command rollout after the first failure without other
      nodes failing concurrently. Which controls fit?
    a: Use max-errors zero and max-concurrency one. The first error stops new dispatch, and serial
      execution avoids other in-flight invocations.
    facts:
      - rate-errors
      - rate-serial
---
Run Command rate controls limit how much of a fleet runs a command at once and when errors stop further dispatch. Concurrency means the number of node invocations running at the same time.

### How it works

1. Set `max-concurrency` as a node count or percentage of targets. Dispatch starts with one node and ramps up as nodes acknowledge.
2. Set `max-errors` as the allowed error count or percentage. Run Command stops sending new invocations when the threshold is exceeded.
3. Allow running invocations to finish. Use concurrency of one when additional concurrent failures would be unacceptable.

### Exam cues

- If the question says limit simultaneous changes, think `max-concurrency`, because it controls active node invocations.
- If the question says stop dispatch after the first error, think `max-errors: 0`, because zero errors are allowed.
- If the question says avoid failures from other in-flight commands, think concurrency of one, because nodes then run serially.

### Remember

- Run Command defaults: `max-concurrency: 50`, `max-errors: 0`.
- With `max-errors: 3`, dispatch stops on the fourth error.
- Running invocations can finish and fail after new dispatch stops.

> **Trap:** An error threshold controls dispatch, not an absolute failure ceiling. Even serial execution must receive the error that exceeds the allowed count before dispatch stops.
