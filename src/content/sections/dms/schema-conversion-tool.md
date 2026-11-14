---
title: Schema conversion
level: foundational
order: 5
facts:
  - id: sct
    text: The AWS Schema Conversion Tool (AWS SCT) converts an existing database schema from one database engine to another, for OLTP or data warehouse schemas.
    source: https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html#CHAP_Welcome
  - id: sct-targets
    text: AWS SCT output suits Amazon RDS for MySQL, MariaDB, Oracle, SQL Server and PostgreSQL, Amazon Aurora and Amazon Redshift, and can also be used with a database on Amazon EC2.
    source: https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html#CHAP_Welcome
  - id: dms-sc
    text: DMS Schema Conversion is a feature of AWS DMS that converts source schemas to a format compatible with Aurora, Amazon RDS or Amazon Redshift.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion
  - id: schema-not-data
    text: DMS Schema Conversion converts the database schema, not the data; data migration uses the data migration features of AWS DMS.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion
  - id: assessment
    text: DMS Schema Conversion can run an assessment showing what converts automatically and what needs manual work, then apply the converted code to the target or export it as SQL scripts.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion
cards:
  - id: dms-013
    q: A company is migrating an Oracle database to Amazon Aurora PostgreSQL. Which AWS tools convert the schema?
    a: AWS Schema Conversion Tool (AWS SCT) or DMS Schema Conversion. AWS DMS then migrates the data.
    facts: [sct, dms-sc, schema-not-data]
  - id: dms-014
    q: Does AWS Schema Conversion Tool also copy the data to the new database engine?
    a: No. Schema conversion converts the schema; AWS DMS migrates the data.
    trap: true
    facts: [schema-not-data]
  - id: dms-015
    q: Before converting a database schema with DMS Schema Conversion, how can a team see how much manual work the conversion needs?
    a: Run an assessment. It shows what converts automatically and what needs manual work.
    facts: [assessment]
---
When a database moves to a different engine, such as Oracle to Amazon Aurora PostgreSQL, its schema has to be converted before the data can follow. That conversion covers tables, views and code. AWS SCT and DMS Schema Conversion do it; AWS DMS moves the data. [AWS SCT](https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html#CHAP_Welcome)

### How it works

1. Create a migration project with source and target databases.
2. Run an assessment to see what converts automatically and what needs manual work. [DMS Schema Conversion](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_SchemaConversion.html#CHAP_SchemaConversion)
3. Convert the schema and apply it to the target, or export it as SQL scripts.
4. Migrate the data with AWS DMS, with change data capture if the source stays live.

| Migration | Schema step | Data step |
|---|---|---|
| Same engine (homogeneous), such as MySQL to Amazon RDS for MySQL | Usually none | AWS DMS |
| Different engine (heterogeneous), such as Oracle to Aurora PostgreSQL | AWS SCT or DMS Schema Conversion | AWS DMS |

### Exam cues

- If the question says change database engines, think schema conversion first, then AWS DMS for the data.
- If the question says estimate the manual effort of a conversion, think the assessment report.

### Remember

- Schema conversion converts structure and code, not data.
- Targets include Amazon RDS engines, Aurora and Redshift.

> **Trap:** AWS DMS alone does not rewrite an Oracle schema for PostgreSQL. A heterogeneous migration needs schema conversion too.
