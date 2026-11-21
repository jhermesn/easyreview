---
title: Tag exclusions and image delivery
level: professional
order: 60
facts:
  - id: exclusion-options
    text: IMMUTABLE_WITH_EXCLUSION permits updates to matching excluded tags, while
      MUTABLE_WITH_EXCLUSION protects matching excluded tags.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html#image-tag-mutability
  - id: public-pulls
    text: Anyone can pull images from an ECR public repository; pushing requires Docker client
      authentication and appropriate permissions.
    source: https://docs.aws.amazon.com/AmazonECR/latest/public/public-registries.html#public-registries
  - id: push-trigger
    text: An ECR source action can trigger CodePipeline on image pushes and can be combined with another
      source action for other deployment artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html
cards:
  - id: ecr-009
    q: A team wants ECR release tags protected but wants its latest tag to remain movable. What can it
      configure?
    a: Use IMMUTABLE_WITH_EXCLUSION and an exclusion filter matching latest. Matching excluded tags can
      be updated.
    facts:
      - exclusion-options
  - id: ecr-010
    q: Can anonymous users push images to an ECR public repository because anonymous pulls are allowed?
    a: No. Public pulls are available to anyone, but Docker pushes require authentication and
      permission.
    trap: true
    facts:
      - public-pulls
  - id: ecr-011
    q: A release pipeline must start when an image is pushed to ECR and also needs deployment files from
      source control. How should its source stage be configured?
    a: Use an ECR source action alongside another source action for the deployment files. The ECR source
      action triggers on an image push.
    facts:
      - push-trigger
---
Amazon ECR supports tag exclusions, public image access and image push triggers for delivery pipelines. These settings let a team choose which tags can move, who can publish an image and how an image push starts a pipeline.

### How it works

1. Choose an exclusion setting. With `IMMUTABLE_WITH_EXCLUSION`, matching tags can be updated. With `MUTABLE_WITH_EXCLUSION`, matching tags are protected from updates.
2. Anyone can pull from a public repository. To push, authenticate the Docker client and have the required permissions.
3. Use an ECR source action to trigger CodePipeline on an image push. Add another source action when the pipeline also needs deployment files from source control.

### Exam cues

- If the question says release tags must stay protected while `latest` can move, think `IMMUTABLE_WITH_EXCLUSION` with a filter matching `latest`, because excluded tags can be updated.
- If the question says an image push should start a pipeline that also needs deployment files, think an ECR source action plus another source action, because each can supply its respective source.

### Remember

- `IMMUTABLE_WITH_EXCLUSION` allows updates to matching excluded tags.
- `MUTABLE_WITH_EXCLUSION` protects matching excluded tags.
- Public image pushes require Docker authentication and permission.

> **Trap:** Anyone can pull a public image, but public access does not allow anonymous pushes. A push still requires an authenticated Docker client and permission.
