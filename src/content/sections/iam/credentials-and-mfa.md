---
title: Credentials and MFA
level: foundational
order: 3
facts:
  - id: mfa
    text: Multi-factor authentication (MFA) requires a user to provide unique authentication from a device in addition to their sign-in credentials; it can protect the root user and IAM users.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: phishing-resistant
    text: AWS recommends phishing-resistant MFA such as passkeys and security keys, FIDO-based authenticators that resist phishing, man-in-the-middle and replay attacks better than TOTP options.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: eight-devices
    text: The root user and each IAM user can register up to eight MFA devices of any type, and need only one to sign in.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: password-policy
    text: An account password policy sets complexity requirements and mandatory rotation periods for IAM user passwords; without one, the default AWS password policy applies.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html#id_credentials_passwords_account-policy
  - id: policy-scope
    text: The IAM password policy does not apply to the root user password or to IAM user access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html#password-policy-rules
  - id: access-keys
    text: Access keys are long-term credentials, an access key ID plus a secret access key, used to sign programmatic requests to the AWS CLI or API.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
  - id: secret-once
    text: The secret access key can be retrieved only when the key is created; if it is lost, delete the key and create a new one. A user can have at most two access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
  - id: prefer-temporary
    text: AWS recommends temporary security credentials, such as IAM roles, instead of long-term access keys.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
  - id: identity-center
    text: IAM Identity Center gives users MFA-protected single sign-on access to their assigned AWS accounts, with identities managed in Identity Center or a SAML 2.0 identity provider.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: secrets-manager
    text: AWS Secrets Manager manages, retrieves and rotates database credentials, API keys and other secrets, replacing hard-coded credentials with a runtime call.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html#intro
  - id: parameter-store
    text: AWS Systems Manager Parameter Store securely stores, organizes and retrieves configuration data as named parameters, so applications don't hardcode values.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#systems-manager-parameter-store
cards:
  - id: iam-085
    q: What does multi-factor authentication (MFA) add to an AWS sign-in?
    a: A second proof from a device the user has, such as a passkey, security key or authenticator app, on top of the password.
    facts: [mfa]
  - id: iam-086
    q: Which type of MFA does AWS recommend as the most secure?
    a: Phishing-resistant MFA such as passkeys and security keys (FIDO), which resist phishing, man-in-the-middle and replay attacks.
    facts: [phishing-resistant]
  - id: iam-087
    q: A company wants IAM user passwords to have at least 14 characters and expire every 90 days. What does it configure?
    a: An account password policy in IAM.
    facts: [password-policy]
  - id: iam-088
    q: Does the IAM account password policy also apply to the root user's password?
    a: No. It applies to IAM user passwords only, not the root user password or access keys.
    trap: true
    facts: [policy-scope]
  - id: iam-089
    q: What are AWS access keys used for, and what are their two parts?
    a: They sign programmatic requests from the AWS CLI, SDKs or API. They have an access key ID and a secret access key.
    facts: [access-keys]
  - id: iam-090
    q: A developer lost the secret access key of an IAM access key. Can AWS show it again?
    a: No. The secret is shown only at creation. Delete the key and create a new one.
    facts: [secret-once]
  - id: iam-091
    q: A company wants employees to sign in once and reach several AWS accounts with MFA. Which AWS service provides this?
    a: AWS IAM Identity Center, which gives MFA-protected single sign-on to assigned accounts.
    facts: [identity-center]
  - id: iam-092
    q: Where should an application store database passwords and API keys instead of hardcoding them?
    a: In AWS Secrets Manager, which can also rotate them, or in AWS Systems Manager Parameter Store. The application reads them at run time.
    facts: [secrets-manager, parameter-store]
---
Credentials prove who is calling AWS. People sign in to the console with passwords and MFA; programs use access keys or, better, temporary credentials from roles. Fewer long-term credentials mean less to leak. [Access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys)

### How it works

1. **Passwords** sign people in to the console. An account password policy sets complexity and rotation for IAM users. [Password policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html#id_credentials_passwords_account-policy)
2. **MFA** adds a device check to sign-in. Passkeys and security keys resist phishing best; authenticator apps generate time-based codes. [MFA](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa)
3. **Access keys** sign CLI, SDK and API calls. They are long-term, so AWS prefers roles, which hand out temporary credentials.
4. **Application secrets**, such as database passwords, belong in AWS Secrets Manager or Systems Manager Parameter Store, not in code.
5. **Single sign-on:** IAM Identity Center signs a person in once, with MFA, to every account they are assigned.

| Credential | Used for | Protect it with |
|---|---|---|
| Password | Console sign-in | Password policy, MFA |
| Access keys | CLI, SDK, API calls | Prefer roles; at most two per user; never share |
| Temporary credentials (roles) | People and workloads | Expire automatically |
| Application secrets | Database passwords, API keys | Secrets Manager, Parameter Store |

### Exam cues

- If the question says require a second factor at sign-in, think MFA.
- If the question says password length and rotation rules, think account password policy.
- If the question says store and rotate database credentials, think AWS Secrets Manager.
- If the question says one sign-in for many accounts, think IAM Identity Center.

### Remember

- Up to eight MFA devices per user; one is enough to sign in.
- Up to two access keys per user; the secret shows only once.
- The password policy skips the root user and access keys.

> **Trap:** Rotating a password does not rotate access keys. They are separate credentials; disable or rotate keys on their own.
