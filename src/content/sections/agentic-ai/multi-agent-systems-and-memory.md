---
title: Multi-agent systems and memory
level: foundational
order: 20
facts:
  - id: multi-agent
    text: A multi-agent system has specialized agents collaborate on tasks beyond one agent, using patterns such as supervisor-worker (hierarchical), peer-to-peer, swarm, pipeline, dynamic graph or hybrid.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: orchestrator
    text: An orchestrator agent breaks a complex task into subtasks, delegates them to specialized agents, coordinates the information between them and combines the results.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: specialized
    text: A specialized agent performs a single, well-defined capability and is the building block of a multi-agent system.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: swarm
    text: In a swarm, agents work independently on overlapping parts of a problem and share findings through a common workspace, without central supervision.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: memory-tiers
    text: Short-term (session) memory holds context for the current task or conversation; long-term (persistent) memory keeps preferences, past outcomes and domain knowledge across sessions.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: orchestration
    text: Agent orchestration can be done by an orchestrator agent, a workflow engine such as AWS Step Functions, or both, from static workflows defined at design time to dynamic graphs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: a2a
    text: Amazon Bedrock AgentCore supports agent protocols such as MCP and Agent2Agent (A2A).
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
cards:
  - id: agentic-ai-008
    q: A support request needs billing, shipping and technical knowledge. One agent splits the request and sends parts to three expert agents, then combines their answers. Which pattern is this?
    a: Supervisor (orchestrator) multi-agent pattern with specialized agents.
    facts: [orchestrator, specialized, multi-agent]
  - id: agentic-ai-009
    q: A chatbot must remember earlier turns in today's chat and a customer's preferences from past months. Which memory types cover each?
    a: Short-term (session) memory for today's conversation; long-term (persistent) memory for preferences across sessions.
    facts: [memory-tiers]
  - id: agentic-ai-010
    q: Several research agents explore a problem in parallel and share findings in a common workspace with no central coordinator. Which pattern is this?
    a: A swarm.
    facts: [swarm]
  - id: agentic-ai-011
    q: Which protocol lets agents built with different frameworks communicate with each other, as supported by Amazon Bedrock AgentCore?
    a: Agent2Agent (A2A). MCP connects agents to tools and data.
    facts: [a2a]
  - id: agentic-ai-012
    q: Is a multi-agent system always better than one agent with several tools?
    a: "No. Multiple agents add coordination cost and failure points; use them when the task needs separate specialties."
    trap: true
    facts: [multi-agent, specialized]
---
When one agent can't hold all the skills or context, a multi-agent system splits the work among specialized agents, coordinated by an orchestrator or by peers. Memory lets agents carry context within a session and across sessions. [Agentic AI Lens definitions](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html)

### How it works

| Pattern | How agents coordinate |
|---|---|
| Supervisor-worker | An orchestrator delegates subtasks and combines results |
| Pipeline | Each agent's output feeds the next |
| Swarm | Agents work in parallel and share a workspace |
| Peer-to-peer | Agents talk directly with each other |
| Dynamic graph | Routing between agents is decided at run time |

1. Short-term memory keeps the current conversation; long-term memory keeps knowledge across sessions.
2. MCP connects agents to tools; A2A connects agents to other agents.
3. A workflow engine such as AWS Step Functions can orchestrate fixed parts of the flow.

### Exam cues

- If the question says one agent breaks down requests and delegates to specialists, think supervisor (orchestrator) pattern.
- If the question says remember within a session versus across sessions, think short-term versus long-term memory.
- If the question says agents communicating with agents, think A2A; agents to tools, think MCP.

### Remember

- Specialized agents do one thing well; orchestrators coordinate.
- Memory tiers: short-term (session) and long-term (persistent).

> **Trap:** MCP and A2A solve different problems. MCP is agent-to-tool; A2A is agent-to-agent.
