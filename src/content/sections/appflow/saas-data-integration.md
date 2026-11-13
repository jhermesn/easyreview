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
    q: Which AWS service transfers data between supported SaaS applications and AWS services without
      custom integration code?
    a: Amazon AppFlow. Configure a supported source and destination, such as Salesforce to S3, and
      define its transfer trigger and mappings.
    facts:
      - saas-transfer
      - trigger-modes
      - field-map
  - id: appflow-002
    q: A team needs a recurring Salesforce-to-S3 transfer of newly created and updated records. How
      should it configure AppFlow?
    a: Use a schedule-triggered incremental flow and a timestamp field that captures the required
      updates. Created Date alone selects new records and misses edits to existing ones.
    facts:
      - saas-transfer
      - incremental-transfer
      - creation-timestamp
  - id: appflow-003
    q: A team wants AppFlow to start when a SaaS record changes. Is that possible for every connector?
    a: No. Event-triggered flows require a source application that provides change events. Check source
      support before choosing the trigger.
    trap: true
    facts:
      - event-source
  - id: appflow-004
    q: An AppFlow integration must mask a field and exclude records that fail selection criteria before
      transfer. Does it need a custom transformation service?
    a: Use AppFlow value modification and record filters. Configuration supports masking or truncation,
      field validation, and filters selecting records to transfer.
    facts:
      - field-transform
      - record-filter
  - id: appflow-005
    q: A private AppFlow transfer still makes public calls while listing SaaS objects in the console.
      Has its private data path necessarily failed?
    a: No. Console metadata API calls use public endpoints, while the flow data transfer uses
      PrivateLink. The connector and SaaS account must support that private transfer.
    trap: true
    facts:
      - public-metadata
      - private-transfer
  - id: appflow-006
    q: A team must copy an existing database and continuously apply changes from its transaction logs.
      Which service fits this requirement?
    a: AWS DMS with change data capture for ongoing database changes. AppFlow addresses data exchange
      through supported application connectors.
    facts:
      - dms-cdc
      - saas-transfer
  - id: appflow-007
    q: An AppFlow scheduled incremental transfer misses source changes whose timestamps arrive late.
      Which option can account for this delay?
    a: Configure an incremental time offset. It shifts the transfer window to allow source timestamp
      delays; its default is zero and it must be less than ten hours.
    facts:
      - incremental-offset
  - id: appflow-008
    q: An AppFlow initial load needs more history than the first scheduled run provides. How can the
      team choose another history window?
    a: Run an on-demand flow with a filter for the required range, then change it to an incremental
      schedule. The first scheduled run otherwise pulls 30 days of past records.
    facts:
      - initial-window
  - id: appflow-009
    q: Where does AppFlow store SaaS connection credentials, and how does it protect transferred data?
    a: Connection credentials are encrypted with KMS and stored in Secrets Manager. Data in transit uses
      TLS 1.2; flow encryption can use AWS managed or customer managed KMS keys.
    facts:
      - encrypted-credentials
      - encrypted-transfer
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
