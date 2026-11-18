---
title: "PLACEHOLDER xray/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
