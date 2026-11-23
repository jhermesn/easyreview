---
title: SaaS data integration
level: associate
order: 10
facts:
  - id: saas-transfer
    text: AppFlow is a managed integration service for exchanging data between supported SaaS
      applications such as Salesforce and AWS services such as S3 and Redshift without custom flow
      code.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html#what-is-appflow
  - id: connector-support
    text: AppFlow sources and destinations depend on the connector; an application is not necessarily
      supported in both directions.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/app-specific.html#app-specific
  - id: connection-profile
    text: Creating a flow selects source and destination connections and requires permission to use the
      selected connector profile through UseConnectorProfile.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html#create-flow-console
  - id: trigger-modes
    text: AppFlow supports on-demand, event-triggered, and schedule-triggered flows.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers
  - id: event-source
    text: Event-triggered flows require a source SaaS application that supplies change events.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-event
  - id: scheduled-frequency
    text: A scheduled flow frequency depends on the source application capabilities.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: full-transfer
    text: A scheduled full transfer copies a snapshot of all source records at the time of the run.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: incremental-transfer
    text: Scheduled incremental transfer copies new or changed records since the last successful run;
      the selected source timestamp field determines which changes are identified.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: creation-timestamp
    text: Choosing a Created Date source timestamp for incremental transfer selects newly created
      records but does not select edits to existing records.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: initial-window
    text: The first scheduled run pulls 30 days of past records; an on-demand filtered initial run can
      load another range before switching to an incremental schedule.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: incremental-offset
    text: An incremental schedule can use a time offset to accommodate delayed source timestamps; the
      default offset is zero and its value must be less than ten hours.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/flow-triggers.html#flow-triggers-schedule
  - id: field-map
    text: AppFlow supports field mapping through the console or an uploaded CSV file pairing source and
      destination fields.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html#create-flow-console
  - id: field-transform
    text: Flow configuration can concatenate fields, mask or truncate values, and validate fields with a
      configured action for bad data.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html#create-flow-console
  - id: record-filter
    text: AppFlow record filters select which records to transfer; multiple filters combine with AND
      logic.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/create-flow-console.html#create-flow-console
  - id: encrypted-credentials
    text: AppFlow stores application connection credentials in Secrets Manager encrypted using KMS keys.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/data-protection.html#encryption-rest
  - id: encrypted-transfer
    text: AppFlow secures transferred data in transit with TLS 1.2 and supports AWS managed or customer
      managed KMS keys for flow data encryption.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/data-protection.html#encryption-transit
  - id: private-transfer
    text: Private flows use PrivateLink for the data transfer with supported SaaS applications; the SaaS
      account must be enabled for PrivateLink.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/private-flows.html#private-flows
  - id: public-metadata
    text: Even for a private flow, console calls that list source objects and fields use public
      endpoints; the flow data transfer uses PrivateLink endpoints.
    source: https://docs.aws.amazon.com/appflow/latest/userguide/private-flows.html#private-flows
  - id: dms-cdc
    text: AWS DMS supports ongoing database change data capture by reading database change logs, which
      is a different use case from SaaS connector flows.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html#CHAP_Task.CDC
cards:
  - id: appflow-001
    q: A team needs to ingest Salesforce data into Amazon S3 on a recurring schedule without custom
      integration code. What can it use?
    a: Amazon AppFlow can transfer data from supported SaaS applications to AWS services on a
      schedule.
    facts:
      - saas-transfer
      - trigger-modes
  - id: appflow-002
    q: A team needs a recurring Salesforce to S3 ingestion of new and changed records. Which AppFlow
      transfer mode fits?
    a: A scheduled incremental transfer copies new or changed records since the last successful run.
    facts:
      - saas-transfer
      - incremental-transfer
  - id: appflow-003
    q: A team wants Amazon AppFlow to ingest data when a SaaS record changes. What must the source
      support?
    a: The source SaaS application must supply change events for an event-triggered flow.
    facts:
      - event-source
  - id: appflow-004
    q: A team needs a complete snapshot of SaaS records in Amazon S3 every day. Which AppFlow
      ingestion pattern fits?
    a: Use a scheduled full transfer. Each run copies a snapshot of all source records.
    facts:
      - saas-transfer
      - full-transfer
  - id: appflow-005
    q: A team needs to start a SaaS data transfer manually when requested. Which Amazon AppFlow
      trigger fits?
    a: Use an on-demand flow.
    facts:
      - trigger-modes
  - id: appflow-006
    q: Which Amazon AppFlow trigger options support different data ingestion frequencies?
    a: Flows run on demand, at scheduled times, or in response to change events from a supported source.
    facts:
      - trigger-modes
      - event-source
  - id: appflow-007
    q: A team plans frequent scheduled SaaS ingestion with Amazon AppFlow. What determines the
      available schedule frequency?
    a: The source application capabilities determine the available frequency.
    facts:
      - scheduled-frequency
  - id: appflow-008
    q: An Amazon AppFlow scheduled ingestion must include edits to existing SaaS records. Is Created
      Date alone a suitable incremental timestamp?
    a: No. Created Date selects newly created records and misses edits to existing records. Choose a
      timestamp that captures the required changes.
    trap: true
    facts:
      - creation-timestamp
      - incremental-transfer
  - id: appflow-009
    q: An Amazon AppFlow flow must regularly transfer only new or changed SaaS records. Which transfer option fits?
    a: Use a scheduled incremental transfer. It copies records added or changed since the last successful run, based on the selected source timestamp field.
    facts:
      - incremental-transfer
diagrams:
  - id: appflow-saas-to-s3
    title: Move configured application records into S3
    width: 1000
    height: 230
    nodes:
      - id: source
        label: SaaS application
        icon: res-client
        tone: user
        x: 25
        y: 85
        w: 230
        h: 72
      - id: flow
        label: AppFlow
        icon: appflow
        tone: integration
        x: 365
        y: 85
        w: 230
        h: 72
      - id: s3
        label: S3 destination
        icon: simple-storage-service
        tone: storage
        x: 705
        y: 85
        w: 230
        h: 72
    edges:
      - from: source
        to: flow
        step: 1
        label: source records
      - from: flow
        to: s3
        step: 2
        label: mapped records
    steps:
      - The selected trigger starts a flow using the configured application connection.
      - AppFlow applies configured mappings and filters and transfers the selected records to S3.
---

Amazon AppFlow transfers data between supported applications and AWS services using configured connections and mappings. Software as a service (SaaS) means an application hosted and operated by its provider. A flow is the transfer definition; its connector determines how AppFlow communicates with the source or destination.

### How it works

1. Choose a supported source and destination, such as Salesforce and S3. Check direction support for the connector. A connection holds application access settings; its connector profile must be usable by the identity creating the flow through `UseConnectorProfile`.
2. Select a trigger, the condition that starts a run, using the table below. Scheduled flows can copy all records or just records added or changed since the last successful run.
3. Map source fields to destination fields in the console or with a CSV file, a text file containing comma-separated pairs. Add value changes such as masking, validation rules for bad data, and filters selecting the records to transfer.
4. For incremental schedules, select a timestamp field that captures the required changes. Use an offset if the source records changes late, so the transfer window allows for that delay.
5. AppFlow encrypts connection credentials with KMS and stores them in Secrets Manager. Data transfer uses TLS 1.2, which encrypts data moving across the network. PrivateLink can keep the actual transfer off the public internet for supported SaaS connections.

| Trigger | Starts when | Constraint |
|---|---|---|
| On demand | A user manually runs the flow | Run it for each transfer |
| Event | The source produces the chosen change event | Source must support change events |
| Schedule | The recurring schedule runs | Frequency depends on the source; choose full or incremental |

### Exam cues

- If the question says move Salesforce records to S3 without custom integration code, think AppFlow, because it provides managed application connections and data flows.
- If the question says copy new and edited records periodically, think incremental scheduling with an appropriate timestamp field, because Created Date alone misses edits.
- If the question says mask fields and select records during transfer, think AppFlow value modifications and filters, because those operations are part of flow configuration.
- If the question says replicate ongoing database transaction-log changes, think DMS change data capture, because that mechanism reads database logs rather than using a SaaS flow connector.

### Remember

- The first scheduled run pulls 30 days of past records. For another initial range, use a filtered on-demand run before switching to incremental scheduling.
- Incremental offset defaults to zero and must be less than ten hours.
- Multiple record filters combine with AND: records must satisfy all those filters.
- Private transfer requires a supported connector and a PrivateLink-enabled SaaS account.

> **Trap:** A private AppFlow data transfer does not make every console API call private. Calls that list source objects and fields still use public endpoints.

> **Trap:** A listed connector is not a promise of both source and destination support or every trigger type. Check its supported direction and events.
