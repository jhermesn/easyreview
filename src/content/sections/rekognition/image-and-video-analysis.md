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
  - id: collection-features
    text: Rekognition IndexFaces stores facial feature information and metadata in a collection without storing the image bytes.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/add-faces-to-collection-procedure.html
  - id: face-search-video
    text: Rekognition can search a face collection for faces detected in a video stored in Amazon S3.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/procedure-person-search-videos.html
  - id: private-endpoint
    text: An interface VPC endpoint provides private access to Rekognition without an internet gateway.
    source: https://docs.aws.amazon.com/rekognition/latest/dg/vpc.html

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
    q: "Which AWS AI service can help an application identify inappropriate images and videos?"
    a: "Amazon Rekognition can detect inappropriate, unwanted or offensive images and videos."
    facts: [content-moderation]
  - id: rekognition-007
    q: "A bank's identity check must confirm a real person is in front of the camera, not a photo or video. Which Rekognition feature fits?"
    a: "Face Liveness, which analyzes a short video selfie and detects spoof attacks."
    facts: [face-liveness]
  - id: rekognition-008
    q: "A construction company wants to analyze site photos for protective equipment. Which AWS AI service can help?"
    a: "Amazon Rekognition can detect protective equipment such as head, face and hand covers in images."
    facts: [ppe-detection]
  - id: rekognition-009
    q: Does an Amazon Rekognition face collection store the original image bytes when IndexFaces adds a face?
    a: No. It stores facial feature information and metadata without the image bytes.
    trap: true
    facts: [collection-features]
  - id: rekognition-010
    q: How can an application call Amazon Rekognition privately from a VPC without an internet gateway?
    a: Use an interface VPC endpoint for Rekognition.
    facts: [private-endpoint]
  - id: rekognition-011
    q: What inputs does Amazon Rekognition use to search a stored video for known faces?
    a: A face collection and a video stored in Amazon S3.
    facts: [face-search-video]
---
Amazon Rekognition analyzes images and videos: what objects and scenes appear, whether there is text or unsafe content, and whose face it is. It works through an API, with no models to build.

### How it works

1. Store images or videos in Amazon S3, or send them to the API.
2. Call the feature you need: labels, text, content moderation, or face detection and comparison.
3. Use the results in your application, such as tagging, filtering or verifying users.

### Exam cues

- If the question says call Rekognition from a private VPC, think an interface VPC endpoint, because it provides access without an internet gateway.
- If the question says search faces in a stored video, think a Rekognition face collection and an Amazon S3 video, because the video search compares detected faces with the collection.
- If the question says detect objects, faces or inappropriate content in images or video, think Amazon Rekognition.
- If the question says find your own logo or products, think Custom Labels; unsafe images, think content moderation; spoofed selfies, think Face Liveness; hard hats, think PPE detection.

### Remember

- Image and video analysis; face comparison; content moderation.

> **Trap:** Extracting form fields and tables from scanned documents is Amazon Textract, not Rekognition.
