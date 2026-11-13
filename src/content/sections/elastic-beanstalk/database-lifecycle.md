---
title: Database lifecycle
level: associate
order: 70
facts:
  - id: coupled
    text: A coupled RDS database is managed with its Beanstalk environment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#environments-cfg-rds-lifecycle
  - id: db-policy-lifecycle
    text: The coupled database deletion policy applies when it is decoupled or its environment is terminated.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#environments-cfg-rds-lifecycle
  - id: snapshot
    text: Snapshot creates a database snapshot and then deletes the running DB instance.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#environments-cfg-rds-lifecycle
  - id: delete
    text: Delete removes the DB instance.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#environments-cfg-rds-lifecycle
  - id: retain
    text: Retain keeps the DB instance running as an external database.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#environments-cfg-rds-lifecycle
  - id: separate-update
    text: Changes submitted with the decouple operation, including a new deletion policy, are ignored; apply them in a separate earlier update.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#using-features.decoupling.db
  - id: db-options
    text: DBDeletionPolicy selects Snapshot, Delete, or Retain in aws:rds:dbinstance.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#using-features.decoupling-config-files.db
  - id: decouple-option
    text: "HasCoupledDatabase: false starts database decoupling in aws:rds:dbinstance."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#using-features.decoupling-config-files.db
  - id: external-access
    text: External databases can serve multiple environments and require appropriate security group and connection string configuration.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html#using-features.managing.db
  - id: retiring-group
    text: An external reference to a retiring environment's security group can prevent termination; preserve replacement environment access before removing the old dependency.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.terminating.html#using-features.terminating
diagrams:
  - id: beanstalk-retain-decouple
    title: Retain before decoupling
    width: 1040
    height: 340
    nodes:
      - id: policy
        label: Apply Retain
        icon: elastic-beanstalk
        x: 20
        y: 80
        w: 180
        h: 86
        sub: finish this update
        tone: compute
      - id: decouple
        label: Decouple
        icon: elastic-beanstalk
        x: 350
        y: 80
        w: 180
        h: 86
        sub: separate update
        tone: compute
      - id: db
        label: External database
        icon: rds
        x: 690
        y: 80
        w: 180
        h: 86
        sub: still running
        tone: database
    edges:
      - from: policy
        to: decouple
        step: 1
      - from: decouple
        to: db
        step: 2
    steps:
      - Complete the Retain policy update before requesting decoupling.
      - Decouple in a separate update and configure external database access.
cards:
  - id: elastic-beanstalk-019
    q: Which Elastic Beanstalk database arrangement can survive replacing or terminating an environment?
    a: An external database, or a coupled database retained through Retain. Snapshot preserves a backup but deletes the running instance.
    trap: true
    facts:
      - retain
      - snapshot
      - external-access
  - id: elastic-beanstalk-020
    q: An Elastic Beanstalk team selects Retain and Decouple database in one update. Which policy applies?
    a: The previously active policy. The pending deletion policy is ignored. Apply Retain first, then decouple in a separate update.
    trap: true
    facts:
      - separate-update
  - id: elastic-beanstalk-033
    q: An Elastic Beanstalk team plans blue/green and must retain its coupled database. What sequence should it follow?
    a: "Apply DBDeletionPolicy: Retain first, then set HasCoupledDatabase: false in a separate update. Configure both environments to reach the external database."
    trap: true
    facts:
      - db-options
      - decouple-option
      - separate-update
      - external-access
  - id: elastic-beanstalk-051
    q: An Elastic Beanstalk team wants a database backup but does not need the DB instance to keep running after environment termination. Which policy fits?
    a: Snapshot. It creates a snapshot and deletes the DB instance. Retain keeps the instance running.
    facts:
      - snapshot
      - retain
  - id: elastic-beanstalk-052
    q: An old Elastic Beanstalk environment cannot terminate because another security group references its group. What should be checked?
    a: Preserve database access from the replacement environment, then remove the reference to the retiring environment group that blocks termination.
    facts:
      - retiring-group
      - external-access
---
A database coupled to Elastic Beanstalk shares lifecycle management with its environment. Decoupling removes that management relationship. An external database lets environments be replaced while the same database stays available.

### How it works

1. Decide what must survive. A deletion policy controls what happens to the coupled database when it is decoupled or the environment terminates.
2. To keep it running, apply `DBDeletionPolicy: Retain` in `aws:rds:dbinstance` and wait for that update to finish.
3. In a separate update, set `HasCoupledDatabase: false` to decouple. Any other database changes submitted with decoupling are ignored, including a pending deletion policy.
4. Configure the application's connection string, the parameters it uses to locate and connect to the database, and the database security group to allow the replacement environment. External databases can be shared by multiple environments.
5. Before retiring the old environment, preserve replacement access and remove security group references to the old environment that would prevent its termination.

| Deletion policy | Saved data | Running database after removal |
|---|---|---|
| Snapshot | A database snapshot, a restorable backup | Deleted |
| Delete | No snapshot from this policy | Deleted |
| Retain | Existing database | Still running externally |

### Exam cues

- If the question says retain the operational database while replacing an environment, think Retain then decouple, because environment removal must not delete the running database.
- If the question says Retain was selected in the same update as decoupling, think the previous policy still applies, because other pending database changes are ignored.
- If the question says only a recoverable backup is needed, think Snapshot, because it saves a backup before deleting the DB instance.

### Remember

- `DBDeletionPolicy`: `Snapshot`, `Delete`, or `Retain`.
- `HasCoupledDatabase: false` starts decoupling.
- Change deletion policy and decouple in separate updates.

> **Trap:** Decouple does not automatically mean keep the database. The active deletion policy can still delete it.
