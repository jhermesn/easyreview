---
title: Dependency and redundancy calculations
level: professional
order: 30
facts:
  - id: hard-dependency
    text: A hard dependency is a component whose failure prevents the workload from performing its
      function.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies
  - id: soft-dependency
    text: A soft dependency can fail while the application compensates for or tolerates that failure.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies
  - id: serial-formula
    text: For independent required components, theoretical workload availability is the product of their
      availabilities.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: serial-two
    text: Using the required-component formula, two independent components each available 99.9% give
      0.999 multiplied by 0.999, or 99.8001% availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: serial-three
    text: AWS gives three independent required components at 99.99% each as approximately 99.97%
      theoretical workload availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: redundant-formula
    text: If independent redundant components can each serve the workload alone, theoretical
      availability is one minus the product of their failure probabilities.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-redundancy.html#availability-with-redundancy
  - id: redundant-example
    text: Two independent redundant components at 99.9% each yield 99.9999% theoretical availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: nines-shortcut
    text: For independent redundant components whose availability percentages contain only nines,
      summing the count of nines gives the resulting nines count.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: mtbf-definition
    text: MTBF means mean time between failures and MTTR means mean time to recover.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: mtbf-formula
    text: An availability estimate can be calculated as MTBF divided by the sum of MTBF and MTTR.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: mtbf-example
    text: AWS gives MTBF of 150 days and MTTR of 1 hour as an availability estimate of about 99.97%.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability
  - id: theory-limits
    text: Availability calculations using SLA or SLO figures are rough estimates, not a guarantee of
      actual downtime.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies
  - id: failure-boundary
    text: Resources in one Availability Zone can fail together, so AZ-level sparing must account for the
      loss of all resources in that AZ.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-redundancy.html#availability-with-redundancy
  - id: failover-mechanism
    text: Using redundant spares requires detecting failures, shifting work to healthy resources and
      managing workload capacity.
    source: https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-redundancy.html#availability-with-redundancy
diagrams:
  - id: availability-required-or-redundant
    title: Required components versus independent alternatives
    width: 800
    height: 600
    groups:
      - label: Both components required (illustrative EC2 path)
        x: 20
        y: 20
        w: 760
        h: 190
        tone: neutral
      - label: Either independent replica can serve the workload
        x: 20
        y: 250
        w: 760
        h: 330
        tone: neutral
    nodes:
      - id: required-a
        label: Component A
        sub: must work
        icon: res-ec2-instance
        x: 100
        y: 90
        w: 180
        h: 86
        tone: compute
        info: A required component belongs in the product of availabilities.
      - id: required-b
        label: Component B
        sub: must also work
        icon: res-ec2-instance
        x: 510
        y: 90
        w: 180
        h: 86
        tone: compute
        info: Failure of either required component interrupts this workload function.
      - id: client
        label: Client
        sub: either path
        icon: res-client
        x: 100
        y: 400
        w: 180
        h: 86
        tone: user
        info: The redundant model assumes either alternative can perform the workload function.
      - id: replica-a
        label: Replica A
        sub: independent alternative
        icon: res-ec2-instance
        x: 510
        y: 310
        w: 180
        h: 86
        tone: compute
        info: Both independent alternatives must fail to interrupt the redundant function.
      - id: replica-b
        label: Replica B
        sub: independent alternative
        icon: res-ec2-instance
        x: 510
        y: 460
        w: 180
        h: 86
        tone: compute
        info: Failure detection, work shifting and healthy capacity are needed to use this alternative.
    edges:
      - from: required-a
        to: required-b
        label: both required
      - from: client
        to: replica-a
        label: path A
      - from: client
        to: replica-b
        label: path B
    steps: []
cards:
  - id: availability-targets-003
    q: A workload requires two independent components, each 99.9% available. What is its theoretical
      availability?
    a: 99.8001%. Multiply 0.999 by 0.999 because both components must work.
    facts:
      - hard-dependency
      - serial-formula
      - serial-two
  - id: availability-targets-004
    q: A workload can use either of two independent redundant components, each 99.9% available. What is
      its theoretical availability?
    a: 99.9999%. Calculate 1 - (0.001 × 0.001), because both independent components must fail to stop
      the workload.
    facts:
      - redundant-formula
      - redundant-example
  - id: availability-targets-005
    q: How can a workload designer estimate dependency availability from MTBF and MTTR?
    a: Use MTBF / (MTBF + MTTR), with both durations in the same unit. AWS gives 150 days MTBF and 1
      hour MTTR as about 99.97%.
    facts:
      - mtbf-definition
      - mtbf-formula
      - mtbf-example
  - id: availability-targets-013
    q: An application tolerates failure of an optional dependency and still performs its agreed
      function. Should that dependency be treated as required in the serial availability product?
    a: No. It is a soft dependency for that function because the application compensates for its
      failure.
    trap: true
    facts:
      - soft-dependency
      - hard-dependency
      - serial-formula
  - id: availability-targets-014
    q: Two EC2 replicas share one Availability Zone. Can a designer assume their AZ failure risks are
      independent?
    a: No. Resources in one AZ can fail together. Model the AZ as a shared failure boundary and add
      redundancy across that boundary.
    trap: true
    facts:
      - failure-boundary
  - id: availability-targets-015
    q: Does multiplying the SLA percentages of a workload's dependencies predict its actual annual
      downtime?
    a: No. It gives a rough theoretical estimate. SLA figures do not guarantee actual downtime and
      dependencies can exceed them.
    trap: true
    facts:
      - theory-limits
---
Availability calculations depend on what must work together. A hard dependency must work for the workload to perform its function. A soft dependency can fail while the application compensates. Redundant components are alternatives that can keep the function available when another component fails. [AWS dependency model](https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies) · [Redundancy model](https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-redundancy.html#availability-with-redundancy)

### How it works

1. Identify required components, including the application itself. For independent hard dependencies, multiply their availability fractions.
2. Identify alternatives that can each handle the workload alone. Calculate the probability that all alternatives fail by multiplying their independent failure probabilities, then subtract that value from one.
3. Check the independence assumption. An Availability Zone is a shared failure boundary: its resources can fail together. Redundancy needs failure detection, work shifting and enough healthy capacity.
4. If a component has no published availability guidance, estimate it from mean time between failures, or MTBF, and mean time to recover, or MTTR. Use `MTBF / (MTBF + MTTR)`, with both durations in the same unit. [AWS formulas](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html#availability)

| Arrangement | Calculation with availability fractions | Example |
|---|---|---|
| Both independent components required | `A × B` | `0.999 × 0.999 = 99.8001%` |
| Either independent component sufficient | `1 - ((1 - A) × (1 - B))` | Two 99.9% alternatives give 99.9999% |
| Estimate from failure and recovery duration | `MTBF / (MTBF + MTTR)` | 150 days and 1 hour give about 99.97% |

### Exam cues

- If the question says every independent dependency must work, think multiplication, because failure of any required component stops the workload function.
- If the question says either independent replica can serve all work, think one minus the product of failure probabilities, because all replicas must fail to stop service.
- If the question says both replicas share one AZ, think a shared failure boundary, because an AZ failure can affect both together.

### Remember

- Three independent required components at 99.99% each give approximately 99.97% theoretical availability.
- Two independent alternatives at 99.9% each give 99.9999% theoretical availability.
- The nines shortcut adds nines only for independent redundant alternatives whose percentages consist entirely of nines.
- Calculations based on SLA or SLO figures are rough estimates. An SLO, or service-level objective, is an availability goal. [Limits of SLA-based estimates](https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/availability-with-dependencies.html#availability-with-dependencies)

> **Trap:** Two copies do not automatically justify the independent-redundancy formula. Shared failure boundaries, failure detection and surviving capacity must fit the model.
