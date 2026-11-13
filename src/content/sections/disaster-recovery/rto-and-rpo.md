---
title: RTO and RPO
level: associate
order: 10
facts:
  - id: rto
    text: Recovery time objective (RTO) is the longest acceptable interval from service interruption to
      service restoration.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: rpo
    text: Recovery point objective (RPO) limits the acceptable age of the last recoverable data when
      service is interrupted.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: business-targets
    text: Set recovery objectives from business impact, cost, dependencies and compliance requirements.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: backup-interval
    text: Backup frequency determines the recoverable point for a backup-based recovery plan.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: async-loss
    text: Aurora Global Database asynchronous replication can lose unreplicated changes during unplanned
      failover; loss depends on replication lag.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: measure-recovery
    text: Test recovery paths to show that the workload recovers within its time target and to the
      required data state.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html#rel_planning_for_recovery_dr_tested
  - id: independent-targets
    text: RTO constrains downtime while RPO constrains lost data; choosing a stricter target than the
      business needs adds cost and complexity.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: disaster-recovery
    text: Disaster recovery prepares a workload to respond to a serious disruption using business
      objectives for downtime and data loss.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/introduction.html#introduction
cards:
  - id: disaster-recovery-002
    q: What do RPO and RTO measure in AWS disaster recovery?
    a: RPO limits lost data in units of time. RTO limits how long service can remain unavailable.
    facts:
      - rto
      - rpo
  - id: disaster-recovery-008
    q: Does asynchronous cross-Region replication in Aurora Global Database guarantee zero data loss
      during an unplanned outage?
    a: No. Changes not yet replicated can be lost; inspect replication lag when assessing recovery.
    trap: true
    facts:
      - async-loss
  - id: disaster-recovery-016
    q: How should a business set RTO and RPO for an AWS workload?
    a: Use business impact and recovery requirements, including dependencies, cost and compliance. Then
      test the recovery path.
    facts:
      - business-targets
      - measure-recovery
  - id: disaster-recovery-017
    q: An AWS application replicates its data frequently but takes hours to rebuild. Does a low RPO
      prove a low RTO?
    a: No. RPO limits data loss; RTO limits downtime. Measure the entire recovery path.
    trap: true
    facts:
      - independent-targets
      - measure-recovery
  - id: disaster-recovery-018
    q: An AWS workload requirement limits the age of recoverable data and the delay until service
      returns. Which recovery objective corresponds to each limit?
    a: RPO limits the age of recoverable data; RTO limits the delay until service returns. Test both
      against the business targets.
    facts:
      - rto
      - rpo
      - measure-recovery
  - id: disaster-recovery-020
    q: An AWS workload resumes service within its downtime target but restores data older than its
      permitted loss window. Which objective did it miss?
    a: RPO. Meeting RTO does not establish that the recovered data is recent enough.
    facts:
      - rto
      - rpo
---
Disaster recovery restores a workload after a serious disruption. Recovery time objective (RTO) is the downtime the business can accept. Recovery point objective (RPO) is the data loss it can accept, expressed as time.

### How it works

1. Set both objectives from business impact, dependencies and compliance needs.
2. Choose a backup interval or replication design that can preserve recent enough data. Asynchronous replication copies changes after the source accepts them, so some changes can still be in transit when it fails.
3. Choose a recovery procedure that restores service within the downtime target.
4. Test the procedure. Compare the time until service returns with RTO and the age of recoverable data with RPO.

### Exam cues

- If the question says data loss must stay within a stated interval, think RPO, because it limits the age of the recovery point.
- If the question says service must return within a stated interval, think RTO, because it limits downtime.
- If the question says asynchronous replication guarantees no lost writes, think replication lag, because unreplicated changes can be lost.

### Remember

- RTO measures time forward from interruption to restoration.
- RPO measures the acceptable gap between the recoverable data and interruption.
- Backup frequency affects the recoverable point. A configured schedule still needs a recovery test.

> **Trap:** A low RPO does not prove fast service restoration. Data freshness and recovery duration are separate targets.
