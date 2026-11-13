---
title: Cross-account deployments
level: professional
order: 90
facts:
  - id: cross-account-model
    text: A CodePipeline service role can assume a target-account action role to deploy into that
      account.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-key
    text: The pipeline account must configure a customer managed KMS key and grant the pipeline service
      role and target account access.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-bucket
    text: The artifact bucket policy must grant the target account access to the pipeline artifacts.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-assume
    text: The pipeline service role needs permission to assume the target role, and the target role
      trust policy must allow that service role.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-permissions
    text: The target action role needs deployment permissions and access to the artifact bucket and
      encryption key.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-setup-accountb
  - id: cross-account-arn
    text: The cross-account action is configured with the ARN of the target role.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-create
  - id: cross-account-sharing
    text: An action can consume an artifact if the action is in the pipeline account, the artifact was
      produced in the pipeline account, or an earlier action in the same account produced it.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-alias
    text: KMS aliases are recognized only in their owning account; cross-account actions must identify
      the key by key ID or ARN.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account
  - id: cross-account-region
    text: The customer managed artifact key is created in the same Region as the pipeline.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-create-key
  - id: cross-account-cli
    text: Cross-account pipeline creation in the documented workflow uses the CLI rather than the
      CodePipeline console.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html#pipelines-create-cross-account-create
  - id: key-management
    text: A customer managed KMS key is created and managed by the customer.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#customer-mgn-key
  - id: managed-key-account
    text: AWS managed KMS keys can be used only by principals in the account that owns the key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-key
  - id: artifact-location
    text: Pipeline artifacts are passed through the pipeline artifact bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-artifacts
diagrams:
  - id: pipeline-cross-account
    title: Cross-account deployment
    width: 1148
    height: 476
    groups:
      - label: Pipeline account (A)
        icon: group-aws-account
        x: 14
        y: 14
        w: 462
        h: 434
        tone: mgmt
      - label: Target account (B)
        icon: group-aws-account
        x: 672
        y: 14
        w: 462
        h: 434
        tone: mgmt
    nodes:
      - id: pipeline
        label: CodePipeline
        sub: service role
        icon: codepipeline
        h: 86
        x: 140
        y: 73
        w: 150
        tone: devtools
        info: The pipeline service role needs `sts:AssumeRole` on the action role in account B.
      - id: store
        label: Artifact bucket
        sub: S3 + customer KMS key
        icon: res-simple-storage-service-bucket
        h: 86
        x: 140
        y: 311
        w: 160
        tone: storage
        info: Use a **customer managed KMS key** for cross-account artifact access. The bucket policy and
          key policy both grant account B access.
      - id: role
        label: Action role
        sub: trusts pipeline role
        icon: res-identity-access-management-role
        h: 86
        x: 784
        y: 73
        w: 160
        tone: security
        info: Created in account B. Trust policy names the pipeline service role from account A. It carries
          the deployment permissions plus S3 and KMS access to the artifacts.
      - id: deploy
        label: Deployment
        sub: CodeDeploy / CFN
        icon: codedeploy
        h: 86
        x: 784
        y: 311
        w: 160
        tone: devtools
        info: The action runs with the permissions of the assumed role, against resources in account B.
    edges:
      - from: pipeline
        to: store
        step: 1
        label: write artifacts
      - from: pipeline
        to: role
        step: 2
        label: AssumeRole
      - from: role
        to: store
        step: 3
        label: read artifact (S3 + KMS)
        dashed: true
      - from: role
        to: deploy
        step: 4
        label: deploy
    steps:
      - Actions in account A write their output artifacts to the pipeline's S3 bucket, encrypted
        with the customer managed key.
      - For the cross-account action, the pipeline service role assumes the action role in account B.
      - The action role reads the input artifact. This needs the bucket policy, the key policy and
        its own S3 and KMS permissions.
      - The action role performs the deployment in account B.
cards:
  - id: codepipeline-010
    q: What identity and artifact access does a cross-account CodePipeline deployment need?
    a: A target action role that trusts the pipeline role; permission for the pipeline role to assume
      it; deployment access; an artifact bucket policy; and access to a customer managed KMS
      artifact key. Configure the target role ARN on the action.
    facts:
      - cross-account-model
      - cross-account-assume
      - cross-account-permissions
      - cross-account-key
      - cross-account-bucket
      - cross-account-arn
  - id: codepipeline-011
    q: A cross-account CodePipeline deployment can assume its role but cannot read or decrypt artifacts.
      What should the team inspect?
    a: Check the artifact bucket policy, customer managed KMS key permissions, and target role S3/KMS
      permissions. Use the key ARN rather than a cross-account alias.
    trap: true
    facts:
      - cross-account-key
      - cross-account-bucket
      - cross-account-permissions
      - cross-account-alias
  - id: codepipeline-012
    q: A CodePipeline pipeline belongs to account A. Can an artifact produced by its action in account B
      pass directly to an action in account C?
    a: No. Neither producer nor consumer is in the pipeline account, and they are not in the same
      account.
    trap: true
    facts:
      - cross-account-sharing
  - id: codepipeline-025
    q: A CodePipeline pipeline in a tools account must deploy into a separate production account. How
      should the target action authenticate?
    a: Set its role ARN to a role in the target account that trusts the pipeline service role. Grant
      AssumeRole to the pipeline role and deployment, S3, and KMS permissions to the target role,
      with bucket and key policies allowing access.
    trap: true
    facts:
      - cross-account-arn
      - cross-account-assume
      - cross-account-permissions
      - cross-account-bucket
      - cross-account-key
---
A cross-account action lets one CodePipeline release workflow deploy resources in another AWS account. The pipeline assumes an action role, an identity with temporary permissions, in the target account.

### How it works

1. In the pipeline account, configure the artifact bucket with a customer managed KMS key, an encryption key whose access policy you control. Create the key in the pipeline Region.
2. Grant the target account access through the bucket and key policies. Give the pipeline service role key access too.
3. Create the target action role with a trust policy, which identifies who can assume it, allowing the pipeline service role. Grant the pipeline role `sts:AssumeRole` permission.
4. Give the target role deployment permissions and S3/KMS artifact access. Configure its ARN on the cross-account action.
5. The assumed role reads the encrypted artifacts and performs the target deployment. The documented cross-account setup uses the CLI rather than the console.

### Exam cues

- If the question says deployment runs in a separate account, think target action role plus artifact access, because identity trust and artifact permissions are separate requirements.
- If the question says the role can be assumed but artifact decryption fails, think customer managed key permissions and bucket access, because assuming a role alone does not authorize artifact reads.

### Remember

- Use the full key ARN for cross-account clarity. An alias is recognized only in the account that owns it.
- An action may consume an artifact when it is in the pipeline account, the artifact came from the pipeline account, or the producer is an earlier action in the same account.

> **Trap:** If A owns the pipeline, an artifact cannot pass directly from an action in B to an action in C. Both are outside A and the producer and consumer are in different accounts.
