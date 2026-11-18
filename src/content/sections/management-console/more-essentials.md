---
title: Choosing an access method
level: foundational
order: 20
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
  - id: iac
    text: With AWS CloudFormation you describe the AWS resources you want in a template, and CloudFormation provisions and configures them, handling the dependencies between them.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
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
  - id: management-console-005
    q: A user needs to create one resource once, by hand, and see it visually. Which access method fits?
    a: The AWS Management Console.
    facts: [console]
---
AWS offers several ways to work with services, from a web interface to commands, application code and templates. Choose the method that fits how you want to operate. [AWS Management Console](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/what-is.html#what-is)

### How it works

1. Use the [AWS Management Console](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/what-is.html#what-is) to access service consoles on the web.
2. Run commands in a shell with the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html#cli-chap-welcome).
3. Use an [AWS SDK](https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html#deploying-in-local-zones) to call AWS from code through a language-specific API. The SDK handles details such as signing requests, retries and errors.
4. Describe resources in a template and let [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome) provision and configure them, including their dependencies.

### Exam cues

- If the question says a one-time, visual task, think the console, because it provides web access to service consoles.
- If the question says commands in a terminal script, think the AWS CLI, because it runs commands in a shell.
- If the question says an application calls AWS, think an AWS SDK, because it provides a language-specific API and handles connection details.
- If the question says a template describes resources, think CloudFormation, because it provisions and configures them.

### Remember

- The console provides access to search, notifications, AWS CloudShell, and account and billing information.
- AWS SDKs handle request signing, retries and errors.

> **Trap:** An application does not need the console to call AWS. It can use a language-specific SDK.
