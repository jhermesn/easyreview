---
title: Service roles and capabilities
level: associate
order: 100
facts:
  - id: service-role
    text: A CloudFormation service role supplies credentials for stack resource operations instead of
      the caller-derived temporary session used by default.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html#using-iam-servicerole
  - id: trust
    text: A CloudFormation service role trusts cloudformation.amazonaws.com to assume it.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html#using-iam-servicerole
  - id: pass-role
    text: Specifying a CloudFormation service role requires iam:PassRole permission for that role.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html#using-iam-servicerole
  - id: persistent-role
    text: Once attached, a service role is used for all stack operations and cannot be removed, although
      it can be changed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html#using-iam-servicerole
  - id: role-risk
    text: Other users allowed to operate a stack can use its attached service role without having
      iam:PassRole, so the role should grant least privilege.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-servicerole.html#using-iam-servicerole
  - id: iam-capability
    text: Templates containing IAM resources require CAPABILITY_IAM or CAPABILITY_NAMED_IAM
      acknowledgment; custom IAM names require CAPABILITY_NAMED_IAM.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html#API_CreateStack_RequestParameters
  - id: insufficient
    text: Omitting required IAM capability acknowledgment produces InsufficientCapabilities.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html#API_CreateStack_RequestParameters
  - id: expand
    text: CAPABILITY_AUTO_EXPAND acknowledges macro processing when directly creating a stack without
      first reviewing a change set.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html#API_CreateStack_RequestParameters
  - id: macro-review
    text: AWS recommends reviewing a macro-processed change set because macros can add resources,
      including IAM resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros-overview.html#template-macros-change-sets
cards:
  - id: cloudformation-045
    q: A CloudFormation template with custom-named IAM resources fails with InsufficientCapabilities.
      Which acknowledgment is missing?
    a: CAPABILITY_NAMED_IAM. CAPABILITY_IAM can acknowledge unnamed IAM resources; custom names require
      CAPABILITY_NAMED_IAM.
    facts:
      - iam-capability
      - insufficient
  - id: cloudformation-050
    q: What changes when a CloudFormation stack has a service role, and why must its permissions be
      narrow?
    a: CloudFormation uses the role for all stack operations. It cannot be removed, though it can be
      changed. Users allowed to operate the stack can use the role without iam:PassRole, which can
      expose the role permissions to them.
    facts:
      - service-role
      - persistent-role
      - role-risk
  - id: cloudformation-090
    q: A team directly creates a CloudFormation stack containing macros without first reviewing a change
      set. Which capability acknowledges expansion?
    a: CAPABILITY_AUTO_EXPAND. Review a processed change set when possible because macros can introduce
      additional resources.
    facts:
      - expand
      - macro-review
  - id: cloudformation-091
    q: A user can update a CloudFormation stack but lacks iam:PassRole for its already attached service
      role. Can the stack operation still use that role?
    a: Yes. Existing stack operators can use the attached role through stack operations. Limit both
      stack access and the role permissions.
    trap: true
    facts:
      - role-risk
  - id: cloudformation-092
    q: What permission is required to attach a service role to a CloudFormation stack?
    a: iam:PassRole for the role. The role must trust cloudformation.amazonaws.com.
    facts:
      - pass-role
      - trust
---
A CloudFormation service role defines which AWS resource actions CloudFormation can perform for a stack. Capabilities are separate acknowledgments that a template can create IAM resources or expand macros.

### How it works

1. Create an IAM role that trusts `cloudformation.amazonaws.com` and grants only the resource actions the stack needs. A trust policy defines who can assume a role.
2. Specify that role when operating the stack, with `iam:PassRole` permission. CloudFormation then uses the role's credentials.
3. Acknowledge the template capabilities that apply before creation.

| Capability | Meaning |
|---|---|
| `CAPABILITY_IAM` | Acknowledge IAM resources without custom names |
| `CAPABILITY_NAMED_IAM` | Acknowledge IAM resources, including custom-named ones |
| `CAPABILITY_AUTO_EXPAND` | Acknowledge direct macro expansion without reviewing a change set first |

### Exam cues

- If the question says custom IAM names cause `InsufficientCapabilities`, think `CAPABILITY_NAMED_IAM`, because the template needs that acknowledgment.
- If the question says directly create a stack containing macros, think `CAPABILITY_AUTO_EXPAND`, because template processing can add resources before provisioning.
- If the question says operators gain unexpected resource access through a stack, think the service role's permissions, because stack operations can use that attached role.

### Remember

- Without a service role, CloudFormation normally uses a temporary session based on the caller's credentials.
- Once attached, the role applies to all stack operations. It can be changed but cannot be removed.
- Review processed change sets for macros that may introduce IAM resources.

> **Trap:** iam:PassRole is required to specify the role, but another user allowed to operate the stack can use its existing attached role without that permission.
