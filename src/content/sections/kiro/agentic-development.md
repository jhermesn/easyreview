---
title: Agentic development with Kiro
level: foundational
order: 10
facts:
  - id: what
    text: Kiro is an agentic development environment that helps developers plan, build, test and ship software, with agentic coding, chat and Model Context Protocol (MCP) support.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: q-developer
    text: New sign-ups for the Amazon Q Developer IDE plugins ended on May 15, 2026, and the plugins reach end of support on April 30, 2027; AWS points to Kiro for similar capabilities.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: assistant
    text: Software development assistance is served by an AI assistant such as Kiro, without building your own application on Amazon Bedrock.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#consider
cards:
  - id: kiro-001
    q: A development team wants an AI-powered environment that plans, writes and tests code with agents and connects to tools over MCP. Which AWS offering fits?
    a: Kiro.
    facts: [what]
  - id: kiro-002
    q: A company uses the Amazon Q Developer IDE plugin. Which AWS tool is the recommended successor for agentic coding?
    a: Kiro. Q Developer IDE plugin sign-ups ended May 15, 2026, and support ends April 30, 2027.
    facts: [q-developer]
  - id: kiro-003
    q: To give developers AI coding help, should a company build its own app on Amazon Bedrock?
    a: "Usually not. A ready-made assistant such as Kiro covers software development help."
    trap: true
    facts: [assistant]
---
Kiro brings agents into software development: they help plan features, write and change code, run tests and use tools through MCP. It's the AWS path forward for the Amazon Q Developer IDE plugins. [Choosing a generative AI service](https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html)

### How it works

1. Describe what to build in chat.
2. Kiro's agents plan the work and write or change code.
3. Agents call tools and data through MCP servers and help test and ship.

### Exam cues

- If the question says agentic coding environment or AI help to build software, think Kiro.

### Remember

- Q Developer IDE plugins: sign-ups ended May 15, 2026; end of support April 30, 2027.

> **Trap:** Kiro is a development tool for software teams, not a service for hosting your own models.
