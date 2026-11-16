---
title: Types of data for AI models
level: foundational
order: 30
facts:
  - id: structured
    text: Structured data follows a predefined schema of field names and types and is usually tabular, in rows and columns.
    source: https://aws.amazon.com/what-is/structured-data/
  - id: unstructured
    text: Unstructured data, such as free text, images, audio and video, has no predefined data model and needs techniques such as natural language processing to analyze.
    source: https://aws.amazon.com/what-is/structured-data/
  - id: labeling
    text: Data labeling adds meaningful labels to raw data, such as whether a photo contains a bird, so a supervised model can learn from it; a correctly labeled reference dataset is called ground truth.
    source: https://aws.amazon.com/what-is/data-labeling/
  - id: label-quality
    text: A trained model can only be as accurate as its ground truth, so accurate labeling is essential.
    source: https://aws.amazon.com/what-is/data-labeling/
  - id: time-series
    text: Time series data is a sequence of data points recorded over a time interval, such as a stock price, an instance's CPU use or an IoT sensor's temperature over time.
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/concepts.html
cards:
  - id: ai-ml-fundamentals-014
    q: A company wants to forecast hourly electricity demand from three years of meter readings. What type of data is this?
    a: Time series data, measurements ordered by time.
    facts: [time-series]
  - id: ai-ml-fundamentals-015
    q: Customer emails, product photos and call recordings are which kind of data?
    a: Unstructured data. It has no predefined schema, unlike rows and columns in a table.
    facts: [unstructured]
  - id: ai-ml-fundamentals-016
    q: What is "ground truth" in machine learning?
    a: A correctly labeled dataset used as the reference to train and assess a model.
    facts: [labeling]
  - id: ai-ml-fundamentals-017
    q: A model trained on carelessly labeled images performs badly. Why?
    a: A supervised model learns from its labels, so it can be no more accurate than its ground truth.
    facts: [label-quality]
  - id: ai-ml-fundamentals-018
    q: A spreadsheet of customers with age, income and plan columns is which data type?
    a: Structured, tabular data.
    facts: [structured]
---
The kind of data you have shapes which model you can build. Supervised learning needs labeled data; text, images and audio are unstructured; sales by day are time series. [Structured vs unstructured data](https://aws.amazon.com/what-is/structured-data/)

### How it works

| Data type | Example | Typical models or services |
|---|---|---|
| Structured (tabular) | Customer table | Classification, regression |
| Time series | Hourly sensor readings | Forecasting |
| Text | Reviews, emails | NLP, Amazon Comprehend, LLMs |
| Image and video | Product photos | Computer vision, Amazon Rekognition |
| Audio | Call recordings | Amazon Transcribe |

1. **Labeled** data has the answer attached and feeds supervised learning; **unlabeled** data feeds unsupervised and self-supervised learning.
2. Labels usually come from people judging raw data, so labeling quality sets the ceiling for model quality.

### Exam cues

- If the question says rows and columns with a fixed schema, think structured (tabular) data.
- If the question says readings over time or forecasting, think time series data.
- If the question says the model learns badly from inconsistent labels, think label quality and ground truth.

### Remember

- Structured = predefined schema; unstructured = no schema.
- Ground truth = the correctly labeled reference dataset.

> **Trap:** A JSON log or a CSV doesn't make the content structured for ML on its own; a column of free-text comments is still unstructured text.
