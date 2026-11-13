---
title: Data warehouse workloads
level: associate
order: 10
facts:
  - id: warehouse-purpose
    text: Amazon Redshift is a managed cloud data warehouse that supports SQL-based tools and business intelligence applications.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: warehouse-serverless
    text: Redshift Serverless automatically provisions resources and scales warehouse capacity.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: warehouse-provisioned
    text: Provisioned Redshift clusters are an alternative for manual resource management.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: warehouse-copy
    text: COPY reads and loads data in parallel into Redshift tables from sources including S3, subject to resource permissions.
    source: https://docs.aws.amazon.com/redshift/latest/dg/t_Loading_tables_with_the_COPY_command.html#t_Loading_tables_with_the_COPY_command
  - id: warehouse-unload
    text: UNLOAD writes query results to files in S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/r_UNLOAD.html#r_UNLOAD
  - id: warehouse-spectrum
    text: Redshift Spectrum queries data directly from files in S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum
  - id: warehouse-spectrum-region
    text: A Redshift Spectrum cluster and its S3 data files must be in the same AWS Region.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-prerequisites
  - id: warehouse-spectrum-role
    text: A cluster needs an IAM role authorizing access to the external data catalog and S3 files for Spectrum.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-create-role
  - id: warehouse-spectrum-setup
    text: Spectrum setup includes an external schema and external table before querying S3 data.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-steps
  - id: warehouse-external-definitions
    text: A Redshift external schema references an external database in a data catalog; an external table contains metadata referring to data outside the cluster.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-spectrum-external-schemas.html#c-spectrum-external-schemas
  - id: warehouse-catalog
    text: The AWS Glue Data Catalog stores technical metadata, including table descriptions, for use by Redshift Spectrum.
    source: https://docs.aws.amazon.com/glue/latest/dg/components-overview.html#data-catalog-intro
  - id: warehouse-routing
    text: Enhanced VPC routing forces COPY and UNLOAD traffic between a cluster and data repositories through its VPC, allowing VPC controls and flow logs.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-routing-support
    text: Redshift clusters and Serverless workgroups support enhanced VPC routing.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-spectrum-routing
    text: Redshift Spectrum cannot use enhanced VPC routing.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-endpoint
    text: An S3 VPC endpoint can route traffic to an S3 bucket in the same Region as the Redshift cluster or workgroup.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-gateway-endpoint
    text: An S3 gateway endpoint allows access to S3 from a VPC without an internet gateway or NAT device.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#vpc-endpoints-s3
  - id: warehouse-routing-path
    text: With enhanced VPC routing, COPY and UNLOAD can fail if the VPC lacks a network path to the data resource.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html#enhanced-vpc-routing
  - id: warehouse-vpc
    text: A VPC is a logically isolated virtual network for AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
diagrams:
  - id: redshift-enhanced-routing
    title: Enhanced VPC routing to S3
    width: 800
    height: 220
    groups:
      - { label: VPC, x: 20, y: 20, w: 500, h: 180, tone: network, icon: group-virtual-private-cloud-vpc }
    nodes:
      - { id: warehouse, label: Redshift, x: 55, y: 70, w: 140, h: 72, tone: database, icon: redshift }
      - { id: endpoint, label: VPC routing, x: 320, y: 70, w: 140, h: 72, tone: network, icon: virtual-private-cloud }
      - { id: bucket, label: S3 bucket, x: 610, y: 70, w: 140, h: 72, tone: storage, icon: res-simple-storage-service-bucket }
    edges:
      - { from: warehouse, to: endpoint, step: 1 }
      - { from: endpoint, to: bucket, step: 2 }
    steps:
      - Enhanced VPC routing sends COPY or UNLOAD traffic through the VPC.
      - An S3 endpoint provides a path to a bucket in the same Region.
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
  - id: redshift-004
    q: Does Redshift enhanced VPC routing apply to Redshift Spectrum queries?
    a: No. Enhanced VPC routing cannot be used with Redshift Spectrum.
    facts: [warehouse-spectrum-routing]
    trap: true
  - id: redshift-005
    q: A Redshift cluster needs to load large S3 datasets into warehouse tables. Which command loads data in parallel?
    a: COPY, with permission for Redshift to access the S3 data.
    facts: [warehouse-copy]
  - id: redshift-006
    q: What Region constraint applies to a Redshift Spectrum cluster and the S3 data files it queries?
    a: The cluster and S3 data files must be in the same AWS Region.
    facts: [warehouse-spectrum-region]
  - id: redshift-007
    q: A team wants Redshift warehouse capacity without manually managing a provisioned cluster. What can it choose?
    a: Redshift Serverless automatically provisions resources and scales warehouse capacity.
    facts: [warehouse-serverless]
---
Amazon Redshift is a managed cloud data warehouse for SQL analytics and business intelligence. A data warehouse is a store organized for analyzing data.

### How it works

1. Choose a provisioned cluster for manual resource management or Redshift Serverless for automatically provisioned and scaled warehouse capacity.
2. Load data into tables with COPY, which reads from sources such as S3 in parallel. Redshift needs permission to access the source.
3. To query S3 files directly, use Redshift Spectrum. Give the cluster an IAM role with access to the data catalog and files. For example, the AWS Glue Data Catalog stores descriptions of data. An external schema references a database in that catalog, and an external table describes data outside the cluster. Query the external table.
4. To control COPY and UNLOAD traffic, enable enhanced VPC routing and provide a network path. A virtual private cloud (VPC) is an isolated virtual network for AWS resources. UNLOAD exports query results; an S3 gateway endpoint connects the VPC to S3 without an internet gateway or NAT device. The bucket must be in the same Region for this path.

### Exam cues

- If the question says SQL analytics in a managed warehouse, think Redshift, because it supports SQL and business intelligence tools.
- If the question says query S3 files without loading them into the warehouse, think Spectrum, because it queries files directly.
- If the question says route COPY and UNLOAD through VPC controls, think enhanced VPC routing, because it forces that traffic through the VPC.
- If the question says COPY fails after enabling enhanced routing, think network path, because the VPC must reach the data source.

### Remember

- A Spectrum cluster and its S3 files must be in the same Region.
- Enhanced VPC routing supports clusters and Serverless workgroups, but not Spectrum.
- VPC flow logs can monitor COPY and UNLOAD traffic with enhanced routing.

> **Trap:** Spectrum queries S3 files directly. COPY loads data into Redshift tables; they are different mechanisms.
