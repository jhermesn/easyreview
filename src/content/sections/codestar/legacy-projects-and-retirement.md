---
title: Legacy projects and retirement
level: associate
order: 10
facts:
  - id: project-toolchain
    text: AWS CodeStar provided a unified interface to set up a continuous delivery toolchain and manage development activities.
    source: https://aws.amazon.com/about-aws/whats-new/2017/04/introducing-aws-codestar/
  - id: project-access
    text: CodeStar projects supported owners, contributors, and viewers.
    source: https://aws.amazon.com/about-aws/whats-new/2017/04/introducing-aws-codestar/
  - id: shutdown
    text: AWS CodeStar reached full shutdown on July 25, 2024 and is no longer available or supported.
    source: https://docs.aws.amazon.com/general/latest/gr/full_shutdown_services.html#full_shutdown_services
  - id: connections-rename
    text: AWS CodeStar Connections was renamed AWS CodeConnections on March 29, 2024.
    source: https://docs.aws.amazon.com/dtconsole/latest/userguide/rename.html#rename
  - id: connections-prefix
    text: Both codestar-connections and codeconnections resource prefixes remain available; IAM policy service prefixes must match the resource prefix.
    source: https://docs.aws.amazon.com/dtconsole/latest/userguide/rename.html#rename
  - id: source-action
    text: CodePipeline connection source actions use CodeConnections to connect third-party repositories and can start a pipeline on a new commit.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodestarConnectionSource.html#action-reference-CodestarConnectionSource
cards:
  - id: codestar-001
    q: "What part of the software development lifecycle did AWS CodeStar support?"
    a: "CodeStar provided a unified interface for development activities and setting up a continuous delivery toolchain."
    facts:
      - project-toolchain
  - id: codestar-002
    q: "A legacy AWS CodeStar project used a continuous delivery toolchain. What development work did CodeStar bring together?"
    a: "It provided a unified interface for setting up that toolchain and managing development activities."
    facts:
      - project-toolchain
  - id: codestar-003
    q: A team needs CodePipeline to start when a third-party repository receives a commit. Does CodeStar's shutdown prevent this?
    a: No. Use a CodePipeline connection source action with AWS CodeConnections.
    facts: [shutdown, source-action]
  - id: codestar-004
    q: "How can a CodePipeline source action start the release process when a developer commits to a third-party repository?"
    a: "A connection source action uses CodeConnections to connect the repository and can start the pipeline on a new commit."
    facts:
      - source-action
  - id: codestar-005
    q: "What development lifecycle toolchain could an AWS CodeStar project set up?"
    a: "A continuous delivery toolchain, managed alongside development activities through a unified interface."
    facts:
      - project-toolchain
---
AWS CodeStar was a project interface for organizing application development and setting up a continuous delivery toolchain, the tools that move changes toward release. It is now shut down.

### How it works

1. A CodeStar project brought development activities into one interface and provided a continuous delivery toolchain.
2. Teams could assign project access as owners, contributors, or viewers.
3. CodeStar reached full shutdown on July 25, 2024. It is no longer available or supported.
4. Separately, AWS CodeConnections connects AWS resources to third-party repositories. A CodePipeline source action can use a connection to start a pipeline when a new commit arrives.

### Exam cues

- If the question says a legacy project unifies development activities, think AWS CodeStar, because it provided a project interface and toolchain.
- If the question says start a pipeline from a third-party repository commit, think CodeConnections, because the CodePipeline source action uses a connection.
- If the question says an IAM policy must access an old connection resource, think matching the resource prefix, because old and new prefixes remain available.

### Remember

- CodeStar shut down on July 25, 2024.
- CodeStar Connections became AWS CodeConnections on March 29, 2024.

> **Trap:** CodeStar's shutdown does not mean CodeConnections is unavailable. The connection service was renamed.
