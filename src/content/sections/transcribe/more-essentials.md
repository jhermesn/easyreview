---
title: Speakers, privacy and toxicity
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
Amazon Transcribe can identify individual speakers and help handle sensitive or toxic speech in transcripts.

### How it works

1. Use speaker partitioning to distinguish individual speakers in the audio.
2. Use toxicity detection to classify speech using text and audio cues such as tone and pitch.
3. Use personally identifiable information (PII) redaction to remove PII from the transcript. Choose a redacted transcript alone or both redacted and unredacted versions.

### Exam cues

- If a meeting transcript needs to show who spoke, think speaker partitioning, because it identifies individual speakers.
- If a game needs to flag abusive voice chat, think toxicity detection, because it uses both audio and text cues.
- If a call transcript must omit customer names or card numbers, think PII redaction, because it produces a redacted transcript.

### Remember

- Toxicity detection classifies speech into seven categories, including abuse, threats and profanity.
- PII redaction can produce a redacted transcript alone or alongside an unredacted transcript.

> **Trap:** Toxicity detection uses tone and pitch as well as text; it does not rely on text cues alone.
