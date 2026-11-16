---
title: Business and application metrics
level: foundational
order: 20
facts:
  - id: business-health
    text: Business and user-interaction health for a generative AI application tracks user engagement (active users, repeat usage, task completion rates), customer satisfaction (such as net promoter score) and business impact (productivity, cost savings, revenue growth).
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/prod-monitoring-performance.html
  - id: agent-kpis
    text: Agent KPIs include operational ones (task completion rate, resolution time, error and escalation rate), quality ones (decision accuracy, hallucination rate, user satisfaction), efficiency ones (tokens, tool calls and cost per task) and business ones (outcome achievement, SLA compliance).
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp04.html#implementation-guidance
  - id: infra-not-enough
    text: Infrastructure metrics such as CPU and invocation count show whether an agent runs, not whether it achieves business outcomes.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops05-bp04.html
  - id: feedback
    text: Collecting and monitoring user feedback on generated outputs helps identify bias and areas where the model needs adjustment.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html#continuous-improvement
cards:
  - id: fm-evaluation-009
    q: A customer service AI assistant goes live. Which metrics show whether it delivers business value?
    a: Task completion rate, customer satisfaction (such as NPS), cost per interaction and business impact such as cost savings.
    facts: [business-health, agent-kpis]
  - id: fm-evaluation-010
    q: An AI agent's dashboards show low CPU and no errors, yet customers complain. What is missing?
    a: Outcome KPIs such as task completion rate and user satisfaction. Infrastructure metrics only show the agent is running.
    trap: true
    facts: [infra-not-enough, agent-kpis]
  - id: fm-evaluation-011
    q: Which efficiency metrics show whether an AI agent is economical?
    a: Tokens per task, tool invocations per task and cost per task.
    facts: [agent-kpis]
  - id: fm-evaluation-012
    q: An e-commerce company adds a generative AI shopping assistant. Which business metric shows it increases sales?
    a: Business impact metrics such as revenue growth, tracked against a baseline from before the assistant launched.
    facts: [business-health]
---
A model can score well and still fail the business. Production generative AI is judged on what users and the company get from it: tasks completed, satisfaction, cost and revenue. [Monitoring generative AI in production](https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/prod-monitoring-performance.html)

### How it works

| KPI group | Examples |
|---|---|
| Engagement | Active users, repeat usage, task completion rate |
| Satisfaction | Net promoter score, user feedback |
| Efficiency | Tokens, tool calls and cost per task or interaction |
| Business impact | Productivity, cost savings, revenue growth |

1. Set the business KPIs during scoping, next to the technical metrics.
2. Track them in production with user feedback.
3. Revisit them as business goals change.

### Exam cues

- If the question says prove business value or ROI, think business KPIs such as revenue growth, cost savings or task completion rate.
- If the question says is the agent economical, think cost per task and tokens per task.
- If the question says user perception, think satisfaction scores and feedback.

### Remember

- Infrastructure metrics show uptime, not value.
- Task completion rate, user satisfaction and cost per interaction align AI apps with business goals.

> **Trap:** Model accuracy is a technical metric. A question about business objectives wants a business metric such as task completion rate or cost per interaction.
