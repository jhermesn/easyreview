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
  - id: custom-terminology
    text: "Amazon Translate custom terminology files make brand names, character names, model names and other unique terms translate the way you specify."
    source: https://docs.aws.amazon.com/translate/latest/dg/how-custom-terminology.html#how-custom-terminology
  - id: parallel-data
    text: "Parallel data gives Amazon Translate example translations so a batch job (Active Custom Translation) adapts to your style, tone and word choices; these jobs cost more."
    source: https://docs.aws.amazon.com/translate/latest/dg/customizing-translations-parallel-data.html#customizing-translations-parallel-data
  - id: batch-translation
    text: "Asynchronous batch translation translates large document collections, up to 5 GB, from an Amazon S3 input folder to an S3 output location."
    source: https://docs.aws.amazon.com/translate/latest/dg/async.html#async
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
  - id: translate-004
    q: "Amazon Translate keeps translating a product brand name into the target language. How do you keep it unchanged?"
    a: "Use a custom terminology file that specifies how the brand name must be translated."
    facts: [custom-terminology]
  - id: translate-005
    q: "A law firm wants Amazon Translate batch output to follow its formal style and word choices. What does it provide?"
    a: "Parallel data: example source texts with the desired translations, used by an Active Custom Translation batch job."
    facts: [parallel-data]
---
Amazon Translate translates text between languages on demand. Applications use it to serve customers in their own language and to process content written in other languages. [What is Amazon Translate?](https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is)

### How it works

1. Send text and choose the source and target languages.
2. Translate returns the translated text in real time, or processes documents in batches.
3. Combine with Transcribe for speech and Polly to speak the result.

### Exam cues

- If the question says translate text, chat or documents between languages, think Amazon Translate.
- If the question says keep brand names as is, think custom terminology; match a house style in batch jobs, think parallel data.

### Remember

- Text in, text out; for speech, pair it with Transcribe and Polly.

> **Trap:** Detecting which language a text is in is also a Comprehend feature, but translating it is Amazon Translate.
