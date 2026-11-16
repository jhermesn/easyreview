---
title: Agentic migration and modernization
level: foundational
order: 10
facts:
  - id: what
    text: AWS Transform accelerates the transformation of infrastructure, applications and code with an agentic AI experience and specialized tools for modernization and migration.
    source: https://docs.aws.amazon.com/transform/latest/userguide/what-is-service.html#what-is-service
  - id: uses
    text: AWS Transform can modernize mainframe applications such as IBM z/OS, migrate VMware and other server environments to Amazon EC2, modernize .NET applications to cross-platform .NET for Linux, and assess workloads for migration readiness.
    source: https://docs.aws.amazon.com/transform/latest/userguide/what-is-service.html#what-is-service
cards:
  - id: transform-001
    q: A company wants AI agents to help port its .NET Framework applications to cross-platform .NET on Linux. Which AWS service fits?
    a: AWS Transform.
    facts: [what, uses]
  - id: transform-002
    q: Which AWS service uses agentic AI to help modernize IBM z/OS mainframe applications and migrate VMware workloads?
    a: AWS Transform.
    facts: [uses]
  - id: transform-003
    q: Is AWS Transform a general-purpose chatbot for employees?
    a: "No. It's an agentic service for migration and modernization of infrastructure, applications and code."
    trap: true
    facts: [what]
---
AWS Transform applies agentic AI to large modernization jobs: mainframe code, VMware migrations and .NET ports, handled by agents that analyze, plan and transform with people reviewing. [What is AWS Transform?](https://docs.aws.amazon.com/transform/latest/userguide/what-is-service.html)

### How it works

1. Point AWS Transform at the source environment or code.
2. Agents assess, plan and propose changes.
3. People review and approve, and Transform carries out the migration or code transformation.

### Exam cues

- If the question says agentic AI to modernize or migrate code and infrastructure, think AWS Transform.

### Remember

- Mainframe, VMware-to-EC2 and .NET modernization are its main jobs.

> **Trap:** Code transformation with AI isn't Kiro's job; Kiro helps develop new software, Transform modernizes existing estates.
