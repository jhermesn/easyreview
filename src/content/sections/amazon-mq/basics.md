---
title: Amazon MQ basics
level: foundational
order: 5
facts:
  - id: managed-brokers
    text: Amazon MQ manages message brokers for Apache ActiveMQ Classic and RabbitMQ.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html#welcome
  - id: cdk-broker
    text: The AWS CDK provides the CfnBroker construct to create an Amazon MQ broker.
    source: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_amazonmq.CfnBroker.html
cards:
  - id: amazon-mq-006
    q: Which AWS service manages Apache ActiveMQ Classic and RabbitMQ message brokers?
    a: Amazon MQ.
    facts: [managed-brokers]
---
Amazon MQ manages message brokers, which exchange messages between applications.

### How it works

1. Choose an Apache ActiveMQ Classic or RabbitMQ broker.
2. Create the broker, including with the AWS CDK CfnBroker construct.
3. Applications connect to the broker to exchange messages.

### Exam cues

- If the question says use a managed Apache ActiveMQ Classic broker, think Amazon MQ, because it manages that broker engine.

### Remember

- Broker engines include Apache ActiveMQ Classic and RabbitMQ.

> **Trap:** Amazon MQ manages existing broker engines. Amazon SQS is a separate managed queue service.
