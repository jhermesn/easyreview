---
title: "S3 Lifecycle basics"
level: foundational
order: 5
facts:
  - id: lifecycle-actions
    text: "S3 Lifecycle rules move objects to cheaper storage classes after a set time (transition actions) and delete them when they expire (expiration actions)."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html#object-lifecycle-mgmt
cards:
  - id: s3-172
    q: "Logs in S3 are read for 30 days, kept for a year, then deleted. How can costs drop automatically?"
    a: "An S3 Lifecycle rule: transition to a cheaper class after 30 days, archive later, and expire after a year."
    facts: [lifecycle-actions]
---
S3 Lifecycle rules manage objects over time, moving them to cheaper storage and deleting them when no longer needed.

### How it works

1. Write a rule for a bucket or a prefix.
2. Transition actions move objects to cheaper classes after a number of days.
3. Expiration actions delete objects at the end of their retention.

### Exam cues

- If the question says move old data to cheaper storage or delete it automatically, think S3 Lifecycle.

### Remember

- Transitions and expirations, by object age.

> **Trap:** Lifecycle rules act on object age; they do not watch access patterns. S3 Intelligent-Tiering does that.
