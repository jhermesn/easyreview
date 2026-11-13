---
title: Schedules and base image updates
level: associate
order: 30
facts:
  - id: schedule-evaluation
    text: An Image Builder schedule expression determines when the service evaluates whether to start a
      build.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-scheduleExpression
  - id: schedule-expressions
    text: Image Builder scheduleExpression accepts cron expressions or rate expressions.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-scheduleExpression
  - id: dependency-default
    text: The default start condition is EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-pipelineExecutionStartCondition
  - id: version-filter
    text: With semantic version filters, the dependency-update condition builds when matching newer
      base-image or component versions are available.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-pipelineExecutionStartCondition
  - id: always-build
    text: EXPRESSION_MATCH_ONLY builds every time the cron expression matches.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-pipelineExecutionStartCondition
  - id: parameter-dependency
    text: A changed value in a Parameter Store parameter used as the recipe base image counts as a
      dependency update.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-pipelineExecutionStartCondition
  - id: parameter-input
    text: A recipe can reference a Parameter Store parameter holding a base AMI ID; AWS public
      parameters can identify the latest AWS managed AMI.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/tutorial-ssm-parameters-recipe.html#tutorial-ssm-create-parameter
  - id: input-permission
    text: Using a Parameter Store base-image reference requires ssm:GetParameter on the parameter.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/tutorial-ssm-parameters-recipe.html#tutorial-ssm-configure-iam
  - id: timezone-default
    text: The schedule timezone defaults to UTC when omitted.
    source: https://docs.aws.amazon.com/imagebuilder/latest/APIReference/API_Schedule.html#imagebuilder-Type-Schedule-timezone
  - id: manual-execution
    text: A manually configured pipeline runs when started explicitly, including with
      start-image-pipeline-execution.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/schedule-pipeline.html#schedule-pipeline
cards:
  - id: ec2-image-builder-006
    q: How does an EC2 Image Builder schedule decide whether to rebuild an image?
    a: It evaluates the start condition at the scheduled time. The default dependency-update condition
      requires a matching dependency change; EXPRESSION_MATCH_ONLY builds at every matching cron
      time.
    facts:
      - schedule-evaluation
      - dependency-default
      - version-filter
      - always-build
  - id: ec2-image-builder-007
    q: A team wants EC2 Image Builder to pick up new Amazon Linux base AMIs without editing the recipe
      each time. What should it configure?
    a: Use an AWS public Parameter Store base-image reference and a schedule with
      EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE. A changed parameter value counts as a
      dependency update at schedule evaluation.
    facts:
      - parameter-input
      - parameter-dependency
      - schedule-evaluation
      - dependency-default
  - id: ec2-image-builder-017
    q: An EC2 Image Builder pipeline must build every scheduled week even when its base image and
      components have not changed. Which start condition fits?
    a: EXPRESSION_MATCH_ONLY. It builds at each matching cron time without requiring dependency updates.
    facts:
      - always-build
  - id: ec2-image-builder-018
    q: A team updates the Parameter Store value used by an EC2 Image Builder recipe, but its daily
      pipeline does not run immediately. Is the dependency setting broken?
    a: No. The change counts as a dependency update, but the schedule determines when Image Builder
      evaluates it. Start the pipeline manually if a run is needed sooner.
    trap: true
    facts:
      - parameter-dependency
      - schedule-evaluation
      - manual-execution
---
An Image Builder schedule controls when a pipeline checks whether it should build. A dependency is an input that can change, such as the base image or a component version. A dependency-aware schedule can skip a build when those inputs have not changed.

### How it works

1. Set a cron expression, a calendar-based schedule, or a rate expression, a recurring interval. The timezone defaults to UTC.
2. Choose the start condition. The default is `EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE`. Semantic version filters, rules that select matching resource versions, let it detect newer base images or components.
3. To follow an AWS managed base AMI, use an AWS public Parameter Store parameter, a named value holding the AMI ID. A changed parameter value also counts as a dependency update. Reading it requires `ssm:GetParameter`.
4. At schedule evaluation, build if the chosen condition is satisfied. Use `EXPRESSION_MATCH_ONLY` for every matching cron time. Start a pipeline manually when needed.

### Exam cues

- If the question says rebuild on schedule only when dependencies change, think the default dependency-update condition, because it checks for changed inputs.
- If the question says always rebuild weekly, think `EXPRESSION_MATCH_ONLY`, because it does not require an update.
- If the question says follow the latest AWS managed AMI without editing recipes, think public Parameter Store base-image reference, because the parameter holds the current AMI ID.

### Remember

- Default start condition: `EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE`.
- Default timezone: UTC.
- A base-image parameter value change counts as a dependency update.

> **Trap:** A dependency change does not mean an immediate scheduled execution. The schedule controls when Image Builder checks it.
