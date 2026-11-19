---
title: Policy evaluation
level: associate
order: 20
facts:
  - id: policy-definition
    text: "IAM identity-based policies are JSON documents containing one or more permission statements; AWS evaluates applicable policies when a principal makes a request."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies-introduction
  - id: implicit-deny
    text: Requests start implicitly denied, except for the account root user.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: explicit-deny
    text: An applicable explicit Deny overrides Allow statements.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: same-account-union
    text: For ordinary same-account access, identity and resource policy allows combine; principal-specific limits
      and service-specific rules still apply.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html#policy-eval-basics-id-rdp
  - id: trust-key-exceptions
    text: Role trust policies and KMS key policies must explicitly allow access under their respective
      authorization rules.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic_policy-eval-denyallow.html#reference_policies_evaluation-logic_policy-eval-denyallow
  - id: boundary-intersection
    text: Identity-policy permissions must also be allowed by an attached permissions boundary.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html#policy-eval-basics-id-bound
  - id: org-limits
    text: Applicable SCPs limit account principals and RCPs limit account resources; neither grants access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types
  - id: managed-policy
    text: "A customer managed identity policy is a standalone policy reusable across users, groups and roles; changing its permissions changes the policy applied to every attached identity."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies
  - id: inline-policy
    text: An inline identity policy belongs to one identity and is deleted with that identity.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#inline
  - id: effect-element
    text: Effect selects Allow or Deny for a policy statement.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies-introduction
  - id: resource-element
    text: Resource identifies the resources to which the operations apply, normally using ARNs.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_resource.html#reference_policies_elements_resource
  - id: principal-element
    text: Resource policies identify a Principal; identity policies imply the identity to which they are attached.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies-introduction
  - id: condition-element
    text: Condition tests request context against specified values.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html#reference_policies_elements_condition_operators
  - id: s3-arn-scope
    text: s3:ListBucket uses the bucket ARN; object permissions use an ARN with an object key or object wildcard.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_home-directory-console.html#reference_policies_examples_s3_home-directory-console
  - id: arn-definition
    text: "An Amazon Resource Name (ARN) identifies a resource using the format arn:partition:service:region:account-id:resource; the resource component is service-specific, and some resources leave the Region or account fields empty."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#arns-syntax
  - id: date-window
    text: DateGreaterThan and DateLessThan with aws:CurrentTime can bound access to a time window.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html#Conditions_Date
  - id: region-deny
    text: A Deny using aws:RequestedRegion can restrict endpoint Regions; NotAction exempts listed global-service
      actions from that deny.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_deny-requested-region.html#reference_policies_examples_aws_deny-requested-region
  - id: notaction-no-grant
    text: A Deny statement with NotAction does not grant the excluded actions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_deny-requested-region.html#reference_policies_examples_aws_deny-requested-region
  - id: launch-ami
    text: ec2:RunInstances supports resource permissions on image ARNs and conditions such as ec2:Owner to
      restrict AMI selection.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-ec2-console.html#ex-launch-wizard
  - id: ami-definition
    text: An AMI supplies the software required to set up and boot an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
  - id: statement-elements
    text: An IAM policy statement uses Effect, Action and Resource (or their Not forms); Condition is optional, and Principal is used in resource-based policies.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html
  - id: source-ip-caller
    text: "The aws:SourceIp condition key compares the IP address of the caller making the API request, not the IP of the resource, and works only for public IP ranges."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-sourceip
  - id: trust-policy-only
    text: "The only resource-based policy that IAM itself supports is the role trust policy, which says which principals can assume the role."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_resource-based
  - id: billing-console-gate
    text: "For Billing console pages governed by Activate IAM Access, the root user enables that account setting when needed and the caller must have suitable IAM permissions; accounts created as AWS Organizations members have the setting enabled by default."
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate
  - id: s3-arn-fields
    text: "S3 bucket ARNs leave the Region and owning-account fields empty, as in arn:aws:s3:::example-bucket."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#arns-paths-wildcards
cards:
  - id: iam-001
    q: What wins when IAM finds both an Allow and an applicable explicit Deny for a request?
    a: The explicit Deny wins. Otherwise the applicable policy types must grant access within their limits; an
      absent allow is an implicit deny.
    facts:
      - implicit-deny
      - explicit-deny
      - policy-definition
  - id: iam-002
    q: An IAM user has an identity policy allowing S3 reads in its account, and the bucket policy also allows that
      user. No applicable policy denies or limits the read. What is the result?
    a: Allowed. Same-account identity and resource allows combine, subject to the relevant limits and service
      rules.
    facts:
      - same-account-union
      - explicit-deny
  - id: iam-003
    q: An IAM role has an identity Allow for an action, but its permissions boundary omits that action. Can an
      identity-policy grant authorize it?
    a: No. Identity-policy permissions are limited to the intersection with the boundary and applicable
      organization policies.
    trap: true
    facts:
      - boundary-intersection
      - org-limits
  - id: iam-032
    q: A team wants one IAM policy reused by several roles. Should it create managed or inline policies?
    a: A managed policy. An inline policy belongs to only one identity and is deleted with it.
    facts:
      - managed-policy
      - inline-policy
  - id: iam-033
    q: An IAM policy allows s3:GetObject only on a bucket ARN without an object path. Does that resource match
      objects?
    a: No. Object actions need object ARNs, such as arn:aws:s3:::example-bucket/*; s3:ListBucket uses the bucket
      ARN.
    trap: true
    facts:
      - s3-arn-scope
      - resource-element
  - id: iam-034
    q: An IAM permission should work only within an approved time window. Which conditions express the window?
    a: DateGreaterThan and DateLessThan on aws:CurrentTime.
    facts:
      - date-window
  - id: iam-035
    q: A Region deny policy blocks IAM administration through its global endpoint. What should the author review?
    a: Use NotAction exceptions for the required global-service actions in the aws:RequestedRegion deny. Separate
      policies must still allow those actions.
    facts:
      - region-deny
      - notaction-no-grant
  - id: iam-036
    q: A team permits EC2 launches but wants to restrict the machine images developers use. What IAM mechanism
      applies?
    a: Scope ec2:RunInstances permissions to approved image ARNs, or use supported conditions such as ec2:Owner.
      An AMI is the image used to launch an instance.
    facts:
      - launch-ami
  - id: iam-094
    q: "Which element of an IAM identity-based policy statement is optional: Effect, Action, Resource or Condition?"
    a: Condition. Effect, Action and Resource define the statement; Principal appears in resource-based policies.
    facts: [statement-elements]
  - id: iam-101
    q: "A policy allows ec2:RunInstances with the condition aws:SourceIp 34.50.31.0/24. What does that limit?"
    a: "Where the API call comes from. The caller must send the request from an address in that range; it says nothing about the IP addresses of the launched instances."
    trap: true
    facts: [source-ip-caller]
  - id: iam-102
    q: "Which resource-based policy does the IAM service support?"
    a: "Only the role trust policy, which names the principals that may assume the role."
    facts: [trust-policy-only]
  - id: iam-113
    q: "When an IAM policy scopes access to an AWS resource, which components does its ARN identify?"
    a: "The partition, service, Region, owning account and resource. The format is `arn:partition:service:region:account-id:resource`; some resource types leave Region or account fields empty."
    facts: [arn-definition]
  - id: iam-117
    q: "An IAM role has billing permissions but cannot open Billing console pages governed by Activate IAM Access. What account setting should the administrator check?"
    a: "Activate IAM Access. The root user enables the setting when needed; the role also needs appropriate IAM permissions. Organizations-created member accounts enable the setting by default."
    facts: [billing-console-gate]
  - id: iam-118
    q: "A team edits a customer managed IAM policy shared by several roles. Which roles receive the revised policy permissions?"
    a: "Every role to which that customer managed policy is attached. They share the same standalone policy."
    facts: [managed-policy]
  - id: iam-120
    q: "What document structure defines the permissions in an IAM identity-based policy?"
    a: "A JSON document with one or more permission statements. AWS evaluates applicable policies for each request."
    facts: [policy-definition]
  - id: iam-124
    q: "An IAM author writes an Amazon S3 bucket ARN. Should its Region and account ID appear between the service and bucket name?"
    a: "No. Those fields are empty: `arn:aws:s3:::bucket-name`."
    facts: [s3-arn-fields]
---

IAM policy evaluation decides whether a request has permission to perform an action on a resource. A principal is the identity making the request. Start with the request's action, resource and context, then find every policy that applies.

### How it works

1. Read each matching statement in the JSON policy document. `Effect` chooses `Allow` or `Deny`; `Action` names operations with a service prefix, such as `s3:GetObject`; `Resource` identifies their targets. Resource policies also name a `Principal`; identity policies imply their attached identity.
2. Evaluate `Condition`, which compares request details with policy values. For example, `DateGreaterThan` and `DateLessThan` on `aws:CurrentTime` bound a permission window.
3. Reject the request if any applicable policy explicitly denies it. Otherwise find an allow, subject to permissions boundaries, session limits and organization policies. Missing permission is an implicit deny.
4. For ordinary same-account access, an identity or resource policy can grant permission. Check which principal the resource policy names. Role trust and KMS key policies have their own explicit-allow requirements.

| Policy | Purpose |
|---|---|
| Identity policy | Grants actions to a user, group member or role |
| Resource policy | Grants access to named principals |
| Permissions boundary | Limits identity-policy permissions |
| Session policy | Limits permissions for one temporary session |
| Service control policy (SCP) | Limits principals in affected accounts |
| Resource control policy (RCP) | Limits resources in affected accounts |

An Amazon Resource Name (ARN) identifies a resource with `arn:partition:service:region:account-id:resource`. Some resources leave Region or account fields empty.

For resource matching, use the service's ARN format:

| Resource | ARN pattern in the standard AWS partition |
|---|---|
| S3 bucket | `arn:aws:s3:::bucket-name` |

Billing console access also has an account setting. For pages governed by **Activate IAM Access**, the root user enables IAM access when needed, and the caller still needs an appropriate IAM policy. Organizations-created member accounts enable the setting by default. [Billing access](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate)

### Exam cues

- If the question says several identities need the same policy, think customer managed policy, because it is reusable and an edit applies to every attached identity. Inline policies belong to one identity and are deleted with it.
- If the question says `s3:GetObject` is allowed but objects remain inaccessible, think resource ARN matching, because a bucket ARN differs from an object ARN. `s3:ListBucket` targets the bucket; object actions target object paths.
- If the question says a Region restriction breaks a global service, think `NotAction` exceptions in the `aws:RequestedRegion` deny, because global endpoints can be outside the approved Regions.
- If the question says developers may launch only approved machine images (AMIs), think image ARN restrictions on `ec2:RunInstances`, because that action supports image resource permissions and conditions such as `ec2:Owner`.

### Remember

- An explicit deny wins. Root's initial access is the exception to implicit deny, not a reason to ignore applicable controls.
- Boundaries, session policies, SCPs and RCPs grant no permissions themselves.
- Excluding an action from a `NotAction` deny does not allow it.
- S3 bucket ARNs leave the Region and account fields empty.
- Activating IAM billing access does not grant billing permissions by itself.

> **Trap:** A boundary Allow cannot substitute for a policy that grants access.
