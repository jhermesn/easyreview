---
title: Synthetics and release diagnostics
level: associate
order: 150
facts:
  - id: canary-purpose
    text: Synthetics canaries run scripted endpoint and user-flow checks without requiring customer
      traffic.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: canary-runtime
    text: Canary scripts use Node.js, Python, or Java and create Lambda functions in the account.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: canary-schedule
    text: Canaries can run once or on a schedule as often as once per minute using cron or rate
      expressions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: canary-browser
    text: Java canary runtimes do not include browser support or browser frameworks.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: canary-metrics
    text: Canaries publish metrics in the CloudWatchSynthetics namespace.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_metrics.html#CloudWatch_Synthetics_Canaries_metrics
  - id: canary-success
    text: SuccessPercent measures the percentage of canary runs that succeed without failures.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_metrics.html#CloudWatch_Synthetics_Canaries_metrics
  - id: canary-duration
    text: Duration measures canary run duration in milliseconds.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_metrics.html#CloudWatch_Synthetics_Canaries_metrics
  - id: canary-artifacts
    text: Canary run logs are stored in S3 and CloudWatch Logs; the details page exposes steps,
      screenshots, logs, and HAR files where available.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Details.html#CloudWatch_Synthetics_Canaries_Details
  - id: canary-s3
    text: Synthetics stores screenshots, HAR files, and reports in the configured S3 bucket.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_artifact_encryption.html#CloudWatch_Synthetics_artifact_encryption
  - id: canary-har
    text: A HAR file is an HTTP Archive recording web-request performance details.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Details.html#CloudWatch_Synthetics_Canaries_Details
  - id: blue-heartbeat
    text: The heartbeat blueprint loads a URL and stores a screenshot, a HAR file, and logs of accessed
      URLs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_Heartbeat
  - id: blue-api
    text: API canaries test API functionality and can perform multiple calls.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_API
  - id: blue-links
    text: The broken link checker follows page links up to the configured count, including the starting
      URL in that count.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_Broken_Links
  - id: blue-visual
    text: Visual monitoring compares screenshots against a baseline and fails when the difference
      exceeds the configured percentage threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_VisualTesting
  - id: blue-visual-runtime
    text: The visual monitoring blueprint requires a supported Puppeteer runtime and does not support
      Python/Selenium or Playwright runtimes.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_VisualTesting
  - id: canary-debug
    text: For a failed canary, inspect SuccessPercent, failed-run steps, screenshots, HAR files, and
      logs and compare them with a successful run.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Troubleshoot.html#CloudWatch_Synthetics_Canaries_Troubleshoot
  - id: rum-sessions
    text: CloudWatch RUM collects performance information from actual user sessions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: term-canary
    text: A canary is a script that exercises an endpoint or user flow without requiring customer
      traffic.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: term-blueprint
    text: A canary blueprint is a starting script for a common synthetic check.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints
  - id: canary-cron-rate
    text: Canary rate expressions specify a repeated interval; cron expressions specify scheduled times.
    source: https://docs.aws.amazon.com/AmazonSynthetics/latest/APIReference/API_CanaryScheduleInput.html#API_CanaryScheduleInput
  - id: term-endpoint
    text: An endpoint is the URL a canary requests when it calls an API.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html#CloudWatch_Synthetics_Canaries_Blueprints_API
  - id: term-api
    text: An application programming interface (API) is an interface that other programs call to use
      application functionality.
    source: https://aws.amazon.com/what-is/api/
cards:
  - id: cloudwatch-025
    q: A team must detect a broken checkout flow before customers encounter it. Which CloudWatch feature
      should it use?
    a: A Synthetics canary that scripts the checkout actions. Canaries run without customer traffic and
      publish SuccessPercent and Duration metrics in CloudWatchSynthetics.
    facts:
      - canary-purpose
      - canary-metrics
      - canary-success
      - canary-duration
  - id: cloudwatch-041
    q: A team must test a login page while there are no customer sessions. Should it use CloudWatch RUM
      or Synthetics?
    a: Synthetics. Its canary runs a scripted check independently of customer traffic. RUM observes
      actual user sessions.
    trap: true
    facts:
      - canary-purpose
      - rum-sessions
  - id: cloudwatch-090
    q: What CloudWatch Synthetics blueprint detects broken page links, and what counts toward its
      configured link count?
    a: The broken link checker. The starting URL counts toward the limit along with followed links.
    facts:
      - blue-links
  - id: cloudwatch-091
    q: A release changes a web layout unexpectedly while HTTP requests still succeed. Which CloudWatch
      Synthetics check detects this?
    a: Visual monitoring using a supported Puppeteer runtime. It compares screenshots with a baseline
      and fails when the difference exceeds the configured percentage.
    facts:
      - blue-visual
      - blue-visual-runtime
  - id: cloudwatch-092
    q: A CloudWatch Synthetics checkout canary fails after an application release. Which evidence helps
      isolate the failed operation?
    a: Inspect the failed run steps, screenshots, HAR request details, and logs; compare them with a
      successful run. Logs are available in S3 and CloudWatch Logs.
    facts:
      - canary-debug
      - canary-artifacts
      - canary-har
diagrams:
  - id: cloudwatch-canary-run-evidence
    title: A canary exercises an endpoint and records its run
    width: 1000
    height: 430
    nodes:
      - id: canary
        label: Canary
        sub: Lambda execution
        icon: lambda
        x: 40
        y: 175
        w: 210
        h: 86
        tone: compute
      - id: endpoint
        label: Endpoint
        sub: scripted requests
        icon: res-client
        x: 390
        y: 45
        w: 210
        h: 86
        tone: user
      - id: metrics
        label: CloudWatch
        sub: success + duration
        icon: cloudwatch
        x: 740
        y: 175
        w: 210
        h: 86
        tone: mgmt
      - id: artifacts
        label: S3 artifacts
        sub: screenshots + reports
        icon: res-simple-storage-service-bucket
        x: 390
        y: 305
        w: 210
        h: 86
        tone: storage
    edges:
      - from: canary
        to: endpoint
        step: 1
        label: exercise
      - from: canary
        to: metrics
        step: 2
        label: publish metrics
      - from: canary
        to: artifacts
        step: 3
        label: store evidence
    steps:
      - The canary runs its script against the endpoint independently of customer traffic.
      - The canary publishes SuccessPercent and Duration to CloudWatch.
      - S3 stores screenshots, HAR files, and reports for diagnosis.
---
CloudWatch Synthetics runs canaries, scripts that exercise endpoints, the addresses applications call, or user actions without waiting for customers. A canary acts as a scheduled test user and leaves measurements and run evidence for diagnosis.

### How it works

1. Write a script or choose a blueprint, a starting script for a common check. Canaries use Node.js, Python, or Java and run through Lambda functions created in your account. Java runtimes do not include browser support.
2. Run the canary once or schedule it using cron, a calendar-style schedule expression, or rate, a repeated interval. Checks can run as often as once per minute.
3. Read `SuccessPercent` and `Duration` in the `CloudWatchSynthetics` namespace. The former measures successful runs without failures; the latter measures run time in milliseconds.
4. Investigate a failed run using steps, screenshots, logs, and HTTP Archive (HAR) files, which record web-request performance details. Logs are stored in S3 and CloudWatch Logs; screenshots, HAR files, and reports go to S3. Compare failed-run evidence with a successful run when diagnosing a release problem.

| Blueprint | What it checks |
|---|---|
| Heartbeat | Loads a URL and stores a screenshot, HAR file, and URL logs |
| API canary | Exercises an application programming interface (API), the interface other programs call, including multiple calls |
| Broken link checker | Follows links up to the configured count, including the starting URL |
| Visual monitoring | Compares screenshots with a baseline and fails beyond a configured difference threshold |

### Exam cues

- If the question says prove checkout works without customer traffic, think Synthetics, because a canary generates the user actions.
- If the question says pages still respond but links are broken, think broken link checker, because it follows links and records their failures.
- If the question says detect unexpected visual changes after a release, think visual monitoring, because screenshots are compared with a baseline.
- If the question says a release broke one checkout step, think failed-run details and a successful-run comparison, because the artifacts show the failing action and requests.

### Remember

- Maximum schedule frequency: once per minute.
- Canary metrics use `CloudWatchSynthetics`; `Duration` is in milliseconds.
- Visual monitoring needs a supported Puppeteer runtime; Python/Selenium and Playwright runtimes do not support that blueprint.
- Broken-link limits include the initial URL.

> **Trap:** A successful HTTP response does not prove the page looks right. A visual comparison can detect a layout change while requests still succeed.
