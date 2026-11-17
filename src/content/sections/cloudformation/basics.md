---
title: "CloudFormation basics"
level: foundational
order: 5
facts:
  - id: templates
    text: "CloudFormation models and sets up AWS resources from a template that describes them, and provisions and configures them for you."
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
cards:
  - id: cloudformation-157
    q: "A team wants to create the same set of AWS resources repeatably in several Regions from a template. Which service fits?"
    a: "AWS CloudFormation."
    facts: [templates]
---
AWS CloudFormation creates and updates AWS resources from templates, which is infrastructure as code. [What is CloudFormation?](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome)

### How it works

1. Write a template describing the resources.
2. CloudFormation creates them as a stack.
3. Update the template to change the stack.

### Exam cues

- If the question says infrastructure as code or repeatable environments from templates, think CloudFormation.

### Remember

- Templates create stacks of resources.

> **Trap:** CloudFormation provisions infrastructure; Elastic Beanstalk deploys applications on infrastructure it creates.
