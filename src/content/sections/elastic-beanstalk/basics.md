---
title: "Elastic Beanstalk basics"
level: foundational
order: 5
facts:
  - id: paas
    text: "AWS Elastic Beanstalk deploys web applications: you upload the app and it provisions EC2 instances or EKS clusters, load balancing, health monitoring and scaling."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html#Welcome
cards:
  - id: elastic-beanstalk-063
    q: "Developers want to upload application code and have AWS create the servers, load balancer and scaling for them. Which service fits?"
    a: "AWS Elastic Beanstalk."
    facts: [paas]
---
AWS Elastic Beanstalk takes your application and builds the environment that runs it. [What is AWS Elastic Beanstalk?](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html#Welcome)

### How it works

1. Upload the application.
2. Elastic Beanstalk provisions compute, load balancing and monitoring.
3. It scales the environment as load changes.

### Exam cues

- If the question says deploy an app without setting up the infrastructure yourself, think Elastic Beanstalk.

### Remember

- Handles provisioning, load balancing, health and scaling.

> **Trap:** You still own and can see the resources Elastic Beanstalk creates; it is not serverless.
