---
title: "PLACEHOLDER redshift/design-details"
level: associate
order: 20
facts:
  - id: warehouse-purpose
    text: Amazon Redshift is a managed cloud data warehouse that supports SQL-based tools and business intelligence applications.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: warehouse-spectrum
    text: Redshift Spectrum queries data directly from files in S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum
  - id: warehouse-spectrum-setup
    text: Spectrum setup includes an external schema and external table before querying S3 data.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-steps
  - id: warehouse-spectrum-role
    text: A cluster needs an IAM role authorizing access to the external data catalog and S3 files for Spectrum.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-create-role
  - id: warehouse-routing
    text: Enhanced VPC routing forces COPY and UNLOAD traffic between a cluster and data repositories through its VPC, allowing VPC controls and flow logs.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-routing-path
    text: With enhanced VPC routing, COPY and UNLOAD can fail if the VPC lacks a network path to the data resource.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-copy
    text: COPY reads and loads data in parallel into Redshift tables from sources including S3, subject to resource permissions.
    source: https://docs.aws.amazon.com/redshift/latest/dg/t_Loading_tables_with_the_COPY_command.html#t_Loading_tables_with_the_COPY_command
  - id: multi-az
    text: "Provisioned RA3 (and RG) clusters support Multi-AZ deployments that run compute in two Availability Zones to keep working through a zone failure."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-multi-az.html#managing-cluster-multi-az
cards:
  - id: redshift-001
    q: Which AWS service provides a managed SQL data warehouse for analytics?
    a: Amazon Redshift provides a managed cloud warehouse for SQL and business intelligence tools.
    facts: [warehouse-purpose]
  - id: redshift-002
    q: How can Amazon Redshift query external files in S3 directly?
    a: Use Redshift Spectrum with an external schema, an external table, and permission to access the catalog and S3.
    facts: [warehouse-spectrum, warehouse-spectrum-setup, warehouse-spectrum-role]
  - id: redshift-003
    q: A team must control Redshift COPY and UNLOAD network traffic through its VPC. What should it enable?
    a: Enhanced VPC routing, then configure a network path to the data resource.
    facts: [warehouse-routing, warehouse-routing-path]
  - id: redshift-005
    q: A Redshift cluster needs to load large S3 datasets into warehouse tables. Which command loads data in parallel?
    a: COPY, with permission for Redshift to access the S3 data.
    facts: [warehouse-copy]
  - id: redshift-011
    q: "A Redshift data warehouse must survive an Availability Zone failure without a restore. What deployment fits?"
    a: "A Multi-AZ deployment on RA3 nodes."
    facts: [multi-az]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
