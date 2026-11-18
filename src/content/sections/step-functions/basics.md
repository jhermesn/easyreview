---
title: "Step Functions basics"
level: foundational
order: 5
facts:
  - id: workflows
    text: "AWS Step Functions builds workflows, called state machines, made of steps that call AWS services to orchestrate microservices and automate processes."
    source: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome
cards:
  - id: step-functions-026
    q: "An order process calls several Lambda functions in sequence, with retries and a branch on failure. Which service coordinates it?"
    a: "AWS Step Functions."
    facts: [workflows]
---
AWS Step Functions coordinates the steps of a process as a visual workflow. [What is Step Functions?](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome)

### How it works

1. Define a workflow of states.
2. Each state does work, often by calling another AWS service.
3. Step Functions runs the steps in order and tracks progress.

### Exam cues

- If the question says orchestrate several steps or services into a workflow, think Step Functions.

### Remember

- Workflows are state machines made of states.

> **Trap:** Step Functions orchestrates steps; EventBridge routes events and SQS queues messages.
