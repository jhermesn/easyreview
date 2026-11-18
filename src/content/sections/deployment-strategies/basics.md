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
    q: "Which AWS compute service provides the existing instances that CodeDeploy can update during an in-place deployment?"
    a: "Amazon EC2 provides the instances that CodeDeploy updates in place."
    facts: [in-place]
  - id: deployment-strategies-045
    q: "A team runs a new application version on a separate set of resources, then moves production traffic to it. Which deployment approach is this?"
    a: "A blue/green deployment."
    facts: [blue-green]
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
