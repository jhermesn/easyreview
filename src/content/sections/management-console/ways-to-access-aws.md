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
cards:
  - id: management-console-001
    q: What are the main ways to access and operate AWS services?
    a: "- AWS Management Console (web)\n- AWS CLI (command line)\n- AWS SDKs and APIs (code)\n- Infrastructure as code, such as AWS CloudFormation templates"
    facts: [console, cli, sdks, iac]
  - id: management-console-002
    q: An administrator wants to run AWS commands from a terminal script. Which tool fits?
    a: The AWS Command Line Interface (AWS CLI).
    facts: [cli]
  - id: management-console-003
    q: A developer's Python application must create objects in Amazon S3. How should it call AWS?
    a: Through the AWS SDK for Python, which handles request signing, retries and errors.
    facts: [sdks]
  - id: management-console-004
    q: A company must build the same environment in three Regions, identically, again and again. Which approach fits?
    a: Infrastructure as code with an AWS CloudFormation template, reused in each Region.
    facts: [iac, repeatable]
  - id: management-console-005
    q: A user needs to create one resource once, by hand, and see it visually. Which access method fits?
    a: The AWS Management Console.
    facts: [console]
  - id: management-console-006
    q: Is clicking through the AWS Management Console a good way to build environments that must be repeated exactly?
    a: No. Manual steps aren't repeatable; use infrastructure as code such as CloudFormation for repeatable processes.
    trap: true
    facts: [repeatable, console]
---
Every AWS action can be done in more than one way. The web console suits one-time, visual work. The CLI and SDKs suit scripts and applications. Infrastructure as code suits anything that must be repeated exactly. [What is the AWS Management Console?](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/what-is.html#what-is)

### How it works

1. **AWS Management Console:** a web interface to all services, including AWS CloudShell, a shell in the browser.
2. **AWS CLI:** commands in a terminal, with the same functionality as the console. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html#cli-chap-welcome)
3. **SDKs and APIs:** application code calls AWS APIs through language-specific SDKs, signed with credentials.
4. **Infrastructure as code (IaC):** a template describes the resources, and AWS CloudFormation creates them the same way every time. [What is CloudFormation?](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome)

| Method | Best for |
|---|---|
| Management Console | One-time tasks, exploring, visual checks |
| AWS CLI | Scripts and automation from a terminal |
| SDKs and APIs | Applications that call AWS |
| Infrastructure as code | Repeatable, consistent environments |

### Exam cues

- If the question says one-time setup or a visual interface, think the console.
- If the question says scripting from a terminal, think the AWS CLI.
- If the question says application code, think SDKs.
- If the question says repeatable, consistent environments, think infrastructure as code (CloudFormation).

### Remember

- The CLI and SDKs authenticate programmatic calls with access keys or temporary credentials.
- IaC templates can be reused across Regions and accounts.

> **Trap:** The CLI is not only for Linux. It runs on Linux, macOS and Windows, and remotely from EC2 or AWS CloudShell.
