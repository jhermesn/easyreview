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
