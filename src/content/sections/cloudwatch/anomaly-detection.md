---
title: Anomaly detection
level: associate
order: 50
facts:
  - id: anomaly-model
    text: CloudWatch anomaly detection models expected metric values from historical behavior rather
      than a fixed threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection
  - id: anomaly-seasonality
    text: The model accounts for hourly, daily, and weekly patterns as well as longer trends.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
  - id: anomaly-training
    text: Training uses up to 2 weeks of history and does not require a full 2 weeks before enabling
      detection.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
  - id: anomaly-statistic
    text: An anomaly detection model is specific to both a metric and its statistic.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
  - id: anomaly-threshold
    text: Increasing the anomaly detection threshold widens the band of expected values.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
  - id: anomaly-direction
    text: An anomaly alarm can detect values above the expected band, below it, or on either side.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection
  - id: anomaly-exclusions
    text: Specified intervals such as deployments or incidents can be excluded from model training.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#CloudWatch_Anomaly_Detection_Algorithm
  - id: anomaly-math
    text: CloudWatch supports anomaly detection on supported metric math expressions as well as
      individual metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html#anomaly_detection_on_metric_math
cards:
  - id: cloudwatch-012
    q: A CloudWatch CPU alarm fires falsely during predictable daily traffic peaks. What feature fits
      better?
    a: An anomaly detection alarm. It models hourly, daily, and weekly patterns from up to 2 weeks of
      history and compares the measurement with an expected band.
    facts:
      - anomaly-model
      - anomaly-seasonality
      - anomaly-training
  - id: cloudwatch-054
    q: A deployment creates unusual CloudWatch measurements that should not define normal application
      behavior. What should operators change in anomaly detection?
    a: Exclude the deployment interval from model training. The model can then learn expected behavior
      without that unusual interval.
    facts:
      - anomaly-exclusions
  - id: cloudwatch-055
    q: Does a CloudWatch metric need a full 2 weeks of history before anomaly detection can be enabled?
    a: No. CloudWatch trains on up to 2 weeks but permits enabling detection with less history.
    trap: true
    facts:
      - anomaly-training
  - id: cloudwatch-056
    q: A CloudWatch anomaly band is too narrow for expected variation. Which setting widens it?
    a: Increase the anomaly detection threshold. A higher value produces a wider expected band.
    facts:
      - anomaly-threshold
---
CloudWatch anomaly detection learns an expected range for a measurement. It helps when normal traffic rises and falls so a fixed threshold cannot distinguish an expected peak from a problem.

### How it works

1. Select a metric and statistic, such as average CPU utilization. The model belongs to that metric and statistic combination.
2. CloudWatch trains on up to 2 weeks of history, including hourly, daily, and weekly patterns. It can start with less history.
3. Set the threshold that controls the width of the expected band. A larger value makes the band wider.
4. Choose whether an alarm should detect values above, below, or outside either side of the band. Exclude unusual training intervals such as deployments.

### Exam cues

- If the question says a static threshold pages on normal seasonal peaks, think anomaly detection, because its expected band follows recurring patterns.
- If the question says a deployment distorted the baseline, think training exclusions, because the deployment should not teach normal behavior.

### Remember

- Training uses up to 2 weeks, not a mandatory waiting period.
- Models are specific to a metric and statistic.
- Supported metric math expressions can also use anomaly detection.

> **Trap:** Increasing the threshold widens the band. It makes the alarm less sensitive to variation, not more sensitive.
