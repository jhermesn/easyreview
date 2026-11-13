---
title: Repositories and Git access
level: associate
order: 10
facts:
  - id: private-git
    text: CodeCommit hosts private Git repositories without requiring users to operate source control servers.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html#welcome-introducing
  - id: git-workflow
    text: A repository stores files and their history; developers clone a local copy, commit changes locally, and push them to CodeCommit.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html#welcome-how-it-works
  - id: new-customers
    text: CodeCommit reopened new customer sign-ups and returned to full general availability on November 24, 2025, following its July 2024 de-emphasis.
    source: https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/
  - id: git-credentials
    text: HTTPS Git credentials are a static username and password generated in IAM for an IAM user.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up.html#setting-up-standard
  - id: ssh-authentication
    text: SSH authenticates with a key pair whose public key is associated with an IAM user.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up.html#setting-up-other
  - id: temporary-authentication
    text: Federated and temporary access support git-remote-codecommit, which AWS recommends, or the AWS CLI credential helper; static HTTPS Git credentials and SSH cannot use rotating or temporary credentials.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/temporary-access.html
  - id: role-permissions
    text: A federated identity receives the permissions of its associated IAM role after authenticating.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/temporary-access.html
  - id: role-definition
    text: An IAM role is an identity with permissions that callers can assume.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: temporary-credentials
    text: Temporary credentials grant access for a limited lifetime and cannot be used after they expire.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html
  - id: cross-account-role
    text: Users can access a CodeCommit repository in another AWS account by assuming a role for repository access and using git-remote-codecommit.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/cross-account.html
  - id: regional-endpoint
    text: A CodeCommit repository belongs to an AWS Region, and Git connections must use that Region's endpoint.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/regions.html#regions-git
  - id: repository-encryption
    text: CodeCommit encrypts stored repository data and transmits it over encrypted HTTPS or SSH connections.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/encryption.html
  - id: default-encryption-key
    text: CodeCommit uses an AWS managed KMS key named aws/codecommit unless a customer managed key is specified.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/encryption.html
  - id: unsuitable-workloads
    text: Git performance can degrade with frequently changing large files, database data, audit trails, and filesystem or database backups.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html#welcome-alternate-services
  - id: alternative-storage
    text: AWS suggests S3 for versioning large files or storing audit trails and DynamoDB for database workloads rather than using CodeCommit for those tasks.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html#welcome-alternate-services
diagrams:
  - id: codecommit-role-access
    title: Access a repository in another account
    width: 800
    height: 240
    groups:
      - { label: Caller account, icon: group-aws-account, x: 20, y: 20, w: 220, h: 200, tone: user }
      - { label: Repository account, icon: group-aws-account, x: 300, y: 20, w: 480, h: 200, tone: security }
    nodes:
      - { id: caller, label: Developer, sub: git-remote-codecommit, icon: res-client, x: 45, y: 95, w: 170, h: 86, tone: user }
      - { id: role, label: IAM role, sub: Repository permissions, icon: identity-and-access-management, x: 330, y: 95, w: 180, h: 86, tone: security }
      - { id: repo, label: CodeCommit, sub: Private repository, icon: codecommit, x: 580, y: 95, w: 170, h: 86, tone: devtools }
    edges:
      - { from: caller, to: role, step: 1, label: Assume role }
      - { from: role, to: repo, step: 2 }
    steps:
      - The caller assumes the role configured for access in the repository account.
      - git-remote-codecommit uses role credentials to access the repository with that role's permissions.
cards:
  - id: codecommit-001
    q: Is CodeCommit available to new customers?
    a: |-
      Yes. AWS reopened new customer sign-ups on November 24, 2025, when CodeCommit returned to full general availability.
      This followed the July 2024 de-emphasis announcement.
    trap: true
    facts: [new-customers]
  - id: codecommit-002
    q: How can a Git client authenticate to CodeCommit?
    a: |-
      Use HTTPS Git credentials for an IAM user, SSH with an IAM user's associated public key, or git-remote-codecommit / the AWS CLI credential helper for temporary or federated access.
      A federated identity receives its IAM role's permissions.
    facts: [git-credentials, ssh-authentication, temporary-authentication, role-permissions]
  - id: codecommit-008
    q: How is CodeCommit data protected, and what is it a poor fit for?
    a: |-
      CodeCommit encrypts repository data at rest and uses HTTPS or SSH in transit.
      Git performance can degrade with frequently changing large files, databases, audit trails, and filesystem or database backups. AWS suggests S3 for large-file versioning and audit trails, and DynamoDB for databases.
    facts: [repository-encryption, unsuitable-workloads, alternative-storage]
  - id: codecommit-011
    q: A federated developer uses temporary credentials to access CodeCommit. Which Git connection method should the team choose?
    a: Use git-remote-codecommit, the AWS recommendation, or the AWS CLI credential helper. Static HTTPS Git credentials and SSH cannot use temporary credentials.
    facts: [temporary-authentication]
    trap: true
  - id: codecommit-012
    q: Developers must clone a CodeCommit repository owned by another AWS account. How can they obtain Git access?
    a: Configure role-based repository access in the repository account. Developers assume that role and use git-remote-codecommit with its credentials.
    facts: [cross-account-role, role-permissions]
  - id: codecommit-013
    q: Which encryption key does CodeCommit use if a team does not specify its own repository key?
    a: The AWS managed KMS key aws/codecommit. A customer managed key can be specified instead.
    facts: [default-encryption-key]
---
CodeCommit hosts private Git repositories so a team can track file history without running a source control server. Git is the version control system; a repository is the collection of files and their history.

### How it works

1. Create the repository in an AWS Region and use its regional Git endpoint.
2. Choose an authentication method, which proves the caller's identity. An IAM role is an identity with permissions that a caller can assume; federation lets an external sign-in use that role. Temporary credentials authorize access for a limited lifetime.
3. Clone the repository to make a local copy. Record local changes as commits, then push those commits to CodeCommit.
4. CodeCommit encrypts stored data with AWS KMS, which manages encryption keys. HTTPS and SSH encrypt the network connection.

| Git access method | Identity and credentials | Use when |
|---|---|---|
| HTTPS Git credentials | IAM user with a static username and password | A Git tool accepts username/password authentication |
| SSH | IAM user with an associated public key | A Git client uses key-based SSH authentication |
| git-remote-codecommit | Temporary or federated role credentials | An external sign-in or assumed role needs Git access; AWS recommends this option |
| AWS CLI credential helper | Temporary or federated credentials | Git needs the AWS CLI to supply authentication |

### Exam cues

- If the question says a federated developer needs CodeCommit access, think git-remote-codecommit or the AWS CLI credential helper, because both support temporary credentials.
- If the question says the repository belongs to another account, think assume a repository-access role in that account, because its permissions authorize access.
- If the question says large files change frequently or audit records accumulate continuously, think S3, because Git history can make those workloads slower over time.

### Remember

- New customer sign-ups reopened on November 24, 2025, following the July 2024 de-emphasis.
- The default repository encryption key is `aws/codecommit`; a customer managed key is optional.
- Use the Git endpoint for the repository's Region.
- CodeCommit encrypts data at rest and in transit.

> **Trap:** An SSH key or static Git password does not make temporary credentials usable. Use git-remote-codecommit or the AWS CLI credential helper for temporary or federated access.
