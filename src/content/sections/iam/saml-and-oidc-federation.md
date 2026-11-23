---
title: SAML and OIDC federation
level: associate
order: 70
facts:
  - id: adfs-saml
    text: "Microsoft Active Directory Federation Services can act as a SAML 2.0 identity provider for AWS federation."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html#CreatingSAML-configuring-IdP
  - id: federation-purpose
    text: Federation lets externally authenticated identities access AWS through roles without creating an IAM
      user for each identity.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html#id_roles_providers_saml
  - id: saml-flow
    text: A SAML identity provider authenticates a user and issues an assertion; AssumeRoleWithSAML exchanges it
      for temporary role credentials.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html#CreatingSAML-configuring
  - id: saml-no-aws-keys
    text: AssumeRoleWithSAML does not require AWS credentials to authenticate the call.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithSAML.html#API_AssumeRoleWithSAML
  - id: oidc-flow
    text: OIDC federation exchanges an identity-provider token for temporary role credentials using
      AssumeRoleWithWebIdentity.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html#id_roles_providers_oidc
  - id: oidc-no-aws-keys
    text: AssumeRoleWithWebIdentity does not require the caller to possess AWS security credentials.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html#API_AssumeRoleWithWebIdentity
  - id: oidc-trust
    text: A GitHub OIDC role trust policy names the IAM provider and restricts aud to sts.amazonaws.com and sub to
      approved repositories or branches.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html#idp_oidc_Create_GitHub
  - id: oidc-sub-required
    text: IAM rejects creation or update of a GitHub trust policy if token.actions.githubusercontent.com:sub is
      absent, null, or solely a wildcard.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html#idp_oidc_Create_GitHub
  - id: federation-broker
    text: GetFederationToken supports a custom broker using an IAM user long-term credentials.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetFederationToken.html#API_GetFederationToken
  - id: sessiontoken-user
    text: GetSessionToken returns credentials based on the calling user permissions and can include MFA
      authentication information.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html#API_GetSessionToken
  - id: cognito-credentials
    text: Cognito identity pools issue temporary AWS credentials for authenticated or guest application users with
      access defined by IAM roles.
    source: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html#cognito-identity
  - id: saml-provider-config
    text: For direct IAM SAML federation, upload provider metadata into IAM and create a role that trusts that
      provider with suitable permissions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html#CreatingSAML-configuring
  - id: oidc-claims
    text: In OIDC trust, aud identifies the intended audience and sub identifies the subject represented by the
      token.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html#idp_oidc_Prerequisites
  - id: workforce-access
    text: AWS recommends IAM Identity Center for centrally managing human access to multiple accounts.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: identity-broker
    text: "If an identity store is not compatible with SAML 2.0, a custom identity broker application can authenticate users, request temporary credentials from AWS STS and hand them to the users."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_federated-users.html#id_roles_common-scenarios_federated-users-idbroker
  - id: saml-duration
    text: "AssumeRoleWithSAML defaults to a one-hour session; a requested duration starts at 15 minutes and is bounded by the role maximum and the assertion session limit."
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithSAML.html#API_AssumeRoleWithSAML_RequestParameters
  - id: saml-console-entry
    text: "For SAML console federation, the browser posts the identity provider assertion to the AWS sign-in endpoint, which obtains temporary role credentials and redirects the browser through a console sign-in URL."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html#enable-console-saml-overview
cards:
  - id: iam-134
    q: "How can Microsoft Active Directory Federation Services provide federated AWS access?"
    a: "Use AD FS as a SAML 2.0 identity provider."
    facts: [adfs-saml]
  - id: iam-015
    q: Which STS operation fits a SAML assertion, an OIDC token, a custom IAM-user broker, or an IAM user needing
      MFA credentials?
    a: "SAML: AssumeRoleWithSAML. OIDC: AssumeRoleWithWebIdentity. Custom IAM-user broker: GetFederationToken.
      User MFA credentials: GetSessionToken. The SAML and OIDC calls authenticate with provider evidence
      without AWS access keys."
    facts:
      - saml-flow
      - saml-no-aws-keys
      - oidc-flow
      - oidc-no-aws-keys
      - federation-broker
      - sessiontoken-user
  - id: iam-016
    q: A GitHub Actions job needs AWS access without stored access keys and only from an approved repository
      branch. What should the team configure?
    a: An IAM OIDC provider and role trust restricted by audience and subject, then AssumeRoleWithWebIdentity. For
      GitHub, use aud sts.amazonaws.com and sub for the approved repository and branch.
    trap: true
    facts:
      - oidc-flow
      - oidc-no-aws-keys
      - oidc-trust
  - id: iam-024
    q: An external build system has an OIDC identity token and needs temporary AWS permissions for a particular
      repository. What access pattern fits?
    a: Federate to an IAM role with provider, audience and subject restrictions, and exchange the token through
      AssumeRoleWithWebIdentity.
    facts:
      - oidc-flow
      - oidc-trust
      - oidc-claims
  - id: iam-054
    q: An application needs limited AWS access for both signed-in users and guests. Which federation component
      supplies the credentials?
    a: A Cognito identity pool. It issues temporary AWS credentials governed by IAM roles for authenticated and
      guest identities.
    facts:
      - cognito-credentials
  - id: iam-108
    q: "An on-premises LDAP directory does not support SAML, and users must still get access to AWS without IAM users. What pattern fits?"
    a: "A custom identity broker that authenticates users against LDAP and requests short-lived credentials from AWS STS for them."
    facts: [identity-broker]
  - id: iam-122
    q: "Employees authenticate through a SAML identity provider and need the AWS Management Console. Which endpoint receives the assertion and opens their role session?"
    a: "The AWS sign-in endpoint. It requests temporary role credentials for the user and redirects the browser to the console using a sign-in URL."
    facts: [saml-console-entry]
diagrams:
  - id: iam-federation-exchange
    title: Provider evidence becomes AWS role credentials
    width: 820
    height: 230
    nodes:
      - id: provider
        label: Identity provider
        icon: res-users
        x: 20
        y: 90
        w: 180
        h: 72
        tone: user
        info: The provider authenticates the identity and issues a SAML assertion or OIDC token.
      - id: sts
        label: AWS STS
        icon: res-identity-access-management-aws-sts
        x: 320
        y: 90
        w: 180
        h: 72
        tone: security
        info: AssumeRoleWithSAML or AssumeRoleWithWebIdentity checks the role trust.
      - id: resource
        label: S3 bucket
        icon: res-simple-storage-service-bucket
        x: 630
        y: 90
        w: 170
        h: 72
        tone: storage
        info: Requests use temporary role credentials and are subject to role permissions.
    edges:
      - from: provider
        to: sts
        step: 1
        label: evidence
      - from: sts
        to: resource
        step: 2
        label: role credentials
    steps:
      - Exchange provider evidence through the matching STS operation.
      - The application uses the returned role credentials to access permitted AWS resources.
  - id: iam-saml-console-entry
    title: SAML sign-in to the console
    width: 820
    height: 180
    nodes:
      - { id: browser, label: Browser, sub: IdP assertion, icon: res-client, x: 20, y: 45, w: 180, h: 86, tone: user }
      - { id: signin, label: AWS sign-in, sub: Requests STS credentials, icon: res-identity-access-management-aws-sts, x: 310, y: 45, w: 200, h: 86, tone: security }
      - { id: console, label: AWS console, x: 620, y: 52, w: 180, h: 72, tone: neutral }
    edges:
      - { from: browser, to: signin, step: 1 }
      - { from: signin, to: console, step: 2 }
    steps:
      - The browser posts the identity provider's SAML assertion to AWS sign-in.
      - AWS sign-in obtains temporary role credentials and redirects the browser to the console.
---

Federation lets an identity provider, the system that authenticates a person or workload, supply evidence that AWS exchanges for temporary credentials. SAML uses an assertion, a signed statement about authentication. OpenID Connect (OIDC) uses a token describing the authenticated subject.

### How it works

1. Configure the provider and a role trust policy. For direct IAM SAML federation, upload the provider metadata into IAM and create the trusted role with its permissions.
2. Authenticate with the provider. Exchange the SAML assertion through `AssumeRoleWithSAML`, or an OIDC token through `AssumeRoleWithWebIdentity`. These calls do not require AWS access keys for authentication.
3. For SAML console access, post the assertion to the AWS sign-in endpoint. It requests temporary credentials on the user's behalf and redirects the browser to the console.
4. Restrict OIDC trust to the provider and appropriate claims, the fields in the token. `aud` is its intended audience; `sub` is its subject. For GitHub Actions, restrict `aud` to `sts.amazonaws.com` and `sub` to approved repositories or branches.
5. Use the returned temporary role credentials for AWS requests. For application users, including guests, a Cognito identity pool can provide credentials controlled by IAM roles.

| Input or need | STS operation |
|---|---|
| SAML assertion | `AssumeRoleWithSAML` |
| OIDC token | `AssumeRoleWithWebIdentity` |
| Custom broker holding IAM user credentials | `GetFederationToken` |
| IAM user needs MFA temporary credentials | `GetSessionToken` |

### Exam cues

- If the question says federate an Active Directory Federation Services sign-in to AWS, think SAML federation, because AD FS can act as the identity provider.
- If the question says external CI needs access without stored AWS keys, think OIDC role federation, because its token can be exchanged for temporary credentials.
- If the question says workforce authentication already produces SAML assertions, think SAML role federation, because AWS can use that identity evidence without a separate IAM user for each person.
- If the question says mobile or web users include guests who need limited AWS access, think Cognito identity pool, because it supplies role-controlled temporary AWS credentials.

### Remember

- For centrally managed workforce access to multiple accounts, consider IAM Identity Center.
- SAML console federation uses the AWS sign-in endpoint.
- IAM rejects GitHub trust policies whose `token.actions.githubusercontent.com:sub` is absent, null or solely a wildcard.

> **Trap:** A shared OIDC provider alone does not restrict access to your repository. Scope the audience and subject.
