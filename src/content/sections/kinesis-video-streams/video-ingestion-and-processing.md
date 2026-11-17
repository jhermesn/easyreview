---
title: Video ingestion and processing
level: associate
order: 10
facts:
  - id: what
    text: Amazon Kinesis Video Streams is a fully managed service that streams live video from devices to AWS for real-time video processing or batch video analytics.
    source: https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html#what-is-kinesis-video
  - id: sources
    text: Kinesis Video Streams captures video from millions of sources such as phones, security cameras, webcams, car cameras and drones, and also non-video time-serialized data such as audio, thermal imagery, depth and RADAR data.
    source: https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html#what-is-kinesis-video
  - id: storage
    text: A Kinesis video stream can store media for a set retention period, encrypts it at rest, and time-indexes it by producer and ingestion timestamps.
    source: https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html#what-is-kinesis-video
  - id: playback
    text: Kinesis Video Streams lets you watch live streams as they arrive, in the console or in your own application.
    source: https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html#what-is-kinesis-video
  - id: rekognition-stream
    text: "Amazon Rekognition Video analyzes live video from Kinesis Video Streams through a stream processor: face search results go to a Kinesis data stream, and label detection results (people, packages, pets) go out as SNS and S3 notifications."
    source: https://docs.aws.amazon.com/rekognition/latest/dg/streaming-video.html#streaming-video
cards:
  - id: kinesis-video-streams-001
    q: Thousands of security cameras must stream live video to AWS, where it is stored for 30 days and analyzed in real time. Which service ingests the video?
    a: "**Amazon Kinesis Video Streams**, which ingests, stores encrypted and time-indexes the media."
    facts: [what, sources, storage]
  - id: kinesis-video-streams-002
    q: Should a team send camera video frames through Amazon Kinesis Data Streams for storage and playback?
    a: "No. Video belongs in Amazon Kinesis Video Streams, which stores, time-indexes and plays back media."
    trap: true
    facts: [what, storage, playback]
  - id: kinesis-video-streams-003
    q: Besides video, what kinds of data can Amazon Kinesis Video Streams ingest?
    a: "Time-serialized media such as audio, thermal imagery, depth data and RADAR data."
    facts: [sources]
  - id: kinesis-video-streams-004
    q: "Security cameras must stream live video to AWS, and unknown people must trigger an alert. Which services fit?"
    a: "Kinesis Video Streams for ingestion and a Rekognition Video stream processor that searches faces against a collection; its results reach a Kinesis data stream, where a consumer can raise the alert."
    facts: [rekognition-stream]
---
Amazon Kinesis Video Streams is the video member of the Kinesis family. Kinesis Data Streams carries records; Kinesis Video Streams carries media from cameras and sensors, keeps it, and lets you play it back or process it. [What is Amazon Kinesis Video Streams?](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html)

### How it works

1. Devices run a producer that sends media to a Kinesis video stream.
2. The stream stores media for the retention period, encrypted and time-indexed.
3. Viewers watch live in the console or your app; consumer apps on EC2 or other services process it in real time or in batch.

### Exam cues

- If the question says stream live video from cameras, drones or phones to AWS, think Amazon Kinesis Video Streams.
- If the question says clickstream, logs or IoT records, think Kinesis Data Streams or Amazon Data Firehose instead.

### Remember

- Video plus other time-serialized media (audio, thermal, depth, RADAR).
- Encrypted at rest, time-indexed, retention period you choose.

> **Trap:** "Kinesis" alone is not enough. Records go to Kinesis Data Streams; media goes to Kinesis Video Streams.
