---
title: "Deployment strategies basics"
level: foundational
order: 5
facts:
  - id: in-place
    text: "In an in-place deployment, CodeDeploy updates the existing EC2 instances in a rolling way, taking a set number offline at a time."
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#benefits
  - id: blue-green
    text: "In a blue/green deployment, the new version runs on a replacement set of resources and production traffic moves from the original set to it."
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#compute-platform
cards:
  - id: deployment-strategies-044
    q: "A release must avoid updating running servers and allow a quick switch back. Which deployment type fits?"
    a: "Blue/green: deploy to new resources, move traffic, and keep the old set to roll back."
    facts: [blue-green]
  - id: deployment-strategies-045
    q: "Which deployment type updates the existing instances a few at a time?"
    a: "In-place (rolling) deployment."
    facts: [in-place]
---
A deployment strategy decides how a new version replaces the old one. The main choices are updating servers in place or switching traffic to a new environment. [What is CodeDeploy?](https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome)

### How it works

1. In-place: update existing servers in batches.
2. Blue/green: start the new version on new resources.
3. Move traffic to the new version, keeping the old one for rollback.

### Exam cues

- If the question says easy rollback with no changes to running servers, think blue/green.

### Remember

- In-place updates existing instances; blue/green uses replacement resources.

> **Trap:** A rolling in-place update cannot switch back instantly; blue/green keeps the old environment for that.
