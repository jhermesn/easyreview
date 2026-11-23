---
title: Hibernation, user data and Instance Connect
level: associate
order: 60
facts:
  - id: hibernate
    text: Hibernating an EC2 instance saves RAM to the encrypted EBS root volume; on start, RAM is reloaded, processes resume, data volumes reattach and the instance keeps its ID.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html#Hibernate
  - id: prewarm
    text: Hibernation can pre-warm instances that take a long time to bootstrap or build a memory footprint, so they resume ready to work.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html#Hibernate
  - id: hibernate-cost
    text: A hibernated instance isn't charged for instance usage while stopped; you pay for its EBS volumes, including the stored RAM contents.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html#Hibernate
  - id: hibernate-prereqs
    text: Hibernation needs an encrypted EBS root volume (not instance store) large enough for the RAM, and Linux instances need less than 150 GiB of RAM.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html
  - id: hibernate-launch
    text: Hibernation can't be enabled or disabled after an instance is launched.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enabling-hibernation.html
  - id: user-data-size
    text: EC2 user data is limited to 16 KB before base64 encoding, and for an EBS-backed instance you can stop it to change the user data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
  - id: eic
    text: EC2 Instance Connect authorizes SSH with IAM policies; the API pushes a temporary SSH public key to the instance metadata, where it stays for 60 seconds.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-eic.html#connect-linux-inst-eic
  - id: key-pairs
    text: "An EC2 key pair is a public key that EC2 stores on the instance and a private key you keep; it proves identity for SSH on Linux and decrypts the administrator password on Windows."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#ec2-key-pairs
  - id: imds
    text: "Instance software can read user data and instance metadata through the Instance Metadata Service. Its address is 169.254.169.254 (or fd00:ec2::254 over IPv6), and requests are free."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#configuring-instance-metadata-service
  - id: imdsv2
    text: "IMDSv2 requires session tokens, and instance metadata options can require IMDSv2 only or disable the metadata service entirely."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html#configuring-instance-metadata-options
  - id: metadata-not-secret
    text: "Instance metadata and user data are not protected by authentication or encryption inside the instance, so they should not hold passwords or other secrets."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#ec2-instance-metadata
  - id: eic-prefix-list
    text: "Browser-based EC2 Instance Connect to a public address needs the security group to allow port 22 from the Region EC2 Instance Connect prefix list (com.amazonaws.<region>.ec2-instance-connect)."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-tutorial.html
  - id: eice
    text: "EC2 Instance Connect Endpoint lets users connect from the internet to instances that have no public IP address, without a bastion host and without an internet gateway in the VPC."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-ec2-instance-connect-endpoint.html
  - id: key-download
    text: "When the EC2 console creates a key pair, its private key is downloaded at creation; that is the only opportunity to save that private key file."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html#having-ec2-create-your-key-pair
  - id: address-metadata
    text: EC2 instance metadata includes local IPv4 and, when assigned, public IPv4 addresses.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
  - id: metadata-identity-key
    text: EC2 instance metadata includes the instance ID and, when supplied at launch, its public key.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
cards:
  - id: ec2-067
    q: A Java application on EC2 takes 20 minutes to load caches after boot. The instances are stopped at night and must resume ready to serve in the morning. Which EC2 feature fits?
    a: "**EC2 hibernation**: RAM is saved to the EBS root volume and restored on start."
    facts: [hibernate, prewarm]
  - id: ec2-068
    q: What does an EC2 instance need to be hibernated?
    a: "Hibernation enabled at launch, an encrypted EBS root volume big enough for the RAM, and (on Linux) less than 150 GiB of RAM."
    facts: [hibernate-prereqs, hibernate-launch]
  - id: ec2-069
    q: Do you pay EC2 instance charges while an instance is hibernated?
    a: "No instance usage charges while it's stopped; you still pay for its EBS volumes, including the saved RAM."
    facts: [hibernate-cost]
  - id: ec2-071
    q: Admins must SSH into Linux EC2 instances without distributing long-lived key pairs, with access controlled by IAM. Which feature fits?
    a: "EC2 Instance Connect, which pushes a one-time public key valid for 60 seconds."
    facts: [eic]
  - id: ec2-072
    q: "An EC2 instance takes a long time to build its in-memory state and is stopped on a schedule. Which feature helps it resume ready to work?"
    a: "Use hibernation. It saves memory to the encrypted EBS root volume and reloads it on start."
    facts: [prewarm, hibernate]
  - id: ec2-100
    q: "A team expects to hibernate an EC2 instance later. When must it enable hibernation?"
    a: "At launch. Hibernation cannot be enabled after the instance is launched."
    facts: [hibernate-launch]
  - id: ec2-101
    q: "An EC2 workload must retain running process state across a stop. Should it stop normally or hibernate?"
    a: "Hibernate the instance. Its RAM is saved to the encrypted EBS root volume and processes resume on start."
    facts: [hibernate]
  - id: ec2-102
    q: "From which IP address does software on an instance read its metadata?"
    a: "169.254.169.254, the link-local IMDS address (fd00:ec2::254 for IPv6)."
    facts: [imds]
  - id: ec2-107
    q: "A team plans to hibernate EC2 instances with large memory. What storage requirement must it account for?"
    a: "The encrypted EBS root volume must have enough space for RAM."
    facts: [hibernate-prereqs]
  - id: ec2-118
    q: "An administrator creates a key pair in the EC2 console for Linux SSH access. When must the private key file be saved?"
    a: "At creation, when the browser downloads it. The EC2 console does not offer another chance to save that private key."
    facts: [key-download]
  - id: ec2-121
    q: "An EC2 application must reject tokenless instance metadata requests, while another instance must expose no metadata endpoint. Which settings fit?"
    a: "Require IMDSv2 on the first instance and disable IMDS on the second through instance metadata options."
    facts: [imdsv2]
  - id: ec2-135
    q: Where can software on an EC2 instance find its local IPv4 address and assigned public IPv4 address?
    a: In instance metadata, under local-ipv4 and public-ipv4.
    facts: [address-metadata]
---
Three EC2 features that change how an instance starts and how you reach it: hibernation keeps memory across a stop, user data configures the first boot, and Instance Connect replaces long-lived SSH keys.

### How it works

1. Hibernation: enable it at launch; on hibernate, the OS writes RAM to the encrypted EBS root volume and the instance stops.
2. On start, the root volume is restored, RAM reloads and processes continue where they were.
3. User data: on Linux, shell scripts and cloud-init directives automate setup; scripts run as root on first boot by default. Configure repeated execution for later restarts. Windows uses launch agents to handle scripts.
4. Instance Connect: an IAM-authorized API call pushes a temporary public key; you SSH in within 60 seconds. When using a key pair created in the EC2 console, save its private key at creation.
5. Set metadata options to require IMDSv2 tokens or disable the metadata service entirely.

| Action | Memory | Instance ID | Instance charges |
|---|---|---|---|
| Stop | Lost | Kept | None while stopped |
| Hibernate | Saved to EBS root | Kept | None while stopped |
| Terminate | Lost | Gone | None |

### Exam cues

- If the question says an EC2 application needs its own addresses, think instance metadata, because it exposes local and assigned public IPv4 addresses.
- If the question says long warm-up time and instances stopped on a schedule, think hibernation.
- If the question says install software at launch, think user data; for fixed, slow installs, bake them into a golden AMI.
- If the question says SSH with IAM control and no shared keys, think EC2 Instance Connect (or Session Manager with no open port).

### Remember

- Hibernation: enable at launch, encrypted EBS root, Linux RAM under 150 GiB.
- User data: 16 KB; Linux scripts run as root, first boot only by default, with repeated execution configurable.
- Instance Connect key lives 60 seconds in instance metadata.

> **Trap:** Hibernation can't be added to a running instance that was launched without it. It must be enabled at launch.
