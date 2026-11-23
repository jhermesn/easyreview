---
title: "CloudFormation basics"
level: foundational
order: 5
facts:
  - id: templates
    text: "CloudFormation models and sets up AWS resources from a template that describes them, and provisions and configures them for you."
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
  - id: cdk-framework
    text: "AWS CDK is a software development framework for defining cloud infrastructure in code."
    source: https://docs.aws.amazon.com/cdk/v2/guide/home.html
  - id: resource-provider-pricing
    text: "CloudFormation has no additional charge for resource providers in the AWS and Alexa namespaces."
    source: https://aws.amazon.com/cloudformation/pricing/
  - id: resource-pricing
    text: "AWS resources created by CloudFormation incur their usual charges."
    source: https://aws.amazon.com/cloudformation/pricing/
cards:
  - id: cloudformation-157
    q: "A team wants to create the same set of AWS resources repeatably in several Regions from a template. Which service fits?"
    a: "AWS CloudFormation."
    facts: [templates]
  - id: cloudformation-160
    q: "A team uses AWS CDK to define infrastructure in code. Which AWS service provisions it?"
    a: "AWS CloudFormation provisions the resources defined by AWS CDK."
    facts: [cdk-framework, templates]
  - id: cloudformation-161
    q: "Does AWS CloudFormation remove the normal charges for the EC2 instances it creates?"
    a: "No. The resources incur their usual charges. CloudFormation has no additional charge for AWS namespace resource providers."
    facts: [resource-provider-pricing, resource-pricing]
---
AWS CloudFormation creates and updates AWS resources from templates, which is infrastructure as code.

### How it works

1. Write a template describing the resources.
2. CloudFormation creates them as a stack.
3. Update the template to change the stack.

### Exam cues

- If the question says define infrastructure using a software development framework, think AWS CDK, because it defines infrastructure in code.
- If the question says CloudFormation created EC2 instances, think normal EC2 charges, because the resources are billed as usual.
- If the question says infrastructure as code or repeatable environments from templates, think CloudFormation.

### Remember

- Templates create stacks of resources.

> **Trap:** CloudFormation provisions infrastructure; Elastic Beanstalk deploys applications on infrastructure it creates.
