---
title: Generative AI assistants
level: foundational
order: 10
facts:
  - id: developer
    text: Amazon Q Developer is a generative AI conversational assistant that helps understand, build, extend and operate AWS applications, answering questions about architecture, resources, best practices and documentation.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: assistant
    text: The Amazon Q Developer chat in the AWS Management Console and Console Mobile Application is now called the AWS assistant; Amazon Q Developer in the IDE and on the command line keeps its name.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: ide-end
    text: AWS discontinues support for the Amazon Q Developer IDE plugins on April 30, 2027.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: business
    text: Amazon Q Business is a fully managed generative AI assistant that answers questions, summarizes, generates content and completes tasks based on enterprise data, with permissions-aware responses and citations.
    source: https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html#what-is
  - id: business-closed
    text: Amazon Q Business stopped accepting new customers on July 31, 2026; AWS points to Amazon Quick Suite for similar capabilities, and existing customers can keep using it.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: bedrock
    text: Amazon Q Developer and Amazon Q Business are built on Amazon Bedrock and use its automated abuse detection.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: qdev-ide
    text: "In an IDE such as Visual Studio Code, JetBrains or Visual Studio, Amazon Q Developer chats about code, completes code inline, generates new code, scans code for security vulnerabilities and helps upgrade, debug and optimize it."
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: aws-assistant-resources-costs
    text: "The AWS assistant, which replaced the Amazon Q Developer chat in the console, answers questions about your AWS resources and costs."
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
  - id: qdev-chat-apps
    text: "Amazon Q Developer in chat applications brings the assistant to Microsoft Teams and Slack channels, using the AmazonQDeveloperAccess managed policy and channel guardrails."
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#quick-start
  - id: qdev-tiers
    text: "Amazon Q Developer has a Free tier and a paid Amazon Q Developer Pro subscription."
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#pricing
  - id: quick-features
    text: "AWS Quick is an AI-powered workplace service with Quick Sight for BI dashboards, Quick Flows and Quick Automate for AI-driven automations, Quick Index to ground answers in company documents, Quick Research for cited research reports, and apps built from natural language."
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#what-is
  - id: quick-access
    text: "Organizations provision AWS Quick in the AWS Management Console with IAM Identity Center or IAM federation and per-user subscriptions; individuals can sign up without an AWS account."
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#accessing-quick
cards:
  - id: amazon-q-001
    q: A developer wants an AI assistant that answers questions about AWS architecture and their own AWS resources. Which AWS service fits?
    a: Amazon Q Developer; in the console its chat is now called the AWS assistant.
    facts: [developer, assistant]
  - id: amazon-q-002
    q: Employees want a generative AI assistant that answers HR and IT questions from company documents, respecting their permissions. Which AWS service was built for this?
    a: Amazon Q Business. It closed to new customers on July 31, 2026, and AWS points to Amazon Quick Suite.
    facts: [business, business-closed]
  - id: amazon-q-003
    q: Which AWS service are the Amazon Q assistants built on?
    a: Amazon Bedrock.
    facts: [bedrock]
  - id: amazon-q-004
    q: Is Amazon Q a service for training custom machine learning models?
    a: No. Amazon Q is a set of ready-to-use generative AI assistants; custom model training is Amazon SageMaker AI.
    trap: true
    facts: [developer, business]
  - id: amazon-q-005
    q: "Employees need one AI assistant that answers from company documents, writes cited research reports, builds dashboards and automates routine tasks. Which AWS service fits a new customer in late 2026?"
    a: "AWS Quick, with Quick Index, Quick Research, Quick Sight, Quick Flows and Quick Automate. Amazon Q Business closed to new customers on July 31, 2026."
    facts: [quick-features]
  - id: amazon-q-006
    q: "Which Amazon Q Developer capabilities help a developer inside the IDE?"
    a: "Code chat, inline code completion, new code generation, security vulnerability scans, and code upgrades, debugging and optimization."
    facts: [qdev-ide]
  - id: amazon-q-007
    q: "An operations team wants to ask about AWS resources from its Slack channel. What does AWS offer?"
    a: "Amazon Q Developer in chat applications, which works in Slack and Microsoft Teams with the AmazonQDeveloperAccess policy and channel guardrails."
    facts: [qdev-chat-apps]
---
Amazon Q is AWS's family of generative AI assistants. Amazon Q Developer helps people build and run applications on AWS. Amazon Q Business answers employees' questions from company data. Both have changed recently, so exam questions may use older names. [What is Amazon Q Developer?](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is)

### How it works

| Assistant | Helps with | Status (November 2026) |
|---|---|---|
| Amazon Q Developer | Understanding, building and operating AWS applications | Console chat renamed AWS assistant; IDE plugins end April 30, 2027 |
| Amazon Q Business | Answers and tasks from enterprise data, with citations | Closed to new customers on July 31, 2026; AWS points to Amazon Quick Suite |

1. Ask a question in plain language.
2. The assistant answers from AWS knowledge and your resources (Q Developer) or from connected enterprise data (Q Business).
3. Answers respect the user's permissions.

### Exam cues

- If the question says AI assistant for AWS development or for questions about AWS resources, think Amazon Q Developer.
- If the question says generative AI assistant over company documents, think Amazon Q Business.
- If the question says employees need one AI workspace for company knowledge, research, dashboards and automations, think AWS Quick (Amazon Q Business closed to new customers).

### Remember

- Built on Amazon Bedrock.
- Q Developer IDE plugins end April 30, 2027.

> **Trap:** Amazon Q answers questions; it doesn't replace AWS Support cases or guarantee response times.
