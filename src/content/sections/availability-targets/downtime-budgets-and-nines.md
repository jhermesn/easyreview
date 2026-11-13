---
title: Downtime budgets and nines
level: associate
order: 20
facts:
  - id: time-ratio
    text: Time-based availability is usable time divided by total time over a specified measurement
      period.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: downtime-budget
    text: Rearranging the time-based availability formula gives allowed downtime as total time
      multiplied by one minus target availability, using availability as a fraction.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: nines-meaning
    text: Five nines means 99.999% availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: annual-99
    text: AWS lists approximately 3 days 15 hours of annual unavailability for a 99% target.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: annual-999
    text: AWS lists approximately 8 hours 45 minutes of annual unavailability for a 99.9% target.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: annual-9995
    text: AWS lists approximately 4 hours 22 minutes of annual unavailability for a 99.95% target.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: annual-9999
    text: AWS lists approximately 52 minutes of annual unavailability for a 99.99% target.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: annual-99999
    text: AWS lists approximately 5 minutes of annual unavailability for a 99.999% target.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: planned-downtime
    text: The strict availability interpretation includes scheduled and unscheduled interruptions; AWS
      advises against excluding scheduled downtime.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: request-ratio
    text: Availability can be measured as successful responses divided by valid requests.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: request-periods
    text: AWS describes measuring request-based availability in one-minute or five-minute periods and
      averaging periods for monthly uptime; an interval without requests counts as 100% available.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
cards:
  - id: availability-targets-001
    q: A business permits roughly 50 minutes of yearly unavailability for its order system. Which
      availability tier is closest?
    a: 99.99%. AWS lists about 52 minutes of annual unavailability at that target.
    facts:
      - annual-9999
  - id: availability-targets-010
    q: How do you turn a workload availability target into a downtime budget?
    a: Multiply the measurement period by one minus the target expressed as a fraction. Keep the target
      and budget on the same time basis.
    facts:
      - time-ratio
      - downtime-budget
  - id: availability-targets-011
    q: A workload must meet five nines annually. How much annual unavailability does AWS list for that
      tier?
    a: About 5 minutes for 99.999% availability.
    facts:
      - nines-meaning
      - annual-99999
  - id: availability-targets-012
    q: A team excludes planned maintenance from its workload availability report to meet its target.
      Does AWS recommend this approach?
    a: No. AWS advises against excluding scheduled downtime, because users may still need the workload
      during maintenance.
    trap: true
    facts:
      - planned-downtime
---
A downtime budget is the amount of unavailability compatible with an availability target over a stated period. Nines are shorthand for availability percentages: five nines means 99.999%. [AWS availability definitions](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability)

### How it works

1. Choose the measurement period and define when the workload is usable. Time-based availability is usable time divided by total time.
2. Express the target as a fraction. Rearranging that ratio gives `allowed downtime = period × (1 - target availability)`.
3. Compare interruptions against that budget using the same period. Under the strict interpretation, scheduled and unscheduled interruptions both reduce availability.
4. For request-based measurement, divide successful responses by valid requests. AWS describes one-minute or five-minute intervals, averaged to obtain monthly uptime; an interval with no requests counts as fully available.

### Exam cues

- If the question says roughly 50 minutes of downtime per year, think 99.99%, because AWS lists about 52 minutes at that tier.
- If the question says roughly five minutes per year, think five nines, because that is the annual budget listed for 99.999%.
- If the question says remove maintenance from the calculation, think the agreed workload measurement and AWS's advice to include it, because users can need the service during planned work.

### Remember

| Availability target | Approximate annual downtime from AWS's table |
|---|---|
| 99% | 3 days 15 hours |
| 99.9% | 8 hours 45 minutes |
| 99.95% | 4 hours 22 minutes |
| 99.99% | 52 minutes |
| 99.999% | 5 minutes |

These are rounded annual values. Use the actual measurement period when calculating a budget. [AWS nines table and measurement methods](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability)

> **Trap:** An annual downtime table does not give a monthly allowance. Calculate from the period named in the requirement.
