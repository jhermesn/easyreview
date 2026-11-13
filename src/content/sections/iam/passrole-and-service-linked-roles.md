---
title: PassRole and service-linked roles
level: associate
order: 90
facts:
  - id: passrole-purpose
    text: iam:PassRole authorizes a caller to supply an IAM role to an AWS service so that service can later
      assume it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: passrole-account
    text: PassRole can pass only a role in the same account as the service.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: passrole-trust
    text: The passed role trust policy must allow the receiving service to assume it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: passrole-scope
    text: Limit iam:PassRole using role ARNs in Resource and iam:PassedToService for the receiving service
      principal.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: passrole-escalation
    text: Passing a role with powerful permissions lets the service exercise those permissions on the caller
      behalf, so broad PassRole can allow privilege escalation.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: passrole-logs
    text: PassRole is a permission, not an API call; inspect the service create or update event that received the
      role instead of looking for a PassRole CloudTrail event.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole_logs
  - id: passrole-tag-warning
    text: AWS warns that controlling PassRole with ResourceTag conditions does not give reliable results.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: cross-role-indirection
    text: To use a role in A from a service in B, pass a local role in B that can assume the role in A.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
  - id: service-role
    text: A service role is an IAM role an AWS service assumes on the customer behalf; an administrator can manage
      it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html#id_roles_create-service-linked-role
  - id: service-linked-definition
    text: A service-linked role is a service-owned role with trust and permissions predefined by that service.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html#id_roles_create-service-linked-role
  - id: service-linked-no-edit
    text: Administrators can view service-linked role permissions but cannot edit them.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html#id_roles_create-service-linked-role
  - id: service-linked-delete
    text: Delete resources related to a service-linked role before deleting the role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create-service-linked-role.html#id_roles_create-service-linked-role
  - id: service-linked-scp
    text: SCPs do not restrict service-linked role permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#not-restricted-by-scp
cards:
  - id: iam-018
    q: What does iam:PassRole authorize, and does it generate its own CloudTrail API event?
    a: It authorizes supplying a role to an AWS service. It is not an API call; inspect the service create or
      update event that received the role. Scope it by role ARN and iam:PassedToService.
    facts:
      - passrole-purpose
      - passrole-logs
      - passrole-scope
  - id: iam-019
    q: Can an administrator use iam:PassRole to attach a role from account A directly to a service in account B?
    a: No. Pass a role in B that can assume the role in A, with the required trust and permissions. PassRole
      itself is limited to the same account.
    trap: true
    facts:
      - passrole-account
      - cross-role-indirection
  - id: iam-020
    q: Who controls the permissions of an IAM service-linked role?
    a: The linked AWS service. Administrators can view but cannot edit its permissions; related resources must be
      removed before deletion. SCPs do not restrict the role.
    facts:
      - service-linked-definition
      - service-linked-no-edit
      - service-linked-delete
      - service-linked-scp
  - id: iam-052
    q: A developer can create an AWS service resource but is denied when supplying its IAM role. Which permission
      and trust should the team inspect?
    a: Check the developer iam:PassRole permission for that role and the role trust for the receiving service.
    facts:
      - passrole-purpose
      - passrole-trust
  - id: iam-053
    q: A developer has few direct data permissions but can pass an administrator role to an AWS service. What is
      the IAM risk?
    a: Privilege escalation through the service. Restrict the passed role ARNs and receiving services so the
      developer cannot delegate excessive authority.
    facts:
      - passrole-escalation
      - passrole-scope
---

The `iam:PassRole` permission controls which roles a caller may supply when configuring an AWS service. The service then assumes the role to act for the customer. A service role is administrator-managed; a service-linked role has permissions defined by its linked service.

### How it works

1. Create a role whose permissions cover the service's work and whose trust policy allows that service to assume it.
2. Give the configuring caller `iam:PassRole` for the approved role ARNs. Use `iam:PassedToService` to restrict the receiving service principal, the service identity named in trust.
3. Supply the role during the service create or update operation. The service checks the caller's permission to pass it and later uses the role.
4. For a service-linked role, follow the service's lifecycle rules. Its trust and permissions are predefined; remove related resources before deleting it.

### Exam cues

- If the question says service creation works until a role is supplied, think `iam:PassRole`, because configuring the service and delegating a role are separate permissions.
- If the question says the role is owned by an AWS service and its permissions cannot be edited, think service-linked role, because the service defines those permissions.
- If the question says a low-privilege developer can pass an administrator role, think privilege escalation, because the service can use that role's permissions for the developer.

### Remember

- PassRole requires the role and service to share an account. A local role can assume a separately trusted role in another account.
- PassRole has no separate API or CloudTrail event. Inspect the operation that received the role.
- AWS warns against relying on `ResourceTag` to control PassRole.
- SCPs do not restrict service-linked roles.

> **Trap:** Permission to pass a role does not replace its trust policy. The receiving service still needs permission to assume it.
