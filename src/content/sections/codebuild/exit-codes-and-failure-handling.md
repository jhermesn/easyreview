---
title: Exit codes and failure handling
level: associate
order: 20
facts:
  - id: command-failure
    text: A failed command makes its phase fail.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.finally
  - id: finally
    text: After a commands-block failure, remaining commands in that block are skipped and finally
      commands still run.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.finally
  - id: phase-success
    text: A phase succeeds only when its commands and finally commands all succeed.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.finally
  - id: abort
    text: Phase on-failure ABORT aborts the build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: continue
    text: Phase on-failure CONTINUE proceeds to the next phase.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: retry
    text: RETRY retries up to 3 times and matches any error message.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: retry-count
    text: RETRY-count accepts a retry count from 0 through 100.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: retry-regex
    text: RETRY-regex retries up to 3 times for matching errors; RETRY-count-regex sets both the count
      and error pattern.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: retry-compute
    text: on-failure works only with CodeBuild-provided EC2 compute images, not Lambda compute or
      reserved capacity.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.on-failure.title
  - id: succeeding
    text: CODEBUILD_BUILD_SUCCEEDING is 1 when the build is succeeding and 0 when it is failing.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  - id: upload-after-failure
    text: UPLOAD_ARTIFACTS is attempted even when BUILD fails.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/view-build-details-phases.html
  - id: exit-failure
    text: A build check can fail a CodeBuild build by returning exit code 1, as in the AWS
      container-scanning example.
    source: https://aws.amazon.com/blogs/security/how-to-build-ci-cd-pipeline-container-vulnerability-scanning-trivy-and-aws-security-hub/
  - id: automatic-build-retry
    text: StartBuild can override the automatic retry limit for a failed build; a limit of 2 permits
      up to 2 additional builds through RetryBuild.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_StartBuild.html#CodeBuild-StartBuild-request-autoRetryLimitOverride
  - id: automatic-retry-pipeline
    text: CodeBuild automatic build retry uses the project service role and is not supported for
      CodePipeline.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/auto-retry-build.html#auto-retry-build
  - id: pipeline-stage-retry
    text: CodePipeline can retry a failed stage or failed actions in that stage, including through one
      automatic stage retry attempt.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry-considerations
diagrams: []
cards:
  - id: codebuild-003
    q: A CodeBuild test script writes a report but returns success when its tests fail. How should the
      team make failed tests stop the build?
    a: "Make the test check return a failing exit status and use `on-failure: ABORT` when the build must
      stop. A failed command fails its phase; merely writing a result file does not express a
      command failure."
    facts:
      - command-failure
      - abort
      - exit-failure
    trap: true
  - id: codebuild-004
    q: How can a CodeBuild post_build command tell whether the current build is failing?
    a: "Read `CODEBUILD_BUILD_SUCCEEDING`: `1` means succeeding and `0` means failing.
      `UPLOAD_ARTIFACTS` is attempted even if `BUILD` fails."
    facts:
      - succeeding
      - upload-after-failure
  - id: codebuild-018
    q: A CodeBuild phase using a CodeBuild-provided EC2 image encounters a temporary connection error.
      How can the team retry only that error?
    a: "Use phase `on-failure: RETRY-count-regex` to set a retry count and error pattern. Counts range
      from `0` to `100`; plain `RETRY` allows up to `3` retries. This setting is unsupported for
      Lambda compute and reserved capacity."
    facts:
      - retry-regex
      - retry-count
      - retry
      - retry-compute
  - id: codebuild-030
    q: A CodeBuild command fails, but the next phase still runs. Which buildspec setting allows this,
      and where should cleanup go?
    a: "`on-failure: CONTINUE` allows the next phase. Put phase cleanup in `finally`; its commands run
      after a commands-block failure. A failed cleanup command also makes the phase fail."
    facts:
      - continue
      - finally
      - phase-success
  - id: codebuild-045
    q: A CodeBuild project needs to retry a failed build rather than just one failed phase. Which
      StartBuild setting controls this?
    a: Use `autoRetryLimitOverride`. A limit of 2 permits up to 2 additional builds through
      `RetryBuild`; phase `on-failure` instead controls phase failure behavior.
    facts:
      - automatic-build-retry
      - retry
  - id: codebuild-047
    q: A CodePipeline CodeBuild action fails and the team wants an automatic retry. Should it rely on
      the CodeBuild project's automatic build retry?
    a: No. CodeBuild automatic build retry does not support CodePipeline. Configure an automatic
      CodePipeline stage retry, which makes one retry attempt.
    trap: true
    facts:
      - automatic-retry-pipeline
      - pipeline-stage-retry
---
CodeBuild handles command failures at the build phase level. An exit status is the result a command returns to its caller; a check can return a failing status to reject a build.

### How it works

1. Run the phase's commands. If a command fails, skip the remaining commands in that block and run the phase's `finally` block.
2. Apply the phase's `on-failure` behavior when configured. The phase succeeds only if its normal and cleanup commands succeed.
3. Read `CODEBUILD_BUILD_SUCCEEDING` when a command needs the current build result: `1` means succeeding and `0` means failing.
4. Attempt `UPLOAD_ARTIFACTS` even if `BUILD` failed, so failure does not prevent an artifact upload attempt.
5. To retry a failed build rather than a phase, set the automatic retry limit for the build. A StartBuild override applies only to that request.
6. For CodePipeline builds, use stage retry instead. CodeBuild automatic build retry does not support CodePipeline.

| Phase setting | Failure behavior |
|---|---|
| `ABORT` | Stop the build. |
| `CONTINUE` | Continue to the next phase. |
| `RETRY` | Retry up to 3 times for any error. |
| `RETRY-count` | Set a count from 0 through 100. |
| `RETRY-regex` | Retry up to 3 times for a matching error pattern. |
| `RETRY-count-regex` | Set both count and matching error pattern. |

A regular expression, or regex, is a text pattern used here to match error messages.

### Exam cues

- If the question says failed tests must stop CodeBuild, think a test command that returns failure and `ABORT`, because a failed command fails its phase and the policy stops the build.
- If the question says a temporary error should retry but other errors should not, think `RETRY-count-regex`, because it matches the error text and bounds the retries.
- If the question says cleanup must run after a failed command, think `finally`, because the rest of the normal command block is skipped.
- If the question says a failed build should start again, think the automatic build retry limit, because phase retry controls a phase rather than the whole build.
- If the question says a failed CodePipeline build needs automatic retry, think CodePipeline stage retry, because CodeBuild automatic build retry does not support CodePipeline.

### Remember

- `RETRY`: up to 3 retries. An explicit count can be 0 through 100.
- `on-failure` requires CodeBuild-provided EC2 compute images; Lambda compute and reserved capacity do not support it.
- `UPLOAD_ARTIFACTS` is attempted after a `BUILD` failure.
- An automatic retry limit of 2 permits up to 2 additional builds.
- CodeBuild automatic build retry uses the project service role and does not support CodePipeline.

> **Trap:** A report file is evidence to inspect. Make the test or coverage check return failure when the release requirement is unmet, and choose a failure policy that stops the build.
