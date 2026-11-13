---
title: Pull request approvals
level: associate
order: 30
facts:
  - id: pull-request-branches
    text: A pull request compares changes in a source branch with a destination branch where reviewed changes will be merged.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/pull-requests.html
  - id: approval-rule
    text: An approval rule specifies how many users must approve a pull request before it can merge.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html
  - id: approval-default
    text: Number of approvals needed defaults to 1 when creating an approval rule in the console.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html#how-to-create-pull-request-approval-rule-console
  - id: template-approval-default
    text: Number of approvals needed defaults to 1 when creating an approval rule template in the console.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-template.html#how-to-create-template-console
  - id: approval-pool
    text: An optional approval pool restricts which users' approvals count toward the required approval count.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html
  - id: pool-identities
    text: Approval pools support IAM user names, assumed roles, and fully qualified Amazon Resource Names, including wildcard patterns for role sessions.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html#how-to-create-pull-request-approval-rule-console
  - id: session-approvals
    text: When an approval pool matches users assuming a role, their individual role session names count toward the required approver count.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html#how-to-create-pull-request-approval-rule-console
  - id: role-session
    text: Assuming a role provides temporary credentials for a role session.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: resource-arn
    text: An Amazon Resource Name identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
  - id: cross-account-approvals
    text: CodeCommit approval rules do not support cross-account approvals.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html#how-to-create-pull-request-approval-rule-console
  - id: author-approval
    text: The creator of a CodeCommit pull request cannot approve that pull request.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/getting-started-cc.html
  - id: template-creation
    text: An associated approval rule template creates approval rules when matching pull requests are created in the repository.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/approval-rule-templates.html
  - id: template-association
    text: An approval rule template can be associated only with repositories in the same AWS Region.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-associate-template.html
  - id: template-default-association
    text: Creating an approval rule template does not associate it with a repository unless an association is specified.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-template.html#how-to-create-template-console
  - id: destination-filter
    text: DestinationReferences filters a template by the pull request's destination branch, such as refs/heads/main.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/approval-rule-templates.html
  - id: no-branch-filter
    text: Without branch filters an approval rule template applies to all branches in an associated repository.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-template.html#how-to-create-template-console
  - id: approval-override
    text: Overriding a pull request's approval rules sets aside all its rules, including template-generated rules; individual rules cannot be selectively overridden.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-override-approval-rules.html
  - id: override-record
    text: An approval override records the actor in pull request activity and can be revoked while the pull request is open, but not after merging.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-override-approval-rules.html
  - id: override-permission
    text: codecommit:OverridePullRequestApprovalRules grants permission to override pull request approval rules.
    source: https://docs.aws.amazon.com/service-authorization/latest/reference/list_codecommit.html#list_codecommit-actions-as-permissions
cards:
  - id: codecommit-005
    q: A team needs the same CodeCommit pull request approval rule across many repositories. What should it use?
    a: |-
      Associate an approval rule template with the repositories in the same Region. Matching new pull requests receive its rule automatically.
      Optional destination branch filters select which requests receive the rule.
    facts: [template-creation, template-association, destination-filter]
  - id: codecommit-016
    q: What is the default Number of approvals needed when creating a CodeCommit approval rule template in the console?
    a: 1 approval. An optional approval pool limits whose approvals count toward that number.
    facts: [template-approval-default, approval-pool]
  - id: codecommit-017
    q: A team needs CodeCommit review rules on pull requests targeting main, but not on requests targeting development branches. How should it configure the template?
    a: Set DestinationReferences to refs/heads/main and associate the template with the repositories. The filter matches the destination branch of new pull requests.
    facts: [destination-filter, template-creation]
  - id: codecommit-018
    q: A CodeCommit approval pool must count reviewers who assume a review role with different session names. What should the pool match?
    a: Use an assumed-role pattern with a wildcard for the role sessions. The matching individual session names count toward the required number of approvers.
    facts: [pool-identities, approval-pool, session-approvals]
  - id: codecommit-019
    q: Can a CodeCommit approval rule count a reviewer identity from a different AWS account?
    a: No. Approval rules do not support cross-account approvals.
    trap: true
    facts: [cross-account-approvals]
  - id: codecommit-020
    q: A CodeCommit pull request has several approval rules, but an emergency operator wants to override just one. What does CodeCommit support?
    a: Overriding all approval rules on the request together, including rules from templates. The operator needs OverridePullRequestApprovalRules permission, and the activity records who performed the override.
    trap: true
    facts: [approval-override, override-permission, override-record]
---

Approval rules require reviewers to approve a CodeCommit pull request before it can merge. A pull request compares the source branch, which contains proposed changes, with the destination branch that will receive them. Templates apply the same review requirements to matching new requests across repositories.

### How it works

1. Create an approval rule on a pull request, or create a template for reuse. Set the required approval count.
2. Optionally define an approval pool, the identities whose approvals count. A pool can name IAM users or assumed roles using an Amazon Resource Name (ARN), the identifier of an AWS resource. Wildcard patterns can match multiple role sessions, each a temporary use of a role by a caller.
3. Associate a template with repositories in its Region. A template creates rules when matching pull requests are created. Destination branch filters select requests such as those targeting `refs/heads/main`.
4. Reviewers approve the request. The request's creator cannot approve it. Approvals from outside a configured pool do not count toward that pool's requirement.
5. For an exception, an identity with `codecommit:OverridePullRequestApprovalRules` permission can set aside all rules on an open request. The activity records who did so; the override can be revoked while the request is open.

| Control | What it specifies | Scope |
|---|---|---|
| Approval rule | Required approval count and optional approval pool | A pull request |
| Approval rule template | Reusable rule and optional destination branch filters | Matching new pull requests in associated repositories |
| Approval override | Sets aside all approval rules on the request | An open pull request |

### Exam cues

- If the question says apply consistent review rules across repositories, think approval rule template plus repository associations, because creating a template alone does not apply it.
- If the question says require review only for changes entering `main`, think a destination branch filter, because the template matches the branch receiving the changes.
- If the question says approvals from arbitrary users must not count, think approval pool, because it restricts which identities satisfy the rule.
- If the question says an emergency requires bypassing review, think an authorized approval override, because it sets aside all approval rules and records the actor.

### Remember

- The console's default approval count is 1.
- A new template has no repository associations by default.
- Templates and associated repositories must be in the same Region.
- Without branch filters, a template applies to all destination branches in its associated repositories.
- Approval rules do not support cross-account approvals.

> **Trap:** A pull request author cannot supply an approval for their own request, even if they otherwise belong to the approval pool.

> **Trap:** An override affects every approval rule on the request. It cannot exempt just one rule, and it cannot be revoked after the request is merged.
