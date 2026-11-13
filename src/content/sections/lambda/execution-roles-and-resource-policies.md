---
title: Execution roles and resource policies
level: associate
order: 60
facts:
  - id: execution-role
    text: Lambda assumes the function execution role to access other AWS resources.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#lambda-intro-execution-role
  - id: role-trust
    text: An execution-role trust policy must trust the service principal lambda.amazonaws.com.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#lambda-intro-execution-role
  - id: resource-policy
    text: A Lambda resource-based policy grants principals such as AWS services and other accounts access to a function, version, or alias.
    source: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html#access-control-resource-based
  - id: cross-account-invoke
    text: Cross-account invocation requires a grant in the function resource policy and corresponding Lambda API permission for the caller.
    source: https://docs.aws.amazon.com/lambda/latest/dg/permissions-function-cross-account.html#permissions-function-cross-account
  - id: source-conditions
    text: SourceArn and SourceAccount conditions can restrict service invocation permissions to the intended source resource and account.
    source: https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html#access-control-resource-based
  - id: basic-logs
    text: AWSLambdaBasicExecutionRole grants basic CloudWatch Logs permissions.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#lambda-intro-execution-role
  - id: default-log-group
    text: The default CloudWatch log group is /aws/lambda/<function name>, created on first invocation.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-loggroups.html#monitoring-cloudwatchlogs-loggroups
  - id: shared-log-group
    text: Multiple Lambda functions can send logs to the same custom log group; custom streams identify function, version, and execution environment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-loggroups.html#monitoring-cloudwatchlogs-loggroups
  - id: log-write
    text: The execution role needs logs:PutLogEvents to send function logs to CloudWatch Logs.
    source: https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-loggroups.html#monitoring-cloudwatchlogs-loggroups
  - id: efs-auth
    text: For EFS IAM client authorization, EFS evaluates the file-system resource policy together with the client identity policy.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#iam-access-control-nfs-efs
  - id: efs-actions
    text: EFS ClientMount grants read access, ClientWrite grants write access, and ClientRootAccess grants root-user access.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#efs-filesystempolicy-actions
  - id: efs-policy-allow
    text: For same-account EFS IAM client authorization, an allow in either identity or file-system policy can grant an action; an allow in both is not required.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#iam-access-control-nfs-efs
  - id: policy-explicit-deny
    text: An explicit deny in an applicable IAM identity or resource policy overrides an allow.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html#reference_policies_evaluation-logic
diagrams:
  - id: lambda-permission-directions
    title: Invocation permission and execution permission have different owners
    width: 900
    height: 320
    nodes:
      - id: source
        label: EventBridge
        icon: eventbridge
        x: 30
        y: 100
        w: 170
        h: 72
        tone: integration
      - id: function
        label: Lambda
        icon: lambda
        x: 340
        y: 100
        w: 170
        h: 72
        tone: compute
      - id: table
        label: DynamoDB
        icon: dynamodb
        x: 650
        y: 100
        w: 170
        h: 72
        tone: database
    edges:
      - from: source
        to: function
        step: 1
        label: resource policy
      - from: function
        to: table
        step: 2
        label: execution role
    steps:
      - The function resource policy permits the source service to invoke Lambda.
      - Lambda assumes its execution role to access the downstream resource.
cards:
  - id: lambda-016
    q: What is the difference between a Lambda execution role and a function resource-based policy?
    a: The execution role grants the function access to other AWS resources. A resource-based policy grants callers such as AWS services or other accounts access to the function. The role trust policy lets Lambda assume the role.
    facts:
      - execution-role
      - resource-policy
      - role-trust
  - id: lambda-030
    q: A Lambda function runs but receives AccessDenied when writing to DynamoDB. Which permission should the team inspect?
    a: Inspect the function execution role permissions for DynamoDB. Invocation permission in the function resource policy does not grant access to the resources the code uses.
    facts:
      - execution-role
      - resource-policy
  - id: lambda-031
    q: A role in another account has lambda:InvokeFunction, but invoking the shared Lambda function is denied. What other permission is required?
    a: The target function resource policy must allow that caller or account. Cross-account invocation needs the caller permission and the target-side grant.
    facts:
      - cross-account-invoke
  - id: lambda-032
    q: Several Lambda functions must write to one CloudWatch log group. How should the team configure them?
    a: Set the same custom log group in each function logging configuration and authorize their execution roles to write logs. Custom streams preserve the function and version identity.
    facts:
      - shared-log-group
      - log-write
  - id: lambda-033
    q: A same-account Lambda client uses IAM authorization for EFS. Must both its role policy and the EFS file-system policy contain an allow for every action?
    a: No. EFS evaluates the policies together; an allow in either can grant an action. ClientMount grants read access, while ClientWrite grants write access. An applicable explicit deny still overrides an allow.
    trap: true
    facts:
      - efs-auth
      - efs-policy-allow
      - efs-actions
      - policy-explicit-deny
---
A Lambda execution role is an AWS Identity and Access Management (IAM) role that grants the function access to AWS resources. A resource-based policy grants callers access to the function. A principal is the identity or service receiving permission; these policies control different directions of access.

### How it works

1. Set the execution role's trust policy, which states who may assume the role, to trust `lambda.amazonaws.com`. Lambda assumes that role when invoking the function.
2. Grant the role the actions the function needs, such as accessing a table or writing logs. `AWSLambdaBasicExecutionRole` supplies basic CloudWatch Logs permissions.
3. For an AWS service or another account to invoke the function, add the appropriate function resource-policy grant. Restrict service grants with `SourceArn` and `SourceAccount`, the source resource identifier and owning account.
4. For cross-account invocation, also authorize the caller to invoke the target through its own permissions. An Amazon Resource Name (ARN) identifies the function, version, alias, or source resource in a policy.
5. Configure logging destinations and role permissions together. The default log group, a container for log streams, is `/aws/lambda/<function name>` and is created on first invocation. Multiple functions can share a custom group; its streams identify function, version, and execution environment. The role needs `logs:PutLogEvents`.

For EFS file access using IAM client authorization, EFS evaluates the role's identity policy and the file-system resource policy together. In the same account, an allow in either can grant access; both do not need matching allows. An applicable explicit deny still overrides an allow. `ClientMount` permits reading, `ClientWrite` permits writing, and `ClientRootAccess` permits root-user access.

### Exam cues

- If the question says Lambda can run but cannot write a table, think execution role, because it controls the function's AWS resource access.
- If the question says another account cannot invoke Lambda, think caller permissions plus function resource policy, because cross-account access needs both sides.
- If the question says collect several functions' logs in one group, think a shared custom logging configuration and role permissions, because log streams retain function identity.

### Remember

- Role trust: `lambda.amazonaws.com`.
- Code access: execution role. Caller access: resource policy, with caller permissions also required for cross-account invocation.
- Logs need `logs:PutLogEvents`; changing the log-group name does not itself grant that permission.
- EFS IAM authorization combines identity and file-system policies.

> **Trap:** Giving the execution role permission to write to a service does not grant that service permission to invoke the function.
