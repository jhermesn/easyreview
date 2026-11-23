---
title: Edge applications and connectivity
level: foundational
order: 10
facts:
  - id: edge-runtime
    text: AWS IoT Greengrass provides an edge runtime for IoT applications on devices.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html#what-is-iot-greengrass
  - id: local-code
    text: AWS IoT Greengrass can run software on devices.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html#what-is-iot-greengrass
  - id: inference
    text: AWS IoT Greengrass applications can run predictions using machine learning models on devices.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html#what-is-iot-greengrass
  - id: messaging
    text: Greengrass components can exchange messages through local publish and subscribe.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/ipc-publish-subscribe.html
  - id: offline
    text: AWS IoT Greengrass components can collect and process data while devices are offline.
    source: https://docs.aws.amazon.com/wellarchitected/latest/iot-lens/failure-management.html#iotrel12-bp01
  - id: forwarding
    text: Edge applications can store data during a disconnection and send it to the cloud after the device reconnects.
    source: https://docs.aws.amazon.com/wellarchitected/latest/iot-lens/failure-management.html#iotrel12-bp01
  - id: core
    text: Greengrass devices talk to AWS IoT Core and can send their IoT data on to the AWS Cloud.
    source: https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html#what-is-iot-greengrass
  - id: core-role
    text: AWS IoT Core connects devices with the cloud and processes messages between them.
    source: https://docs.aws.amazon.com/iot/latest/developerguide/iot-gs.html#aws-iot-get-started
cards:
  - id: iot-greengrass-001
    q: What does AWS IoT Greengrass run on edge devices?
    a: IoT application software. It can process device data and run machine learning predictions locally.
    facts: [edge-runtime, local-code, inference]
  - id: iot-greengrass-002
    q: A factory device must process data while its cloud connection is down. Which AWS IoT service fits?
    a: AWS IoT Greengrass. Its components can collect and process data offline.
    facts: [edge-runtime, offline]
  - id: iot-greengrass-003
    q: How can AWS IoT Greengrass components exchange messages on a device?
    a: Use local publish and subscribe messaging. Components send messages to topics that other components receive.
    facts: [messaging]
  - id: iot-greengrass-004
    q: A disconnected device must send stored data to AWS after reconnecting. Does AWS IoT Greengrass make that automatic for every application?
    a: No. Design the edge application to store and forward the data when connectivity returns.
    trap: true
    facts: [forwarding, offline]
  - id: iot-greengrass-005
    q: How do AWS IoT Greengrass and AWS IoT Core work together for device data?
    a: Greengrass runs software locally. Its devices can communicate with AWS IoT Core, which connects devices and the cloud.
    facts: [local-code, core, core-role]
---
AWS IoT Greengrass runs IoT software on edge devices, close to where data is produced. The edge is the device side of a system, away from the cloud.

### How it works

1. Run application software on a device. It can process local data and make predictions using a machine learning model.
2. Software components can exchange messages locally. Components are modules of an application.
3. Components can keep collecting and processing data when the device is offline. Design the application to store needed data and send it after reconnection.
4. A Greengrass device can communicate with AWS IoT Core, which connects devices with the cloud.

### Exam cues

- If the question says a device must process data without a cloud connection, think AWS IoT Greengrass, because its components can work offline.
- If the question says a device must make predictions locally, think AWS IoT Greengrass, because it can run machine learning models on the device.
- If the question says devices need cloud messaging, think AWS IoT Core, because it connects devices and the cloud.

### Remember

- Greengrass runs software locally and can communicate with AWS IoT Core.
- Offline data forwarding needs application design and device storage.

> **Trap:** Offline processing does not guarantee that every application will send stored data after reconnection. Design the application to store and forward it.
