---
title: Device connectivity
level: foundational
order: 10
facts:
  - id: purpose
    text: AWS IoT provides the cloud services that connect IoT devices to other devices and to AWS cloud services, plus device software to integrate them.
    source: https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html#what-is-aws-iot
  - id: protocols
    text: AWS IoT Core supports the MQTT, MQTT over WSS, HTTPS and LoRaWAN protocols for managing devices in the field.
    source: https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html#what-is-aws-iot
cards:
  - id: iot-core-001
    q: A company has thousands of sensors that must send data securely to AWS and receive commands. Which AWS service connects them?
    a: AWS IoT Core.
    facts: [purpose]
  - id: iot-core-002
    q: Which messaging protocols does AWS IoT Core support for devices?
    a: MQTT, MQTT over WSS, HTTPS and LoRaWAN.
    facts: [protocols]
  - id: iot-core-003
    q: Is Amazon SQS the service for managing and connecting IoT devices?
    a: No. Connecting and managing IoT devices is AWS IoT Core; SQS queues messages between application components.
    trap: true
    facts: [purpose]
---
AWS IoT Core is the entry point for IoT devices into AWS. Devices connect to it over IoT protocols such as MQTT, exchange messages, and reach other AWS services. [What is AWS IoT?](https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html#what-is-aws-iot)

### How it works

1. Register devices and give them credentials.
2. Devices connect with MQTT, HTTPS or LoRaWAN and publish messages.
3. IoT Core routes the messages to other devices or AWS services.

### Exam cues

- If the question says connect or manage IoT devices, think AWS IoT Core.

### Remember

- Protocols: MQTT, MQTT over WSS, HTTPS, LoRaWAN.

> **Trap:** IoT Core is the device-facing service; storing and analyzing the device data is done by other services downstream.
