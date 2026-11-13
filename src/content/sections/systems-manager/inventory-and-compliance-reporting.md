---
title: Inventory and compliance reporting
level: professional
order: 110
facts:
  - id: inventory-metadata
    text: Inventory collects metadata such as application versions, file attributes, network
      configuration, Windows updates, services and tags rather than file contents.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: inventory-custom
    text: Custom inventory is JSON metadata placed on a managed node for collection.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: inventory-interval
    text: The minimum Inventory collection interval is 30 minutes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: inventory-association
    text: AWS-GatherSoftwareInventory uses a State Manager association to collect inventory metadata.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html#what-are-document-types
  - id: inventory-sync
    text: Inventory resource data sync continuously updates a central S3 bucket as new collected
      inventory data is discovered.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/inventory-resource-data-sync.html#inventory-resource-data-sync
  - id: inventory-query
    text: Inventory data from multiple accounts and Regions can be queried with Athena.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: compliance-current
    text: Systems Manager Compliance reports current patch, association and custom compliance data.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-about
  - id: compliance-association
    text: Association compliance includes Compliant or Non-compliant status and an assigned severity.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-about-association
  - id: compliance-history
    text: Enable SSM:PatchCompliance and SSM:AssociationCompliance recording in AWS Config to retain
      compliance history and track changes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/compliance-about.html#compliance-history
  - id: compliance-finding
    text: Patch Manager can send one Security Hub CSPM finding per noncompliant managed node, including
      patch summary results.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-security-hub-integration.html#securityhub-integration-finding-types
  - id: compliance-resolved
    text: Patch Manager does not update a Security Hub CSPM finding after the node becomes compliant;
      findings can be resolved manually.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-security-hub-integration.html#securityhub-integration-finding-types
  - id: term-metadata
    text: "Metadata: Descriptive information such as installed software versions or file attributes
      rather than file contents."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html#systems-manager-inventory
  - id: term-finding
    text: "Finding: A recorded security check result or security-related detection."
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-security-hub-integration.html#patch-manager-security-hub-integration
diagrams:
  - id: ssm-inventory-query
    title: Centralize collected inventory before querying across locations
    width: 940
    height: 190
    nodes:
      - id: n0
        label: Inventory
        sub: collected node metadata
        icon: systems-manager
        tone: mgmt
        x: 25
        y: 45
        w: 270
        h: 86
      - id: n1
        label: S3 bucket
        sub: resource data sync
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 335
        y: 45
        w: 270
        h: 86
      - id: n2
        label: Athena
        sub: query collected metadata
        icon: athena
        tone: database
        x: 645
        y: 45
        w: 270
        h: 86
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
    steps:
      - Resource data sync copies collected inventory from source accounts and Regions to the
        central S3 bucket.
      - Athena queries the aggregated inventory data in S3.
cards:
  - id: systems-manager-008
    q: A State Manager association is noncompliant across several managed nodes. Where can the team
      inspect status and severity?
    a: Systems Manager Compliance. It reports each association compliance status and assigned severity.
    facts:
      - compliance-association
  - id: systems-manager-027
    q: What does Systems Manager Inventory collect, and how can it be queried across accounts and
      Regions?
    a: Node metadata, not file contents. Use resource data sync to centralize collected inventory in S3
      and Athena to query it across accounts and Regions. The shortest collection interval is 30
      minutes.
    facts:
      - inventory-metadata
      - inventory-sync
      - inventory-query
      - inventory-interval
  - id: systems-manager-065
    q: An auditor needs historical Systems Manager patch and association compliance changes. Which
      service must record them?
    a: AWS Config, with SSM:PatchCompliance and SSM:AssociationCompliance enabled. Systems Manager
      Compliance shows current data.
    facts:
      - compliance-history
      - compliance-current
  - id: systems-manager-066
    q: A Systems Manager node was patched and is compliant, but its Security Hub finding remains open.
      Why?
    a: Patch Manager does not send a compliant-state update for that finding. Resolve the finding
      manually after remediation.
    trap: true
    facts:
      - compliance-finding
      - compliance-resolved
  - id: systems-manager-067
    q: A team needs Systems Manager Inventory to include custom equipment attributes absent from
      built-in metadata. What should it provide?
    a: A custom inventory JSON file on each managed node for Inventory to collect.
    facts:
      - inventory-custom
---
Inventory records what is installed and configured on managed nodes. Compliance records whether patching and associations meet their expected state; compliance history requires AWS Config.

### How it works

1. Create an Inventory association using `AWS-GatherSoftwareInventory` and choose the metadata, descriptive details such as software versions, to collect. Add custom JSON metadata when built-in fields are insufficient.
2. Set the collection interval. Inventory gathers metadata, such as file attributes and software versions, rather than file contents.
3. Create resource data sync configurations to copy collected data into a central S3 bucket. Use Athena to query data from accounts and Regions.
4. Use Compliance for current patch and association status. Enable AWS Config recording for `SSM:PatchCompliance` and `SSM:AssociationCompliance` to retain changes over time.
5. Use the Patch Manager integration to send noncompliant-node findings to Security Hub CSPM. A finding is the recorded result of a security check.

### Exam cues

- If the question says which software versions are installed across the fleet, think Inventory, because it gathers application metadata.
- If the question says query inventory across accounts and Regions, think resource data sync plus Athena, because S3 holds the aggregated data.
- If the question says show how compliance changed over time, think AWS Config, because Compliance itself shows current state.

### Remember

- Minimum collection interval: 30 minutes.
- Association compliance includes status and severity.
- Patch Manager sends one finding per noncompliant managed node to Security Hub CSPM.
- A subsequent compliant node result does not automatically update that finding.

> **Trap:** Collecting file inventory does not upload the files themselves.

> **Trap:** A successful remediation and a resolved Security Hub finding are separate states; resolve the finding after checking compliance.
