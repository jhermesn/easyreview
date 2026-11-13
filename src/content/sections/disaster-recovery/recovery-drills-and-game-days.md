---
title: Recovery drills and game days
level: professional
order: 60
facts:
  - id: game-day
    text: A game day rehearses workload-impacting failures with the teams and procedures that would
      handle a real incident.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_game_days_resiliency.html#rel_testing_resiliency_game_days_resiliency
  - id: plan-exercise
    text: Plan game day scope and objectives, notify participants and involve technical and business
      stakeholders.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_game_days_resiliency.html#rel_testing_resiliency_game_days_resiliency
  - id: observe-learn
    text: Observe the exercise, stop or roll back harmful tests and incorporate findings into procedures
      and systems.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_testing_resiliency_game_days_resiliency.html#rel_testing_resiliency_game_days_resiliency
  - id: measure
    text: Regular failover tests must establish that the recovery site works and meets RTO and RPO.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html#rel_planning_for_recovery_dr_tested
  - id: load
    text: A secondary site that handled a previous test may be too small for the present failover load.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html#rel_planning_for_recovery_dr_tested
  - id: drill
    text: Elastic Disaster Recovery drills launch test instances through the recovery process without
      affecting source servers or ongoing replication.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback.html#drs-terminology
  - id: drill-no-traffic
    text: Elastic Disaster Recovery can launch drill instances without redirecting production traffic.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html#rel_planning_for_recovery_dr_tested
  - id: failback-test
    text: Elastic Disaster Recovery guidance recommends including failback in the initial drill and some
      regular drills.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: stop-alarm
    text: An AWS FIS stop condition uses a CloudWatch alarm to stop an experiment if a defined threshold
      is reached; a stopped experiment cannot resume.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html#stop-conditions
  - id: faults
    text: Testing a clean Region switch alone does not establish behavior during failure; inject
      expected failure scenarios and test recovery under them.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-multi-region-fundamentals/fundamental-4.html#4e-testing
cards:
  - id: disaster-recovery-019
    q: What is an AWS resilience game day?
    a: A planned rehearsal of a workload-impacting event using the people, procedures and systems that
      would respond to a real incident. Record findings and improve the recovery process.
    facts:
      - game-day
      - plan-exercise
      - observe-learn
  - id: disaster-recovery-029
    q: An AWS team monitors successful replication but has never restored its workload. Has it
      demonstrated its RTO and RPO?
    a: No. Run recovery tests, measure restored service and data, and confirm the secondary can handle
      the failover load.
    trap: true
    facts:
      - measure
      - load
  - id: disaster-recovery-030
    q: An EC2 workload needs a recovery rehearsal without redirecting production traffic or interrupting
      replication. What feature fits?
    a: Elastic Disaster Recovery drill instances. They exercise the recovery launch process without
      affecting source servers or ongoing replication.
    facts:
      - drill
      - drill-no-traffic
  - id: disaster-recovery-031
    q: An AWS FIS game day must stop when application latency breaches the allowed threshold. What
      should the team configure?
    a: A CloudWatch alarm used as an FIS stop condition. FIS stops the experiment when the condition is
      triggered.
    facts:
      - stop-alarm
---
A game day rehearses a failure with the people who would respond to it. A recovery drill exercises the restoration procedure. Both expose problems in dependencies, capacity and communication before the team relies on the plan.

### How it works

1. Choose a business-critical workload, failure scenario and exercise objectives. Notify the technical responders and business stakeholders.
2. Run the recovery procedure and observe the application. Elastic Disaster Recovery drill instances can exercise recovery without redirecting production traffic or interrupting replication.
3. Measure recovery time objective (RTO), the downtime target, and recovery point objective (RPO), the permitted data loss in time. Check the secondary site's ability to carry the recovery load.
4. Exercise failures as well as clean switches. For fault injection with AWS Fault Injection Service (FIS), use a CloudWatch alarm as a stop condition, a threshold that stops the experiment.
5. Review findings, update the runbook and track fixes. Include failback, the return to the original site, in the initial DRS drill and some later drills.

### Exam cues

- If the question says replication is healthy so recovery is proven, think a recovery test, because copying data does not demonstrate restoration time or usable capacity.
- If the question says EC2 recovery must be rehearsed without moving user traffic, think DRS drill instances, because they can launch without traffic redirection.
- If the question says a fault experiment must stop at an application threshold, think an FIS stop condition backed by a CloudWatch alarm, because it stops the experiment when triggered.

### Remember

- Involve business stakeholders as well as technical responders.
- Test present failover load; earlier capacity results can become stale.
- A stopped FIS experiment cannot resume.
- Incorporate findings into the recovery process.

> **Trap:** A successful clean Region switch does not prove recovery under a fault. Test the expected failure scenarios too.
