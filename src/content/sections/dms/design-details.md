---
title: "PLACEHOLDER dms/design-details"
level: associate
order: 30
facts:
  - id: dms-schema
    text: DMS Schema Conversion assesses and converts schemas and code for a different target engine; objects it cannot convert automatically require manual conversion.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.HighLevelView.html
  - id: dms-sct
    text: AWS Schema Conversion Tool is an alternative to DMS Schema Conversion for converting source schemas.
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html
  - id: s3-source
    text: "AWS DMS can use Amazon S3 as a source, reading CSV or Parquet files for a full load and new files for ongoing changes."
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.S3.html#CHAP_Source.S3
  - id: kinesis-target
    text: "AWS DMS can use Amazon Kinesis Data Streams as a target."
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Kinesis.html#CHAP_Target.Kinesis
  - id: endpoint-ssl
    text: "AWS DMS can encrypt source and target endpoint connections with SSL by assigning a certificate, such as an imported certificate authority (CA) certificate, to the endpoint."
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Security.SSL.html#CHAP_Security.SSL
  - id: dynamodb-target
    text: "AWS DMS can migrate data into a DynamoDB table, with a relational database or MongoDB as the source."
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.DynamoDB.html#CHAP_Target.DynamoDB
  - id: assessment
    text: DMS Schema Conversion can run an assessment showing what converts automatically and what needs manual work, then apply the converted code to the target or export it as SQL scripts.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion
cards:
  - id: dms-012
    q: A team is migrating to a different database engine with AWS DMS. How can it convert the source schema?
    a: Use DMS Schema Conversion or AWS Schema Conversion Tool. Manually convert objects that automatic conversion cannot handle.
    facts: [dms-schema, dms-sct]
  - id: dms-016
    q: "Existing S3 data files and every later change to them must stream into Kinesis Data Streams quickly, with little code. What can bridge them?"
    a: "AWS DMS, with S3 as the source endpoint and Kinesis Data Streams as the target endpoint, running a full load plus ongoing changes."
    facts: [s3-source, kinesis-target]
  - id: dms-017
    q: "A DMS replication from an on-premises MySQL database must encrypt the connection to the source. What do you configure?"
    a: "An SSL connection on the DMS endpoint, with the database CA certificate imported into DMS and assigned to it."
    facts: [endpoint-ssl]
  - id: dms-018
    q: "An application embedded NoSQL data on its servers and now needs a managed NoSQL store. Can AWS DMS move MongoDB data into DynamoDB?"
    a: "Yes. DMS supports DynamoDB as a target, with a relational database or MongoDB as the source."
    facts: [dynamodb-target]
  - id: dms-015
    q: Before converting a database schema with DMS Schema Conversion, how can a team see how much manual work the conversion needs?
    a: Run an assessment. It shows what converts automatically and what needs manual work.
    facts: [assessment]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
