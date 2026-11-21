---
title: Trace propagation and diagnostics
level: professional
order: 60
facts:
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
cards:
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
X-Ray trace context connects work across instrumented HTTP services. Segments and subsegments also give different views of a call, helping you identify where recorded work belongs.

### How it works

1. Instrumented HTTP services pass trace context in the `X-Amzn-Trace-Id` header. `Root` identifies the trace, `Parent` identifies the upstream segment or subsegment, and `Sampled` carries the upstream recording decision.
2. A subsegment describes part of a segment, such as an outgoing call, SQL query, or custom code block. X-Ray uses instrumented client subsegments to create inferred nodes for services such as DynamoDB.
3. Compare the upstream client subsegment with the downstream service segment. The client view includes round-trip latency, while the service segment records the downstream service's view of the call.
4. In Lambda traces, `AWS::Lambda` records execution environment preparation and `AWS::Lambda::Function` records function work. Traces from instrumented SQS producers can also be linked to downstream Lambda consumer traces.

### Exam cues

- If the question says downstream HTTP work appears in a separate trace, think trace-header propagation, because `Root` and `Parent` carry the trace and upstream context.
- If the question says DynamoDB appears as an inferred node, think instrumented client subsegment, because X-Ray derives the node from the client record.
- If the question says Lambda preparation and function work need separate inspection, think `AWS::Lambda` and `AWS::Lambda::Function`, because they record those respective activities.
- If the question says an instrumented SQS producer sends messages to a Lambda consumer, think linked traces, because X-Ray can connect the producer and consumer work.

### Remember

- `Sampled` carries the upstream recording decision.
- The upstream client subsegment includes round-trip latency; the downstream segment records the service view.
- X-Ray does not support Lambda event source mappings for MSK, self-managed Kafka, Amazon MQ, or DocumentDB.

> **Trap:** An inferred DynamoDB node does not come from a DynamoDB segment. Inspect the instrumented client subsegment for the call.
