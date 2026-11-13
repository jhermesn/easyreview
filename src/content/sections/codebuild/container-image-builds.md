---
title: Container image builds
level: associate
order: 90
facts:
  - id: image-build
    text: The Docker sample builds an image and pushes it to an ECR repository using build commands.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html
  - id: ecr-login
    text: The sample signs in with aws ecr get-login-password piped to docker login during pre_build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html
  - id: image-phases
    text: The sample runs docker build and docker tag in build and docker push in post_build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html
  - id: ecr-permissions
    text: ECR publishing needs ecr:GetAuthorizationToken, ecr:BatchCheckLayerAvailability,
      ecr:InitiateLayerUpload, ecr:UploadLayerPart, ecr:CompleteLayerUpload, and ecr:PutImage.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html
  - id: docker-daemon
    text: The Docker daemon is enabled by default for non-VPC builds; VPC Docker builds need privileged
      mode.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: cache-mode
    text: Docker layer caching requires Linux and privileged mode.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: custom-docker
    text: The AWS custom-image sample uses docker:dind from Docker Hub to build and run an image.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html
  - id: windows-privilege
    text: Windows does not support privileged mode.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
diagrams:
  - id: codebuild-ecr-publish
    title: Authenticate, build, and publish an image
    width: 800
    height: 250
    nodes:
      - id: login
        label: pre_build
        x: 30
        y: 80
        w: 160
        h: 86
        tone: devtools
        icon: codebuild
        sub: ECR login
      - id: build
        label: build
        x: 320
        y: 80
        w: 160
        h: 86
        tone: devtools
        icon: codebuild
        sub: Build and tag
      - id: ecr
        label: ECR
        x: 610
        y: 80
        w: 160
        h: 86
        tone: devtools
        icon: elastic-container-registry
        sub: "post_build: push"
    edges:
      - from: login
        to: build
        step: 1
      - from: build
        to: ecr
        step: 2
    steps:
      - Authenticate before building and tagging the image.
      - Push the tagged image to ECR in post_build.
cards:
  - id: codebuild-007
    q: A CodeBuild build fails when it tries to publish a Docker image to ECR. What should the team
      check?
    a: Check Docker daemon availability, privileged mode for VPC Docker builds, ECR login, and the role
      push permissions. AWS documents the daemon as enabled by default for non-VPC builds. Docker
      layer caching separately requires Linux and privileged mode.
    facts:
      - docker-daemon
      - ecr-login
      - ecr-permissions
      - cache-mode
  - id: codebuild-040
    q: A CodeBuild build produces a Docker image locally, but no image appears in ECR. Which build step
      is missing?
    a: An authenticated `docker push`. In the AWS sample, `pre_build` logs in, `build` builds and tags,
      and `post_build` pushes the image.
    facts:
      - image-build
      - ecr-login
      - image-phases
  - id: codebuild-041
    q: Which ECR permissions does the AWS CodeBuild image publishing sample grant?
    a: "`ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:InitiateLayerUpload`,
      `ecr:UploadLayerPart`, `ecr:CompleteLayerUpload`, and `ecr:PutImage`."
    facts:
      - ecr-permissions
---
CodeBuild can build a Docker image and publish it to ECR. An image packages software for running in a container; ECR stores that image in a repository. Build commands explicitly authenticate, build, tag, and push it.

### How it works

1. Select an image with the Docker tools needed for the build. AWS also documents a custom build image example using `docker:dind` from Docker Hub.
2. Ensure the Docker daemon, the process that builds and runs containers, is available. AWS documents it as enabled by default for non-VPC builds. Enable privileged mode for VPC Docker builds; that mode grants the required Docker permissions.
3. In `pre_build`, authenticate to ECR using `aws ecr get-login-password` with `docker login`.
4. In `build`, run `docker build` and `docker tag`. In `post_build`, run `docker push` to publish to ECR.

### Exam cues

- If the question says the image exists locally but is absent from ECR, think `docker push`, because building and publishing are separate commands.
- If the question says ECR login succeeds but image upload is denied, think the role's ECR upload permissions, because obtaining an authorization token is only part of publishing.
- If the question says Docker fails inside a VPC build, think privileged mode and daemon availability, because VPC Docker builds need that configuration.

### Remember

- ECR publishing permissions: `GetAuthorizationToken`, `BatchCheckLayerAvailability`, `InitiateLayerUpload`, `UploadLayerPart`, `CompleteLayerUpload`, and `PutImage`, all under `ecr:`.
- Docker layer caching requires Linux and privileged mode.
- Windows does not support privileged mode.

> **Trap:** Do not confuse the build environment image with the image your commands produce. The environment supplies tools; `docker push` publishes the resulting application image.
