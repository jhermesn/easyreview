---
title: Manual approvals
level: associate
order: 40
facts:
  - id: approval-pause
    text: A manual approval action pauses an execution until an authorized identity approves or rejects
      it.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
  - id: approval-resume
    text: Approval resumes execution; rejection fails the action and prevents continuation.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
  - id: approval-timeout
    text: An unanswered manual approval fails at its timeout; the account-level default is seven days.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/limits.html
  - id: approval-timeout-override
    text: A manual approval action can override its timeout from 5 to 86400 minutes.
    source: https://docs.aws.amazon.com/codepipeline/latest/APIReference/API_ActionDeclaration.html#CodePipeline-Type-ActionDeclaration-timeoutInMinutes
  - id: approval-notifications
    text: Approval notifications can publish to an SNS topic in the same Region as the pipeline.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals-configuration-options
  - id: approval-context
    text: Manual approval configuration can include a review URL and comments for the reviewer.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals-configuration-options
  - id: approval-permission
    text: An approver needs codepipeline:PutApprovalResult permission on the approval action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals-iam-permissions.html#approvals-iam-permissions-limited
  - id: approval-console
    text: Console approval access also requires pipeline read permissions; ListPipelines is needed to
      view the dashboard list.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals-iam-permissions.html#approvals-iam-permissions-limited
cards:
  - id: codepipeline-005
    q: A team needs an authorized person to review a CodePipeline release before deployment. What should
      it add?
    a: Add a manual approval action. Grant `codepipeline:PutApprovalResult` on that action and console
      read permissions if needed. Rejection or an unanswered timeout fails the action.
    facts:
      - approval-pause
      - approval-permission
      - approval-console
      - approval-timeout
      - approval-resume
  - id: codepipeline-027
    q: A CodePipeline release needs human approval after staging tests and an email to reviewers. What
      configuration fits?
    a: Add a manual approval action before production and publish to an SNS topic in the pipeline
      Region. Subscribe the reviewers to the topic.
    facts:
      - approval-pause
      - approval-notifications
  - id: codepipeline-037
    q: How long can a CodePipeline manual approval remain unanswered before it fails?
    a: Seven days by default, unless the action has a configured timeout. Rejection also fails the
      action; approval resumes the execution.
    facts:
      - approval-timeout
      - approval-timeout-override
      - approval-resume
  - id: codepipeline-054
    q: A CodePipeline approval must notify reviewers through SNS and wait longer than seven days.
      What should the team configure?
    a: Set the approval action's `timeoutInMinutes` to the required duration, up to 86400 minutes,
      and use an SNS topic in the pipeline Region.
    facts:
      - approval-timeout
      - approval-timeout-override
      - approval-notifications
---
A manual approval action holds a CodePipeline release for a human decision. It lets a reviewer inspect a change before later actions run.

### How it works

1. Place the approval where the release needs review, such as after staging tests and before production deployment.
2. Grant the reviewer `codepipeline:PutApprovalResult` on that action. Console users also need read permissions to view the pipeline.
3. Optionally publish an SNS notification. SNS distributes messages to subscribed recipients; its topic must be in the pipeline's Region.
4. Include a review URL and comments so the reviewer can inspect the change.
5. Approval resumes the execution. Rejection or an unanswered timeout fails the action. Set `timeoutInMinutes` on the action if the account default is unsuitable.

### Exam cues

- If the question says staging must pass before a person permits release, think manual approval before deployment, because the execution waits for an authorized decision.
- If the question says reviewers need email when a release waits, think an SNS approval topic in the pipeline Region, because the approval action publishes notifications there.
- If the question says review needs more than seven days, think an action timeout override, because the account default can be changed for the approval action.

### Remember

- Unanswered approval timeout: seven days by default; the action override accepts 5 through 86400 minutes.
- Approval permission: `codepipeline:PutApprovalResult` on the action.
- SNS approval topic: same Region as the pipeline.

> **Trap:** An email subscription does not grant approval permission. The reviewer still needs the IAM permission to submit a result.
