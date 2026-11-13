---
title: Workspaces, authentication, and data sources
level: associate
order: 10
facts:
  - id: workspace
    text: Amazon Managed Grafana provides logically isolated Grafana servers called workspaces and manages their provisioning, setup, scaling, and maintenance.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html
  - id: visualization
    text: Managed Grafana queries and visualizes operational metrics, logs, and traces from multiple sources.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html
  - id: data-sources
    text: Data sources are storage backends queried by Grafana; a dashboard can combine multiple data sources.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-data-sources.html
  - id: aws-sources
    text: AWS data sources include CloudWatch, OpenSearch Service, X-Ray, and Amazon Managed Service for Prometheus.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html
  - id: authentication
    text: Each workspace can authenticate users with SAML 2.0, IAM Identity Center, or both, rather than IAM for Grafana console sign-in.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/authentication-in-AMG.html
  - id: permissions
    text: Users or their groups must be granted workspace permissions, which include User, Editor, and Admin.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-users-and-groups-AMG.html
  - id: pricing
    text: Managed Grafana is priced per active user in a workspace.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html
  - id: service-managed
    text: With service-managed permissions, Managed Grafana creates roles and policies for discovery and access to selected AWS data sources.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-permissions.html
  - id: customer-managed
    text: Customer-managed permissions use an existing IAM role that trusts grafana.amazonaws.com and has the required data source permissions.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-permissions.html#AMG-customer-managed
  - id: add-source
    text: Selecting AWS data sources during workspace creation enables permission provisioning but the data sources must still be added in the Grafana workspace console.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-create-workspace.html#creating-workspace
  - id: organization
    text: Organization service-managed permissions create member-account roles using CloudFormation StackSets and require trusted access for StackSets.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-permissions.html#AMG-service-managed-organization
  - id: organization-location
    text: Organization service-managed permissions are supported only for workspaces created in an organization management or delegated administrator account.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-permissions.html#AMG-service-managed-organization
  - id: private-source
    text: A workspace can connect to a VPC to reach private data sources; after connection traffic is routed through that VPC.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-configure-vpc.html
  - id: external-routing
    text: A workspace connected to a VPC needs routing to reach data sources and alert destinations in other networks or the public internet.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-configure-vpc.html#AMG-VPC-how-it-works
  - id: vpc-prerequisites
    text: VPC connectivity requires private subnets in at least two Availability Zones and at least 15 available IP addresses in each connected subnet.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-configure-vpc.html#config-vpc-prereqs
  - id: private-link
    text: Without a private VPC connection, Managed Grafana connects to some same-Region AWS services including CloudWatch, Managed Service for Prometheus, and X-Ray using AWS PrivateLink.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-configure-vpc.html
  - id: mixed
    text: The Mixed data source lets a panel query multiple data sources.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/AMG-data-sources.html#AMG-data-sources-special
diagrams:
  - id: grafana-vpc-outbound
    title: Workspace outbound VPC connection
    width: 800
    height: 190
    nodes:
      - { id: workspace, label: Grafana, sub: Workspace, icon: managed-grafana, x: 30, y: 55, w: 170, h: 86, tone: mgmt }
      - { id: vpc, label: VPC, sub: Private data sources, icon: virtual-private-cloud, x: 315, y: 55, w: 170, h: 86, tone: network }
      - { id: outside, label: Other network, sub: External data sources, x: 600, y: 65, w: 170, h: 66, tone: neutral }
    edges:
      - { from: workspace, to: vpc, step: 1 }
      - { from: vpc, to: outside, step: 2 }
    steps:
      - The workspace connects to the VPC for private data sources.
      - Access to other networks requires routing from the VPC.
cards:
  - id: managed-grafana-001
    q: What is an Amazon Managed Grafana workspace and how do users sign in?
    a: A workspace is a managed, logically isolated Grafana server. Users sign in with IAM Identity Center, SAML 2.0, or both.
    facts: [workspace, authentication]
  - id: managed-grafana-002
    q: Where does Amazon Managed Grafana obtain the data shown in its dashboards?
    a: It queries configured data sources, which are storage backends. The workspace needs permission to access AWS data sources.
    facts: [data-sources, service-managed, customer-managed]
    trap: true
  - id: managed-grafana-003
    q: A team wants one Amazon Managed Grafana dashboard for CloudWatch and Amazon Managed Service for Prometheus. What should it configure?
    a: Add both data sources to the workspace and grant the workspace access. A dashboard can combine sources.
    facts: [aws-sources, data-sources, add-source, service-managed]
  - id: managed-grafana-004
    q: A team selected CloudWatch during Amazon Managed Grafana workspace creation but cannot query it yet. What configuration remains?
    a: Add CloudWatch as a data source in the Grafana workspace console. Selecting it during creation provisions permissions but does not add it.
    facts: [add-source]
    trap: true
  - id: managed-grafana-005
    q: How can Amazon Managed Grafana automatically provision AWS data source access across an organization?
    a: Choose organization service-managed permissions in a management or delegated administrator account and enable trusted access for CloudFormation StackSets.
    facts: [organization, organization-location]
  - id: managed-grafana-006
    q: An Amazon Managed Grafana workspace must query a private data source in a VPC. What should be configured?
    a: Connect the workspace to the VPC. Provide private subnets in at least two Availability Zones with at least 15 available IP addresses each.
    facts: [private-source, vpc-prerequisites]
  - id: managed-grafana-007
    q: A team connects Amazon Managed Grafana to a VPC and loses access to an external data source. What should it check?
    a: Check routing from the VPC to the other network. Outbound traffic goes through the VPC after connection.
    facts: [private-source, external-routing]
  - id: managed-grafana-008
    q: Which IAM role does an Amazon Managed Grafana workspace use with customer-managed permissions?
    a: An existing role that trusts grafana.amazonaws.com and permits access to the required data sources.
    facts: [customer-managed]
---

Amazon Managed Grafana provides managed Grafana workspaces for viewing operational metrics, logs, and traces from multiple sources. A workspace is a logically isolated Grafana server; a data source is a storage backend that Grafana queries.

### How it works

1. Create a workspace. AWS provisions, scales, and maintains its Grafana server.
2. Choose IAM Identity Center, a Security Assertion Markup Language (SAML) 2.0 identity provider, or both for user sign-in. Grant users or groups workspace permissions such as User, Editor, or Admin.
3. Give the workspace permission to reach AWS data sources. Service-managed permissions create roles and policies; customer-managed permissions use an existing IAM role that trusts `grafana.amazonaws.com`.
4. Add data sources in the workspace console, then build dashboards that query them. Sources include CloudWatch and Amazon Managed Service for Prometheus.
5. To query private sources, connect the workspace to a virtual private cloud (VPC), a private AWS network. After connection, traffic uses that VPC; configure routing for sources outside it.

### Exam cues

- If the question says combine CloudWatch and Prometheus data in one dashboard, think Managed Grafana with both data sources, because a dashboard can query multiple backends.
- If the question says provision cross-account AWS data access automatically, think organization service-managed permissions, because Managed Grafana uses CloudFormation StackSets, which deploy stacks across accounts, to create member roles.
- If the question says access a private data source, think an outbound VPC connection, because the workspace can reach private sources through the VPC.
- If the question says data stops working after connecting a VPC, think network routing, because outbound data source traffic now uses that VPC.

### Remember

- Workspace sign-in uses SAML 2.0, IAM Identity Center, or both, not IAM user sign-in.
- Service-managed permissions can target the current account or an organization; organization mode requires a management or delegated administrator account and StackSets trusted access.
- The VPC connection requires private subnets in at least two Availability Zones and at least 15 free IP addresses per connected subnet.
- Without a private VPC connection, some same-Region AWS services use AWS PrivateLink rather than the public internet.
- Pricing is per active user in a workspace.

> **Trap:** Selecting a data source during workspace creation provisions access permissions, but you must still add that source in the Grafana workspace console.
