---
title: Alarm evaluation and missing data
level: associate
order: 30
facts:
  - id: alarm-states
    text: A metric alarm has OK, ALARM, and INSUFFICIENT_DATA states.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-states
  - id: m-of-n
    text: Evaluation Periods specifies N recent periods and Datapoints to Alarm specifies M breaches;
      breaching points need not be consecutive.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
  - id: alarm-cadence
    text: Alarms with periods of at least 1 minute evaluate every minute unless their total evaluation
      interval exceeds 1 day.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
  - id: short-cadence
    text: Alarms with 10-, 20-, or 30-second periods evaluate every 10 seconds.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#alarm-evaluation-settings
  - id: multiday-cadence
    text: An alarm whose period multiplied by evaluation periods exceeds 1 day evaluates hourly.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#evaluate-multiday-alarm
  - id: missing-default
    text: The default missing-data option is missing; an entirely missing evaluation range yields
      INSUFFICIENT_DATA.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: missing-good
    text: notBreaching treats missing data as within the threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: missing-bad
    text: breaching treats missing data as violating the threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: missing-ignore
    text: ignore retains the current alarm state when missing-data handling is required.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: missing-minimal
    text: With the default sliding window, CloudWatch retrieves extra data and uses the missing-data
      setting only when too few real points are available.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-evaluating-missing-data
  - id: sparse-errors
    text: For a metric that reports only errors, notBreaching prevents absent error data from being
      treated as a fault.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: heartbeat
    text: For a continually reporting application health metric, breaching can make missing telemetry
      indicate a problem.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: ec2-missing
    text: AWS recommends missing and actions only in ALARM for EC2 alarms that stop, terminate, reboot,
      or recover instances.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
cards:
  - id: cloudwatch-007
    q: A CloudWatch metric alarm uses Datapoints to Alarm=3 and Evaluation Periods=5. With all data
      present, when does it enter ALARM?
    a: When at least 3 of the 5 recent datapoints breach. They need not be consecutive. For periods of
      at least 1 minute, evaluation normally happens every minute; intervals longer than 1 day
      evaluate hourly.
    facts:
      - m-of-n
      - alarm-cadence
      - multiday-cadence
  - id: cloudwatch-008
    q: What are the four CloudWatch alarm missing-data settings and the default?
    a: missing is the default and gives INSUFFICIENT_DATA when all data is absent. notBreaching treats
      gaps as good; breaching treats them as bad; ignore retains the state. CloudWatch fills gaps
      only when it lacks enough real points.
    facts:
      - missing-default
      - missing-good
      - missing-bad
      - missing-ignore
      - missing-minimal
  - id: cloudwatch-009
    q: A CloudWatch application error-count metric emits data only when errors occur. Which missing-data
      setting fits?
    a: notBreaching, because no error data should not imply a fault. For a continually reporting
      heartbeat, breaching can be appropriate. For EC2 stop, terminate, reboot, or recover alarms,
      AWS recommends missing.
    facts:
      - sparse-errors
      - heartbeat
      - ec2-missing
  - id: cloudwatch-050
    q: A CloudWatch application heartbeat must report continuously. How can an alarm detect loss of the
      heartbeat?
    a: Treat missing data as breaching. This makes absent expected health telemetry count toward the
      alarm condition.
    facts:
      - heartbeat
      - missing-bad
  - id: cloudwatch-051
    q: A CloudWatch alarm has a 30-second period. Does it wait 30 seconds between evaluations?
    a: No. Alarms with 10-, 20-, or 30-second periods evaluate every 10 seconds. The period and
      evaluation cadence are different settings.
    trap: true
    facts:
      - short-cadence
---
A CloudWatch metric alarm compares a measurement or expression with a threshold. Its period defines each measurement interval; its evaluation settings decide how many breaches indicate a problem.

### How it works

1. Choose the metric or expression, statistic, threshold, and period.
2. Set Evaluation Periods to N and Datapoints to Alarm to M. The alarm counts M breaches within N periods; breaches need not be consecutive.
3. With the default sliding window, CloudWatch looks farther back for real points before filling missing data. The missing-data setting matters only when it cannot obtain enough real points.
4. Evaluate as OK, ALARM, or INSUFFICIENT_DATA, meaning healthy, breaching, or unable to decide from the available data.

| Missing-data setting | Meaning when gaps must be filled |
| --- | --- |
| `missing` | Default; an entirely absent evaluation range gives INSUFFICIENT_DATA |
| `notBreaching` | Treat gaps as healthy |
| `breaching` | Treat gaps as a problem |
| `ignore` | Keep the current state |

### Exam cues

- If the question says a metric emits only on application errors, think `notBreaching`, because silence does not indicate errors.
- If the question says a heartbeat must always report, think `breaching`, because silence can indicate failure.
- If the question says stop or recover EC2 automatically, think `missing` with actions only in ALARM, because metric interruptions can occur while the instance is healthy.

### Remember

- Three out of five means any 3 breaches among 5 available periods, not necessarily consecutive.
- Periods of at least 1 minute normally evaluate each minute.
- Periods of 10, 20, or 30 seconds evaluate each 10 seconds.
- Evaluation intervals longer than 1 day evaluate hourly.

> **Trap:** Selecting `breaching` does not force every absent recent point to count as bad. The default sliding window first uses real points from its wider evaluation range.
