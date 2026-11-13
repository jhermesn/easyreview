---
title: Cross-account routing
level: professional
order: 40
facts:
  - id: cross-purpose
    text: EventBridge can send events from a rule in one account to a receiving bus in another account.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: receiver-policy
    text: The receiving bus resource policy must allow the sender account or organization.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-receiving-events-from-another-account
  - id: sender-target
    text: The sender configures the receiving bus as a rule target using its ARN.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-create-rule-cross-account-target
  - id: sender-role
    text: Cross-account event-bus targets created after March 2, 2023 require an IAM role; older targets without
      one are unaffected.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-receiving-events-from-another-account
  - id: receiver-rule
    text: Rules on the receiving bus select forwarded events for its local targets.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: account-filter
    text: Adding account IDs in the account pattern field restricts which event origins can trigger a receiving
      rule.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-writing-rules-that-match-events-from-another-account
  - id: no-third-hop
    text: An event received from another account is not forwarded onward to a third account.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: no-bus-chain
    text: An event forwarded between buses in one account is not forwarded onward to a third bus.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: cross-region
    text: Cross-account bus routing can also cross Regions when the destination Region supports cross-Region
      reception.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html#eb-cross-account
  - id: cross-account-input
    text: Input, InputPath and InputTransformer cannot be specified on a rule target that is an event bus in a different account.
    source: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutTargets.html#API_PutTargets
diagrams:
  - id: eventbridge-cross-account-routing
    title: Authorize the sender and filter again in the receiver
    width: 1030
    height: 200
    nodes:
      - id: sender
        label: Sender rule
        sub: target role attached
        icon: res-eventbridge-rule
        x: 30
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: bus
        label: Receiving bus
        sub: policy allows sender
        icon: eventbridge
        x: 290
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: rule
        label: Receiver rule
        sub: filters origin account
        icon: res-eventbridge-rule
        x: 550
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: target
        label: Local target
        sub: processes matches
        icon: lambda
        x: 810
        y: 60
        w: 190
        h: 86
        tone: compute
    edges:
      - from: sender
        to: bus
        step: 1
      - from: bus
        to: rule
        step: 2
      - from: rule
        to: target
        step: 3
    steps:
      - The sending rule targets the receiver bus ARN using an IAM role.
      - The receiving bus permits the sender and its rule selects the expected account events.
      - A receiving rule invokes its local target.
cards:
  - id: eventbridge-004
    q: What permissions and routing are needed for an EventBridge rule to send events to a bus in another account?
    a: Allow the sender in the receiving bus resource policy, target that bus ARN from the sending rule, and
      supply the sending target role. Add receiving rules with an `account` filter for expected origins.
    facts:
      - receiver-policy
      - sender-target
      - sender-role
      - receiver-rule
      - account-filter
  - id: eventbridge-005
    q: EventBridge forwards an event from account A to a bus in B, whose rule targets a bus in C. Does C receive
      that forwarded event?
    a: No. EventBridge does not forward that received event onward to a third account. Configure direct routing
      from the originating account to each required destination.
    trap: true
    facts:
      - no-third-hop
      - cross-purpose
  - id: eventbridge-028
    q: A shared EventBridge receiver unexpectedly triggers a local rule for another account's events. What should
      the rule add?
    a: Add the intended originating account IDs in the `account` field of its event pattern.
    facts:
      - account-filter
  - id: eventbridge-029
    q: An EventBridge team plans to route an event through three buses in one account. Will forwarding through the
      middle bus reach the third?
    a: No. EventBridge does not forward an already forwarded event onward through that bus chain.
    trap: true
    facts:
      - no-bus-chain
  - id: eventbridge-042
    q: A team sends an EventBridge rule's event to a bus in another account and wants to transform the payload on that sending target. Can it configure an InputTransformer there?
    a: No. InputTransformer, InputPath and Input are unavailable on a cross-account event-bus target. Transform at an eligible receiving target instead.
    trap: true
    facts:
      - cross-account-input
      - receiver-rule
---
Cross-account EventBridge routing sends selected events to a bus owned by another AWS account. It lets a central account receive events while each sender keeps its own rules.

### How it works

1. Attach a resource policy, permissions stored on the receiving bus, allowing the sender account or AWS organization.
2. In the sender, create a rule that targets the receiving bus's Amazon Resource Name (ARN), its AWS identifier. Attach an IAM role with permission to send events there.
3. In the receiver, create rules for the forwarded events. Include the originating `account` IDs to keep unrelated account events from triggering a matching local rule.
4. Deliver matches to the receiver's local targets. Do not design an onward chain to another account or a third bus.
5. Apply any required target input transformation on an eligible receiving target. A cross-account event-bus target cannot use `Input`, `InputPath` or `InputTransformer`.

Since March 2023, new cross-account event-bus targets require an IAM role. AWS specifies the cutoff as March 2, 2023; older targets without roles are unaffected. Routing may also cross Regions when the destination Region supports reception.

### Exam cues

- If the question says centralize events from many accounts, think receiving bus policy plus sender rules and roles, because both reception and sending need authorization.
- If the question says another account's events trigger a local-only rule, think an `account` filter, because a matching rule otherwise also accepts authorized incoming events.
- If the question says forward A to B to C, think direct routes from the origin, because received events are not forwarded onward to a third account.

### Remember

- Receiver: bus resource policy and matching rules.
- Sender: receiving bus ARN as target and an IAM role.
- New target role requirement: after March 2, 2023.
- A third-account hop and a three-bus forwarding chain are unsupported.
- Cross-account bus targets cannot use `Input`, `InputPath` or `InputTransformer`.

> **Trap:** Trusting the sender in the receiving bus policy does not configure the sender's target role. Both sides need their part of the routing setup.
