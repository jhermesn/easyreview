---
title: Repository events
level: associate
order: 40
facts:
  - id: event-routing
    text: EventBridge matches CodeCommit events with rules and routes matching events to configured targets.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html
  - id: event-source
    text: CodeCommit events use source aws.codecommit; pull request events use detail-type CodeCommit Pull Request State Change.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html#pullRequestCreated
  - id: pull-request-created
    text: The pullRequestCreated event reports creation of a pull request.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html#pullRequestCreated
  - id: pull-request-updated
    text: The pullRequestSourceBranchUpdated event reports a change to a pull request's source branch.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html#pullRequestSourceBranchUpdated
  - id: reference-update
    text: A referenceUpdated event reports an updated branch and uses detail-type CodeCommit Repository State Change with referenceType and referenceName fields.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/monitoring-events.html#referenceUpdated
  - id: direct-build-target
    text: An EventBridge rule matching pullRequestCreated and pullRequestSourceBranchUpdated can directly target a CodeBuild project for pull request checks.
    source: https://aws.amazon.com/blogs/devops/automated-code-review-on-pull-requests-using-aws-codecommit-and-aws-codebuild/
  - id: build-source-version
    text: CodeBuild StartBuild accepts sourceVersion to select a CodeCommit commit ID, branch, or tag for the build.
    source: https://docs.aws.amazon.com/codebuild/latest/APIReference/API_StartBuild.html#CodeBuild-StartBuild-request-sourceVersion
  - id: build-comments
    text: A CodeBuild project can run checks and post the results as pull request comments when its service role has the required CodeCommit permissions.
    source: https://aws.amazon.com/blogs/devops/automated-code-review-on-pull-requests-using-aws-codecommit-and-aws-codebuild/
  - id: result-lambda
    text: A build-completion event can invoke Lambda to post build results and a build-log link to the CodeCommit pull request.
    source: https://aws.amazon.com/blogs/devops/validating-aws-codecommit-pull-requests-with-aws-codebuild-and-aws-lambda/
  - id: native-webhooks
    text: CodeBuild native webhooks support GitHub, GitHub Enterprise Server, GitLab, GitLab Self Managed, and Bitbucket, not CodeCommit.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/webhooks.html
  - id: release-trigger
    text: CodePipeline can use EventBridge to detect CodeCommit branch changes; AWS examples filter referenceCreated and referenceUpdated by branch type and branch name.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/update-change-detection.html
  - id: trigger-targets
    text: CodeCommit repository triggers can publish to SNS or invoke Lambda.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html
  - id: trigger-limit
    text: A CodeCommit repository supports at most 10 repository triggers.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html
  - id: trigger-region
    text: An SNS topic or Lambda function targeted by a CodeCommit repository trigger must be in the repository's Region.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html#how-to-notify-permissions
  - id: trigger-permissions
    text: A Lambda trigger created in the Lambda console includes invocation permissions; a trigger created in CodeCommit requires a policy allowing invocation.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html#how-to-notify-permissions
  - id: trigger-event-options
    text: Repository trigger event options are all, updateReference, createReference, and deleteReference; all cannot be combined with other event options.
    source: https://docs.aws.amazon.com/codecommit/latest/APIReference/API_RepositoryTrigger.html#CodeCommit-Type-RepositoryTrigger-events
  - id: trigger-branches
    text: A repository trigger without a branch list applies to all branches in the repository.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify-sns.html#how-to-notify-sns-cli
  - id: notification-rules
    text: Repository notification rules send emails for selected event types through an SNS topic, including comment activity.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-repository-email.html#how-to-repository-email-using
  - id: trigger-scope
    text: Repository triggers cover operational events such as branch creation and pushes, and do not use event rules to evaluate repository activity.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-repository-email.html#how-to-repository-email-using
  - id: event-delivery
    text: CodeCommit service events sent directly to EventBridge use best-effort delivery.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-codecommit.html
  - id: best-effort-delivery
    text: Best-effort delivery means a service attempts to send every event to EventBridge, but an event can occasionally go undelivered.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/event-delivery-level.html
  - id: service-role
    text: A service role is an IAM role a service assumes to perform actions on a customer's behalf.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: notification-topic
    text: An SNS topic is a named communication channel that groups notification recipients.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html
diagrams:
  - id: codecommit-pull-request-tests
    title: Test a pull request and return build results
    width: 800
    height: 450
    nodes:
      - { id: repo, label: CodeCommit, sub: Pull request, icon: codecommit, x: 30, y: 55, w: 170, h: 86, tone: devtools }
      - { id: pr-rule, label: EventBridge, sub: Request events, icon: eventbridge, x: 310, y: 55, w: 170, h: 86, tone: integration }
      - { id: build, label: CodeBuild, sub: Run tests, icon: codebuild, x: 590, y: 55, w: 170, h: 86, tone: devtools }
      - { id: result-rule, label: EventBridge, sub: Build completion, icon: eventbridge, x: 590, y: 320, w: 170, h: 86, tone: integration }
      - { id: comment, label: Lambda, sub: Post results, icon: lambda, x: 30, y: 320, w: 170, h: 86, tone: compute }
    edges:
      - { from: repo, to: pr-rule, step: 1 }
      - { from: pr-rule, to: build, step: 2 }
      - { from: build, to: result-rule, step: 3 }
      - { from: result-rule, to: comment, step: 4 }
      - { from: comment, to: repo, step: 5 }
    steps:
      - A rule matches pullRequestCreated or pullRequestSourceBranchUpdated for the repository.
      - The rule starts a CodeBuild project for the proposed source revision.
      - CodeBuild runs the tests and emits a build-completion event.
      - A result rule invokes the Lambda function with the build outcome.
      - Lambda posts the result and a build-log link to the pull request.
cards:
  - id: codecommit-006
    q: Which options react to CodeCommit activity?
    a: |-
      Use EventBridge rules for repository and pull request automation, repository triggers for SNS or Lambda actions, or notification rules for email about selected activity.
      Repository triggers are limited to 10 per repository, and their SNS or Lambda target must be in the same Region.
    facts: [event-routing, pull-request-created, pull-request-updated, reference-update, trigger-targets, trigger-limit, trigger-region, notification-rules]
  - id: codecommit-007
    q: A team needs tests on every CodeCommit pull request and a result comment. What should it configure?
    a: |-
      Match `pullRequestCreated` and `pullRequestSourceBranchUpdated` with EventBridge and start CodeBuild using the proposed commit as sourceVersion.
      A build-completion rule can invoke Lambda to post results. CodeBuild can also post comments itself with the required permissions. Native CodeBuild webhooks do not support CodeCommit.
    facts: [pull-request-created, pull-request-updated, direct-build-target, build-source-version, result-lambda, build-comments, native-webhooks]
  - id: codecommit-021
    q: A CodeCommit repository must email reviewers when someone comments on code. Which feature fits?
    a: A repository notification rule for the comment event types, using an SNS topic. Repository triggers cover a narrower set of operational events.
    facts: [notification-rules, trigger-scope]
  - id: codecommit-022
    q: A release pipeline should start when the main branch in CodeCommit changes, while pull requests should run separate tests. Which events distinguish those paths?
    a: Use repository referenceUpdated events filtered to branch main for release changes. Use pullRequestCreated and pullRequestSourceBranchUpdated for pull request checks.
    facts: [reference-update, release-trigger, pull-request-created, pull-request-updated]
  - id: codecommit-023
    q: A team creates a CodeCommit repository trigger with no branch list. Which branches does it monitor, and where must its Lambda target run?
    a: It applies to all branches. The Lambda function must be in the same Region as the repository.
    facts: [trigger-branches, trigger-region]
  - id: codecommit-024
    q: Is updateReference a CodeCommit EventBridge event name or a repository trigger event option?
    a: It is a repository trigger event option. The corresponding EventBridge event is named referenceUpdated.
    trap: true
    facts: [trigger-event-options, reference-update]
---
CodeCommit events let repository activity start automated work or notify people. An event describes a change; an EventBridge rule matches its fields and sends it to a target, such as a build project or function.

### How it works

1. For pull request tests, match `source: aws.codecommit` and `detail-type: CodeCommit Pull Request State Change`. Select `pullRequestCreated` and `pullRequestSourceBranchUpdated` in `detail.event`.
2. Target CodeBuild and select the proposed commit, a recorded source revision, with `sourceVersion`. CodeBuild runs the tests for that revision.
3. Return feedback to the request. CodeBuild can post a comment using its service role, the identity it uses to call AWS APIs. Another documented design matches the build-completion event and invokes Lambda to post the outcome and a log link, as shown in the diagram.
4. For a release pipeline, use separate repository change events filtered to the desired branch. `referenceUpdated` describes a branch update, including a merge.
5. For simpler actions, configure a repository trigger to SNS or Lambda in the same Region. A trigger sends to an SNS topic, a named notification channel, or invokes a function. For reviewer emails about comments, use notification rules with the relevant event types.

| Mechanism | Events and targets | Useful distinction |
|---|---|---|
| EventBridge rule | Repository and pull request events routed to configured targets | Supports pull request checks and release automation |
| Repository trigger | Operational events sent to SNS or Lambda | At most 10 per repository; target must be in the same Region |
| Notification rule | Selected activity sent as notifications through SNS | Includes comment activity for reviewer emails |

For a Lambda repository trigger, creating the trigger in the Lambda console includes the invocation permissions. Creating it in CodeCommit requires a policy allowing CodeCommit to invoke the function.

### Exam cues

- If the question says test each new CodeCommit pull request and later source updates, think EventBridge plus CodeBuild, because the pull request events can start the build project.
- If the question says post the test result back to the request, think a permitted CodeBuild comment call or a build-completion rule invoking Lambda, because starting a build alone does not post its result.
- If the question says release only changes reaching `main`, think repository change events filtered to that branch, because pull request creation describes proposed work.
- If the question says email reviewers about comments, think notification rules, because repository triggers have a narrower operational scope.

### Remember

- Repository triggers: maximum 10; SNS or Lambda target in the repository's Region.
- No trigger branch list means all branches.
- Trigger event options are `all`, `updateReference`, `createReference`, and `deleteReference`. Use `all` on its own.
- CodeCommit's direct service events use best-effort delivery to EventBridge: an event can occasionally go undelivered.

> **Trap:** CodeBuild's native webhooks, which let supported Git providers notify CodeBuild of changes, do not support CodeCommit. Use CodeCommit events through EventBridge.

> **Trap:** EventBridge calls the branch-change event `referenceUpdated`. A repository trigger uses the option `updateReference`; these names are not interchangeable.
