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
  - id: user-data-root
    text: EC2 user data scripts run as the root user and, by default, only during the first boot of a new instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
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
    text: "Software on an instance reads instance metadata and user data from the Instance Metadata Service at 169.254.169.254 (or fd00:ec2::254 over IPv6); requests are free."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#configuring-instance-metadata-service
  - id: imdsv2
    text: "IMDSv2 uses session tokens obtained with a PUT request; an instance can be set to IMDSv2 only (token required), which turns off tokenless IMDSv1 calls."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html#configuring-instance-metadata-options
  - id: metadata-not-secret
    text: "Instance metadata and user data are not protected by authentication or encryption inside the instance, so they should not hold passwords or other secrets."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#ec2-instance-metadata
  - id: eic-prefix-list
    text: "Browser-based EC2 Instance Connect to a public address needs the security group to allow port 22 from the Region EC2 Instance Connect prefix list (com.amazonaws.<region>.ec2-instance-connect)."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-tutorial.html
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
  - id: ec2-070
    q: A user data script on an EC2 instance uses sudo, and an admin expects it to run on every reboot. What is wrong with both assumptions?
    a: "User data already runs as root (no sudo needed) and, by default, only on the first boot."
    trap: true
    facts: [user-data-root]
  - id: ec2-071
    q: Admins must SSH into Linux EC2 instances without distributing long-lived key pairs, with access controlled by IAM. Which feature fits?
    a: "EC2 Instance Connect, which pushes a one-time public key valid for 60 seconds."
    facts: [eic]
  - id: ec2-072
    q: What is the size limit for EC2 user data?
    a: "16 KB before base64 encoding."
    facts: [user-data-size]
  - id: ec2-100
    q: "A security review wants to block SSRF-style theft of instance role credentials from metadata. What setting helps?"
    a: "Require IMDSv2 (HttpTokens required), so metadata calls need a session token from a PUT request; tokenless IMDSv1 calls stop working."
    facts: [imdsv2]
  - id: ec2-101
    q: "A launch script passes a database password in EC2 user data. Why is that a problem?"
    a: "User data and metadata are readable by anyone or any software on the instance through IMDS, with no authentication or encryption. Use Secrets Manager or Parameter Store instead."
    trap: true
    facts: [metadata-not-secret]
  - id: ec2-102
    q: "From which IP address does software on an instance read its metadata?"
    a: "169.254.169.254, the link-local IMDS address (fd00:ec2::254 for IPv6)."
    facts: [imds]
---
Three EC2 features that change how an instance starts and how you reach it: hibernation keeps memory across a stop, user data configures the first boot, and Instance Connect replaces long-lived SSH keys. [Hibernate your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html)

### How it works

1. Hibernation: enable it at launch; on hibernate, the OS writes RAM to the encrypted EBS root volume and the instance stops.
2. On start, the root volume is restored, RAM reloads and processes continue where they were.
3. User data: a script or cloud-init directives passed at launch run as root on first boot.
4. Instance Connect: an IAM-authorized API call pushes a temporary public key; you SSH in within 60 seconds.

| Action | Memory | Instance ID | Instance charges |
|---|---|---|---|
| Stop | Lost | Kept | None while stopped |
| Hibernate | Saved to EBS root | Kept | None while stopped |
| Terminate | Lost | Gone | None |

### Exam cues

- If the question says long warm-up time and instances stopped on a schedule, think hibernation.
- If the question says install software at launch, think user data; for fixed, slow installs, bake them into a golden AMI.
- If the question says SSH with IAM control and no shared keys, think EC2 Instance Connect (or Session Manager with no open port).

### Remember

- Hibernation: enable at launch, encrypted EBS root, Linux RAM under 150 GiB.
- User data: 16 KB, runs as root, first boot only by default.
- Instance Connect key lives 60 seconds in instance metadata.

> **Trap:** Hibernation can't be added to a running instance that was launched without it. It must be enabled at launch.
