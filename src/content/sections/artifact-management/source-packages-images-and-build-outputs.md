---
title: Source, packages, images, and build outputs
level: associate
order: 10
facts:
  - id: artifact-definition
    text: CodePipeline artifacts are files consumed or produced by pipeline actions, including source
      files and built application files.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html
  - id: source
    text: CodeCommit hosts private Git repositories with branches and pull requests for reviewing
      changes before merging.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html
  - id: source-security
    text: CodeCommit encrypts repositories at rest and in transit and integrates access with IAM.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html
  - id: packages
    text: CodeArtifact stores software packages for package managers including npm, Maven, pip and
      NuGet; a repository can contain multiple supported package types.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
  - id: domains
    text: Each CodeArtifact repository belongs to one domain, and upstream repositories share package
      access within that domain.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
  - id: public-packages
    text: CodeArtifact external connections fetch and store requested packages from public repositories
      on demand.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
  - id: upstreams
    text: CodeArtifact upstream repositories let clients access packages from other CodeArtifact
      repositories through one endpoint; an external connection points to a public repository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repos-upstream.html
  - id: package-auth
    text: CodeArtifact requires an authorization token based on AWS credentials to publish or consume
      package versions; its repositories cannot be public.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
  - id: images
    text: ECR stores Docker and OCI container images and OCI-compatible artifacts; IAM and
      resource-based policies control access to private repositories.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html
  - id: immutability
    text: ECR tag immutability prevents overwriting an existing image tag, with separately configurable
      exclusion filters.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html
  - id: image-cleanup
    text: ECR lifecycle policy previews show which images match cleanup rules before applying them;
      eligible images expire within 24 hours.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html
  - id: buildspec
    text: A CodeBuild buildspec contains build commands and settings; its artifacts/files and
      artifacts/base-directory settings select build output files.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.artifacts
  - id: artifact-bucket
    text: CodePipeline transfers input and output artifacts through an S3 artifact bucket; it is
      distinct from an S3 source location bucket.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html
  - id: regional-buckets
    text: CodePipeline requires an artifact bucket in its account and Region, plus an artifact bucket
      for each additional action Region.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html
  - id: artifact-encryption
    text: CodePipeline S3 artifact encryption supports symmetric KMS keys; cross-account pipelines
      require a customer managed key.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/S3-artifact-encryption.html
  - id: versioning
    text: S3 Versioning preserves object versions for recovery from overwrites and deletions; versioning
      is disabled by default.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html
  - id: lifecycle
    text: S3 Lifecycle can transition objects between storage classes or expire them.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
  - id: noncurrent
    text: Versioned S3 buckets need noncurrent-version expiration to permanently remove older object
      versions through lifecycle rules.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html#versioning-lifecycle
diagrams:
  - id: artifact-build-output
    title: Source files become a pipeline build artifact
    width: 800
    height: 190
    nodes:
      - id: source
        label: Git source
        icon: codecommit
        tone: devtools
        x: 30
        y: 60
        w: 210
        h: 86
      - id: build
        label: Build commands
        icon: codebuild
        tone: devtools
        x: 295
        y: 60
        w: 210
        h: 86
      - id: s3
        label: S3 build artifact
        icon: simple-storage-service
        tone: storage
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: source
        to: build
        step: 1
      - from: build
        to: s3
        step: 2
    steps:
      - Source input
      - Publish selected files
cards:
  - id: artifact-management-001
    q: Which release assets belong in CodeCommit, CodeArtifact, ECR and S3?
    a: "CodeCommit: Git source. CodeArtifact: versioned software packages. ECR: container images. S3:
      pipeline artifacts and build output files."
    facts:
      - source
      - packages
      - images
      - artifact-bucket
      - buildspec
  - id: artifact-management-002
    q: A build team needs one package-manager endpoint for private libraries and cached public
      dependencies. Which AWS repository service fits?
    a: CodeArtifact. Use upstream CodeArtifact repositories for internal sharing and an external
      connection for on-demand public packages.
    facts:
      - packages
      - public-packages
      - upstreams
  - id: artifact-management-003
    q: A pipeline action in another Region needs input artifacts. Does its CodePipeline pipeline need
      another artifact bucket?
    a: Yes. Provide an artifact bucket for each additional Region where actions execute.
    facts:
      - regional-buckets
  - id: artifact-management-004
    q: A team enables S3 Versioning on its build artifact bucket. Will a lifecycle rule for current
      objects permanently remove all older versions?
    a: No. Configure noncurrent-version expiration for older versions. Versioning preserves versions for
      recovery.
    trap: true
    facts:
      - versioning
      - noncurrent
  - id: artifact-management-005
    q: An ECR repository must prevent a published release tag from pointing to a replacement image.
      Which setting fits?
    a: Tag immutability. Ensure exclusion filters do not permit updates to the release tags that must be
      protected.
    facts:
      - immutability
  - id: artifact-management-006
    q: How should a team review an ECR image cleanup policy before enabling it?
    a: Run a lifecycle policy preview and inspect affected images. Once enabled, images that meet
      expiration criteria expire within 24 hours.
    facts:
      - image-cleanup
  - id: artifact-management-007
    q: A CodePipeline pipeline shares encrypted S3 artifacts across AWS accounts. What type of KMS key
      should it use?
    a: A customer managed symmetric KMS key. CodePipeline artifact encryption does not support
      asymmetric KMS keys.
    facts:
      - artifact-encryption
  - id: artifact-management-008
    q: Which CodeBuild buildspec settings select files to publish as build artifacts?
    a: artifacts/files selects output paths, and artifacts/base-directory sets the base location for
      selecting them.
    facts:
      - buildspec
  - id: artifact-management-009
    q: Can AWS CodeArtifact publish a repository for anonymous public package downloads?
    a: No. Publishing and consuming package versions require authentication with an authorization token
      based on AWS credentials.
    trap: true
    facts:
      - package-auth
---
An artifact is a file or collection of files consumed or produced during a release pipeline. Source repositories, package repositories, image registries and object storage serve different release assets. Choose storage by how the next tool will consume the asset.

### How it works

1. Keep Git source and review history in a source repository such as CodeCommit. Git tracks changes using branches; a pull request asks reviewers to approve changes before merging.
2. Resolve or publish reusable packages through CodeArtifact using the relevant package manager, such as npm, Maven, pip or NuGet. Authenticate with a CodeArtifact authorization token.
3. Run build commands through CodeBuild. Its buildspec, the file containing build commands and settings, selects output files through `artifacts/files` and `artifacts/base-directory`.
4. Store container images in ECR. A registry is a service from which container tools push and pull images. Tag immutability can prevent a release tag from being overwritten; check any configured exclusions.
5. Pass pipeline files through S3 artifact buckets. CodePipeline needs an artifact bucket in each action Region. S3 source location buckets and pipeline artifact buckets serve different purposes.
6. Apply retention to the correct asset: preview ECR image lifecycle rules; use S3 versioning for recovery and lifecycle rules for transition or expiration. Explicitly manage noncurrent versions, the older versions retained after an object changes.

| Asset or need | Service | Relevant control |
|---|---|---|
| Source branches and code review | CodeCommit | IAM access; encryption at rest and in transit |
| Reusable versioned packages | CodeArtifact | Authorization tokens; upstream repositories and external connections |
| Container images | ECR | Repository access, tag immutability, lifecycle preview |
| Pipeline files and build outputs | S3 | KMS artifact encryption, versioning, lifecycle rules |

A CodeArtifact domain contains repositories. An upstream is another CodeArtifact repository in the same domain. An external connection reaches a public package repository and caches packages on demand. These options let one repository endpoint serve shared internal and public dependencies.

### Exam cues

- If the question says cache public dependencies alongside internal libraries, think CodeArtifact, because it integrates package managers with upstreams and external connections.
- If the question says prevent a container release tag from changing, think ECR tag immutability, because it prevents overwrites for protected tags.
- If the question says recover an overwritten build output, think S3 Versioning, because it preserves earlier object versions.
- If the question says share encrypted CodePipeline artifacts across accounts, think a customer managed symmetric KMS key, because the cross-account artifact configuration requires it.

### Remember

- CodeArtifact requires authentication; repositories cannot be public.
- CodePipeline needs artifact storage in each action Region.
- CodePipeline supports symmetric KMS keys for artifact encryption.
- ECR expiration occurs within 24 hours after an image meets the policy criteria.
- S3 Versioning is disabled by default. Use noncurrent-version expiration to remove retained old versions.

> **Trap:** S3 Versioning preserves recovery copies. It does not replace lifecycle rules for cleaning up old versions.
