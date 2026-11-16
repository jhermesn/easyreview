---
title: Text analysis
level: foundational
order: 10
facts:
  - id: nlp
    text: Amazon Comprehend uses natural language processing (NLP) to extract insights about documents by recognizing entities, key phrases, language, sentiment and other common elements.
    source: https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html#what-is
  - id: examples
    text: Amazon Comprehend can search social media feeds for product mentions or scan a document repository for key phrases.
    source: https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html#what-is
  - id: modes
    text: Amazon Comprehend runs real-time analysis for small workloads or asynchronous jobs for large document sets, with pre-trained models or custom models for classification and entity recognition.
    source: https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html#what-is
  - id: custom-entities
    text: "Amazon Comprehend custom entity recognition finds entity types of your own, such as product codes or business-specific terms, beyond the preset generic entity types, with automatic annotation and model training."
    source: https://docs.aws.amazon.com/comprehend/latest/dg/custom-entity-recognition.html#custom-entity-recognition
  - id: comprehend-medical
    text: "Amazon Comprehend Medical uses NLP to detect medical information such as conditions, medications and test results in unstructured clinical text like physician notes and discharge summaries."
    source: https://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html#comprehendmedical-welcome
cards:
  - id: comprehend-001
    q: A company wants to know whether customer reviews are positive or negative. Which AWS service fits?
    a: Amazon Comprehend, which detects sentiment in text with natural language processing.
    facts: [nlp]
  - id: comprehend-002
    q: Which AWS service extracts entities and key phrases from a large set of text documents?
    a: Amazon Comprehend.
    facts: [nlp, modes]
  - id: comprehend-003
    q: A marketing team wants to find mentions of its products in social media posts. Which AWS service helps?
    a: Amazon Comprehend.
    facts: [examples]
  - id: comprehend-004
    q: Does Amazon Comprehend read text out of scanned images of documents?
    a: No. Comprehend analyzes text it is given; extracting text from scanned documents is Amazon Textract.
    trap: true
    facts: [nlp]
  - id: comprehend-005
    q: "A food company must extract its own ingredient names from product descriptions, which aren't among Amazon Comprehend's built-in entity types. Which feature fits?"
    a: "Amazon Comprehend **custom entity recognition**, trained on the company's own entity types."
    facts: [custom-entities]
  - id: comprehend-006
    q: "Which AWS service extracts medical entities from physician notes, discharge summaries and test results?"
    a: "Amazon Comprehend Medical, the clinical-text version of Comprehend."
    facts: [comprehend-medical]
---
Amazon Comprehend reads text and tells you what's in it: the people, places and organizations mentioned, key phrases, the language and the sentiment. It needs no machine learning expertise. [What is Amazon Comprehend?](https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html#what-is)

### How it works

1. Send text to the API, or start a job over documents in Amazon S3.
2. Comprehend returns entities, key phrases, language and sentiment.
3. Train custom classifiers or entity recognizers when the built-in models aren't specific enough.

### Exam cues

- If the question says sentiment, entities or key phrases in text, think Amazon Comprehend.

### Remember

- Real-time for small workloads, asynchronous jobs for large sets.

> **Trap:** Comprehend analyzes text; it doesn't transcribe speech (Amazon Transcribe) or extract text from images (Amazon Textract).
