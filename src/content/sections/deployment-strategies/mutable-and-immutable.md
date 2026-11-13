---
title: Mutable and immutable deployments
level: associate
order: 10
facts:
  - id: mutable
    text: An in-place CodeDeploy EC2 deployment updates the application revision on existing instances.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-server.html
  - id: immutable
    text: An immutable deployment starts a new server set with the new configuration or application
      version.
    source: https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/deployment-methods.html
  - id: blue-green
    text: Blue/green creates another environment, tests it, shifts traffic to it, and can retain the old
      environment for rollback.
    source: https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/deployment-methods.html
  - id: rolling-varies
    text: ECS rolling deployments replace tasks with new tasks rather than updating the running tasks in
      place.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html
  - id: refresh-rolling
    text: The rolling instance refresh strategy replaces EC2 instances in batches using a desired
      configuration.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
  - id: root-strategy
    text: Instance refresh also supports replacing root volumes without terminating instances; this
      preserves network interfaces and non-root storage.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-how-it-works
  - id: image-builder
    text: EC2 Image Builder automates building, testing, and distributing customized machine images.
    source: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html
  - id: eb-policies
    text: Beanstalk application deployment policy and instance-replacing configuration update policy are
      separate settings.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rollingupdates.html
  - id: immutable-both
    text: For Beanstalk changes combining a new application version with instance-replacing
      configuration, use separate updates or configure immutable policies for both.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html
cards:
  - id: deployment-strategies-001
    q: For EC2 application releases, what separates an in-place CodeDeploy deployment from an immutable
      deployment?
    a: In-place updates the revision on existing instances. Immutable launches replacement servers with
      the new configuration or version. Image Builder can build, test, and distribute images for
      replacement fleets.
    facts:
      - mutable
      - immutable
      - image-builder
  - id: deployment-strategies-002
    q: An EC2 Auto Scaling group needs a new AMI or instance type across its fleet. Which deployment
      mechanism should the team choose?
    a: Use an instance refresh with the rolling strategy and the desired launch configuration. It
      replaces instances in batches. Use CodeDeploy in-place when the requirement is to change the
      application revision on existing instances.
    facts:
      - refresh-rolling
      - mutable
  - id: deployment-strategies-009
    q: Does an Amazon ECS rolling deployment modify the application inside each existing task?
    a: No. ECS rolling deployments replace running tasks with new tasks. The term rolling describes
      gradual rollout and does not imply in-place mutation.
    trap: true
    facts:
      - rolling-varies
  - id: deployment-strategies-010
    q: A Beanstalk application uses immutable deployments but an update also changes instance
      configuration. Is the application deployment policy alone sufficient?
    a: No. Configure immutable updates for both application and instance configuration, or perform
      separate updates. The two policies are separate.
    trap: true
    facts:
      - eb-policies
      - immutable-both
---

A deployment can change existing servers or create replacements. In-place deployment changes the application on existing instances. Immutable deployment starts a new server set from the desired configuration. The [AWS deployment methods guide](https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/deployment-methods.html) explains these choices.

### How it works

1. Choose the object being changed. CodeDeploy in-place updates an application revision, meaning a packaged version of application files, on existing EC2 instances.
2. For an immutable server release, prepare the new configuration or image and launch replacement capacity. EC2 Image Builder can build, test, and distribute the machine image first.
3. An Auto Scaling group is a managed set of EC2 instances. Its rolling instance refresh replaces instances in batches using the desired configuration. Instance refresh also offers a separate root-volume replacement strategy that preserves the instance and its network interfaces.
4. Blue/green uses separate old and new environments. Test the replacement environment, shift traffic, and retain the old environment for rollback if needed.
5. On Beanstalk, choose the application deployment policy and instance-replacing configuration update policy separately. Use immutable policies for both, or separate the changes, when one release needs both.

### Exam cues

- If the question says update code on the same EC2 instances, think CodeDeploy in-place, because it installs a revision on existing servers.
- If the question says replace an Auto Scaling fleet with a new AMI or instance type, think rolling instance refresh, because it applies the desired launch configuration in batches.
- If the question says ECS rolling update, think replacement tasks, because ECS does not update the application inside each running task.

### Remember

- Mutable means changing existing systems. Immutable server deployment creates new systems from the desired configuration.
- Rolling describes a gradual rollout; the platform determines what gets updated or replaced.
- Blue/green separates environments and shifts traffic after testing.
- Beanstalk application and configuration update policies are configured separately.

> **Trap:** Selecting immutable application deployments in Beanstalk does not automatically select immutable configuration updates. A combined change needs both policies or separate updates.
