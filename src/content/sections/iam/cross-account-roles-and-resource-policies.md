---
title: Cross-account roles and resource policies
level: professional
order: 50
facts:
  - id: cross-both-allow
    text: Cross-account resource access requires an Allow in the caller identity policy and the resource policy.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html#policy-eval-cross-account
  - id: cross-limits
    text: AWS evaluates each side of a cross-account request separately with its applicable policy limits; both
      evaluations must allow access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html#policy-eval-cross-account
  - id: role-caller-allow
    text: A cross-account AssumeRole caller needs sts:AssumeRole permission on the target role ARN.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: role-trust-allow
    text: The target role trust policy must trust the caller or its account for cross-account AssumeRole.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: trust-account-delegation
    text: Naming an AWS account principal delegates authority to that account; it does not directly authorize
      every identity in the account.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-accounts
  - id: role-credentials
    text: STS returns temporary credentials for the assumed role session.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: role-replaces-permissions
    text: Using an assumed role means using its permissions rather than adding the original caller permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html#access_policies-cross-account-using-roles
  - id: resource-preserves-permissions
    text: A resource-based cross-account grant lets the original principal retain its permissions while accessing
      the shared resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html#access_policies-cross-account-using-resource-based-policies
  - id: resource-support
    text: Direct sharing needs resource-policy support; a role can provide access to services that lack it.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html#access_policies-cross-account-resource-access
  - id: partition-limit
    text: Cross-account roles and resource policies delegate access only within the same AWS partition.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html#access_policies-cross-account-resource-access
  - id: principal-wildcards
    text: A Principal ARN cannot use a wildcard to match only part of a principal name or ARN.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#Principal_specifying
diagrams:
  - id: iam-cross-account-role
    title: Cross-account role assumption
    width: 820
    height: 360
    groups:
      - label: Account A
        icon: group-aws-account
        x: 20
        y: 20
        w: 220
        h: 320
        tone: mgmt
      - label: Account B
        icon: group-aws-account
        x: 560
        y: 20
        w: 240
        h: 320
        tone: mgmt
    nodes:
      - id: caller
        label: Caller
        sub: identity Allow
        icon: res-users
        x: 40
        y: 130
        w: 180
        h: 86
        tone: user
        info: The caller needs sts:AssumeRole on the target role.
      - id: sts
        label: AWS STS
        sub: checks assumption
        icon: res-identity-access-management-aws-sts
        x: 310
        y: 70
        w: 180
        h: 86
        tone: security
        info: STS evaluates caller permission and target trust before issuing temporary credentials.
      - id: role
        label: Target role
        sub: trust + permissions
        icon: res-identity-access-management-role
        x: 590
        y: 70
        w: 180
        h: 86
        tone: security
        info: Trust controls assumption; permissions define resource access.
      - id: bucket
        label: S3 bucket
        sub: resource in B
        icon: res-simple-storage-service-bucket
        x: 590
        y: 230
        w: 180
        h: 86
        tone: storage
        info: The request uses the assumed role session permissions.
    edges:
      - from: caller
        to: sts
        step: 1
        label: AssumeRole
      - from: sts
        to: role
        step: 2
        label: trust check
      - from: caller
        to: bucket
        step: 3
        label: role credentials
    steps:
      - Account A authorizes the caller to invoke AssumeRole on the target role.
      - The target trust policy in B allows assumption and STS issues credentials.
      - The caller accesses the bucket with the temporary role credentials.
cards:
  - id: iam-008
    q: An IAM role in account A reads an S3 object in account B using its original credentials. Which policies
      must allow the action?
    a: The role identity policy in A and the bucket resource policy in B. Applicable policy limits and explicit
      denies can still block the request.
    facts:
      - cross-both-allow
      - cross-limits
  - id: iam-009
    q: A team copies S3 objects across accounts and wants to keep using its original principal permissions. Which
      access pattern fits?
    a: A resource-based bucket policy that grants the original principal access, together with its identity
      policy. Assuming a role uses the role permissions; it does not merge the original permissions into that
      session.
    trap: true
    facts:
      - resource-preserves-permissions
      - role-replaces-permissions
      - cross-both-allow
  - id: iam-010
    q: An IAM principal cannot assume a role in another AWS account. Which two permissions should the team inspect
      first?
    a: The caller identity policy must allow sts:AssumeRole on the target role ARN, and the target role trust
      policy must trust the caller or its account.
    facts:
      - role-caller-allow
      - role-trust-allow
  - id: iam-042
    q: Does trusting an AWS account in an IAM role trust policy automatically authorize every identity in that
      account?
    a: No. It delegates authority to that account, which must grant its caller sts:AssumeRole permission.
    trap: true
    facts:
      - trust-account-delegation
      - role-caller-allow
  - id: iam-043
    q: A service has no resource-based policy support. How can a principal in another AWS account access it?
    a: Assume a role in the resource account whose permissions cover the required actions.
    facts:
      - resource-support
      - role-credentials
---

Cross-account access lets an identity in one AWS account use resources in another. A role changes the credentials used for the work. A resource policy shares a resource with the original principal.

### How it works

1. For direct resource access, give the caller an identity Allow and add a resource Allow in the owning account. AWS evaluates both sides with their applicable limits.
2. For role access, allow `sts:AssumeRole` on the target role ARN in the caller's identity policy. In the target account, create a trust policy that trusts the caller or its account.
3. STS checks the assumption request and returns temporary role credentials. Subsequent requests use the role session permissions, without combining the original caller permissions.
4. Use the original credentials with a resource policy when retaining those permissions matters. If the service lacks resource-policy support, use a role with the permissions required for the work.

### Exam cues

- If the question says cross-account role assumption fails, think caller permission and target trust, because both must authorize the assumption request.
- If the question says copy across S3 accounts while retaining original access, think bucket policy for the original principal, because a resource grant does not switch identities.
- If the question says the service has no resource policy, think cross-account role, because its permissions can authorize the work in the target account.

### Remember

- Trusting an account delegates to its administrators; they must authorize callers.
- Both sides of cross-account resource access must allow the request.
- Delegation works within one AWS partition, the separate AWS environment containing a set of Regions.
- A `Principal` ARN cannot match part of a name with a wildcard.

> **Trap:** Assuming a role does not inherently make copying impossible. The selected principal must have the permissions for all required source and destination operations. Its original grants are not automatically added.
