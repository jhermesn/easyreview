---
title: Managed collectors and remote write
level: associate
order: 20
facts:
  - id: ingestion-methods
    text: AMP accepts remote write from AWS managed collectors, customer-managed Prometheus collectors, and AWS
      Distro for OpenTelemetry collectors.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-ingest-methods.html#AMP-ingest-methods
  - id: managed
    text: The AWS managed collector discovers and scrapes Prometheus-compatible metrics without customer-operated
      scraper agents.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-collector.html#AMP-collector
  - id: eks-compute
    text: Managed collectors support EKS clusters using EC2 or Fargate.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-collector.html#AMP-collector
  - id: private-path
    text: For EKS, the managed collector creates an elastic network interface in each selected subnet and remote
      writes through a VPC endpoint without using the public internet.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-collector.html#AMP-collector
  - id: adot-components
    text: ADOT collection uses a Prometheus receiver, a Prometheus remote write exporter, and a SigV4
      authentication extension.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-onboard-ingest-metrics-OpenTelemetry
  - id: adot-auth
    text: The ADOT exporter signs requests using AWS SigV4 with service name aps and credentials authorized for
      aps:RemoteWrite.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-otel-advanced
  - id: msk
    text: AWS managed collectors can collect metrics from Amazon MSK.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/prom-msk-integration.html#prom-msk-integration
  - id: opensearch
    text: AWS managed collectors support OpenSearch Service domains with VPC access, but not public-access domains.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/prom-opensearch-integration.html#prom-opensearch-create-scraper
  - id: scrape-definition
    text: Scraping pulls Prometheus-compatible metrics from exposed metrics endpoints.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-collector.html#AMP-collector
  - id: eni-definition
    text: An elastic network interface is a virtual network card in a VPC.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html
  - id: endpoint-definition
    text: A VPC endpoint provides private access to a supported AWS service.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html
cards:
  - id: managed-prometheus-002
    q: Which collectors can send Prometheus metrics to an AMP workspace?
    a: AWS managed collectors, a customer-managed Prometheus collector, or an AWS Distro for OpenTelemetry (ADOT)
      collector using remote write.
    facts:
      - ingestion-methods
  - id: managed-prometheus-003
    q: An EKS team uses EC2 and Fargate and wants AMP metrics without installing or patching scrapers. What should
      it use?
    a: The AWS managed collector. It discovers and scrapes metrics, uses network interfaces in selected subnets,
      and remote writes through a VPC endpoint.
    facts:
      - managed
      - eks-compute
      - private-path
  - id: managed-prometheus-004
    q: An ADOT collector can scrape metrics but AMP rejects its remote write requests for authentication. What
      should the team check?
    a: Configure the SigV4 authentication extension, set the signing service to aps, and use credentials allowed
      to call aps:RemoteWrite.
    facts:
      - adot-components
      - adot-auth
    trap: true
  - id: managed-prometheus-010
    q: Which three ADOT components collect and send Prometheus metrics to AMP?
    a: Prometheus receiver, Prometheus remote write exporter, and SigV4 authentication extension.
    facts:
      - adot-components
  - id: managed-prometheus-011
    q: Can an AMP managed collector scrape an OpenSearch Service domain that has only public access?
    a: No. The managed integration requires a domain with VPC access.
    facts:
      - opensearch
    trap: true
diagrams:
  - id: amp-collector-path
    title: Managed EKS collection path
    width: 1000
    height: 210
    nodes:
      - id: eks
        label: EKS metrics
        icon: elastic-kubernetes-service
        info: EKS workloads expose Prometheus-compatible metrics.
        x: 30
        y: 60
        w: 190
        h: 86
        tone: compute
      - id: scraper
        label: Managed scraper
        icon: managed-service-for-prometheus
        info: AWS operates discovery and scraping through network interfaces in selected subnets.
        x: 280
        y: 60
        w: 190
        h: 86
        tone: mgmt
      - id: endpoint
        label: VPC endpoint
        icon: virtual-private-cloud
        info: The collector sends metrics without using the public internet.
        x: 530
        y: 60
        w: 190
        h: 86
        tone: network
      - id: workspace
        label: AMP workspace
        icon: managed-service-for-prometheus
        info: Remote write delivers the collected metrics.
        x: 780
        y: 60
        w: 190
        h: 86
        tone: mgmt
    edges:
      - from: eks
        to: scraper
        step: 1
      - from: scraper
        to: endpoint
        step: 2
      - from: endpoint
        to: workspace
        step: 3
    steps:
      - The managed scraper pulls metrics from EKS.
      - Collected metrics use the private VPC endpoint path.
      - Remote write sends the metrics into the workspace.
---
Collectors move application metrics into AMP. Scraping means pulling values from a metrics endpoint; remote write is the protocol that sends those collected values to the workspace.

### How it works

1. Choose who operates the collector.

   | Collector | Who operates it | What it does |
   |---|---|---|
   | AWS managed collector | AWS | Discovers and scrapes supported sources |
   | Prometheus collector | Your team | Scrapes metrics and sends remote write requests |
   | ADOT collector | Your team | Receives Prometheus metrics and exports remote write requests |

2. For EKS managed collection, select subnets. The collector creates an elastic network interface, a virtual network connection, in each selected subnet.
3. The managed EKS collector sends samples through a VPC endpoint, a private connection to the service, without using the public internet.
4. For ADOT, connect the Prometheus receiver to the remote write exporter and enable the SigV4 authentication extension. SigV4 signs requests using AWS credentials.

### Exam cues

- If the question says collect EKS metrics with no scraper to patch, think AWS managed collector, because AWS operates the scraper for EC2 and Fargate clusters.
- If the question says ADOT scrapes successfully but AMP rejects writes, think SigV4 and IAM permissions, because scraping and authorized export are separate parts of the pipeline.
- If the question says managed collection from MSK or OpenSearch Service, think the matching managed integration, because managed collection extends beyond EKS; OpenSearch requires VPC access.

### Remember

- ADOT needs a receiver, a remote write exporter, and a SigV4 extension.
- ADOT signing service: `aps`; write permission: `aps:RemoteWrite`.
- The private path described here is the managed EKS collector path.

> **Trap:** A working metrics receiver does not prove that the exporter has signed and authorized its AMP requests.
