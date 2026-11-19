---
title: Secure access across many AWS accounts
level: associate
order: 52
facts:
  - id: identity-source
    text: An organization's identity source defines where users and groups are managed; one source can be an Identity Center directory, Active Directory, or an external identity provider.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source.html
  - id: saml-sign-in
    text: An external identity provider uses SAML for authentication to the AWS access portal, and Identity Center grants access using its policies.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html
  - id: scim-sync
    text: SCIM 2.0 automatically synchronizes user and group information from an external identity provider to Identity Center.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/provision-automatically.html
  - id: permission-set
    text: A permission set is a template of IAM policies used to assign users or groups access to AWS accounts.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
  - id: role-provisioning
    text: Assigning a permission set creates Identity Center controlled IAM roles in the accounts and attaches the specified policies; modifying the set updates the corresponding policies and roles.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
  - id: role-selection
    text: A user can have multiple permission sets and choose the least privileged role needed in the access portal.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#get-started-create-permission-set-to-grant-least-privilege-permissions
  - id: ds-proxy
    text: AD Connector redirects directory requests to an existing Active Directory without caching directory information in the cloud.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html
  - id: controls
    text: AWS Control Tower applies controls (guardrails), which are preventive, detective or proactive rules, to the accounts in its landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
  - id: preventive
    text: Preventive controls block actions that violate policy and use Organizations SCPs, RCPs, or declarative policies.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: detective
    text: Detective controls use Config rules to identify resource noncompliance and report it in the dashboard.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: scp-ceiling
    text: An SCP limits the available permissions of principals in member accounts and never grants access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: scp-management
    text: SCPs do not restrict the management account, but delegated administrator member accounts remain subject to them.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: org-trail
    text: Organization trails cover the management and member accounts and members cannot change the trail.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html#creating-trail-organization
  - id: trail-bucket-policy
    text: CloudTrail log delivery requires an S3 bucket policy granting the service access; aws:SourceArn can restrict the grant to specific trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-s3-bucket-policy-for-cloudtrail.html#create-s3-bucket-policy-for-cloudtrail
  - id: role-caller
    text: A cross-account AssumeRole caller needs sts:AssumeRole permission on the target role ARN.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: role-trust
    text: The target role trust policy must trust the caller or its account for cross-account AssumeRole.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: both-sides
    text: AWS evaluates each side of a cross-account request separately with its applicable policy limits; both evaluations must allow access.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html#policy-eval-cross-account
  - id: external-id
    text: An external ID helps prevent a vendor serving multiple customers from being tricked into using its authority for the wrong customer, the confused deputy problem.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_third-party_external-id
  - id: external-condition
    text: The customer trust policy requires the vendor principal and checks sts:ExternalId.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html#id_roles_common-scenarios_third-party
  - id: key-policy
    text: A key policy is the resource permission document controlling who can manage or use its KMS key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html
  - id: kms-cross-account
    text: Cross-account sharing of SSE-KMS objects requires a customer managed key rather than the AWS managed S3 key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#sse-kms-cross-account-operations
diagrams:
  - id: secure-multi-account-access
    title: Workforce, application and vendor access governed across an organization
    facts: [identity-source, saml-sign-in, scim-sync, permission-set, role-provisioning, role-selection, ds-proxy, controls, preventive, detective, scp-ceiling, scp-management, org-trail, trail-bucket-policy, role-caller, role-trust, both-sides, external-id, external-condition, key-policy, kms-cross-account]
    width: 1240
    height: 960
    groups:
      - { label: Corporate network, x: 20, y: 120, w: 220, h: 400, tone: neutral, icon: group-corporate-data-center }
      - { label: AWS Organizations, x: 280, y: 20, w: 940, h: 920, tone: neutral, icon: group-aws-cloud }
      - { label: Management account, x: 300, y: 60, w: 880, h: 170, tone: neutral, icon: group-aws-account }
      - { label: Log Archive account, x: 900, y: 270, w: 280, h: 170, tone: neutral, icon: group-aws-account }
      - { label: Workload OU, x: 300, y: 480, w: 880, h: 440, tone: neutral }
      - { label: Production account, x: 320, y: 520, w: 400, h: 380, tone: neutral, icon: group-aws-account }
      - { label: Data account, x: 760, y: 520, w: 400, h: 380, tone: neutral, icon: group-aws-account }
    nodes:
      - { id: users, label: Employees, sub: workforce, x: 40, y: 170, w: 180, h: 86, tone: user, icon: res-users }
      - { id: idp, label: Identity provider, sub: SAML and SCIM, x: 40, y: 390, w: 180, h: 86, tone: security, icon: directory-service, info: "The corporate directory stays the source of users and groups. With Active Directory, AD Connector forwards requests without caching the directory in AWS." }
      - { id: ic, label: Identity Center, sub: permission sets, x: 330, y: 100, w: 170, h: 86, tone: security, icon: iam-identity-center }
      - { id: org, label: Organizations, sub: SCPs on OUs, x: 540, y: 100, w: 170, h: 86, tone: mgmt, icon: organizations, info: "SCPs cap what principals in member accounts can do. They never grant access, and they do not restrict the management account." }
      - { id: ct, label: Control Tower, sub: landing zone, x: 750, y: 100, w: 170, h: 86, tone: mgmt, icon: control-tower, info: "Preventive controls are enforced with SCPs; detective controls use Config rules and report noncompliance." }
      - { id: trail, label: CloudTrail, sub: organization trail, x: 960, y: 100, w: 180, h: 86, tone: mgmt, icon: cloudtrail }
      - { id: logs, label: Log bucket, sub: bucket policy, x: 960, y: 310, w: 180, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: admin, label: Admin role, sub: from permission set, x: 350, y: 570, w: 170, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: app, label: App role, sub: on EC2, x: 560, y: 570, w: 150, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: audit, label: Audit role, sub: external ID, x: 350, y: 780, w: 170, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: data, label: Data role, sub: trust policy, x: 790, y: 570, w: 160, h: 86, tone: security, icon: res-identity-access-management-role, info: "Its trust policy names the production app role. The caller also needs sts:AssumeRole on this role's ARN." }
      - { id: bucket, label: Data bucket, sub: SSE-KMS, x: 990, y: 570, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: key, label: KMS key, sub: key policy, x: 990, y: 780, w: 160, h: 86, tone: security, icon: key-management-service, info: "A customer managed key, because objects encrypted with the AWS managed S3 key cannot be shared across accounts." }
      - { id: vendor, label: Vendor account, sub: third party, x: 40, y: 780, w: 180, h: 86, tone: user, icon: res-organizations-account }
    edges:
      - { from: ct, to: org, step: 1 }
      - { from: org, to: admin, step: 1 }
      - { from: trail, to: logs, step: 2 }
      - { from: users, to: idp, step: 3 }
      - { from: idp, to: ic, step: 4 }
      - { from: ic, to: admin, step: 5 }
      - { from: app, to: data, step: 6 }
      - { from: data, to: bucket, step: 7 }
      - { from: data, to: key, step: 7 }
      - { from: vendor, to: audit, step: 8 }
      - { from: admin, to: trail, step: 9, dashed: true }
    steps:
      - "Control Tower sets up the landing zone with Organizations: OUs, shared accounts, and preventive controls enforced as SCPs on the workload OU."
      - "An organization trail records every account into a bucket in the Log Archive account, whose bucket policy grants CloudTrail access."
      - "Employees sign in with the corporate identity provider."
      - "Identity Center uses that provider as its identity source: SAML for sign-in and SCIM to sync users and groups."
      - "Assigning a permission set creates roles in each account. Users choose the least privileged role they need in the access portal."
      - "The production app role assumes a role in the data account. Its own policy allows sts:AssumeRole, and the target role's trust policy trusts it."
      - "The data role reads the bucket. Objects use SSE-KMS with a customer managed key whose key policy allows the role."
      - "A third-party vendor assumes the audit role only by sending the external ID that the role's trust policy requires."
      - "If an administrator in a member account tries to change the organization trail, the request fails: member accounts cannot change it, and SCPs cap even administrator roles."
cards:
  - id: reference-architectures-090
    q: A company with 40 AWS accounts wants employees to sign in once with the corporate identity provider and get role-based access to each account. Which design fits?
    a: "**IAM Identity Center** with the corporate provider as its **identity source** (SAML sign-in, SCIM sync) and **permission sets** assigned to groups per account."
    facts: [identity-source, saml-sign-in, scim-sync, permission-set]
  - id: reference-architectures-091
    q: An SCP attached to an OU allows all S3 actions. A user in a member account has no IAM policy. Can the user read S3?
    a: "No. An SCP only **limits** the permissions available in member accounts and **never grants** access. The user still needs an IAM policy that allows it."
    trap: true
    facts: [scp-ceiling]
  - id: reference-architectures-092
    q: A deny-all-except-approved-Regions SCP is attached to the organization root. Does it stop an administrator in the management account from using another Region?
    a: "No. **SCPs do not restrict the management account**. Keep workloads out of it, and use member accounts that the SCP does cover."
    trap: true
    facts: [scp-management]
  - id: reference-architectures-093
    q: An application in account A must read data in account B through a role. What must be in place on each side?
    a: "In account A, a policy allowing **sts:AssumeRole** on the role's ARN. In account B, a role whose **trust policy** trusts account A or its role. Both sides must allow it."
    facts: [role-caller, role-trust, both-sides]
  - id: reference-architectures-094
    q: A monitoring vendor serving many customers needs a role in a company's account. How does the company stop another customer from tricking the vendor into using that role?
    a: "Require an **external ID** in the role's trust policy (sts:ExternalId condition). This protects against the **confused deputy** problem."
    facts: [external-id, external-condition]
  - id: reference-architectures-095
    q: Objects in a bucket are encrypted with the AWS managed S3 KMS key, and another account must read them. What has to change?
    a: "Encrypt with a **customer managed KMS key** whose **key policy** allows the other account. The AWS managed key cannot be used for cross-account sharing."
    trap: true
    facts: [kms-cross-account, key-policy]
  - id: reference-architectures-096
    q: In a Control Tower landing zone, which controls block noncompliant actions, and which only report them?
    a: "**Preventive** controls block actions, using SCPs and similar policies. **Detective** controls use Config rules to find and report noncompliant resources."
    facts: [controls, preventive, detective]
  - id: reference-architectures-097
    q: Security wants API activity from every account in one place, and member accounts must not be able to turn logging off. What fits?
    a: "An **organization trail** delivering to a central bucket in a log account, with a bucket policy that grants CloudTrail access. Member accounts cannot change it."
    facts: [org-trail, trail-bucket-policy]
  - id: reference-architectures-098
    q: Users must sign in to AWS with their existing on-premises Active Directory accounts, and no directory data may be cached in the cloud. What fits?
    a: "**AD Connector**, which redirects directory requests to the existing Active Directory without caching it in AWS."
    facts: [ds-proxy, identity-source]
---
Multi-account security questions combine four access paths: people from a corporate directory, applications that cross account boundaries, outside vendors, and guardrails that no account can switch off. The design puts identity and policy in the management account, logs in a separate account, and workloads in member accounts under an OU.

### How it works

1. Control Tower builds the landing zone with Organizations. Preventive controls become SCPs on the workload OU, and detective controls report drift.
2. An organization trail sends every account's API activity to a bucket in the Log Archive account.
3. Identity Center federates with the corporate identity provider and turns permission sets into roles in each account.
4. Applications cross accounts by assuming a role: the caller is allowed to call sts:AssumeRole, and the target trust policy names the caller.
5. Resource policies, such as bucket and key policies, decide who else may use a resource. SSE-KMS sharing needs a customer managed key.
6. Vendors assume a role that requires their external ID.

| Need | Choice |
|---|---|
| Workforce sign-in to many accounts | Identity Center with permission sets |
| Keep the existing Active Directory as the source | AD Connector or an external identity provider as identity source |
| Cap what any account can do | SCPs on OUs |
| Account baseline and guardrails | Control Tower landing zone |
| App in one account uses data in another | Cross-account role, or a resource policy |
| Third party access | Role with an external ID condition |
| Central, tamper-resistant audit log | Organization trail to a log account |

### Exam cues

- If the question says single sign-on across many accounts, think IAM Identity Center, because permission sets become roles in each account.
- If the question says limit what even account administrators can do, think SCPs, because they cap permissions in member accounts.
- If the question says a vendor or partner needs access, think a cross-account role with an external ID.
- If the question says share encrypted objects with another account, think a customer managed KMS key with a key policy that allows that account.
- If the question says users keep their on-premises Active Directory credentials, think AD Connector or Identity Center with that directory as identity source.

### Remember

- SCPs never grant access and do not restrict the management account.
- Cross-account access needs an allow on both sides.
- An external ID is not a secret; it prevents the confused deputy problem.
- Preventive controls block; detective controls report.

> **Trap:** Attaching an allow SCP does not give anyone access. Access still needs an identity or resource policy that allows it, inside the ceiling the SCPs leave.
