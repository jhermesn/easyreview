---
title: Archive and replay
level: associate
order: 30
facts:
  - id: archive-purpose
    text: An EventBridge archive retains bus events for later replay to recover processing or test functionality.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive
  - id: archive-pattern
    text: An archive can select events using an event pattern.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-archive
  - id: archive-retention
    text: Archive retention is specified in days and defaults to indefinite retention.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-archive
  - id: archive-source
    text: An archive receives events from one source bus, and that association cannot be changed.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-archive
  - id: replay-source
    text: A replay can send archived events only to the original source bus.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-replay
  - id: replay-selection
    text: A replay selects an event time range and can be limited to specific rules on the source bus.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-replay
  - id: replay-retains
    text: Replaying does not remove events from the archive, so the same events can be replayed again.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-replay
  - id: replay-order
    text: Replay does not guarantee original order and processes events in one-minute intervals based on event
      time.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-replay-considerations
  - id: replay-marker
    text: Replayed events have replay-name metadata, and an EventBridge managed rule excludes them from archiving
      again.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-managed-rule
  - id: archive-delay
    text: AWS recommends waiting 10 minutes before replay to allow archive delivery to catch up.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html#eb-archive-timing
diagrams:
  - id: eventbridge-archive-replay
    title: Archive capture and replay return to the source bus
    width: 1030
    height: 200
    nodes:
      - id: source
        label: Source bus
        sub: captures matching events
        icon: eventbridge
        x: 30
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: archive
        label: Archive
        sub: retains captured events
        icon: eventbridge
        x: 290
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: same
        label: Same source bus
        sub: receives replay
        icon: eventbridge
        x: 550
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: target
        label: Rule target
        sub: processes replay
        icon: lambda
        x: 810
        y: 60
        w: 190
        h: 86
        tone: compute
    edges:
      - from: source
        to: archive
        step: 1
      - from: archive
        to: same
        step: 2
      - from: same
        to: target
        step: 3
    steps:
      - The archive captures selected incoming events from its fixed source bus.
      - A replay sends a chosen event time range back to that same bus.
      - Selected rules route replayed events to their targets; replay-name prevents archiving them again.
cards:
  - id: eventbridge-008
    q: A team fixed an EventBridge consumer and needs to reprocess last week's captured events. What should it
      use?
    a: Replay the existing archive for that time range to its source bus, optionally limiting delivery to selected
      rules. An archive can filter captured events and defaults to indefinite retention.
    facts:
      - archive-purpose
      - replay-selection
      - replay-source
      - archive-pattern
      - archive-retention
  - id: eventbridge-009
    q: What ordering and metadata should an EventBridge archive replay consumer expect?
    a: Original order is not guaranteed. Replay processes one-minute intervals of event time and adds
      `replay-name`. Replayed events are excluded from archiving again.
    trap: true
    facts:
      - replay-order
      - replay-marker
  - id: eventbridge-026
    q: A team wants to test one updated EventBridge consumer without replaying archived events to every rule. What
      can it configure?
    a: Select the relevant rules when starting replay. The destination must still be the archive's source bus.
    facts:
      - replay-selection
      - replay-source
  - id: eventbridge-027
    q: An EventBridge archive was replayed once. Must a team create a new archive before replaying the same
      retained events again?
    a: No. Replay leaves events in the archive, so they can be replayed again while retained.
    trap: true
    facts:
      - replay-retains
---
An EventBridge archive stores selected bus events so they can be sent through processing again. Replay resends those stored events to the bus that first received them, which helps recover from consumer errors or test changed processing.

### How it works

1. Create an archive on the source bus. An optional event pattern selects what it captures. Set retention in days or leave the default of indefinite retention.
2. Allow events to enter the archive. AWS recommends waiting 10 minutes before replay so archive delivery can catch up.
3. Start replay with a time range. Its destination is the original source bus, and you can limit replay to selected rules there.
4. EventBridge processes the range in one-minute intervals based on event time. Original arrival order is not guaranteed.
5. Each replayed event receives `replay-name` metadata, information identifying its replay. A managed rule, a rule maintained by EventBridge, prevents those events from entering the archive again. The archived originals remain available for another replay while retained.

### Exam cues

- If the question says repair a consumer and reprocess captured events, think archive replay, because the stored events can pass through the source bus again.
- If the question says test only one changed rule, think replay with selected rules, because replay can limit which source-bus rules receive the events.
- If the question says replay into a different bus, think the original source-bus restriction, because an archive cannot choose a new destination bus.

### Remember

- One archive has one fixed source bus.
- Retention defaults to indefinite; a configured duration is in days.
- Replay uses one-minute event-time intervals and does not guarantee original order.
- `replay-name` identifies replayed events and prevents archive recapture.
- Replay does not consume the archived originals.

> **Trap:** Replay reads an archive. Creating an archive after a processing incident does not supply events that the archive never captured.
