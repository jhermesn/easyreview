---
title: Load, stress, and performance baselines
level: associate
order: 40
facts:
  - id: load
    text: Load testing evaluates a system under expected concurrent users or transactions.
    source: https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/qa.nt.2-validate-system-reliability-with-performance-testing.html
  - id: stress
    text: Stress testing increases load beyond normal capacity to expose breaking points.
    source: https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/qa.nt.2-validate-system-reliability-with-performance-testing.html
  - id: endurance
    text: Endurance testing holds load over an extended period to reveal problems such as memory leaks.
    source: https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/qa.nt.2-validate-system-reliability-with-performance-testing.html
  - id: environment
    text: AWS recommends performance tests in an environment that mirrors production and comparison with
      historical benchmarks.
    source: https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/qa.nt.2-validate-system-reliability-with-performance-testing.html
  - id: ramp
    text: A stepped load test starts below typical usage and increases load to find where performance
      degrades.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/load-testing/foundation.html#modeling
  - id: runners
    text: Distributed Load Testing on AWS runs independent test containers on Amazon ECS with AWS
      Fargate across multiple Regions.
    source: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html
  - id: frameworks
    text: Distributed Load Testing supports JMeter, k6, Locust, and simple HTTP endpoint configuration.
    source: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html
  - id: metrics
    text: Distributed Load Testing reports request counts, errors, requests per second, and
      response-time percentiles including p50, p90, p95, and p99.
    source: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/explore-test-results.html#test-run-summary
  - id: baseline
    text: A selected baseline test run lets Distributed Load Testing show percentage differences for
      later runs.
    source: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/explore-test-results.html#baseline-comparison
  - id: dimensions
    text: Distributed Load Testing result views include Overall, By Endpoint, and By Region.
    source: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/explore-test-results.html#detailed-test-results
  - id: analysis
    text: Compare latency, error rate, and throughput with service-level objectives, then correlate
      degraded results with infrastructure metrics.
    source: https://docs.aws.amazon.com/solutions/latest/performance-testing/interpreting-results.html#results-hierarchy
diagrams:
  - id: testing-regional-load
    title: Regional load generators target the test application
    width: 1000
    height: 230
    nodes:
      - id: region-a
        label: Region A runner
        icon: fargate
        sub: ECS test container
        x: 30
        y: 75
        w: 270
        h: 86
        tone: compute
      - id: app
        label: Test application
        icon: res-server
        sub: production-like target
        x: 360
        y: 75
        w: 270
        h: 86
        tone: neutral
      - id: region-b
        label: Region B runner
        icon: fargate
        sub: ECS test container
        x: 690
        y: 75
        w: 270
        h: 86
        tone: compute
    edges:
      - from: region-a
        to: app
        step: 1
      - from: region-b
        to: app
        step: 2
    steps:
      - A Fargate test container generates application requests.
      - A runner in another Region generates requests to the same target.
cards:
  - id: testing-in-pipelines-003
    q: A release team needs to detect performance regressions and discover the application breaking
      point. How should it test?
    a: Compare response-time percentiles, throughput, and errors with a baseline under expected load,
      then increase load in steps beyond normal capacity to expose the breaking point.
    facts:
      - load
      - stress
      - ramp
      - metrics
      - baseline
  - id: testing-in-pipelines-010
    q: A team needs load generators in several AWS Regions without managing servers. Which AWS solution
      fits?
    a: Distributed Load Testing on AWS. It runs ECS containers on Fargate and supports JMeter, k6,
      Locust, and simple HTTP tests.
    facts:
      - runners
      - frameworks
  - id: testing-in-pipelines-023
    q: What distinguishes load, stress, and endurance tests?
    a: Load tests use expected traffic. Stress tests exceed normal capacity. Endurance tests sustain
      load over time to expose gradual degradation.
    facts:
      - load
      - stress
      - endurance
  - id: testing-in-pipelines-024
    q: A service passes a short load test but slows after hours of steady traffic. Which test should the
      team add?
    a: An endurance test, because sustained load can expose memory leaks or gradual performance
      degradation.
    facts:
      - endurance
  - id: testing-in-pipelines-025
    q: An application release has worse p99 response times than its previous test run. How can
      Distributed Load Testing help compare them?
    a: Set the previous run as the baseline and compare metric percentage differences. Inspect results
      by endpoint and Region, then correlate with infrastructure metrics.
    facts:
      - baseline
      - dimensions
      - analysis
  - id: testing-in-pipelines-026
    q: Does an acceptable average response time establish that a load test met its performance
      objectives?
    a: No. Compare response-time percentiles, error rate, and throughput with the objectives; the
      average alone does not describe those results.
    facts:
      - metrics
      - analysis
    trap: true
---
Performance tests measure how an application behaves under traffic. A baseline is a saved reference run used to detect regressions, meaning results that worsen after a change.

### How it works

1. Choose an environment that mirrors production and define service-level objectives, the target values for latency, errors, and throughput.
2. Set the traffic pattern. Start below normal load and increase it in steps to see where performance degrades.
3. Use Distributed Load Testing on AWS for independent ECS test containers on Fargate across Regions. Fargate runs containers without requiring you to manage servers.
4. Compare results with a baseline. Inspect overall results, individual endpoints, and Regions, then correlate degradation with infrastructure metrics.

| Test | Load pattern | What it reveals |
|---|---|---|
| Load | Expected traffic | Whether expected capacity meets requirements |
| Stress | Beyond normal capacity | Breaking points |
| Endurance | Sustained traffic over time | Gradual problems such as memory leaks |

### Exam cues

- If the question says generate traffic from several Regions without managing servers, think Distributed Load Testing on AWS, because its test runners use Fargate.
- If the question says find the breaking point, think stepped stress testing, because it increases load beyond normal capacity.
- If the question says a release became slower, think baseline comparison, because historical results expose regressions.

### Remember

- Supported test inputs include JMeter, k6, Locust, and simple HTTP configuration.
- Throughput is the request rate; results include requests per second and error counts.
- Response-time percentiles include p50, p90, p95, and p99. A percentile describes a position in the response-time distribution.
- Result views include Overall, By Endpoint, and By Region.

> **Trap:** An acceptable average response time does not establish that response-time percentiles, error rate, and throughput meet the objectives. Compare each required metric.
