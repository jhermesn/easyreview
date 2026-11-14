---
title: Benefits of the AWS Cloud
level: foundational
order: 10
facts:
  - id: definition
    text: Cloud computing is the on-demand delivery of compute power, databases, storage, applications and other IT resources over the internet with pay-as-you-go pricing.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html#what-is-cloud-computing
  - id: hardware-owner
    text: A cloud services platform such as AWS owns and maintains the network-connected hardware; customers provision and use what they need.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html#what-is-cloud-computing
  - id: variable-expense
    text: "Trade fixed expense for variable expense: instead of investing in data centers and servers up front, pay only when you consume computing resources and only for how much you consume."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: economies-of-scale
    text: "Benefit from massive economies of scale: usage from hundreds of thousands of customers is aggregated, so AWS achieves higher economies of scale that translate into lower pay-as-you-go prices."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: stop-guessing
    text: "Stop guessing capacity: instead of sitting on idle resources or running short, access as much or as little capacity as needed and scale up and down with a few minutes' notice."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: speed-agility
    text: "Increase speed and agility: new IT resources are a click away, cutting the time to make them available to developers from weeks to minutes and lowering the cost of experimenting."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: stop-data-centers
    text: "Stop spending money running and maintaining data centers: focus on projects that differentiate the business instead of racking, stacking and powering servers."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: go-global
    text: "Go global in minutes: deploy an application in multiple Regions around the world with a few clicks, giving customers lower latency at minimal cost."
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing
  - id: scale-horizontally
    text: Replacing one large resource with multiple small resources, and distributing requests across them so they share no common point of failure, increases aggregate workload availability.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html#design-principles
  - id: auto-recover
    text: Monitoring a workload for key performance indicators lets automation run when a threshold is breached, so recovery from failure can be automatic.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html#design-principles
  - id: scale-out
    text: Scaling horizontally (out) replaces one large resource with several smaller ones so a single failure has less impact; scaling vertically (up) makes one resource bigger and adds no redundancy.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html
cards:
  - id: cloud-value-001
    q: What are the six advantages of cloud computing that AWS lists?
    a: "- Trade fixed expense for variable expense\n- Benefit from massive economies of scale\n- Stop guessing capacity\n- Increase speed and agility\n- Stop spending money running and maintaining data centers\n- Go global in minutes"
    facts: [variable-expense, economies-of-scale, stop-guessing, speed-agility, stop-data-centers, go-global]
  - id: cloud-value-002
    q: A startup does not want to buy servers before it knows how much its new product will be used. Which advantage of the AWS Cloud addresses this?
    a: Trade fixed expense for variable expense. It pays only when it consumes resources, and only for how much it consumes.
    facts: [variable-expense]
  - id: cloud-value-003
    q: Why can AWS offer lower pay-as-you-go prices than a company running its own data center?
    a: Economies of scale. AWS aggregates usage from hundreds of thousands of customers, which lowers its variable cost.
    facts: [economies-of-scale]
  - id: cloud-value-004
    q: A retailer buys enough servers for its holiday peak, and they sit idle the rest of the year. Which AWS Cloud advantage removes this problem?
    a: Stop guessing capacity. On AWS it can scale up for the peak and back down with a few minutes' notice.
    facts: [stop-guessing]
  - id: cloud-value-005
    q: Developers wait weeks for new servers to test an idea. Which AWS Cloud advantage shortens this to minutes?
    a: Increase speed and agility. New IT resources are a click away, so experimenting costs less time and money.
    facts: [speed-agility]
  - id: cloud-value-006
    q: A company wants its staff to work on products that set it apart instead of racking and powering servers. Which AWS Cloud advantage does this describe?
    a: Stop spending money running and maintaining data centers. AWS does the undifferentiated heavy lifting of the hardware.
    facts: [stop-data-centers, hardware-owner]
  - id: cloud-value-007
    q: A company wants lower latency for customers on three continents without building data centers there. Which AWS Cloud advantage applies?
    a: Go global in minutes. It can deploy the application in Regions near those customers with a few clicks.
    facts: [go-global]
  - id: cloud-value-008
    q: How does running a workload on many small resources instead of one large one improve availability on AWS?
    a: A single failure affects a smaller share of the workload, and spreading requests across resources avoids a common point of failure.
    facts: [scale-horizontally]
  - id: cloud-value-009
    q: Does elasticity in the AWS Cloud mean a workload can only scale up?
    a: No. It means scaling up and down as demand changes, paying only for what is used.
    trap: true
    facts: [stop-guessing, variable-expense]
  - id: cloud-value-023
    q: A company moves an application to a bigger EC2 instance type. Which kind of scaling is this, and does it add fault tolerance?
    a: Vertical scaling (scaling up). It adds no fault tolerance, because there is still one instance.
    trap: true
    facts: [scale-out]
  - id: cloud-value-024
    q: Which kind of scaling adds more EC2 instances behind a load balancer and also improves availability?
    a: "Horizontal scaling (scaling out): more, smaller resources, so one failure affects less of the workload."
    facts: [scale-out]
---
Cloud computing delivers IT resources on demand over the internet, with pay-as-you-go pricing. AWS owns and maintains the hardware, and you provision what you need when you need it. [What is cloud computing](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/what-is-cloud-computing.html#what-is-cloud-computing)

### How it works

1. You request resources through the console, the CLI or an API instead of buying hardware.
2. AWS runs them on its infrastructure in the Region you choose, and bills for what you use.
3. When demand changes, you add or remove resources, so capacity follows the workload. This is elasticity.
4. Spreading a workload over many small resources and over separate locations keeps one failure from taking it all down. This is high availability. [Reliability design principles](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-principles.html#design-principles)

AWS names six advantages of cloud computing: [Six advantages](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html#six-advantages-of-cloud-computing)

| Advantage | What changes |
|---|---|
| Trade fixed expense for variable expense | Pay only when and as much as you consume, instead of buying data centers up front |
| Benefit from massive economies of scale | Aggregated usage lets AWS charge lower pay-as-you-go prices |
| Stop guessing capacity | Scale up and down with minutes of notice instead of buying for the peak |
| Increase speed and agility | Resources in minutes instead of weeks, so experiments cost less |
| Stop spending money running and maintaining data centers | Spend effort on the business, not on racking and powering servers |
| Go global in minutes | Deploy in several Regions for lower latency |

### Exam cues

- If the question says avoid a large upfront hardware purchase, think trade fixed expense for variable expense.
- If the question says lower prices because many customers share AWS, think economies of scale.
- If the question says idle servers bought for a peak, or not enough capacity, think stop guessing capacity, because the cloud scales both ways.
- If the question says faster experiments or shorter time to provision, think speed and agility.
- If the question says users in other countries need low latency, think go global in minutes.
- If the question says bigger instance type, think vertical scaling, because it resizes one resource; more instances is horizontal scaling.

### Remember

- Six advantages: variable expense, economies of scale, stop guessing capacity, speed and agility, no data center spending, global in minutes.
- Elasticity scales in both directions; you pay for what runs.
- Many small resources with no common point of failure raise availability.

> **Trap:** Economies of scale is about AWS's lower prices from aggregated usage, not about your own workload growing. A question about a single company's traffic spikes points to elasticity (stop guessing capacity).
