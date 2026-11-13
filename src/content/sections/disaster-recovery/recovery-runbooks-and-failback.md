---
title: Recovery runbooks and failback
level: professional
order: 50
facts:
  - id: runbook
    text: Document recovery roles, initiation criteria, dependency handling and a way to stop unsafe
      recovery automation.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_auto_recovery.html#rel_planning_for_recovery_auto_recovery
  - id: hard-dependency
    text: A hard dependency is required for operation with no substitute; a soft dependency can use a
      substitute or reduced functionality.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_auto_recovery.html#rel_planning_for_recovery_auto_recovery
  - id: recovery-ready
    text: Recovery planning should identify missing or corrupt data, prepare caches and define checks
      that confirm successful restoration.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_auto_recovery.html#rel_planning_for_recovery_auto_recovery
  - id: independent-recovery
    text: Recovery procedures must work when the primary site and its control plane are inaccessible.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_auto_recovery.html#rel_planning_for_recovery_auto_recovery
  - id: orchestrate
    text: Systems Manager Automation and Step Functions can orchestrate complex recovery workflows.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_auto_recovery.html#rel_planning_for_recovery_auto_recovery
  - id: regional-preparation
    text: Prepare regional permissions and service quotas before relying on a standby Region.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-multi-region-fundamentals/fundamental-4.html#4a-account-management
  - id: decision
    text: AWS multi-Region guidance recommends automated failover actions with a human activation
      decision for regional recovery.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/aws-multi-region-fundamentals/fundamental-4.html#4d-processes-procedures
  - id: drs-recovery
    text: Elastic Disaster Recovery launches recovery instances from replicated data; traffic
      redirection is performed outside the service.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback.html#drs-terminology
  - id: drs-order
    text: Elastic Disaster Recovery recovery plans can recover dependent server groups in a defined
      order with wait times between groups.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback.html#drs-failover-faq
  - id: failback
    text: Failback returns workloads to their original infrastructure after recovery; Elastic Disaster
      Recovery supports reverse data replication for this return.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback.html#drs-failback-faq
  - id: test-return
    text: Regular drills should include failback and feed findings back into the recovery plan.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
cards:
  - id: disaster-recovery-001
    q: What should an AWS regional recovery runbook coordinate?
    a: Initiation criteria and responders, required dependencies, data and application recovery, traffic
      movement, checks for restored service, and a tested return to the original site. Provide a way
      to halt unsafe automation.
    facts:
      - runbook
      - hard-dependency
      - recovery-ready
      - drs-recovery
      - failback
      - test-return
  - id: disaster-recovery-026
    q: Elastic Disaster Recovery has launched all recovery instances. Must the team still arrange
      production traffic redirection?
    a: Yes. DRS launches recovery instances; failover traffic redirection is performed separately, for
      example through Route 53.
    trap: true
    facts:
      - drs-recovery
  - id: disaster-recovery-027
    q: An AWS regional recovery workflow depends on an API hosted only in the failed primary site. What
      design change is needed?
    a: Make recovery executable independently of the primary site and its control plane. Prepare the
      required dependencies and regional permissions in advance.
    facts:
      - independent-recovery
      - regional-preparation
  - id: disaster-recovery-028
    q: After an AWS disaster recovery event, the original site is repaired. What must happen before
      returning the workload?
    a: Use the tested failback procedure to replicate recovery-site data back and return the workload. A
      repaired site alone does not contain changes made during recovery.
    facts:
      - failback
      - test-return
diagrams:
  - id: dr-drs-recovery-cutover
    title: DRS instance recovery and separate traffic redirection
    width: 1200
    height: 180
    nodes:
      - id: data
        label: Replicated data
        icon: res-elastic-block-store-volume
        x: 20
        y: 55
        w: 180
        h: 72
        tone: storage
      - id: instance
        label: Recovery instance
        icon: res-ec2-instance
        x: 340
        y: 55
        w: 180
        h: 72
        tone: compute
      - id: traffic
        label: Traffic routing
        icon: route-53
        x: 660
        y: 55
        w: 180
        h: 72
        tone: network
      - id: app
        label: Application
        icon: res-generic-application
        x: 980
        y: 55
        w: 180
        h: 72
        tone: user
    edges:
      - from: data
        to: instance
        step: 1
        label: launch
      - from: instance
        to: traffic
        step: 2
        label: redirect
      - from: traffic
        to: app
        step: 3
        label: check service
    steps:
      - DRS launches recovery instances from replicated data in the required dependency order.
      - The recovery procedure separately redirects production traffic.
      - Check that users can use the recovered application and its data.
---
A recovery runbook is a repeatable procedure for restoring service. Failback is the later return to the original site. Plan both directions so the team can recover without depending on the failed environment.

### How it works

1. Define who decides to recover, the conditions for that decision and responder responsibilities. Prepare standby permissions and service quotas, the account limits on resource use.
2. Identify hard dependencies, components the application cannot operate without. Recover dependent server groups in their required order. Soft dependencies can use substitutes or reduced functionality.
3. Recover the data and application resources. Prepare caches, temporary copies that help serve application data, where the workload needs them.
4. Redirect traffic and check restored service and data. Elastic Disaster Recovery launches recovery instances; traffic redirection remains a separate action.
5. Observe the recovery workflow and stop it if it creates further risk. Systems Manager Automation or Step Functions can coordinate the steps.
6. After the original site is safe, follow the tested failback procedure. For Elastic Disaster Recovery, reverse replication sends changes from recovery instances back to the source infrastructure.

### Exam cues

- If the question says recovery instances are running but users still reach the failed site, think traffic redirection, because launching DRS instances does not perform that step.
- If the question says a recovery script requires the primary site's API, think an independent recovery path, because the site and its control plane may both be unavailable.
- If the question says the original site is repaired, think failback with data synchronization, because production changes have continued at the recovery site.

### Remember

- Prepare permissions and quotas before the incident.
- Regional failover guidance calls for automated actions and an explicit human activation decision.
- Include service checks and an abort mechanism in recovery automation.
- Test failback as part of recovery drills.

> **Trap:** A server launch is not the whole recovery. Dependencies, traffic redirection and service checks still determine whether users can work.
