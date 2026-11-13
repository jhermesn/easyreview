---
title: Cross-Region actions
level: professional
order: 100
facts:
  - id: regional-action
    text: A cross-Region action runs an AWS action provider in a Region different from the pipeline
      Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-buckets
    text: A pipeline needs an artifact bucket in its own Region and in every Region where it runs an
      action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-owner
    text: The artifact bucket and encryption key for a cross-Region action must be in that action Region
      and the pipeline account.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-stores
    text: Use the artifactStores mapping to configure Region-specific artifact stores.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region-cli
  - id: regional-copy
    text: CodePipeline copies only the input artifacts needed by a cross-Region action from the pipeline
      Region to the action Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-restrictions
    text: Source, third-party, and custom actions cannot be cross-Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-pipeline
    text: Adding a cross-Region action does not move the pipeline or its change detection resources to
      another Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: regional-lambda-result
    text: For a cross-Region Lambda action, send PutJobSuccessResult or PutJobFailureResult to the
      Lambda function Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
diagrams:
  - id: pipeline-regional-artifacts
    title: CodePipeline copies inputs to the action Region
    width: 1000
    height: 260
    nodes:
      - id: home
        label: Artifact bucket
        icon: res-simple-storage-service-bucket
        x: 40
        y: 90
        w: 180
        h: 86
        tone: storage
        sub: pipeline Region
      - id: remote
        label: Artifact bucket
        icon: res-simple-storage-service-bucket
        x: 400
        y: 90
        w: 180
        h: 86
        tone: storage
        sub: action Region
      - id: deploy
        label: Deploy action
        icon: codedeploy
        x: 760
        y: 90
        w: 180
        h: 86
        tone: devtools
        sub: action Region
    edges:
      - from: home
        to: remote
        step: 1
        label: copy inputs
      - from: remote
        to: deploy
        step: 2
        label: read inputs
    steps:
      - CodePipeline copies the action input artifacts into the action Region bucket.
      - The cross-Region action uses its regional artifact store.
cards:
  - id: codepipeline-013
    q: A CodePipeline pipeline must deploy through actions in another Region. What artifact storage is
      required?
    a: Provide an artifact bucket and encryption key in each action Region, in the pipeline account, and
      configure `artifactStores`. CodePipeline copies the cross-Region action input artifacts there.
    facts:
      - regional-buckets
      - regional-owner
      - regional-stores
      - regional-copy
  - id: codepipeline-049
    q: A CodePipeline Lambda action runs in a different Region from the pipeline and its result callback
      is not completing the job. Which endpoint should receive the result?
    a: The CodePipeline endpoint in the Lambda function Region, using `PutJobSuccessResult` or
      `PutJobFailureResult`.
    facts:
      - regional-lambda-result
  - id: codepipeline-050
    q: Which CodePipeline action types cannot be cross-Region?
    a: Source, third-party, and custom actions.
    facts:
      - regional-restrictions
---
A cross-Region action lets a pipeline deploy or run other supported AWS actions outside its home Region. CodePipeline moves the required input files to a regional artifact store, the S3 location holding action files.

### How it works

1. Keep an artifact bucket in the pipeline Region.
2. Provide a bucket and encryption key in each action Region. Those resources belong to the pipeline account.
3. Declare regional stores in `artifactStores` and configure the action's Region.
4. CodePipeline copies that action's input artifacts to its regional bucket before running it.
5. The pipeline and change detection resources remain in their original Region.

### Exam cues

- If the question says deploy to multiple Regions from one pipeline, think regional artifact buckets and keys, because each action needs its inputs in its own Region.
- If the question says a cross-Region Lambda result never completes the job, think the function's Region, because its result must go to that Region's CodePipeline endpoint.

### Remember

- Artifact storage: pipeline Region plus each action Region, in the pipeline account.
- Only the cross-Region action's input artifacts are copied for that action.
- Source, third-party, and custom actions cannot be cross-Region.

> **Trap:** A bucket in the pipeline Region alone is insufficient for a deployment action in another Region. Adding that action also does not relocate the pipeline.
