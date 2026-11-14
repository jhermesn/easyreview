---
title: Health and deployment troubleshooting
level: associate
order: 80
facts:
  - id: health-inputs
    text: Enhanced health combines an instance agent's operating system metrics and request logs with load balancer, Auto Scaling, and deployment information.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced
  - id: agent-frequency
    text: The enhanced health agent reports instance metrics to Beanstalk every 10 seconds.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced-agent
  - id: health-causes
    text: The console Health page and eb health show health status and causes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced-factors
  - id: deployment-id
    text: Instance deployment IDs identify versions left after a failed rolling application deployment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced-factors
  - id: health-log
    text: Instances in a failed immutable update upload bundle logs to S3 before termination.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: immutable-log-retention
    text: Failed immutable update logs remain in S3 for one hour, compared with the standard 15 minutes for bundle and tail logs.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html#environmentmgmt-updates-immutable
  - id: web-checks
    text: With enhanced health during rolling deployments, web instances need 12 consecutive OK checks within two minutes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: worker-checks
    text: With enhanced health during rolling deployments, worker instances need 18 consecutive OK checks within three minutes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: threshold
    text: HealthCheckSuccessThreshold allows a lower accepted health status such as Warning.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-namespace
  - id: command-timeout
    text: Command timeout in aws:elasticbeanstalk:command defaults to 10 minutes and controls the time allowed for instance deployment health.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced-factors-timeout
  - id: ignore-health
    text: Ignore health check prevents rollback when a batch does not become healthy within Command timeout; it does not repair the application.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-console
  - id: health-url
    text: An application health check URL must return HTTP 200 to an HTTP GET before the load balancer sends traffic; without a URL, accepting a TCP connection can satisfy the check before application readiness.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: event-types
    text: Beanstalk sends environment health transitions, operation state changes, resource state changes, and managed update events to EventBridge.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.eventbridge.html#AWSHowTo.eventbridge
  - id: event-response
    text: EventBridge rules match Beanstalk events and invoke targets such as SNS notifications or Lambda functions.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.eventbridge.html#AWSHowTo.eventbridge
  - id: event-delivery
    text: Beanstalk events use best-effort delivery to EventBridge; events may be delayed or not delivered.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.eventbridge.html#AWSHowTo.eventbridge
  - id: instance-logs
    text: Instance logs provide command and application output for investigating deployment failures.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html#linux-commands
  - id: cloudwatch-log-streaming
    text: When instance log streaming is enabled, Elastic Beanstalk sends environment instance log files to CloudWatch Logs.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.cloudwatchlogs.html#AWSHowTo.cloudwatchlogs.loggroups
  - id: basic-health
    text: Basic health reporting uses load balancer health checks (or EC2 status checks in a single-instance environment), checks that the Auto Scaling group has at least one instance, and publishes no metrics to CloudWatch.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.healthstatus.html
cards:
  - id: elastic-beanstalk-006
    q: An Elastic Beanstalk deployment stays at Warning even though the team has confirmed it operates correctly. Which health settings can change acceptance?
    a: Lower Healthy threshold with HealthCheckSuccessThreshold, or increase Command timeout if startup needs more time. Ignore health check forces continuation when a batch cannot become healthy; it does not fix the cause.
    facts:
      - threshold
      - command-timeout
      - ignore-health
  - id: elastic-beanstalk-029
    q: How does Elastic Beanstalk enhanced health help troubleshoot a failed release?
    a: It combines request and operating system data with environment state. Inspect Health or eb health causes, compare instance deployment IDs, and retrieve logs.
    facts:
      - health-inputs
      - health-causes
      - deployment-id
      - health-log
      - instance-logs
  - id: elastic-beanstalk-030
    q: An Elastic Beanstalk batch fails before a slow application becomes ready. Which checks and setting should be reviewed?
    a: Review the application health check URL and Command timeout. The URL must return 200 when ready; allow sufficient startup time before changing health acceptance.
    facts:
      - health-url
      - command-timeout
  - id: elastic-beanstalk-056
    q: An Elastic Beanstalk environment should notify operators when health degrades. Which integration fits?
    a: Use an EventBridge rule matching environment health transitions and target SNS or Lambda. Delivery is best effort.
    facts:
      - event-types
      - event-response
      - event-delivery
  - id: elastic-beanstalk-057
    q: An Elastic Beanstalk immutable update failed and its replacement instances were removed. Where are the diagnostic logs and how long do they remain?
    a: The instances upload bundle logs to S3 before termination. Logs from a failed immutable update remain for one hour.
    facts:
      - health-log
      - immutable-log-retention
  - id: elastic-beanstalk-058
    q: How many consecutive enhanced health checks must an Elastic Beanstalk rolling deployment batch pass?
    a: Web instances need 12 OK checks within two minutes; worker instances need 18 within three minutes.
    facts:
      - web-checks
      - worker-checks
  - id: elastic-beanstalk-059
    q: A team wants Elastic Beanstalk environment instance logs sent to CloudWatch Logs for troubleshooting. What should it enable?
    a: Enable instance log streaming to CloudWatch Logs.
    facts:
      - cloudwatch-log-streaming
  - id: elastic-beanstalk-061
    q: What does Elastic Beanstalk basic health reporting check, and does it publish metrics to CloudWatch?
    a: Load balancer health checks (or EC2 status checks for a single instance) and that the Auto Scaling group has at least one instance. It publishes no CloudWatch metrics; enhanced health adds an agent and more data.
    facts: [basic-health]
---
Elastic Beanstalk enhanced health explains why an environment or instance is unhealthy by combining request results, system metrics, and operation state. A green load balancer check alone can miss an application that accepts connections before it is ready.

### How it works

1. The instance health agent reads request logs and operating system metrics and sends metrics to Beanstalk every 10 seconds. Beanstalk combines these with load balancer, Auto Scaling, and deployment state.
2. Inspect **Health** in the console or `eb health` for causes. Compare each instance's deployment ID, the identifier of its last deployment, to locate versions left behind after a failed rolling deployment. Retrieve instance logs for the failure details.
3. Check the application's health URL. The load balancer expects HTTP GET to return 200. Without a URL, a successful TCP connection, the network connection beneath HTTP, can mark an instance ready before application startup finishes.
4. Allow enough startup time with Command timeout. With enhanced health, a web batch needs 12 consecutive OK checks within two minutes; a worker batch needs 18 within three minutes.
5. If an application is confirmed stable at a lower status, adjust `HealthCheckSuccessThreshold`. `Ignore health check` prevents rollback after the health timeout but does not repair the cause.
6. Match health transitions or operation state changes with EventBridge rules to invoke SNS notifications or Lambda functions. Beanstalk events use best-effort delivery, so individual events can be delayed or missing.

Enable instance log streaming to send environment log files to CloudWatch Logs.

### Exam cues

- If the question says failed rolling deployment with different versions across instances, think deployment IDs and health causes, because they identify which deployment reached each instance.
- If the question says the load balancer sends requests before startup finishes, think an application health check URL, because accepting a TCP connection does not prove the app is ready.
- If the question says notify on environment health or deployment failure, think EventBridge rules, because Beanstalk publishes health and operation transitions.
- If the question says failed immutable instances disappeared, think S3 bundle logs, because they are uploaded before termination.
- If the question says send instance logs to CloudWatch Logs, think instance log streaming, because Elastic Beanstalk sends the environment's log files when it is enabled.

### Remember

- Agent reports: every 10 seconds.
- Command timeout default: 10 minutes. This differs from the configuration rolling update timeout.
- Enhanced deployment health: 12 checks in two minutes for web; 18 in three minutes for workers.
- Failed immutable logs: one hour in S3. Standard bundle and tail logs: 15 minutes.

> **Trap:** Ignore health check changes whether deployment continues after failed health checks. It does not make an unhealthy application healthy.
