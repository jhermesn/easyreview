---
title: Execution recovery and notifications
level: professional
order: 110
facts:
  - id: failure-blocks
    text: A failed action prevents its revision from advancing; in stage-locking operation failure
      releases the stage lock.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-transitions-approvals
  - id: retry-failed
    text: FAILED_ACTIONS retries failed actions while in-progress actions continue.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
  - id: retry-all
    text: ALL_ACTIONS restarts a failed stage from its first action and requires that no actions remain
      in progress.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
  - id: retry-unavailable
    text: A failed execution cannot be retried after another execution enters and supersedes it at the
      failed stage.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-transitions-approvals
  - id: retry-structure
    text: A pipeline structure change after failure or an already running retry can prevent a stage
      retry.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
  - id: retry-once
    text: Automatic stage retry makes one retry attempt and can retry all actions or only failed actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry-considerations
  - id: retry-artifact-overwrite
    text: Retrying a failed stage or failed actions can overwrite output artifacts of previously
      successful actions in the same execution; their execution history is retained.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
  - id: rollback-source
    text: Stage rollback creates a new execution using a previously successful execution source
      revisions, variables, and artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback.html#stage-rollback
  - id: rollback-limits
    text: Stage rollback cannot target a source stage, an execution from an older pipeline structure
      version, or a rollback execution.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback.html#stage-rollback-considerations
  - id: v2-recovery
    text: Stage rollback and automatic stage retry require V2.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: stop-wait
    text: Stop and wait lets in-progress actions finish and prevents subsequent actions from starting.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-stopping
  - id: stop-abandon
    text: Stop and abandon abandons pipeline actions but provider tasks can continue, risking
      out-of-order results.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-stopping
  - id: execution-diagnosis
    text: Execution history and action execution details identify action status and provider execution
      details.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-view-console.html#pipelines-view-console
  - id: stack-event-errors
    text: cloudformation:DescribeStackEvents permission lets CodePipeline include the first failed
      resource in CloudFormation action errors; without it errors are generic.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation
  - id: event-levels
    text: EventBridge receives separate CodePipeline Pipeline Execution State Change, CodePipeline Stage
      Execution State Change, and CodePipeline Action Execution State Change detail types.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-events-types
  - id: event-type-fields
    text: CodePipeline action events include the action category and provider in detail.type.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-events-action-failed
  - id: approval-failed-event
    text: An EventBridge pattern selecting action state FAILED and category Approval captures rejected
      or failed approval actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#monitoring-cloudwatch-events-console
  - id: event-targets
    text: EventBridge rules can route CodePipeline state events to targets such as SNS or Lambda.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-changes-cloudwatch-events
  - id: approval-failure-causes
    text: A failed manual approval event can represent reviewer rejection or an incorrect action
      configuration.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-events-types
  - id: approval-silence
    text: An unanswered manual approval fails at its configured timeout, or after the account default
      of seven days if no action timeout is set.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/limits.html
cards:
  - id: codepipeline-004
    q: A CodePipeline stage fails after some actions succeeded. How can the team retry without
      restarting the pipeline?
    a: Choose `FAILED_ACTIONS` to repeat failures, or `ALL_ACTIONS` to restart the stage when no actions
      remain in progress. A superseded failed execution cannot be retried.
    facts:
      - retry-failed
      - retry-all
      - retry-unavailable
  - id: codepipeline-017
    q: How do CodePipeline Stop and wait and Stop and abandon differ?
    a: Stop and wait allows running actions to finish and starts no later actions. Stop and abandon
      abandons pipeline actions immediately, but provider tasks can continue.
    facts:
      - stop-wait
      - stop-abandon
  - id: codepipeline-018
    q: A CodePipeline CloudFormation action shows a generic deployment failure. Where should the team
      investigate, and what permission improves the pipeline error?
    a: Inspect execution history and action details, then CloudFormation stack events. Grant
      `cloudformation:DescribeStackEvents` to expose the first failed resource in the pipeline
      error.
    facts:
      - execution-diagnosis
      - stack-event-errors
  - id: codepipeline-019
    q: A team wants CodePipeline failure alerts delivered to SNS or Lambda. What should it configure?
    a: Use EventBridge rules for pipeline, stage, or action state changes and route matching events to
      the target. These scopes have different detail types.
    facts:
      - event-levels
      - event-targets
  - id: codepipeline-051
    q: A team wants alerts for failed or rejected CodePipeline approval actions but not build failures.
      Which EventBridge fields should it match?
    a: "Use action execution state change events, `detail.state: FAILED`, and `detail.type.category:
      Approval`. Inspect the action error because failure need not mean reviewer rejection."
    trap: true
    facts:
      - event-levels
      - event-type-fields
      - approval-failed-event
      - approval-failure-causes
  - id: codepipeline-052
    q: How many automatic stage retry attempts does CodePipeline make, and what scope can it retry?
    a: One attempt. It can retry all actions in the failed stage or only failed actions; automatic stage
      retry requires V2.
    facts:
      - retry-once
      - v2-recovery
  - id: codepipeline-053
    q: A CodePipeline execution is stopped with Stop and abandon during a CloudFormation update. Is the
      stack update necessarily canceled?
    a: No. Provider work can continue after the pipeline action is abandoned. Stop and wait lets the
      running action finish.
    trap: true
    facts:
      - stop-abandon
      - stop-wait
  - id: codepipeline-055
    q: A CodePipeline stage retry runs after a CodeBuild action previously produced an artifact. Are
      successful action artifacts guaranteed to remain unchanged during the retry?
    a: No. Retrying the stage or its failed actions can overwrite outputs from successful actions in
      the same execution, although their execution history remains.
    trap: true
    facts:
      - retry-artifact-overwrite
---
CodePipeline recovery controls either repeat work, reapply a prior successful release, or stop further progress. Execution details show where a release failed; EventBridge events let automation respond to that state.

### How it works

1. Find the failed stage and action in execution history and inspect the provider execution details. For CloudFormation, `cloudformation:DescribeStackEvents` lets the pipeline error identify the first failed resource.
2. Choose `FAILED_ACTIONS` to repeat failures while running actions continue, or `ALL_ACTIONS` to restart the failed stage after all actions stop running.
3. For V2, configure one automatic retry attempt or stage rollback. Rollback creates a new execution from a prior successful execution's revisions, variables, and artifacts.
4. To halt a run, choose Stop and wait to let current actions finish, or Stop and abandon to release the pipeline action while provider work may continue.
5. Match EventBridge state-change events and route them to SNS or Lambda. Action events include category and provider under `detail.type`.
6. A retry can overwrite output artifacts from successful actions in the same execution, while their execution history remains.

| Event scope | detail-type |
|---|---|
| Whole execution | CodePipeline Pipeline Execution State Change |
| Stage | CodePipeline Stage Execution State Change |
| Action | CodePipeline Action Execution State Change |

### Exam cues

- If the question says repeat a failed test without rebuilding earlier stages, think stage retry, because it resumes the existing execution.
- If the question says alert only on rejected or failed approvals, think action events with `FAILED` and category `Approval`, because pipeline-level failure events do not identify that action category.
- If the question says restore a prior successful stage release, think V2 rollback, because it reuses that execution's artifacts and variables.

### Remember

- Automatic retry: one attempt, all actions or failed actions.
- A superseded failed execution cannot be retried; structure changes or another retry can also prevent retry.
- Rollback excludes source stages, older pipeline structure versions, and rollback executions as targets.
- Stage or failed-action retry can overwrite successful action outputs in the same execution.

> **Trap:** A failed approval event can mean rejection, timeout, or configuration failure. Inspect the action error before attributing it to a reviewer.

> **Trap:** Stop and abandon does not guarantee provider cancellation. A CloudFormation update can continue after the pipeline abandons its action.
