---
title: Glacier retrieval
level: associate
order: 70
facts:
  - id: glacier-instant
    text: Glacier Instant Retrieval objects are immediately readable with GET.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-restore
    text: Glacier Flexible Retrieval and Deep Archive objects require RestoreObject before reading.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-expedited
    text: Flexible Retrieval Expedited typically makes objects smaller than 250 MB available in 1 to 5
      minutes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-standard
    text: Flexible Retrieval Standard retrievals typically finish in 3 to 5 hours.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-bulk
    text: Flexible Retrieval Bulk retrievals typically finish in 5 to 12 hours.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: deep-standard
    text: Deep Archive Standard retrievals typically finish within 12 hours.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: deep-bulk
    text: Deep Archive Bulk retrievals typically finish within 48 hours.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: deep-no-expedited
    text: Deep Archive has no Expedited retrieval option.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-default-tier
    text: Standard is the default retrieval tier when none is specified.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
  - id: glacier-capacity
    text: Each provisioned capacity unit supports at least three Expedited retrievals per 5 minutes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-expedited-capacity
  - id: glacier-capacity-throughput
    text: Each provisioned capacity unit supports up to 300 MB/s of retrieval throughput.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-expedited-capacity
  - id: glacier-capacity-demand
    text: Without provisioned capacity, Expedited requests might be rejected during high demand.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-expedited-capacity
  - id: glacier-temporary
    text: Restoring Flexible Retrieval or Deep Archive creates a temporary readable copy for the
      requested number of days and leaves the archive in its class.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects.html#restoring-objects
  - id: glacier-copy
    text: To retain a restored archive in a different storage class, copy it while specifying the target
      class.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#transition-glacier-deep-archive
  - id: glacier-minimum
    text: Glacier Instant Retrieval has a 90-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: glacier-minimum-flexible
    text: Glacier Flexible Retrieval has a 90-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: glacier-minimum-deep
    text: Glacier Deep Archive has a 180-day minimum storage billing duration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#storage-class-intro
  - id: glacier-intelligent
    text: Restoring an Intelligent-Tiering Archive Access or Deep Archive Access object moves it to
      Frequent Access without a Days value.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects.html#restoring-objects
  - id: glacier-large
    text: Large archive datasets can take longer to restore than typical retrieval times.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html#restoring-objects-retrieval-options
diagrams:
  - id: s3-archive-restore-copy
    title: Making an archive permanently readable
    width: 1000
    height: 230
    nodes:
      - id: archive
        label: Archived object
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 30
        y: 80
        w: 210
        h: 72
      - id: restore
        label: Temporary copy
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 360
        y: 80
        w: 210
        h: 72
      - id: copy
        label: Standard copy
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: archive
        to: restore
        step: 1
      - from: restore
        to: copy
        step: 2
    steps:
      - RestoreObject makes a temporary readable copy of a Flexible Retrieval or Deep Archive object.
      - Copy the restored data with S3 Standard as the storage class to keep it permanently readable.
cards:
  - id: s3-022
    q: What are the normal S3 Glacier retrieval options and times?
    a: "Instant Retrieval: GET immediately. Flexible Retrieval: Expedited typically 1 to 5 minutes below
      250 MB, Standard 3 to 5 hours, Bulk 5 to 12 hours. Deep Archive: Standard within 12 hours or
      Bulk within 48 hours; no Expedited. These are typical times."
    facts:
      - glacier-instant
      - glacier-expedited
      - glacier-standard
      - glacier-bulk
      - deep-standard
      - deep-bulk
      - deep-no-expedited
      - glacier-large
  - id: s3-023
    q: How can an S3 team reserve Expedited retrieval capacity for Glacier Flexible Retrieval?
    a: Purchase provisioned capacity. Each unit supports at least three Expedited retrievals per 5
      minutes and up to 300 MB/s. Without it, high demand can cause rejection.
    facts:
      - glacier-capacity
      - glacier-capacity-throughput
      - glacier-capacity-demand
  - id: s3-052
    q: An S3 archive must be readable in milliseconds whenever requested. Which Glacier class should a
      team choose?
    a: Glacier Instant Retrieval. Flexible Retrieval and Deep Archive require restoration before reads.
    facts:
      - glacier-instant
      - glacier-restore
  - id: s3-053
    q: An S3 team must read Deep Archive data within minutes. Can provisioned Expedited capacity satisfy
      this requirement?
    a: No. Deep Archive has no Expedited option. Standard typically finishes within 12 hours; choose a
      faster-access storage class before such a requirement arises.
    trap: true
    facts:
      - deep-no-expedited
      - deep-standard
      - glacier-instant
  - id: s3-054
    q: An S3 team restores a Deep Archive object and needs to retain it in Standard permanently. What
      comes after restoration?
    a: Copy the restored object with S3 Standard as its storage class. The restore alone creates a
      temporary readable copy and leaves the archive unchanged.
    trap: true
    facts:
      - glacier-temporary
      - glacier-copy
---
S3 Glacier storage classes trade access speed for archive storage costs. Instant Retrieval stays directly readable; Flexible Retrieval and Deep Archive require a restore job before an application can read the data.

### How it works

1. Check the storage class. Use a normal `GET` for Instant Retrieval; use `RestoreObject` for Flexible Retrieval or Deep Archive.
2. Select a retrieval tier. Standard is the default if the request does not specify one. Deep Archive does not offer Expedited.
3. For Flexible Retrieval Expedited requests that need reserved capacity, purchase provisioned capacity. Without it, high demand can cause rejection.
4. Read the temporary restored copy for the requested number of days. Copy it with a different storage class if it must remain readable permanently.

| Storage class | Expedited | Standard | Bulk |
|---|---|---|---|
| Glacier Instant Retrieval | Not a restore path; use GET | Not a restore path | Not a restore path |
| Glacier Flexible Retrieval | Typically 1 to 5 minutes below 250 MB | Typically 3 to 5 hours | Typically 5 to 12 hours |
| Glacier Deep Archive | Unavailable | Typically within 12 hours | Typically within 48 hours |

### Exam cues

- If the question says an S3 archive must be immediately readable, think Glacier Instant Retrieval, because it needs no restore.
- If the question says S3 Flexible Retrieval needs reserved urgent retrieval capacity, think provisioned capacity, because on-demand Expedited requests can be rejected.
- If the question says an S3 restore must become a permanent Standard object, think restore then copy, because restoration alone is temporary.

### Remember

- Flexible Retrieval Expedited is typically 1 to 5 minutes for objects smaller than 250 MB. Large datasets can take longer.
- Each provisioned unit supports at least three Expedited requests per 5 minutes and up to 300 MB/s.
- Minimum billed storage is 90 days for Instant and Flexible, 180 days for Deep Archive.
- Intelligent-Tiering archive restores move data to Frequent Access and do not accept a `Days` value.

> **Trap:** Provisioned capacity does not add Expedited retrieval to Deep Archive.
