---
title: Managed message brokers
level: associate
order: 10
facts:
  - id: what
    text: Amazon MQ is a managed message broker service for Apache ActiveMQ Classic and RabbitMQ that handles broker setup, operation and maintenance.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html#welcome
  - id: migrate
    text: Existing message brokers can move to Amazon MQ without rewriting messaging code.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html#welcome
  - id: activemq-protocols
    text: ActiveMQ brokers on Amazon MQ accept AMQP, MQTT, MQTT over WebSocket, OpenWire and STOMP, all over TLS.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/working-with-activemq.html#working-with-activemq
  - id: rabbitmq-protocol
    text: RabbitMQ brokers on Amazon MQ accept AMQP 0-9-1 over TLS.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/rabbitmq-broker-architecture.html#rabbitmq-broker-architecture
  - id: active-standby
    text: An ActiveMQ active/standby broker is two brokers in two Availability Zones sharing Amazon EFS storage; if the active one fails or is under maintenance, the standby takes over.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/amazon-mq-broker-architecture.html#active-standby-broker-deployment
  - id: single-instance
    text: A single-instance ActiveMQ broker runs in one Availability Zone, with Amazon EBS storage in that zone or Amazon EFS storage that spans zones.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/amazon-mq-broker-architecture.html#single-broker-deployment
  - id: rabbitmq-cluster
    text: A RabbitMQ cluster deployment on Amazon MQ is three broker nodes across Availability Zones behind a Network Load Balancer, sharing users, queues and state.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/rabbitmq-broker-architecture.html#rabbitmq-broker-architecture-cluster
  - id: security
    text: Amazon MQ encrypts messages at rest and in transit, and access can be limited to a private endpoint in your VPC.
    source: https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html#amazonmq-features
cards:
  - id: amazon-mq-001
    q: An on-premises application uses JMS over OpenWire and AMQP with an Apache ActiveMQ broker. The company wants a managed broker on AWS without changing application code. Which service fits?
    a: "**Amazon MQ** for ActiveMQ.\nIt speaks the same protocols, so the code doesn't change; SQS and SNS would need a rewrite."
    trap: true
    facts: [what, migrate, activemq-protocols]
  - id: amazon-mq-002
    q: An Amazon MQ for ActiveMQ broker must survive the loss of an Availability Zone. Which deployment fits?
    a: "An active/standby broker: two brokers in two AZs on shared Amazon EFS storage."
    facts: [active-standby]
  - id: amazon-mq-003
    q: Which message broker engines does Amazon MQ manage?
    a: "Apache ActiveMQ Classic and RabbitMQ."
    facts: [what]
  - id: amazon-mq-004
    q: A RabbitMQ workload on Amazon MQ needs high availability across Availability Zones. Which deployment fits?
    a: "A RabbitMQ cluster deployment: three nodes across AZs behind a Network Load Balancer."
    facts: [rabbitmq-cluster]
  - id: amazon-mq-005
    q: IoT devices publish with MQTT to a self-managed ActiveMQ broker that the company wants to replace with a managed service. Which AWS service keeps MQTT working?
    a: "Amazon MQ for ActiveMQ, which accepts MQTT (and MQTT over WebSocket)."
    facts: [activemq-protocols, migrate]
---
Amazon MQ is the "lift the broker" answer: applications built on ActiveMQ or RabbitMQ keep their protocols and client libraries, and AWS runs, patches and fails over the brokers. [What is Amazon MQ?](https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html)

### How it works

1. Choose the engine (ActiveMQ Classic or RabbitMQ) and the deployment mode.
2. Amazon MQ creates the brokers, optionally only reachable inside your VPC.
3. Applications connect with their usual protocol over TLS.
4. Amazon MQ applies maintenance and upgrades in your maintenance window and fails over to a standby when needed.

| Engine | Protocols | High availability |
|---|---|---|
| ActiveMQ Classic | AMQP, MQTT, MQTT over WebSocket, OpenWire, STOMP | Active/standby in two AZs on shared EFS |
| RabbitMQ | AMQP 0-9-1 | Three-node cluster across AZs behind an NLB |

### Exam cues

- If the question says migrate an existing JMS, AMQP, MQTT, OpenWire or STOMP application without code changes, think Amazon MQ.
- If the question says a new cloud-native app needs a queue or pub/sub, think Amazon SQS or Amazon SNS.
- If the question says the broker must survive an AZ failure, think ActiveMQ active/standby or a RabbitMQ cluster.

### Remember

- Engines: ActiveMQ Classic and RabbitMQ.
- ActiveMQ HA: active/standby on EFS. RabbitMQ HA: 3-node cluster.
- Encryption at rest and in transit; private VPC endpoint possible.

> **Trap:** Amazon SQS and Amazon SNS have their own APIs. Moving a broker-based app to them means rewriting its messaging code, so when the requirement is "no code changes", pick Amazon MQ.
