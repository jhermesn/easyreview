---
title: RBAC and ABAC
level: associate
order: 100
facts:
  - id: terminate-resource-tag
    text: "An IAM policy can use an instance resource tag to restrict the ec2:TerminateInstances action."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html#iam-example-instances-specific
  - id: rbac-definition
    text: Role-based access control defines permissions by job function and attaches the corresponding policies to
      identities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control_compare-rbac
  - id: abac-definition
    text: Attribute-based access control can authorize supported operations when principal and resource tags match.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control
  - id: abac-keys
    text: Use aws:PrincipalTag/tag-key and the supported resource-tag condition key to compare principal and
      resource attributes.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principaltag
  - id: abac-service-support
    text: ABAC requires the selected service and action to support the relevant tag conditions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html#introduction_attribute-based-access-control
  - id: abac-session-tags
    text: SAML and OIDC providers can pass identity attributes as STS session tags.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_operations
  - id: home-policy-variable
    text: An IAM user home-directory policy can use ${aws:username} in S3 object ARNs and s3:prefix conditions on
      s3:ListBucket.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_home-directory-console.html#reference_policies_examples_s3_home-directory-console
  - id: home-role-limit
    text: The aws:username variable is unavailable for IAM role requests, so that user home-directory example does
      not work unchanged for roles.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_home-directory-console.html#reference_policies_examples_s3_home-directory-console
  - id: permission-set-definition
    text: A permission set is a collection of IAM policies used to assign account access in IAM Identity Center.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#permissionsetsconcept
cards:
  - id: iam-133
    q: "How can an IAM policy allow EC2 termination only for instances with a specified tag?"
    a: "Use a resource tag condition on ec2:TerminateInstances."
    facts: [terminate-resource-tag]
  - id: iam-021
    q: How do RBAC and ABAC differ when designing IAM permissions?
    a: RBAC assigns permissions by job function. ABAC compares attributes such as principal and resource tags for
      supported operations. Provider attributes can become session tags.
    facts:
      - rbac-definition
      - abac-definition
      - abac-service-support
      - abac-session-tags
  - id: iam-057
    q: An IAM team wants project members to access new resources without adding each resource ARN to a job policy.
      What pattern fits?
    a: ABAC with matching principal and resource project tags, where the service and action support those
      conditions.
    facts:
      - abac-definition
      - abac-keys
      - abac-service-support
  - id: iam-058
    q: An S3 home-directory IAM policy uses ${aws:username}. Can a federated IAM role use that policy unchanged?
    a: No. aws:username is unavailable for role requests. Use suitable role or session attributes in a policy
      designed for that principal.
    trap: true
    facts:
      - home-role-limit
      - abac-session-tags
---

Role-based access control (RBAC) assigns permissions by job function. Attribute-based access control (ABAC) uses attributes, represented as key-value tags in AWS. A tag such as `project=payments` can connect an identity's access to the resources it should use.

### How it works

1. With RBAC, attach the policies for each job function to the relevant identities. With ABAC, define a comparison between principal attributes and resource attributes.
2. For supported operations, compare `aws:PrincipalTag/project` with `aws:ResourceTag/project`, or the service's supported resource-tag key. Check support for the selected service and action.
3. A SAML or OIDC provider can pass identity attributes as session tags.

### Exam cues

- If the question says allow termination only for tagged EC2 instances, think a resource tag condition, because EC2 termination supports that restriction.
- If the question says project resources grow frequently, think ABAC tag matching, because matching resources can be covered without listing each new ARN.
- If the question says each IAM user gets an S3 home path, think a policy variable such as `${aws:username}` in the object ARN plus `s3:prefix` on `s3:ListBucket`, because listing and object access use different resource scopes.
- If the question says federated role access fails with that home-path policy, think unavailable `aws:username`, because a role request does not have that IAM user attribute.

### Remember

- A job function in RBAC is not the same thing as an IAM role.
- Provider attributes can become temporary session tags.

> **Trap:** ABAC works only where the service and action support the tag conditions you use.
