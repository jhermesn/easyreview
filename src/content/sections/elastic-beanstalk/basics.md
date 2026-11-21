---
title: "Elastic Beanstalk basics"
level: foundational
order: 5
facts:
  - id: paas
    text: "AWS Elastic Beanstalk deploys web applications: you upload the app and it provisions EC2 instances or EKS clusters, load balancing, health monitoring and scaling."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html#Welcome
  - id: application
    text: An application groups versions, environments, and environment configurations.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html#concepts
  - id: environments
    text: An application can have independent environments running the same or different application versions.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html#concepts
  - id: upload-code
    text: With Elastic Beanstalk you upload an application source bundle and it provisions and runs the AWS resources, such as EC2 instances, a load balancer and Auto Scaling, while you keep control of them.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html
  - id: no-charge
    text: Elastic Beanstalk has no additional charge; you pay only for the AWS resources your application uses.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html
  - id: basic-health
    text: Basic health reporting uses load balancer health checks (or EC2 status checks in a single-instance environment), checks that the Auto Scaling group has at least one instance, and publishes no metrics to CloudWatch.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.healthstatus.html
cards:
  - id: elastic-beanstalk-063
    q: "Developers want to upload application code and have AWS create the servers, load balancer and scaling for them. Which service fits?"
    a: "AWS Elastic Beanstalk."
    facts: [paas]
  - id: elastic-beanstalk-034
    q: An Elastic Beanstalk team needs isolated test and production deployments of one application. How should it organize them?
    a: Create separate environments in the same application. They can run different application versions independently.
    facts:
      - application
      - environments
  - id: elastic-beanstalk-060
    q: A developer wants to upload a web application and have AWS provision the servers, load balancing and scaling, with no extra service fee. Which service fits?
    a: "AWS Elastic Beanstalk.\nIt has no additional charge; you pay for the EC2 instances and other resources it creates."
    facts: [upload-code, no-charge]
  - id: elastic-beanstalk-061
    q: What does Elastic Beanstalk basic health reporting check, and does it publish metrics to CloudWatch?
    a: Load balancer health checks (or EC2 status checks for a single instance) and that the Auto Scaling group has at least one instance. It publishes no CloudWatch metrics; enhanced health adds an agent and more data.
    facts: [basic-health]
---
AWS Elastic Beanstalk takes your application and builds the environment that runs it.

### How it works

1. Upload the application.
2. Elastic Beanstalk provisions compute, load balancing and monitoring.
3. It scales the environment as load changes.

### Exam cues

- If the question says deploy an app without setting up the infrastructure yourself, think Elastic Beanstalk.

### Remember

- Handles provisioning, load balancing, health and scaling.

> **Trap:** You still own and can see the resources Elastic Beanstalk creates; it is not serverless.
