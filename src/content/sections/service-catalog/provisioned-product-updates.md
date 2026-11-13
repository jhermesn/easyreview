---
title: Provisioned product updates
level: associate
order: 70
facts:
  - id: new-template
    text: Updating a product template creates a new product version available to users with portfolio access.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/productmgmt-update.html#productmgmt-update
  - id: explicit-update
    text: A provisioned product requires an update to adopt a new version or changed parameters.
    source: https://docs.aws.amazon.com/servicecatalog/latest/userguide/enduser-update.html
  - id: update-state
    text: Only Available or Tainted provisioned products can be updated; starting, updating, terminating, or failed products cannot.
    source: https://docs.aws.amazon.com/servicecatalog/latest/userguide/enduser-update.html
  - id: active
    text: An Active version appears in the version list and can be launched.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/managing-versions.html#version-status
  - id: inactive
    text: An Inactive version is hidden from the version list without affecting existing provisioned products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/managing-versions.html#version-status
  - id: deleted
    text: Deleting a version removes it from the version list and cannot be undone.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/managing-versions.html#version-status
  - id: guidance-default
    text: Version guidance defaults to None and only affects active versions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/managing-versions.html#version-guidance
  - id: deprecated
    text: Deprecated guidance blocks new launches; existing products on that version can update using their existing version or a new version.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/managing-versions.html#version-guidance
  - id: git-sync
    text: Git-synced products connect to a template in GitHub, GitHub Enterprise, or Bitbucket; committed changes automatically create a product version.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/git-synced-sc-products.html#git-synced-sc-products
  - id: sync-config
    text: Git sync requires an authorized connection plus the repository, branch, and template file path.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/git-synced-sc-products.html#create-synced-product
  - id: sync-status
    text: Last Sync Status shows synchronization details, and version details include the source revision ID.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/git-synced-sc-products.html#view-repo-sync
  - id: terminate
    text: Terminate removes a provisioned product and its resources; Ignore errors can stop management even when underlying resource deletion fails.
    source: https://docs.aws.amazon.com/servicecatalog/latest/userguide/enduser-delete.html
  - id: stack
    text: For CloudFormation products the deployed instance is a stack managed as a unit.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-provprod
diagrams:
  - id: catalog-version-and-update
    title: Template publication and deployment update are separate
    width: 930
    height: 180
    nodes:
      - id: git
        label: Template repo
        icon: res-git-repository
        x: 20
        y: 50
        w: 190
        h: 72
        tone: devtools
      - id: version
        label: Product version
        icon: service-catalog
        x: 365
        y: 50
        w: 190
        h: 72
        tone: mgmt
      - id: stack
        label: Running stack
        icon: res-cloudformation-stack
        x: 710
        y: 50
        w: 190
        h: 72
        tone: mgmt
    edges:
      - from: git
        to: version
        step: 1
        label: commit + sync
      - from: version
        to: stack
        step: 2
        label: explicit update
    steps:
      - A committed template change creates a product version through Git sync.
      - A user or automation updates the provisioned product to adopt the selected version.
cards:
  - id: service-catalog-015
    q: How should an AWS Service Catalog administrator release a changed template without automatically altering running deployments?
    a: Publish a new product version. Update each provisioned product separately to adopt it. Inactive versions are hidden; Deprecated guidance blocks new launches of an active version.
    trap: true
    facts:
      - new-template
      - explicit-update
      - inactive
      - deprecated
  - id: service-catalog-016
    q: How does an AWS Service Catalog user adopt a new product version, and what does Terminate do?
    a: Use Update on the provisioned product with the new version and parameters. Terminate removes the provisioned product and its resources; Ignore errors can leave undeleted resources unmanaged.
    facts:
      - explicit-update
      - terminate
  - id: service-catalog-021
    q: A central team publishes a corrected AWS Service Catalog template, but existing deployments still use the old template. What must happen?
    a: Update each provisioned product to the new version. Publishing the version only makes it available.
    trap: true
    facts:
      - new-template
      - explicit-update
  - id: service-catalog-034
    q: A platform team wants AWS Service Catalog product versions published automatically after template commits to GitHub. What should it configure?
    a: A Git-synced product with an authorized connection, repository, branch, and template file path. Commits publish versions; deployed products still need updates.
    facts:
      - git-sync
      - sync-config
      - explicit-update
  - id: service-catalog-035
    q: Can an AWS Service Catalog user update a provisioned product while it is starting or in Failed state?
    a: No. Updates require Available or Tainted state.
    facts:
      - update-state
  - id: service-catalog-036
    q: What is the default AWS Service Catalog version guidance, and does Deprecated guidance hide the version?
    a: None is the default. Deprecated guidance applies only to active versions and blocks new launches; Inactive status hides a version.
    trap: true
    facts:
      - guidance-default
      - deprecated
      - inactive
---
Publishing an AWS Service Catalog version changes what users can select. Updating a provisioned product changes an existing deployment. Keeping these actions separate lets teams release a corrected template before moving running resources to it.

### How it works

1. Publish the changed template as a new product version. For automated publication, connect a Git-synced product to an authorized repository, branch, and template file path.
2. A commit to the connected template creates a new version automatically. GitHub, GitHub Enterprise, and Bitbucket are supported repository providers. Last Sync Status and the version's source revision ID help trace publication.
3. Update each provisioned product with the selected version and parameters. For a CloudFormation product, this changes its stack.
4. Use version status and guidance to control selection. Use Terminate when the provisioned resources are no longer needed.

### Exam cues

- If the question says template commits must publish catalog versions, think Git-synced product, because committed template changes create versions automatically.
- If the question says running deployments need a corrected template, think provisioned product update, because publication alone only makes a version available.
- If the question says block new launches while preserving existing deployments, think Deprecated guidance on an active version, because it blocks new launches without terminating existing products.

### Remember

| Setting | Effect |
|---|---|
| Active status | Version appears and supports launch |
| Inactive status | Version is hidden; existing deployments are unaffected |
| Deleted status | Version is removed; deletion cannot be undone |
| None guidance | Default guidance; launch and update are allowed |
| Deprecated guidance | Blocks new launches; existing products can update using the same or a new version |

- Updates require Available or Tainted state.
- Guidance affects only active versions.
- Terminate deletes resources. Ignore errors can leave resources unmanaged if deletion fails.

> **Trap:** A successful repository sync proves that a version was published. It does not prove that existing provisioned products adopted that version.
