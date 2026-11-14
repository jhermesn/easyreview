---
title: Speech to text
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Transcribe is an automatic speech recognition service that uses machine learning to convert audio to text, standalone or inside applications.
    source: https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html#what-is
  - id: modes
    text: Amazon Transcribe transcribes media in real time (streaming) or files stored in Amazon S3 (batch).
    source: https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html#what-is
  - id: features
    text: Amazon Transcribe supports language customization, content filtering for privacy, multi-channel audio and identifying individual speakers.
    source: https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html#what-is
cards:
  - id: transcribe-001
    q: A call center wants written transcripts of recorded customer calls. Which AWS service fits?
    a: Amazon Transcribe, which converts speech to text.
    facts: [purpose]
  - id: transcribe-002
    q: Can Amazon Transcribe produce captions for a live stream as it happens?
    a: Yes. It supports real-time streaming transcription as well as batch files in Amazon S3.
    facts: [modes]
  - id: transcribe-003
    q: A meeting recording has three speakers. Which Amazon Transcribe feature labels who said what?
    a: Speaker partitioning, which separates the speech of individual speakers.
    facts: [features]
  - id: transcribe-004
    q: Does Amazon Transcribe translate the transcript into another language?
    a: No. It produces text in the spoken language; translation is Amazon Translate.
    trap: true
    facts: [purpose]
---
Amazon Transcribe turns speech into text. It works on live audio streams and on recorded files, and can separate speakers and filter sensitive content. [What is Amazon Transcribe?](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html#what-is)

### How it works

1. Stream audio, or point Transcribe at a media file in Amazon S3.
2. Transcribe returns the text, with options such as speaker labels and custom vocabulary.
3. Feed the text to other services, such as Comprehend for analysis or Translate for other languages.

### Exam cues

- If the question says speech to text, transcripts or captions, think Amazon Transcribe.

### Remember

- Real time (streaming) or batch (S3 files).

> **Trap:** Transcribe is speech to text; Polly is the reverse.
