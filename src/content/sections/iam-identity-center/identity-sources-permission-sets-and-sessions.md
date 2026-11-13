---
title: Identity sources, permission sets, and sessions
level: professional
order: 10
facts:
  - id: identity-source
    text: An organization's identity source defines where users and groups are managed; one source can be an Identity Center directory, Active Directory, or an external identity provider.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source.html
  - id: default-directory
    text: The Identity Center directory is the default identity source unless another is selected.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source.html
  - id: saml-sign-in
    text: An external identity provider uses SAML for authentication to the AWS access portal, and Identity Center grants access using its policies.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html
  - id: scim-sync
    text: SCIM 2.0 automatically synchronizes user and group information from an external identity provider to Identity Center.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/provision-automatically.html
  - id: saml-not-provisioning
    text: SAML cannot query an identity provider for users and groups; they must be provisioned before assignments.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html#provisioning-when-external-idp
  - id: permission-set
    text: A permission set is a template of IAM policies used to assign users or groups access to AWS accounts.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
  - id: role-provisioning
    text: Assigning a permission set creates Identity Center controlled IAM roles in the accounts and attaches the specified policies; modifying the set updates the corresponding policies and roles.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
  - id: policy-types
    text: Permission sets can contain AWS managed, customer managed, and inline policies, plus an AWS managed or customer managed permissions boundary.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html
  - id: boundary
    text: A permissions boundary sets the maximum permissions an identity-based policy can grant to a role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html
  - id: role-selection
    text: A user can have multiple permission sets and choose the least privileged role needed in the access portal.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#get-started-create-permission-set-to-grant-least-privilege-permissions
  - id: account-session
    text: The permission set session duration defaults to one hour and can be set to a maximum of 12 hours.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#get-started-create-permission-set-to-grant-least-privilege-permissions
  - id: portal-session
    text: The access portal session defaults to eight hours and can be configured up to 90 days.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#get-started-create-permission-set-to-grant-least-privilege-permissions
  - id: independent-session
    text: Existing IAM role sessions continue for their configured duration after the original sign-in session ends.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/authconcept.html#iam-role-sessions
  - id: apps
    text: Identity Center assigns users or groups single sign-on access to configured applications; by default no users are assigned.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-applications.html
  - id: saml-apps
    text: Identity Center provides single sign-on access to SAML 2.0 applications.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/customermanagedapps-saml2-oauth2.html
  - id: abac
    text: Identity Center can pass selected user attributes as session tags that IAM policies reference with aws:PrincipalTag to compare against resource tags.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributesforaccesscontrol.html
  - id: enable-abac
    text: Attributes for access control must be enabled to use attribute-based access control.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac.html
  - id: attribute-mapping
    text: Identity Center maps an attribute key to a value from the identity source and passes it as a session tag; the key must match the key used in the policy.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac-attributes.html
  - id: department-path
    text: The external identity provider attribute path ${path:enterprise.department} is supported for attributes for access control.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#supportedidpattributes
  - id: mfa-modes
    text: Identity Center supports always-on and context-aware MFA prompts; always-on is the default for users with a registered device.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/mfa-getting-started.html
  - id: context-aware
    text: Context-aware MFA prompts when the sign-in context changes after a user trusts a device.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/mfa-getting-started.html
  - id: external-mfa
    text: An external identity provider manages MFA settings instead of Identity Center.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/mfa-getting-started.html
diagrams:
  - id: identity-center-account-access
    title: Sign in and access an account
    width: 800
    height: 190
    nodes:
      - { id: user, label: Workforce user, icon: res-users, x: 30, y: 55, w: 170, h: 86, tone: user }
      - { id: center, label: Identity Center, sub: Access portal, icon: iam-identity-center, x: 315, y: 55, w: 170, h: 86, tone: security }
      - { id: account, label: AWS account, sub: Assigned IAM role, icon: res-organizations-account, x: 600, y: 55, w: 170, h: 86, tone: mgmt }
    edges:
      - { from: user, to: center, step: 1 }
      - { from: center, to: account, step: 2 }
    steps:
      - The user signs in to the access portal.
      - Identity Center obtains a session for the assigned account role.
cards:
  - id: iam-identity-center-001
    q: How do IAM Identity Center permission sets grant access across AWS accounts?
    a: A permission set is a policy template. Assigning it to a user or group creates an IAM role in each assigned account; changes to the set update the roles and policies.
    facts: [permission-set, role-provisioning]
  - id: iam-identity-center-002
    q: What are the default and maximum IAM Identity Center account and access portal session durations?
    a: "Account session: one hour by default, maximum 12 hours. Portal session: eight hours by default, maximum 90 days."
    facts: [account-session, portal-session]
  - id: iam-identity-center-003
    q: A workforce needs console and CLI access across many AWS accounts using existing identities. What IAM Identity Center setup should be used?
    a: Connect the identity source and assign permission sets to users or groups in the accounts. Identity Center creates the account roles.
    facts: [identity-source, permission-set, role-provisioning]
  - id: iam-identity-center-004
    q: An external identity provider signs users in to IAM Identity Center, but groups must synchronize automatically. Which protocols serve each purpose?
    a: Use SAML for sign-in and SCIM to synchronize users and groups. SAML alone cannot query the provider for them.
    facts: [saml-sign-in, scim-sync, saml-not-provisioning]
    trap: true
  - id: iam-identity-center-005
    q: A company wants IAM Identity Center access policies to match employees' departments to resource tags. What should it configure?
    a: Enable attributes for access control, map Department to the populated department attribute, and use aws:PrincipalTag in a permission set policy to compare the session tag with the resource tag.
    facts: [enable-abac, attribute-mapping, abac]
  - id: iam-identity-center-006
    q: A user signs out of the IAM Identity Center portal. Does an existing AWS account role session end immediately?
    a: No. The role session continues for its configured duration independently of the portal session.
    facts: [independent-session]
    trap: true
  - id: iam-identity-center-007
    q: Who configures MFA when IAM Identity Center uses an external identity provider?
    a: The external identity provider manages MFA.
    facts: [external-mfa]
  - id: iam-identity-center-008
    q: A company wants IAM Identity Center users to access a SAML business application with single sign-on. What should an administrator do?
    a: Configure the application and assign its users or groups. No users are assigned by default.
    facts: [apps, saml-apps]
---

IAM Identity Center gives workforce users single sign-on access to assigned AWS accounts and applications. A single sign-on lets users sign in once and reach their assigned resources.

### How it works

1. Choose an identity source where users and groups are managed. The default is the Identity Center directory.
2. With an external provider, Security Assertion Markup Language (SAML) handles sign-in. Provision users and groups before assigning access, either manually or automatically with System for Cross-domain Identity Management (SCIM).
3. Assign a permission set, a template of IAM policies, to a user or group in each required account. Identity Center creates the account roles and updates them when the set changes. A permissions boundary sets the maximum permissions an identity-based policy can grant a role.
4. Users sign in to the access portal and choose an assigned account role or application. For attribute-based access control (ABAC), enable attributes for access control, select user attributes, and write a policy comparing session tags, attributes attached to a session, with resource tags.

| Identity source | Where identities are managed |
| --- | --- |
| Identity Center directory | In Identity Center |
| Active Directory | In an on-premises or AWS managed directory |
| External identity provider | In the external provider |

### Exam cues

- If the question says corporate users need access to many accounts, think permission sets and group assignments, because Identity Center creates roles in the assigned accounts.
- If the question says synchronize users from an external provider, think SCIM, because SAML sign-in does not query the provider for users and groups.
- If the question says department must match a resource tag, think attributes for access control and `aws:PrincipalTag`, because Identity Center passes selected attributes as session tags. Enable the feature and map the Department key to the populated `${path:enterprise.department}` attribute from an external provider.
- If the question says staff need a SAML business application, think application assignment, because no users are assigned by default.
- If the question says multi-factor authentication (MFA) should prompt on changed sign-in context, think context-aware MFA, because a trusted device is checked against the sign-in context. With an external provider, configure MFA at that provider.

### Remember

- One identity source per organization. The Identity Center directory is the default.
- Permission sets can use AWS managed, customer managed, or inline policies and a managed policy as a permissions boundary.
- Account sessions default to one hour and can last up to 12 hours. Portal sessions default to eight hours and can last up to 90 days.
- Always-on MFA is the default for users with a registered MFA device.

> **Trap:** Signing out of the portal does not immediately end an existing account role session. It continues until its configured duration expires.
