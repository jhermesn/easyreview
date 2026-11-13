---
title: Artifacts and variables
level: associate
order: 30
facts:
  - id: artifact-files
    text: Artifacts are files or file sets passed between actions through named inputs and outputs.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-artifacts
  - id: artifact-s3
    text: CodePipeline stores pipeline artifacts in an S3 artifact bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-artifacts
  - id: variable-syntax
    text: "Action variables require a namespace on the producer and use the reference syntax
      #{namespace.variable_key}."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-concepts-namespaces
  - id: variable-order
    text: An action consuming another action variable must run in a later stage or at a higher runOrder
      in the same stage.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-rules
  - id: build-exports
    text: CodeBuild action output variables come from environment variables exported during the build.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html#actions-variables
  - id: buildspec-exports
    text: CodeBuild lists environment variable names to export under env/exported-variables in the
      buildspec.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.env.exported-variables
  - id: stack-outputs
    text: CloudFormation action variables come from stack Outputs.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-variables
  - id: pipeline-inputs
    text: V2 supports pipeline-level variables supplied at execution time.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: pipeline-syntax
    text: "Pipeline-level variables use the variables namespace, as in #{variables.variable_name}."
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-concepts-namespaces
  - id: required-input
    text: A pipeline-level variable without a default must have a value supplied when the execution
      starts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-pipeline-level
  - id: no-source-inputs
    text: Pipeline-level variables cannot be used in Source actions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-pipeline-level
  - id: buildspec-meaning
    text: A buildspec contains the build commands and related settings used by CodeBuild.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref
  - id: source-commit-id
    text: CodeCommit source actions expose the CommitId output variable.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html#reference-variables-output-CodeCommit
cards:
  - id: codepipeline-006
    q: How do CodePipeline actions share files and generated configuration values?
    a: Files use named output and input artifacts stored in S3. Values use output variables from a
      producer namespace, referenced as `#{namespace.variable_key}` by a later action.
    facts:
      - artifact-files
      - artifact-s3
      - variable-syntax
      - variable-order
  - id: codepipeline-007
    q: What are CodePipeline pipeline-level variables?
    a: V2 execution inputs referenced as `#{variables.variable_name}`. If an input has no default,
      supply it when starting the execution. They cannot be used in Source actions.
    facts:
      - pipeline-inputs
      - pipeline-syntax
      - required-input
      - no-source-inputs
  - id: codepipeline-021
    q: A CodeBuild build must send a generated image tag to a later CodePipeline action without a file.
      What configuration is needed?
    a: List the tag variable under `env/exported-variables`, give the CodeBuild action a namespace, and
      reference the variable from a later action.
    facts:
      - build-exports
      - buildspec-exports
      - variable-syntax
      - variable-order
  - id: codepipeline-036
    q: A CodePipeline action references a build output variable but runs at the same runOrder as the
      build in the same stage. How should the team fix it?
    a: Increase the consumer runOrder or move it to a later stage. The producing action must finish
      before its variables can be consumed.
    trap: true
    facts:
      - variable-order
---
CodePipeline passes files as artifacts and small configuration values as variables. An artifact is a named bundle of files; a namespace is the name that identifies a producer's variables.

### How it works

1. Give an action's output artifact a name. A later action lists that name as an input. CodePipeline stores the files in S3.
2. Assign a namespace to an action that produces variables. Reference a value as `#{namespace.variable_key}` in a later action's configuration.
3. For CodeBuild values, list exported names under `env/exported-variables` in the buildspec, the file containing build instructions. CloudFormation can expose stack `Outputs`, and CodeCommit exposes `CommitId`.
4. Make the consumer run at a higher `runOrder` or in a later stage so the producer finishes first.
5. For V2 execution inputs, declare pipeline-level variables and reference `#{variables.variable_name}`. Supply required values when starting the run.

### Exam cues

- If the question says pass a generated image tag without a file, think exported CodeBuild variable and action namespace, because the next action needs a configuration value.
- If the question says deploy the same pipeline with a different runtime input, think V2 pipeline-level variables, because their values resolve for each execution.

### Remember

- Files: named input and output artifacts in S3.
- Generated values: producer namespace and a later consumer.
- A pipeline variable without a default requires a value at execution start.

> **Trap:** Pipeline-level variables cannot be used in Source actions. Action variables also cannot be consumed by an action that runs in parallel with their producer.
