---
title: Ways to access AWS
level: foundational
order: 10
facts:
  - id: console
    text: The AWS Management Console is a web-based application that provides centralized access to all individual AWS service consoles, with search, notifications, AWS CloudShell, and account and billing information.
    source: https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/what-is.html#what-is
  - id: cli
    text: The AWS Command Line Interface (AWS CLI) is an open source tool for interacting with AWS services through commands in a command-line shell, with functionality equivalent to the console.
    source: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html#cli-chap-welcome
  - id: sdks
    text: AWS SDKs provide language-specific APIs and handle connection details such as calculating signatures, retrying requests and handling errors.
    source: https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html#deploying-in-local-zones
  - id: access-keys
    text: Access keys sign programmatic requests made with the AWS CLI or the AWS API, directly or through an AWS SDK.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#id_credentials_access-keys
  - id: iac
    text: With AWS CloudFormation you describe the AWS resources you want in a template, and CloudFormation provisions and configures them, handling the dependencies between them.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
  - id: repeatable
    text: A CloudFormation template can be reused to create the same resources in a consistent and repeatable way, for example in multiple Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#welcome-quickly-replicate-your-infrastructure
  - id: multi-session
    text: "After opting in to multi-session support, one browser can be signed in to up to five identities at once in the AWS Management Console, mixing root, IAM and federated roles from the same or different accounts."
    source: https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/multisession.html#multisession
cards:
  - id: management-console-004
    q: A company must build the same environment in three Regions, identically, again and again. Which approach fits?
    a: Infrastructure as code with an AWS CloudFormation template, reused in each Region.
    facts: [iac, repeatable]
  - id: management-console-006
    q: Is clicking through the AWS Management Console a good way to build environments that must be repeated exactly?
    a: No. Manual steps aren't repeatable; use infrastructure as code such as CloudFormation for repeatable processes.
    trap: true
    facts: [repeatable, console]
  - id: management-console-007
    q: "Which AWS access option lets a user manage services through a web browser?"
    a: "The AWS Management Console provides web-based access to AWS service consoles."
    facts: [console]
---
AWS CloudFormation templates help create resources consistently across Regions. The AWS Management Console also supports signing in to multiple identities in one browser. [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#welcome-quickly-replicate-your-infrastructure) | [Multi-session support](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/multisession.html#multisession)

### How it works

1. Describe the resources you want in a CloudFormation template. CloudFormation provisions and configures them, handling their dependencies. [What is CloudFormation?](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome)
2. Reuse the template to create the same resources consistently in multiple Regions. [Replicate your infrastructure](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#welcome-quickly-replicate-your-infrastructure)
3. Opt in to multi-session support to sign in to multiple console identities in the same browser. [Signing in to multiple accounts](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/multisession.html#multisession)

### Exam cues

- If the question says the same environment must be created repeatedly across Regions, think CloudFormation, because its template can be reused.
- If the question says multiple accounts must be open in one browser, think multi-session support, because it allows simultaneous console identities.

### Remember

- A CloudFormation template can be reused to create resources consistently across Regions.
- After opting in, a browser can hold up to five console identities from the same or different accounts.

> **Trap:** Clicking through the console is a manual process. Use a CloudFormation template when resources must be created consistently and repeatedly.
