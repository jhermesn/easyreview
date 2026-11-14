---
title: Simple virtual servers
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Lightsail is the easiest way to get started with AWS for anyone who needs to build websites or web applications.
    source: https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html#what-is-amazon-lightsail
  - id: bundle
    text: Lightsail includes instances (virtual private servers), container services, managed databases, CDN distributions, load balancers, SSD block storage, static IP addresses, DNS management and snapshots, for a low, predictable monthly price.
    source: https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html#what-is-amazon-lightsail
cards:
  - id: lightsail-001
    q: A small business wants to launch a WordPress website on AWS quickly, for a fixed, predictable monthly price. Which AWS service fits?
    a: Amazon Lightsail, which bundles a virtual server, storage and networking at a low monthly price.
    facts: [purpose, bundle]
  - id: lightsail-002
    q: What does Amazon Lightsail include besides virtual private servers?
    a: Container services, managed databases, CDN distributions, load balancers, block storage, static IPs, DNS management and snapshots.
    facts: [bundle]
  - id: lightsail-003
    q: Is Amazon Lightsail the best fit for a large application that needs fine-grained control of instance types and networking?
    a: No. Lightsail is the simple, fixed-price way to start; Amazon EC2 and Amazon VPC give full control.
    trap: true
    facts: [purpose]
---
Amazon Lightsail packages a virtual server with storage, networking and optional databases into simple plans with a fixed monthly price. It suits simple websites, blogs and small applications. [What is Amazon Lightsail?](https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html#what-is-amazon-lightsail)

### How it works

1. Pick a plan and an image, such as an operating system or an application like WordPress.
2. Lightsail launches the server with storage, a static IP and DNS options.
3. Add managed databases, load balancers or a CDN as the project grows.

### Exam cues

- If the question says simple website, low predictable monthly price, little AWS experience, think Amazon Lightsail.

### Remember

- Fixed monthly price; everything bundled.

> **Trap:** Lightsail trades flexibility for simplicity. Complex architectures use EC2, VPC and the other services directly.
