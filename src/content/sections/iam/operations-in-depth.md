---
title: IAM operational safeguards
level: professional
order: 130
facts:
  - id: custom-policy-checks
    text: Custom policy checks can compare with a reference policy for new access, check specified actions or
      resources, or check for public access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-checks-validating-policies.html#access-analyzer-custom-policy-checks-overview
  - id: policy-validation
    text: Policy validation checks grammar and AWS best practices and returns errors, security warnings, warnings
      and suggestions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html#access-analyzer-policy-validation
  - id: unused-region
    text: Unused access findings do not depend on Region, so an analyzer is not needed in every Region.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
  - id: external-region
    text: External access analysis covers resources in the analyzer Region; create analyzers in each Region with
      supported resources.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
  - id: generation-passrole-gap
    text: Generated policies omit iam:PassRole because it is not a CloudTrail API action.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-know
  - id: generation-data-gap
    text: Policy generation does not identify action-level activity for data events such as S3 object data events.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-know
  - id: policy-generation
    text: Policy generation creates a policy template from a user or role CloudTrail activity, which the author
      reviews and customizes.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-howitworks
  - id: mfa-session-token
    text: GetSessionToken with MFA returns user temporary credentials with MFA authentication information.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken
  - id: mfa-age
    text: aws:MultiFactorAuthAge measures seconds since MFA authentication and is available only for temporary
      credentials created with MFA.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthage
  - id: credential-vpc
    text: Compare aws:SourceVpc with aws:Ec2InstanceSourceVpc to require EC2 role credentials to be used through
      an endpoint in their original VPC.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: credential-ip
    text: Compare aws:VpcSourceIp with aws:Ec2InstanceSourcePrivateIPv4 along with the VPC comparison; private
      addresses alone are not globally unique.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourceprivateip4
  - id: credential-scope
    text: The EC2 credential restriction example checks ec2:SourceInstanceARN for presence and exempts forwarded
      service calls using aws:ViaAWSService.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: notprincipal-deny
    text: A resource Deny with NotPrincipal denies IAM principals with boundaries regardless of the NotPrincipal
      exceptions; AWS recommends ArnNotEquals on aws:PrincipalArn.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries
  - id: source-account
    text: aws:SourceAccount is included only when an AWS service principal directly calls a resource on behalf of a resource that triggered the service request; not all service integrations use the key.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceaccount
  - id: department-mapping
    text: An Identity Center attribute named Department can map to the supported external-identity source value
      ${path:enterprise.department}.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#attributemappingsconcept
  - id: identity-center-abac
    text: IAM Identity Center passes selected access-control attributes to accounts as session tags referenced
      through aws:PrincipalTag.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html#attributesforaccesscontrol
  - id: identity-center-config
    text: Select attributes for access control, map source values to keys, and add ABAC rules to permission set
      policies or resource policies.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac-attributes.html#configure-abac-attributes
  - id: abac-keys
    text: Use aws:PrincipalTag/tag-key and the supported resource-tag condition key to compare principal and
      resource attributes.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principaltag
  - id: tag-session-permission
    text: Roles receiving session tags from an identity provider need sts:TagSession permission in their trust
      policy.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_know
  - id: tag-controls
    text: sts:TagSession permissions can restrict allowed session tag keys and values.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_permissions-required
  - id: federation-duration
    text: GetFederationToken for IAM users defaults to twelve hours and supports fifteen minutes to thirty-six
      hours; root-based sessions are capped at one hour.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html#API_GetFederationToken
  - id: sessiontoken-duration
    text: GetSessionToken for IAM users defaults to twelve hours and supports fifteen minutes to thirty-six hours;
      root sessions default to and are capped at one hour.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken
cards:
  - id: iam-061
    q: A CI pipeline must reject an IAM policy that adds access beyond an approved baseline. Which Access Analyzer
      capability fits?
    a: A custom policy check against a reference policy. Grammar validation alone does not compare permission
      scope with your baseline.
    facts:
      - custom-policy-checks
      - policy-validation
  - id: iam-063
    q: Should an IAM unused access analyzer be created in every AWS Region like an external access analyzer?
    a: No. Unused access findings do not vary by Region; external analysis is Regional.
    trap: true
    facts:
      - unused-region
      - external-region
  - id: iam-064
    q: An IAM policy generated from CloudTrail omits iam:PassRole and S3 data-event actions. Does that prove the
      application does not need them?
    a: No. Policy generation does not include PassRole or identify action-level data-event activity. Review and
      customize the template.
    trap: true
    facts:
      - generation-passrole-gap
      - generation-data-gap
      - policy-generation
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
  - id: iam-029
    q: A security team wants stolen EC2 role credentials rejected outside their original VPC and private address.
      Which IAM context keys should it compare?
    a: Compare aws:SourceVpc with aws:Ec2InstanceSourceVpc and aws:VpcSourceIp with
      aws:Ec2InstanceSourcePrivateIPv4. Scope the restriction to EC2 credentials and account for forwarded
      service calls.
    facts:
      - credential-vpc
      - credential-ip
      - credential-scope
  - id: iam-038
    q: A resource Deny with NotPrincipal lists an exception for an IAM role, but attaching a boundary makes the
      role lose access. What should the policy author inspect?
    a: The NotPrincipal Deny. For principals with boundaries it denies regardless of those exceptions. AWS
      recommends ArnNotEquals with aws:PrincipalArn.
    trap: true
    facts:
      - notprincipal-deny
  - id: iam-065
    q: An IAM policy expects aws:SourceAccount on a direct request made by an IAM user. Will that key be present?
    a: No. The key is available only for qualifying direct AWS service principal calls on behalf of a triggering resource, and not every service integration uses it.
    facts:
      - source-account
    trap: true
  - id: iam-059
    q: An Identity Center team wants access based on a populated external Department attribute. What should it
      configure?
    a: Map an access-control key such as Department to ${path:enterprise.department}, then use its session tag
      through aws:PrincipalTag/Department in ABAC policies that compare resource attributes.
    facts:
      - department-mapping
      - identity-center-abac
      - identity-center-config
      - abac-keys
  - id: iam-060
    q: A SAML provider starts sending IAM session tags and role assumption fails. Which trust permission may be
      missing?
    a: sts:TagSession. Roles receiving provider session tags need it in their trust policy. Restrict tag keys and
      values to the intended attributes.
    facts:
      - tag-session-permission
      - tag-controls
  - id: iam-055
    q: An IAM-user broker calls GetFederationToken without requesting a duration. What are its default and maximum
      durations?
    a: Twelve hours by default and thirty-six hours maximum for IAM user credentials. Root-based sessions are
      limited to one hour.
    facts:
      - federation-duration
  - id: iam-056
    q: Does the IAM user GetSessionToken operation have the same one-hour default as AssumeRole?
    a: No. GetSessionToken for IAM users defaults to twelve hours and supports fifteen minutes to thirty-six
      hours. Root-based sessions default to and cannot exceed one hour.
    trap: true
    facts:
      - sessiontoken-duration
---

IAM operational safeguards help teams review policies and control how temporary credentials are used. The right check depends on the policy, the request context and the source of the session.

### How it works

1. Use [policy validation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html#access-analyzer-policy-validation) for grammar and AWS best practices. To detect added access, use a [custom policy check](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-checks-validating-policies.html#access-analyzer-custom-policy-checks-overview) against a reference policy. Custom checks can also examine specified actions or resources, or public access.
2. Create external access analyzers in each Region with supported resources. [Unused access findings](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification) do not depend on Region. Review and customize a [policy template generated from CloudTrail activity](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-howitworks).
3. Use [`GetSessionToken` with MFA](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken) for IAM user temporary credentials carrying MFA information. [`aws:MultiFactorAuthAge`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-multifactorauthage) measures seconds since authentication and is available only for temporary credentials created with MFA.
4. To restrict EC2 role credentials to their original network, compare [`aws:SourceVpc` with `aws:Ec2InstanceSourceVpc`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc), and [`aws:VpcSourceIp` with `aws:Ec2InstanceSourcePrivateIPv4`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourceprivateip4). AWS's example checks for `ec2:SourceInstanceARN` and exempts forwarded service calls with `aws:ViaAWSService`.
5. For IAM Identity Center attribute-based access control (ABAC), [select and map access-control attributes](https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac-attributes.html#configure-abac-attributes). For example, map `Department` to [`${path:enterprise.department}`](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#attributemappingsconcept). Identity Center passes selected attributes as [session tags](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html#attributesforaccesscontrol); policies can compare [`aws:PrincipalTag/Department`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principaltag) with a supported resource tag.
6. A role receiving provider session tags needs [`sts:TagSession` in its trust policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_know). Restrict the permitted [tag keys and values](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_permissions-required).

### Exam cues

- If the question says a pipeline must reject access beyond a baseline, think custom policy check against a reference policy, because grammar validation does not compare access.
- If the question says generated permissions omit `iam:PassRole` or S3 data-event actions, think [generation limits](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html#access-analyzer-policy-generation-know), because `iam:PassRole` is not a CloudTrail API action and data-event activity is not identified at action level.
- If the question says EC2 credentials must stay at their original private address, think both VPC and IP comparisons, because private addresses alone are not globally unique.
- If the question says an IAM user request lacks [`aws:SourceAccount`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceaccount), think request context, because the key applies to qualifying direct service principal calls and not every service integration uses it.
- If the question says a resource Deny with `NotPrincipal` blocks a role with a boundary, think [`ArnNotEquals` with `aws:PrincipalArn`](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html#access_policies_boundaries), because the Deny applies to principals with boundaries regardless of its exceptions.

### Remember

- IAM user sessions from [`GetFederationToken`](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html#API_GetFederationToken) and [`GetSessionToken`](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken) default to twelve hours and support fifteen minutes to thirty-six hours.
- Root sessions from either operation are capped at one hour. `GetSessionToken` also defaults to one hour for root.

> **Trap:** A generated policy omitting an action does not prove the application does not need it. Review the template and its generation limits.
