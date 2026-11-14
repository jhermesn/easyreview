---
title: Data transfer costs
level: foundational
order: 60
facts:
  - id: inbound-free
    text: There is no charge for data transfer from the internet to AWS.
    source: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html#data-transfer-out-internet
  - id: outbound-charged
    text: Data transfer from AWS out to the internet is charged, under the DataTransfer-Out-Bytes usage type.
    source: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html#data-transfer-out-internet
  - id: free-100gb
    text: AWS customers get 100 GB of data transfer out to the internet free each month, aggregated across all AWS services and Regions except China and GovCloud.
    source: https://aws.amazon.com/ec2/pricing/on-demand/
  - id: inter-region
    text: For data transfer between Regions there is no charge for data coming into the destination Region; the charge is for data going out of the source Region.
    source: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html#data-transfer-between-regions
  - id: cross-az
    text: Data transfer between Availability Zones in the same Region is charged for both inbound and outbound traffic of each resource, although some services have in-Region traffic at no cost.
    source: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html#data-transfer-within-region
  - id: cross-az-ec2
    text: Data transferred in to and out from Amazon EC2, Amazon RDS, Amazon Redshift, DAX, ElastiCache and network interfaces across Availability Zones in the same Region is charged at 0.01 USD/GB in each direction.
    source: https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer_within_the_same_AWS_Region
cards:
  - id: billing-and-cost-management-019
    q: Does AWS charge for data uploaded from the internet into AWS?
    a: No. Inbound data transfer from the internet is free; outbound to the internet is charged.
    facts: [inbound-free, outbound-charged]
  - id: billing-and-cost-management-020
    q: An application copies data from us-east-2 to ap-south-1. Which side of the transfer does AWS charge?
    a: The data going out of the source Region (us-east-2). Data coming into the destination Region is free.
    facts: [inter-region]
  - id: billing-and-cost-management-021
    q: Two EC2 instances in different Availability Zones of the same Region exchange data. Is that transfer free?
    a: No. Cross-AZ transfer is charged in each direction, 0.01 USD/GB for EC2.
    trap: true
    facts: [cross-az, cross-az-ec2]
  - id: billing-and-cost-management-022
    q: How much data transfer out to the internet does AWS include free each month?
    a: 100 GB per month, aggregated across all services and Regions except China and GovCloud.
    facts: [free-100gb]
---
Data transfer pricing depends on direction and distance. Data coming in from the internet is free. Data leaving AWS for the internet, crossing Regions, or crossing Availability Zones is generally charged. [Understanding data transfer charges](https://docs.aws.amazon.com/cur/latest/userguide/cur-data-transfers-charges.html#cur-data-transfers-charges)

### How it works

| Path | Charged? |
|---|---|
| Internet into AWS | Free |
| AWS out to the internet | Charged; first 100 GB per month free across all services |
| Between Regions | Charged on the way out of the source Region; free coming in |
| Between AZs in one Region | Charged in each direction (0.01 USD/GB for EC2, RDS and similar); some services are free in-Region |

1. Keep chatty components in the same AZ when the design allows, or accept the cross-AZ charge as the price of high availability.
2. Serve users through edge caches such as Amazon CloudFront to cut repeated transfer from the origin.
3. Check each service's pricing page, because rules vary by service.

### Exam cues

- If the question says uploading data to AWS costs, think free inbound.
- If the question says copying data to another Region, think charged out of the source Region.
- If the question says traffic between AZs, think a small charge in each direction.

### Remember

- Inbound from the internet: free.
- 100 GB out to the internet free per month, across all services and Regions (except China and GovCloud).
- Cross-AZ for EC2: 0.01 USD/GB each way.

> **Trap:** Multi-AZ designs are not free of transfer costs. Replication and traffic between AZs are charged for many services.
