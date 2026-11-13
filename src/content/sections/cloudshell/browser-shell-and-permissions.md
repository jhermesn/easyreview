---
title: Browser shell and permissions
level: associate
order: 10
facts:
  - id: shell
    text: CloudShell is a browser-based pre-authenticated shell launched from the AWS Management Console, with AWS CLI version 2 pre-installed.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#aws-cli-support
  - id: shells
    text: CloudShell supports Bash, PowerShell and Z shell.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#shells-dev-tools
  - id: credentials
    text: Console credentials are normally forwarded to CloudShell, but IAM can deny cloudshell:PutCredentials and require manual credential configuration.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#policy-examples
  - id: access
    text: IAM policies control CloudShell access and which CloudShell actions are allowed.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#sec-auth-with-identities
  - id: cloud-access-policy
    text: AWSCloudShellFullAccess grants permission to use CloudShell and all its features.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#sec-auth-with-identities
  - id: authorization
    text: AWS evaluates applicable policies to authorize requests made by a principal.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/access.html#access
  - id: launch
    text: Console launch requires CreateEnvironment, CreateSession, GetEnvironmentStatus and StartEnvironment permissions.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#restricting-actions
  - id: storage
    text: CloudShell provides 1 GB of private persistent home directory storage per Region at no additional cost, except in VPC environments.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html#persistent-storage-limitations
  - id: retention
    text: Persistent storage in a Region is deleted after 120 days without launching CloudShell in that Region unless the user takes action.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html#persistent-storage-limitations
  - id: vpc
    text: A CloudShell VPC environment uses a selected VPC, subnet and security groups.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#cshell-VPC-env
  - id: vpc-definition
    text: A VPC is a logically isolated virtual network in which AWS resources can be launched.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: subnet
    text: A subnet is a range of IP addresses in a VPC.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: security-group
    text: A security group controls traffic allowed to reach and leave the resources associated with it.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: vpc-storage
    text: A CloudShell VPC environment has no persistent storage, and its home directory is deleted on timeout, deletion or restart.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#persistent-storage
  - id: vpc-permissions
    text: Creating a VPC environment requires VPC-specific EC2 permissions, including permission to create a network interface.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#aws-cloudshell-vpc-permissions
  - id: session
    text: CloudShell sessions end after 20 to 30 minutes of inactivity, or 10 minutes in GovCloud; running processes do not count as interaction.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html#session-lifecycle-limitations
  - id: long-session
    text: A continuously running CloudShell session ends after approximately 12 hours even with regular interaction.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/limits.html#session-lifecycle-limitations
  - id: file-transfer
    text: Denying CloudShell file upload and download URL actions blocks the console transfer feature but does not prevent other file transfer clients.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html#policy-examples
  - id: pricing
    text: CloudShell has no additional service charge, but other AWS resources and standard data transfer rates are charged.
    source: https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#shell-pricing
cards:
  - id: cloudshell-001
    q: Which AWS service provides a browser-based shell with AWS CLI access using console credentials?
    a: AWS CloudShell. The CLI is pre-installed and console credentials are normally forwarded.
    facts: [shell, credentials]
  - id: cloudshell-002
    q: A developer needs a browser shell to reach resources in a private VPC. Which CloudShell environment can use that VPC?
    a: A CloudShell VPC environment, configured with a VPC, subnet and security groups.
    facts: [vpc]
  - id: cloudshell-003
    q: Does an AWS CloudShell VPC environment preserve files in its home directory after it times out?
    a: No. VPC environments have no persistent storage and the home directory is deleted on timeout.
    trap: true
    facts: [vpc-storage]
  - id: cloudshell-004
    q: How much persistent home directory storage does AWS CloudShell provide per Region outside VPC environments?
    a: 1 GB per Region, at no additional cost.
    facts: [storage]
  - id: cloudshell-005
    q: A CloudShell user has not launched a session in a Region for 120 days. What can happen to that Region's persistent files?
    a: They are automatically deleted unless the user takes action.
    facts: [retention]
  - id: cloudshell-006
    q: Does an active background process keep an unattended AWS CloudShell session from timing out?
    a: No. Running processes do not count as interaction; inactive sessions end after 20 to 30 minutes, or 10 minutes in GovCloud.
    trap: true
    facts: [session]
  - id: cloudshell-007
    q: An administrator denies cloudshell:PutCredentials. Can a user still launch CloudShell and use console credentials automatically?
    a: The user can launch it with the required launch permissions, but must configure credentials manually.
    facts: [credentials, launch]
  - id: cloudshell-008
    q: Does denying CloudShell console upload and download URL actions prevent all file transfers from the environment?
    a: No. Other transfer clients can still transfer files.
    trap: true
    facts: [file-transfer]
  - id: cloudshell-009
    q: Does AWSCloudShellFullAccess give a CloudShell user permission to call every AWS service?
    a: No. The policy grants CloudShell access; AWS still evaluates applicable policies for each service request.
    trap: true
    facts: [cloud-access-policy, authorization]
---
AWS CloudShell is a browser-based shell for running AWS CLI commands without installing command-line tools locally. It normally uses the credentials from the AWS Management Console session.

### How it works

1. Sign in to the console and launch CloudShell. IAM permissions control whether you can create and start the environment and session.
2. Run the pre-installed AWS command line interface (CLI) using Bash, PowerShell or Z shell. Console credentials are normally forwarded; if forwarding is denied, configure credentials manually. AWS still evaluates applicable policies for each request.
3. Use the home directory for files that must persist between sessions, or create a virtual private cloud (VPC) environment. A VPC is an isolated virtual network. Select a subnet, a range of network addresses, and security groups, which control allowed traffic. A VPC environment has no persistent storage.

### Exam cues

- If the question says run AWS CLI commands without a local installation, think CloudShell, because the CLI is pre-installed in the browser-based shell.
- If the question says reach resources in a private VPC, think a CloudShell VPC environment, because it uses the selected subnet and security groups.
- If the question says prevent automatic forwarding of console credentials, think deny `cloudshell:PutCredentials`, because users must then configure credentials manually.

### Remember

- Outside VPC environments, the private home directory has 1 GB of persistent storage per Region. Files may be deleted after 120 days without a session in that Region.
- A VPC environment deletes its home directory on timeout, deletion or restart. Creating one also requires VPC-specific EC2 permissions.
- Inactivity ends sessions after 20 to 30 minutes, or 10 minutes in GovCloud. Continuous sessions end after about 12 hours.
- CloudShell itself has no additional charge; other AWS resources and standard data transfer rates still apply.

> **Trap:** A running process does not count as interaction and cannot prevent an inactive CloudShell session from ending.

> **Trap:** Denying console upload and download URLs does not block all file transfers; other clients can still transfer files.
