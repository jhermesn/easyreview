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
  - id: express-directory
    text: "S3 Express One Zone stores objects in directory buckets in one Availability Zone you choose, so compute in that zone can be co-located with its storage for the lowest latency."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/directory-bucket-high-performance.html#s3-express-one-zone
  - id: storage-class-analysis
    text: "S3 Storage Class Analysis watches access patterns to help decide when to move data to STANDARD_IA; results appear after 24 to 48 hours and update daily, with optional daily export to a bucket."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html#analytics-storage-class-contents
  - id: upload-class
    text: "An S3 object upload can specify the storage class; a general purpose bucket uses S3 Standard when none is specified."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/sc-howtoset.html
  - id: ia-minimum-size
    text: "S3 Standard-IA charges for at least 128 KB per object and at least 30 days of storage."
    source: https://aws.amazon.com/s3/pricing/
  - id: one-zone-retrieval
    text: "S3 One Zone-IA charges a per-GB fee for data retrieval."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html
  - id: standard-retrieval
    text: "S3 Standard has no per-GB data retrieval charge."
    source: https://aws.amazon.com/s3/pricing/
  - id: storage-billing
    text: "S3 storage charges depend on object size, time stored and storage class."
    source: https://aws.amazon.com/s3/pricing/
  - id: deep-retrieval-cost
    text: "S3 Glacier Deep Archive retrieval charges depend on the selected retrieval tier."
    source: https://aws.amazon.com/s3/pricing/
  - id: deep-retrieval-time
    text: "S3 Glacier Deep Archive Standard retrievals typically finish within 12 hours and Bulk retrievals typically finish within 48 hours."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html
  - id: ia-storage-rates
    text: "S3 Standard-IA and S3 One Zone-IA have different storage rates."
    source: https://aws.amazon.com/s3/pricing/
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
    q: How do Amazon S3 Standard and S3 Standard-IA differ in their intended access patterns?
    a: S3 Standard is for frequently accessed data. S3 Standard-IA is for long-lived data accessed infrequently and charges retrieval fees.
    facts: [standard, standard-ia]
  - id: s3-125
    q: What should a company consider before using Amazon S3 One Zone-IA for infrequently accessed data?
    a: S3 One Zone-IA stores data in one Availability Zone and is not resilient to its loss. It suits data that can be recreated.
    facts: [one-zone-ia]
  - id: s3-161
    q: "Which Amazon S3 storage class suits a latency-sensitive application that needs fast access to objects?"
    a: "S3 Express One Zone provides single-digit millisecond access in one Availability Zone."
    facts: [express]
  - id: s3-162
    q: "Which Amazon S3 storage class suits data with unpredictable access patterns?"
    a: "S3 Intelligent-Tiering is designed for unknown or changing access patterns. It charges monitoring and automation fees but no retrieval fees."
    facts: [intelligent-tiering]
  - id: s3-207
    q: "Can an Amazon S3 upload choose the storage class for the new object?"
    a: "Yes. Specify the storage class during upload."
    facts: [upload-class]
  - id: s3-208
    q: "What minimum storage billing applies to an Amazon S3 Standard-IA object?"
    a: "At least 128 KB per object and 30 days of storage."
    facts: [ia-minimum-size]
  - id: s3-209
    q: "Does Amazon S3 One Zone-IA charge for retrieving data?"
    a: "Yes. A per-GB retrieval fee applies."
    facts: [one-zone-retrieval]
  - id: s3-210
    q: "Does Amazon S3 Standard charge a per-GB data retrieval fee?"
    a: "No. Request charges can still apply."
    facts: [standard-retrieval]
  - id: s3-211
    q: "What affects the retrieval charge for an Amazon S3 Glacier Deep Archive object?"
    a: "The selected retrieval tier, such as Standard or Bulk."
    facts: [deep-retrieval-cost]
  - id: s3-212
    q: "How long do Amazon S3 Glacier Deep Archive Standard and Bulk retrievals typically take?"
    a: "Standard typically finishes within 12 hours; Bulk typically finishes within 48 hours."
    facts: [deep-retrieval-time]
---
Amazon S3 storage classes trade access speed and frequency for price. All are designed for the same 11 nines of durability; they differ in availability, retrieval time, retrieval fees and minimum storage duration.

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

- If the question says compare S3 Standard-IA and One Zone-IA storage costs, think different rates, because their storage prices differ.
- If the question says choose a Deep Archive restore tier, think Standard for a typical 12-hour restore or Bulk for a typical 48-hour restore.
- If the question says compare S3 Glacier Deep Archive restore costs, think retrieval tier, because Standard and Bulk have different rates.
- If the question says estimate S3 storage charges, think size, storage time and class, because each affects storage billing.
- If the question says frequent reads without data retrieval fees, think S3 Standard, because it has no per-GB retrieval charge.
- If the question says read objects from S3 One Zone-IA, think retrieval charges, because reads incur a per-GB retrieval fee.
- If the question says compare costs for small short-lived objects in S3 Standard-IA, think minimum size and duration, because both affect the bill.
- If the question says choose a storage class for a new S3 object, think specify it during upload, because the class can be selected at creation.
- If the question says unknown or changing access, think Intelligent-Tiering.
- If the question says rarely accessed but needs immediate access, think Standard-IA or Glacier Instant Retrieval.
- If the question says long-term archive, cheapest, hours are fine, think Glacier Deep Archive.
- If the question says re-creatable data at lowest cost, think One Zone-IA.

### Remember

- All classes: 11 nines durability.
- Minimums: Standard-IA and One Zone-IA 30 days, Glacier IR and Flexible 90 days, Deep Archive 180 days.
- Availability: Standard 99.99%, Standard-IA and Intelligent-Tiering 99.9%, One Zone-IA 99.5%.

> **Trap:** Cheaper classes are not always cheaper overall. Frequently read data in Standard-IA or Glacier pays retrieval fees that can exceed the storage savings.
