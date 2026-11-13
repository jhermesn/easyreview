---
title: Instrumentation, collectors, and exporters
level: associate
order: 10
facts:
  - id: adot-components
    text: ADOT is an AWS-supported distribution of OpenTelemetry SDKs, auto-instrumentation agents, and
      collectors.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-adot.html#xray-services-adot-intro
  - id: instrumentation-purpose
    text: Instrumentation makes an application emit telemetry through code or supported automatic
      instrumentation.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-your-app
  - id: signals-meaning
    text: Telemetry includes metrics, logs, and traces describing application behavior.
    source: https://aws.amazon.com/what-is/opentelemetry/
  - id: metric-meaning
    text: A metric is a measurement of a running service.
    source: https://aws.amazon.com/what-is/opentelemetry/
  - id: trace-span
    text: A trace records a request path and contains spans representing individual operations.
    source: https://aws.amazon.com/what-is/opentelemetry/
  - id: collector-role
    text: An OpenTelemetry Collector receives, processes, and exports telemetry from applications and
      other sources.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSimplesetup
  - id: collector-processing
    text: A collector can batch, filter, add or remove attributes, and sample telemetry before export.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSimplesetup
  - id: otlp-receiver
    text: An OTLP receiver accepts telemetry from applications using OpenTelemetry SDKs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSupportedReceivers
  - id: prometheus-receiver
    text: A Prometheus receiver scrapes metrics from Prometheus-compatible endpoints.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSupportedReceivers
  - id: collector-service-pipelines
    text: Collector configuration wires receivers, processors, and exporters under service.pipelines and
      activates extensions under service.extensions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSimplesetupConfigureCollector
  - id: multiple-destinations
    text: ADOT can send telemetry to AWS monitoring destinations including X-Ray, CloudWatch, and Amazon
      Managed Service for Prometheus.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-adot.html#xray-services-adot-intro
  - id: prometheus-export
    text: ADOT can send scraped metrics to an Amazon Managed Service for Prometheus workspace through
      prometheusremotewrite.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-otel-advanced
  - id: prometheus-signing
    text: The AMP exporter uses sigv4auth with signing service aps and the workspace Region.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-otel-advanced
  - id: prometheus-permissions
    text: The collector must obtain AWS credentials with remote write permissions for Amazon Managed
      Service for Prometheus.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-otel-advanced
  - id: eks-operator
    text: EKS can install and manage the ADOT Operator to support metric and trace collection.
    source: https://docs.aws.amazon.com/eks/latest/userguide/opentelemetry.html#opentelemetry
  - id: ecs-sidecar
    text: ECS can run an ADOT sidecar container to collect application traces and route them to X-Ray.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/trace-data.html#trace-data
  - id: ecs-instrumentation
    text: An ECS application must be configured to generate traces before its ADOT collector can send
      them to X-Ray.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/trace-data.html#trace-data
  - id: ecs-task-role
    text: ECS ADOT integration requires a task IAM role in the task definition with permissions for the
      telemetry destinations.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/trace-data.html#trace-data-iam
  - id: host-collector
    text: An OpenTelemetry Collector can run on EC2 or an on-premises host with destination credentials
      configured.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPSimplesetup.html#CloudWatch-OTLPSimplesetupGettingStarted
  - id: lambda-layers
    text: AWS-managed ADOT Lambda layers package OpenTelemetry with Lambda and X-Ray configuration and
      can automatically instrument supported functions.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-adot.html#xray-services-adot-intro
  - id: direct-export
    text: Supported ADOT SDKs can export telemetry directly to AWS OTLP endpoints without a collector.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#CloudWatch-OTLP-UsingADOT
  - id: direct-transaction
    text: Sending spans to the X-Ray OTLP endpoint requires Transaction Search to be enabled.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#CloudWatch-OTLP-UsingADOT-Prerequisite
  - id: direct-endpoint
    text: The X-Ray OTLP traces endpoint is https://xray.<region>.amazonaws.com/v1/traces.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPEndpoint.html#CloudWatch-TracesEndpoint
  - id: direct-protocol
    text: AWS OTLP endpoints support HTTP, not gRPC.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLPEndpoint.html#CloudWatch-LimitsandRestrictions
  - id: direct-role
    text: The documented ADOT SDK trace export setup grants AWSXrayWriteOnlyPolicy to the application
      role.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#setup-iam-permissions-role
  - id: direct-credentials
    text: ADOT SDKs discover export credentials through AWS SDK credential providers.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#configure-credentials-providers
  - id: java-direct-version
    text: The documented collectorless Java export configuration requires ADOT Java Agent 2.11.2 or
      later.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#Enabling-ADOT
  - id: java-direct-settings
    text: The documented ADOT Java setup uses OTEL_EXPORTER_OTLP_TRACES_ENDPOINT for the endpoint,
      OTEL_TRACES_EXPORTER=otlp, and OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-OTLP-UsingADOT.html#Enabling-ADOT
  - id: sampling-meaning
    text: Sampling selects a subset of traces to record.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-sampling
  - id: receiver-exporter-difference
    text: A Prometheus receiver collects metrics into a collector, while a Prometheus remote write
      exporter sends collected metrics to the destination workspace.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-onboard-ingest-metrics-OpenTelemetry.html#AMP-otel-advanced
diagrams:
  - id: adot-collector-routing
    title: Instrument, collect, and route each signal
    width: 1000
    height: 500
    nodes:
      - id: app
        label: Application
        icon: res-client
        x: 20
        y: 200
        w: 190
        h: 86
        tone: mgmt
        sub: instrumented code
      - id: collector
        label: ADOT Collector
        icon: distro-for-opentelemetry
        x: 350
        y: 200
        w: 190
        h: 86
        tone: mgmt
        sub: receive, process, export
      - id: traces
        label: X-Ray
        icon: x-ray
        x: 760
        y: 30
        w: 190
        h: 86
        tone: mgmt
        sub: traces
      - id: cloudwatch
        label: CloudWatch
        icon: cloudwatch
        x: 760
        y: 200
        w: 190
        h: 86
        tone: mgmt
        sub: metrics
      - id: prometheus
        label: Managed Prometheus
        icon: managed-service-for-prometheus
        x: 760
        y: 370
        w: 190
        h: 86
        tone: mgmt
        sub: scraped metrics
    edges:
      - from: app
        to: collector
        step: 1
        label: telemetry
      - from: collector
        to: traces
        step: 2
        label: traces
      - from: collector
        to: cloudwatch
        step: 3
        label: metrics
      - from: collector
        to: prometheus
        step: 4
        label: remote write
    steps:
      - Instrumentation emits telemetry for the collector to receive.
      - A configured trace exporter sends traces to X-Ray.
      - A configured metric exporter sends metrics to CloudWatch.
      - The Prometheus remote write exporter sends metrics to the workspace.
  - id: adot-direct-traces
    title: Supported ADOT SDKs can export traces directly
    width: 900
    height: 240
    nodes:
      - id: sdk
        label: Application + SDK
        icon: res-client
        x: 40
        y: 80
        w: 190
        h: 86
        tone: mgmt
        sub: supported ADOT version
      - id: endpoint
        label: X-Ray endpoint
        icon: x-ray
        x: 650
        y: 80
        w: 190
        h: 86
        tone: mgmt
        sub: Transaction Search on
    edges:
      - from: sdk
        to: endpoint
        step: 1
        label: OTLP over HTTP
    steps:
      - The instrumented application exports traces directly to the X-Ray OTLP endpoint with
        Transaction Search enabled and destination permissions.
cards:
  - id: adot-001
    q: What does the AWS Distro for OpenTelemetry collector do, and where can telemetry go?
    a: It receives, processes, and exports telemetry. Destinations include X-Ray for traces and
      CloudWatch or Amazon Managed Service for Prometheus for metrics.
    facts:
      - collector-role
      - multiple-destinations
      - prometheus-export
  - id: adot-002
    q: Can an application use ADOT to send traces to X-Ray without a collector?
    a: Yes. Use a supported ADOT SDK and the X-Ray OTLP traces endpoint. Enable Transaction Search and
      configure the documented export permissions, credentials, and HTTP protocol.
    facts:
      - direct-export
      - direct-endpoint
      - direct-transaction
      - direct-role
      - direct-credentials
      - direct-protocol
  - id: adot-003
    q: Does deploying an ADOT collector automatically instrument an ECS application?
    a: No. The application must generate traces through instrumentation. The sidecar receives and
      forwards that telemetry.
    trap: true
    facts:
      - ecs-instrumentation
      - instrumentation-purpose
      - ecs-sidecar
  - id: adot-004
    q: An ECS application has a running ADOT sidecar but no application traces in X-Ray. What should the
      team check first?
    a: Check that the application is instrumented and emits traces, then check the task role permissions
      for the destination. A running sidecar alone does not create application traces.
    trap: true
    facts:
      - ecs-instrumentation
      - ecs-task-role
  - id: adot-005
    q: An ADOT collector scrapes EKS metrics, but remote write to Amazon Managed Service for Prometheus
      is denied. Which configuration should the team inspect?
    a: Check the workspace remote write destination, `sigv4auth` with service `aps` and the workspace
      Region, and credentials with remote write permissions.
    facts:
      - prometheus-export
      - prometheus-signing
      - prometheus-permissions
  - id: adot-006
    q: A supported ADOT SDK sends traces directly to the X-Ray OTLP endpoint, but Transaction Search is
      disabled. What prerequisite is missing?
    a: Enable Transaction Search before sending spans to the X-Ray OTLP endpoint. Collectorless export
      still requires this setting.
    facts:
      - direct-export
      - direct-transaction
  - id: adot-007
    q: What is the ADOT collector processing sequence?
    a: Receiver, processors, exporter. Receivers accept or scrape telemetry; processors can batch,
      filter, or sample it; exporters send it to monitoring destinations.
    facts:
      - collector-role
      - otlp-receiver
      - prometheus-receiver
      - collector-processing
      - prometheus-export
  - id: adot-008
    q: An ADOT collector configuration defines an exporter but the metrics pipeline does not reference
      it. What should the team configure?
    a: Wire the exporter into `service.pipelines` with the intended receivers and processors. Enable
      required authentication extensions in `service.extensions`.
    trap: true
    facts:
      - collector-service-pipelines
  - id: adot-009
    q: Are the ADOT Prometheus receiver and prometheusremotewrite exporter interchangeable?
    a: No. The receiver scrapes metrics into the collector; the exporter sends metrics to the
      destination workspace.
    trap: true
    facts:
      - receiver-exporter-difference
  - id: adot-010
    q: Which ADOT deployment forms fit EKS, ECS, and Lambda?
    a: EKS can manage the ADOT Operator. ECS can run a collector sidecar. Lambda can use AWS-managed
      ADOT layers for supported function instrumentation.
    facts:
      - eks-operator
      - ecs-sidecar
      - lambda-layers
---
AWS Distro for OpenTelemetry (ADOT) provides AWS-supported tools for application telemetry, the measurements and events used to understand a running system. Instrumentation creates the data; a collector can process and route it; exporters send it to monitoring destinations.

A metric is a measurement. A trace follows one request through an application, and a span describes one operation within that trace.

### How it works

1. Instrument the application with a software development kit (SDK) or supported automatic instrumentation. Deploying a collector alone does not make the application emit traces.
2. Configure receivers. An OTLP receiver accepts OpenTelemetry Protocol data from instrumented applications. A Prometheus receiver scrapes metrics, meaning it reads measurements from exposed endpoints.
3. Add processors to batch data, filter it, change attributes, or sample traces. Sampling selects a subset of traces to record.
4. Connect the receivers, processors, and exporters in `service.pipelines`. Enable needed extensions, such as authentication helpers, in `service.extensions`.
5. Export traces to X-Ray or metrics to CloudWatch or Amazon Managed Service for Prometheus (AMP). For Prometheus remote write, which sends collected metrics to a workspace, configure `prometheusremotewrite`, `sigv4auth`, signing service `aps`, the workspace Region, and credentials with remote write permissions. SigV4 is AWS request signing that authenticates a request using AWS credentials.
6. Choose the deployment form for the workload. ECS uses a sidecar, an additional container beside the application, with destination permissions in its task role. EKS can manage the ADOT Operator, a component that manages OpenTelemetry collection. Collectors can run on EC2 or on-premises hosts. Supported Lambda functions can use AWS-managed ADOT layers that package instrumentation and collection configuration.

| Component | Role | Example |
|---|---|---|
| Instrumentation | Generates application telemetry | SDK code or automatic instrumentation |
| Receiver | Brings telemetry into the collector | OTLP input or Prometheus scraping |
| Processor | Changes or groups telemetry before export | Batching, filtering, sampling |
| Exporter | Sends telemetry to a destination | Prometheus remote write |

Supported ADOT SDKs can also export directly without a collector. For direct traces, enable Transaction Search and use `https://xray.<region>.amazonaws.com/v1/traces`. The documented SDK setup uses AWS credential providers and an application role with `AWSXrayWriteOnlyPolicy`. A collector remains useful when telemetry needs shared processing or routing.

### Exam cues

- If the question says ECS has a collector but no application traces, think instrument the application and check its task role, because the sidecar needs emitted data and destination permissions.
- If the question says one instrumentation setup must serve several monitoring destinations, think ADOT collector exporters, because collection can route telemetry to different services.
- If the question says EKS metrics are scraped but AMP ingestion fails, think remote write signing and permissions, because collecting a metric does not authorize exporting it.
- If the question says direct SDK export to the X-Ray OTLP endpoint, think Transaction Search, because the endpoint requires it even without a collector.

### Remember

- Collector sequence: receivers, processors, exporters.
- AMP signing service: `aps`; use the workspace Region and remote write permissions.
- AWS OTLP endpoints accept HTTP, not gRPC, a different remote-call protocol.
- The documented collectorless Java path requires ADOT Java Agent 2.11.2 or later. It uses `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`, `OTEL_TRACES_EXPORTER=otlp`, and `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf`.

> **Trap:** The collector and application instrumentation solve different parts of the flow. A healthy collector does not prove the application is producing traces.

> **Trap:** A Prometheus receiver reads metrics; `prometheusremotewrite` sends them. Replacing one with the other reverses the direction of the data flow.
