---
title: Recovery strategy selection
level: associate
order: 20
facts:
  - id: backup-restore
    text: Backup and restore keeps backups and redeploys infrastructure, configuration and application
      code during recovery.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: iac
    text: Infrastructure as code (IaC) defines infrastructure in deployable templates; recovery also
      needs code, configuration and machine images.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: pilot
    text: Pilot light keeps replicated data and core resources available but needs additional actions
      before it can process requests.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: warm
    text: Warm standby keeps a working workload at reduced capacity and scales it up for recovery.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: hot
    text: Hot standby is a standby deployment provisioned at full capacity.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: active
    text: Multi-site active-active serves traffic from multiple Regions and must handle data
      synchronization and write conflicts.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: tradeoff
    text: Select a recovery strategy that meets business recovery objectives without unnecessary cost or
      complexity.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: typical-backup
    text: AWS illustrates backup and restore with RPO in hours and RTO within 24 hours; these are
      indicative strategy ranges.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: typical-pilot
    text: AWS illustrates pilot light with RPO in minutes and RTO in tens of minutes.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: typical-warm
    text: AWS illustrates warm standby with RPO in seconds and RTO in minutes.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: typical-active
    text: AWS illustrates multi-site active-active with near-zero RPO and potentially zero RTO.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: aurora-failover
    text: Aurora Global Database recovery can take minutes, with potential data loss determined by
      asynchronous replication lag.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: rds-promotion
    text: RDS read replica promotion reboots the instance and can take several minutes or longer,
      depending on replica size.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html#USER_ReadRepl.Promote
  - id: dynamo-writes
    text: DynamoDB global tables accept writes in replica Regions and copy changes to other replicas.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html#V2globaltables_HowItWorks.KeyConcepts
  - id: mrec-conflicts
    text: DynamoDB global tables default to multi-Region eventual consistency (MREC), which uses
      asynchronous replication and last-writer-wins conflict resolution.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html#V2globaltables_HowItWorks.consistency-modes.mrec
  - id: aurora-writes
    text: Aurora global database write forwarding sends writes from secondary clusters to the primary
      cluster; data changes first at the primary.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-write-forwarding.html#aurora-global-database-write-forwarding
  - id: test-capacity
    text: Recovery testing must establish that the secondary site can handle the failover load and meet
      the recovery targets.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_dr_tested.html#rel_planning_for_recovery_dr_tested
  - id: rto
    text: RTO is the maximum acceptable downtime between interruption and service restoration.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: rpo
    text: RPO is the maximum acceptable time gap between the last recoverable data and interruption.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html#rel_planning_for_recovery_objective_defined_recovery
  - id: routing
    text: Route 53 health checks and ARC routing controls provide failover through data plane operations.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/best-practices-dns.html#best-practices-dns
  - id: backups
    text: Keep point-in-time backups or versioned data in the recovery site because continuous
      replication can copy destructive changes.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: pilot-switched-off
    text: "In pilot light, data stores replicate continuously to the recovery Region while application servers stay switched off; AWS recommends not deploying them at all and deploying them from infrastructure as code such as CloudFormation when failover starts."
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
  - id: pilot-golden-ami
    text: "For EC2 in pilot light, golden AMIs, for example from an EC2 Image Builder pipeline, are copied to the recovery Region ahead of time so servers can be launched there."
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-1
  - id: pilot-promote
    text: "Failing over to a cross-Region RDS read replica means promoting it to the primary; for engines other than Aurora this takes a few minutes and includes a reboot."
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-1
diagrams:
  - id: dr-failover-pilot-warm
    title: Failover to a recovery Region (pilot light or warm standby)
    width: 1000
    height: 570
    groups:
      - label: Primary Region
        icon: group-region
        x: 25
        y: 30
        w: 375
        h: 510
        tone: mgmt
      - label: Recovery Region
        icon: group-region
        x: 600
        y: 30
        w: 375
        h: 510
        tone: mgmt
    nodes:
      - id: app1
        label: App fleet
        sub: full capacity
        icon: res-ec2-instances
        x: 75
        y: 120
        w: 180
        h: 86
        tone: compute
        info: Serves all traffic during normal operation.
      - id: db1
        label: Primary database
        sub: read/write
        icon: res-database
        x: 75
        y: 390
        w: 180
        h: 86
        tone: database
        info: The primary database accepts writes. This example uses asynchronous replication to a recovery
          Region.
      - id: dns
        label: Route 53 / ARC
        sub: failover routing
        icon: route-53
        x: 413
        y: 225
        w: 140
        h: 86
        tone: network
        info: Route 53 health checks can fail over automatically. **Application Recovery Controller**
          routing controls give a data plane on/off switch for manual failover.
      - id: app2
        label: Standby app
        sub: off or scaled down
        icon: res-ec2-instances
        x: 675
        y: 120
        w: 180
        h: 86
        tone: compute
        info: "**Pilot light**: servers are not running, only core pieces exist, so you start and scale
          them. **Warm standby**: a small working fleet already runs, so you only scale up."
      - id: db2
        label: Replica database
        sub: always on
        icon: res-database
        x: 675
        y: 390
        w: 180
        h: 86
        tone: database
        info: The replica receives changes asynchronously. Unreplicated changes can be lost during failover.
          Keep point-in-time backups as well.
    edges:
      - from: db1
        to: db2
        step: 1
        label: async replication
      - from: dns
        to: app1
        step: 2
        label: normal
      - from: dns
        to: app2
        step: 3
        label: failover
        dashed: true
    steps:
      - Replicate data continuously while keeping core infrastructure ready in the recovery Region.
      - During normal operation, Route 53 directs clients to the primary Region.
      - On failover, promote the replica, scale up the standby fleet and shift traffic to the
        recovery Region.
cards:
  - id: disaster-recovery-003
    q: How do AWS disaster recovery strategies progress from lower cost to faster typical recovery?
    a: Backup and restore, pilot light, warm standby, then multi-site active-active. These patterns
      trade cost and complexity for lower typical RTO and RPO; measure the workload.
    facts:
      - backup-restore
      - pilot
      - warm
      - active
      - tradeoff
      - test-capacity
  - id: disaster-recovery-004
    q: What must an AWS backup-and-restore recovery plan preserve besides application data?
    a: Infrastructure templates, application code, configuration and machine images needed to redeploy
      the workload.
    facts:
      - backup-restore
      - iac
  - id: disaster-recovery-005
    q: What separates AWS pilot light from warm standby disaster recovery?
    a: Warm standby can process traffic immediately at reduced capacity. Pilot light needs additional
      resources started or deployed first.
    facts:
      - pilot
      - warm
  - id: disaster-recovery-006
    q: How do warm standby, hot standby and multi-site active-active differ in AWS disaster recovery?
    a: Warm standby runs at reduced capacity. Hot standby has full capacity ready. Multi-site
      active-active serves traffic from multiple Regions during normal operation.
    facts:
      - warm
      - hot
      - active
  - id: disaster-recovery-010
    q: How should a recovery plan compare Aurora Global Database failover with RDS read replica
      promotion?
    a: Aurora recovery can take minutes and can lose unreplicated changes. RDS promotion reboots the
      replica and can take several minutes or longer. Test the complete workload rather than
      assuming a fixed duration.
    facts:
      - aurora-failover
      - rds-promotion
      - test-capacity
  - id: disaster-recovery-011
    q: How do DynamoDB global table writes differ from Aurora global database write forwarding?
    a: DynamoDB replicas accept writes in their own Regions. Aurora secondary clusters forward writes to
      a single primary cluster. Default DynamoDB MREC tables resolve concurrent conflicts using last
      writer wins.
    facts:
      - dynamo-writes
      - mrec-conflicts
      - aurora-writes
  - id: disaster-recovery-014
    q: An AWS workload has a tight recovery budget and can tolerate rebuilding from backups. Which
      disaster recovery pattern should the team assess first?
    a: Backup and restore. Preserve the recovery data, infrastructure templates and application
      configuration, then test that rebuilding meets both objectives.
    facts:
      - backup-restore
      - iac
      - tradeoff
      - test-capacity
  - id: disaster-recovery-015
    q: An AWS application needs a working secondary Region before a failure, but cannot justify full
      standby capacity. Which disaster recovery pattern fits?
    a: Warm standby. Keep a functioning copy at reduced capacity and test scaling it to the failover
      load.
    facts:
      - warm
      - test-capacity
  - id: disaster-recovery-021
    q: An AWS active-active application loses a Region. Is recovery complete simply because the other
      Region was already serving traffic?
    a: No. Verify that the surviving deployment can handle the failover load and that data
      synchronization and write conflict handling meet requirements.
    trap: true
    facts:
      - active
      - test-capacity
  - id: disaster-recovery-035
    q: "A company wants the lowest-cost DR for an EC2 web tier and an RDS database whose RTO allows minutes to rebuild servers. What should exist in the recovery Region before a disaster, and what happens at failover?"
    a: "Keep a cross-Region RDS read replica and copies of the golden AMIs there. At failover, deploy the web tier from a CloudFormation template, promote the replica and point DNS at the new stack."
    facts:
      - pilot-switched-off
      - pilot-golden-ami
      - pilot-promote
---
A disaster recovery strategy determines how much of a workload is ready at the recovery site before a failure. Choose it from acceptable downtime, acceptable data loss and the cost of maintaining that readiness.

### How it works

1. Set recovery time objective (RTO), the acceptable downtime, and recovery point objective (RPO), the acceptable data loss in time.
2. Select the preparation level below. Infrastructure as code (IaC) means templates that can recreate infrastructure; keep application code, configuration and machine images available too.
3. Test data recovery and the application's ability to handle the failover load. The ranges below describe patterns, not a guaranteed workload result.

| Strategy | Ready before failure | Recovery action | Indicative RPO / RTO |
|---|---|---|---|
| Backup and restore | Backups and deployment material | Rebuild and restore | Hours / within 24 hours |
| Pilot light | Data replication and core infrastructure | Deploy or start the missing application resources, then scale | Minutes / tens of minutes |
| Warm standby | Working workload at reduced capacity | Scale up | Seconds / minutes |
| Multi-site active-active | Workloads serving traffic in multiple Regions | Use surviving Regions | Near zero / potentially zero |

Hot standby is a full-capacity standby. Multi-site active-active also needs data synchronization and a way to handle concurrent write conflicts. DynamoDB global tables accept regional writes. Their default multi-Region eventual consistency (MREC) mode copies changes asynchronously and resolves concurrent changes with last writer wins, which keeps the item version with the latest internal timestamp. Aurora global database write forwarding sends secondary writes to the primary cluster.

### Exam cues

- If the question says the recovery copy cannot process requests until application resources start, think pilot light, because only core resources are ready.
- If the question says a small working stack already serves requests, think warm standby, because recovery mainly needs more capacity.
- If the question says each Region must accept database writes, think DynamoDB global tables, because Aurora write forwarding still changes data at its primary.
- If the question says cost is tight and rebuilding meets the targets, think backup and restore, because a stricter strategy adds unnecessary cost.
- If the question says lowest-cost DR where only the data and server images may run in the recovery Region, think pilot light with infrastructure as code, because servers are deployed from templates only at failover.

### Remember

- Warm standby becomes hot standby when provisioned at full capacity.
- Aurora unplanned recovery can take minutes and lose unreplicated changes. RDS read replica promotion includes a reboot and can take several minutes or longer.
- Measure full recovery, including data, application capacity and traffic movement.

> **Trap:** A strategy's typical RTO is not a promise. A database promotion time alone does not establish the application's RTO.
