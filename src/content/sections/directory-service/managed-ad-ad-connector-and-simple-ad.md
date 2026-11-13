---
title: Managed AD, AD Connector, and Simple AD
level: associate
order: 10
facts:
  - id: ds-directory
    text: Directories store information about users, groups and devices and help administrators manage access.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html
  - id: ds-managed
    text: AWS Managed Microsoft AD runs Microsoft Active Directory as an AWS managed service and creates two domain controllers across Availability Zones.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_microsoft_ad.html
  - id: ds-trust
    text: AWS Managed Microsoft AD can establish a trust with existing Active Directory so users can access resources using their existing credentials.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_microsoft_ad.html
  - id: ds-rds
    text: AWS Managed Microsoft AD supports RDS for SQL Server; AD Connector and Simple AD are not compatible with RDS for SQL Server.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html#directoryoptions
  - id: ds-proxy
    text: AD Connector redirects directory requests to an existing Active Directory without caching directory information in the cloud.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html
  - id: ds-one-domain
    text: Each on-premises domain that users authenticate against requires its own AD Connector; transitive trusts are not supported.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html
  - id: ds-mfa
    text: AD Connector can integrate with an existing RADIUS-based MFA infrastructure for AWS applications.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_ad_connector.html
  - id: ds-radius
    text: RADIUS is a protocol for authentication, authorization and accounting for network services.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/ms_ad_mfa.html
  - id: ds-simple
    text: Simple AD is a standalone managed directory powered by Samba 4 and supports a subset of Active Directory features.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_simple_ad.html
  - id: ds-simple-limit
    text: Simple AD does not support MFA, domain trusts, schema extensions, IAM Identity Center or RDS for SQL Server.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_simple_ad.html
  - id: ds-simple-availability
    text: As of November 2026, Simple AD is closed to new customers; existing customers can continue to create directories.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/simple-ad-availability-change.html
  - id: ds-identity-center
    text: IAM Identity Center supports an Active Directory identity source but does not support Simple AD.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source.html
  - id: ds-identity-sync
    text: IAM Identity Center synchronizes users, groups and memberships from Active Directory but not passwords; authentication occurs against the source directory.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-ad.html#provision-users-from-ad
  - id: ds-hybrid
    text: AWS Managed Microsoft AD Hybrid Edition extends an existing self-managed Active Directory to AWS without synchronizing user identities.
    source: https://docs.aws.amazon.com/directoryservice/latest/admin-guide/directory_microsoft_ad.html#choosing_ms_ad
cards:
  - id: directory-service-001
    q: An organization has on-premises Active Directory. How do AWS Managed Microsoft AD, AD Connector and Simple AD differ?
    a: Managed Microsoft AD runs Microsoft AD in AWS and can establish a trust. AD Connector forwards requests to existing AD. Simple AD is a standalone Samba-based directory with fewer features.
    facts: [ds-managed, ds-trust, ds-proxy, ds-simple]
  - id: directory-service-002
    q: Which AWS service provides managed Microsoft Active Directory or connects supported AWS applications to an existing directory?
    a: AWS Directory Service. Choose AWS Managed Microsoft AD for a managed directory or AD Connector to forward requests to an existing directory.
    facts: [ds-managed, ds-proxy]
  - id: directory-service-003
    q: A team needs RDS for SQL Server integrated with a directory. Which AWS Directory Service option should it choose?
    a: AWS Managed Microsoft AD. AD Connector and Simple AD are not compatible with RDS for SQL Server.
    facts: [ds-rds]
  - id: directory-service-004
    q: A company wants AWS applications to authenticate against its existing on-premises AD without caching directory data in AWS. What should it use?
    a: AD Connector forwards directory requests to the existing AD without caching directory information in the cloud.
    facts: [ds-proxy]
  - id: directory-service-005
    q: Can a new customer create Simple AD directories or use Simple AD as an IAM Identity Center identity source?
    a: No. Simple AD is closed to new customers and is not supported as an IAM Identity Center identity source.
    trap: true
    facts: [ds-simple-availability, ds-identity-center]
  - id: directory-service-006
    q: An organization needs users from two on-premises Active Directory domains to authenticate through AD Connector. How many connectors are required?
    a: One connector per domain, so two. AD Connector does not support transitive trusts.
    facts: [ds-one-domain]
  - id: directory-service-007
    q: When IAM Identity Center uses Active Directory as its identity source, are Active Directory passwords synchronized to the IAM Identity Center identity store?
    a: No. IAM Identity Center synchronizes users, groups and memberships, while authentication happens against the source directory.
    trap: true
    facts: [ds-identity-sync]
diagrams:
  - id: directory-connector-authentication
    title: AD Connector authentication
    width: 800
    height: 160
    nodes:
      - { id: application, label: AWS application, x: 30, y: 40, w: 160, h: 72, tone: neutral }
      - { id: connector, label: AD Connector, icon: directory-service, x: 310, y: 40, w: 160, h: 72, tone: security }
      - { id: directory, label: Existing AD, x: 610, y: 40, w: 160, h: 72, tone: neutral }
    edges:
      - { from: application, to: connector, step: 1 }
      - { from: connector, to: directory, step: 2 }
    steps:
      - The AWS application sends a directory request to AD Connector.
      - AD Connector forwards the request to the existing directory.
---
AWS Directory Service offers ways to use directories, which store users, groups and devices, with AWS applications. Choose between a managed directory and a gateway to an existing one.

### How it works

1. AWS Managed Microsoft AD runs Microsoft Active Directory in AWS with two managed domain controllers, servers that handle directory requests, in different Availability Zones.
2. A trust allows users in an existing Active Directory to access resources in the managed directory with their existing credentials. Hybrid Edition extends an existing self-managed directory without synchronizing user identities.
3. AD Connector is a proxy, or intermediary, that forwards requests to existing AD without caching directory information in AWS.
4. Simple AD is a separate Samba-based directory with basic Active Directory features. As of November 2026, it is closed to new customers, but existing customers may create more directories.

IAM Identity Center can use an Active Directory identity source to assign access to accounts and applications. It synchronizes users, groups and memberships to its identity store, but not passwords; sign-in authentication uses the source directory.

| Option | Choose it for | Important limit |
| --- | --- | --- |
| AWS Managed Microsoft AD | Microsoft AD features, trusts and RDS for SQL Server | It creates a managed directory. |
| AD Connector | Existing AD credentials for compatible AWS applications | One connector per domain; no RDS for SQL Server. |
| Simple AD | Basic directory features for existing customers | No trusts, MFA, IAM Identity Center or RDS for SQL Server. |

### Exam cues

- If the question says use on-premises credentials without copying directory data, think AD Connector, because it forwards requests to the existing directory.
- If the question says RDS for SQL Server needs Active Directory, think AWS Managed Microsoft AD, because the other two options do not support that integration.
- If the question says connect an existing directory to IAM Identity Center, think Managed Microsoft AD or AD Connector, not Simple AD.

### Remember

- AWS Managed Microsoft AD creates two domain controllers across Availability Zones.
- AD Connector requires one connector per domain. It can use an existing RADIUS authentication server for multi-factor authentication (MFA), an additional sign-in check, for AWS applications.
- Simple AD does not support trusts or MFA.

> **Trap:** AD Connector is a proxy, not a new managed Microsoft Active Directory. Simple AD is not an IAM Identity Center identity source.
