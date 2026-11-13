---
title: Repositories and image tags
level: associate
order: 10
facts:
  - id: registry-definition
    text: An ECR private registry contains private image repositories; each AWS account has a default
      private registry.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html
  - id: repository-definition
    text: An ECR repository stores Docker images, OCI images and compatible artifacts.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html
  - id: image-identifiers
    text: A private ECR image can be pulled using a tag or an image digest.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-pull-ecr-image.html#docker-pull-ecr-image
  - id: digest-definition
    text: An ECR image digest is the SHA-256 digest of the image manifest.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html
  - id: mutable-default
    text: ECR CreateRepository defaults imageTagMutability to MUTABLE when omitted, allowing tag
      overwrites.
    source: https://docs.aws.amazon.com/AmazonECR/latest/APIReference/API_CreateRepository.html#ECR-CreateRepository-request-imageTagMutability
  - id: immutable-tags
    text: IMMUTABLE prevents overwriting image tags; a push using an existing immutable tag returns
      ImageTagAlreadyExistsException.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html#image-tag-mutability
  - id: exclusion-options
    text: IMMUTABLE_WITH_EXCLUSION permits updates to matching excluded tags, while
      MUTABLE_WITH_EXCLUSION protects matching excluded tags.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html#image-tag-mutability
  - id: exclusion-date
    text: AWS documented tag immutability exclusion patterns in July 2025.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/doc-history.html#doc-history
  - id: public-pulls
    text: Anyone can pull images from an ECR public repository; pushing requires Docker client
      authentication and appropriate permissions.
    source: https://docs.aws.amazon.com/AmazonECR/latest/public/public-registries.html#public-registries
  - id: private-auth
    text: Private ECR push and pull operations require Docker client authentication and IAM permissions.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html
  - id: push-trigger
    text: An ECR source action can trigger CodePipeline on image pushes and can be combined with another
      source action for other deployment artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECR.html
cards:
  - id: ecr-002
    q: A team must prevent release tags in an ECR repository from being overwritten. Which setting
      should it use?
    a: Set image tag mutability to IMMUTABLE. Pushes that reuse existing tags fail with
      ImageTagAlreadyExistsException. Pull by digest when an exact image manifest is required.
    facts:
      - immutable-tags
      - image-identifiers
      - digest-definition
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
Amazon ECR stores container images in repositories. A registry is the collection of repositories for an account. An image tag is a name used to select an image; an image digest is the SHA-256 content identifier of its manifest, the image description used to retrieve it.

### How it works

1. Use a private repository for controlled image access or a public repository for images anyone may pull. Authenticate the Docker client before private pushes or pulls, or before public pushes.
2. Push an image with a tag and choose the repository's tag mutability setting. Mutability determines whether a later push can reuse that tag for different content.
3. Pull by tag for a named reference or by digest for a specific manifest.
4. To start a release on an image push, use a CodePipeline ECR source action. Add another source action when deployment files live in source control.

| Setting | Tags that can be overwritten |
|---|---|
| `MUTABLE` | All tags; default when omitted in CreateRepository |
| `IMMUTABLE` | No tags |
| `IMMUTABLE_WITH_EXCLUSION` | Only tags matching exclusion filters |
| `MUTABLE_WITH_EXCLUSION` | Tags that do not match exclusion filters |

### Exam cues

- If the question says release tags must never move, think `IMMUTABLE`, because it rejects overwriting an existing tag.
- If the question says protect releases but keep `latest` movable, think immutability with an exclusion, because matching tags can remain mutable.
- If the question says distribute images for anonymous downloads, think ECR Public, because anyone can pull public images.

### Remember

- CreateRepository defaults to `MUTABLE`.
- Reusing an immutable tag returns `ImageTagAlreadyExistsException`.
- AWS documented tag exclusion patterns in July 2025; older questions may assume immutability applies to every tag.

> **Trap:** Public pull access does not grant public push access. Publishing an image still requires authentication and permission.
