---
title: Language translation
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Translate is a text translation service that uses machine learning to provide high-quality translation on demand.
    source: https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is
  - id: uses
    text: Amazon Translate is used to translate company content and communications such as email, in-game chat and customer service chat, and to build multilingual applications.
    source: https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-use-cases
cards:
  - id: translate-001
    q: An online store wants product reviews shown in each customer's language. Which AWS service fits?
    a: Amazon Translate, which translates text on demand with machine learning.
    facts: [purpose, uses]
  - id: translate-002
    q: A game wants players who speak different languages to chat with each other. Which AWS service helps?
    a: Amazon Translate, which can translate in-game chat.
    facts: [uses]
  - id: translate-003
    q: Can Amazon Translate translate a spoken phone call directly from audio?
    a: Not by itself. Translate works on text; first convert speech to text with Amazon Transcribe.
    trap: true
    facts: [purpose]
---
Amazon Translate translates text between languages on demand. Applications use it to serve customers in their own language and to process content written in other languages. [What is Amazon Translate?](https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is)

### How it works

1. Send text and choose the source and target languages.
2. Translate returns the translated text in real time, or processes documents in batches.
3. Combine with Transcribe for speech and Polly to speak the result.

### Exam cues

- If the question says translate text, chat or documents between languages, think Amazon Translate.

### Remember

- Text in, text out; for speech, pair it with Transcribe and Polly.

> **Trap:** Detecting which language a text is in is also a Comprehend feature, but translating it is Amazon Translate.
