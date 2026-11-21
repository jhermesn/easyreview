---
title: "Direct Connect basics"
level: foundational
order: 5
facts:
  - id: dedicated-link
    text: "AWS Direct Connect links an internal network to a Direct Connect location over a standard Ethernet fiber-optic cable, without the public internet."
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#Welcome
cards:
  - id: direct-connect-014
    q: "A company needs a private, dedicated network connection from its data center to AWS. Which service fits?"
    a: "AWS Direct Connect."
    facts: [dedicated-link]
---
AWS Direct Connect is a dedicated private network link between a company network and AWS.

### How it works

1. Order a connection at a Direct Connect location.
2. Connect your router to the AWS router by cable.
3. Create virtual interfaces to reach AWS.

### Exam cues

- If the question says dedicated private connection with consistent performance, think Direct Connect.

### Remember

- Physical link, not the internet.

> **Trap:** Direct Connect is a dedicated line; Site-to-Site VPN is encrypted traffic over the internet.
