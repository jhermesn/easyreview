---
title: "PLACEHOLDER transcribe/more-essentials"
level: foundational
order: 20
facts:
  - id: features
    text: Amazon Transcribe supports language customization, content filtering for privacy, multi-channel audio and identifying individual speakers.
    source: https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html#what-is
  - id: toxicity-detection
    text: "Transcribe toxicity detection uses audio cues such as tone and pitch together with text cues to classify toxic speech into seven categories: sexual harassment, hate speech, threat, abuse, profanity, insult and graphic."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/toxicity.html#toxicity
  - id: pii-redaction
    text: "Amazon Transcribe can redact PII from transcripts, producing only a redacted transcript or both redacted and unredacted versions."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/pii-redaction.html#pii-redaction
cards:
  - id: transcribe-003
    q: A meeting recording has three speakers. Which Amazon Transcribe feature labels who said what?
    a: Speaker partitioning, which separates the speech of individual speakers.
    facts: [features]
  - id: transcribe-007
    q: "An online game must flag abusive voice chat. Which AWS feature analyzes both how something is said and what is said?"
    a: "Amazon Transcribe toxicity detection, which combines tone and pitch with the text to classify seven categories of toxic speech."
    facts: [toxicity-detection]
  - id: transcribe-008
    q: "Call recordings must be transcribed without customer names or card numbers in the text. What does Transcribe offer?"
    a: "PII redaction, which outputs a redacted transcript (optionally also an unredacted one)."
    facts: [pii-redaction]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
