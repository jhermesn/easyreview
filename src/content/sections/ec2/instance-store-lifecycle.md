---
title: Instance store lifecycle
level: associate
order: 20
facts:
  - id: local-storage
    text: Instance store provides temporary disk storage physically attached to the EC2 host computer.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#InstanceStorage
  - id: temporary-use
    text: Instance store suits temporary data such as caches, buffers and scratch files.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#InstanceStorage
  - id: type-dependent
    text: Instance store availability and capacity depend on the EC2 instance type and size.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#InstanceStorage
  - id: launch-only
    text: Instance store volumes can be attached only when an instance launches.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: no-reattach
    text: An instance store volume cannot be detached and attached to a different instance.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: reboot-persists
    text: Instance store data survives an instance reboot.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: stop-loss
    text: Stopping, hibernating or terminating an instance erases its instance store data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: disk-loss
    text: Failure of an underlying instance store disk loses the data on that disk.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: type-change-loss
    text: Changing an EC2 instance type does not transfer instance store data to the new instance configuration.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: ami-excludes-data
    text: Creating an EBS-backed AMI does not include the source instance's instance store data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: copy-durable
    text: To preserve instance store data beyond the instance lifetime, copy it to persistent storage such as EBS, S3 or EFS.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html#instance-store-lifetime
  - id: recovery-loss
    text: CloudWatch action based EC2 recovery loses data on attached instance store volumes.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/cloudwatch-recovery.html#cloudwatch-recovery
  - id: recovery-reboot
    text: Successful automatic EC2 recovery appears to the instance as an unplanned reboot.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html#ec2-instance-recover
  - id: hibernation
    text: EC2 hibernation saves the instance's working memory to its EBS root volume before stopping.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html#Hibernate
  - id: ebs-backed-image
    text: An EBS-backed AMI uses EBS snapshots for its disk image data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIEncryption.html#AMIEncryption
  - id: host-disks
    text: Instance store is temporary block storage on disks physically attached to the host computer, suited to buffers, caches and scratch data.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html
  - id: no-charge
    text: Instance store volumes have no additional charge; they are included in the instance usage cost.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html
cards:
  - id: ec2-001
    q: What happens to EC2 instance store data when its instance stops, hibernates or terminates?
    a: It is erased. Use instance store for temporary data, and copy anything that must survive to persistent storage.
    facts: [stop-loss, temporary-use, copy-durable]
  - id: ec2-013
    q: An EC2 application keeps disposable cache files on instance store. Does a normal instance reboot erase the files?
    a: No. Instance store data survives a reboot. Stopping, hibernating or terminating the instance erases it.
    facts: [reboot-persists, stop-loss]
    trap: true
  - id: ec2-014
    q: A team creates an EBS-backed AMI from an EC2 instance with instance store data. Will a replacement launched from the AMI contain that data?
    a: No. The AMI excludes instance store data. Copy required data to persistent storage before replacing the instance.
    facts: [ami-excludes-data, copy-durable]
    trap: true
  - id: ec2-015
    q: Can an operator detach an EC2 instance store volume and attach it to a replacement instance?
    a: No. Instance store volumes are attached only at launch and cannot move between instances.
    facts: [launch-only, no-reattach]
  - id: ec2-016
    q: An EC2 instance changes to another instance type that also has instance store. Does the previous local disk data transfer?
    a: No. Changing the instance type does not transfer instance store data. Copy required data to persistent storage first.
    facts: [type-change-loss, copy-durable]
    trap: true
  - id: ec2-017
    q: A supported EC2 instance with instance store undergoes CloudWatch action based recovery. Is its local disk data retained?
    a: No. Recovery loses the instance store data, even though an ordinary instance reboot would preserve it.
    facts: [recovery-loss, reboot-persists]
    trap: true
  - id: ec2-050
    q: An application needs very fast temporary block storage for scratch data, at no extra storage cost. Which EC2 storage option fits?
    a: "Instance store.\nIts disks are attached to the host and are included in the instance price, but data is lost when the instance stops or terminates."
    facts: [host-disks, no-charge]
---
Instance store is temporary disk storage on the physical computer, or host, running an EC2 instance. It suits caches, which hold replaceable copies of data, and scratch files, which hold temporary working data. Think of it as storage tied to that instance's local disks.

### How it works

1. Choose an instance type and size that provide the required instance store capacity. Not every type includes it.
2. Attach instance store volumes at launch. A volume is a disk device the instance can use; you cannot attach these volumes later or move them to another instance.
3. Use the volumes for temporary data. A reboot restarts the instance without erasing this data.
4. Copy data that must survive to persistent storage such as EBS, S3 or EFS before stopping or replacing the instance. An EBS-backed AMI, a launch image built from EBS storage, does not capture instance store data.
5. Rebuild temporary data after a stop, hibernation, termination, disk failure or CloudWatch recovery. Hibernation saves working memory to the EBS root volume before stopping; it still erases instance store data. Changing the instance type also does not carry the data over.

| Event | Instance store data |
|---|---|
| Normal instance reboot | Retained |
| Stop, hibernation or termination | Erased |
| Underlying disk failure | Lost on the failed disk |
| Change instance type | Does not transfer |
| Create an EBS-backed AMI | Not included in the image |
| CloudWatch action based recovery | Lost |

### Exam cues

- If the question says replaceable cache or temporary working files, think instance store, because its disks provide temporary storage on the instance's host.
- If the question says local files must survive a stop or replacement, think copying to persistent storage, because instance store cannot preserve them through those events.
- If the question says an AMI will back up every attached disk, think instance store exclusion, because an EBS-backed AMI does not include local instance store data.

### Remember

- Attach at launch only; you cannot detach and reattach instance store volumes elsewhere.
- Reboot preserves the data. Stop, hibernation and termination erase it.
- Instance store capacity depends on the instance type and size.
- Instance store: host-attached disks, included in the instance price.

> **Trap:** Automatic recovery can look like a reboot to the operating system, but CloudWatch action based recovery loses instance store data. Ordinary reboot persistence does not imply recovery persistence.

