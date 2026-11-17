---
title: "EC2 Auto Scaling basics"
level: foundational
order: 5
facts:
  - id: asg
    text: "Amazon EC2 Auto Scaling keeps the right number of EC2 instances for the load, in collections called Auto Scaling groups with a minimum, desired and maximum size; scaling policies change the count within those limits."
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#what-is-amazon-ec2-auto-scaling
cards:
  - id: ec2-auto-scaling-084
    q: "Traffic to a web app doubles every evening. How can the number of EC2 instances follow the load automatically?"
    a: "Amazon EC2 Auto Scaling, with an Auto Scaling group and a scaling policy."
    facts: [asg]
  - id: ec2-auto-scaling-085
    q: "What three sizes does an EC2 Auto Scaling group define?"
    a: "Minimum, desired and maximum number of instances."
    facts: [asg]
---
Amazon EC2 Auto Scaling adds and removes EC2 instances so capacity matches demand, which supports elasticity and availability. [What is Amazon EC2 Auto Scaling?](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#what-is-amazon-ec2-auto-scaling)

### How it works

1. Create an Auto Scaling group with minimum, desired and maximum sizes.
2. Scaling policies raise or lower the desired count as load changes.
3. The group replaces instances to keep the count.

### Exam cues

- If the question says match the number of EC2 instances to demand, think EC2 Auto Scaling.

### Remember

- Group sizes: minimum, desired, maximum.

> **Trap:** Auto Scaling changes how many instances run (horizontal scaling); it does not resize one instance.
