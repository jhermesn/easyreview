---
title: Pull request builds
level: associate
order: 80
facts:
  - id: webhook
    text: CodeBuild supports repository webhooks for GitHub, GitHub Enterprise Server, GitLab, GitLab
      Self Managed, and Bitbucket.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/webhooks.html
  - id: pr-events
    text: GitHub PULL_REQUEST_CREATED and PULL_REQUEST_UPDATED webhook events cover newly opened and
      updated pull requests.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/github-webhook.html
  - id: filter-groups
    text: All filters in a webhook group must match; matching any group can trigger the build.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/github-webhook.html
  - id: actor-filter
    text: ACTOR_ACCOUNT_ID filters restrict webhook builds by sender account identifier.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/webhooks.html
  - id: protected-buildspec
    text: An inline or S3 buildspec prevents pull requests from changing the project buildspec.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/webhooks.html
  - id: split-projects
    text: AWS recommends separate webhook test and deployment projects, with no resource write
      permissions on the test role and trusted-user filters on deployment.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/webhooks.html
  - id: approval
    text: With comment approval enabled, trusted contributors build automatically; untrusted
      contributions need a trusted role holder to comment /codebuild_run(<latest-commit-SHA>).
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/pull-request-build-policy.html
  - id: approval-failed
    text: An unapproved pull request build is marked Failed until a valid approval triggers the build;
      results appear on the pull request.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/pull-request-build-policy.html
  - id: approval-default
    text: New projects enable pull request build policy by default with ALL_PULL_REQUESTS.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/pull-request-build-policy.html
  - id: approval-options
    text: DISABLED removes comment approval; FORK_PULL_REQUESTS requires it for forks; ALL_PULL_REQUESTS
      applies it to all pull requests except trusted contributors.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/pull-request-build-policy.html
  - id: source-version
    text: For GitHub and GitHub Enterprise Server webhook pull requests, CODEBUILD_SOURCE_VERSION is
      pr/<pull-request-number>.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  - id: codecommit-events
    text: CodeCommit emits pullRequestCreated and pullRequestSourceBranchUpdated events to EventBridge.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html
  - id: event-build-target
    text: An EventBridge rule can target a CodeBuild project.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html
diagrams:
  - id: codebuild-codecommit-trigger
    title: CodeCommit pull request events start builds
    width: 800
    height: 250
    nodes:
      - id: source
        label: CodeCommit
        x: 30
        y: 80
        w: 160
        h: 72
        tone: devtools
        icon: codecommit
      - id: events
        label: EventBridge
        x: 320
        y: 80
        w: 160
        h: 72
        tone: integration
        icon: eventbridge
      - id: build
        label: CodeBuild
        x: 610
        y: 80
        w: 160
        h: 72
        tone: devtools
        icon: codebuild
    edges:
      - from: source
        to: events
        step: 1
      - from: events
        to: build
        step: 2
    steps:
      - Match pull request creation or source branch update events.
      - Target a CodeBuild project with the matching rule.
cards:
  - id: codebuild-010
    q: Can a CodeCommit pull request use a CodeBuild repository webhook to start tests?
    a: Use CodeCommit EventBridge events such as `pullRequestCreated` and
      `pullRequestSourceBranchUpdated` with a CodeBuild project target. CodeBuild repository
      webhooks support other listed providers, including GitHub, GitLab, and Bitbucket, rather than
      CodeCommit.
    facts:
      - webhook
      - codecommit-events
      - event-build-target
    trap: true
  - id: codebuild-011
    q: A public repository triggers CodeBuild tests with a role that can deploy. How should the team
      reduce access from contributor code?
    a: Separate testing and deployment projects. Give the test role no resource write permissions,
      filter deployment to trusted actors with `ACTOR_ACCOUNT_ID`, and use an inline or S3 buildspec
      to prevent pull request edits to it.
    facts:
      - split-projects
      - actor-filter
      - protected-buildspec
  - id: codebuild-025
    q: A GitHub repository needs CodeBuild tests when a pull request opens or receives commits. Which
      webhook events fit?
    a: "`PULL_REQUEST_CREATED` and `PULL_REQUEST_UPDATED`. Filters within a group all must match; any
      matching group can trigger a build, subject to approval policy."
    facts:
      - pr-events
      - filter-groups
      - approval
  - id: codebuild-026
    q: A CodeBuild project must review untrusted pull requests before executing their code. What should
      it enable?
    a: Pull request comment approval. An untrusted contribution is marked Failed until a trusted
      contributor approves the latest commit with `/codebuild_run(<latest-commit-SHA>)`. New
      projects enable the policy with `ALL_PULL_REQUESTS` by default.
    facts:
      - approval
      - approval-failed
      - approval-default
  - id: codebuild-039
    q: What does CODEBUILD_SOURCE_VERSION contain for a GitHub pull request build triggered by a
      webhook?
    a: "`pr/<pull-request-number>`. This documented format applies to GitHub and GitHub Enterprise
      Server webhook pull requests."
    facts:
      - source-version
---
CodeBuild repository webhooks start builds in response to source events. A webhook is an event notification sent by the repository provider. Pull request builds run tests on proposed changes, while comment approval controls whether untrusted contributions may execute.

### How it works

1. For GitHub pull requests, filter for `PULL_REQUEST_CREATED` and `PULL_REQUEST_UPDATED`. Every filter within a group must match; any matching group can qualify.
2. Apply the pull request build policy. Trusted contributors build automatically; untrusted contributions need a trusted role holder's approval comment for the latest commit.
3. Until approved, the build is marked Failed. The trusted contributor posts `/codebuild_run(<latest-commit-SHA>)`, and CodeBuild checks permissions before starting the build and reporting results on the pull request.
4. Limit the build role's permissions. AWS recommends separate test and deployment projects, trusted-actor filters for deployment, and an inline or S3 buildspec that pull requests cannot edit.

| Comment approval setting | Contributions requiring approval |
|---|---|
| `DISABLED` | None. |
| `FORK_PULL_REQUESTS` | Fork contributions from untrusted contributors. |
| `ALL_PULL_REQUESTS` | All pull requests from untrusted contributors. |

For CodeCommit, use its `pullRequestCreated` and `pullRequestSourceBranchUpdated` EventBridge events with a CodeBuild project target. CodeCommit is outside the documented CodeBuild repository webhook provider list.

### Exam cues

- If the question says run tests before a GitHub pull request merges, think pull request webhook events, because they cover opened and updated proposals.
- If the question says unknown contributors must be reviewed first, think comment approval, because untrusted changes do not start a build until a trusted role holder approves the commit.
- If the question says a public test project has deployment permissions, think separate projects and roles, because webhook code runs with the project's service role.

### Remember

- New projects enable comment approval by default with `ALL_PULL_REQUESTS`.
- `ACTOR_ACCOUNT_ID` filters identify permitted webhook senders.
- For GitHub and GitHub Enterprise Server PR webhooks, `CODEBUILD_SOURCE_VERSION` is `pr/<pull-request-number>`.

> **Trap:** A protected buildspec does not grant trust to pull request code. Keep the test role's permissions limited and require approval where contributor code is untrusted.
