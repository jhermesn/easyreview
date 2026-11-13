---
title: Pipeline types and execution modes
level: associate
order: 20
facts:
  - id: v1-features
    text: V1 supports action-level variables but not pipeline-level variables, QUEUED mode, or PARALLEL
      mode.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: v2-features
    text: V2 supports pipeline-level variables, source revision overrides, Git trigger filters, stage
      rollback, stage conditions, automatic stage retry, and the Commands action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: superseded-default
    text: SUPERSEDED is the default execution mode.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works
  - id: superseded-lock
    text: In SUPERSEDED mode a stage handles one execution at a time and newer executions can overtake
      waiting executions only between stages.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-executions
  - id: queued-stages
    text: QUEUED requires V2 and preserves arrival order at locked stages without superseding waiting
      executions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-executions-queued
  - id: parallel-executions
    text: PARALLEL requires V2 and runs independent executions without queues.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-executions-parallel
  - id: parallel-no-rollback
    text: PARALLEL mode does not support stage rollback or failure conditions with a rollback result.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works
cards:
  - id: codepipeline-001
    q: Which CodePipeline capabilities require V2 rather than V1?
    a: Pipeline-level variables, QUEUED and PARALLEL modes, source revision overrides, Git trigger
      filters, stage rollback, conditions, automatic retry, and Commands. Both types support action
      variables.
    trap: true
    facts:
      - v1-features
      - v2-features
  - id: codepipeline-002
    q: How do the CodePipeline execution modes SUPERSEDED, QUEUED, and PARALLEL handle overlapping
      executions?
    a: SUPERSEDED lets newer runs overtake waiting runs between stages. QUEUED preserves arrival order
      at stages. PARALLEL runs executions independently without queues.
    facts:
      - superseded-lock
      - queued-stages
      - parallel-executions
  - id: codepipeline-003
    q: A CodePipeline stage is busy and two newer executions wait in SUPERSEDED mode. Can the latest
      replace the earlier waiting execution?
    a: Yes. Superseding happens between stages, so the earlier waiting execution can be skipped.
    trap: true
    facts:
      - superseded-lock
  - id: codepipeline-022
    q: Concurrent PARALLEL CodePipeline executions overwrite the same staging environment. Which modes
      provide stage serialization?
    a: Use SUPERSEDED or V2 QUEUED. QUEUED also preserves waiting executions; PARALLEL provides no
      queue.
    trap: true
    facts:
      - superseded-lock
      - queued-stages
      - parallel-executions
  - id: codepipeline-028
    q: A CodePipeline pipeline must integration test every revision in order against a shared database.
      Which mode fits?
    a: V2 QUEUED. Waiting executions retain their order at the test stage rather than being superseded.
    trap: true
    facts:
      - queued-stages
  - id: codepipeline-029
    q: Which CodePipeline execution modes require V2, and which mode prevents stage rollback?
    a: QUEUED and PARALLEL require V2. PARALLEL does not support stage rollback. SUPERSEDED is the
      default.
    facts:
      - queued-stages
      - parallel-executions
      - parallel-no-rollback
      - superseded-default
  - id: codepipeline-035
    q: A team expects a V2 CodePipeline pipeline in PARALLEL mode to roll back a failed stage. What must
      it reconsider?
    a: Choose an execution mode that supports rollback. V2 alone is insufficient because PARALLEL
      disables stage rollback.
    trap: true
    facts:
      - v2-features
      - parallel-no-rollback
---
A pipeline type selects CodePipeline features. An execution mode controls how overlapping releases share stages. These are separate settings.

### How it works

1. Choose V1 for its supported release features or V2 when you need features such as pipeline-level inputs, trigger filters, or stage recovery controls.
2. Choose how waiting executions should proceed at stages.
3. With SUPERSEDED, a stage locks for one execution and a newer run can replace an older waiting run between stages.
4. With QUEUED, each locked stage keeps waiting runs in arrival order. Different stages can still process different executions.
5. With PARALLEL, runs proceed independently without queues.

| Mode | Waiting behavior | Type |
|---|---|---|
| SUPERSEDED | Newer runs can replace waiting runs between stages | V1 or V2; default mode |
| QUEUED | Waiting runs retain arrival order at each stage | V2 |
| PARALLEL | Independent runs without queues | V2 |

### Exam cues

- If the question says every revision must test against one shared environment, think QUEUED, because waiting runs are preserved and the stage serializes access.
- If the question says older waiting revisions may be skipped, think SUPERSEDED, because only the newest waiting revision needs to enter the stage.
- If the question says releases use independent environments concurrently, think PARALLEL, because executions do not wait for each other.

### Remember

- Both V1 and V2 support action-level variables.
- V2 adds pipeline-level variables, source revision overrides, Git filters, stage conditions, rollback, automatic retry, and Commands.
- PARALLEL does not support stage rollback or rollback failure conditions.

> **Trap:** QUEUED does not restrict the whole pipeline to one execution. It serializes executions at each stage. A source stage and a deployment stage can work on different executions.
