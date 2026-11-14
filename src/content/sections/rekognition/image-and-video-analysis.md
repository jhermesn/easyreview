---
title: Image and video analysis
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Rekognition is a cloud-based image and video analysis service that adds computer vision to applications and requires no machine learning expertise.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is
  - id: features
    text: Amazon Rekognition detects objects, text and unsafe content, analyzes images and videos, and compares faces.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is
  - id: faces
    text: Rekognition face APIs detect, analyze and compare faces for uses such as user verification, cataloging, people counting and public safety.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is
  - id: s3
    text: Rekognition's API can analyze image and video files stored in Amazon S3.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is
cards:
  - id: rekognition-001
    q: A social media app must flag inappropriate images uploaded by users. Which AWS service fits?
    a: Amazon Rekognition, which detects unsafe content in images and videos.
    facts: [features]
  - id: rekognition-002
    q: A company wants to verify users by comparing a selfie with their ID photo. Which AWS service helps?
    a: Amazon Rekognition, with its face comparison APIs.
    facts: [faces]
  - id: rekognition-003
    q: Which AWS service identifies objects and scenes in images stored in Amazon S3?
    a: Amazon Rekognition.
    facts: [features, s3]
  - id: rekognition-004
    q: Does Amazon Rekognition require a team to train its own deep learning models?
    a: No. It provides pre-built computer vision through an API; no ML expertise is needed.
    trap: true
    facts: [purpose]
---
Amazon Rekognition analyzes images and videos: what objects and scenes appear, whether there is text or unsafe content, and whose face it is. It works through an API, with no models to build. [What is Amazon Rekognition?](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is)

### How it works

1. Store images or videos in Amazon S3, or send them to the API.
2. Call the feature you need: labels, text, content moderation, or face detection and comparison.
3. Use the results in your application, such as tagging, filtering or verifying users.

### Exam cues

- If the question says detect objects, faces or inappropriate content in images or video, think Amazon Rekognition.

### Remember

- Image and video analysis; face comparison; content moderation.

> **Trap:** Extracting form fields and tables from scanned documents is Amazon Textract, not Rekognition.
