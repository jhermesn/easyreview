---
title: Scheduler
level: associate
order: 60
facts:
  - id: schedule-types
    text: Scheduler supports recurring rate and cron schedules and one-time at schedules.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#schedule-types
  - id: schedule-zones
    text: Cron and one-time schedules can use an IANA time zone.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#time-zones
  - id: schedule-precision
    text: Scheduler invokes targets with 60-second precision when no flexible time window is set.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#schedule-types
  - id: rate-start
    text: A rate schedule without StartDate begins invoking its target immediately.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#rate-based
  - id: cron-fields
    text: "Scheduler cron expressions have six fields: minutes, hours, day of month, month, day of week, and year."
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based
  - id: dst-skip
    text: A cron invocation at a nonexistent local time during the spring daylight saving transition is skipped.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#daylist-savings-time
  - id: dst-once
    text: A cron invocation at a repeated local time during the autumn daylight saving transition runs only once.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#daylist-savings-time
  - id: rate-day
    text: A day in a rate schedule is a 24-hour duration even across daylight saving changes.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#daylist-savings-time
  - id: window
    text: A flexible time window spreads target invocation within the configured window; choose OFF to disable it.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/managing-schedule-flexible-time-windows.html
  - id: execution-role
    text: Scheduler assumes an execution role trusting scheduler.amazonaws.com to call the target.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/setting-up.html
  - id: schedule-retries
    text: Scheduler retry policy accepts an event age of 60 to 86400 seconds and 0 to 185 retries; retries stop
      when either limit is reached.
    source: https://docs.aws.amazon.com/scheduler/latest/APIReference/API_RetryPolicy.html
  - id: schedule-dlq
    text: Scheduler supports a standard SQS DLQ and its execution role needs sqs:SendMessage permission to deliver
      failed invocations there.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/configuring-schedule-dlq.html
  - id: legacy-rules
    text: Scheduled rules are a legacy feature limited to the default bus, use UTC, and have one-minute minimum
      precision; AWS recommends Scheduler for scheduled target invocation.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html
  - id: snapshot-target
    text: An EventBridge rule can target the EBS CreateSnapshot API directly.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-console-targets
cards:
  - id: eventbridge-013
    q: Which EventBridge feature supports one-time schedules, local time zones, and flexible delivery windows?
    a: EventBridge Scheduler. Use `at` for one-time execution, `cron` for calendar schedules, and `rate` for
      regular intervals.
    facts:
      - schedule-types
      - schedule-zones
      - window
  - id: eventbridge-033
    q: A team needs a daily EventBridge job at a local wall-clock time across daylight saving changes. Which
      schedule should it choose?
    a: Use Scheduler with a cron expression and the required IANA time zone. A rate day is always 24 hours and can
      shift relative to local wall-clock time.
    facts:
      - schedule-zones
      - rate-day
      - schedule-types
  - id: eventbridge-034
    q: An EventBridge Scheduler cron time occurs twice when clocks move backward. How many scheduled invocations
      occur for that local time?
    a: One. A repeated autumn time runs only once; a nonexistent spring time is skipped.
    trap: true
    facts:
      - dst-once
      - dst-skip
  - id: eventbridge-035
    q: A team needs EventBridge Scheduler failures retained after retries. Which configuration and permissions are
      needed?
    a: Configure a standard SQS DLQ and give the Scheduler execution role `sqs:SendMessage` permission. The role
      must also authorize the target invocation.
    facts:
      - schedule-dlq
      - execution-role
  - id: eventbridge-036
    q: An existing scheduled EventBridge rule must create EBS snapshots without a Lambda function. Which target is
      available?
    a: Use the built-in EBS `CreateSnapshot` target. Scheduled rules use the default bus and UTC; AWS recommends
      Scheduler for new scheduled invocations.
    facts:
      - snapshot-target
      - legacy-rules
  - id: eventbridge-037
    q: Does disabling the EventBridge Scheduler flexible time window guarantee invocation at an exact second?
    a: No. Scheduler still invokes with 60-second precision.
    trap: true
    facts:
      - schedule-precision
      - window
---
EventBridge Scheduler invokes a target at a chosen time or on a recurring schedule. It supports local time zones and flexible delivery windows, so a job can follow a calendar or run within an acceptable interval.

### How it works

1. Choose the schedule expression, text describing when the job runs.

   | Expression | Use | Timing |
   | --- | --- | --- |
   | `rate` | Regular intervals | Without `StartDate`, begins immediately |
   | `cron` | Calendar-based recurrence | Six fields: minutes, hours, day of month, month, day of week, year |
   | `at` | One-time invocation | Runs at the specified date and time |

2. For cron or one-time execution, choose an IANA time zone, a named set of local clock rules. Scheduler handles daylight saving changes. A nonexistent spring cron time is skipped; a repeated autumn time runs once.
3. Set the flexible time window to `OFF` or choose a window within which invocation can occur. Even with the window off, precision is 60 seconds.
4. Provide an execution role, an IAM role assumed by `scheduler.amazonaws.com`, with permission to call the target.
5. Configure retry age, retry count, and a standard SQS DLQ for failed invocations. Grant the execution role permission to send messages to the DLQ.

Legacy scheduled rules use the default event bus, UTC, and at least one-minute precision. AWS recommends Scheduler for scheduled invocations. An existing rule can directly target the EBS `CreateSnapshot` API without a Lambda intermediary.

### Exam cues

- If the question says run once in a named time zone, think Scheduler with `at`, because one-time scheduling and time zones are supported.
- If the question says keep the same local daily time, think cron with the local time zone, because a rate day is always 24 hours.
- If the question says distribute jobs within an acceptable interval, think a flexible time window, because Scheduler can spread invocations within it.
- If the question says retain failed scheduled invocations, think a standard SQS DLQ plus execution-role permissions, because Scheduler must deliver the failure there.

### Remember

- Types: `rate`, `cron`, and `at`.
- Precision: 60 seconds with no flexible window.
- Retry configuration: 60 to 86400 seconds of event age and 0 to 185 retries; the first exhausted limit stops retries.
- A rate day is 24 hours, including daylight saving transitions.

> **Trap:** Turning the flexible window off does not provide exact-second execution. Scheduler still uses 60-second precision.
