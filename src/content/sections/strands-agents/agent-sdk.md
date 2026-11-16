---
title: Building agents with Strands
level: foundational
order: 10
facts:
  - id: what
    text: Strands Agents is an open source SDK, initially released by AWS, for building autonomous AI agents with a model-driven approach, where the foundation model is the core of the agent's reasoning.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html#strands-agents
  - id: features
    text: Strands Agents has built-in multi-agent patterns (Swarm, Graph and Workflow), native MCP support, integration with Amazon Bedrock, AWS Lambda and AWS Step Functions, and support for models such as Anthropic Claude and Amazon Nova.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html#strands-agents
  - id: with-agentcore
    text: For tasks that need reasoning, tools or several steps, AWS suggests running the agent on AgentCore and defining its logic with a framework such as Strands.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
cards:
  - id: strands-agents-001
    q: A developer wants an open source, AWS-originated SDK to write agent logic in code, with MCP tools and multi-agent patterns. Which fits?
    a: The Strands Agents SDK.
    facts: [what, features]
  - id: strands-agents-002
    q: How do Strands Agents and Amazon Bedrock AgentCore fit together?
    a: Strands defines the agent's logic in code; AgentCore runs and operates it (runtime, memory, identity, observability).
    facts: [with-agentcore]
  - id: strands-agents-003
    q: Is Strands Agents a managed AWS hosting service for agents?
    a: "No. It's an open source SDK for writing agents; hosting comes from services such as AgentCore Runtime."
    trap: true
    facts: [what, with-agentcore]
---
Strands Agents is a code framework for agents: you give it a model, a prompt and tools, and the model drives the loop of reasoning and tool calls. It runs anywhere, and on AWS it pairs with Bedrock models and AgentCore. [Strands Agents](https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/strands-agents.html)

### How it works

1. Define an agent with a model (for example on Amazon Bedrock), a system prompt and tools.
2. The model decides which tools to call and when to stop (model-driven loop).
3. Combine agents with Swarm, Graph or Workflow patterns; connect tools over MCP.
4. Deploy to a runtime such as AgentCore Runtime.

### Exam cues

- If the question says open source SDK from AWS to build agents in code, think Strands Agents.

### Remember

- Model-first design; native MCP; Swarm, Graph and Workflow patterns.

> **Trap:** Strands is a framework, not a runtime. Run it on AgentCore, Lambda or your own compute.
