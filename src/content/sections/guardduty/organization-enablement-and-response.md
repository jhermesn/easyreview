---
title: Organization enablement and response
level: professional
order: 20
facts:
  - id: organization-admin
    text: The Organizations management account can designate a delegated GuardDuty administrator to manage member accounts.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html
  - id: regional-admin
    text: GuardDuty administration and member association are Regional, and the same delegated administrator account must be used across Regions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
  - id: regional-enablement
    text: Designating the delegated administrator automatically enables GuardDuty for that administrator only in the current Region.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html
  - id: auto-all
    text: The ALL auto-enable setting enables GuardDuty for existing and new organization accounts.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html
  - id: auto-new
    text: The NEW auto-enable setting enables GuardDuty automatically only for new member accounts joining the organization.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html
  - id: auto-none
    text: Changing auto-enable to NONE does not disable GuardDuty for existing accounts.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html
  - id: opt-in-order
    text: For NEW auto-enable in an opt-in Region, the member must opt in before joining the organization; ALL can cover an existing member.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
  - id: opt-in-admin
    text: If the delegated administrator opts out of an opt-in Region, auto-enable cannot enable GuardDuty for members where it is disabled.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
  - id: plan-auto
    text: Organization auto-enable preferences can be set for protection plans except Malware Protection for S3.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html
  - id: event-publication
    text: GuardDuty automatically publishes findings as events to EventBridge, including new and aggregated findings.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html
  - id: event-pattern
    text: GuardDuty finding events use source aws.guardduty and detail-type GuardDuty Finding.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge_format
  - id: event-target
    text: An EventBridge rule selects events and sends matching events to a target such as Lambda or an SNS topic.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge_events
  - id: member-events
    text: EventBridge rules in the GuardDuty administrator account can act on applicable member findings as well as administrator findings.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge_multiaccount
  - id: member-event-publication
    text: GuardDuty publishes applicable member findings to EventBridge in the member account and makes them available to EventBridge rules in the administrator account.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge_multiaccount
  - id: member-id
    text: The accountId field in finding details identifies the member account that generated the finding.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#guardduty_findings_eventbridge_multiaccount
  - id: event-frequency
    text: New finding IDs are sent in near real time; updates for subsequent occurrences default to six hours and can be set to 15 minutes or one hour.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
  - id: finding-retention
    text: GuardDuty stores findings for 90 days; findings can be exported to S3 for longer retention.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html
  - id: suppression-events
    text: Findings automatically archived by suppression rules are not sent to EventBridge; manually archived findings continue to be sent.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge_events
  - id: samples
    text: Sample findings contain placeholder values and can test EventBridge events, filters, and automation.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/sample_findings.html
  - id: samples-api
    text: The console generates a sample of each supported finding type, while the API or CLI can generate selected finding types.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/sample_findings.html#sample_console
  - id: isolation
    text: AWS recommends isolating a potentially compromised EC2 instance with a dedicated security group and removing its other security groups.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/compromised-ec2.html
  - id: connections
    text: Changing security groups does not terminate existing tracked connections on an EC2 instance.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/compromised-ec2.html
  - id: credential-response
    text: For potentially compromised credentials, investigate the IAM entity and API call in the finding and determine whether the activity was legitimate.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/compromised-creds.html
  - id: trusted-lists
    text: Trusted lists suppress findings for trusted entries, while threat lists generate findings for activity involving known malicious entries.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html#guardduty-threat-intel-list-entity-sets
  - id: lists-admin
    text: In a multi-account environment only the GuardDuty administrator manages lists, which apply to member accounts.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html#guardduty-lists-entity-sets-considerations
  - id: lists-active
    text: GuardDuty uses a list only when its status is Active, and the list must be activated again after its S3 contents are updated.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html#guardduty-lists-entity-sets-considerations
  - id: list-precedence
    text: A trusted entry takes precedence if it also appears in a threat list.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html#guardduty-lists-entity-sets-considerations
  - id: list-types
    text: Entity lists support IP addresses and domains, while legacy IP lists support IP addresses only; SHA-256 file hashes are supported only in threat entity lists.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html#guardduty-threat-intel-list-entity-sets
  - id: conditional-cfn
    text: An AWS CloudFormation custom resource backed by Lambda can check GuardDuty state before enabling it to avoid a failed duplicate deployment.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/enable-amazon-guardduty-conditionally-by-using-aws-cloudformation-templates.html#enable-amazon-guardduty-conditionally-by-using-aws-cloudformation-templates-summary
  - id: conditional-limit
    text: The AWS conditional enablement pattern does not enable GuardDuty if it was manually disabled in the account or Region.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/enable-amazon-guardduty-conditionally-by-using-aws-cloudformation-templates.html#enable-amazon-guardduty-conditionally-by-using-aws-cloudformation-templates-prereqs
diagrams:
  - id: guardduty-finding-response
    title: Route a finding to an automated response
    width: 800
    height: 190
    nodes:
      - { id: gd, label: GuardDuty, sub: finding, icon: guardduty, x: 30, y: 55, w: 170, h: 86, tone: security }
      - { id: eb, label: EventBridge, sub: matching rule, icon: eventbridge, x: 315, y: 55, w: 170, h: 86, tone: integration }
      - { id: fn, label: Lambda, sub: response code, icon: lambda, x: 600, y: 55, w: 170, h: 86, tone: compute }
    edges:
      - { from: gd, to: eb, step: 1 }
      - { from: eb, to: fn, step: 2 }
    steps:
      - GuardDuty publishes a finding event.
      - A matching EventBridge rule invokes the response target.
cards:
  - id: guardduty-002
    q: Does a GuardDuty finding automatically isolate a potentially compromised EC2 instance?
    a: No. Use a response workflow, such as an EventBridge rule invoking Lambda, and configure its isolation action.
    trap: true
    facts: [event-publication, event-target, isolation]
  - id: guardduty-003
    q: How can an organization enable GuardDuty for existing and new member accounts in multiple Regions?
    a: Designate the same delegated administrator in each Region and select ALL for organization auto-enable in each Region.
    facts: [organization-admin, regional-admin, auto-all]
  - id: guardduty-004
    q: How can an EventBridge rule route GuardDuty findings to an automated response?
    a: Match source `aws.guardduty` and detail-type `GuardDuty Finding`, then send matching events to a target such as Lambda.
    facts: [event-pattern, event-target]
  - id: guardduty-005
    q: A GuardDuty finding indicates a potentially compromised EC2 instance. How can a team automate isolation?
    a: Route the finding through EventBridge to Lambda response code that associates an isolation security group and removes the other groups. Existing tracked connections remain.
    facts: [event-publication, event-target, isolation, connections]
  - id: guardduty-006
    q: A GuardDuty finding suggests AWS credentials are compromised. What should the security team investigate?
    a: Identify the IAM entity and API call in the finding, then determine whether the activity was legitimate.
    facts: [credential-response]
  - id: guardduty-013
    q: What happens when GuardDuty organization auto-enable is changed from ALL to NONE?
    a: Existing accounts are not disabled; NONE stops automatic enablement for new accounts.
    facts: [auto-none]
  - id: guardduty-014
    q: An existing organization member opts into a Region after joining. Why might GuardDuty NEW auto-enable not work?
    a: NEW requires the member to opt in before joining. Use ALL or manage the existing member individually in that Region.
    trap: true
    facts: [opt-in-order]
  - id: guardduty-015
    q: How can a security team route GuardDuty member findings centrally and identify the originating account?
    a: Use an EventBridge rule in the delegated administrator account and inspect the finding's `accountId`. Applicable findings also reach EventBridge in the member account.
    facts: [member-event-publication, member-id]
  - id: guardduty-016
    q: A GuardDuty finding recurs after its first notification. What is the default EventBridge update frequency?
    a: Six hours for subsequent occurrences. New finding IDs are sent in near real time.
    facts: [event-frequency]
  - id: guardduty-017
    q: How can a team test a GuardDuty EventBridge rule without generating a real threat?
    a: Generate sample findings with placeholder values. The API or CLI can select specific finding types.
    facts: [samples, samples-api]
  - id: guardduty-018
    q: How do GuardDuty trusted and threat lists affect detection?
    a: Trusted entries suppress findings; known malicious entries in threat lists can generate findings. Trusted entries take precedence when both lists contain the same entry.
    facts: [trusted-lists, list-precedence]
  - id: guardduty-019
    q: A team edits a GuardDuty threat list stored in S3. What must it do for GuardDuty to use the changes?
    a: Activate the list again and wait for its status to become Active.
    facts: [lists-active]
  - id: guardduty-020
    q: Who manages GuardDuty trusted and threat lists for member accounts in a multi-account environment?
    a: The GuardDuty administrator manages the lists, which apply to member accounts.
    facts: [lists-admin]
  - id: guardduty-021
    q: An AWS CloudFormation deployment may target accounts where GuardDuty already exists. How can it avoid a duplicate enablement failure?
    a: Use a Lambda-backed custom resource to check GuardDuty state before enabling it. The AWS pattern does not re-enable a manually disabled detector.
    facts: [conditional-cfn, conditional-limit]
  - id: guardduty-022
    q: A GuardDuty finding is automatically archived by a suppression rule. Will EventBridge receive it?
    a: No. Automatically suppressed findings are not sent to EventBridge; manually archived findings continue to be sent.
    trap: true
    facts: [suppression-events]
---
GuardDuty can be managed across an organization and can send findings to automation. The delegated administrator is the account chosen to manage GuardDuty for associated member accounts.

### How it works

1. The Organizations management account designates a delegated GuardDuty administrator. Repeat the setup in each desired Region, using the same administrator account. Designation enables GuardDuty for that administrator in the current Region only.
2. Set auto-enable for GuardDuty and supported protection plans in each Region. Malware Protection for S3 is not included in organization auto-enable.

| Setting | Effect |
| --- | --- |
| `ALL` | Enable for existing and new organization accounts |
| `NEW` | Enable only for new accounts when they join |
| `NONE` | Do not automatically enable new accounts; existing enablement remains |

3. GuardDuty publishes finding events to EventBridge. A rule matches `source: aws.guardduty` and `detail-type: GuardDuty Finding`, optionally filtering finding details, and sends matches to a target such as Lambda or an SNS topic. Lambda can run response code; SNS can deliver notifications.
4. Applicable member findings reach EventBridge in both the member account and the delegated administrator account. Use the finding's `accountId` to identify the originating account. Generate sample findings with placeholder values to test rules and automation.
5. To tailor detection, the administrator manages trusted and threat lists for members. Trusted entries suppress findings; threat entries identify known malicious sources. After changing a list in S3, activate it again and wait for Active status.

Entity lists can contain IP addresses and domains; legacy IP lists contain IP addresses only. SHA-256 file hashes, which identify file contents, are supported only in threat entity lists. A trusted entry takes precedence if it is also on a threat list.

For infrastructure deployments, an AWS CloudFormation custom resource can invoke Lambda to check GuardDuty state before enabling it. This avoids duplicate enablement failures. AWS notes that its example does not re-enable GuardDuty that was manually disabled.

### Exam cues

- If the question says cover existing and future accounts, think `ALL`, because `NEW` covers only accounts joining after the setting is applied.
- If the question says an existing member opted into a Region after joining, think `ALL` or individual enablement, because `NEW` requires opting in before joining.
- If the question says centralize member alerts, think an administrator-account EventBridge rule, because it can match applicable member findings.
- If the question says quarantine a potentially compromised EC2 instance, think EventBridge and response code, because a finding alone is not an isolation action.
- If the question says a changed S3 threat list has no effect, think reactivation, because GuardDuty uses the updated list only when it is Active.
- If the question says test an alert without a real threat, think sample findings, because they contain placeholder values and can exercise the rule.
- If the question says deploy GuardDuty where it may already exist, think a Lambda-backed CloudFormation custom resource, because it can check state before enabling.

### Remember

- New finding IDs reach EventBridge in near real time. Updates for recurring findings default to 6 hours; 15 minutes and 1 hour are alternatives.
- GuardDuty retains findings for 90 days. Export to S3 for longer retention.
- Automatically suppressed findings are not sent to EventBridge; manually archived findings continue to be sent.
- Changing an EC2 security group does not terminate existing tracked connections.
- In an opt-in Region, an administrator that has opted out cannot auto-enable GuardDuty for disabled members.

> **Trap:** A GuardDuty finding does not itself quarantine an instance. A separate response must perform isolation; replacing security groups does not end existing tracked connections.
