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
  - id: custom-labels
    text: "Rekognition Custom Labels identifies objects, logos and scenes specific to your business, such as your logo in social media posts, from a small training set of typically a few hundred images or less."
    source: https://docs.aws.amazon.com/rekognition/latest/customlabels-dg/what-is.html#what-is
  - id: content-moderation
    text: "Rekognition moderation APIs detect inappropriate, unwanted or offensive images and videos, and Custom Moderation trains an adapter on your annotated images that DetectModerationLabels then uses for higher accuracy."
    source: https://docs.aws.amazon.com/rekognition/latest/dg/moderation.html#moderation
  - id: face-liveness
    text: "Rekognition Face Liveness checks, from a short video selfie, that a user is physically present in front of the camera and detects spoof attacks, returning a confidence score."
    source: https://docs.aws.amazon.com/rekognition/latest/dg/face-liveness.html#face-liveness
  - id: ppe-detection
    text: "Rekognition DetectProtectiveEquipment finds personal protective equipment such as head, face and hand covers on people in an image."
    source: https://docs.aws.amazon.com/rekognition/latest/dg/ppe-detection.html#ppe-detection
  - id: celebrity-recognition
    text: "Rekognition celebrity recognition identifies tens of thousands of well-known people in images and videos; for other faces you search a face collection."
    source: https://docs.aws.amazon.com/rekognition/latest/dg/celebrities.html#celebrities
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
  - id: rekognition-005
    q: "A brand wants to find its own logo in social media images with only a few hundred labeled examples. Which feature fits?"
    a: "Amazon Rekognition Custom Labels, which trains a model for business-specific objects and logos from a small image set."
    facts: [custom-labels]
  - id: rekognition-006
    q: "A chatbot generates images and must block unsafe ones before returning them. Which API checks each image?"
    a: "Rekognition DetectModerationLabels. A Custom Moderation adapter trained on your images can raise its accuracy."
    facts: [content-moderation]
  - id: rekognition-007
    q: "A bank's identity check must confirm a real person is in front of the camera, not a photo or video. Which Rekognition feature fits?"
    a: "Face Liveness, which analyzes a short video selfie and detects spoof attacks."
    facts: [face-liveness]
  - id: rekognition-008
    q: "A construction company must check site photos for missing hard hats. Which Rekognition API fits?"
    a: "DetectProtectiveEquipment (PPE detection)."
    facts: [ppe-detection]
---
Amazon Rekognition analyzes images and videos: what objects and scenes appear, whether there is text or unsafe content, and whose face it is. It works through an API, with no models to build. [What is Amazon Rekognition?](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html#what-is)

### How it works

1. Store images or videos in Amazon S3, or send them to the API.
2. Call the feature you need: labels, text, content moderation, or face detection and comparison.
3. Use the results in your application, such as tagging, filtering or verifying users.

### Exam cues

- If the question says detect objects, faces or inappropriate content in images or video, think Amazon Rekognition.
- If the question says find your own logo or products, think Custom Labels; unsafe images, think content moderation; spoofed selfies, think Face Liveness; hard hats, think PPE detection.

### Remember

- Image and video analysis; face comparison; content moderation.

> **Trap:** Extracting form fields and tables from scanned documents is Amazon Textract, not Rekognition.
