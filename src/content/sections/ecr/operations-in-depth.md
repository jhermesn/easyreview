---
title: "PLACEHOLDER ecr/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
