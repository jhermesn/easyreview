---
title: Credentials and MFA
level: foundational
order: 3
facts:
  - id: password-policy-timing
    text: "Changed IAM password length and character requirements apply when users next change their passwords; expiration settings take effect immediately."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html#password-policy-rules
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
  - id: mfa-types
    text: "IAM supports three MFA types: passkeys and security keys (FIDO), virtual MFA apps on a phone or computer, and hardware TOTP tokens."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
  - id: mfa-devices
    text: A FIDO security key is a physical device, such as a YubiKey, plugged into the computer; a hardware TOTP token is a separate device that displays a six-digit code; a virtual MFA device is an app on a phone or computer.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
  - id: codecommit-ssh
    text: An IAM user can associate an SSH public key with the user to authenticate SSH connections to CodeCommit repositories.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_ssh-keys.html
  - id: ec2-key-pair
    text: An EC2 key pair helps authenticate connections to an EC2 instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html
cards:
  - id: iam-135
    q: "When do changed IAM password length and character requirements affect existing user passwords?"
    a: "At the next password change. Password expiration settings take effect immediately."
    facts: [password-policy-timing]
  - id: iam-127
    q: How can an IAM user authenticate an SSH connection to a CodeCommit repository?
    a: Associate the SSH public key with the IAM user and use the matching private key for the connection.
    facts: [codecommit-ssh]
  - id: iam-128
    q: Does an EC2 instance key pair sign AWS API requests?
    a: No. The key pair helps connect to the instance. AWS access keys sign programmatic API requests.
    trap: true
    facts: [ec2-key-pair, access-keys]
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
    q: "What does AWS recommend using for AWS access instead of long-term access keys?"
    a: "Temporary security credentials, such as IAM roles."
    facts: [prefer-temporary]
  - id: iam-091
    q: A company wants employees to sign in once and reach several AWS accounts with MFA. Which AWS service provides this?
    a: AWS IAM Identity Center, which gives MFA-protected single sign-on to assigned accounts.
    facts: [identity-center]
  - id: iam-092
    q: Where should an application store database passwords and API keys instead of hardcoding them?
    a: In AWS Secrets Manager, which can also rotate them, or in AWS Systems Manager Parameter Store. The application reads them at run time.
    facts: [secrets-manager, parameter-store]
  - id: iam-093
    q: Which MFA types does IAM support, and which one needs no extra hardware?
    a: Passkeys and security keys, virtual MFA apps, and hardware TOTP tokens. A virtual MFA app runs on an existing phone or computer.
    facts: [mfa-types]
  - id: iam-099
    q: "How many MFA devices can an AWS root user or IAM user register, and how many are needed to sign in?"
    a: "Up to eight devices can be registered; one is needed to sign in."
    facts: [eight-devices]

revised:
  - date: 2026-11-23
    note: The MFA card now tests device registration and sign-in limits.
    cards: [iam-099]
---
Credentials prove who is calling AWS. People sign in to the console with passwords and MFA; programs use access keys or, better, temporary credentials from roles. Fewer long-term credentials mean less to leak.

### How it works

1. **Passwords** sign people in to the console. An account password policy sets complexity and rotation for IAM users.
2. **MFA** adds a device check to sign-in. Passkeys and security keys resist phishing best; authenticator apps generate time-based codes.
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

- If the question says IAM password complexity changed for existing users, think enforcement at their next password change, because existing passwords are not forced to change for those settings.
- If the question says require a second factor at sign-in, think MFA.
- If the question says password length and rotation rules, think account password policy.
- If the question says store and rotate database credentials, think AWS Secrets Manager.
- If the question says one sign-in for many accounts, think IAM Identity Center.
- If the question says connect to CodeCommit over SSH, think an SSH public key associated with the IAM user, because CodeCommit uses the matching key pair for authentication.
- If the question says connect to an EC2 instance, think an EC2 key pair, because AWS access keys instead sign API requests.

### Remember

- Up to eight MFA devices per user; one is enough to sign in.
- Up to two access keys per user; the secret shows only once.
- The password policy skips the root user and access keys.
- MFA types: passkeys and security keys, virtual MFA app, hardware TOTP token.

> **Trap:** Rotating a password does not rotate access keys. They are separate credentials; disable or rotate keys on their own.
