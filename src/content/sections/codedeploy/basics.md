---
title: CodeDeploy basics
level: foundational
order: 5
facts:
  - id: deployment
    text: AWS CodeDeploy automates application deployments to EC2, on-premises instances, Lambda functions and Amazon ECS services.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html
  - id: on-premises
    text: CodeDeploy can deploy application revisions to configured and registered on-premises instances.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-on-premises.html
cards:
  - id: codedeploy-073
    q: Which AWS service automates application deployment to EC2 instances and on-premises servers?
    a: AWS CodeDeploy.
    facts: [deployment, on-premises]
  - id: codedeploy-074
    q: Can AWS CodeDeploy deploy application revisions to registered on-premises instances?
    a: Yes. Configure, register and tag the instances before deploying.
    facts: [on-premises]
---
AWS CodeDeploy automates application deployments to AWS compute resources and on-premises instances.

### How it works

1. Configure the target compute resources.
2. For on-premises instances, register and tag each instance.
3. Deploy the application revision to the targets.

### Exam cues

- If the question says automate application deployments across EC2 and on-premises servers, think AWS CodeDeploy, because it supports both targets.

### Remember

- CodeDeploy supports EC2, on-premises instances, Lambda functions and Amazon ECS services.

> **Trap:** CodeDeploy can deploy to registered on-premises instances as well as AWS compute resources.
