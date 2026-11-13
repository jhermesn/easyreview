---
title: Permissions boundaries and session policies
level: professional
order: 30
facts:
  - id: boundary-ceiling
    text: A permissions boundary is a managed policy that limits what identity policies can grant to an IAM user
      or role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
  - id: boundary-no-grant
    text: A permissions boundary grants nothing by itself.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
  - id: boundary-overlap
    text: An identity grant must overlap the boundary Allow; an explicit Deny in either blocks access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
  - id: session-scope
    text: Session policies passed to role or federated-user sessions limit identity-policy grants for that session.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session
  - id: role-session-overlap
    text: AssumeRole session policies cannot add to the role identity-policy permissions.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: federated-overlap
    text: GetFederationToken session permissions are limited by both the calling user policies and supplied
      session policies.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html#API_GetFederationToken
  - id: resource-exception
    text: Direct same-account grants to user or session principals have different implicit-deny rules from grants
      to role ARNs.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
  - id: require-boundary
    text: Delegated role creation can require iam:PermissionsBoundary to equal an approved policy ARN.
    source: https://aws.amazon.com/blogs/security/when-and-where-to-use-iam-permissions-boundaries/
  - id: protect-boundary
    text: Delegates must be prevented from removing the required boundary or changing its policy to escape its
      limits.
    source: https://aws.amazon.com/blogs/security/when-and-where-to-use-iam-permissions-boundaries/
  - id: notprincipal-deny
    text: A resource Deny with NotPrincipal denies IAM principals with boundaries regardless of the NotPrincipal
      exceptions; AWS recommends ArnNotEquals on aws:PrincipalArn.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
  - id: no-service-linked-boundary
    text: A permissions boundary cannot be set on a service-linked role.
    source: https://docs.aws.amazon.com/cli/latest/reference/iam/put-role-permissions-boundary.html
cards:
  - id: iam-004
    q: A team wants to cap the permissions identity policies can grant to an IAM role. Which IAM feature should it
      use?
    a: A permissions boundary. The boundary limits identity grants to a user or role and grants nothing by itself.
      A service-linked role cannot have a boundary.
    facts:
      - boundary-ceiling
      - boundary-no-grant
      - no-service-linked-boundary
  - id: iam-007
    q: What does an AWS STS session policy passed to AssumeRole do?
    a: It limits identity-policy grants for that session to the overlap with the role permissions. It cannot add
      permissions to the role identity policy.
    facts:
      - session-scope
      - role-session-overlap
  - id: iam-023
    q: A team lead must create IAM roles without escaping an approved privilege ceiling. How should an
      administrator delegate that work?
    a: Require the approved iam:PermissionsBoundary policy ARN during role creation, and prevent removal or
      modification of that boundary.
    facts:
      - require-boundary
      - protect-boundary
  - id: iam-037
    q: An IAM user boundary allows S3 access, but no identity or resource policy grants it. Can the user read S3
      objects?
    a: No. A boundary limits grants and does not create one.
    trap: true
    facts:
      - boundary-no-grant
  - id: iam-038
    q: A resource Deny with NotPrincipal lists an exception for an IAM role, but attaching a boundary makes the
      role lose access. What should the policy author inspect?
    a: The NotPrincipal Deny. For principals with boundaries it denies regardless of those exceptions. AWS
      recommends ArnNotEquals with aws:PrincipalArn.
    trap: true
    facts:
      - notprincipal-deny
---

Permissions boundaries let an administrator delegate IAM management while limiting what identity policies may grant. A session policy applies a further limit to a temporary session. Think of each as a filter on a grant.

### How it works

1. Attach a managed policy as the boundary of an IAM user or role. An identity-policy Allow must also be allowed by that boundary.
2. When requesting a role or federated-user session, pass a session policy to narrow its identity-policy permissions. For `AssumeRole`, it intersects with the role's permissions; for `GetFederationToken`, it intersects with the calling user's policies.
3. When delegating role creation, require `iam:PermissionsBoundary` to equal the approved policy ARN. Prevent the delegate from removing the boundary or editing its policy to escape the restriction.
4. Inspect resource grants separately. A policy naming a user or session directly has different implicit-deny rules from one naming a role ARN.

### Exam cues

- If the question says developers need to create roles within a central permission ceiling, think required boundary plus protection against removal and modification, because an editable ceiling can be escaped.
- If the question says one role session should have fewer permissions, think session policy, because it narrows that session's identity-policy grants.
- If the question says adding a boundary breaks a `NotPrincipal` exception, think the resource's Deny statement, because `NotPrincipal` with Deny rejects principals with boundaries regardless of its exceptions.

### Remember

- A boundary can apply to a user or role, but not a service-linked role. It does not grant access.
- Session policies cannot add permissions to the role's identity policies.
- Explicit denies still apply to direct resource-policy grants.

> **Trap:** For a resource Deny that excludes particular principals, AWS recommends `ArnNotEquals` with `aws:PrincipalArn` over `NotPrincipal` when boundaries are involved.
