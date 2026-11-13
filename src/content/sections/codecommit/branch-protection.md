---
title: Branch protection
level: professional
order: 20
facts:
  - id: iam-policy
    text: An IAM policy defines permissions that determine whether an operation is allowed or denied.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html
  - id: resource-arn
    text: An Amazon Resource Name identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
  - id: branch-reference
    text: A Git branch is a reference pointing to its latest commit; codecommit:References identifies branches in IAM conditions using names such as refs/heads/main.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: default-branch-access
    text: Without branch restrictions, a user with repository push permission can contribute to any branch.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html
  - id: conditional-deny
    text: A conditional IAM Deny can restrict selected update actions on branches in the repositories named by Resource.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: branch-condition-operator
    text: The AWS branch deny example uses StringEqualsIfExists to match codecommit:References to full branch names.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: branch-write-actions
    text: The AWS branch policy example includes GitPush, PutFile, DeleteFile, DeleteBranch, MergeBranchesByFastForward, MergeBranchesBySquash, MergeBranchesByThreeWay, MergePullRequestByFastForward, MergePullRequestBySquash, and MergePullRequestByThreeWay.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: create-commit-action
    text: codecommit:CreateCommit can change files and create a commit in a branch, and supports the codecommit:References condition key.
    source: https://docs.aws.amazon.com/service-authorization/latest/reference/list_codecommit.html#list_codecommit-actions-as-permissions
  - id: gitpush-null
    text: An IAM Deny containing GitPush requires a Null condition with codecommit:References set to false because of Git's push protocol.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: policy-attachment
    text: The conditional branch policy takes effect when attached to an IAM user, group, or role; AWS recommends groups or roles for scaling policy management.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-apply-policy
  - id: restricted-developer
    text: Developers denied updates to a protected branch can still read it, work on other branches, and create pull requests when those actions are otherwise allowed.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html
  - id: merge-denial
    text: A user covered by the example branch deny can create a pull request to the protected branch but receives an error when attempting to merge it.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-test
  - id: approval-scope
    text: Approval rules require approvals before a pull request can merge to its destination branch; branch update permissions are controlled separately through IAM.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-create-pull-request-approval-rule.html
  - id: temporary-git-access
    text: Federated users and temporary credentials can access CodeCommit with git-remote-codecommit or the AWS CLI credential helper.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/temporary-access.html
cards:
  - id: codecommit-003
    q: A team needs CodeCommit pull requests for changes to `main` and must block direct pushes. What should it configure?
    a: |-
      Use a conditional IAM Deny for branch writes, matching `codecommit:References` to `refs/heads/main`, and an approval rule for pull request merges.
      Include `Null: codecommit:References = false` when denying `GitPush`. Allow an authorized merger to use the required `MergePullRequestBy*` action; denying it to that merger would also block approved requests.
    facts: [branch-reference, conditional-deny, gitpush-null, approval-scope, merge-denial]
  - id: codecommit-004
    q: A CodeCommit approval rule requires reviewers to approve a pull request. Can a developer with push permission still bypass it?
    a: |-
      Yes. Approval rules gate **merging a pull request** only, not `git push` to the branch.
      Deny direct branch writes through IAM and retain pull request merge permission for the authorized merger.
    trap: true
    facts: [approval-scope, conditional-deny, default-branch-access]
  - id: codecommit-009
    q: A federated developer needs CodeCommit Git access and an approval rule cannot stop direct pushes to the protected branch. What controls address both needs?
    a: Use git-remote-codecommit or the CLI credential helper, and add an IAM branch deny. Approval rules govern pull request merges, not direct pushes.
    facts: [temporary-git-access, conditional-deny, approval-scope]
  - id: codecommit-014
    q: What extra condition is required when a CodeCommit branch policy uses Deny with GitPush?
    a: Add a Null condition with codecommit:References set to false, alongside the branch-reference condition. AWS requires it because of Git's push protocol.
    facts: [gitpush-null]
  - id: codecommit-015
    q: A CodeCommit pull request has all required approvals, but its merger is denied MergePullRequestBySquash on the destination branch. Will the approved request merge?
    a: No. The branch policy still blocks the merge action. Use a merger identity allowed to perform the required pull request merge operation.
    trap: true
    facts: [merge-denial, conditional-deny, approval-scope]
---
Branch protection uses IAM policies, rules that allow or deny AWS operations, to control who can change a CodeCommit branch. A branch is a named pointer to its latest commit. A pull request proposes changes for review before merging one branch into another.

### How it works

1. Scope the policy to the repository's Amazon Resource Name (ARN), its AWS resource identifier. Match `codecommit:References` to the full branch name, such as `refs/heads/main`.
2. Deny the write paths the restricted developers must not use. The AWS example uses `StringEqualsIfExists` for the branch condition and includes `GitPush`, file changes, branch deletion, and branch and pull request merges. Also account for `CreateCommit` if that API is otherwise allowed.
3. Include `"Null": {"codecommit:References": "false"}` when a deny contains `GitPush`. Attach the policy to the relevant group or role so it takes effect.
4. Developers work on other branches and open pull requests. An approval rule sets the review requirement. Keep the needed `MergePullRequestBy*` permission available to the authorized merger; the complete AWS example denies it to restricted developers.

| Change path | IAM actions to consider | What they control |
|---|---|---|
| Git client | `codecommit:GitPush` | Sending commits through Git |
| File and commit APIs | `codecommit:PutFile`, `codecommit:DeleteFile`, `codecommit:CreateCommit` | Writing files without a Git push |
| Branch deletion | `codecommit:DeleteBranch` | Removing the branch |
| Branch merge APIs | `codecommit:MergeBranchesByFastForward`, `codecommit:MergeBranchesBySquash`, `codecommit:MergeBranchesByThreeWay` | Merging branches directly |
| Pull request merge APIs | `codecommit:MergePullRequestByFastForward`, `codecommit:MergePullRequestBySquash`, `codecommit:MergePullRequestByThreeWay` | Merging a pull request |

### Exam cues

- If the question says block direct writes to `main` while requiring review, think branch-scoped IAM restrictions plus approval rules, because permissions and review requirements control different operations.
- If the question says developers can propose changes but only maintainers can merge, think attach the full update deny to developers and retain merge permissions for maintainers, because denied developers can still create pull requests.
- If the question says an approved pull request still cannot merge, think inspect the merger's branch permissions, because approval does not remove the IAM restriction.

### Remember

- `main` is matched as `refs/heads/main` in `codecommit:References`.
- A deny containing `GitPush` needs `Null` with `codecommit:References` set to `false`.
- Branch restrictions do not take effect until the policy is attached.
- Without branch restrictions, repository push permission permits changes to any branch.

> **Trap:** Approval rules do not block direct Git pushes. Restrict branch writes through IAM as well.

> **Trap:** Copying the full AWS deny onto every merger blocks pull request merges too. Preserve the required merge permission for the identity that must merge approved requests.
