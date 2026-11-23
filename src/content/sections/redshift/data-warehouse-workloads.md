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
  - id: warehouse-unload
    text: UNLOAD writes query results to files in S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/r_UNLOAD.html#r_UNLOAD
  - id: warehouse-spectrum-region
    text: A Redshift Spectrum cluster and its S3 data files must be in the same AWS Region.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum-prerequisites
  - id: warehouse-external-definitions
    text: A Redshift external schema references an external database in a data catalog; an external table contains metadata referring to data outside the cluster.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-spectrum-external-schemas.html#c-spectrum-external-schemas
  - id: warehouse-catalog
    text: The AWS Glue Data Catalog stores technical metadata, including table descriptions, for use by Redshift Spectrum.
    source: https://docs.aws.amazon.com/glue/latest/dg/components-overview.html#data-catalog-intro
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
  - id: warehouse-vpc
    text: A VPC is a logically isolated virtual network for AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: warehouse-mpp
    text: "Redshift uses massively parallel processing: several compute nodes each run the same compiled query segments on part of the data, which makes complex queries on large datasets fast."
    source: https://docs.aws.amazon.com/redshift/latest/dg/c_challenges_achieving_high_performance_queries.html#massively-parallel-processing
  - id: warehouse-ml
    text: "Redshift ML lets analysts create, train and run models with SQL; Redshift creates the model in SageMaker AI from the data it is given."
    source: https://docs.aws.amazon.com/redshift/latest/dg/machine_learning.html#machine_learning
  - id: cross-region-snapshot
    text: "Amazon Redshift can automatically copy automated and manual snapshots of a cluster to another AWS Region, so the cluster can be restored there if the primary Region fails."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/cross-region-snapshot-copy.html#cross-region-snapshot-copy
  - id: leader-compute
    text: "A provisioned Redshift cluster has a leader node that receives queries and builds execution plans, and compute nodes that run them in parallel."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-about-clusters-and-nodes
  - id: auto-snapshots
    text: "Redshift automated snapshots are taken about every eight hours or every 5 GB per node of changed data, whichever comes first."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-snapshots.html#about-automated-snapshots
  - id: multi-az
    text: "Provisioned RA3 (and RG) clusters support Multi-AZ deployments that run compute in two Availability Zones to keep working through a zone failure."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-multi-az.html#managing-cluster-multi-az
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
  - id: redshift-004
    q: "A team needs a data warehouse for SQL analytics without manually provisioning capacity. Which Amazon Redshift option fits?"
    a: "Amazon Redshift Serverless automatically provisions resources and scales warehouse capacity."
    facts: [warehouse-purpose, warehouse-serverless]
  - id: redshift-006
    q: Which Amazon Redshift command writes query results to files in S3?
    a: UNLOAD writes query results to files in S3.
    facts: [warehouse-unload]
  - id: redshift-007
    q: How does Amazon Redshift use massively parallel processing to run a query?
    a: Compute nodes run the same compiled query segments on different parts of the data.
    facts: [warehouse-mpp]
  - id: redshift-008
    q: "Analysts load S3 data into a warehouse each morning, need fast MPP queries without managing clusters, and want to run ML predictions in SQL. What fits?"
    a: "A daily Glue job that loads Amazon Redshift Serverless, with Redshift ML for SQL-based models. Serverless keeps Redshift MPP query engine with automatic capacity."
    facts: [warehouse-mpp, warehouse-ml, warehouse-serverless]
  - id: redshift-009
    q: "A Redshift data warehouse must survive a full Region outage. What should be turned on?"
    a: "Cross-Region snapshot copy, so snapshots are copied automatically to another Region and the cluster can be restored there."
    facts: [cross-region-snapshot]
  - id: redshift-010
    q: "A team wants to keep its Amazon Redshift data warehouse operating through an Availability Zone failure. What deployment option can help?"
    a: "A supported provisioned Multi-AZ cluster runs compute in two Availability Zones."
    facts: [multi-az]
revised:
  - date: 2026-11-23
    note: The card now covers exporting query results with UNLOAD.
    cards: [redshift-006]
  - date: 2026-11-23
    note: The card now covers how massively parallel processing runs queries.
    cards: [redshift-007]
---
Redshift warehouse workloads build on the basics with capacity, processing, and recovery choices.

### How it works

1. Choose a provisioned cluster for manual resource management or Redshift Serverless for automatically provisioned and scaled warehouse capacity.
2. Redshift uses massively parallel processing (MPP): compute nodes run query segments on parts of the data. Redshift ML lets analysts create, train and run models with SQL, using SageMaker AI to create the model.
3. Redshift takes automated snapshots. Enable cross-Region snapshot copy to copy cluster snapshots to another Region for restoration if the primary Region fails.

### Exam cues

- If the question says warehouse capacity without managing a cluster, think Redshift Serverless, because it provisions resources and scales capacity automatically.
- If the question says run machine learning models with SQL, think Redshift ML, because it lets analysts create, train and run models.
- If the question says recover a cluster after a Region failure, think cross-Region snapshot copy, because the copied snapshots can restore the cluster in another Region.

### Remember

- A Spectrum cluster and its S3 files must be in the same Region.
- Enhanced VPC routing supports clusters and Serverless workgroups, but not Spectrum.
- Automated snapshots are taken about every eight hours or after 5 GB per node of changed data, whichever comes first.

> **Trap:** Enhanced VPC routing supports clusters and Serverless workgroups, but it cannot be used with Spectrum.
