---
title: Service integration patterns
level: associate
order: 30
facts:
  - id: asl-definition
    text: Amazon States Language is a JSON-based language for defining state machines, their work, and
      their transitions.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html#concepts-amazon-states-language
  - id: task-work
    text: A Task represents one unit of work, using an activity, Lambda, a supported service, or an
      HTTPS API.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-task.html#state-task
  - id: request-response
    text: Request-response proceeds after the API responds and does not wait for a submitted background
      job to finish.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-default
  - id: sync-job
    text: The .sync suffix waits for completion of a supported job, including Batch, ECS, Glue,
      CodeBuild, or a nested Step Functions execution.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-sync
  - id: callback-pattern
    text: The .waitForTaskToken suffix waits for an external process to return its task token using
      SendTaskSuccess or SendTaskFailure.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: integration-support
    text: Express supports request-response only; Standard also supports job and callback patterns for
      integrations that provide them.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-to-services-integration-patterns
  - id: sync-monitor
    text: Same-account .sync monitoring uses API polling and EventBridge events; cross-account .sync
      uses polling only.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-sync
  - id: sync-cancel
    text: When a .sync task is aborted, cancellation is best effort and the external job can keep
      running.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-sync
  - id: choice-state
    text: Choice selects a branch by evaluating conditions; no match without a Default causes an error.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-choice.html#state-choice
  - id: wait-state
    text: Wait delays execution for a duration or until a timestamp without invoking a worker for the
      delay.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-wait.html#state-wait
  - id: parallel-state
    text: Parallel runs separate branches concurrently and waits for all branches to terminate before
      continuing.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-parallel.html#state-parallel
  - id: pass-state
    text: Pass forwards input without doing work and can transform or add data to output.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-pass.html#state-pass
  - id: map-state
    text: Map repeats a set of steps for each input item; Inline is the default mode and Distributed
      runs child workflows.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html#concepts-map-process-modes
  - id: map-concurrency
    text: Inline Map supports up to 40 concurrent iterations; Distributed Map supports up to 10,000
      parallel child workflow executions.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html#concepts-map-process-modes
  - id: succeed-state
    text: Succeed ends a workflow, branch, or iteration successfully.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-succeed.html#state-succeed
  - id: fail-state
    text: Fail stops execution with failure unless enclosing error handling catches it.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-fail.html#state-fail
  - id: workflow-variables
    text: Workflow variables store values for later steps without passing them through every
      intermediate state output.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/workflow-variables.html#workflow-variables
  - id: execution-role
    text: The state machine IAM execution role grants permission to call integrated AWS resources.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/procedure-create-iam-role.html#procedure-create-iam-role
  - id: activity-worker
    text: An activity worker polls GetActivityTask with the activity ARN, receives input and a
      taskToken, then reports using SendTaskSuccess or SendTaskFailure.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-activities.html#activities-overview
  - id: event-target
    text: An EventBridge rule can target a Step Functions state machine and start a workflow when
      another service event matches.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/eventbridge-integration.html#eventbridge-stepfunctions-as-target
  - id: exposed-key-event
    text: AWS Health emits AWS_RISK_CREDENTIALS_EXPOSED when AWS detects an exposed IAM access key; AWS
      documents routing that event to a Step Functions remediation workflow.
    source: https://aws.amazon.com/blogs/compute/automate-your-it-operations-using-aws-step-functions-and-amazon-cloudwatch-events/
cards:
  - id: step-functions-007
    q: How do Step Functions request-response, .sync, and .waitForTaskToken integrations differ?
    a: Request-response waits for the API response. .sync waits for a supported job to finish.
      .waitForTaskToken waits for a token callback. Express supports request-response only.
    facts:
      - request-response
      - sync-job
      - callback-pattern
      - integration-support
  - id: step-functions-008
    q: A team chains Lambda functions and needs branching, retries, and delays between calls. How should
      it coordinate the process?
    a: Define a Step Functions state machine in Amazon States Language. Task states call the functions;
      Choice selects branches and Wait implements delays without a worker.
    facts:
      - asl-definition
      - task-work
      - choice-state
      - wait-state
  - id: step-functions-014
    q: An on-premises worker must pull Step Functions work when it has capacity. How does an activity
      supply and complete a task?
    a: Poll GetActivityTask using the activity ARN. Process the returned input and use its taskToken in
      SendTaskSuccess or SendTaskFailure.
    facts:
      - activity-worker
  - id: step-functions-015
    q: A Step Functions workflow must process each item in an array, then run two different checks
      concurrently. Which states fit?
    a: Map repeats the processing steps for each item. Parallel runs the different checks in separate
      branches and joins after all branches terminate.
    facts:
      - map-state
      - parallel-state
  - id: step-functions-016
    q: A Step Functions workflow must keep an API result for a later step without forwarding it through
      every intermediate step. What feature fits?
    a: Workflow variables. Store the result once and reference it in later steps.
    facts:
      - workflow-variables
  - id: step-functions-017
    q: A Step Functions state machine definition calls a service, but the call is denied. Which identity
      needs permission?
    a: The state machine IAM execution role. Its policies must authorize access to the integrated AWS
      resource.
    facts:
      - execution-role
  - id: step-functions-018
    q: Which Step Functions states transform data without external work and explicitly end a workflow?
    a: Pass forwards or transforms data. Succeed ends successfully; Fail ends with failure unless
      enclosing error handling catches it.
    facts:
      - pass-state
      - succeed-state
      - fail-state
  - id: step-functions-022
    q: A team must coordinate credential remediation after AWS Health reports an exposed IAM access key.
      How can it start a Step Functions workflow?
    a: Match AWS_RISK_CREDENTIALS_EXPOSED with an EventBridge rule targeting the remediation state
      machine. The workflow can coordinate the response tasks.
    facts:
      - event-target
      - exposed-key-event
diagrams:
  - id: sfn-job-before-next-step
    title: Wait for the job before continuing
    width: 1000
    height: 230
    nodes:
      - id: sfn
        label: Step Functions
        icon: step-functions
        tone: integration
        x: 25
        y: 85
        w: 230
        h: 72
      - id: job
        label: ECS task
        icon: elastic-container-service
        tone: compute
        x: 365
        y: 85
        w: 230
        h: 72
      - id: next
        label: Next task
        icon: lambda
        tone: compute
        x: 705
        y: 85
        w: 230
        h: 72
    edges:
      - from: sfn
        to: job
        step: 1
        label: submit .sync
      - from: job
        to: next
        step: 2
        label: complete
    steps:
      - Step Functions starts an ECS task using the .sync pattern.
      - Step Functions waits for the job to finish before invoking the next task.
---

Step Functions service integrations call work from a state machine, the definition of a workflow. Amazon States Language (ASL) is the JSON-based language that describes its steps and transitions. The integration pattern determines what completion means: an API response, a finished job, or an external callback.

### How it works

1. Define the work in a `Task` state. Grant its state machine an IAM execution role, the permission-bearing identity Step Functions uses to access AWS resources.
2. Choose the integration pattern below. Only use a job or callback pattern where that integration supports it.
3. Route results with `Choice`, delay with `Wait`, or coordinate concurrent work with `Parallel` and `Map`.
4. Use `Pass` to forward or transform data without external work. Workflow variables preserve values for later steps without carrying them through every output.
5. End successfully with `Succeed` or signal failure with `Fail`. For a worker that pulls work, define an activity: the worker polls `GetActivityTask`, receives input and a task token, then reports completion with that token.

| Pattern | Continue when | Workflow support |
|---|---|---|
| Request-response | The API responds | Standard and Express |
| `.sync` | The supported job finishes | Standard |
| `.waitForTaskToken` | An external process reports using its token | Standard |

| Flow state | Purpose |
|---|---|
| `Choice` | Select a branch from conditions; `Default` handles no match |
| `Wait` | Delay for a duration or until a timestamp |
| `Parallel` | Run different branches and wait for all to terminate |
| `Map` | Repeat steps for every dataset item |
| `Pass` | Forward, transform, or add data without external work |
| `Succeed` | End successfully |
| `Fail` | End with failure unless enclosing handling catches it |

### Exam cues

- If the question says a Batch job must finish before the next step, think `.sync` on Standard, because submission success only means the API accepted the job.
- If the question says an existing worker must pull tasks, think activities, because workers poll `GetActivityTask` and report using its token.
- If the question says repeat steps for each record, think Map; if it says run different checks together, think Parallel, because their units of concurrency differ.
- If the question says wait until a future time, think Wait, because it delays workflow progress without invoking a worker.

- If the question says coordinate remediation for an exposed IAM access key, think an EventBridge rule matching AWS Health `AWS_RISK_CREDENTIALS_EXPOSED` and targeting Step Functions, because service events can start a response workflow.

### Remember

- Inline Map is the default: up to 40 concurrent iterations. Distributed Map: up to 10,000 parallel child executions.
- Same-account `.sync` monitoring uses polling and EventBridge; cross-account monitoring uses polling only.
- `.sync` cancellation is best effort, so an aborted workflow can leave a job running.

> **Trap:** A successful request-response job submission does not mean the background job has completed. Choose a supported `.sync` integration when completion must precede the next step.
