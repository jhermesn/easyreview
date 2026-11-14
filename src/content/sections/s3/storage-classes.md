---
title: Storage classes
level: foundational
order: 2
facts:
  - id: standard
    text: S3 Standard is the default storage class, for frequently accessed data (more than once a month) with millisecond access, no minimum storage duration and 99.99% designed availability.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: intelligent-tiering
    text: S3 Intelligent-Tiering is for data with unknown, changing or unpredictable access patterns; it charges per-object monitoring and automation fees but no retrieval fees.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: standard-ia
    text: S3 Standard-IA is for long-lived, infrequently accessed data (about once a month) with millisecond access, a 30-day minimum storage duration and per-GB retrieval fees.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: one-zone-ia
    text: S3 One Zone-IA stores data in one Availability Zone for re-creatable, infrequently accessed data; it has a 30-day minimum and is not resilient to the loss of that AZ.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: express
    text: S3 Express One Zone gives single-digit millisecond access for latency-sensitive applications in one Availability Zone you choose.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: glacier-ir
    text: S3 Glacier Instant Retrieval is for archive data accessed about once a quarter that needs millisecond access, with a 90-day minimum storage duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: glacier-flexible
    text: S3 Glacier Flexible Retrieval is for archives accessed about once a year, with retrieval in minutes to hours, a 90-day minimum, and objects restored before access.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: deep-archive
    text: S3 Glacier Deep Archive is for archives accessed less than once a year, with retrieval in hours and a 180-day minimum storage duration; it is the lowest-cost class.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: same-durability
    text: All of these storage classes are designed for 99.999999999% durability.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare
  - id: lowest-cost
    text: Amazon S3 archives data at the lowest costs in S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#RRS
  - id: availability
    text: "S3 storage classes are designed for different availability: S3 Standard 99.99%, Standard-IA, Intelligent-Tiering and Glacier Instant Retrieval 99.9%, and One Zone-IA 99.5%."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html
cards:
  - id: s3-118
    q: A company's data is accessed in unpredictable patterns. Which Amazon S3 storage class moves it between tiers automatically without retrieval fees?
    a: S3 Intelligent-Tiering.
    facts: [intelligent-tiering]
  - id: s3-119
    q: Monthly reports are read about once a month but must open in milliseconds. Which Amazon S3 storage class fits at lower cost than S3 Standard?
    a: S3 Standard-IA, with a 30-day minimum and per-GB retrieval fees.
    facts: [standard-ia]
  - id: s3-120
    q: A company must keep compliance archives for 10 years and reads them less than once a year; retrieval within hours is fine. Which Amazon S3 storage class is cheapest?
    a: S3 Glacier Deep Archive, with retrieval in hours and a 180-day minimum.
    facts: [deep-archive]
  - id: s3-121
    q: Medical images are rarely read, but when needed they must open in milliseconds. Which Amazon S3 archive class fits?
    a: S3 Glacier Instant Retrieval, for data accessed about once a quarter with millisecond access.
    facts: [glacier-ir]
  - id: s3-122
    q: A company stores thumbnails it can regenerate from originals. Which Amazon S3 storage class is cheapest for infrequent access?
    a: S3 One Zone-IA. It keeps data in one AZ, which is acceptable for re-creatable data.
    facts: [one-zone-ia]
  - id: s3-123
    q: Is S3 One Zone-IA as resilient as S3 Standard-IA?
    a: No. One Zone-IA keeps data in a single AZ and is not resilient to that AZ's loss; Standard-IA uses at least three AZs.
    trap: true
    facts: [one-zone-ia, standard-ia]
  - id: s3-124
    q: What are the minimum storage durations of S3 Standard-IA, S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive?
    a: 30 days, 90 days and 180 days.
    facts: [standard-ia, glacier-flexible, deep-archive]
  - id: s3-125
    q: Which S3 storage class has the lowest designed availability, and why?
    a: S3 One Zone-IA, designed for 99.5%, because it stores data in a single Availability Zone.
    facts: [availability]
---
Amazon S3 storage classes trade access speed and frequency for price. All are designed for the same 11 nines of durability; they differ in availability, retrieval time, retrieval fees and minimum storage duration. [Comparing the Amazon S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare)

### How it works

1. Pick a class per object, by how often and how fast it is read.
2. The less often data is read, the cheaper the storage, with retrieval fees and minimum durations added.
3. Lifecycle rules can move objects to cheaper classes as they age.

| Class | Access pattern | Retrieval | Min duration | AZs |
|---|---|---|---|---|
| S3 Standard | Frequent | Milliseconds | None | 3 or more |
| S3 Intelligent-Tiering | Unknown or changing | Milliseconds; no retrieval fees | None | 3 or more |
| S3 Express One Zone | Latency-sensitive | Single-digit milliseconds | None | 1 |
| S3 Standard-IA | About once a month | Milliseconds | 30 days | 3 or more |
| S3 One Zone-IA | Once a month, re-creatable | Milliseconds | 30 days | 1 |
| S3 Glacier Instant Retrieval | About once a quarter | Milliseconds | 90 days | 3 or more |
| S3 Glacier Flexible Retrieval | About once a year | Minutes to hours | 90 days | 3 or more |
| S3 Glacier Deep Archive | Less than once a year | Hours | 180 days | 3 or more |

### Exam cues

- If the question says unknown or changing access, think Intelligent-Tiering.
- If the question says rarely accessed but needs immediate access, think Standard-IA or Glacier Instant Retrieval.
- If the question says long-term archive, cheapest, hours are fine, think Glacier Deep Archive.
- If the question says re-creatable data at lowest cost, think One Zone-IA.

### Remember

- All classes: 11 nines durability.
- Minimums: Standard-IA and One Zone-IA 30 days, Glacier IR and Flexible 90 days, Deep Archive 180 days.
- Availability: Standard 99.99%, Standard-IA and Intelligent-Tiering 99.9%, One Zone-IA 99.5%.

> **Trap:** Cheaper classes are not always cheaper overall. Frequently read data in Standard-IA or Glacier pays retrieval fees that can exceed the storage savings.
