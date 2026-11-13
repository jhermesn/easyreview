---
title: Incident Manager
level: associate
order: 170
facts:
  - id: incident-availability
    text: Incident Manager stopped accepting new customers on November 7, 2025; existing customers can
      continue using accounts where it was already enabled.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/incident-manager-availability-change.html#incident-manager-availability-change
  - id: incident-plan
    text: An Incident Manager response plan defines responders, automated response actions and
      collaboration tools for an incident.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
  - id: incident-detect
    text: CloudWatch alarms and EventBridge events can create incidents using response plans.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
  - id: incident-escalate
    text: Engagement plans specify contacts or on-call schedules and an escalation path to notify
      responders.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
  - id: incident-runbook
    text: Incident Manager can initiate Systems Manager Automation runbooks for response actions.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
  - id: incident-chat
    text: Incident Manager integrates with Amazon Q Developer in chat applications for responder
      collaboration.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
  - id: incident-analysis
    text: Post-incident analysis identifies response improvements and recommended follow-up actions
      after resolution.
    source: https://docs.aws.amazon.com/incident-manager/latest/userguide/what-is-incident-manager.html#what-is-incident-manager
cards:
  - id: systems-manager-033
    q: An existing Incident Manager customer wants an alarm to notify on-call responders and start a
      runbook. What should it configure?
    a: An Incident Manager response plan with responder engagement, collaboration and an Automation
      runbook, triggered by CloudWatch or EventBridge. New customers have not been accepted since
      November 7, 2025.
    facts:
      - incident-plan
      - incident-detect
      - incident-escalate
      - incident-runbook
      - incident-chat
      - incident-availability
  - id: systems-manager-082
    q: An existing Incident Manager customer needs an unanswered incident notification to reach
      additional responders. Which configuration fits?
    a: An engagement plan with contacts or an on-call schedule and an escalation path.
    facts:
      - incident-escalate
  - id: systems-manager-083
    q: A team using Incident Manager wants to improve detection and mitigation after an incident is
      resolved. Which feature fits?
    a: Post-incident analysis, which identifies response improvements and follow-up actions.
    facts:
      - incident-analysis
  - id: systems-manager-084
    q: Can a new AWS customer adopt Systems Manager Incident Manager after November 7, 2025?
    a: No. It is closed to new customers; existing customers can continue in accounts where it was
      already enabled.
    trap: true
    facts:
      - incident-availability
---
Incident Manager coordinates people, collaboration and automated response when an incident occurs. It closed to new customers in November 2025; existing enabled accounts can continue using it.

### How it works

1. For an existing enabled account, define a response plan with responders, automated actions and the collaboration tool.
2. Connect CloudWatch alarms or EventBridge events to the response plan so detection can create an incident.
3. Engage contacts or the on-call schedule, which identifies who should respond at a given time. An escalation path moves notification to additional responders when needed.
4. Use Automation runbooks and chat collaboration during the response. After resolution, complete a post-incident analysis to identify improvements and follow-up actions.

### Exam cues

- If the question says an existing customer needs on-call engagement plus automated response, think an Incident Manager response plan, because it connects responders, collaboration and actions.
- If the question says the response process needs improvement after resolution, think post-incident analysis, because it records improvements and follow-up actions.

### Remember

- Closed to new customers on November 7, 2025.
- Existing customers can continue in accounts where Incident Manager was already enabled.
- Response plans define the response; engagement and escalation determine whom to notify.

> **Trap:** An exam description may reflect availability before November 2025. New adoption after the closure date is unsupported.
