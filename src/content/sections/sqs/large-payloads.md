---
title: Large payloads
level: associate
order: 40
facts:
  - id: native-size
    text: SQS accepts an individual message up to 1,048,576 bytes, or 1 MiB.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: size-change
    text: In August 2025, SQS increased its native maximum payload from 256 KiB to 1 MiB for standard and FIFO queues.
    source: https://aws.amazon.com/about-aws/whats-new/2025/08/amazon-sqs-max-payload-size-1mib/
  - id: extended-storage
    text: The SQS Extended Client Libraries for Java and Python store a large payload in S3 and send an object reference through SQS.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-managing-large-messages.html#sqs-managing-large-messages
  - id: extended-size
    text: The Extended Client Library supports payloads up to 2 GB stored in S3.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: extended-queues
    text: The Extended Client Libraries work with both standard and FIFO queues.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-managing-large-messages.html#sqs-managing-large-messages
  - id: extended-sync
    text: The Extended Client Library supports synchronous clients only.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: extended-retrieve
    text: The Extended Client Library retrieves the referenced S3 payload for a consumer and can delete the S3 payload.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/extended-client-library-python.html#extended-client-library-python
  - id: extended-permissions
    text: S3 object uploads, reads, and deletes require the corresponding s3:PutObject, s3:GetObject, and s3:DeleteObject permissions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html#iam-policy-ex0
  - id: python-deletion
    text: The Python Extended Client example sets delete_payload_from_s3=True when deleting the corresponding S3 payload with the queue message.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/extended-client-library-python.html#extended-client-library-python
  - id: batch-size
    text: SendMessageBatch accepts up to ten messages; both individual message size and total batch payload are limited to 1 MiB.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessageBatch.html#API_SendMessageBatch
  - id: batch-errors
    text: SendMessageBatch can report individual failures even when its HTTP status is 200.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessageBatch.html#API_SendMessageBatch
diagrams:
  - id: sqs-large-payload-reference-flow
    title: S3 stores the payload while SQS carries its reference
    width: 900
    height: 330
    nodes:
      - id: producer
        label: Producer
        icon: res-client
        x: 30
        y: 60
        w: 170
        h: 72
        tone: user
      - id: queue
        label: SQS reference
        icon: simple-queue-service
        x: 340
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: s3
        label: S3 payload
        icon: simple-storage-service
        x: 340
        y: 220
        w: 170
        h: 72
        tone: storage
      - id: consumer
        label: Consumer
        icon: res-client
        x: 650
        y: 60
        w: 170
        h: 72
        tone: user
    edges:
      - from: producer
        to: s3
        step: 1
      - from: producer
        to: queue
        step: 2
      - from: queue
        to: consumer
        step: 3
      - from: consumer
        to: s3
        step: 4
    steps:
      - The extended client stores the large payload in S3.
      - The producer sends an object reference through SQS.
      - The consumer receives the reference from the queue.
      - The extended client reads the referenced S3 object for processing.
cards:
  - id: sqs-004
    q: A team must send an SQS payload larger than the native message limit. What should it use?
    a: Use the SQS Extended Client Library for Java or Python. It stores payloads up to 2 GB in S3 and sends an object reference through SQS. Consumers need S3 read permissions.
    facts:
      - native-size
      - extended-storage
      - extended-size
      - extended-permissions
  - id: sqs-022
    q: An SQS consumer receives an object reference rather than the original large payload. What must its processing path do?
    a: Use the Extended Client Library or equivalent reference-aware processing to retrieve the S3 object. Authorize s3:GetObject for the payload. The full data is stored in S3.
    facts:
      - extended-storage
      - extended-retrieve
      - extended-permissions
  - id: sqs-023
    q: A team sends several individually valid SQS messages with SendMessageBatch, but their combined payload exceeds 1 MiB. Is that request within the limit?
    a: No. SendMessageBatch has a 1 MiB total payload limit as well as the individual message limit, and accepts at most ten messages.
    trap: true
    facts:
      - batch-size
  - id: sqs-024
    q: An SQS SendMessageBatch request returns HTTP 200. Can the producer assume every message was sent successfully?
    a: No. Inspect the per-message results for individual failures even when the request returns HTTP 200.
    trap: true
    facts:
      - batch-errors
  - id: sqs-025
    q: An SQS Python Extended Client consumer must remove its S3 payload when deleting the queue message. What documented setting applies?
    a: Set delete_payload_from_s3=True for payload deletion and authorize s3:DeleteObject. Queue access alone does not grant S3 object access.
    facts:
      - python-deletion
      - extended-permissions
  - id: sqs-026
    q: Does SQS FIFO support the Extended Client Library payload-offloading pattern?
    a: Yes. The Java and Python Extended Client Libraries support standard and FIFO queues, with synchronous clients.
    facts:
      - extended-queues
      - extended-sync
---
SQS carries messages up to 1 MiB. For a larger payload, the Extended Client Library stores the data in S3 and queues a reference, an address the consumer uses to retrieve the object. The queue carries the work notification while S3 holds the large content.

### How it works

1. Check the native message limit before choosing offloading, meaning storing the payload outside the queue. In August 2025, SQS raised that maximum from 256 KiB to 1 MiB for both standard and FIFO queues.
2. Use the Extended Client Library for Java or Python to write a payload to S3 and send its reference through SQS. The S3 payload can be up to 2 GB. The libraries support standard and FIFO queues with synchronous clients, whose operations wait for a response.
3. On receive, the extended client retrieves the referenced object. Give the producer and consumer the necessary S3 permissions: `s3:PutObject` to write, `s3:GetObject` to read, and `s3:DeleteObject` when deleting payloads.
4. Configure payload cleanup as well as message deletion. The Python example uses `delete_payload_from_s3=True` when removing the S3 payload with the queue message.
5. For ordinary SQS batch sends, check both message count and aggregate size. `SendMessageBatch` permits up to ten messages with a total payload no larger than 1 MiB. Inspect per-message results even when the HTTP response is 200, because individual entries can fail.

### Exam cues

- If the question says send data larger than the SQS native limit, think S3 plus the Extended Client Library, because the queue can carry a reference to larger data.
- If the question says the consumer reads SQS but cannot load the payload, think S3 object access, because queue permissions do not grant `s3:GetObject`.
- If the question says a batch of individually valid messages exceeds the combined size limit, think smaller batches, because aggregate size also has a ceiling.
- If the question says a successful batch request lost some messages, think per-entry failures, because HTTP success does not mean every entry succeeded.

### Remember

- Native message: 1 MiB, or 1,048,576 bytes. The previous 256 KiB service limit changed in August 2025.
- Offloaded payload: up to 2 GB in S3, with an SQS reference.
- `SendMessageBatch`: at most 10 messages and 1 MiB total payload.
- Extended clients support Java and Python, standard and FIFO queues, and synchronous clients.

> **Trap:** The Extended Client Library does not raise the size of an SQS message. It moves the large content to S3 and sends a reference that fits through SQS.
