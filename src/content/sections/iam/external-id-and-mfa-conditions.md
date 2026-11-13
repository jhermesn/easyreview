---
title: External ID and MFA conditions
level: professional
order: 80
facts:
  - id: external-purpose
    text: An external ID helps prevent a vendor serving multiple customers from being tricked into using its
      authority for the wrong customer, the confused deputy problem.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_third-party_external-id
  - id: external-unique
    text: The vendor assigns a unique external ID per customer and includes the correct value in AssumeRole
      requests.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#external-id-use
  - id: external-condition
    text: The customer trust policy requires the vendor principal and checks sts:ExternalId.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_common-scenarios_third-party
  - id: external-not-secret
    text: AWS does not treat an external ID as a secret.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_common-scenarios_third-party
  - id: mfa-trust
    text: A role trust policy can require Bool aws:MultiFactorAuthPresent true for MFA-authenticated AssumeRole.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: mfa-parameters
    text: For MFA with AssumeRole, the caller supplies SerialNumber for the device and TokenCode for its one-time
      code.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: mfa-session-token
    text: GetSessionToken with MFA returns user temporary credentials with MFA authentication information.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken
  - id: mfa-key-absence
    text: aws:MultiFactorAuthPresent is absent for long-term access-key requests and is not provided for federated
      identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthpresent
  - id: mfa-deny-ifexists
    text: A Deny with BoolIfExists aws:MultiFactorAuthPresent false rejects non-MFA temporary requests and
      long-term access-key requests.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthpresent
  - id: mfa-age
    text: aws:MultiFactorAuthAge measures seconds since MFA authentication and is available only for temporary
      credentials created with MFA.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthage
cards:
  - id: iam-012
    q: A vendor serves several customers and assumes an IAM role in each account. How can a customer reduce the
      confused deputy risk?
    a: Require the vendor principal and its unique customer external ID in the role trust policy. The vendor must
      pass the matching ExternalId to AssumeRole.
    facts:
      - external-purpose
      - external-unique
      - external-condition
  - id: iam-013
    q: An IAM user must authenticate with MFA before assuming a sensitive role. How should the role enforce this?
    a: Require aws:MultiFactorAuthPresent true in its trust policy. The AssumeRole caller supplies SerialNumber
      and TokenCode.
    facts:
      - mfa-trust
      - mfa-parameters
  - id: iam-048
    q: Is an external ID in an IAM trust policy a password that must be kept secret?
    a: No. It distinguishes the vendor customer context. AWS does not treat it as a secret.
    trap: true
    facts:
      - external-not-secret
      - external-purpose
  - id: iam-049
    q: An IAM policy must deny requests without MFA, including calls signed with long-term access keys. Which
      condition handles a missing MFA key?
    a: Deny with BoolIfExists on aws:MultiFactorAuthPresent set to false. The key is absent on long-term key
      requests.
    trap: true
    facts:
      - mfa-key-absence
      - mfa-deny-ifexists
  - id: iam-050
    q: An IAM user needs temporary credentials carrying MFA information while retaining user permissions. Which
      STS operation fits?
    a: GetSessionToken with MFA information.
    facts:
      - mfa-session-token
  - id: iam-051
    q: What does the IAM condition key aws:MultiFactorAuthAge measure?
    a: Seconds since MFA authentication for temporary credentials created with MFA.
    facts:
      - mfa-age
---

External IDs distinguish a vendor's customers during role assumption. They address the confused deputy problem, where someone tricks a service with legitimate authority into using it for the wrong customer. MFA conditions require extra authentication before sensitive access.

### How it works

1. A vendor that serves several customers assigns each a unique external ID. The customer role trusts the vendor principal and requires a matching `sts:ExternalId`.
2. The vendor calls `AssumeRole` with that customer's `ExternalId`. The condition ties the request to the customer context; the value is not an AWS secret.
3. For an IAM user requiring MFA, the role trust policy can require `aws:MultiFactorAuthPresent` to be true. The caller supplies `SerialNumber` and `TokenCode` to `AssumeRole`.
4. For user credentials carrying MFA information, use `GetSessionToken` with MFA. For an MFA age requirement, compare `aws:MultiFactorAuthAge`, the elapsed seconds since MFA authentication.

### Exam cues

- If the question says a vendor can be confused between its customers, think unique customer external ID in role trust, because trusting the vendor account alone does not identify its customer context.
- If the question says an IAM user must use MFA before assumption, think trust-policy MFA condition, because the assumption must satisfy that condition.
- If the question says deny non-MFA access including long-term keys, think Deny with `BoolIfExists` and `aws:MultiFactorAuthPresent: false`, because long-term key requests omit the key.

### Remember

- External IDs are not passwords or secrets.
- `aws:MultiFactorAuthAge` uses seconds and requires temporary credentials created with MFA.
- `aws:MultiFactorAuthPresent` is absent for long-term keys and federated identities. Do not assume an external provider's MFA populates this IAM key.

> **Trap:** A condition that only matches an existing false MFA value does not catch a request where the key is absent.
