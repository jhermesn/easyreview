---
title: "Secrets Manager basics"
level: foundational
order: 5
facts:
  - id: store-rotate
    text: "AWS Secrets Manager stores, retrieves and rotates secrets such as database credentials and API keys, so applications no longer hard-code them."
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html#intro
  - id: appconfig-source
    text: "An AWS AppConfig configuration profile can use an AWS Secrets Manager secret as its source."
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-iam-role.html
cards:
  - id: secrets-manager-035
    q: "An application has a database password hard-coded in its source. Which service stores it and rotates it automatically?"
    a: "AWS Secrets Manager."
    facts: [store-rotate]

---
AWS Secrets Manager keeps secrets out of code: applications fetch them at run time, and Secrets Manager can rotate them on a schedule.

### How it works

1. Store the secret in Secrets Manager.
2. The application retrieves it when needed.
3. Automatic rotation replaces it on a schedule.

### Exam cues

- If the question says an AppConfig configuration profile should read a secret, think Secrets Manager as the source, because AppConfig can retrieve a secret through its configuration profile role.
- If the question says rotate database credentials or remove hard-coded secrets, think Secrets Manager.

### Remember

- Stores and rotates secrets.

> **Trap:** Secrets Manager stores secrets; AWS KMS manages the encryption keys.
