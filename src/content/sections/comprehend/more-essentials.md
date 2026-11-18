---
title: "PLACEHOLDER comprehend/more-essentials"
level: foundational
order: 20
facts:
  - id: custom-entities
    text: "Amazon Comprehend custom entity recognition finds entity types of your own, such as product codes or business-specific terms, beyond the preset generic entity types, with automatic annotation and model training."
    source: https://docs.aws.amazon.com/comprehend/latest/dg/custom-entity-recognition.html#custom-entity-recognition
  - id: custom-classification
    text: "Comprehend custom classification trains a classifier on categories you define, such as support request types, then classifies a single document in real time or a document set asynchronously; it accepts plain text, PDF, Word and images."
    source: https://docs.aws.amazon.com/comprehend/latest/dg/how-document-classification.html#how-document-classification
  - id: targeted-sentiment
    text: "Comprehend targeted sentiment gives the sentiment for each specific entity in a document, such as a product or brand, while sentiment analysis gives one dominant sentiment for the whole document."
    source: https://docs.aws.amazon.com/comprehend/latest/dg/how-targeted-sentiment.html#how-targeted-sentiment
cards:
  - id: comprehend-005
    q: "A food company must extract its own ingredient names from product descriptions, which aren't among Amazon Comprehend's built-in entity types. Which feature fits?"
    a: "Amazon Comprehend **custom entity recognition**, trained on the company's own entity types."
    facts: [custom-entities]
  - id: comprehend-007
    q: "A company wants to route incoming customer emails into its own categories, such as billing, support and complaints. Which Comprehend feature fits?"
    a: "Custom classification: train a classifier on labeled examples of each category, then classify new emails in real time or in batch."
    facts: [custom-classification]
  - id: comprehend-008
    q: "A review says \"the tacos were delicious but the service was slow\". Which Comprehend feature shows a separate sentiment for the food and for the service?"
    a: "Targeted sentiment, which scores each entity. Plain sentiment analysis returns one dominant sentiment for the whole review."
    facts: [targeted-sentiment]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
