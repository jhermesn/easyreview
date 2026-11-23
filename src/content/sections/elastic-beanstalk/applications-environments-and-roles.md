---
title: Applications, environments, and roles
level: associate
order: 10
facts:
  - id: version
    text: An application version labels deployable code stored as an S3 object.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html#concepts
  - id: standard-platform
    text: Beanstalk Standard runs applications on EC2.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html#concepts
  - id: platform-definition
    text: A platform combines an operating system, runtime, servers, and Beanstalk components.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html#concepts
  - id: source-bundle
    text: A source bundle consists of one ZIP or WAR archive.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html#applications-sourcebundle
  - id: bundle-size
    text: A source bundle cannot exceed 500 MB.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html#applications-sourcebundle
  - id: bundle-root
    text: A source bundle must not include a parent directory.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html#applications-sourcebundle
  - id: service-role
    text: The service role lets Beanstalk manage and monitor environment resources.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/iam-servicerole.html#iam-servicerole
  - id: instance-profile
    text: An instance profile passes an IAM role to EC2 instances so their applications can access permitted AWS resources.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/iam-instanceprofile.html#iam-instanceprofile
  - id: tier-policies
    text: AWSElasticBeanstalkWebTier and AWSElasticBeanstalkWorkerTier provide permissions for web and worker instances respectively.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/iam-instanceprofile.html#iam-instanceprofile
  - id: custom-health
    text: A custom instance profile needs elasticbeanstalk:PutInstanceStatistics when enhanced health authorization is enabled; missing permission can produce No Data.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html#health-enhanced-authz
  - id: single-instance
    text: A single-instance environment has one EC2 instance with an Elastic IP and no load balancer.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-types.html#single-instance-environ
  - id: single-asg
    text: A single-instance environment uses an Auto Scaling group whose minimum, maximum, and desired capacity are all 1.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-types.html#single-instance-environ
  - id: scalable
    text: A load-balanced environment distributes requests across EC2 instances.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-types.html#autoscale-environ
  - id: multi-az
    text: A scalable environment can run instances across multiple Availability Zones.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-types.html#autoscale-environ
  - id: asg-replacement
    text: Auto Scaling replaces terminated instances even in a single-instance environment.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.as.html#using-features.managing.as
  - id: shared-alb
    text: Multiple environments can use an existing shared Application Load Balancer.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environments-cfg-alb-shared.html#environments-cfg-alb-shared
  - id: shared-creation
    text: Choose a shared or dedicated load balancer during environment creation; that choice cannot be changed later.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environments-cfg-alb-shared.html#environments-cfg-alb-shared
  - id: https-listener
    text: For HTTPS termination on an Application Load Balancer, configure an HTTPS listener, typically port 443, and assign a certificate, preferably from ACM.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html#configuring-https-elb.console
  - id: backend-access
    text: The instance security group must allow load balancer traffic on the application port; a nonstandard backend port needs an appropriate inbound rule.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https-elb.html#configuring-https-elb.security-group
  - id: dockerfile
    text: A Dockerfile builds an image locally on the Standard Docker platform without Compose.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration.dockerrun
  - id: dockerrun
    text: Dockerrun.aws.json v1 selects an image from a hosted repository on the Standard Docker platform without Compose.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration.dockerrun
  - id: docker-precedence
    text: If both files are provided, the Dockerfile determines the image.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration.dockerrun
  - id: docker-root
    text: Dockerfile and Dockerrun.aws.json belong at the source archive root.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration.dockerrun
  - id: elastic-ip
    text: An Elastic IP is a static public IPv4 address.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#elastic-ip-addresses-eip
  - id: security-group
    text: A security group controls allowed incoming and outgoing resource traffic.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.ec2.instances.sg.html#using-features.managing.ec2.instances.sg
  - id: docker-platform
    text: Elastic Beanstalk Docker platforms run applications in any language or runtime packaged as a container image.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html
  - id: custom-platforms-retired
    text: "Elastic Beanstalk custom platforms are retired: on July 18, 2022, all Amazon Linux AMI platform branches, including custom platforms, were retired."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/custom-platforms.html
  - id: logs-s3
    text: "Elastic Beanstalk uploads requested instance tail and bundle logs to Amazon S3."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.logging.html
  - id: logs-cloudwatch
    text: "Elastic Beanstalk can stream instance logs to Amazon CloudWatch Logs."
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.logging.html
cards:
  - id: elastic-beanstalk-031
    q: Which roles distinguish Elastic Beanstalk service permissions from application instance permissions?
    a: The service role lets Beanstalk manage and monitor resources. The EC2 instance profile supplies the role used by application instances.
    facts:
      - service-role
      - instance-profile
  - id: elastic-beanstalk-035
    q: "What does an Elastic Beanstalk application version identify?"
    a: "A label for deployable code stored as an S3 object."
    facts:
      - version
  - id: elastic-beanstalk-036
    q: Does an Elastic Beanstalk single-instance environment use Auto Scaling or a load balancer?
    a: It uses an Auto Scaling group fixed at one instance, with an Elastic IP and no load balancer. The group replaces terminated instances.
    trap: true
    facts:
      - single-instance
      - single-asg
      - asg-replacement
  - id: elastic-beanstalk-037
    q: "An Elastic Beanstalk application must distribute requests across instances in multiple Availability Zones. Which environment fits?"
    a: "A load-balanced environment. It distributes requests across EC2 instances and can run them in multiple Availability Zones."
    facts:
      - scalable
      - multi-az
  - id: elastic-beanstalk-038
    q: An Elastic Beanstalk application needs HTTPS at its ALB and traffic forwarded to a custom backend port. What must be configured?
    a: Assign a certificate to an HTTPS listener and allow traffic from the load balancer to the application port in the instance security group.
    facts:
      - https-listener
      - backend-access
  - id: elastic-beanstalk-039
    q: "A team wants to deploy a containerized application with AWS Elastic Beanstalk. Which platform supports this use case?"
    a: "An Elastic Beanstalk Docker platform. It runs applications packaged as container images."
    facts:
      - docker-platform
  - id: elastic-beanstalk-040
    q: "An application on Elastic Beanstalk EC2 instances needs access to permitted AWS resources. How should the team grant that access?"
    a: "Use an instance profile to pass an IAM role to the instances. The application can use that role to access permitted resources."
    facts:
      - instance-profile
  - id: elastic-beanstalk-062
    q: A team must run an app on Elastic Beanstalk in a language Beanstalk has no managed platform for. What should it use?
    a: A Docker platform with the app packaged as a container image. Custom platforms were retired on July 18, 2022.
    trap: true
    facts: [docker-platform, custom-platforms-retired]
  - id: elastic-beanstalk-064
    q: "Where can a team retrieve or stream Elastic Beanstalk instance logs?"
    a: "Retrieve requested tail or bundle logs from Amazon S3, or stream logs to Amazon CloudWatch Logs."
    facts: [logs-s3, logs-cloudwatch]

diagrams:
  - id: beanstalk-https-request
    title: HTTPS termination and backend access
    width: 1040
    height: 340
    nodes:
      - id: client
        label: Client
        icon: res-client
        x: 20
        y: 70
        w: 180
        h: 72
        tone: user
      - id: alb
        label: ALB
        icon: elastic-load-balancing
        x: 350
        y: 70
        w: 180
        h: 86
        sub: HTTPS and certificate
        tone: network
      - id: ec2
        label: Application
        icon: res-ec2-instance
        x: 690
        y: 70
        w: 180
        h: 86
        sub: allowed backend port
        tone: compute
    edges:
      - from: client
        to: alb
        step: 1
        label: HTTPS
      - from: alb
        to: ec2
        step: 2
        label: backend request
    steps:
      - The ALB listener accepts HTTPS using its assigned certificate.
      - The instance security group allows traffic from the load balancer to the application port.
revised:
  - date: 2026-11-23
    note: The card now covers what an application version identifies.
    cards: [elastic-beanstalk-035]
---
Elastic Beanstalk Standard deploys application code on managed EC2 environments. An application groups related versions and environments; each environment is an independently configured running deployment. A platform is the operating system, language runtime, and server software used to run that code.

### How it works

1. Create an application and upload a version. A version is a label pointing to code in S3. Package a single ZIP or WAR of at most 500 MB with the application files at its root, without an enclosing folder.
2. Create an environment for that version and platform.
3. Supply the service role for Beanstalk's management actions and an EC2 instance profile, the wrapper that gives application instances an IAM role. IAM roles grant permission to call AWS APIs. The web and worker policies are `AWSElasticBeanstalkWebTier` and `AWSElasticBeanstalkWorkerTier`.
4. Choose capacity and the request entry point. Auto Scaling maintains the instance count and replaces terminated instances. A load balancer distributes incoming requests across instances.
5. For HTTPS termination, where the load balancer decrypts client requests, attach a certificate to an ALB HTTPS listener, typically port 443. ACM supplies certificates. Allow the backend application port from the load balancer in the instance security group, the rules that control allowed traffic.

| Environment choice | Request path | Capacity behavior |
|---|---|---|
| Single instance | Elastic IP, a fixed public IP address, directly to EC2 | Auto Scaling minimum, maximum, and desired capacity are 1; no load balancer |
| Load balanced | Load balancer to EC2 | Auto Scaling adjusts capacity; can span Availability Zones |
| Shared ALB | Existing Application Load Balancer to environments | Choose sharing at creation; cannot switch to or from dedicated later |

For the Standard Docker platform without Compose, use a `Dockerfile` to build an image locally or `Dockerrun.aws.json v1` to identify an image in a hosted repository. An image is the packaged container software. If both files are provided, put both at the archive root; the Dockerfile determines the image.

### Exam cues

- If the question says retrieve or continuously stream Elastic Beanstalk instance logs, think S3 for requested logs or CloudWatch Logs for streaming, because Beanstalk supports both paths.
- If the question says an uploaded archive has an extra enclosing directory, think fix the bundle root, because Beanstalk expects the application files there.
- If the question says a single instance failed, think Auto Scaling replacement, because single-instance mode still has an Auto Scaling group.
- If the question says shared load balancer across environments, think choose a shared ALB at environment creation, because this choice cannot be changed later.
- If the question says HTTPS works at the ALB but a custom backend port is blocked, think instance security group ingress, because the load balancer must reach the application port.

### Remember

- Source archive: ZIP or WAR, at most 500 MB, no enclosing directory.
- Single instance: Elastic IP, no load balancer, capacity fixed at 1.
- Service role: Beanstalk actions. Instance profile: application instance actions.
- With enhanced health authorization enabled, custom profiles need `elasticbeanstalk:PutInstanceStatistics` to send health data.

> **Trap:** A single-instance environment still uses Auto Scaling. It maintains one instance rather than adding instances for increasing traffic.
