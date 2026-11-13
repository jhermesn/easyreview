---
title: Alarm-based health checks
level: associate
order: 30
facts:
  - id: private
    text: Endpoint health checks cannot probe local, private, non-routable or multicast IP address ranges.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-IPAddress
  - id: alarm-stream
    text: An alarm-based health check reads the CloudWatch alarm metric data stream; OK means healthy and ALARM means unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: alarm-account
    text: The CloudWatch alarm must be in the same account as the health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
  - id: alarm-region
    text: AlarmIdentifier identifies a CloudWatch alarm by its name and AWS Region.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AlarmIdentifier.html
  - id: standard
    text: Alarm-based checks support standard-resolution metrics, not high-resolution metrics.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
  - id: statistics
    text: Supported alarm statistics are Average, Minimum, Maximum, Sum and SampleCount; extended statistics are unsupported.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
  - id: unsupported
    text: Alarm-based checks do not support M-out-of-N alarms or alarms using metric math to query multiple metrics.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
  - id: missing
    text: InsufficientDataHealthStatus can be Healthy, Unhealthy or LastKnownStatus; a new check using LastKnownStatus begins healthy.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-InsufficientDataHealthStatus
  - id: manual-state
    text: SetAlarmState cannot force a Route 53 health-check change because Route 53 reads the metric stream.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: update
    text: After changing the CloudWatch alarm settings, update its Route 53 health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
cards:
  - id: route53-008
    q: A private application needs Route 53 failover, but public checkers cannot reach it. How should health be represented?
    a: Use a CloudWatch alarm-based health check on an application-health metric. Endpoint checks cannot probe private IP ranges.
    facts:
      - private
      - alarm-stream
    trap: true
  - id: route53-009
    q: Which CloudWatch alarms can back a Route 53 health check?
    a: Same-account alarms identified by name and Region, using standard-resolution metrics and Average, Minimum, Maximum, Sum or SampleCount. Extended statistics, M-out-of-N alarms and multi-metric math alarms are unsupported.
    facts:
      - alarm-account
      - alarm-region
      - standard
      - statistics
      - unsupported
  - id: route53-010
    q: What does a Route 53 alarm-based health check report when CloudWatch lacks enough data?
    a: The configured Healthy, Unhealthy or LastKnownStatus result. A new LastKnownStatus check begins healthy. SetAlarmState cannot force a change.
    facts:
      - missing
      - manual-state
  - id: route53-037
    q: A team calls SetAlarmState to test Route 53 failover, but the health check does not change. Why?
    a: Route 53 reads the metric data stream, not the alarm state set by the API.
    facts:
      - manual-state
    trap: true
  - id: route53-038
    q: An operator changes the CloudWatch alarm threshold used by a Route 53 check. What additional update is required?
    a: Update the Route 53 health check after changing the alarm settings.
    facts:
      - update
diagrams:
  - id: route53-private-alarm-health
    title: Private application health reaches DNS through an alarm
    width: 840
    height: 180
    nodes:
      - id: app
        label: Private health
        icon: res-ec2-instance
        sub: application metric
        x: 20
        y: 50
        w: 220
        h: 86
        tone: network
      - id: alarm
        label: CloudWatch alarm
        icon: cloudwatch
        sub: same account
        x: 310
        y: 50
        w: 220
        h: 86
        tone: mgmt
      - id: dns
        label: Route 53 check
        icon: route-53
        sub: reads metric stream
        x: 600
        y: 50
        w: 220
        h: 86
        tone: network
    edges:
      - from: app
        to: alarm
        step: 1
      - from: alarm
        to: dns
        step: 2
    steps:
      - Represent private application health with a metric evaluated by an alarm.
      - Use the alarm metric data stream as the Route 53 health signal.
---
An alarm-based Route 53 health check turns a CloudWatch metric signal into DNS health. It is useful for a private application that public endpoint checkers cannot reach. A metric is a series of measurements; an alarm evaluates those measurements against a condition.

### How it works

1. Choose a standard-resolution metric that represents application health and configure a CloudWatch alarm in the same account.
2. Identify that alarm by its name and Region when creating the Route 53 health check.
3. Route 53 reads the alarm's metric data stream. A result corresponding to OK is healthy; ALARM is unhealthy.
4. Choose how the check handles insufficient data. Attach the check to the DNS record whose routing should depend on that health signal.
5. If you change the alarm settings, update the health check too.

### Exam cues

- If the question says private IPs cannot be reached by Route 53 checkers, think an alarm-based check, because health can come from a metric rather than a public probe.
- If the question says SetAlarmState did not change DNS health, think metric data stream, because Route 53 does not follow a manually set alarm state.

### Remember

- The alarm must be in the same account. Its identifier includes its Region.
- Supported statistics: Average, Minimum, Maximum, Sum and SampleCount.
- High-resolution metrics, extended statistics, M-out-of-N alarms and multi-metric math alarms are unsupported.
- Insufficient data can mean Healthy, Unhealthy or LastKnownStatus. New LastKnownStatus checks start healthy.

> **Trap:** Changing the CloudWatch alarm state with SetAlarmState does not force Route 53 failover.
