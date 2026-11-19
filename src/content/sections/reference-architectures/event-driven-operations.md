---
title: Event-driven operations across accounts
level: professional
order: 140
facts:
  - id: health
    text: AWS Health gives ongoing visibility into resource performance and the availability of AWS services and accounts, through events that explain how changes might affect applications.
    source: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health
  - id: account-events
    text: AWS Health account-specific events concern an account and its resources.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: public-events
    text: Public events describe regional service availability and are not specific to an account.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: cross-bus
    text: EventBridge can send events from a rule in one account to a receiving bus in another account.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: receiver-policy
    text: The receiving bus resource policy must allow the sender account or organization.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-receiving-events-from-another-account
  - id: sender-role
    text: Cross-account event-bus targets created after March 2, 2023 require an IAM role; older targets without one are unaffected.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-receiving-events-from-another-account
  - id: no-third-hop
    text: An event received from another account is not forwarded onward to a third account.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: bus-routing
    text: A rule on an event bus compares arriving events with a pattern and sends matching events to its targets.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html
  - id: trail-required
    text: CloudTrail-derived EventBridge events require a trail with logging enabled.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: api-call-type
    text: EventBridge uses AWS API Call via CloudTrail for API calls and AWS Console Signin via CloudTrail for sign-in attempts.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: write-events
    text: EventBridge rules in ENABLED state match CloudTrail write management events.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: read-events
    text: Read-only management events require EventBridge rule state ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS, including both forwarding and destination rules when forwarding.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail.html#eb-service-event-cloudtrail
  - id: opscenter
    text: OpsCenter centralizes investigation and resolution of operational work items called OpsItems.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: opsitem-create
    text: CloudWatch alarms entering ALARM and EventBridge rules can create OpsItems automatically; users can also create them manually.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: opsitem-runbook
    text: OpsCenter can run Systems Manager Automation runbooks to help resolve an OpsItem.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: opsitem-dedup
    text: If the matching OpsItem is open or in progress, deduplication prevents creation of another matching item.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter-working-deduplication.html#OpsCenter-working-deduplication
  - id: automation-events
    text: Automation execution status changes are sent to EventBridge, so a rule on Failed or TimedOut can notify an SNS topic.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-eventbridge-events.html
  - id: cross-automation
    text: Systems Manager Automation can run from a central account across target AWS accounts, organizational units and Regions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#running-automations-multiple-accounts-regions
  - id: automation-admin-role
    text: AWS-SystemsManager-AutomationAdministrationRole belongs in the central account and permits assuming target execution roles.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#setup-management-account-iam-roles
  - id: health-eventbridge
    text: AWS Health delivers events to EventBridge at least once, and rules can send them to targets such as Lambda, SQS or SNS, for example when EC2 instances are scheduled for updates.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html
  - id: health-own-account
    text: An EventBridge rule receives AWS Health events only for its own account; events for other accounts in an organization need the organizational view with delegated administrator access.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html
diagrams:
  - id: event-driven-operations
    title: Member accounts forward Health and API events to a central bus that notifies, tracks and fixes
    facts: [health, account-events, public-events, cross-bus, receiver-policy, sender-role, no-third-hop, bus-routing, trail-required, api-call-type, write-events, read-events, opscenter, opsitem-create, opsitem-runbook, opsitem-dedup, automation-events, cross-automation, automation-admin-role, health-eventbridge, health-own-account]
    width: 1240
    height: 760
    groups:
      - { label: Member account, x: 20, y: 20, w: 560, h: 720, tone: neutral, icon: group-aws-account }
      - { label: Operations account, x: 620, y: 20, w: 600, h: 720, tone: mgmt, icon: group-aws-account }
    nodes:
      - { id: ec2, label: EC2 instance, sub: scheduled change, x: 60, y: 260, w: 160, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: health, label: AWS Health, sub: account event, x: 60, y: 70, w: 160, h: 86, tone: mgmt, icon: health-dashboard }
      - { id: trail, label: CloudTrail, sub: AWS API Call, x: 330, y: 260, w: 160, h: 86, tone: mgmt, icon: cloudtrail, info: "API call events need a trail with logging on. Read-only events need the rule state ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS." }
      - { id: bus, label: Default event bus, sub: forwarding rule, x: 330, y: 70, w: 160, h: 86, tone: integration, icon: eventbridge, info: "The rule's target is the central bus, with an IAM role for the cross-account delivery." }
      - { id: sg, label: Security group, sub: ingress opened, x: 330, y: 450, w: 160, h: 86, tone: network, icon: virtual-private-cloud }
      - { id: role, label: Execution role, sub: trusts operations, x: 60, y: 610, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: opsitem, label: OpsCenter, sub: OpsItem, x: 660, y: 70, w: 160, h: 86, tone: mgmt, icon: systems-manager, info: "Deduplication stops a second OpsItem while a matching one is open. OpsItems can run Automation runbooks." }
      - { id: sns, label: SNS topic, sub: on-call team, x: 960, y: 70, w: 170, h: 86, tone: integration, icon: simple-notification-service }
      - { id: cbus, label: Central event bus, sub: resource policy, x: 660, y: 260, w: 160, h: 86, tone: integration, icon: eventbridge, info: "Its resource policy allows the organization to send events. Events received from another account are not forwarded to a third." }
      - { id: auto, label: Automation, sub: response runbooks, x: 660, y: 610, w: 160, h: 86, tone: mgmt, icon: res-systems-manager-automation }
      - { id: failrule, label: Failure rule, sub: "Failed, TimedOut", x: 960, y: 610, w: 170, h: 86, tone: integration, icon: res-eventbridge-rule }
    edges:
      - { from: bus, to: cbus, step: 1 }
      - { from: ec2, to: health, step: 2 }
      - { from: health, to: bus, step: 2 }
      - { from: sg, to: trail, step: 3 }
      - { from: trail, to: bus, step: 3 }
      - { from: cbus, to: sns, step: 4 }
      - { from: cbus, to: opsitem, step: 4 }
      - { from: cbus, to: auto, step: 5 }
      - { from: auto, to: role, step: 5 }
      - { from: role, to: ec2, step: 5 }
      - { from: role, to: sg, step: 6 }
      - { from: auto, to: failrule, step: 7, dashed: true }
      - { from: failrule, to: opsitem, step: 7, dashed: true }
    steps:
      - "In every member account, a rule on the default bus forwards matching events to the central bus in the operations account, whose resource policy allows the organization."
      - "AWS Health announces a scheduled change for an EC2 instance and delivers the event to the member account's default bus at least once."
      - "When someone opens a security group, the call reaches the same bus as an AWS API Call via CloudTrail event, which needs a trail with logging on."
      - "Central rules alert the on-call team through SNS and open an OpsItem that collects the event's context."
      - "For the Health event, a rule starts an Automation runbook, which works in the member account through an execution role that trusts the operations account."
      - "For the API call, another rule starts a runbook that uses the same role to remove the ingress rule."
      - "If the runbook ends Failed or TimedOut, its status event matches a failure rule that updates OpsCenter, so the work is not lost."
cards:
  - id: reference-architectures-169
    q: "Events from 50 accounts must reach one operations account for central rules and responses. How?"
    a: "In each account, a rule on the default bus targets a **central event bus** in the operations account, with an IAM role. The central bus **resource policy** allows the sender accounts or the organization."
    facts: [cross-bus, receiver-policy, sender-role]
  - id: reference-architectures-170
    q: "The central operations bus forwards events to a security account bus, but events that came from member accounts never arrive there. Why?"
    a: "EventBridge does **not forward** an event received from another account on to a third account. Send it from the source account directly."
    trap: true
    facts: [no-third-hop]
  - id: reference-architectures-171
    q: "A rule in the management account should catch AWS Health events for every member account, but it only sees its own. What is needed?"
    a: "AWS Health's **organizational view** with delegated administrator access. A rule on its own receives Health events only for its account."
    trap: true
    facts: [health-own-account, health-eventbridge]
  - id: reference-architectures-172
    q: "An EventBridge rule should react when someone calls AuthorizeSecurityGroupIngress, but nothing matches. What must exist?"
    a: "A **CloudTrail trail with logging on**, because API calls arrive as AWS API Call via CloudTrail events. Read-only calls also need the rule state ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS."
    trap: true
    facts: [trail-required, api-call-type, write-events, read-events]
  - id: reference-architectures-173
    q: "Operational issues from alarms and events must become tracked work items with context and one-click runbooks, without duplicates. What fits?"
    a: "**Systems Manager OpsCenter**: alarms and EventBridge rules create OpsItems, deduplication blocks repeats while one is open, and OpsItems can run Automation runbooks."
    facts: [opscenter, opsitem-create, opsitem-dedup, opsitem-runbook]
  - id: reference-architectures-174
    q: "The team must know when an Automation runbook started by an event fails or times out. What fits?"
    a: "Automation sends **execution status changes to EventBridge**; a rule on Failed or TimedOut notifies SNS or opens an OpsItem."
    facts: [automation-events]
  - id: reference-architectures-175
    q: "One runbook must run from a central account against instances in many accounts and Regions. What makes that possible?"
    a: "Systems Manager Automation **multi-account and multi-Region** execution: the central AutomationAdministrationRole assumes an execution role in each target account."
    facts: [cross-automation, automation-admin-role]
  - id: reference-architectures-176
    q: "What is the difference between AWS Health public events and account-specific events?"
    a: "**Public events** describe a service's regional availability for everyone; **account-specific events** concern your account and its resources, such as a scheduled change for an instance."
    facts: [public-events, account-events, health]
---
Operations questions at the professional level describe something happening in an account, such as a scheduled change, an API call or a failed job, and ask how to detect it centrally and respond without people watching consoles. The design forwards events from every account to a central bus, where rules notify, track and fix.

### How it works

1. A rule on each account's default bus forwards events to a central bus in the operations account. [Cross-account events](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html)
2. AWS Health events and CloudTrail API call events arrive on the default bus of the account they concern.
3. Central rules notify through SNS, open OpsItems in OpsCenter, start Automation runbooks or invoke Lambda.
4. Responses act in member accounts through an execution role that trusts the operations account.
5. Automation status events report failed runs, so nothing is silently dropped.

| Decision | Choose | When |
|---|---|---|
| One place for every account's events | Central event bus with a resource policy | Many accounts, one operations team |
| Health events for the whole organization | Organizational view, delegated administrator | Rules alone see only their account |
| React to API calls | AWS API Call via CloudTrail events | A trail with logging is on |
| Track and resolve issues | OpsCenter OpsItems | Context, deduplication and runbooks |
| Fix across accounts | Automation with an execution role per account | Same runbook in many accounts and Regions |
| Know when a fix failed | Rule on Automation Failed or TimedOut | Every automated response |

### Exam cues

- If the question says react to scheduled maintenance or service events, think AWS Health events in EventBridge.
- If the question says react when someone calls a specific API, think AWS API Call via CloudTrail events.
- If the question says collect events from many accounts, think a central event bus with a resource policy.
- If the question says operational work items with context and runbooks, think OpsCenter.
- If the question says alert when an automated fix fails, think Automation status events in EventBridge.

### Remember

- Health events reach EventBridge at least once, only for the rule's own account.
- API call events need a trail; read-only events need ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS.
- No third hop: cross-account events are not forwarded again.

> **Trap:** An EventBridge rule in the management account does not see member accounts' events by default. Forward them from each account, or use the service's organization feature.
