---
title: Traces, segments, and propagation
level: associate
order: 10
facts:
  - id: trace
    text: An X-Ray trace collects segments associated with one request and shows its path through
      services.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-traces
  - id: segment
    text: A segment records one resource or service handling a request, including timing and response
      information.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-segments
  - id: subsegment
    text: A subsegment describes part of a segment, such as an outgoing service call, SQL query, or
      custom block of code.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html#api-segmentdocuments-subsegments
  - id: inferred
    text: X-Ray derives inferred segments and graph nodes for services such as DynamoDB from
      instrumented client subsegments.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-subsegments
  - id: viewpoints
    text: A downstream segment records the service view of a call; the upstream subsegment records the
      client view, including round-trip latency.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-subsegments
  - id: header
    text: The X-Amzn-Trace-Id header carries trace context between instrumented HTTP services.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
  - id: root
    text: Root in an X-Ray trace header identifies the trace.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
  - id: parent
    text: Parent in an X-Ray trace header identifies the upstream segment or subsegment that connects
      the downstream request.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
  - id: sampled
    text: Sampled in an X-Ray trace header carries the upstream recording decision.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
  - id: api
    text: API Gateway REST API stages can make sampling decisions and add trace headers to requests
      without one.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
  - id: lambda
    text: Lambda Active tracing sends segments for sampled requests and follows the upstream sampling
      decision.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: lambda-segments
    text: The AWS::Lambda trace segment records Lambda service work preparing the execution environment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray-traces
  - id: function-segment
    text: The AWS::Lambda::Function trace segment records function work.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html#services-xray-traces
  - id: sqs
    text: Traces from instrumented SQS message producers can be linked automatically to downstream
      Lambda consumer traces.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: unsupported
    text: X-Ray does not support Lambda event source mappings for MSK, self-managed Kafka, Amazon MQ, or
      DocumentDB.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
  - id: size
    text: An X-Ray segment document can be at most 64 kB.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html
  - id: client-header
    text: Trace headers can come from clients; an application can remove incoming headers to avoid
      client-supplied trace IDs or sampling choices.
    source: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
diagrams:
  - id: xray-request-trace
    title: One trace across API Gateway, Lambda and DynamoDB
    width: 1260
    height: 392
    nodes:
      - id: client
        label: Client
        icon: res-client
        h: 72
        x: 28
        y: 143
        w: 120
        tone: user
        info: A request with no tracing header gets one from the **first X-Ray-integrated service** it hits.
      - id: api
        label: API Gateway
        sub: active tracing on stage
        icon: api-gateway
        h: 86
        x: 322
        y: 136
        w: 170
        tone: network
        info: Makes the **sampling decision** using your sampling rules and adds `X-Amzn-Trace-Id` with
          `Sampled=1` or `0`. REST APIs only.
      - id: lambda
        label: Lambda
        sub: Active tracing
        icon: lambda
        h: 86
        x: 714
        y: 136
        w: 150
        tone: compute
        info: With Active tracing, Lambda sends service and function segments for sampled requests and
          follows the upstream sampling decision.
      - id: db
        label: DynamoDB
        sub: inferred node
        icon: dynamodb
        h: 86
        x: 1064
        y: 136
        w: 140
        tone: database
        info: DynamoDB sends no segment itself. An **instrumented AWS SDK client** records a subsegment, and
          X-Ray draws the node from it.
    edges:
      - from: client
        to: api
        step: 1
        label: request
      - from: api
        to: lambda
        step: 2
        label: trace header
      - from: lambda
        to: db
        step: 3
        label: SDK call
    steps:
      - The request enters API Gateway, which decides whether to sample it and adds the tracing
        header.
      - Lambda receives the header and, with Active tracing, sends its segments when the request is
        sampled, so the nodes connect into one trace.
      - An instrumented SDK client adds a subsegment for the DynamoDB call, which shows its latency
        and errors.
cards:
  - id: xray-002
    q: What problem does AWS X-Ray solve for a request that crosses several services?
    a: It joins the recorded work into a trace so you can inspect the request path, timing, and
      responses across services.
    facts:
      - trace
      - segment
  - id: xray-003
    q: How do X-Ray traces, segments, and subsegments differ?
    a: A trace groups one request. A segment describes a service handling it. A subsegment describes
      part of that work, such as a downstream call; client subsegments can also produce inferred
      nodes.
    facts:
      - trace
      - segment
      - subsegment
      - inferred
  - id: xray-004
    q: An X-Ray request crosses instrumented HTTP services but downstream work appears in a separate
      trace. What should the team check?
    a: Check propagation of X-Amzn-Trace-Id and its Root, Parent, and Sampled fields. The shared trace
      ID and parent context connect the work.
    facts:
      - header
      - root
      - parent
      - sampled
  - id: xray-015
    q: What do the AWS::Lambda and AWS::Lambda::Function segments describe in an X-Ray trace?
    a: AWS::Lambda describes service work preparing the execution environment. AWS::Lambda::Function
      describes the function work.
    facts:
      - lambda-segments
      - function-segment
  - id: xray-023
    q: An instrumented producer sends SQS messages to a Lambda function with Active tracing. Can X-Ray
      connect producer and consumer work?
    a: Yes. X-Ray links producer traces to downstream Lambda consumer traces. This support does not
      extend to MSK, self-managed Kafka, Amazon MQ, or DocumentDB event source mappings.
    facts:
      - sqs
      - unsupported
  - id: xray-024
    q: An ECS application sees DynamoDB as an inferred node in X-Ray. Where can the team inspect its
      call latency?
    a: Inspect the instrumented AWS SDK client subsegment in the trace timeline. DynamoDB does not
      supply its own segment; X-Ray derives its node from that subsegment.
    facts:
      - subsegment
      - inferred
    trap: true
  - id: xray-026
    q: Why can an X-Ray client subsegment and a downstream service segment report different durations
      for the same call?
    a: They measure different viewpoints. The upstream client includes round-trip latency; the
      downstream service measures its own processing.
    facts:
      - viewpoints
---
X-Ray follows recorded requests across a distributed application, meaning an application whose work spans services. A trace is the request's connected record; segments describe service work and subsegments describe smaller operations within that work.

### How it works

1. The first integrated service establishes trace context, the identifiers and recording decision that relate work to a request. For API Gateway REST APIs, a stage can sample incoming requests and add a missing trace header.
2. Instrumented HTTP clients forward `X-Amzn-Trace-Id`. Its `Root` identifies the trace, `Parent` connects the caller, and `Sampled` carries the recording decision.
3. Services send segments for their work. Instrumented clients add subsegments for calls to other services or databases.
4. X-Ray joins the records by trace ID. For a dependency that sends no segment, such as DynamoDB, it creates an inferred node from the caller's subsegment.

An inferred node is X-Ray's reconstruction of a dependency from client observations. The client measures round-trip time, including travel between services. A downstream service segment measures that service's own work.

Lambda Active tracing follows upstream sampling and produces service and function segments. For SQS-driven Lambda consumers, producer and consumer traces can be linked rather than represented as one synchronous call.

### Exam cues

- If the question says downstream work appears in a separate trace, think trace-header propagation, because the shared trace ID and parent context connect the request.
- If the question says DynamoDB has an inferred node, think instrumented client subsegments, because DynamoDB does not send its own segment.
- If the question says separate Lambda preparation from function work, think `AWS::Lambda` and `AWS::Lambda::Function`, because they describe those different activities.

### Remember

- The HTTP context header is `X-Amzn-Trace-Id`, with `Root`, `Parent`, and `Sampled` fields.
- A segment document has a maximum size of 64 kB.
- MSK, self-managed Kafka, Amazon MQ, and DocumentDB Lambda event source mappings do not support X-Ray tracing.
- Incoming trace headers can come from clients; applications can remove them to avoid client-controlled trace IDs and sampling decisions.

> **Trap:** An inferred node does not mean the dependency emitted its own trace segment. Inspect the caller's subsegment for the recorded downstream latency and response.
