---
title: Container deployment artifacts
level: associate
order: 70
facts:
  - id: standard-image-file
    text: An ECS standard deploy action consumes imagedefinitions.json by default; the configured
      filename can be changed.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html#pipelines-create-image-definitions
  - id: standard-image-fields
    text: The standard ECS image definitions file is a JSON array containing name and imageUri pairs for
      containers.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html#pipelines-create-image-definitions
  - id: standard-image-limits
    text: The standard ECS image definitions file must use UTF-8 and cannot exceed 100 KB.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html#pipelines-create-image-definitions
  - id: standard-image-artifact
    text: The image definitions file must be included in a source or build artifact provided to the
      deploy action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html#pipelines-create-image-definitions
  - id: standard-task-revision
    text: The standard ECS action creates a task definition revision from the revision currently used by
      the ECS service and ignores unattached revisions.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECS.html#action-reference-ECS
  - id: image-source
    text: An ECR source action starts the pipeline when an image is pushed and can accompany a
      repository source for deployment files.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html#action-reference-ECR
  - id: ecr-detail
    text: An ECR source produces an output artifact containing imageDetail.json with the image URI.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html#action-reference-ECR-output
  - id: ecr-default-tag
    text: An ECR source action defaults ImageTag to latest when no tag is specified.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html#action-reference-ECR-config
  - id: bluegreen-provider
    text: CodeDeployToECS is the ECS blue/green deployment provider in CodePipeline.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen-type
  - id: bluegreen-inputs
    text: CodeDeployToECS uses a task definition template, an AppSpec file, and imageDetail.json image
      input for dynamic image replacement.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen-config
  - id: bluegreen-defaults
    text: CodeDeployToECS defaults to taskdef.json for its task definition template and appspec.yaml for
      its AppSpec.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen-config
  - id: bluegreen-substitution
    text: CodeDeployToECS replaces task definition image placeholders with image URIs and the AppSpec
      <TASK_DEFINITION> placeholder with the generated task definition ARN.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen-config
  - id: bluegreen-meaning
    text: Blue/green deployment runs a new application version alongside the old version before routing
      traffic to the new version.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html#action-reference-ECSbluegreen
  - id: resource-arn
    text: An Amazon Resource Name, or ARN, uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
diagrams:
  - id: pipeline-container-inputs
    title: Image and deployment files meet at the blue/green action
    width: 700
    height: 400
    nodes:
      - id: image
        label: ECR source
        icon: elastic-container-registry
        x: 20
        y: 40
        w: 180
        h: 86
        tone: devtools
        sub: imageDetail.json
      - id: files
        label: Git source
        icon: codecommit
        x: 20
        y: 250
        w: 180
        h: 86
        tone: devtools
        sub: taskdef + AppSpec
      - id: deploy
        label: CodeDeployToECS
        icon: codedeploy
        x: 430
        y: 145
        w: 180
        h: 72
        tone: devtools
    edges:
      - from: image
        to: deploy
        step: 1
        label: image URI
      - from: files
        to: deploy
        step: 2
        label: deployment files
    steps:
      - The ECR source supplies imageDetail.json for the pushed image.
      - The repository supplies task definition and AppSpec files to the same deploy action.
cards:
  - id: codepipeline-020
    q: Which file does the CodePipeline ECS standard deploy action read, and is it the ECS blue/green
      image file?
    a: Standard uses `imagedefinitions.json` by default, with `name` and `imageUri` pairs. Blue/green
      dynamic image input uses `imageDetail.json` alongside a task definition template and AppSpec.
    trap: true
    facts:
      - standard-image-file
      - standard-image-fields
      - bluegreen-inputs
  - id: codepipeline-044
    q: A team wants an ECR image push to trigger a CodePipeline ECS blue/green release while deployment
      files remain in Git. How should sources be arranged?
    a: Use an ECR source for `imageDetail.json` and a repository source for the task definition template
      and AppSpec. Pass their artifacts to `CodeDeployToECS`.
    facts:
      - image-source
      - ecr-detail
      - bluegreen-inputs
      - bluegreen-provider
  - id: codepipeline-045
    q: A CodeBuild image push succeeds, but the CodePipeline ECS standard deploy action cannot find its
      image mapping. What should the build publish?
    a: Include `imagedefinitions.json` in its output artifact, using container `name` and `imageUri`
      pairs. Pushing the image alone does not provide this required input.
    facts:
      - standard-image-artifact
      - standard-image-fields
  - id: codepipeline-046
    q: What encoding and size limit apply to the CodePipeline ECS standard image definitions file?
    a: UTF-8, with a maximum size of 100 KB.
    facts:
      - standard-image-limits
---
Container deployment actions connect an image stored in a registry to an ECS release. The deploy action needs files that identify the image and explain how to deploy it; an image push alone does not supply those files.

### How it works

1. For standard ECS deployment, create `imagedefinitions.json` with a JSON array of container `name` and `imageUri` pairs. Include it in a source or build artifact.
2. The standard action creates a new task definition revision from the one the service currently uses. A task definition is the configuration describing the containers to run.
3. For blue/green deployment, where the new version runs beside the old before traffic switches, use `CodeDeployToECS`.
4. Provide its task definition template, AppSpec deployment instructions, and `imageDetail.json`. An ECR source can generate the image file on push while a Git source supplies deployment files.
5. The action replaces image placeholders in the task definition and replaces `<TASK_DEFINITION>` in the AppSpec with the generated task definition's resource identifier, or ARN.

### Exam cues

- If the question says standard ECS deployment needs the build's image mapping, think `imagedefinitions.json`, because it maps container names to image URIs.
- If the question says an image push should release with deployment files in Git, think ECR plus repository sources, because each supplies a different input to `CodeDeployToECS`.

### Remember

- Standard image file: UTF-8, at most 100 KB; its filename is configurable.
- Blue/green defaults: `taskdef.json` and `appspec.yaml`.
- ECR source default `ImageTag`: `latest`.

> **Trap:** `imageDetail.json` and `imagedefinitions.json` serve different actions. Also, the standard ECS action ignores newly registered task definition revisions that the service is not using.
