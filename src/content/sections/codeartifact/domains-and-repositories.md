---
title: Domains and repositories
level: associate
order: 10
facts:
  - id: package-definition
    text: A package is software and metadata used to resolve dependencies and install it.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#packages-overview
  - id: domain-boundary
    text: A CodeArtifact domain groups repositories and stores their package assets and metadata.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-domain
  - id: repository-endpoints
    text: A repository contains package versions and exposes endpoints for publishing and downloading
      them with package tools.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-repository
  - id: mixed-formats
    text: A CodeArtifact repository can contain packages of different supported formats.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/create-repo.html#create-repo
  - id: asset-deduplication
    text: An asset, an individual package file, is stored once per domain even when available through
      multiple repositories.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: domain-key
    text: All assets and metadata in a domain are encrypted with one AWS KMS key.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: symmetric-only
    text: CodeArtifact supports symmetric KMS keys and does not support asymmetric KMS keys for domain
      encryption.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: repository-names
    text: Repository names must be unique within a domain.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: fixed-repository
    text: After creation, a repository cannot change its name, associated AWS account, or domain.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/create-repo.html#create-repo
  - id: metadata-copy
    text: Pulling a package from an upstream or copying package versions between repositories in a
      domain updates metadata without copying assets.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: domain-policy
    text: A domain policy can control access across repositories and permissions to configure
      connections to public repositories.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html#domain-overview
  - id: private-publishing
    text: CodeArtifact imports packages from public repositories but does not publish private repository
      packages back to public repositories.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-publishing-upstreams-direct
  - id: symmetric-definition
    text: Symmetric encryption uses the same key to encrypt and decrypt data.
    source: https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/concepts.html
cards:
  - id: codeartifact-003
    q: What does a CodeArtifact domain provide for its repositories?
    a: A shared storage and policy boundary. Each asset is stored once in the domain, and assets and
      metadata use one symmetric KMS key. Repository names are unique within the domain.
    facts:
      - domain-boundary
      - asset-deduplication
      - domain-key
      - symmetric-only
      - repository-names
  - id: codeartifact-013
    q: Two teams need the same dependency in separate CodeArtifact repositories without duplicating its
      asset storage. What boundary should they share?
    a: Use repositories in the same domain. Assets are deduplicated within that domain.
    facts:
      - asset-deduplication
  - id: codeartifact-014
    q: A team wants to move an existing CodeArtifact repository into another domain. Can it change the
      repository domain?
    a: No. A repository cannot change domains after creation.
    trap: true
    facts:
      - fixed-repository
  - id: codeartifact-015
    q: A team publishes an internal package to CodeArtifact, whose repository can fetch public
      dependencies. Will CodeArtifact publish that internal package to the public registry?
    a: No. External package importing does not publish private CodeArtifact packages back to a public
      registry.
    trap: true
    facts:
      - private-publishing
---

CodeArtifact stores software packages, bundles of software and the metadata needed to install them. Repositories provide the package-manager endpoints; their domain provides shared asset storage, encryption, and policy controls.

### How it works

1. Create a domain and choose its encryption key in AWS KMS, the service that manages encryption keys. CodeArtifact requires a symmetric key, which uses the same key for encryption and decryption.
2. Create repositories in the domain. A repository can hold several supported package formats, with a name unique in that domain.
3. Publish or download package versions through repository endpoints, the addresses package tools connect to. An asset is an individual file belonging to a version.
4. When repositories in the domain share a package version, CodeArtifact updates metadata references. It stores the underlying asset once in the domain.
5. Apply domain policies to control access across repositories and who can configure public package connections.

### Exam cues

- If the question says share dependencies across repositories without duplicate asset storage, think one domain, because the domain deduplicates assets.
- If the question says move a repository into a different domain, think fixed membership, because the repository domain cannot be changed after creation.
- If the question says one repository must serve different package formats, think a mixed-format repository, because supported types can coexist.

### Remember

- One encryption key protects the assets and metadata of a domain.
- Domain encryption supports symmetric keys only.
- Repository names are unique within a domain and cannot be changed after creation.

> **Trap:** A connection that imports public packages does not publish your private packages to the public registry.
