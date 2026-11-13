---
title: Traffic validation hooks
level: professional
order: 50
facts:
  - id: validation
    text: Lambda and ECS lifecycle hooks invoke optional Lambda validation functions specified in
      AppSpec.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks
  - id: lambda-hooks
    text: Lambda deployment hooks are BeforeAllowTraffic before the shift and AfterAllowTraffic after
      all traffic has shifted.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-lambda
  - id: ecs-before
    text: The ECS BeforeInstall hook runs before the replacement task set exists; rollback is not
      possible at this point.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: ecs-after
    text: The ECS AfterInstall hook runs after the replacement task set is created and associated with
      its target group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: test-hook
    text: ECS AfterAllowTestTraffic runs after the test listener sends traffic to the replacement task
      set.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: ecs-production
    text: ECS BeforeAllowTraffic runs before production shifts, and AfterAllowTraffic runs after
      production reaches the replacement task set.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: ecs-order
    text: The ECS scriptable hook order is BeforeInstall, AfterInstall, AfterAllowTestTraffic,
      BeforeAllowTraffic, AfterAllowTraffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#API_PutLifecycleEventHookExecutionStatus
  - id: ecs-managed
    text: ECS Install creates the replacement task set, AllowTestTraffic changes test routing, and
      AllowTraffic changes production routing.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-what-happens
  - id: test-listener
    text: ECS can use an optional test listener to reach the replacement task set before production
      traffic moves.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
  - id: callback
    text: Validation functions must report their result with PutLifecycleEventHookExecutionStatus, using
      the deployment ID and lifecycle event hook execution ID.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#API_PutLifecycleEventHookExecutionStatus_RequestParameters
  - id: statuses
    text: Only Succeeded and Failed are accepted as validation results by
      PutLifecycleEventHookExecutionStatus.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_PutLifecycleEventHookExecutionStatus.html#CodeDeploy-PutLifecycleEventHookExecutionStatus-request-status
  - id: deadline
    text: A Lambda or ECS deployment fails if its validation function does not notify CodeDeploy within
      one hour.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks
  - id: rollback-hook
    text: For ECS, validation results from AfterInstall and later hooks can trigger rollback.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list-ecs
  - id: task-set-definition
    text: An ECS task set is a group of tasks running an application version.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-compute-platform
cards:
  - id: codedeploy-003
    q: Which CodeDeploy hooks validate a Lambda function deployment, and how do they report results?
    a: BeforeAllowTraffic and AfterAllowTraffic. Their Lambda validation functions report Succeeded or
      Failed with PutLifecycleEventHookExecutionStatus within one hour.
    facts:
      - lambda-hooks
      - callback
      - statuses
      - deadline
  - id: codedeploy-004
    q: Which Lambda validation hooks run during a CodeDeploy ECS deployment?
    a: BeforeInstall, AfterInstall, AfterAllowTestTraffic, BeforeAllowTraffic, AfterAllowTraffic.
      AfterAllowTestTraffic follows test-listener routing to the replacement task set.
    facts:
      - ecs-order
      - test-hook
  - id: codedeploy-027
    q: A CodeDeploy Lambda release needs to test the target version before live requests move. Where
      should validation run?
    a: Use a Lambda validation function at BeforeAllowTraffic and report its result to CodeDeploy.
    facts:
      - lambda-hooks
      - callback
  - id: codedeploy-033
    q: An ECS application deployed through CodeDeploy needs API tests against the replacement before
      production moves. What design supports this?
    a: Configure the optional test listener and a Lambda validation function at AfterAllowTestTraffic.
      The listener reaches the replacement before the production shift.
    facts:
      - test-listener
      - test-hook
  - id: codedeploy-049
    q: A CodeDeploy validation Lambda returns successfully but the release later fails waiting for
      validation. What did the function miss?
    a: The explicit PutLifecycleEventHookExecutionStatus callback. Report Succeeded or Failed with the
      deployment ID and hook execution ID within one hour.
    trap: true
    facts:
      - callback
      - statuses
      - deadline
  - id: codedeploy-050
    q: An ECS CodeDeploy team wants to validate the replacement at BeforeInstall. Why is that hook too
      early?
    a: The replacement task set does not exist yet. Use AfterInstall to check the created task set, or
      AfterAllowTestTraffic to test it through the test listener.
    trap: true
    facts:
      - ecs-before
      - ecs-after
      - test-hook
diagrams:
  - id: codedeploy-ecs-validation-order
    title: ECS Lambda hooks around resource and traffic changes
    width: 1430
    height: 190
    nodes:
      - id: before
        label: Check setup
        sub: BeforeInstall
        icon: res-lambda-lambda-function
        x: 25
        y: 40
        w: 220
        h: 86
        tone: compute
      - id: after
        label: Check new tasks
        sub: AfterInstall
        icon: res-lambda-lambda-function
        x: 315
        y: 40
        w: 220
        h: 86
        tone: compute
      - id: test
        label: Test replacement
        sub: AfterAllowTestTraffic
        icon: res-lambda-lambda-function
        x: 605
        y: 40
        w: 220
        h: 86
        tone: compute
      - id: pre
        label: Approve traffic
        sub: BeforeAllowTraffic
        icon: res-lambda-lambda-function
        x: 895
        y: 40
        w: 220
        h: 86
        tone: compute
      - id: post
        label: Check live tasks
        sub: AfterAllowTraffic
        icon: res-lambda-lambda-function
        x: 1185
        y: 40
        w: 220
        h: 86
        tone: compute
    edges:
      - from: before
        to: after
        step: 1
      - from: after
        to: test
        step: 2
      - from: test
        to: pre
        step: 3
      - from: pre
        to: post
        step: 4
    steps:
      - Install creates the replacement task set before AfterInstall.
      - AllowTestTraffic directs the optional test listener to the replacement before
        AfterAllowTestTraffic.
      - BeforeAllowTraffic runs before the production traffic shift.
      - AllowTraffic moves production traffic, then AfterAllowTraffic validates. Every configured
        validation function reports its result to CodeDeploy.
---
Traffic validation hooks run Lambda functions at defined points in a Lambda or ECS deployment. They let a deployment check the replacement before or after traffic moves. A hook is a named point where CodeDeploy can call your validation code.

### How it works

1. Name the optional validation functions in AppSpec. Lambda deployments expose `BeforeAllowTraffic` and `AfterAllowTraffic`.
2. For ECS, select the hook based on what already exists at that point, using the table below. A task set is a collection of tasks running one application version.
3. Run tests. An ECS test listener, a load balancer entry point for test requests, can route to the replacement before production moves.
4. Call `PutLifecycleEventHookExecutionStatus` with the deployment ID, hook execution ID, and result. A callback means explicitly sending the result to CodeDeploy; a successful function return alone does not supply it.

| ECS hook | What can be checked |
|---|---|
| `BeforeInstall` | Preconditions; replacement does not exist yet |
| `AfterInstall` | Replacement task set and its target group exist |
| `AfterAllowTestTraffic` | Test listener routes to the replacement |
| `BeforeAllowTraffic` | Final checks before production moves |
| `AfterAllowTraffic` | Replacement serves production traffic |

`Install`, `AllowTestTraffic`, and `AllowTraffic` perform the ECS resource and routing operations; the hooks surround them.

### Exam cues

- If the question says check a Lambda target version before users reach it, think `BeforeAllowTraffic`, because it precedes traffic shifting.
- If the question says test ECS through a listener before production moves, think `AfterAllowTestTraffic`, because test routing is already active.
- If the question says the validation function succeeded but deployment timed out, think missing status callback, because CodeDeploy waits for an explicit result.

### Remember

- Callback results: `Succeeded` or `Failed` only.
- Callback deadline: one hour for Lambda and ECS validation functions.
- ECS rollback is unavailable at `BeforeInstall`; validation results from `AfterInstall` onward can trigger it.

> **Trap:** `AfterInstall` means the replacement exists. It does not mean the test listener already routes to it; that follows `AllowTestTraffic`.
