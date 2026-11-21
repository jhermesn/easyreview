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
  - id: transcribe-medical
    text: "Amazon Transcribe Medical is automatic speech recognition for medical speech, such as physician-dictated notes, telemedicine appointments and physician-patient conversations."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/transcribe-medical.html#transcribe-medical
  - id: language-identification
    text: "Amazon Transcribe can identify the languages spoken in media without a language code, including all languages in multilingual media."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/lang-id.html#lang-id
  - id: custom-vocabulary
    text: "Custom vocabularies improve recognition of specific words such as brand names, acronyms and proper nouns, using hints such as pronunciations."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/custom-vocabulary.html#custom-vocabulary
  - id: custom-language-models
    text: "Custom language models are trained on domain-specific text so Transcribe learns the context in which words are used; they improve accuracy for specialized speech beyond what custom vocabularies do."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/custom-language-models.html#custom-language-models
  - id: healthscribe
    text: "AWS HealthScribe is a HIPAA-eligible capability that combines speech recognition and generative AI to transcribe patient-clinician conversations and generate clinical notes for review."
    source: https://docs.aws.amazon.com/transcribe/latest/dg/health-scribe.html#health-scribe
cards:
  - id: transcribe-001
    q: A call center wants written transcripts of recorded customer calls. Which AWS service fits?
    a: Amazon Transcribe, which converts speech to text.
    facts: [purpose]
  - id: transcribe-002
    q: Can Amazon Transcribe produce captions for a live stream as it happens?
    a: Yes. It supports real-time streaming transcription as well as batch files in Amazon S3.
    facts: [modes]
  - id: transcribe-004
    q: Does Amazon Transcribe translate the transcript into another language?
    a: No. It produces text in the spoken language; translation is Amazon Translate.
    trap: true
    facts: [purpose]
  - id: transcribe-005
    q: "Which AWS service turns physician dictation and doctor-patient conversations into text?"
    a: "Amazon Transcribe Medical, speech recognition built for medical vocabulary."
    facts: [transcribe-medical]
  - id: transcribe-006
    q: "A company wants to convert recorded speech into text. Which AWS AI service fits?"
    a: "Amazon Transcribe uses machine learning to convert audio to text."
    facts: [purpose]
  - id: transcribe-009
    q: "A healthcare software vendor wants clinical notes drafted automatically from recorded doctor-patient visits. Which AWS capability fits?"
    a: "AWS HealthScribe, which transcribes the conversation and generates clinical notes with generative AI, and is HIPAA eligible."
    facts: [healthscribe]
---
Amazon Transcribe turns speech into text. It works on live audio streams and on recorded files.

### How it works

1. Stream audio, or point Transcribe at a media file in Amazon S3.
2. Transcribe returns the text, with options such as custom vocabulary.
3. Feed the text to other services, such as Comprehend for analysis or Translate for other languages.

### Exam cues

- If the question says speech to text, transcripts or captions, think Amazon Transcribe.
- If the question says individual words such as acronyms, think custom vocabulary; for the context of specialized speech, think custom language models. Custom vocabularies and custom language models

### Remember

- Real time (streaming) or batch (S3 files).

> **Trap:** Transcribe is speech to text; Polly is the reverse.
