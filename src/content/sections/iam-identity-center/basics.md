---
title: "IAM Identity Center basics"
level: foundational
order: 5
facts:
  - id: workforce-access
    text: "AWS IAM Identity Center connects workforce users to AWS accounts and applications, using an existing identity provider or users created in Identity Center."
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html#what-is
cards:
  - id: iam-identity-center-010
    q: "Employees should sign in once and reach several AWS accounts and business applications. Which service fits?"
    a: "AWS IAM Identity Center."
    facts: [workforce-access]
---
AWS IAM Identity Center gives employees single sign-on to AWS accounts and applications. [What is IAM Identity Center?](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html#what-is)

### How it works

1. Connect an identity provider or create users in Identity Center.
2. Assign users and groups to AWS accounts and applications.
3. Users sign in once through the access portal.

### Exam cues

- If the question says single sign-on for employees across AWS accounts, think IAM Identity Center.

### Remember

- Workforce sign-in to many accounts and applications.

> **Trap:** IAM Identity Center is for the workforce; Amazon Cognito signs in customers of your own apps.
