---
title: AgentCore services
level: foundational
order: 10
facts:
  - id: what
    text: Amazon Bedrock AgentCore builds, deploys and operates AI agents securely at scale with any framework and foundation model, including models hosted outside Amazon Bedrock; it became generally available on October 13, 2025.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: frameworks
    text: AgentCore works with open source agent frameworks such as the Strands Agents SDK, LangGraph, CrewAI and LlamaIndex.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: runtime
    text: AgentCore Runtime is a secure, serverless runtime for deploying and scaling agents and tools, with fast cold starts, support for long-running asynchronous agents and true session isolation.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: memory
    text: AgentCore Memory gives agents short-term memory for multi-turn conversations and long-term memory that persists across sessions, and memory stores can be shared across agents.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: gateway
    text: AgentCore Gateway turns APIs, Lambda functions and existing services into MCP-compatible tools and connects to existing MCP servers.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: identity
    text: AgentCore Identity manages agent identity, access and credentials, works with existing identity providers such as Amazon Cognito and Okta, and lets agents reach AWS and third-party services on behalf of users.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: vault
    text: AgentCore Identity's token vault stores OAuth 2.0 tokens, OAuth client credentials and API keys, encrypted with AWS KMS keys and access-controlled.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/key-features-and-benefits.html
  - id: policy
    text: Policy in AgentCore intercepts agent traffic through AgentCore Gateway and checks each tool request against deterministic policies, written in Cedar or natural language, before allowing tool access.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html#policy
  - id: tools
    text: AgentCore Code Interpreter runs agent code in an isolated sandbox, and AgentCore Browser gives agents a managed cloud browser to work with websites.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: observe-evaluate
    text: AgentCore Observability traces, debugs and monitors each step of agent workflows, and AgentCore Evaluations measures how well agents and tools perform tasks and handle edge cases.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html#core-services-in-agentcore
  - id: agents-classic
    text: Amazon Bedrock Agents became Amazon Bedrock Agents Classic and closed to new customers on July 30, 2026; AWS recommends AgentCore for new agent development.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: classic-agent-tasks
    text: "A Bedrock Agents Classic agent breaks a user request into steps, asks the user for missing information, calls company APIs and queries knowledge bases; it needs at least one action group or an associated knowledge base."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html#agents
  - id: action-group-definition
    text: "An action group defines what an agent can do, either with an OpenAPI schema that maps each action to an API operation or with function details listing the parameters to elicit from the user."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/action-define.html#action-define
  - id: action-fulfillment
    text: "An action group is fulfilled by a Lambda function holding the business logic or by returning control to the application in the InvokeAgent response; user confirmation before an action helps guard against prompt injection."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/action-handle.html#action-handle
  - id: agent-trace
    text: "An agent trace shows each orchestration step, including the inputs and outputs of the action groups invoked and the knowledge bases queried, so you can follow and debug the agent's reasoning."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html#trace-events
cards:
  - id: bedrock-agentcore-001
    q: A team built an agent with an open source framework and needs a secure, serverless place to run it at scale with session isolation. Which AWS service fits?
    a: Amazon Bedrock AgentCore Runtime.
    facts: [runtime, frameworks]
  - id: bedrock-agentcore-002
    q: A shopping agent must remember the current chat and each customer's preferences from earlier sessions. Which AgentCore service fits?
    a: AgentCore Memory, with short-term memory per session and long-term memory across sessions.
    facts: [memory]
  - id: bedrock-agentcore-003
    q: An agent must call a company's existing REST APIs and Lambda functions as tools. Which AgentCore service exposes them?
    a: AgentCore Gateway, which turns APIs and Lambda functions into MCP-compatible tools.
    facts: [gateway]
  - id: bedrock-agentcore-004
    q: An agent must read a user's calendar in a third-party app with the user's own OAuth permissions. Which AgentCore service handles the tokens?
    a: AgentCore Identity, which gets and stores OAuth tokens in its token vault and acts on behalf of the user.
    facts: [identity, vault]
  - id: bedrock-agentcore-005
    q: A bank needs a guarantee that its agent can never call the money-transfer tool above a set amount, whatever the model decides. Which AgentCore feature fits?
    a: Policy in AgentCore, which checks every tool call through the gateway against deterministic rules.
    facts: [policy]
  - id: bedrock-agentcore-006
    q: Which AgentCore services let an agent run code safely and browse websites?
    a: AgentCore Code Interpreter (isolated sandbox) and AgentCore Browser (managed cloud browser).
    facts: [tools]
  - id: bedrock-agentcore-007
    q: How can a team score sampled production agent sessions for quality on an ongoing basis?
    a: AgentCore Evaluations, with AgentCore Observability for tracing each step.
    facts: [observe-evaluate]
  - id: bedrock-agentcore-008
    q: Should a new customer in 2026 build agents with Amazon Bedrock Agents?
    a: "No. Bedrock Agents became Agents Classic and closed to new customers on July 30, 2026; use Amazon Bedrock AgentCore."
    trap: true
    facts: [agents-classic]
  - id: bedrock-agentcore-009
    q: "In an Amazon Bedrock agent, how do you tell the agent which business actions it can take, and how are they carried out?"
    a: "With action groups. Each action group is defined by an OpenAPI schema or by function details, and is fulfilled by a Lambda function or by returning control to your application."
    facts: [action-group-definition, action-fulfillment]
  - id: bedrock-agentcore-010
    q: "A Bedrock agent gave an unexpected answer. How do you see which actions and knowledge base queries it ran?"
    a: "Turn on the trace. It records every orchestration step with the inputs and outputs of each action group and knowledge base query."
    facts: [agent-trace]
  - id: bedrock-agentcore-011
    q: "How can a Bedrock agent reduce the risk that a prompt injection triggers a harmful action?"
    a: "Turn on user confirmation for the action, so the application user must confirm before the agent invokes the action group function."
    facts: [action-fulfillment]
---
AgentCore is a set of building blocks for running agents in production: where they run, what they remember, which tools they reach, whose identity they use, what they're allowed to do and how well they perform. Use the pieces together or one at a time, with any framework or model. [What is AgentCore?](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)

### How it works

| Service | Does |
|---|---|
| Runtime | Runs agents serverlessly with session isolation |
| Memory | Short-term and long-term memory |
| Gateway | Turns APIs and Lambda functions into MCP tools |
| Identity | Agent identity and OAuth credentials (token vault) |
| Policy | Deterministic rules on every tool call |
| Code Interpreter, Browser | Sandboxed code and web browsing |
| Observability | Traces of each agent step |
| Evaluations | Quality scores for agents and tools |

### Exam cues

- If the question says run agents built with any framework at scale, think AgentCore Runtime.
- If the question says remember across sessions, think AgentCore Memory.
- If the question says expose APIs or Lambda functions to agents as MCP tools, think AgentCore Gateway.
- If the question says act on behalf of users with OAuth tokens, think AgentCore Identity.
- If the question says enforce rules on what tools an agent may call, think Policy in AgentCore.
- If the question says define the actions an existing Bedrock agent can take, think action groups (OpenAPI schema or function details, fulfilled by Lambda or return of control).

### Remember

- AgentCore works with any framework (Strands Agents, LangGraph, CrewAI) and any model.
- Bedrock Agents (Classic) closed to new customers on July 30, 2026.

> **Trap:** A system prompt that says "never do X" isn't an enforcement boundary; Policy in AgentCore checks tool calls deterministically outside the model.
