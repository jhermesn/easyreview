---
title: Securing and monitoring Bedrock
level: foundational
order: 80
facts:
  - id: shared
    text: Under the shared responsibility model for Amazon Bedrock, AWS protects the infrastructure, and the customer controls its content, access permissions and security settings.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
  - id: recommendations
    text: AWS recommends least-privilege IAM users or IAM Identity Center, MFA, TLS 1.2 or later, CloudTrail activity logging, encryption, and Amazon Macie to find sensitive data in S3 when using Amazon Bedrock.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
  - id: invocation-logging
    text: Model invocation logging collects the full request data, response data and metadata of model calls in a Region and sends them to Amazon CloudWatch Logs or Amazon S3; it is disabled by default.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html#model-invocation-logging
  - id: privatelink
    text: An interface VPC endpoint with AWS PrivateLink gives a private connection from a VPC to Amazon Bedrock, so traffic doesn't cross the internet.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html
  - id: compliance
    text: Amazon Bedrock is in scope for compliance standards such as SOC and ISO and is HIPAA eligible.
    source: https://aws.amazon.com/bedrock/faqs/
  - id: provider-access
    text: Model providers have no access to the Amazon Bedrock model deployment accounts, so they can't see Amazon Bedrock logs or customer prompts and completions.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
cards:
  - id: bedrock-015
    q: An auditor needs the full prompts and responses of every model call in Amazon Bedrock. What must the company enable?
    a: Model invocation logging, with Amazon CloudWatch Logs or Amazon S3 as the destination. It's off by default.
    facts: [invocation-logging]
  - id: bedrock-016
    q: Which service records who called Amazon Bedrock APIs, and when, as opposed to the prompt contents?
    a: AWS CloudTrail. Prompt and response bodies come from model invocation logging.
    facts: [recommendations, invocation-logging]
  - id: bedrock-017
    q: A bank's app in a private VPC must reach Amazon Bedrock without going over the internet. What should it use?
    a: An interface VPC endpoint (AWS PrivateLink) for Amazon Bedrock.
    facts: [privatelink]
  - id: bedrock-018
    q: Under the shared responsibility model, who controls access to a company's Amazon Bedrock models and data?
    a: The customer, through IAM permissions and settings. AWS secures the underlying infrastructure.
    facts: [shared]
  - id: bedrock-019
    q: Are Amazon Bedrock prompts and completions logged by default?
    a: "No. Model invocation logging is disabled by default; you turn it on and choose CloudWatch Logs or S3."
    trap: true
    facts: [invocation-logging]
---
Bedrock follows the shared responsibility model: AWS runs the infrastructure and keeps model providers out of it, and you decide who can call which model, how traffic flows and what gets logged.

### How it works

1. **Access:** IAM policies grant least privilege to specific models and features.
2. **Network:** an interface VPC endpoint (AWS PrivateLink) keeps calls off the internet.
3. **Encryption:** TLS in transit; AWS KMS keys for data at rest such as custom models and logs.
4. **Audit:** AWS CloudTrail logs API calls; model invocation logging captures prompts and responses in CloudWatch Logs or S3.
5. **Sensitive data:** Amazon Macie finds sensitive data in S3 training or knowledge base buckets.

### Exam cues

- If the question says record prompts and responses for audit, think model invocation logging.
- If the question says who called which API, think AWS CloudTrail.
- If the question says no internet path from a VPC, think AWS PrivateLink interface endpoint.
- If the question says find PII in training data stored in S3, think Amazon Macie.

### Remember

- Invocation logging is off by default; destinations are CloudWatch Logs and S3.
- Model providers can't access Bedrock's deployment accounts.

> **Trap:** CloudTrail doesn't store prompt and response text. That is model invocation logging.
