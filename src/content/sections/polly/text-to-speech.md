---
title: Text to speech
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Polly is a cloud service that converts text into lifelike speech, supporting multiple languages and a variety of voices.
    source: https://docs.aws.amazon.com/polly/latest/dg/what-is.html#what-is
  - id: pricing
    text: With Amazon Polly you pay only for the text you synthesize, and you can cache and replay generated speech at no additional cost.
    source: https://docs.aws.amazon.com/polly/latest/dg/what-is.html#what-is
  - id: voices
    text: Amazon Polly offers generative, long-form, neural and standard text-to-speech voices.
    source: https://docs.aws.amazon.com/polly/latest/dg/what-is.html#what-is
  - id: lexicons
    text: "Polly pronunciation lexicons, stored per Region in the W3C PLS format, customize how words are pronounced, for example reading an abbreviation as its full form."
    source: https://docs.aws.amazon.com/polly/latest/dg/managing-lexicons.html#managing-lexicons
  - id: ssml
    text: "Speech Synthesis Markup Language (SSML) tags let you control aspects of Polly speech such as pronunciation, volume, speech rate and pauses."
    source: https://docs.aws.amazon.com/polly/latest/dg/ssml.html#ssml
  - id: speech-marks
    text: "Polly speech marks are metadata about where sentences and words start and end in the audio, used for lip-syncing or highlighting words as they are spoken."
    source: https://docs.aws.amazon.com/polly/latest/dg/speechmarks.html#speechmarks
cards:
  - id: polly-001
    q: An e-learning platform wants its course text read aloud in a natural voice. Which AWS service fits?
    a: Amazon Polly, which converts text into lifelike speech.
    facts: [purpose]
  - id: polly-002
    q: How is Amazon Polly priced, and does replaying the same generated audio cost more?
    a: You pay for the text you synthesize; caching and replaying the speech costs nothing extra.
    facts: [pricing]
  - id: polly-003
    q: Does Amazon Polly convert recorded speech into text?
    a: No. Polly turns text into speech; speech to text is Amazon Transcribe.
    trap: true
    facts: [purpose]
  - id: polly-004
    q: "Polly must say \"World Wide Web Consortium\" every time the text says W3C. Which feature does this?"
    a: "A pronunciation lexicon, which defines how specific words or abbreviations are spoken."
    facts: [lexicons]
  - id: polly-005
    q: "An app must highlight each word on screen as Polly speaks it. What does it request from Polly?"
    a: "Speech marks, metadata that give where each word and sentence starts and ends in the audio."
    facts: [speech-marks]
  - id: polly-006
    q: "How do you add a pause or change the speaking rate in one part of a Polly text?"
    a: "Write the text in SSML, whose tags control pauses, speech rate, volume and pronunciation."
    facts: [ssml]
---
Amazon Polly reads text out loud in natural-sounding voices, in many languages. It's used for accessibility, e-learning, newsreaders and voice responses. [What is Amazon Polly?](https://docs.aws.amazon.com/polly/latest/dg/what-is.html#what-is)

### How it works

1. Send text to Polly and choose a voice and language.
2. Polly returns an audio stream or file.
3. Store and replay the audio as often as needed at no extra cost.

### Exam cues

- If the question says text to speech or read content aloud, think Amazon Polly.
- If the question says control pronunciation of a word, think lexicons; pauses and rate, think SSML; lip-sync or word highlighting, think speech marks.

### Remember

- Pay for text synthesized; replaying cached speech is free.

> **Trap:** Polly is text to speech; Transcribe is speech to text. The direction decides the answer.
