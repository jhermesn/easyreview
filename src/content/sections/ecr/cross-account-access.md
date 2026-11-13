---
title: Cross-account access
level: professional
order: 40
facts:
  - id: repository-policy
    text: An ECR repository policy is a resource policy controlling who may perform actions on that
      repository.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html#repository-policy-vs-iam-policy
  - id: cross-account-policies
    text: Cross-account access requires the requester identity policy and the target resource policy to
      allow access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html
  - id: token-permission
    text: Authenticating to a private ECR registry requires ecr:GetAuthorizationToken through an IAM
      policy.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html#repository-policy-vs-iam-policy
  - id: token-scope
    text: An ECR authorization token has the retrieving principal permissions and is valid for 12 hours.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry_auth.html#registry-auth-token
  - id: docker-auth
    text: Docker login uses username AWS and a password obtained with ecr get-login-password;
      authenticate separately to each registry.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry_auth.html#registry-auth-token
  - id: pull-actions
    text: ECR pull access uses ecr:BatchGetImage and ecr:GetDownloadUrlForLayer.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policy-examples.html#IAM_allow_other_accounts
  - id: pull-policy
    text: The AmazonECSTaskExecutionRolePolicy includes ecr:GetAuthorizationToken,
      ecr:BatchCheckLayerAvailability, ecr:GetDownloadUrlForLayer and ecr:BatchGetImage.
    source: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonECSTaskExecutionRolePolicy.html
  - id: fargate-principal
    text: For Fargate tasks pulling private ECR images, including cross-account images, the task
      execution role supplies the agent permissions.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: task-role
    text: The ECS task role supplies application code permissions inside containers; execution-role
      credentials are used by the agent.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: deny-wins
    text: An explicit deny in an applicable ECR IAM or repository policy overrides an allow.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html#repository-policy-vs-iam-policy
diagrams:
  - id: ecr-account-pull
    title: Cross-account pull authorization
    width: 800
    height: 260
    groups:
      - label: Caller account
        x: 10
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
      - label: Image owner account
        x: 440
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
    nodes:
      - id: role
        label: Execution role
        sub: IAM token + pull access
        icon: identity-and-access-management
        x: 70
        y: 100
        w: 230
        h: 86
        tone: security
        info: For Fargate, the task execution role authenticates and pulls the image through the agent.
      - id: repo
        label: ECR repository
        sub: Policy permits caller
        icon: elastic-container-registry
        x: 500
        y: 100
        w: 230
        h: 86
        tone: compute
        info: The owner repository policy permits the caller role to perform image-pull actions.
    edges:
      - from: role
        to: repo
        step: 1
        label: pull
    steps:
      - After registry authentication, ECR permits the cross-account pull only if both account
        policy evaluations allow it.
cards:
  - id: ecr-005
    q: A role in another account must pull an image from a private ECR repository. What permissions are
      needed?
    a: Allow repository pull actions in the target repository policy and caller identity policy. The
      caller also needs ecr:GetAuthorizationToken through IAM to authenticate. For Fargate, grant
      the execution role used by the agent.
    facts:
      - cross-account-policies
      - pull-actions
      - token-permission
      - fargate-principal
  - id: ecr-017
    q: An ECR repository policy permits a remote role to pull, but the role cannot authenticate. Which
      separate permission should the team check?
    a: ecr:GetAuthorizationToken in the role identity policy. A repository policy does not supply this
      authentication permission.
    trap: true
    facts:
      - token-permission
  - id: ecr-018
    q: A Fargate task cannot pull a cross-account ECR image even though its application task role has
      ECR permissions. Which role should be checked?
    a: The task execution role. It gives the Fargate agent image-pull permissions; the task role is for
      application code. Also check the repository policy.
    trap: true
    facts:
      - fargate-principal
      - task-role
      - cross-account-policies
  - id: ecr-019
    q: How long is an ECR private registry authorization token valid, and does it grant permissions
      beyond the caller?
    a: 12 hours. Its permission scope matches the principal that obtained it.
    facts:
      - token-scope
---
Cross-account ECR access lets a workload pull an image owned by another account. A principal is the role or user making the request. The caller's identity policy grants actions to that principal; the repository's resource policy grants access to the image owner account's repository.

### How it works

1. Allow image-pull operations on the target repository in both the caller identity policy and the target repository policy. Pull actions include `ecr:BatchGetImage` and `ecr:GetDownloadUrlForLayer`; the ECS execution managed policy also includes `ecr:BatchCheckLayerAvailability`.
2. Separately allow `ecr:GetAuthorizationToken` through IAM. The token has the caller's permissions and is valid for 12 hours.
3. Authenticate Docker to each registry using `get-login-password` and username `AWS`. Authentication identifies the caller; repository authorization determines what it may do.
4. For Fargate image pulls, grant permissions to the task execution role used by the agent. The task role supplies permissions to application code inside the containers.

### Exam cues

- If the question says a repository policy permits access but login fails, think IAM token permission, because registry authentication needs `ecr:GetAuthorizationToken`.
- If the question says a Fargate task cannot pull from another account, think execution role plus repository policy, because the agent performs the pull before application code runs.
- If the question says an allow exists but access is still denied, think applicable explicit denies, because an allow cannot override them.

### Remember

- Cross-account pull access needs permission on both sides.
- Private authorization tokens last 12 hours and retain the caller's permission scope.
- Docker login uses username `AWS`.

> **Trap:** Giving the application task role ECR permissions does not fix a Fargate agent pull failure. Check the task execution role.
