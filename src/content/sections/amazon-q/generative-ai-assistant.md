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
    text: As of November 2026, Amazon Q Business is no longer open to new customers; AWS points to Amazon Quick for similar capabilities.
    source: https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html#what-is
  - id: bedrock
    text: Amazon Q Developer and Amazon Q Business are built on Amazon Bedrock and use its automated abuse detection.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is
cards:
  - id: amazon-q-001
    q: A developer wants an AI assistant that answers questions about AWS architecture and their own AWS resources. Which AWS service fits?
    a: Amazon Q Developer; in the console its chat is now called the AWS assistant.
    facts: [developer, assistant]
  - id: amazon-q-002
    q: Employees want a generative AI assistant that answers HR and IT questions from company documents, respecting their permissions. Which AWS service was built for this?
    a: Amazon Q Business. As of November 2026 it's closed to new customers, and AWS points to Amazon Quick.
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
---
Amazon Q is AWS's family of generative AI assistants. Amazon Q Developer helps people build and run applications on AWS. Amazon Q Business answers employees' questions from company data. Both have changed recently, so exam questions may use older names. [What is Amazon Q Developer?](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html#what-is)

### How it works

| Assistant | Helps with | Status (November 2026) |
|---|---|---|
| Amazon Q Developer | Understanding, building and operating AWS applications | Console chat renamed AWS assistant; IDE plugins end April 30, 2027 |
| Amazon Q Business | Answers and tasks from enterprise data, with citations | Closed to new customers; AWS points to Amazon Quick |

1. Ask a question in plain language.
2. The assistant answers from AWS knowledge and your resources (Q Developer) or from connected enterprise data (Q Business).
3. Answers respect the user's permissions.

### Exam cues

- If the question says AI assistant for AWS development or for questions about AWS resources, think Amazon Q Developer.
- If the question says generative AI assistant over company documents, think Amazon Q Business.

### Remember

- Built on Amazon Bedrock.
- Q Developer IDE plugins end April 30, 2027.

> **Trap:** Amazon Q answers questions; it doesn't replace AWS Support cases or guarantee response times.
