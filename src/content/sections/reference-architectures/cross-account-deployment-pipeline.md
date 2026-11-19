---
title: Cross-account deployment pipeline
level: professional
order: 60
facts:
  - id: cross-account-needs
    text: A cross-account CodePipeline setup requires access to the artifact bucket and a customer managed KMS key, plus a trusted cross-account role; an artifact cannot pass directly between two non-pipeline accounts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html
  - id: bucket-policy
    text: The artifact bucket policy must grant the target account access to the pipeline artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: target-role
    text: The target action role needs deployment permissions and access to the artifact bucket and encryption key.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-setup-accountb
  - id: role-arn
    text: The cross-account action is configured with the ARN of the target role.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-create
  - id: key-alias
    text: KMS aliases are recognized only in their owning account; cross-account actions must identify the key by key ID or ARN.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: key-policy
    text: Policy-based cross-account key access requires an allow in the owning key policy and an allow in the caller account IAM policy.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html
  - id: approval-pause
    text: A manual approval action pauses an execution until an authorized identity approves or rejects it.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
  - id: approval-permission
    text: An approver needs codepipeline:PutApprovalResult permission on the approval action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals-iam-permissions.html#approvals-iam-permissions-limited
  - id: regional-buckets
    text: A pipeline needs an artifact bucket in its own Region and in every Region where it runs an action.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
  - id: stackset
    text: A StackSet deploys one template as stacks across selected AWS accounts and Regions; a stack instance associates it with an account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: service-managed
    text: Service-managed StackSets create the needed roles for accounts managed in AWS Organizations and require trusted access.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: ca-cross-account
    text: A caller outside the domain-owner and repository-administrator accounts needs both an identity-policy Allow and a resource-policy Allow for cross-account access.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: ca-resource-policy
    text: For repository actions, an explicit Allow in either the domain policy or repository policy is sufficient on the resource-policy side.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-policies.html#repo-policies
  - id: ca-bearer
    text: The caller must have sts:GetServiceBearerToken in its identity permissions; a domain policy cannot grant that action.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/tokens-authentication.html#get-auth-token-permissions
  - id: ca-org
    text: A domain policy can use aws:PrincipalOrgID to limit its grants to principals in the specified organization.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-policies.html#domain-policies
  - id: rollback-trigger
    text: Rollback triggers roll back a whole stack create or update operation if a configured alarm enters ALARM during the operation or monitoring period.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: rollback-missing-data
    text: INSUFFICIENT_DATA alone does not trigger rollback; configure the alarm to treat missing data as breaching if missing metrics should cause an alarm.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: event-levels
    text: EventBridge receives separate CodePipeline Pipeline Execution State Change, CodePipeline Stage Execution State Change, and CodePipeline Action Execution State Change detail types.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-events-types
  - id: event-targets
    text: EventBridge rules can route CodePipeline state events to targets such as SNS or Lambda.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html#detect-state-changes-cloudwatch-events
  - id: failure-blocks
    text: A failed action prevents its revision from advancing; in stage-locking operation failure releases the stage lock.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html#concepts-how-it-works-transitions-approvals
  - id: retry-failed
    text: FAILED_ACTIONS retries failed actions while in-progress actions continue.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
  - id: stage-rollback
    text: Stage rollback creates a new execution using a previously successful execution source revisions, variables, and artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback.html#stage-rollback
  - id: v2-recovery
    text: Stage rollback and automatic stage retry require V2.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types-planning.html#pipeline-types-planning
  - id: create-update
    text: CREATE_UPDATE creates a missing stack or updates an existing stack without deleting a failed stack to replace it.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: replace-failed
    text: REPLACE_ON_FAILURE can delete and recreate a failed stack; AWS recommends it for testing only.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CloudFormation.html#action-reference-CloudFormation-config
  - id: auto-deploy
    text: Automatic deployment creates StackSet instances for accounts added to the targeted organization or OUs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
diagrams:
  - id: cross-account-deployment-pipeline
    title: One pipeline in a tooling account deploys to staging and production accounts
    facts: [cross-account-needs, bucket-policy, target-role, role-arn, key-alias, key-policy, approval-pause, approval-permission, regional-buckets, stackset, service-managed, ca-cross-account, ca-resource-policy, ca-bearer, ca-org, rollback-trigger, rollback-missing-data, event-levels, event-targets, failure-blocks, retry-failed, stage-rollback, v2-recovery, create-update, replace-failed, auto-deploy]
    width: 1240
    height: 800
    groups:
      - { label: Tooling account, x: 20, y: 20, w: 600, h: 760, tone: devtools, icon: group-aws-account }
      - { label: Staging account, x: 660, y: 20, w: 560, h: 280, tone: neutral, icon: group-aws-account }
      - { label: Production account, x: 660, y: 340, w: 560, h: 440, tone: neutral, icon: group-aws-account }
    nodes:
      - { id: repo, label: Git repository, sub: source action, x: 50, y: 70, w: 150, h: 86, tone: devtools, icon: res-git-repository }
      - { id: pipe, label: CodePipeline, sub: V2 pipeline, x: 240, y: 70, w: 150, h: 86, tone: devtools, icon: codepipeline, info: "V2 pipelines can retry failed actions and roll a stage back to the last successful execution." }
      - { id: rule, label: EventBridge rule, sub: execution FAILED, x: 430, y: 260, w: 160, h: 86, tone: integration, icon: res-eventbridge-rule }
      - { id: ca, label: CodeArtifact, sub: package repository, x: 50, y: 260, w: 150, h: 86, tone: devtools, icon: codeartifact, info: "The domain policy can limit access to principals in the organization with aws:PrincipalOrgID." }
      - { id: build, label: CodeBuild, sub: build and test, x: 240, y: 260, w: 150, h: 86, tone: devtools, icon: codebuild }
      - { id: bucket, label: S3 bucket, sub: pipeline artifacts, x: 50, y: 460, w: 150, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Bucket policy grants the staging and production accounts read access." }
      - { id: approval, label: Manual approval, sub: before production, x: 240, y: 460, w: 150, h: 86, tone: devtools, icon: codepipeline }
      - { id: key, label: AWS KMS, sub: customer managed key, x: 50, y: 660, w: 150, h: 86, tone: security, icon: key-management-service, info: "Key policy allows the target accounts. Actions reference it by key ID or ARN, never by alias." }
      - { id: reviewer, label: Release manager, sub: PutApprovalResult, x: 240, y: 660, w: 150, h: 86, tone: user, icon: res-users }
      - { id: sns, label: SNS topic, sub: team alerts, x: 430, y: 660, w: 160, h: 86, tone: integration, icon: simple-notification-service }
      - { id: stgrole, label: Deploy role, sub: staging, x: 700, y: 90, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: stgcfn, label: CloudFormation, sub: staging stack, x: 1000, y: 90, w: 180, h: 86, tone: mgmt, icon: cloudformation }
      - { id: prdrole, label: Deploy role, sub: production, x: 700, y: 430, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: prdcfn, label: CloudFormation, sub: production stack, x: 1000, y: 430, w: 180, h: 86, tone: mgmt, icon: cloudformation }
      - { id: alarm, label: CloudWatch alarm, sub: rollback trigger, x: 1000, y: 640, w: 180, h: 86, tone: mgmt, icon: res-cloudwatch-alarm }
    edges:
      - { from: repo, to: pipe, step: 1 }
      - { from: pipe, to: build, step: 2 }
      - { from: ca, to: build, step: 2 }
      - { from: build, to: bucket, step: 3 }
      - { from: bucket, to: key, step: 3 }
      - { from: pipe, to: stgrole, step: 4 }
      - { from: stgrole, to: stgcfn, step: 4 }
      - { from: reviewer, to: approval, step: 5 }
      - { from: approval, to: prdrole, step: 5 }
      - { from: prdrole, to: prdcfn, step: 6 }
      - { from: alarm, to: prdcfn, step: 7, dashed: true }
      - { from: pipe, to: rule, step: 8, dashed: true }
      - { from: rule, to: sns, step: 8, dashed: true }
    steps:
      - "A commit to the repository starts the pipeline through its source action."
      - "CodeBuild pulls dependencies from CodeArtifact, then builds and tests the change. A caller from another account needs an allow in its own IAM policy and in the domain or repository policy."
      - "The output artifact goes to the pipeline's S3 bucket, encrypted with a customer managed KMS key whose key policy allows the staging and production accounts."
      - "The staging deploy action assumes the role in the staging account by its ARN. That role reads the artifact (bucket policy plus key permission) and runs CloudFormation."
      - "A manual approval action pauses the pipeline. The release manager, who has codepipeline:PutApprovalResult, approves, and the production action assumes the production role."
      - "CloudFormation updates the production stack with the CREATE_UPDATE action mode."
      - "If the rollback trigger alarm enters ALARM during the update or its monitoring period, CloudFormation rolls the whole stack update back."
      - "The failed action stops the revision. EventBridge receives the Pipeline Execution State Change event with state FAILED, and the rule alerts the team through SNS. A V2 pipeline can retry failed actions or roll the stage back."
cards:
  - id: reference-architectures-033
    q: "A CodePipeline pipeline in a central tooling account must deploy CloudFormation stacks into separate staging and production accounts. Which pieces does the design need?"
    a: "An S3 artifact bucket whose policy grants the target accounts, a **customer managed KMS key** that allows them, and a role in each target account that the deploy action assumes by ARN."
    facts: [cross-account-needs, bucket-policy, role-arn]
  - id: reference-architectures-034
    q: "A cross-account CodePipeline deploy fails because the production account cannot decrypt artifacts encrypted with the default AWS managed S3 key. What should change?"
    a: "Encrypt the artifact bucket with a **customer managed KMS key** whose key policy allows the production account. Cross-account pipelines need a customer managed key."
    trap: true
    facts: [cross-account-needs, key-policy]
  - id: reference-architectures-035
    q: "A cross-account CodePipeline action references the artifact encryption key by its alias, and the target account cannot use it. Why?"
    a: "KMS aliases resolve only in their owning account. Reference the key by **key ID or ARN**."
    trap: true
    facts: [key-alias]
  - id: reference-architectures-036
    q: "In a cross-account CodePipeline design, which permissions does the role in the target account need?"
    a: "Permissions to deploy (for example CloudFormation), plus read access to the artifact bucket and use of the encryption key. The bucket policy and key policy must also allow that account."
    facts: [target-role, bucket-policy, key-policy]
  - id: reference-architectures-037
    q: "A pipeline must not update the production account until a release manager reviews the staging result. What fits, and what permission does the reviewer need?"
    a: "A **manual approval action** before the production stage. The reviewer needs `codepipeline:PutApprovalResult` on that action."
    facts: [approval-pause, approval-permission]
  - id: reference-architectures-038
    q: "A pipeline in us-east-1 adds a deploy action that runs in eu-west-1. What artifact storage does it need?"
    a: "An artifact bucket in **each Region** where it runs actions: its own Region and eu-west-1."
    facts: [regional-buckets]
  - id: reference-architectures-039
    q: "A baseline CloudFormation template must reach every account in an organizational unit, including accounts created later, without creating roles by hand. What fits better than one pipeline stage per account?"
    a: "A **service-managed StackSet** targeting the OU. It creates the needed roles through Organizations trusted access and deploys one template across accounts and Regions."
    facts: [stackset, service-managed]
  - id: reference-architectures-121
    q: "CodeBuild in a tooling account must pull packages from a CodeArtifact domain owned by a shared services account. What has to allow the request?"
    a: "An allow in the **CodeBuild role's IAM policy** and in the **domain or repository policy**. The IAM policy must also allow `sts:GetServiceBearerToken`, which a domain policy cannot grant."
    trap: true
    facts: [ca-cross-account, ca-resource-policy, ca-bearer]
  - id: reference-architectures-122
    q: "A CloudFormation deployment should undo itself if the application's error rate alarm fires during the update or shortly after. What fits?"
    a: "A **rollback trigger** with that CloudWatch alarm and a monitoring period. If the alarm enters ALARM, CloudFormation rolls back the whole update."
    facts: [rollback-trigger, rollback-missing-data]
  - id: reference-architectures-123
    q: "The team must be alerted whenever any execution of a CodePipeline pipeline fails. What fits with no polling?"
    a: "An **EventBridge rule** matching the CodePipeline Pipeline Execution State Change event with state FAILED, targeting an **SNS topic**."
    facts: [event-levels, event-targets]
  - id: reference-architectures-124
    q: "A production stage of a V2 pipeline failed after a bad change. How can the team return the stage to the last good release without a new commit?"
    a: "Use **stage rollback**, which starts a new execution with the source revisions and artifacts of a previously successful execution. Failed actions can also be retried."
    facts: [stage-rollback, v2-recovery, retry-failed]
  - id: reference-architectures-125
    q: "A CloudFormation deploy action in production uses REPLACE_ON_FAILURE. Why is that risky?"
    a: "It can **delete and recreate** a failed stack; AWS recommends it for testing only. Production uses **CREATE_UPDATE**."
    trap: true
    facts: [replace-failed, create-update]
  - id: reference-architectures-126
    q: "Accounts added to an OU later must receive the baseline stack without anyone running a deployment. Which StackSet setting fits?"
    a: "**Automatic deployment** on a service-managed StackSet targeting the OU, which creates stack instances for accounts added to it."
    facts: [auto-deploy, service-managed]
---
Professional exams separate build tooling from workloads: one tooling account runs the pipeline, and each environment lives in its own account. The design works only when three things line up across accounts: the artifact bucket policy, the KMS key policy and a role in each target account that the pipeline assumes.

### How it works

1. A source action starts CodePipeline in the tooling account, and CodeBuild builds and tests the change. [Cross-account pipelines](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html)
2. Artifacts land in the pipeline's S3 bucket, encrypted with a customer managed KMS key. The bucket policy and the key policy both allow the target accounts.
3. Each deploy action names the ARN of a role in its target account. That role can read the artifact, use the key and run CloudFormation there.
4. A manual approval action holds the production stage until an authorized reviewer approves it.
5. A rollback trigger rolls a failing production update back, and an EventBridge rule reports failed executions.
6. For a baseline every account needs, a service-managed StackSet with automatic deployment replaces per-account stages.

| Piece | Lives in | Must allow |
|---|---|---|
| Artifact bucket | Tooling account | Target accounts (bucket policy) |
| Customer managed KMS key | Tooling account | Target accounts (key policy) |
| Deploy role | Each target account | Deploy actions, bucket read, key use |
| CodeArtifact domain | Tooling or shared account | Build roles (domain or repository policy) |

| Decision | Choose | When |
|---|---|---|
| Stop a bad release | Manual approval | A person must sign off before production |
| Undo a bad stack update | Rollback trigger with an alarm | The alarm fires during or after the update |
| Return to the last good release | Stage rollback (V2) | A stage failed after a bad change |
| Same template in every account | Service-managed StackSet | Baseline for an OU, including new accounts |
| Production stack action mode | CREATE_UPDATE | Always; REPLACE_ON_FAILURE is for testing |

### Exam cues

- If the question says a pipeline in one account deploys to another, think bucket policy plus customer managed key plus an assumed role in the target account, because all three must allow the cross-account access.
- If the question says the target account cannot decrypt artifacts, think customer managed KMS key, because cross-account pipelines need one.
- If the question says the key works in one account but not the other, think key ID or ARN instead of an alias.
- If the question says a human must sign off before production, think a manual approval action.
- If the question says the same template must reach every account in an OU, think a service-managed StackSet.
- If the question says roll back automatically when an alarm fires during a stack update, think a rollback trigger.
- If the question says notify on failed pipeline executions, think an EventBridge rule on the execution state change event.

### Remember

- Cross-account pipeline: artifact bucket policy, customer managed KMS key, role in each target account.
- KMS aliases work only in their owning account.
- Approvers need `codepipeline:PutApprovalResult`.
- One artifact bucket per Region where the pipeline runs actions.
- Service-managed StackSets need Organizations trusted access.
- Cross-account CodeArtifact: IAM allow plus domain or repository policy allow; sts:GetServiceBearerToken only in IAM.
- Stage rollback and automatic retry need a V2 pipeline.

> **Trap:** An artifact cannot move directly between two non-pipeline accounts. Every target account reads from the pipeline account's bucket.
