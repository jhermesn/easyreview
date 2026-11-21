---
title: "CDK basics"
level: foundational
order: 5
facts:
  - id: iac-code
    text: "The AWS Cloud Development Kit (AWS CDK) is an open-source framework for defining cloud infrastructure in programming-language code and provisioning it through AWS CloudFormation."
    source: https://docs.aws.amazon.com/cdk/v2/guide/home.html#home
cards:
  - id: cdk-046
    q: "Developers want to define AWS infrastructure in TypeScript or Python instead of writing templates by hand. Which tool fits?"
    a: "The AWS CDK, which turns that code into CloudFormation deployments."
    facts: [iac-code]
---
The AWS CDK lets developers describe infrastructure in a programming language and deploys it with CloudFormation.

### How it works

1. Write the infrastructure in a supported language.
2. The CDK synthesizes a CloudFormation template.
3. CloudFormation provisions the resources.

### Exam cues

- If the question says infrastructure as code in a programming language, think the AWS CDK.

### Remember

- Deploys through CloudFormation.

> **Trap:** The CDK does not replace CloudFormation; it generates CloudFormation templates.
