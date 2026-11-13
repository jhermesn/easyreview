---
title: Buildspec phases
level: associate
order: 10
facts:
  - id: buildspec
    text: A buildspec is a YAML document containing build commands and settings.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-syntax
  - id: default-location
    text: The default source buildspec is buildspec.yml in the source root.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage
  - id: project-override
    text: The project buildspec setting can select another source-relative file.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage
  - id: build-override
    text: StartBuild buildspecOverride can select another source-relative file for a build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage
  - id: s3-buildspec
    text: An S3 buildspec is specified by object ARN and its bucket must be in the project Region.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage
  - id: one-buildspec
    text: A project specifies one buildspec.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-name-storage
  - id: inline-buildspec
    text: A buildspec can be defined in the project rather than included in source.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref
  - id: phase-order
    text: The buildspec phase order is install, pre_build, build, post_build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases
  - id: install-purpose
    text: The install phase installs packages needed by the build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.install
  - id: pre-build-purpose
    text: The pre_build phase runs preparation commands such as signing in to ECR.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.pre_build
  - id: build-purpose
    text: The build phase runs build or test commands.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.build
  - id: post-build-purpose
    text: The post_build phase runs commands after the build, such as packaging or pushing an image.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.post_build
  - id: shell-state
    text: Buildspec version 0.1 isolates each command in a separate shell; version 0.2 resolves that
      state-sharing limitation.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases
  - id: finally
    text: A phase runs its finally commands even if a command in its commands block fails.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases.finally
  - id: environment
    text: A build environment combines an operating system, language runtime, and tools in a Docker
      image.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref.html
  - id: custom-image
    text: Build images can come from the CodeBuild image repository, Docker Hub, or accessible ECR
      repositories.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref.html
diagrams:
  - id: codebuild-phase-order
    title: Configured buildspec phase order
    width: 800
    height: 250
    nodes:
      - id: install
        label: install
        x: 20
        y: 70
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
      - id: pre
        label: pre_build
        x: 220
        y: 70
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
      - id: build
        label: build
        x: 420
        y: 70
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
      - id: post
        label: post_build
        x: 620
        y: 70
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
    edges:
      - from: install
        to: pre
        step: 1
      - from: pre
        to: build
        step: 2
      - from: build
        to: post
        step: 3
    steps:
      - Finish installation before preparation.
      - Run build or test commands after preparation.
      - Run post-build commands after the build.
cards:
  - id: codebuild-001
    q: Where does CodeBuild find its buildspec by default, and how can a project use another file?
    a: "`buildspec.yml` in the source root. Set the project buildspec or a per-build
      `buildspecOverride`; an S3 buildspec uses its object ARN and a bucket in the project Region.
      An inline project buildspec is also supported."
    facts:
      - default-location
      - project-override
      - build-override
      - s3-buildspec
      - inline-buildspec
      - one-buildspec
  - id: codebuild-002
    q: What is the CodeBuild buildspec phase order, and what does a phase finally block do?
    a: "`install`, `pre_build`, `build`, `post_build`. A phase runs its `finally` commands even after a
      command in that phase fails. Use version `0.2` for commands that share shell state."
    facts:
      - phase-order
      - finally
      - shell-state
  - id: codebuild-031
    q: A CodeBuild build changes directory in one command, but the next command cannot see that change
      under buildspec version 0.1. What should the team change?
    a: Use buildspec version `0.2`. Version `0.1` starts a separate shell for each command.
    facts:
      - shell-state
  - id: codebuild-032
    q: A CodeBuild project needs a compiler already packaged in an internal ECR image. How can the build
      environment use it?
    a: Select that accessible ECR image as the build image. The image supplies the operating system,
      runtime, and tools; the buildspec supplies the commands.
    facts:
      - environment
      - custom-image
      - buildspec
---
A CodeBuild buildspec is a YAML file, a text format for structured settings, that tells the build environment which commands to run. The environment image supplies the operating system, language runtime, and tools; the buildspec supplies the recipe.

### How it works

1. Select a CodeBuild-provided image or an accessible custom image from ECR or Docker Hub.
2. Load `buildspec.yml` from the source root, or choose a project or build override. An inline project buildspec is also supported. An S3 buildspec uses its object ARN, the AWS resource identifier, and a bucket in the project Region.
3. Run the configured phases in order. Use `install` to install packages, `pre_build` to prepare, `build` to compile or test, and `post_build` to package or publish.
4. Run each phase's `finally` block after its commands, including when a command fails.

### Exam cues

- If the question says a directory change disappears between CodeBuild commands, think buildspec version `0.2`, because version `0.1` isolates commands in separate shells.
- If the question says a build needs a custom compiler environment, think a custom ECR image, because the image supplies the tools used by the buildspec.
- If the question says one repository needs a different build recipe for a particular run, think `buildspecOverride`, because it selects that build's alternate file.

### Remember

- Default file: `buildspec.yml` at the source root.
- Phase order: `install`, `pre_build`, `build`, `post_build`.
- S3 buildspec bucket: same Region as the project.
- A project specifies one buildspec.

> **Trap:** A `finally` block belongs to its phase. It can run after that phase's command fails; it is not a replacement for the phase order.
