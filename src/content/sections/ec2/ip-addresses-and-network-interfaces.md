---
title: IP addresses and network interfaces
level: associate
order: 80
facts:
  - id: private-ip
    text: Every EC2 instance gets a private IPv4 address from its subnet's range, and can optionally have a public IPv4 address and IPv6 addresses.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#using-instance-addressing
  - id: eip
    text: An Elastic IP address is a static public IPv4 address allocated to your account until you release it; remapping it to another instance masks an instance failure.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#elastic-ip-addresses-eip
  - id: eni
    text: An elastic network interface is a virtual network card in a VPC; it attaches to instances in the same Availability Zone, and its attributes move with it when it is detached and attached elsewhere.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#using-eni
  - id: termination-protection
    text: Termination protection (the DisableApiTermination attribute) blocks terminating an instance through the EC2 API or console, but not a shutdown from inside the OS when shutdown behavior is set to terminate.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_ChangingDisableAPITermination.html#Using_ChangingDisableAPITermination
  - id: ena
    text: Enhanced networking uses SR-IOV for higher network performance and lower CPU use than traditional virtualized network interfaces on supported instance types.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html#enhanced-networking
  - id: ebs-optimized
    text: An EBS-optimized instance has dedicated bandwidth for Amazon EBS I/O, so EBS traffic doesn't compete with the instance's other network traffic.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-optimization.html#ebs-optimization
  - id: eip-quota
    text: "Each AWS account has a default quota of five Elastic IP addresses per Region; addresses from a BYOIP pool do not count toward it."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-limit
  - id: eni-termination
    text: "Each network interface attached to an instance has a delete-on-termination setting that decides whether the interface is deleted or kept when the instance terminates."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#using-eni
  - id: connect-timeout
    text: "A Connection timed out error when connecting to an instance points at the network path: a security group or network ACL that blocks the port, or a subnet route table with no route to the internet gateway."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html#TroubleshootingInstancesConnectionTimeout
  - id: shutdown-behavior
    text: "By default an OS shutdown of an EBS-backed instance stops it; setting InstanceInitiatedShutdownBehavior to terminate makes it terminate instead."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_ChangingInstanceInitiatedShutdownBehavior.html#Using_ChangingInstanceInitiatedShutdownBehavior
  - id: stop-protection
    text: "Stop protection blocks accidental stop and termination through EC2, but not a shutdown run inside the operating system or Auto Scaling terminations."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-stop-protection.html#ec2-stop-protection
  - id: split-horizon-dns
    text: "EC2 hostnames use split-horizon DNS: queried from inside the VPC they resolve to the private IP address, and a public DNS name resolves to the public IPv4 address from outside."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hostname-types.html
  - id: public-ip-nat
    text: "For EC2 internet access over IPv4, the instance uses its private address internally and the internet gateway translates traffic for its public IPv4 address."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#ip-addresses-and-nat
  - id: enhanced-networking-free
    text: "Enhanced networking uses SR-IOV for higher bandwidth, higher packets per second and lower latency between instances, at no additional charge."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html
  - id: termination-protection-asg
    text: EC2 termination protection does not stop Auto Scaling from terminating unhealthy instances or terminating instances during scale-in.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_ChangingDisableAPITermination.html
  - id: intel-82599-families
    text: Intel 82599 VF enhanced networking is used by the C3, C4, D2, I2, M4 except m4.16xlarge, and R3 instance families.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html
  - id: t3a-nitro
    text: EC2 T3a instances use the AWS Nitro System.
    source: https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html
  - id: nitro-ena
    text: Nitro-based EC2 instances use Elastic Network Adapter for enhanced networking.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html
cards:
  - id: ec2-077
    q: A licensed application is tied to a fixed public IP. If its EC2 instance fails, a standby instance must take over at the same address quickly. What fits?
    a: "An **Elastic IP address**, remapped from the failed instance to the standby."
    facts: [eip]
  - id: ec2-078
    q: A software license is bound to a MAC address. How can the license survive replacing the EC2 instance?
    a: "Put it on a separate **elastic network interface** and move that interface to the new instance (same AZ)."
    facts: [eni]
  - id: ec2-079
    q: "An application needs a fixed public IPv4 address that can move to a replacement EC2 instance. What should it use?"
    a: "Use an Elastic IP address and remap it to the replacement instance."
    facts: [eip]
  - id: ec2-080
    q: A database on EC2 shows EBS latency spikes when the instance's network traffic is high. Which instance capability fixes the contention?
    a: "**EBS optimization**, which gives EBS I/O dedicated bandwidth."
    facts: [ebs-optimized]
  - id: ec2-081
    q: Which EC2 feature uses SR-IOV for higher packets per second and lower network latency?
    a: "Enhanced networking."
    facts: [ena]
  - id: ec2-094
    q: "How many Elastic IP addresses can an account allocate per Region by default?"
    a: "Five. The quota can be raised, and addresses brought with BYOIP do not count."
    facts: [eip-quota]
  - id: ec2-095
    q: "SSH to a new instance fails with Connection timed out. Where do you look first?"
    a: "At the network path: the security group and network ACL rules for port 22 (and NACL return ports), and the subnet route to the internet gateway."
    facts: [connect-timeout]
  - id: ec2-097
    q: "A network interface carrying an EC2 instance network identity must move to a replacement instance. What Availability Zone constraint applies?"
    a: "The replacement must be in the same Availability Zone as the network interface."
    facts: [eni]
  - id: ec2-098
    q: "An EC2 workload needs EBS I/O that does not compete with other instance network traffic. Which compute feature fits?"
    a: "Use an EBS-optimized instance with dedicated bandwidth for EBS I/O."
    facts: [ebs-optimized]
  - id: ec2-103
    q: "Two instances in the same VPC talk using each other public DNS names. Does the traffic leave the VPC?"
    a: "No. Inside the VPC the public DNS name resolves to the private IP address, so traffic stays private."
    facts: [split-horizon-dns]
  - id: ec2-117
    q: "An EC2 instance has a public IPv4 address, but its operating system shows its private IPv4 address. Which VPC component handles translation for internet traffic?"
    a: "The internet gateway. The instance uses its private address internally; public IPv4 translation happens at the gateway."
    facts: [public-ip-nat]
  - id: ec2-122
    q: "Is there an extra charge for enabling EC2 enhanced networking for higher bandwidth and lower latency?"
    a: "No. Enhanced networking has no additional charge on supported instance types."
    facts: [enhanced-networking-free]
  - id: ec2-134
    q: Does EC2 termination protection prevent Auto Scaling from replacing an unhealthy instance or terminating it during scale-in?
    a: No. Termination protection does not stop those Auto Scaling actions.
    trap: true
    facts: [termination-protection-asg]
  - id: ec2-145
    q: Which enhanced networking interface does an EC2 T3a instance use?
    a: Elastic Network Adapter (ENA). T3a is Nitro-based, and Nitro-based instances use ENA.
    facts: [t3a-nitro, nitro-ena]
---
An EC2 instance's network identity is its network interfaces and their addresses. Knowing which addresses stay and which can move answers most failover and licensing questions.

### How it works

1. Each instance has a primary network interface with a private IPv4 address from its subnet.
2. It can also get a public IPv4 address, or an Elastic IP address you own and can move. The operating system uses the private address; the internet gateway translates IPv4 traffic for the public address.
3. Extra network interfaces can be attached in the same AZ and moved between instances with their addresses.
4. Enhanced networking and EBS optimization raise network and storage performance.

| Need | Feature |
|---|---|
| Fixed public IPv4 that can move to another instance | Elastic IP address |
| Network identity (IP, MAC) that survives an instance swap | Secondary network interface |
| Prevent accidental termination from the console or API | Termination protection |
| High packets per second, low latency | Enhanced networking |
| EBS I/O not slowed by other traffic | EBS-optimized instance |

### Exam cues

- If the question says enhanced networking on a T3a instance, think ENA, because T3a uses the Nitro System.
- If the question says move an EC2 network interface to a replacement, think a secondary interface, because the primary interface cannot be detached.
- If the question says keep the same public IP across instance replacement, think Elastic IP.
- If the question says MAC-bound license or a management network, think a secondary network interface.
- If the question says prevent accidental termination, think termination protection (and check shutdown behavior).

### Remember

- Intel 82599 VF enhanced networking applies to older instance families, including C3, C4, D2, I2, most M4 and R3.
- Private IPv4 always; public IPv4 and IPv6 optional. Public IPv4 translation takes place at the internet gateway.
- Network interfaces stay within one AZ.
- Termination protection doesn't stop an OS-initiated terminate.
- Enhanced networking: no additional charge.

> **Trap:** A network interface can't move to an instance in another AZ, so it's not a cross-AZ failover tool. Use an Elastic IP, a load balancer or DNS for that.
