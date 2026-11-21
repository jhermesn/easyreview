---
title: Operational events and timing
level: professional
order: 70
facts:
  - id: pattern-and-or
    text: Pattern fields combine with AND, values in one array combine with OR, and $or combines alternatives
      across fields.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
  - id: suffix
    text: The suffix operator matches the end of a string.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-suffix-matching
  - id: cidr
    text: The cidr operator matches IP addresses within an IPv4 or IPv6 network range.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
  - id: ignore-case
    text: The equals-ignore-case operator matches strings regardless of letter case.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-equals-ignore-case-matching
  - id: exact-match
    text: Ordinary string matching is case sensitive.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern.html#eb-create-pattern-considerations
  - id: asg-lifecycle
    text: Auto Scaling lifecycle hooks generate EventBridge events when instances enter a wait state.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html
  - id: asg-refresh
    text: Auto Scaling instance refresh emits events for checkpoints, start, success, failure, cancellation, and
      rollback state changes.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-eventbridge-events.html
  - id: health-exposure
    text: An AWS Health AWS_RISK_CREDENTIALS_EXPOSED event can trigger a rule that starts a Step Functions
      remediation workflow.
    source: https://aws.amazon.com/blogs/compute/automate-your-it-operations-using-aws-step-functions-and-amazon-cloudwatch-events/
  - id: xray-insights
    text: Enable insights and notifications on an X-Ray group to send insight events through EventBridge.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-console-insights.html
  - id: dst-once
    text: A cron invocation at a repeated local time during the autumn daylight saving transition runs only once, at the second occurrence after the shift.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#daylist-savings-time
  - id: dst-skip
    text: A cron invocation at a nonexistent local time during the spring daylight saving transition is skipped.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#daylist-savings-time
  - id: schedule-precision
    text: Scheduler invokes targets with 60-second precision when no flexible time window is set.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#schedule-types
  - id: window
    text: A flexible time window spreads target invocation within the configured window; choose OFF to disable it.
    source: https://docs.aws.amazon.com/scheduler/latest/UserGuide/managing-schedule-flexible-time-windows.html
cards:
  - id: eventbridge-017
    q: An EventBridge pattern must accept either of two states and also require one source. How do its conditions
      combine?
    a: Put both states in one array for OR and specify the source in a separate field for AND. Use `$or` for
      alternatives across fields.
    facts:
      - pattern-and-or
  - id: eventbridge-018
    q: Which EventBridge operators match a filename ending, a network range, and a string regardless of case?
    a: Use `suffix`, `cidr`, and `equals-ignore-case`, respectively. Ordinary string matching is case sensitive.
    facts:
      - suffix
      - cidr
      - ignore-case
      - exact-match
  - id: eventbridge-038
    q: A team needs an EventBridge response when an Auto Scaling instance is held for launch preparation, and
      progress alerts during an instance refresh. Which events should it select?
    a: Select lifecycle action events for the hook wait state and instance refresh events for checkpoints and
      refresh status changes.
    facts:
      - asg-lifecycle
      - asg-refresh
  - id: eventbridge-039
    q: A team wants EventBridge to start remediation for an exposed IAM access key reported by AWS Health. Which
      event identifies the condition?
    a: Match the AWS Health event type code `AWS_RISK_CREDENTIALS_EXPOSED` and target a Step Functions remediation
      workflow.
    facts:
      - health-exposure
  - id: eventbridge-041
    q: A team enabled an X-Ray group but receives no EventBridge notifications for detected fault-rate insights.
      Which settings are required?
    a: Enable both insights and notifications on the group.
    facts:
      - xray-insights
  - id: eventbridge-034
    q: An EventBridge Scheduler cron time occurs twice when clocks move backward. How many scheduled invocations
      occur for that local time?
    a: One. A repeated autumn time runs only once; a nonexistent spring time is skipped.
    trap: true
    facts:
      - dst-once
      - dst-skip
  - id: eventbridge-037
    q: Does disabling the EventBridge Scheduler flexible time window guarantee invocation at an exact second?
    a: No. Scheduler still invokes with 60-second precision.
    trap: true
    facts:
      - schedule-precision
      - window
---
EventBridge patterns select operational events for a response, while EventBridge Scheduler controls when a target is invoked. Pattern operators and schedule timing determine which events and invocations reach their targets.

### How it works

1. Build an event pattern. Different fields combine with AND, values in one array combine with OR, and `$or` offers alternatives across fields.
2. Select operators for the values: `suffix` matches a string ending, `cidr` matches an IPv4 or IPv6 network range, and `equals-ignore-case` ignores letter case.
3. Select operational events. Auto Scaling lifecycle hooks emit events when an instance enters a wait state. Instance refresh emits checkpoint and status events, including rollback changes.
4. For an exposed credential, match the AWS Health event `AWS_RISK_CREDENTIALS_EXPOSED` and start a Step Functions remediation workflow. For X-Ray insight events, enable both insights and notifications on the group.
5. For Scheduler, choose a flexible time window to spread invocations, or set it to `OFF`. Consider daylight saving transitions when a cron schedule uses local time.

### Exam cues

- If the question says accept either of two states from one source, think two values in one array and a separate source field, because values combine with OR and fields with AND.
- If the question says match a filename ending, an IP network, or a string in any letter case, think `suffix`, `cidr`, or `equals-ignore-case`, respectively.
- If the question says respond to a lifecycle hook wait or track an instance refresh, think lifecycle action events or instance refresh events, because they report those respective conditions.
- If the question says remediate an exposed access key, think `AWS_RISK_CREDENTIALS_EXPOSED` and a Step Functions target.
- If the question says X-Ray insights are missing from EventBridge, think both group settings, because insights and notifications must be enabled.

### Remember

- Ordinary string matching is case sensitive.
- A nonexistent spring cron time is skipped. A repeated autumn time runs once, at its second occurrence after the shift.
- With no flexible time window, Scheduler invokes with 60-second precision.

> **Trap:** A repeated autumn cron time does not run twice. Disabling the flexible window also does not guarantee an exact-second invocation.
