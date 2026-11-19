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
diagrams:
  - id: cross-account-deployment-pipeline
    title: One pipeline in a tooling account deploys to staging and production accounts
    width: 1240
    height: 640
    groups:
      - { label: Tooling account, x: 20, y: 20, w: 560, h: 600, tone: devtools, icon: group-aws-account }
      - { label: Staging account, x: 640, y: 20, w: 580, h: 280, tone: neutral, icon: group-aws-account }
      - { label: Production account, x: 640, y: 340, w: 580, h: 280, tone: neutral, icon: group-aws-account }
    nodes:
      - { id: repo, label: Git repository, sub: source action, x: 60, y: 70, w: 160, h: 86, tone: devtools, icon: res-git-repository }
      - { id: pipe, label: CodePipeline, sub: tooling account, x: 330, y: 70, w: 160, h: 86, tone: devtools, icon: codepipeline, info: "Has a manual approval action before the production stage." }
      - { id: build, label: CodeBuild, sub: build and test, x: 330, y: 260, w: 160, h: 86, tone: devtools, icon: codebuild }
      - { id: bucket, label: S3 bucket, sub: pipeline artifacts, x: 60, y: 260, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Bucket policy grants the staging and production accounts read access." }
      - { id: key, label: AWS KMS, sub: customer managed key, x: 60, y: 460, w: 160, h: 86, tone: security, icon: key-management-service, info: "Key policy allows the target accounts. Actions reference it by key ID or ARN, never by alias." }
      - { id: stgrole, label: Deploy role, sub: staging, x: 680, y: 90, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: stgcfn, label: CloudFormation, sub: staging stack, x: 1000, y: 90, w: 180, h: 86, tone: mgmt, icon: cloudformation }
      - { id: prdrole, label: Deploy role, sub: production, x: 680, y: 430, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: prdcfn, label: CloudFormation, sub: production stack, x: 1000, y: 430, w: 180, h: 86, tone: mgmt, icon: cloudformation }
    edges:
      - { from: repo, to: pipe, step: 1 }
      - { from: pipe, to: build, step: 2 }
      - { from: build, to: bucket, step: 2 }
      - { from: bucket, to: key, step: 3 }
      - { from: pipe, to: stgrole, step: 4 }
      - { from: stgrole, to: stgcfn, step: 4 }
      - { from: pipe, to: prdrole, step: 5 }
      - { from: prdrole, to: prdcfn, step: 5 }
    steps:
      - "A commit to the repository starts the pipeline through its source action."
      - "CodeBuild builds and tests the change and writes the output artifact to the pipeline's S3 artifact bucket."
      - "Artifacts are encrypted with a customer managed KMS key whose key policy allows the staging and production accounts."
      - "The staging deploy action assumes the role in the staging account by its ARN. That role reads the artifact (bucket policy plus key permission) and runs CloudFormation."
      - "After a manual approval, the production action assumes the production account's role the same way and updates the production stack."
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
---
Professional exams separate build tooling from workloads: one tooling account runs the pipeline, and each environment lives in its own account. The design works only when three things line up across accounts: the artifact bucket policy, the KMS key policy and a role in each target account that the pipeline assumes.

### How it works

1. A source action starts CodePipeline in the tooling account, and CodeBuild builds and tests the change. [Cross-account pipelines](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html)
2. Artifacts land in the pipeline's S3 bucket, encrypted with a customer managed KMS key. The bucket policy and the key policy both allow the target accounts.
3. Each deploy action names the ARN of a role in its target account. That role can read the artifact, use the key and run CloudFormation there.
4. A manual approval action holds the production stage until an authorized reviewer approves it.
5. For a baseline every account needs, a service-managed StackSet replaces per-account stages.

| Piece | Lives in | Must allow |
|---|---|---|
| Artifact bucket | Tooling account | Target accounts (bucket policy) |
| Customer managed KMS key | Tooling account | Target accounts (key policy) |
| Deploy role | Each target account | Deploy actions, bucket read, key use |

### Exam cues

- If the question says a pipeline in one account deploys to another, think bucket policy plus customer managed key plus an assumed role in the target account, because all three must allow the cross-account access.
- If the question says the target account cannot decrypt artifacts, think customer managed KMS key, because cross-account pipelines need one.
- If the question says the key works in one account but not the other, think key ID or ARN instead of an alias.
- If the question says a human must sign off before production, think a manual approval action.
- If the question says the same template must reach every account in an OU, think a service-managed StackSet.

### Remember

- Cross-account pipeline: artifact bucket policy, customer managed KMS key, role in each target account.
- KMS aliases work only in their owning account.
- Approvers need `codepipeline:PutApprovalResult`.
- One artifact bucket per Region where the pipeline runs actions.
- Service-managed StackSets need Organizations trusted access.

> **Trap:** An artifact cannot move directly between two non-pipeline accounts. Every target account reads from the pipeline account's bucket.
