---
title: "Directory Service basics"
level: foundational
order: 5
facts:
  - id: managed-ad
    text: "AWS Directory Service offers several ways to use Microsoft Active Directory with AWS services; directories hold users, groups and devices."
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html#what_is
cards:
  - id: directory-service-009
    q: "A company wants to use Microsoft Active Directory with AWS services. Which service provides it?"
    a: "AWS Directory Service."
    facts: [managed-ad]
---
AWS Directory Service brings Microsoft Active Directory to AWS, as a managed directory or a connection to an existing one. [What is AWS Directory Service?](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html#what_is)

### How it works

1. Choose a directory type in AWS Directory Service.
2. Users and groups live in the directory.
3. AWS services and applications use it for sign-in and access.

### Exam cues

- If the question says Microsoft Active Directory on AWS, think AWS Directory Service.

### Remember

- Several directory options, all built around Active Directory.

> **Trap:** Directory Service is for Active Directory; IAM manages AWS identities and permissions.
