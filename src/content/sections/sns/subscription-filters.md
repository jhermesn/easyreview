---
title: Subscription filters
level: associate
order: 20
facts:
  - id: default-all
    text: Without a filter policy, an SNS subscription receives every message published to its topic.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
  - id: per-subscription
    text: A filter policy is a JSON object attached to a subscription that selects which messages SNS sends to
      that subscriber.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
  - id: attribute-default
    text: FilterPolicyScope defaults to MessageAttributes.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering-scope.html#sns-message-filtering-scope
  - id: body-scope
    text: "FilterPolicyScope: MessageBody applies filtering to message-body properties."
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering-scope.html#sns-message-filtering-scope
  - id: json-body
    text: Message-body filtering assumes the payload is a well-formed JSON object.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
  - id: match
    text: Each policy property must match a corresponding message attribute or body property, with at least one
      matching value per property.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
  - id: ignore-extra
    text: Message attributes or body properties not specified in the filter policy are ignored during evaluation.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
  - id: operators
    text: SNS filtering supports exact string matching, prefixes, suffixes, anything-but, numeric matching, and
      other documented operators.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
  - id: propagation
    text: Filter policy additions or changes can take up to 15 minutes to fully take effect.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
  - id: nonmatch
    text: SNS does not deliver a message to a subscription when it fails that subscription filter.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
cards:
  - id: sns-001
    q: An SNS subscriber needs only messages matching attributes or body content. What should the team configure?
    a: A subscription filter policy. It evaluates MessageAttributes by default; set FilterPolicyScope to
      MessageBody for a well-formed JSON body.
    facts:
      - per-subscription
      - attribute-default
      - body-scope
      - json-body
  - id: sns-014
    q: An SNS message contains a routing field only inside its JSON body, but the subscription filter still uses
      the default scope. What should change?
    a: Set FilterPolicyScope to MessageBody. The default MessageAttributes scope does not inspect body fields.
    facts:
      - attribute-default
      - body-scope
  - id: sns-015
    q: An SNS subscription filter names region and severity. The message matches severity but not region. Will SNS
      deliver it?
    a: No. Each policy property must match, with at least one matching value for every property.
    facts:
      - match
      - nonmatch
  - id: sns-016
    q: A new SNS subscription filter seems to behave inconsistently immediately after an update. What documented
      behavior explains this?
    a: Eventual consistency. Filter policy changes can take up to 15 minutes to fully take effect.
    facts:
      - propagation
  - id: sns-017
    q: Does an additional SNS message attribute absent from the subscription filter make the message fail
      filtering?
    a: No. SNS ignores properties that the policy does not specify.
    facts:
      - ignore-extra
    trap: true
  - id: sns-018
    q: What does an SNS subscription receive if no filter policy is assigned?
    a: Every message published to its topic, subject to successful delivery.
    facts:
      - default-all
---
An SNS subscription filter selects messages before delivery to that subscriber. A message attribute is named metadata sent alongside the payload, while the message body is the payload itself.

### How it works

1. Attach a JSON filter policy to the subscription that needs a subset of messages. Subscriptions without a policy receive every publication.
2. Select the filter scope: `MessageAttributes` is the default; `MessageBody` inspects a well-formed JSON payload.
3. Define the properties and accepted values. Each named policy property must match, and at least one accepted value must match for each property. Extra message properties do not affect the result.
4. Choose operators that express the selection.

   | Match type | Use |
   |---|---|
   | Exact string | A particular named value |
   | Prefix or suffix | A string beginning or ending with a selected value |
   | Anything-but | A value outside an excluded selection |
   | Numeric match | A number matching the chosen condition |

5. SNS delivers matching messages to that subscription and omits nonmatches. After a policy change, allow time for eventual consistency, meaning the distributed service may temporarily use the older policy.

### Exam cues

- If the question says a routing field is inside the JSON payload, think `MessageBody`, because the default scope looks at attributes.
- If the question says different subscribers need different event categories, think subscription filter policies, because each subscription selects its own messages.
- If the question says a policy changed moments ago, think the propagation interval, because changes can take up to 15 minutes to fully apply.

### Remember

- Default scope: `MessageAttributes`.
- Body scope: `MessageBody`, requiring a well-formed JSON object.
- All named policy properties must match; values within a property provide alternatives.
- Policy updates can take up to 15 minutes.

> **Trap:** Creating a filter for a body field while leaving the default scope unchanged does not make SNS inspect the body.
