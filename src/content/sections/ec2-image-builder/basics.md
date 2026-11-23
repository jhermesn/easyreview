---
title: EC2 Image Builder basics
level: foundational
order: 5
facts:
  - id: pipeline-automation
    text: EC2 Image Builder pipelines automate building, testing and distributing customized server and container images.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html
cards:
  - id: ec2-image-builder-024
    q: Which AWS service automates building, testing and distributing customized machine images?
    a: EC2 Image Builder uses image pipelines for those steps.
    facts: [pipeline-automation]
---
EC2 Image Builder automates the preparation of server and container images for deployment.

### How it works

1. Define the software and settings for an image.
2. Use a pipeline to build and test the image.
3. Distribute the finished image for use.

### Exam cues

- If the question says automate custom machine image creation, testing and distribution, think EC2 Image Builder, because its pipelines carry out those steps.

### Remember

- Pipelines automate image creation and distribution.

> **Trap:** An image pipeline prepares images. EC2 Auto Scaling uses images to launch instances.
