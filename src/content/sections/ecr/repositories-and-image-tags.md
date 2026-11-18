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
  - id: exclusion-date
    text: AWS documented tag immutability exclusion patterns in July 2025.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/doc-history.html#doc-history
  - id: private-auth
    text: Private ECR push and pull operations require Docker client authentication and IAM permissions.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html
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
---
Amazon ECR stores container images in repositories. A registry is the collection of repositories for an account. An image tag is a name used to select an image; an image digest is the SHA-256 content identifier of its manifest, the image description used to retrieve it.

### How it works

1. Use a private repository for controlled image access. Authenticate the Docker client before private pushes or pulls.
2. Push an image with a tag and choose the repository's tag mutability setting. Mutability determines whether a later push can reuse that tag for different content.
3. Pull by tag for a named reference or by digest for a specific manifest.

| Setting | Tags that can be overwritten |
|---|---|
| `MUTABLE` | All tags; default when omitted in CreateRepository |
| `IMMUTABLE` | No tags |

### Exam cues

- If the question says release tags must never move, think `IMMUTABLE`, because it rejects overwriting an existing tag.
- If the question says pull a specific image manifest, think image digest, because it identifies the manifest by its SHA-256 digest.

### Remember

- CreateRepository defaults to `MUTABLE`.
- Reusing an immutable tag returns `ImageTagAlreadyExistsException`.

> **Trap:** A mutable tag can be overwritten. Use an immutable tag to prevent reuse, or pull by digest to select a specific manifest.
