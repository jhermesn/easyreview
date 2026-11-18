---
title: Application Signals and SLOs
level: associate
order: 180
facts:
  - id: app-purpose
    text: Application Signals collects application metrics and traces and discovers a map of services
      and dependencies.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html#CloudWatch-Application-Monitoring-Sections
  - id: app-languages
    text: Application Signals supports Java, Python, Node.js, and .NET applications.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Sections.html#CloudWatch-Application-Monitoring-Sections
  - id: app-eks
    text: On EKS, the CloudWatch Observability add-on supports Application Signals instrumentation.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-Enable-EKS.html#CloudWatch-Application-Signals-Enable-EKS-Console
  - id: app-restart
    text: EKS console instrumentation can restart application pods immediately; without Auto restart,
      Auto monitor takes effect at the next workload deployment.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-Enable-EKS.html#CloudWatch-Application-Signals-Enable-EKS-Console
  - id: app-namespace
    text: Application Signals publishes standard application metrics in the ApplicationSignals namespace.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics
  - id: app-latency
    text: The Latency metric measures request delay in milliseconds.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics
  - id: app-error
    text: The Error metric counts HTTP 4xx client errors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics
  - id: app-fault
    text: The Fault metric counts HTTP 5xx server faults and OpenTelemetry span status errors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics
  - id: app-availability
    text: Application Signals dashboard availability is (1 - Faults/Total) * 100, with Total derived
      from SampleCount(Latency); HTTP 4xx responses are not service faults.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics
  - id: slo-components
    text: An SLO sets a target percentage for a service level indicator, a performance measurement, to
      meet a threshold over a calendar or rolling interval.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-concepts
  - id: slo-period
    text: A period-based SLO measures good time periods divided by total time periods.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-Create
  - id: slo-request
    text: A request-based SLO measures good requests divided by total requests.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-Create
  - id: slo-budget
    text: A period-based SLO error budget is the allowed unhealthy time while still meeting the goal.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-budget
  - id: slo-request-budget
    text: A request-based SLO error budget is the allowed unhealthy requests while meeting the goal and
      varies with the ratio of good requests to total requests.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-budget-request
  - id: slo-burn
    text: Burn rate measures error-budget consumption relative to the goal; a sustained rate above 1
      consumes the budget faster than allowed.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-burn
  - id: slo-alarms
    text: SLOs can have breach, warning, and burn-rate CloudWatch alarms.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives
  - id: term-instrumentation
    text: Instrumentation adds code that records application operations and sends monitoring data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-Enable-EKS.html#CloudWatch-Application-Signals-Enable-EKS-Console
  - id: term-trace
    text: A trace records the work performed by application components to handle a request.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-traces
  - id: term-dependency
    text: A service dependency is another service or resource an application calls to complete its work.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AppSignals-MetricsCollected.html#AppSignals-StandardMetrics-Dimensions
  - id: term-namespace
    text: A metric namespace keeps related metrics together and separates them from other metric
      collections.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace
  - id: term-pod
    text: A pod is the smallest deployable Kubernetes unit and contains one or more containers.
    source: https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html
  - id: term-calendar
    text: A calendar interval follows fixed calendar boundaries when an objective is evaluated.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-concepts
  - id: term-rolling
    text: A rolling interval evaluates the recent time window as that window moves forward.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives-concepts
cards:
  - id: cloudwatch-037
    q: Which CloudWatch feature provides application latency, error and fault metrics, a service map,
      and SLOs?
    a: Application Signals. It supports Java, Python, Node.js, and .NET; the CloudWatch Observability
      add-on supports EKS instrumentation.
    facts:
      - app-purpose
      - app-languages
      - app-eks
  - id: cloudwatch-038
    q: A team needs visibility into application requests and the services they call. Which
      CloudWatch feature fits?
    a: Application Signals collects application metrics and traces and discovers a map of services
      and dependencies.
    facts:
      - app-purpose
  - id: cloudwatch-074
    q: A team needs to measure application request delay with CloudWatch Application Signals. Which
      metric should it use?
    a: Use the Latency metric, which measures request delay in milliseconds.
    facts:
      - app-latency
  - id: cloudwatch-075
    q: A team needs to understand the work application components perform for a request. What can
      CloudWatch Application Signals collect?
    a: Application Signals collects traces. A trace records the work components perform to handle a
      request.
    facts:
      - app-purpose
      - term-trace
  - id: cloudwatch-076
    q: A team wants CloudWatch Application Signals visibility for an Amazon EKS application. What
      supports its instrumentation?
    a: The CloudWatch Observability add-on supports Application Signals instrumentation on EKS.
    facts:
      - app-eks
---
Application Signals connects application health measurements with a map of service dependencies, the other services an application calls. A service level objective (SLO) turns a performance expectation into a target that CloudWatch can track over time.

### How it works

1. Enable application instrumentation, code that records measurements and traces. A trace records the work application components perform for a request. Supported languages are Java, Python, Node.js, and .NET. On EKS, use the CloudWatch Observability add-on. Console instrumentation can restart pods, the running units of an application, immediately; Auto monitor without Auto restart waits for the next workload deployment.
2. Read the standard metrics in the `ApplicationSignals` namespace, a named metric collection. `Latency` measures delay in milliseconds; `Error` counts HTTP 4xx responses; `Fault` counts HTTP 5xx responses and OpenTelemetry span status errors, failures recorded by tracing instrumentation.
3. Choose a service level indicator (SLI), the measurement used to judge performance. Set its threshold, target percentage, and calendar or rolling interval. A calendar interval follows calendar boundaries; a rolling interval moves forward with time.
4. Select the evaluation type below. Track the error budget, the remaining allowance for unhealthy time or requests, and use breach, warning, or burn-rate alarms. Burn rate measures how fast that allowance is spent relative to the goal.

| Evaluation | What attainment measures |
|---|---|
| Period-based | Healthy time periods divided by all periods |
| Request-based | Good requests divided by all requests |

### Exam cues

- If the question says map service dependencies and find application latency or faults, think Application Signals, because it connects health measurements with service relationships.
- If the question says a fraction of requests must meet a latency target, think request-based SLO, because requests determine attainment.
- If the question says each time period must meet a target, think period-based SLO, because periods determine attainment.
- If the question says alert before the error budget runs out, think burn-rate alarm, because burn rate measures budget consumption.

### Remember

- Dashboard availability is `(1 - Faults/Total) * 100`; total responses come from `SampleCount(Latency)`.
- HTTP 4xx responses are not service faults in the availability calculation.
- Sustained burn rate above 1 consumes the allowance faster than the SLO permits.
- A request-based error budget can change as the request mix changes.

> **Trap:** A high client error count does not necessarily reduce Application Signals availability. Distinguish `Error` from `Fault`.
