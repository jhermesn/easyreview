---
title: Service instrumentation
level: associate
order: 40
facts:
  - id: instrumentation
    text: Instrumentation adds tracing code or configuration that records application work for
      collection.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-migration.html#migration-to-opentelemetry
  - id: otel
    text: AWS recommends OpenTelemetry for application instrumentation and supports sending its traces
      to X-Ray.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-migration.html
  - id: maintenance
    text: X-Ray SDKs and daemon entered maintenance on February 25, 2026; subsequent releases address
      security issues only.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-daemon-timeline.html
  - id: udp
    text: The X-Ray daemon receives raw segment data on UDP port 2000 and relays it to the X-Ray API.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html
  - id: not-otel
    text: OpenTelemetry collectors and the CloudWatch agent are alternatives to the X-Ray daemon; they
      have their own configured trace receivers.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-migration.html#xray-Daemon-migration
  - id: managed-daemon
    text: Lambda runs the X-Ray daemon for sampled invocations.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html
  - id: beanstalk
    text: Elastic Beanstalk can run the X-Ray daemon using the XRayEnabled option.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html
  - id: cloudwatch
    text: The CloudWatch agent can collect OpenTelemetry or X-Ray SDK traces from EC2 and on-premises
      servers and send them to X-Ray.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html
  - id: active
    text: Lambda Active tracing automatically sends segments for sampled requests.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: pass
    text: Lambda defaults to PassThrough, which forwards context but does not automatically send traces,
      even if the upstream decision samples the request.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray-default
  - id: role
    text: Lambda requires xray:PutTraceSegments and xray:PutTelemetryRecords on its execution role;
      AWSXRayDaemonWriteAccess includes them.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray-permissions
  - id: cfn
    text: "Lambda CloudFormation configuration uses TracingConfig with Mode: Active; SAM functions use
      Tracing: Active."
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray-cloudformation
  - id: ecs
    text: An ECS application can run an X-Ray daemon container alongside the application and authorize
      trace uploads through the task role.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html
  - id: bridge
    text: For the documented ECS bridge setup, link the app to the daemon and set
      AWS_XRAY_DAEMON_ADDRESS to its address.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html
  - id: awsvpc
    text: The documented ECS awsvpc setup omits the bridge link, hostPort, and AWS_XRAY_DAEMON_ADDRESS.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon-ecs.html
  - id: api
    text: API Gateway supports X-Ray for REST APIs; enable tracing on the stage and redeploy the API.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
  - id: api-passive
    text: API Gateway can record a segment for a request already sampled upstream even with stage active
      tracing disabled.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
  - id: daemon-upload
    text: The X-Ray daemon requires AWS permissions to upload segment documents to X-Ray.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-daemon.html#xray-daemon-permissions
diagrams:
  - id: xray-ecs-upload
    title: Existing SDK trace upload from an ECS task
    width: 1000
    height: 230
    groups:
      - label: ECS task
        x: 10
        y: 10
        w: 650
        h: 205
        tone: devtools
    nodes:
      - id: app
        label: Application
        icon: res-elastic-container-service-task
        sub: X-Ray SDK segments
        x: 30
        y: 75
        w: 270
        h: 86
        tone: compute
      - id: daemon
        label: Daemon sidecar
        icon: res-elastic-container-service-task
        sub: UDP 2000 receiver
        x: 360
        y: 75
        w: 270
        h: 86
        tone: compute
      - id: xray
        label: X-Ray
        icon: x-ray
        sub: task role authorizes API
        x: 690
        y: 75
        w: 270
        h: 86
        tone: devtools
    edges:
      - from: app
        to: daemon
        step: 1
      - from: daemon
        to: xray
        step: 2
    steps:
      - The instrumented application sends raw segments to the daemon over UDP 2000.
      - The daemon relays the segments to the X-Ray API using the task role.
cards:
  - id: xray-001
    q: An ECS application using the X-Ray SDK needs to upload traces. What should the team deploy and
      authorize?
    a: Run the X-Ray daemon alongside the app, expose UDP 2000, and give the ECS task role X-Ray write
      permissions. OpenTelemetry is the recommended instrumentation path for new work.
    facts:
      - ecs
      - udp
      - otel
  - id: xray-012
    q: How should a team enable native X-Ray tracing for a Lambda function?
    a: Set Active tracing and grant xray:PutTraceSegments and xray:PutTelemetryRecords on the execution
      role. AWSXRayDaemonWriteAccess includes those permissions; Lambda runs the daemon.
    facts:
      - active
      - role
      - managed-daemon
      - beanstalk
  - id: xray-013
    q: API Gateway has a sampled request trace but the invoked Lambda function has no automatic
      segments. What Lambda setting should the team check?
    a: Check for default PassThrough mode and enable Active tracing. PassThrough forwards context
      without automatically sending traces, even when the upstream request was sampled.
    facts:
      - pass
      - active
    trap: true
  - id: xray-016
    q: A team needs X-Ray sampling and traces from an API Gateway REST API stage. What configuration is
      required?
    a: Enable X-Ray tracing on the stage and redeploy the API. X-Ray support here is for REST APIs. An
      already sampled upstream request can still generate a segment with stage active tracing
      disabled.
    facts:
      - api
      - api-passive
  - id: xray-017
    q: How can an instrumented EC2 or on-premises application send traces to X-Ray?
    a: Use an OpenTelemetry collection path or the CloudWatch agent. Existing X-Ray SDK applications can
      send raw segments to the X-Ray daemon on UDP 2000. The daemon needs permission to upload.
    facts:
      - otel
      - cloudwatch
      - udp
      - managed-daemon
      - beanstalk
      - daemon-upload
  - id: xray-018
    q: An ECS team uses the X-Ray daemon in bridge mode. How does its configuration differ from the
      documented awsvpc example?
    a: Bridge mode uses a container link and AWS_XRAY_DAEMON_ADDRESS. The awsvpc example omits that
      link, address variable, and hostPort. The task role authorizes trace uploads.
    facts:
      - bridge
      - awsvpc
      - ecs
  - id: xray-019
    q: What support change applies to the X-Ray SDKs and daemon, and what does AWS recommend?
    a: They entered maintenance on February 25, 2026, with security fixes only. AWS recommends migrating
      instrumentation to OpenTelemetry.
    facts:
      - maintenance
      - otel
  - id: xray-031
    q: Must an OpenTelemetry collector use the X-Ray daemon UDP 2000 protocol?
    a: No. UDP 2000 describes the X-Ray daemon receiver. An OpenTelemetry collector uses its configured
      receivers; choose a matching exporter and collection path.
    facts:
      - udp
      - not-otel
    trap: true
---
Instrumentation records application work so X-Ray can connect and analyze it. It includes tracing libraries and configuration for incoming requests and outgoing calls. A collector or agent receives those records and forwards them to the tracing service.

### How it works

1. Instrument the application with OpenTelemetry, the framework AWS recommends for producing tracing data. Existing applications may use X-Ray tracing libraries, also called X-Ray SDKs.
2. Choose the collection path. The X-Ray daemon receives SDK segments over UDP, the network protocol used for segment delivery, on port 2000. OpenTelemetry collectors use their own configured receivers. The CloudWatch agent can also collect traces from EC2 and on-premises servers.
3. Give the uploader permission to send traces. An ECS daemon uses the task role, the identity assigned to application containers. Lambda uses its execution role.
4. Enable managed tracing where needed: Active for Lambda, and stage tracing plus redeployment for API Gateway REST APIs.

| Platform | Configuration to recognize |
|---|---|
| Lambda | Active tracing; execution-role upload permissions; managed daemon |
| API Gateway REST API | Stage tracing and redeployment |
| ECS with existing X-Ray SDK | Daemon sidecar, UDP 2000, task-role write access |
| EC2 or on-premises | Instrumentation plus authorized collector, agent, or daemon |
| Elastic Beanstalk | XRayEnabled runs the daemon |

A sidecar is a supporting container alongside the application. In the documented ECS bridge setup, link the daemon and set AWS_XRAY_DAEMON_ADDRESS. The awsvpc setup omits the link, hostPort, and address variable. These are different container networking configurations.

Since February 25, 2026, the X-Ray SDKs and daemon are in maintenance with security fixes only. AWS recommends OpenTelemetry. This support notice concerns the instrumentation components.

### Exam cues

- If the question says API Gateway has traces but Lambda does not, think Lambda Active tracing and role permissions, because default PassThrough forwards context without automatic segments.
- If the question says an ECS daemon cannot upload, think task-role permissions, because that role authorizes its API calls.
- If the question says choose new application instrumentation, think OpenTelemetry, because AWS recommends it following SDK and daemon maintenance.

### Remember

- Lambda permissions: xray:PutTraceSegments and xray:PutTelemetryRecords, included in AWSXRayDaemonWriteAccess.
- CloudFormation Lambda: TracingConfig with Mode: Active. SAM: Tracing: Active.
- X-Ray daemon receiver: UDP 2000. This is not a universal OpenTelemetry receiver setting.
- API Gateway X-Ray support is for REST APIs.

> **Trap:** PassThrough does not automatically emit Lambda traces even when the upstream header requests sampling. Enable Active tracing for native Lambda segments.
