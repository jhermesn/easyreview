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
    q: Which retired AWS service provided a project interface for a continuous delivery toolchain?
    a: AWS CodeStar. It reached full shutdown on July 25, 2024.
    trap: true
    facts: [project-toolchain, shutdown]
  - id: codestar-002
    q: What is the status of AWS CodeStar and AWS CodeStar Connections?
    a: CodeStar shut down on July 25, 2024. CodeStar Connections was renamed AWS CodeConnections.
    trap: true
    facts: [shutdown, connections-rename]
  - id: codestar-003
    q: A team needs CodePipeline to start when a third-party repository receives a commit. Does CodeStar's shutdown prevent this?
    a: No. Use a CodePipeline connection source action with AWS CodeConnections.
    facts: [shutdown, source-action]
  - id: codestar-004
    q: A policy grants access to an existing codestar-connections resource. Which IAM service prefix should match that resource?
    a: Use the codestar-connections prefix for that resource. The prefix must match the resource.
    facts: [connections-prefix]
  - id: codestar-005
    q: Which access roles did AWS CodeStar projects support?
    a: Owners, contributors, and viewers.
    facts: [project-access]
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
