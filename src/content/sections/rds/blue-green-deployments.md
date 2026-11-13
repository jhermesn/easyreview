---
title: Blue/green deployments
level: associate
order: 50
facts:
  - id: blue-green-copy
    text: RDS Blue/Green Deployments creates a synchronized staging copy, called green, of the
      production environment, called blue.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html#blue-green-deployments-overview
  - id: green-testing
    text: Supported RDS engine versions, database parameters, and file system changes can be tested in
      green before switchover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html#blue-green-deployments-overview
  - id: supported-engines
    text: RDS Blue/Green Deployments supports MariaDB, MySQL, and PostgreSQL, subject to Region and
      version availability.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html#blue-green-deployments-overview
  - id: switchover-duration
    text: RDS blue/green switchover typically takes under a minute, depending on workload, without data
      loss.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html#blue-green-deployments-overview
  - id: timeout
    text: RDS blue/green switchover timeout ranges from 30 to 3600 seconds and defaults to 300 seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-timeout
  - id: timeout-rollback
    text: If RDS blue/green switchover exceeds its timeout, its changes are rolled back and neither
      environment is changed.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-timeout
  - id: guardrails
    text: RDS blue/green guardrails check replication health and lag, active green writes, and
      long-running blue writes and schema operations.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-guardrails
  - id: switch-order
    text: RDS blue/green switchover checks readiness, stops new writes and connections, waits for
      replication, renames instances and endpoints, then enables connections and new-production
      writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-actions
  - id: stable-endpoints
    text: RDS renames green endpoints to their corresponding production endpoints so applications need
      no endpoint change after switchover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-actions
  - id: no-manual-promote
    text: Manually promoting green breaks replication and puts the blue/green deployment in Invalid
      configuration.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching
  - id: old-retained
    text: After a successful RDS blue/green switchover, old blue DB instances remain billable and
      replication between the environments stops.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-after
  - id: manual-upgrade
    text: When RDS MySQL blue/green cannot be used, AWS documents upgrading a read replica, confirming
      it is caught up, suspending source writes, promoting the replica, and redirecting writes to
      it.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.MySQL.ReducedDowntime.html#USER_UpgradeDBInstance.MySQL.ReducedDowntime
  - id: proxy-switch
    text: During RDS blue/green switchover, RDS Proxy routes to blue until it detects the switch; existing
      proxy connections are dropped when green becomes the writer and clients must reconnect.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-rds-proxy
  - id: switch-tags
    text: During RDS blue/green switchover, tags from blue replace tags on green resources.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-switching.html#blue-green-deployments-switching-actions
diagrams:
  - id: rds-blue-green-switch
    title: Prepare green, then switch production
    width: 900
    height: 230
    nodes:
      - id: blue
        label: Blue
        sub: current production
        icon: rds
        tone: database
        x: 30
        y: 85
        w: 220
        h: 86
      - id: green
        label: Green
        sub: replicate and test
        icon: rds
        tone: database
        x: 340
        y: 85
        w: 220
        h: 86
      - id: new
        label: New production
        sub: green takes blue endpoint
        icon: rds
        tone: database
        x: 650
        y: 85
        w: 220
        h: 86
    edges:
      - from: blue
        to: green
        step: 1
      - from: green
        to: new
        step: 2
    steps:
      - RDS creates green from blue and keeps it synchronized while supported changes are tested.
      - After guardrails pass, RDS blocks writes and connections, catches up replication, renames
        endpoints, and opens new production.
cards:
  - id: rds-011
    q: How do RDS Blue/Green Deployments reduce the risk of database updates?
    a: Test changes on a synchronized green copy, then use managed switchover. RDS checks readiness,
      catches up replication, and preserves production endpoint names. Switchover typically takes
      under a minute, depending on workload.
    facts:
      - blue-green-copy
      - green-testing
      - guardrails
      - stable-endpoints
      - switchover-duration
  - id: rds-027
    q: What are the RDS Blue/Green Deployments switchover timeout range and default?
    a: 30 to 3600 seconds; the default is 300 seconds. If switchover exceeds the timeout, RDS rolls back
      the switchover changes.
    facts:
      - timeout
      - timeout-rollback
  - id: rds-028
    q: An RDS team has tested its green database and wants to make it production. Should it manually
      promote green?
    a: No. Use blue/green switchover. Manual promotion breaks replication and leaves the deployment in
      Invalid configuration.
    trap: true
    facts:
      - no-manual-promote
      - switch-order
  - id: rds-029
    q: A production RDS for MySQL database cannot use Blue/Green Deployments. How can the team prepare
      an upgrade before a short write outage?
    a: Upgrade a read replica and confirm it has caught up. Suspend source writes, promote the replica,
      then redirect writes to the upgraded instance.
    facts:
      - manual-upgrade
  - id: rds-030
    q: After a successful RDS blue/green switchover, can a team assume old blue stays synchronized as a
      ready reverse-switchover target?
    a: No. Old blue is retained and billed, but replication between blue and green stops. Plan its
      cleanup and any further recovery separately.
    trap: true
    facts:
      - old-retained
  - id: rds-037
    q: An application uses Amazon RDS Proxy during an RDS blue/green switchover. Can it keep existing proxy connections after green becomes the writer?
    a: No. Existing proxy connections are dropped when green becomes the writer. The application must reconnect.
    trap: true
    facts:
      - proxy-switch
  - id: rds-038
    q: An RDS blue/green deployment has custom tags only on green resources. What happens to those tags at switchover?
    a: Blue resource tags replace the green resource tags during switchover.
    facts:
      - switch-tags
---

RDS Blue/Green Deployments prepares database changes in a separate staging copy while production continues running. Blue means current production; green means the synchronized staging environment. The [RDS overview](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html#blue-green-deployments-overview) describes this workflow for supported MariaDB, MySQL, and PostgreSQL versions and Regions.

### How it works

1. Create the blue/green deployment. RDS copies the production environment and keeps green synchronized.
2. Apply and test supported engine, parameter, or file system changes in green. Before switching, reduce replication lag, the delay in copying changes, and finish long-running writes and schema operations.
3. Request **switchover**, the managed transfer of the production role. RDS runs guardrails, which are readiness checks, before stopping new writes and database connections.
4. RDS waits for replication to catch up, renames database instances and endpoints, then allows connections and writes on the new production database. The production endpoint names are preserved.
5. After success, old blue remains billable and replication between the environments stops. If blue/green cannot be used for a MySQL upgrade, AWS documents a manual sequence: upgrade a read replica, confirm it is caught up, pause source writes, promote it, and redirect writes.
6. If using RDS Proxy, clients must reconnect after green becomes the writer. Switchover also replaces green resource tags with blue resource tags.

### Exam cues

- If the question says test a supported RDS upgrade while keeping production running, think Blue/Green Deployments, because green is a staging copy kept in sync with blue.
- If the question says long transactions or replica lag threaten switchover, think readiness guardrails, because RDS checks that the environments can switch within the timeout.
- If the question says manually promote green, think use switchover, because promotion breaks the managed deployment's replication relationship.
- If the question says an application uses RDS Proxy during switchover, plan for reconnections because existing proxy connections are dropped.

### Remember

- Switchover usually takes under a minute, depending on workload; that is not a maximum-time guarantee.
- Timeout: 30 to 3600 seconds. Default: 300 seconds.
- Exceeding the timeout rolls back switchover changes without changing either environment.
- Old blue remains billable after success and no longer receives replication from the new production database.

> **Trap:** A failed switchover rollback and returning to old blue after a successful switchover are different events. After success, old blue is no longer synchronized.
