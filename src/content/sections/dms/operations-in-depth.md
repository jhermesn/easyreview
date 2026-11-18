---
title: "PLACEHOLDER dms/operations-in-depth"
level: professional
order: 20
facts:
  - id: dms-task-state
    text: A DMS task running with errors can continue loading other tables while one or more tables fail to migrate.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Tasks.Status
  - id: dms-table-state
    text: DMS table states distinguish an in-progress full load, a completed load and a table error.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Tasks.CustomizingTasks.TableState
  - id: dms-task-logs
    text: DMS can log task information to CloudWatch when logging is enabled in the task settings.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.ManagingLogs
  - id: dms-metrics
    text: Comparing CDCLatencySource and CDCLatencyTarget helps locate replication latency; similar values suggest checking the source first, while a higher target value suggests checking the target.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics
  - id: dms-test
    text: DMS can test endpoint connections using a VPC and replication instance.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Endpoints.Creating.html
  - id: dms-endpoints
    text: Source and target endpoints provide connection, data store type and location information.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Endpoints.html
  - id: dms-memory
    text: FreeableMemory approaching zero or increasing SwapUsage can indicate that the replication instance is overloaded.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics
cards:
  - id: dms-006
    q: An AWS DMS task is running with errors. Does that mean every table migrated successfully?
    a: No. One or more tables may have failed while the task continues loading others. Check table states and task logs.
    trap: true
    facts: [dms-task-state, dms-table-state, dms-task-logs]
  - id: dms-007
    q: AWS DMS CDCLatencyTarget is higher than CDCLatencySource. Which side should the team investigate first?
    a: Investigate the target side for latency.
    facts: [dms-metrics]
  - id: dms-008
    q: What should a team check before starting an AWS DMS migration to confirm connectivity?
    a: Test the source and target endpoints from the replication instance.
    facts: [dms-test, dms-endpoints]
  - id: dms-011
    q: AWS DMS FreeableMemory approaches zero and SwapUsage rises. What might this indicate?
    a: The replication instance may be overloaded.
    facts: [dms-memory]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
