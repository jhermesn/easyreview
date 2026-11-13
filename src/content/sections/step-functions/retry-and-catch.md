---
title: Retry and Catch
level: associate
order: 20
facts:
  - id: unhandled-failure
    text: A state error fails the execution by default when no handling resolves it.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#concepts-error-handling
  - id: retry-catch-scope
    text: Task, Parallel, and Map support Retry and Catch; catchers do not handle top-level execution
      failures.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#concepts-error-handling
  - id: retry-first
    text: Step Functions scans retriers in order and uses applicable Retry behavior before selecting a
      matching Catch transition.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: retry-interval
    text: IntervalSeconds defaults to one second before the first retry.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: retry-attempts
    text: MaxAttempts defaults to three retries; zero disables retries for that retrier.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: retry-backoff
    text: BackoffRate defaults to 2.0 and multiplies the retry delay after each attempt.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: retry-cap
    text: MaxDelaySeconds caps the retry interval; without it the retry policy has no delay cap.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: retry-jitter
    text: JitterStrategy defaults to NONE; FULL randomizes each delay between zero and its calculated
      retry interval.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: all-placement
    text: States.ALL must be the sole ErrorEquals entry in the last retrier or catcher.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
  - id: wildcard-exclusions
    text: States.ALL does not handle States.DataLimitExceeded or States.Runtime.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-error-representation
  - id: explicit-data-limit
    text: States.DataLimitExceeded can be caught or retried when explicitly named in ErrorEquals.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-error-representation
  - id: runtime-fatal
    text: States.Runtime is not retriable and causes execution failure.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-error-representation
  - id: taskfailed-timeout
    text: States.TaskFailed matches known error names except States.Timeout.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-error-representation
  - id: catch-input
    text: In JSONPath workflows, Catch ResultPath can merge error information into original input; its
      default $ replaces the input.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-resultpath.html#input-output-resultpath-catch
  - id: outer-failure
    text: A caller or parent workflow can handle failed child executions; EventBridge can react to
      Standard workflow timeout events.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#concepts-error-handling
cards:
  - id: step-functions-003
    q: How do Retry and Catch work together in a Step Functions Task state?
    a: Retry runs first. If it cannot resolve the error, a matching Catch selects its Next state. Retry
      defaults are IntervalSeconds 1, MaxAttempts 3, and BackoffRate 2.0. In JSONPath, use Catch
      ResultPath to preserve input and add the error.
    facts:
      - retry-first
      - retry-interval
      - retry-attempts
      - retry-backoff
      - catch-input
  - id: step-functions-004
    q: What are the rules and exclusions for States.ALL in Step Functions Retry and Catch?
    a: Place States.ALL alone in ErrorEquals in the last retrier or catcher. It does not handle
      States.DataLimitExceeded or States.Runtime. Explicitly naming States.DataLimitExceeded permits
      handling it; States.TaskFailed excludes States.Timeout.
    trap: true
    facts:
      - all-placement
      - wildcard-exclusions
      - explicit-data-limit
      - taskfailed-timeout
  - id: step-functions-005
    q: What happens when a Step Functions state fails without effective Retry or Catch handling?
    a: The execution fails. Task, Parallel, and Map can have catchers, but top-level execution failures
      need handling by the caller, a parent workflow, or external event handling.
    facts:
      - unhandled-failure
      - retry-catch-scope
      - outer-failure
  - id: step-functions-012
    q: Many Step Functions tasks retry a throttled dependency together. Which retry options spread
      retries and limit their delay?
    a: "JitterStrategy: FULL and MaxDelaySeconds. Full jitter randomizes delays; MaxDelaySeconds caps
      the calculated interval."
    facts:
      - retry-jitter
      - retry-cap
  - id: step-functions-013
    q: A Step Functions recovery state needs both the original request and the error. What should a
      JSONPath Catch configure?
    a: A ResultPath such as $.error. This adds the error to the input; leaving ResultPath at its default
      $ replaces the input.
    facts:
      - catch-input
---

Step Functions error handling lets a workflow repeat failed work or move to a recovery step. A retrier defines how to try again; a catcher chooses a fallback state after retry handling cannot resolve the error.

### How it works

1. A `Task`, `Parallel`, or `Map` state reports an error. Without effective handling, the execution fails.
2. Step Functions scans `Retry` entries in order for a matching `ErrorEquals` name. Backoff increases the delay between attempts; jitter adds randomness to spread simultaneous retries.
3. If retries do not resolve the error, Step Functions selects a matching `Catch` and follows its `Next` transition.
4. For JSONPath workflows, put the error under a field such as `$.error` with `ResultPath` to preserve the request. The default `$` replaces the input with the error.
5. Handle top-level execution failure in the caller or a parent workflow. EventBridge can react to Standard workflow timeout events.

### Exam cues

- If the question says a dependency has transient failures, think Retry, because the same work may succeed after a delay.
- If the question says synchronized retries overload a dependency, think `JitterStrategy: FULL` plus `MaxDelaySeconds`, because these spread retries and cap their delay.
- If the question says recovery needs the original request, think Catch `ResultPath`, because its default replaces the input.

### Remember

| Retry field | Default or effect |
|---|---|
| `IntervalSeconds` | One second |
| `MaxAttempts` | Three retries; zero disables retries |
| `BackoffRate` | 2.0 |
| `JitterStrategy` | `NONE`; `FULL` randomizes from zero to the retry interval |
| `MaxDelaySeconds` | Caps the delay; no cap when omitted |

- `States.ALL` belongs alone in the last retrier or catcher.
- `States.TaskFailed` excludes `States.Timeout`.

> **Trap:** `States.ALL` does not handle `States.DataLimitExceeded` or `States.Runtime`. Explicitly name `States.DataLimitExceeded` to catch or retry it. `States.Runtime` is not retriable.
