---
title: Contact center
level: foundational
order: 10
facts:
  - id: rename
    text: Amazon Connect Customer is the current name of the product previously called Amazon Connect; Amazon Connect is now a set of agentic AI solutions for business functions.
    source: https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html#what-is-amazon-connect
  - id: purpose
    text: Amazon Connect Customer builds and manages customer communication experiences, connecting customers to agents with intelligent routing and real-time performance tracking.
    source: https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html#what-is-amazon-connect
  - id: channels
    text: Customers contact the contact center through the method they choose, and agents help them solve issues they can't resolve alone.
    source: https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html#what-is-amazon-connect
cards:
  - id: connect-001
    q: A company wants a cloud-based contact center where customers call or chat and are routed to agents. Which AWS service fits?
    a: Amazon Connect, now named Amazon Connect Customer.
    facts: [purpose, rename]
  - id: connect-002
    q: Which business application service on AWS routes customer contacts to agents and tracks performance in real time?
    a: Amazon Connect (Amazon Connect Customer).
    facts: [purpose]
  - id: connect-003
    q: Is Amazon Connect the AWS service for sending marketing email campaigns?
    a: No. Connect runs contact centers; bulk and transactional email is Amazon SES.
    trap: true
    facts: [purpose]
---
Amazon Connect runs a contact center in the cloud: phone and chat with customers, routing to the right agent, and real-time performance tracking. The contact center product is now called Amazon Connect Customer. [What is Connect Customer?](https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html#what-is-amazon-connect)

### How it works

1. Customers reach the contact center through the channel they prefer.
2. Routing sends each contact to an agent who can help.
3. Supervisors track performance in real time.

### Exam cues

- If the question says contact center, call center or customer service agents, think Amazon Connect.

### Remember

- Business application service; renamed Amazon Connect Customer.

> **Trap:** Amazon Connect is not AWS Direct Connect. One is a contact center, the other a private network link.
