---
title: EC2 blue/green deployments
level: associate
order: 70
facts:
  - id: replacement
    text: EC2 blue/green installs a revision on replacement instances before rerouting load balancer
      traffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#blue-green-server-compute-type
  - id: ec2-only
    text: EC2/On-Premises blue/green supports EC2 instances, not on-premises instances.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-deployment-type
  - id: copy
    text: Automatically copy Amazon EC2 Auto Scaling group creates a replacement group from the
      specified group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: manual
    text: Manually provision instances requires the replacement instances to exist before starting
      deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: lb
    text: EC2 blue/green requires a load balancer and supports Classic, Application, or Network Load
      Balancers.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-load-balancer.html#deployment-groups-create-load-balancer
  - id: immediate
    text: Reroute traffic immediately registers replacement instances after provisioning and revision
      installation.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: choose
    text: I will choose whether to reroute traffic waits for manual rerouting and marks the deployment
      Stopped if its wait expires.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: registration
    text: The EC2 blue/green deployment configuration controls replacement registration rate, while
      originals deregister all at once after traffic successfully moves.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: terminate
    text: Original instances can be terminated after a configured wait or kept running.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-create-blue-green.html#deployment-groups-create-blue-green
  - id: green-hooks
    text: EC2 blue/green replacement instances have install, start, validation, and traffic-allowing
      lifecycle events.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-availability
  - id: blue-hooks
    text: EC2 blue/green original instances have traffic-blocking lifecycle events; rollback allows
      traffic to originals and blocks replacements.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-availability
  - id: rollback-traffic
    text: An EC2 blue/green rollback reroutes traffic to original instances as long as they have not
      been terminated.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview-blue-green
  - id: bundle
    text: An EC2 revision archive contains application content and AppSpec and can be stored in S3 or
      GitHub.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/primary-components.html#primary-components-revision
  - id: autoscaling-group
    text: An Auto Scaling group manages a collection of EC2 instances as a logical group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html#auto-scaling-groups
  - id: target-group
    text: A target group is a set of registered destinations to which a load balancer routes requests.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html#deployment-steps-prerequisites-ecs
diagrams:
  - id: codedeploy-ec2-bluegreen
    title: EC2 blue/green deployment with an ALB
    width: 1025
    height: 600
    groups:
      - label: Deployment group
        x: 325
        y: 30
        w: 675
        h: 540
        tone: devtools
    nodes:
      - id: cd
        label: CodeDeploy
        sub: app + deployment group
        icon: codedeploy
        x: 25
        y: 75
        w: 170
        h: 86
        tone: devtools
        info: The application groups the revision, deployment group, and rollout configuration.
      - id: s3
        label: Revision bundle
        sub: S3 or GitHub
        icon: res-document
        x: 25
        y: 450
        w: 170
        h: 86
        tone: user
        info: Revision archive with application content and appspec.yml at its root.
      - id: alb
        label: ALB
        sub: listener → target group
        icon: res-elastic-load-balancing-application-load-balancer
        x: 775
        y: 263
        w: 160
        h: 86
        tone: network
        info: CodeDeploy deregisters blue targets and registers green ones. **BlockTraffic/AllowTraffic**
          events are run by CodeDeploy, not by your scripts.
      - id: blue
        label: Blue ASG
        sub: original instances
        icon: res-ec2-auto-scaling
        x: 413
        y: 90
        w: 180
        h: 86
        tone: compute
        info: Original instances can be kept running or terminated after a configured wait.
      - id: green
        label: Green ASG
        sub: replacement (copied ASG)
        icon: res-ec2-auto-scaling
        x: 413
        y: 435
        w: 180
        h: 86
        tone: compute
        info: Replacement fleet created by copying an Auto Scaling group; manually provisioned instances are
          another option.
    edges:
      - from: cd
        to: green
        step: 1
        label: provision copy
      - from: s3
        to: green
        step: 2
        label: install revision
      - from: alb
        to: green
        step: 3
        label: AllowTraffic
      - from: alb
        to: blue
        step: 4
        label: BlockTraffic
        dashed: true
      - from: cd
        to: blue
        step: 5
        dashed: true
    steps:
      - Copy the specified Auto Scaling group to provision replacements, or provide instances
        manually before deployment.
      - Agents install the revision on green and run installation, start, and validation hooks.
        ApplicationStop uses a previous successful revision if one exists.
      - BeforeAllowTraffic, AllowTraffic, and AfterAllowTraffic surround green registration with the
        load balancer.
      - After traffic successfully moves, the traffic-blocking events deregister the original
        instances all at once.
      - Terminate originals after the configured wait or keep them running. Rollback can return
        traffic while originals exist.
cards:
  - id: codedeploy-025
    q: In CodeDeploy EC2 blue/green, what do traffic rerouting, deployment configuration, and
      original-instance settings control?
    a: Rerouting starts immediately or waits for your choice. The configuration sets replacement
      registration pace; originals deregister all at once. Originals are then kept or terminated
      after the selected wait.
    facts:
      - immediate
      - choose
      - registration
      - terminate
  - id: codedeploy-035
    q: An EC2 CodeDeploy blue/green release needs traffic returned to the original servers after a bad
      release. What must still be available?
    a: The original instances must still exist. Keep them running or configure a suitable termination
      wait so CodeDeploy can reroute traffic back.
    facts:
      - rollback-traffic
      - terminate
  - id: codedeploy-051
    q: A CodeDeploy EC2 blue/green deployment installed successfully but became Stopped without moving
      users. Which setting explains this?
    a: The manual traffic-rerouting wait expired. Choose whether to reroute traffic before that wait
      runs out.
    trap: true
    facts:
      - choose
  - id: codedeploy-052
    q: A team wants CodeDeploy to provision an EC2 blue/green replacement fleet from its current Auto
      Scaling group. Which option fits?
    a: Automatically copy Amazon EC2 Auto Scaling group. CodeDeploy creates the replacement group from
      the specified source group.
    facts:
      - copy
---
EC2 blue/green deploys to replacement servers while the original servers remain available. Blue means the original fleet; green means its replacement. A load balancer moves traffic after the new revision is installed.

### How it works

1. Create the replacement environment by copying an Auto Scaling group or manually provisioning instances before deployment. An Auto Scaling group manages a set of EC2 instances together.
2. Agents install and validate the revision on replacement instances. The original environment continues serving requests.
3. Reroute immediately after installation, or wait while you test and manually choose to reroute. An expired manual wait stops the deployment.
4. Register replacements at the rate set by the deployment configuration. After traffic successfully moves, deregister the originals all at once.
5. Keep original instances running or terminate them after the configured wait. While originals remain, a blue/green rollback can route traffic back to them.

A target group is a set of registered destinations for an Application or Network Load Balancer. The diagram uses an Application Load Balancer, abbreviated ALB.

### Exam cues

- If the question says test new EC2 servers before moving users, think blue/green with manual rerouting, because the replacement can be ready before receiving production traffic.
- If the question says retain the previous fleet for recovery, think keep originals or delay termination, because traffic can return only while those instances exist.
- If the question says provision green from the current Auto Scaling group, think automatic group copy, because CodeDeploy can create that replacement group.

### Remember

- EC2/On-Premises blue/green supports EC2 only.
- A Classic, Application, or Network Load Balancer is required.
- Registration of replacements follows the deployment configuration; originals deregister all at once.
- A manual rerouting wait that expires produces `Stopped`.

> **Trap:** Keeping the old fleet preserves a traffic recovery option. It does not guarantee an instantaneous rollback or preserve instances after their termination wait expires.
