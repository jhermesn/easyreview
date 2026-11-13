---
title: Stages, actions, and triggers
level: associate
order: 10
facts:
  - id: release-workflow
    text: A pipeline describes a release workflow made of stages containing actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-pipelines
  - id: ordered-actions
    text: Actions in a stage with equal runOrder values run in parallel; higher values wait for lower
      values to succeed.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-requirements.html#action.runOrder
  - id: codecommit-events
    text: For a CodeCommit source, use EventBridge change detection and set PollForSourceChanges to
      false to avoid duplicate executions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeCommit.html#action-reference-CodeCommit-config
  - id: codecommit-polling
    text: Omitting PollForSourceChanges from a CodeCommit action configuration enables polling.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeCommit.html#action-reference-CodeCommit-config
  - id: connection-source
    text: CodeStarSourceConnection uses AWS CodeConnections to retrieve external repository changes and
      start a pipeline from provider webhook events.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodestarConnectionSource.html#action-reference-CodestarConnectionSource
  - id: connection-zip
    text: A connections source produces a ZIP artifact by default; its full-clone reference can be
      consumed only by CodeBuild actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodestarConnectionSource.html#action-reference-CodestarConnectionSource
  - id: filtered-triggers
    text: V2 supports Git tag, branch, file path, and pull request trigger filtering.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: trigger-scope
    text: Git trigger filters apply to CodeStarSourceConnection source actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-triggers.html#pipelines-triggers
  - id: filter-logic
    text: Branch and file path filters within one filter type combine with AND.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-triggers.html#pipelines-filter-examples
  - id: filter-excludes
    text: Within a trigger filter, excludes take precedence over includes.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-triggers.html#pipelines-filter-examples
  - id: all-sources
    text: When a pipeline has multiple source actions, all source actions run even if only one detected
      a change.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-starting
  - id: parallel-codecommit
    text: In PARALLEL mode a CodeCommit source clones HEAD when its source action starts, which can
      differ from the triggering commit.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-revisions-processed
  - id: connection-revision
    text: For a connections source, the revision is captured when the commit is pushed, including in
      PARALLEL mode.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-revisions-processed
  - id: execution-meaning
    text: A pipeline execution is one identified run of a set of changes through a pipeline.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-executions
diagrams:
  - id: pipeline-release-order
    title: A source revision moves through release actions
    width: 940
    height: 220
    nodes:
      - id: source
        label: Source
        icon: codecommit
        x: 20
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: build
        label: Build and test
        icon: codebuild
        x: 350
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: deploy
        label: Deploy
        icon: codedeploy
        x: 700
        y: 70
        w: 180
        h: 72
        tone: devtools
    edges:
      - from: source
        to: build
        step: 1
        label: source artifact
      - from: build
        to: deploy
        step: 2
        label: build artifact
    steps:
      - The source action provides the revision as an artifact.
      - After build and test succeed, the deployment action consumes the build artifact.
cards:
  - id: codepipeline-015
    q: A CodePipeline pipeline uses CodeCommit and starts twice for each push after an EventBridge rule
      is added. What should the team change?
    a: Set `PollForSourceChanges` to `false`. EventBridge detects changes, so polling must be disabled.
    facts:
      - codecommit-events
      - codecommit-polling
  - id: codepipeline-031
    q: How does CodePipeline order actions within a stage?
    a: "Use `runOrder`: equal values run in parallel; higher values wait for lower values to succeed."
    facts:
      - ordered-actions
  - id: codepipeline-032
    q: A team wants a CodePipeline pipeline to start from GitHub repository events without polling.
      Which source integration fits?
    a: Use AWS CodeConnections with the `CodeStarSourceConnection` source action. Provider webhooks
      detect changes.
    facts:
      - connection-source
  - id: codepipeline-033
    q: A V2 CodePipeline pipeline should start only for changes under an application path on a release
      branch. What filters fit?
    a: Use a connections source with branch and file path filters. Both must match; excludes override
      includes.
    facts:
      - filtered-triggers
      - trigger-scope
      - filter-logic
      - filter-excludes
  - id: codepipeline-034
    q: A PARALLEL CodePipeline execution with a CodeCommit source builds a later commit than the one
      that triggered it. Why?
    a: The CodeCommit source clones HEAD when the source action starts. Connections sources capture the
      pushed commit.
    trap: true
    facts:
      - parallel-codecommit
      - connection-revision
---
CodePipeline coordinates a software release through stages, which group related work, and actions, which perform that work. An execution is one trip through this workflow.

### How it works

1. A source integration detects a change. For CodeCommit, configure EventBridge and turn off polling with `PollForSourceChanges: false`.
2. For external Git repositories, AWS CodeConnections links the repository to a `CodeStarSourceConnection` action. A webhook is the provider's event notification to that connection.
3. The source produces files for later actions. Connections output a ZIP by default; a full-clone reference, which lets a build retrieve Git history, works only with CodeBuild.
4. Stages run in order. Within a stage, equal `runOrder` values run together; higher values wait for the earlier actions to succeed.
5. In V2, use connections trigger filters for tags, branches, paths, or pull requests. Branch and path filters combine with AND; excludes win over includes.

### Exam cues

- If the question says GitHub events should start releases, think CodeConnections, because its source action receives provider webhooks.
- If the question says CodeCommit pushes start duplicate executions, think disable polling, because EventBridge and polling can both start the pipeline.
- If the question says only one application's files on a release branch should trigger a run, think V2 branch and path filters, because both conditions must match.

### Remember

- Omitting CodeCommit's `PollForSourceChanges` enables polling.
- A change to one source runs every source action in the pipeline.
- Equal `runOrder` values mean parallel actions within a stage.

> **Trap:** A CodeCommit source in PARALLEL mode clones the latest commit, called HEAD, when the source action starts. It can differ from the triggering commit. A connections source captures the pushed revision.
