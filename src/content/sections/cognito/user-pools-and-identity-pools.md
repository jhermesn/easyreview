---
title: User pools and identity pools
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Cognito is an identity platform for web and mobile apps; it authenticates and authorizes users from its built-in directory, an enterprise directory, or consumer identity providers such as Google and Facebook.
    source: https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html#what-is-amazon-cognito
  - id: user-pools
    text: A Cognito user pool is a user directory that authenticates and authorizes users to an app or API, and can provide single sign-on with SAML 2.0 and OIDC identity providers.
    source: https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html#what-is-amazon-cognito-user-pools
  - id: identity-pools
    text: A Cognito identity pool issues AWS credentials so authenticated or guest users can access AWS resources.
    source: https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html#what-is-amazon-cognito-identity-pools
cards:
  - id: cognito-001
    q: A mobile app needs user sign-up and sign-in, including "Sign in with Google". Which AWS service fits?
    a: Amazon Cognito, with a user pool that supports its own users and social identity providers.
    facts: [purpose, user-pools]
  - id: cognito-002
    q: What is the difference between an Amazon Cognito user pool and an identity pool?
    a: "- User pool: a user directory that signs users in to the app\n- Identity pool: gives signed-in or guest users temporary AWS credentials to access AWS resources"
    facts: [user-pools, identity-pools]
  - id: cognito-003
    q: Should a company use Amazon Cognito to give its employees access to the AWS Management Console?
    a: No. Cognito is for app users. Employee access to AWS accounts is IAM Identity Center or IAM.
    trap: true
    facts: [purpose]
---
Amazon Cognito handles identity for the users of your web and mobile apps: sign-up, sign-in, social and enterprise logins, and access to AWS resources from the app. [What is Amazon Cognito?](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html#what-is-amazon-cognito)

### How it works

1. A **user pool** stores users and signs them in, or federates sign-in to Google, Facebook, SAML or OIDC providers.
2. The app receives tokens for the signed-in user.
3. An **identity pool** exchanges those tokens for temporary AWS credentials, so the app can reach AWS resources directly.

### Exam cues

- If the question says sign-up and sign-in for a web or mobile app, think Amazon Cognito user pools.
- If the question says app users need temporary access to AWS resources, think Cognito identity pools.

### Remember

- User pools authenticate; identity pools hand out AWS credentials.

> **Trap:** Cognito is for customers of your app, not for your workforce in the AWS console.
