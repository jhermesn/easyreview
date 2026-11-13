---
title: SMB, directory integration, and availability
level: associate
order: 10
facts:
  - id: smb
    text: FSx for Windows File Server provides managed Windows file servers and supports SMB versions 2.0 through 3.1.1.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#fsx-access-shares
  - id: active-directory
    text: FSx for Windows File Server joins an AWS Managed Microsoft AD or self-managed Microsoft Active Directory domain for authentication and access control.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/aws-ad-integration-fsxW.html#aws-ad-integration-fsxW
  - id: permissions
    text: Windows access control lists control file and folder access; VPC security groups control access at the file system level.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#security-considerations
  - id: single-az
    text: Single-AZ file systems use one file server in one Availability Zone and recover from component failures.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html#high-availability-multiAZ
  - id: multi-az
    text: Multi-AZ file systems synchronously replicate data across two Availability Zones and automatically fail over to a standby file server.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html#high-availability-multiAZ
  - id: failover
    text: Multi-AZ failover typically completes in less than 30 seconds; FSx automatically fails back when the preferred server has recovered.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html#MultiAZ-Failover
  - id: windows-failover
    text: Windows applications resume file system operations without manual intervention after failover because the DNS name stays the same.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html#windows-failover
  - id: linux-failover
    text: Linux clients do not automatically connect to the standby during failover and resume file system operations after failback.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html#linux-failover
  - id: shadow-copies
    text: Shadow copies are point-in-time file system snapshots stored alongside its data that users can use to restore files; they are not enabled by default and do not replace backups.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/shadow-copies-fsxW.html#shadow-copies-fsxW
  - id: backup
    text: Automatic daily backups are enabled by default and manual backups can also be taken.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#fsx-resources
  - id: dfs
    text: DFS Namespaces can group file shares from multiple FSx for Windows File Server file systems under one common namespace.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/using-dfs-namespaces.html#group-file-systems
  - id: shares
    text: A file share is a folder and its subfolders exposed using SMB; the default share is named share.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/using-file-shares.html#using-file-shares
  - id: networking
    text: On-premises clients can access FSx for Windows File Server shares using AWS Direct Connect or Site-to-Site VPN.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#fsx-access-shares
diagrams:
  - id: fsx-windows-multi-az
    title: Multi-AZ failover
    width: 800
    height: 220
    nodes:
      - { id: client, label: Windows client, icon: res-client, x: 30, y: 70, w: 160, h: 72, tone: user }
      - { id: primary, label: Preferred server, sub: "Availability Zone A", icon: fsx-for-wfs, x: 310, y: 60, w: 170, h: 86, tone: storage }
      - { id: standby, label: Standby server, sub: "Availability Zone B", icon: fsx-for-wfs, x: 590, y: 60, w: 170, h: 86, tone: storage }
    edges:
      - { from: client, to: primary, step: 1 }
      - { from: primary, to: standby, step: 2 }
    steps:
      - Windows clients access the file share.
      - Data is synchronously replicated; FSx fails over to the standby when needed.
cards:
  - id: fsx-for-windows-001
    q: Which AWS service fits Windows SMB shares with Active Directory authentication?
    a: FSx for Windows File Server. It supports SMB and joins Microsoft Active Directory.
    facts: [smb, active-directory]
  - id: fsx-for-windows-002
    q: Windows servers need a shared drive with domain accounts and failover across Availability Zones. Which service and deployment fit?
    a: FSx for Windows File Server with Multi-AZ, joined to AWS Managed Microsoft AD or self-managed Microsoft Active Directory.
    facts: [active-directory, multi-az]
  - id: fsx-for-windows-003
    q: An FSx for Windows File Server user needs to recover an earlier version of a file without restoring a backup. What feature helps?
    a: Enable and schedule shadow copies. Users can restore earlier versions from them.
    facts: [shadow-copies]
  - id: fsx-for-windows-004
    q: Are shadow copies enabled by default on FSx for Windows File Server?
    a: No. Enable them and configure a schedule; keep backups too.
    facts: [shadow-copies]
    trap: true
  - id: fsx-for-windows-005
    q: How can multiple FSx for Windows File Server shares appear under one common folder structure?
    a: Use DFS Namespaces to group the shares under a common namespace.
    facts: [dfs]
  - id: fsx-for-windows-006
    q: Do Linux clients automatically connect to the standby during FSx for Windows File Server Multi-AZ failover?
    a: No. They resume after failback; Windows clients resume using the unchanged DNS name.
    facts: [linux-failover, windows-failover]
    trap: true
  - id: fsx-for-windows-007
    q: What controls access to individual files in FSx for Windows File Server?
    a: Windows access control lists. Security groups control file system network access.
    facts: [permissions]
  - id: fsx-for-windows-008
    q: How can on-premises clients reach FSx for Windows File Server shares?
    a: Use AWS Direct Connect or Site-to-Site VPN.
    facts: [networking]
---

Amazon FSx for Windows File Server provides managed Windows file servers for shared files. Clients use Server Message Block (SMB), a network file-sharing protocol, and Microsoft Active Directory identifies users.

### How it works

1. Create a file system and join it to AWS Managed Microsoft AD or a self-managed Microsoft Active Directory domain, a directory of users and network resources.
2. Expose a file share, a folder and its subfolders, to SMB clients. Users authenticate with directory identities; Windows access control lists, which list permissions, control file and folder access.
3. Choose Single-AZ for one file server in one Availability Zone, or Multi-AZ for synchronous replication and automatic failover to a standby in another zone.
4. Enable and schedule shadow copies, point-in-time snapshots that let users recover files. Keep backups as well: automatic daily backups are enabled by default.
5. To present shares from several file systems under one folder structure, use Distributed File System (DFS) Namespaces.

### Exam cues

- If the question says Windows shares and existing domain accounts, think FSx for Windows File Server joined to Active Directory, because it supports SMB and directory authentication.
- If the question says survive an Availability Zone disruption, think Multi-AZ, because it replicates to and fails over to a standby in another zone.
- If the question says users need earlier file versions, think shadow copies, because users can restore files from them once enabled.
- If the question says multiple file systems need one shared folder structure, think DFS Namespaces, because it groups shares into a common namespace.
- If the question says on-premises SMB access, think Direct Connect or Site-to-Site VPN, because either connects clients to the file system.

### Remember

- SMB versions 2.0 through 3.1.1 are supported.
- Multi-AZ failover typically takes less than 30 seconds; failback is automatic after recovery.
- Shadow copies are off by default; automatic daily backups are on by default.
- Windows clients resume using the same DNS name. Linux clients resume after failback, the return to the preferred server, not automatic failover.

> **Trap:** Shadow copies are not a replacement for backups. They are stored alongside file system data.

> **Trap:** Multi-AZ failover is not automatic for Linux clients. They resume access after the preferred server returns.
