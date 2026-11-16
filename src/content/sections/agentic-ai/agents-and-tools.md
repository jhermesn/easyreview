---
title: Agents, tools and MCP
level: foundational
order: 10
facts:
  - id: agent
    text: An AI agent is an autonomous software system that uses an LLM as its reasoning engine to perceive context, plan actions, execute tasks and adapt toward a defined goal, taking multi-step actions and invoking external tools.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: tool
    text: A tool is a function or API an agent can invoke to interact with external systems, such as web search, database queries, code execution or API calls.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: workflow
    text: A workflow is a structured sequence of agent actions, tool calls and decision points, implemented for example as an AWS Step Functions state machine, an agent reasoning loop or both.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: how-much
    text: Tasks a model completes in one request, such as summarization or classification, need only a direct model call; tasks that need reasoning, tool use or several steps call for an agent; complex workflows can use multiple specialized agents.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: mcp
    text: The Model Context Protocol (MCP) is an open protocol, introduced by Anthropic, that connects LLM applications to external data sources and tools through one standard interface instead of a custom integration per system.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/what-is-the-model-context-protocol-mcp.html
  - id: mcp-primitives
    text: "MCP exposes three kinds of capability: resources (data and content such as files, databases and APIs), tools (actions such as creating tickets or running queries) and prompts (reusable prompt templates)."
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/mcp-deployment-patterns-on-aws/what-is-the-model-context-protocol-mcp.html
  - id: hitl
    text: Human-in-the-loop brings human judgment into agent workflows at defined decision points, from notification only to approval required before the agent proceeds.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: use-cases
    text: Agentic AI use cases include supporting research and development, code transformation, incident response automation and customer service automation.
    source: https://aws.amazon.com/what-is/agentic-ai/
cards:
  - id: agentic-ai-001
    q: What makes an AI agent different from a single call to a foundation model?
    a: An agent plans multi-step actions toward a goal, calls tools (APIs, databases, code) and keeps state, instead of answering one prompt once.
    facts: [agent, tool]
  - id: agentic-ai-002
    q: An AI assistant must search files, query a database and open tickets in other systems. What gives it a standard way to connect to all of them?
    a: The Model Context Protocol (MCP), an open standard for connecting agents to tools and data sources.
    facts: [mcp]
  - id: agentic-ai-003
    q: Name the three kinds of capability an MCP server can expose.
    a: Resources (data), tools (actions) and prompts (reusable templates).
    facts: [mcp-primitives]
  - id: agentic-ai-004
    q: A process always runs the same steps in a fixed order, with a model call inside two steps. Does it need an autonomous agent?
    a: "No. A predefined workflow (for example AWS Step Functions) with model calls inside steps is simpler and more predictable."
    trap: true
    facts: [workflow, how-much]
  - id: agentic-ai-005
    q: An agent can issue refunds. How do you keep a person in control of large refunds?
    a: Add a human-in-the-loop approval step, so the agent can't proceed past that decision point without explicit human approval.
    facts: [hitl]
  - id: agentic-ai-006
    q: Name three good uses for agentic AI.
    a: "Any three of: customer service automation, incident response automation, code transformation, research support, multi-step workflow automation."
    facts: [use-cases]
  - id: agentic-ai-007
    q: A company wants to classify support emails by topic. Does it need an AI agent?
    a: "No. One model call (or a classifier) does it; agents fit tasks needing reasoning, tools and several steps."
    facts: [how-much]
---
An agent is a foundation model given a goal, tools and memory, running in a loop: think, act, observe, repeat. The Model Context Protocol (MCP) standardizes how agents reach tools and data. [Agentic AI Lens definitions](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html)

### How it works

1. The agent receives a goal and its context (instructions, memory, available tools).
2. The model plans the next step and decides whether to call a tool.
3. The tool runs (search, database, API, code) and returns a result.
4. The agent repeats until the goal is met or a human approval is needed.

| Need | Build |
|---|---|
| One-shot task (summarize, classify) | Direct model call |
| Fixed steps in a known order | Workflow with model calls inside steps |
| Reasoning plus tools over several steps | Single agent |
| Complex work across specialties | Multiple agents |

### Exam cues

- If the question says connect an agent to many tools and data sources in a standard way, think MCP.
- If the question says the system decides its own steps and calls tools, think AI agent.
- If the question says steps are fixed and known, think a predefined workflow.
- If the question says a person must approve risky actions, think human-in-the-loop.

### Remember

- MCP: open standard; resources, tools, prompts.
- Use the least agentic design that solves the task.

> **Trap:** More autonomy isn't always better. Agents are less predictable than workflows; use them where reasoning and tool choice are needed.
