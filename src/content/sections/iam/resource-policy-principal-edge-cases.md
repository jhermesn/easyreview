---
title: Resource policy principal edge cases
level: professional
order: 40
facts:
  - id: principal-scope
    text: Same-account resource-policy evaluation depends on the type of principal receiving the permission.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: role-arn-limit
    text: A resource Allow naming an IAM role ARN is limited by implicit denies in its permissions boundary or
      session policy.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-roles
  - id: session-arn-grant
    text: A same-account resource Allow naming a role session ARN grants directly to the session and is not
      limited by implicit denies in identity policies, boundaries or session policies.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-role-session
  - id: user-arn-grant
    text: A same-account resource Allow naming an IAM user ARN is not limited by implicit denies in that user
      identity policy or boundary.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
  - id: federated-session-grant
    text: A same-account resource Allow naming a GetFederationToken federated-user ARN grants directly to the
      session, bypassing implicit denies in identity, boundary and session policies.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
  - id: federating-user-limit
    text: If a resource grant names the IAM user who created a federated-user session, requests by that session
      remain limited by boundary and session policy implicit denies.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries-eval-logic
  - id: explicit-deny-still-wins
    text: An applicable explicit deny still blocks a direct resource-policy grant.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: principalarn-wildcard
    text: A resource Allow using Principal wildcard and an aws:PrincipalArn condition is not limited by boundary
      or session-policy implicit denies; explicit denies still apply.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-roles
  - id: principalarn-role-value
    text: For requests with role credentials, aws:PrincipalArn contains the role ARN, not the role session ARN.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principalarn
  - id: role-principal-id
    text: IAM converts a role ARN in Principal into its unique principal ID; deleting and recreating that role
      breaks the old relationship.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-roles
  - id: condition-arn-persistence
    text: IAM does not convert condition-key ARNs to principal IDs; an aws:PrincipalArn condition can therefore
      match a recreated role with the same ARN.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-roles
  - id: role-arn-example
    text: IAM role ARNs use arn:aws:iam::account-id:role/role-name; assumed-role session ARNs use
      arn:aws:sts::account-id:assumed-role/role-name/session-name.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#reference_policies_elements_principal
  - id: deny-definitions
    text: An implicit deny is the absence of a matching Allow; an explicit deny is a matching Deny statement.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: root-principal-condition
    text: An account root ARN in Principal delegates to the account, but the same ARN in aws:PrincipalArn matches only the root user.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principalarn
  - id: cross-account-evaluation
    text: Cross-account resource access requires an Allow in both the principal account's identity evaluation and the resource account's resource-policy evaluation.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html#policy-eval-cross-account
  - id: notprincipal-boundary
    text: A resource-policy Deny with NotPrincipal denies IAM principals with permissions boundaries regardless of the NotPrincipal values; AWS recommends ArnNotEquals with aws:PrincipalArn instead.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
  - id: principal-wildcard-limits
    text: Principal cannot use a wildcard for part of a name or ARN, and IAM groups cannot be principals.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#Principal_specifying
  - id: trust-key-exception
    text: IAM role trust policies and KMS key policies require an explicit policy authorization, unlike the usual same-account rule that an identity or resource Allow can suffice.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html
  - id: kms-account-delegation
    text: A KMS key policy can authorize the account to delegate key access through IAM policies without naming each IAM principal.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-root-enable-iam
cards:
  - id: iam-005
    q: In one AWS account, an S3 bucket policy allows a specific role session ARN to read objects. The role
      boundary omits S3 and there is no applicable explicit deny or organization restriction. Can that session
      read?
    a: Yes. The resource grant goes directly to the session; a boundary implicit deny does not limit that grant.
    trap: true
    facts:
      - session-arn-grant
      - explicit-deny-still-wins
  - id: iam-006
    q: In one AWS account, an S3 bucket policy allows a role ARN to read objects, but the role boundary omits S3.
      Can a session of that role use that grant?
    a: No. A grant naming the role ARN remains limited by the boundary implicit deny.
    trap: true
    facts:
      - role-arn-limit
  - id: iam-039
    q: An S3 bucket policy allows an IAM role using Principal wildcard plus an aws:PrincipalArn condition. Does
      omitting S3 from the boundary block that grant by itself?
    a: No. This form of grant has different implicit-deny behavior from naming a role in Principal. Applicable
      explicit denies still win.
    trap: true
    facts:
      - principalarn-wildcard
      - explicit-deny-still-wins
  - id: iam-040
    q: A role was deleted and recreated with the same name, and an existing resource Principal grant stopped
      working. Why?
    a: The original role ARN was stored as a unique principal ID. The new role has a different ID; update the
      resource policy to trust it.
    facts:
      - role-principal-id
  - id: iam-041
    q: For an IAM role request, does aws:PrincipalArn identify the role or its assumed-role session?
    a: The IAM role ARN. The calling principal is a role session, but this condition key holds the role ARN.
    trap: true
    facts:
      - principalarn-role-value
  - id: iam-066
    q: An S3 bucket policy names an account root ARN in Principal. Does that restrict access to the account root user?
    a: No. It delegates to the account. In an `aws:PrincipalArn` condition, the root ARN matches only the root user.
    trap: true
    facts: [root-principal-condition]
  - id: iam-067
    q: An S3 bucket policy allows a role session from another account, but the role has no identity policy Allow. Is cross-account access granted?
    a: No. Both the requesting account's identity evaluation and the bucket account's resource evaluation must allow the request.
    trap: true
    facts: [cross-account-evaluation]
  - id: iam-068
    q: An S3 bucket policy uses Deny with NotPrincipal to exempt a role, but the role has a permissions boundary. Why is it denied?
    a: A `NotPrincipal` with `Deny` denies principals with boundaries regardless of its values. AWS recommends an `ArnNotEquals` condition on `aws:PrincipalArn`.
    trap: true
    facts: [notprincipal-boundary]
  - id: iam-069
    q: Can an S3 bucket policy use a partial wildcard in Principal to match several IAM roles?
    a: No. A partial wildcard is not allowed in a principal name or ARN. IAM groups cannot be principals either.
    facts: [principal-wildcard-limits]
  - id: iam-070
    q: An IAM identity has a KMS Allow, but the KMS key policy neither authorizes it nor enables IAM delegation. Is access granted by that identity policy?
    a: No. The key policy must authorize access, though it can enable account delegation through IAM policies rather than name every principal.
    trap: true
    facts: [trust-key-exception, kms-account-delegation]
---

A resource policy grants access to the principal it names. In one account, naming a role differs from naming a particular temporary session. An implicit deny means a policy has no matching Allow; an explicit deny is a matching Deny statement.

### How it works

1. Identify the grant recipient. A role ARN has the form `arn:aws:iam::account-id:role/role-name`. A role session ARN has the form `arn:aws:sts::account-id:assumed-role/role-name/session-name`.
2. Apply the matching row below for a same-account resource Allow. Check applicable organization controls and explicit denies separately.
3. Inspect conditions as well as `Principal`. A wildcard `Principal` combined with `aws:PrincipalArn` differs from naming the role directly. With role credentials, that condition key contains the role ARN.
4. For cross-account access, check both the caller's identity evaluation and the resource policy. Both accounts must allow the request.

| Resource grant recipient | Effect of an implicit deny |
|---|---|
| IAM role ARN in Principal | Boundary and session policy can limit the grant |
| Role session ARN | Identity policy, boundary and session policy do not limit the direct grant |
| IAM user ARN, used by that user | Identity policy and boundary do not limit the direct grant |
| Federated-user session ARN | Identity policy, boundary and session policy do not limit the direct grant |
| IAM user ARN, used by its federated session | Boundary and session policy can limit the grant |

### Exam cues

- If the question says a bucket names a role session and its boundary merely omits S3, think direct session grant, because that implicit deny does not block the grant.
- If the question says the bucket names the role ARN and its boundary omits S3, think denied, because that form of grant remains subject to the boundary.
- If the question says a recreated role lost a resource grant, think unique principal ID, because recreating the same name creates a new identity. A condition-key ARN is not converted to that ID and can match the recreated role.
- If an S3 policy uses `NotPrincipal` with `Deny`, think boundary side effect: it denies principals with boundaries even when they are listed as exceptions. Use `ArnNotEquals` with `aws:PrincipalArn` as AWS recommends.
- If an IAM role trust or KMS key policy is involved, check its authorization as well as identity permissions. A KMS key policy can enable the account to delegate access through IAM rather than naming every principal.

### Remember

- These implicit-deny exceptions describe same-account resource grants.
- A wildcard `Principal` with an `aws:PrincipalArn` condition is not limited by boundary or session-policy implicit denies.
- Applicable explicit denies still win.
- An account root ARN in `Principal` delegates to the account; in `aws:PrincipalArn` it matches only the root user.
- Partial wildcards and IAM groups cannot be used as principals.

> **Trap:** The rule that a session ARN bypasses an implicit deny does not mean it bypasses an explicit deny.
