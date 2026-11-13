---
title: Test and invoke actions
level: associate
order: 60
facts:
  - id: test-build
    text: CodeBuild can provide Build or Test actions that run buildspec commands in a build container.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-type
  - id: test-device
    text: DeviceFarm is a Test action provider that runs applications against a configured pool of
      devices and testing framework.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-DeviceFarm.html#action-reference-DeviceFarm
  - id: test-stage
    text: Grouping a deployment and its following test in the same locked stage keeps them on the same
      execution.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-recommended-pipeline-method
  - id: test-mode
    text: SUPERSEDED and QUEUED lock stages; PARALLEL executions run independently.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works
  - id: lambda-result
    text: A Lambda pipeline action must call PutJobSuccessResult or PutJobFailureResult with the job ID
      to report completion.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
  - id: lambda-region
    text: A cross-Region Lambda action must send its CodePipeline job result to the Region containing
      the Lambda function.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
  - id: lambda-credentials
    text: The CodePipeline event passed to Lambda includes temporary artifact credentials and must not
      be logged in full.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
  - id: step-invoke
    text: StepFunctions is an Invoke action that starts a state machine, a workflow defined as states
      and transitions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions
  - id: standard-waits
    text: A Standard Step Functions action waits for a terminal execution status and succeeds only when
      the workflow succeeds.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-types-standard
  - id: express-start
    text: An Express Step Functions action succeeds when the workflow starts, regardless of its eventual
      outcome.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-types-express
  - id: custom-worker
    text: A custom action requires a worker that can reach the public CodePipeline endpoint to poll for
      jobs, execute work, and return results.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-custom-action.html#actions-create-custom-action-job-worker
  - id: custom-poll
    text: A custom worker calls PollForJobs and then AcknowledgeJob before executing the job.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-custom-action.html#actions-create-custom-action-job-worker-workflow
  - id: custom-result
    text: A custom worker finishes by calling PutJobSuccessResult without a continuation token or
      PutJobFailureResult.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-custom-action.html#actions-create-custom-action-job-worker-workflow
  - id: test-order
    text: Actions with increasing runOrder values run sequentially within a stage.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-requirements.html#action.runOrder
  - id: state-machine-meaning
    text: A state machine is a workflow composed of states and transitions.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-statemachines.html#concepts-statemachines
  - id: lambda-invoke-category
    text: A pipeline Lambda function action uses the Invoke category.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-Lambda.html#action-reference-Lambda-type
diagrams:
  - id: pipeline-custom-worker
    title: A custom worker claims and completes a pipeline job
    width: 740
    height: 410
    nodes:
      - id: worker
        label: Job worker
        icon: res-client
        x: 20
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: pipeline
        label: CodePipeline
        icon: codepipeline
        x: 430
        y: 70
        w: 180
        h: 72
        tone: devtools
      - id: check
        label: Custom test
        icon: res-client
        x: 20
        y: 270
        w: 180
        h: 72
        tone: devtools
    edges:
      - from: worker
        to: pipeline
        step: 1
        label: poll and claim
      - from: worker
        to: check
        step: 2
        label: run test
      - from: check
        to: pipeline
        step: 3
        label: report result
    steps:
      - The worker calls PollForJobs and AcknowledgeJob.
      - The worker performs the custom test on its host.
      - The worker reports success or failure to CodePipeline.
cards:
  - id: codepipeline-014
    q: A CodePipeline release deploys to a shared test environment and must test that exact revision
      before another run replaces it. How should actions be arranged?
    a: Use a stage-locking mode and put deployment before testing in the same stage with increasing
      `runOrder`. Use a separate stage for each environment.
    facts:
      - test-stage
      - test-mode
      - test-order
  - id: codepipeline-016
    q: Which CodePipeline action can run custom AWS service checks, and how must a Lambda check report
      completion?
    a: A Lambda Invoke action can run the checks. It must call `PutJobSuccessResult` or
      `PutJobFailureResult` with the job ID. For cross-Region Lambda, send the result in the
      function Region.
    facts:
      - lambda-result
      - lambda-region
  - id: codepipeline-023
    q: A CodePipeline test needs a multi-step workflow that calls AWS services and blocks release until
      the workflow succeeds. Which action fits?
    a: Use a StepFunctions Invoke action with a Standard state machine. CodePipeline waits for the
      workflow result.
    facts:
      - step-invoke
      - standard-waits
  - id: codepipeline-024
    q: A Lambda function invoked by CodePipeline returns successfully, but the pipeline action waits
      until timeout. What is missing?
    a: A job-result API call. Report the job ID through `PutJobSuccessResult` or `PutJobFailureResult`;
      a normal Lambda return is insufficient.
    trap: true
    facts:
      - lambda-result
  - id: codepipeline-026
    q: Which CodePipeline action providers run builds, device tests, and workflow invocations?
    a: CodeBuild supports Build or Test. DeviceFarm is Test. StepFunctions is Invoke; Lambda actions
      also report job results to CodePipeline.
    facts:
      - test-build
      - test-device
      - step-invoke
      - lambda-result
      - lambda-invoke-category
  - id: codepipeline-041
    q: A team must run an internal test tool on an existing host as a CodePipeline action. How does it
      integrate?
    a: Create a custom action and a worker with CodePipeline endpoint access. The worker polls,
      acknowledges the job, runs the tool, and reports success or failure.
    facts:
      - custom-worker
      - custom-poll
      - custom-result
  - id: codepipeline-042
    q: A CodePipeline StepFunctions action starts an Express workflow successfully, but the workflow
      later fails. Does the pipeline action reflect the failure?
    a: No. Express success means the workflow started. Use Standard when the release must wait for the
      workflow outcome.
    trap: true
    facts:
      - express-start
      - standard-waits
  - id: codepipeline-043
    q: Which APIs form the basic CodePipeline custom worker lifecycle?
    a: "`PollForJobs`, `AcknowledgeJob`, then `PutJobSuccessResult` without a continuation token or
      `PutJobFailureResult`."
    facts:
      - custom-poll
      - custom-result
---
Test actions check a release before it progresses. Invoke actions run functions or workflows that can perform custom checks. A custom action connects a tool that has no built-in provider.

### How it works

1. For a shared test environment in a stage-locking mode, put deployment and its following test in the same stage. A later execution cannot replace the environment while that stage is locked.
2. Choose the action provider that matches the check.
3. For Lambda, use the job ID from the event to report `PutJobSuccessResult` or `PutJobFailureResult`. For a cross-Region function, report to its Region.
4. For an internal tool, register a custom action. Its worker, the process that performs jobs, polls with `PollForJobs`, claims a job with `AcknowledgeJob`, runs the check, and reports the result.

| Provider | Category | What it does |
|---|---|---|
| CodeBuild | Build or Test | Runs buildspec commands in a container |
| DeviceFarm | Test | Tests an application on a device pool |
| Lambda | Invoke | Runs custom function code and requires a job-result callback |
| StepFunctions | Invoke | Starts a workflow; Standard waits for its result, Express only confirms it started |
| Custom worker | Custom action | Polls for jobs and reports results from a reachable host |

### Exam cues

- If the question says a pipeline check needs AWS API calls, think Lambda, because function code can perform the check and report the job result.
- If the question says release must wait for a multi-step workflow, think Standard Step Functions, because its final status determines the action result.
- If the question says an internal tool runs on a separate host, think custom action worker, because it can poll CodePipeline and execute there.

### Remember

- Stage locking applies to SUPERSEDED and QUEUED, not independent PARALLEL runs.
- Custom workers need access to the public CodePipeline endpoint.
- Do not log the full Lambda job event: it contains temporary artifact credentials.

> **Trap:** Returning normally from Lambda does not finish its pipeline job. An Express workflow's eventual failure also does not fail an action that already succeeded when starting it.
