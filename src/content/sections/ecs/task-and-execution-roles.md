---
title: Task and execution roles
level: associate
order: 20
facts:
  - id: ecs-roles-task
    text: A task IAM role supplies temporary AWS credentials to application code inside the task.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: ecs-roles-no-inherit
    text: SDK calls using a task role do not inherit the EC2 container instance role permissions.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: ecs-roles-audit
    text: Task-role credential sessions include taskArn context for CloudTrail auditing.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: ecs-roles-execution
    text: The task execution role supplies agent permissions; its credentials are not directly available
      to application containers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: ecs-roles-execution-uses
    text: The execution role is used for Fargate ECR image pulls and awslogs delivery, and for
      referenced secrets.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: ecs-roles-managed-policy
    text: AmazonECSTaskExecutionRolePolicy covers common execution-role operations; additional features
      can require extra permissions.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: ecs-roles-secrets
    text: Injected Secrets Manager secrets require secretsmanager:GetSecretValue on the execution role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-secrets
  - id: ecs-roles-parameters
    text: Referenced Parameter Store parameters require ssm:GetParameters on the execution role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-secrets
  - id: ecs-roles-kms
    text: Secret decryption with a customer managed KMS key requires kms:Decrypt.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-secrets
  - id: ecs-roles-trust
    text: The task execution role trusts ecs-tasks.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
  - id: ecs-roles-instance
    text: The EC2 container instance role lets the ECS agent register the instance and call ECS APIs.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html
  - id: ecs-roles-instance-policy
    text: AmazonEC2ContainerServiceforEC2Role is the managed policy for the EC2 container instance role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html
  - id: ecs-roles-instance-trust
    text: The EC2 container instance role trusts ec2.amazonaws.com and is attached through an instance
      profile.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html
  - id: ecs-roles-task-trust
    text: The task IAM role trusts ecs-tasks.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: ecs-roles-role-definition
    text: An IAM role is an assumable identity with permissions and temporary security credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: ecs-roles-trust-definition
    text: A trust policy identifies the principals permitted to assume a role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: ecs-roles-trust-scope
    text: ECS recommends aws:SourceAccount or aws:SourceArn in the task-role trust policy; SourceArn
      cannot be restricted to a specific cluster and must use a wildcard for clusters.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#create_task_iam_policy_and_role
  - id: ecs-roles-isolation
    text: Fargate isolates each task; on EC2, containers can potentially access credentials of other
      tasks and instance metadata on the same host.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
  - id: ecs-roles-registry
    text: Fargate private registry authentication uses repositoryCredentials in the task definition;
      the execution role needs secretsmanager:GetSecretValue for the registry secret.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-private-auth
  - id: ecs-roles-registry-kms
    text: A private registry secret encrypted with a customer managed KMS key also requires kms:Decrypt
      on the execution role.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html#task-execution-private-auth
  - id: ecs-roles-secret-rotation
    text: A Secrets Manager value injected as an environment variable is read at container startup and
      does not refresh on rotation; launch a new task or force a new service deployment.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html#secrets-envvar-secrets-manager
  - id: ecs-roles-secret-version
    text: Injecting a specific Secrets Manager JSON key or version on Fargate requires Linux platform
      version 1.4.0 or later, or Windows platform version 1.0.0.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html#secrets-envvar-secrets-manager
  - id: ecs-roles-nitro
    text: ECS Managed Instances support isolated tasks in separate Nitro Sandboxes on the same EC2
      instance, with hardware-enforced task isolation.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/isolated-confidential-tasks.html
  - id: ecs-roles-nitro-date
    text: AWS announced Nitro Sandboxes for ECS tasks in November 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/nitro-sandboxes-eks-ecs-ec2/
  - id: awslogs-role
    text: With the awslogs driver on EC2 container instances, logs:CreateLogStream and logs:PutLogEvents must be on the container instance role, or on the task execution role when the task has one.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
cards:
  - id: ecs-003
    q: An ECS application must read S3 objects using its own AWS permissions. Which role needs access?
    a: The task IAM role. It provides the application credentials and uses ecs-tasks.amazonaws.com in
      its trust policy.
    facts:
      - ecs-roles-task
      - ecs-roles-task-trust
  - id: ecs-004
    q: Which ECS role authorizes a Fargate image pull from ECR and awslogs delivery?
    a: The task execution role. Start with AmazonECSTaskExecutionRolePolicy; add permissions needed for
      referenced secrets or other features.
    trap: true
    facts:
      - ecs-roles-execution
      - ecs-roles-execution-uses
      - ecs-roles-managed-policy
  - id: ecs-005
    q: An ECS Fargate container starts but its application receives S3 AccessDenied. Which role should
      you inspect?
    a: Inspect the task role and applicable S3 policies. Successful startup does not prove the
      application has S3 permissions.
    trap: true
    facts:
      - ecs-roles-task
      - ecs-roles-execution
  - id: ecs-018
    q: An ECS Fargate task injects a Secrets Manager secret at startup and reads S3 at runtime. Which
      roles need permissions?
    a: "Execution role: secretsmanager:GetSecretValue and kms:Decrypt if a customer managed key is used.
      Task role: the application S3 permissions."
    trap: true
    facts:
      - ecs-roles-task
      - ecs-roles-secrets
      - ecs-roles-kms
  - id: ecs-031
    q: An EC2 instance cannot register with its ECS cluster. Which IAM role should be checked?
    a: Check the container instance role and instance profile. The ECS agent uses them for registration;
      the task role is for application calls.
    facts:
      - ecs-roles-instance
      - ecs-roles-instance-trust
      - ecs-roles-task
  - id: ecs-032
    q: Which principal should an ECS EC2 container instance role trust, and which managed policy can it
      use?
    a: Trust ec2.amazonaws.com and use AmazonEC2ContainerServiceforEC2Role as the managed policy. Task
      roles instead trust ecs-tasks.amazonaws.com.
    facts:
      - ecs-roles-instance-policy
      - ecs-roles-instance-trust
      - ecs-roles-trust
  - id: ecs-033
    q: An ECS task definition injects a Parameter Store parameter encrypted with a customer managed KMS
      key. What execution-role permissions are needed?
    a: ssm:GetParameters and kms:Decrypt. Add secretsmanager:GetSecretValue if the parameter references
      a Secrets Manager secret.
    facts:
      - ecs-roles-parameters
      - ecs-roles-kms
      - ecs-roles-secrets
  - id: ecs-061
    q: An ECS Fargate task must pull a private non-AWS image using credentials stored in Secrets
      Manager. What configuration and permissions are needed?
    a: Set repositoryCredentials in the task definition and grant the execution role
      secretsmanager:GetSecretValue. Add kms:Decrypt for a customer managed key.
    facts:
      - ecs-roles-registry
      - ecs-roles-registry-kms
  - id: ecs-062
    q: An ECS team wants to restrict task-role trust against confused deputy access to its account.
      Can aws:SourceArn be restricted to one ECS cluster?
    a: No. Use aws:SourceAccount or a wildcard ECS aws:SourceArn; a specific cluster is not supported.
    trap: true
    facts:
      - ecs-roles-trust-scope
  - id: ecs-063
    q: An ECS workload requires isolation between tasks that belong to different tenants. Why choose
      Fargate over ordinary tasks sharing an EC2 host?
    a: Fargate isolates each task. Ordinary EC2 containers can potentially reach other tasks'
      credentials or instance metadata on the same host.
    facts:
      - ecs-roles-isolation
  - id: ecs-064
    q: An ECS service injects a Secrets Manager secret into container environment variables. How can
      the service pick up a rotated secret?
    a: Force a new service deployment to launch fresh tasks. Existing containers do not automatically
      refresh the injected value.
    facts:
      - ecs-roles-secret-rotation
  - id: ecs-065
    q: An ECS Fargate Linux task must inject one JSON key from a Secrets Manager secret. What is the
      minimum Fargate platform version?
    a: Linux platform version 1.4.0. For Windows, use platform version 1.0.0.
    facts:
      - ecs-roles-secret-version
  - id: ecs-069
    q: An ECS workload needs hardware isolation between tasks while retaining multiple tasks per EC2
      instance. Which ECS compute option supports this?
    a: Use isolated tasks on ECS Managed Instances with Nitro Sandboxes. Each task gets a separate
      hardware-isolated virtual machine.
    facts:
      - ecs-roles-nitro
      - ecs-roles-nitro-date
  - id: ecs-071
    q: ECS tasks on EC2 with the awslogs driver send no logs, and the task has no execution role. Which role needs logs:PutLogEvents?
    a: The container instance role (or the task execution role, if one is assigned). The task role is for the application's own calls.
    trap: true
    facts: [awslogs-role]
---

ECS separates application permissions from the permissions needed to start a task. An IAM role is an assumable identity with permissions and temporary credentials; its trust policy defines who may assume it.

### How it works

1. On EC2, attach a container instance role through an instance profile, the attachment used to give an EC2 instance a role. The agent uses it to register with ECS.
2. Configure an execution role for agent operations such as Fargate image pulls, log delivery, and secret injection.
3. Give the task role the permissions that application code needs, such as S3 reads. The application receives task credentials; execution-role credentials are reserved for the agent.

| Role | User of the credentials | Typical purpose |
| --- | --- | --- |
| Container instance | ECS agent on EC2 | Register and communicate with ECS |
| Task execution | ECS or Fargate agent | Pull images, deliver logs, inject secrets |
| Task | Application code | Call AWS APIs at runtime |

For injection, grant `secretsmanager:GetSecretValue` for Secrets Manager or `ssm:GetParameters` for Parameter Store. Add `kms:Decrypt` for a customer managed encryption key. Application code that retrieves a secret itself needs the corresponding permissions on its task role.

For a private registry outside AWS, set `repositoryCredentials` and grant the execution role access to the Secrets Manager registry secret. Add `kms:Decrypt` if it uses a customer managed key.

Injected Secrets Manager environment variables are read at container startup. After rotation, launch a new task or force a new service deployment. Injecting a specific JSON key or version needs Fargate Linux platform 1.4.0 or later, or Windows platform 1.0.0.

### Exam cues

- If the question says a running ECS application is denied S3 access, think task role and resource policies, because the application uses task credentials.
- If the question says a Fargate task cannot inject a secret at startup, think execution-role permissions, because the agent retrieves the referenced secret.
- If the question says an EC2 host cannot join an ECS cluster, think container instance role, because registration is an agent operation.
- If an ECS container still uses an old injected secret after rotation, think a new deployment, because the environment value is set at startup.
- If the question requires task isolation, think Fargate or isolated tasks on ECS Managed Instances. Ordinary containers sharing an EC2 host can potentially access other task credentials and instance metadata.

### Remember

- Task and execution roles trust `ecs-tasks.amazonaws.com`; EC2 instance roles trust `ec2.amazonaws.com`.
- `AmazonECSTaskExecutionRolePolicy` covers common execution operations, not every secret or feature.
- Task-role SDK credentials do not inherit the instance role's permissions. CloudTrail records task context with `taskArn`.
- Limit task-role trust with `aws:SourceAccount` or `aws:SourceArn` to reduce confused deputy risk, where a service is misused to act on another account's behalf. A specific cluster ARN is not supported; use a wildcard for clusters.
- Nitro Sandboxes for ECS tasks launched in November 2026. A Nitro Sandbox is a hardware-isolated virtual machine; isolated tasks on ECS Managed Instances each receive one.

> **Trap:** A successful image pull does not establish that the application has permission to access its data.
