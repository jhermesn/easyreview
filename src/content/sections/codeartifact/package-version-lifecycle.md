---
title: Package version lifecycle
level: associate
order: 60
facts:
  - id: version-status
    text: A package version status controls whether clients can discover or download the version.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: published-status
    text: Published versions appear in package-manager version lists and their assets are downloadable.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: unfinished-status
    text: Unfinished indicates uploaded assets not yet finalized; generic and Maven packages can have
      this status.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: unlisted-status
    text: Unlisted versions are omitted from package-manager version lists but their assets remain
      downloadable.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: lockfile-download
    text: An Unlisted npm version referenced by package-lock.json can still be downloaded and installed
      with npm ci.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: archived-status
    text: Archived versions are neither listed to package managers nor downloadable; uncached builds
      depending on them fail.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: archive-recovery
    text: An Archived version can return to Published or Unlisted using UpdatePackageVersionsStatus.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-version-status
  - id: disposed-status
    text: Disposing permanently deletes a version's assets, so it cannot return to Archived, Unlisted,
      or Published.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/update-package-version-status.html#update-package-version-status
  - id: status-commands
    text: update-package-versions-status sets Published, Unlisted, or Archived; dispose-package-versions
      performs irreversible disposal.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/update-package-version-status.html#update-package-version-status
  - id: no-unfinished-return
    text: Once published, a package version cannot return to Unfinished.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/update-package-version-status.html#update-package-version-status
  - id: asset-overwrite
    text: An existing package asset cannot be republished with different content unless its package
      version is deleted first.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/packages-overview.html#package-publishing-overwrite-assets
  - id: event-emission
    text: CodeArtifact emits package-version events for creation, modification, and deletion, including
      downstream retention and external imports.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/monitoring-events.html#monitoring-events
  - id: event-pattern
    text: Package-version EventBridge events use source aws.codeartifact and detail-type CodeArtifact
      Package Version State Change.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/monitoring-events.html#monitoring-events
  - id: pipeline-trigger
    text: An EventBridge rule can match CodeArtifact package events and start CodePipeline to run a
      dependent application pipeline.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/configure-service-events-codepipeline.html#configure-service-events-codepipeline
  - id: pipeline-filter
    text: The EventBridge rule can filter CodeArtifact events by domainName, domainOwner, and
      repositoryName.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/configure-service-events-codepipeline.html#configure-service-events-codepipeline
  - id: pipeline-role
    text: The EventBridge pipeline target requires an IAM role granting permission to start the target
      pipeline.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/configure-service-events-codepipeline.html#configure-service-events-codepipeline
diagrams:
  - id: codeartifact-package-rebuild
    title: Package event starts a dependent pipeline
    width: 1000
    height: 230
    nodes:
      - id: package
        label: Package change
        sub: CodeArtifact
        icon: codeartifact
        x: 25
        y: 90
        w: 250
        h: 86
        tone: devtools
        info: Creation, modification, or deletion emits a package-version state-change event.
      - id: rule
        label: Event rule
        sub: EventBridge
        icon: eventbridge
        x: 375
        y: 90
        w: 250
        h: 86
        tone: integration
        info: Match aws.codeartifact and the package-version detail type; filter the domain and repository.
      - id: pipeline
        label: Dependent pipeline
        sub: CodePipeline
        icon: codepipeline
        x: 725
        y: 90
        w: 250
        h: 86
        tone: devtools
        info: The EventBridge target role permits starting the pipeline that rebuilds the dependent
          application.
    edges:
      - from: package
        to: rule
        step: 1
        label: event
      - from: rule
        to: pipeline
        step: 2
        label: start
    steps:
      - CodeArtifact emits the event and EventBridge matches the configured rule.
      - EventBridge starts the target CodePipeline using its permitted target role.
cards:
  - id: codeartifact-001
    q: A CodeArtifact dependency was Archived and an uncached build can no longer download it. How can
      access be restored?
    a: Change its status to Published or Unlisted with UpdatePackageVersionsStatus. Archived assets
      remain stored but cannot be downloaded.
    facts:
      - archived-status
      - archive-recovery
  - id: codeartifact-002
    q: A team disposed of a CodeArtifact package version and wants to restore its status for a build.
      Can it reverse disposal?
    a: No. Disposal permanently deletes the assets and cannot be reversed by changing status.
    trap: true
    facts:
      - disposed-status
  - id: codeartifact-029
    q: An npm dependency is Unlisted in CodeArtifact but remains pinned in package-lock.json. Can npm ci
      install it?
    a: Yes. Unlisted versions remain downloadable even though package-manager version lists omit them.
    trap: true
    facts:
      - unlisted-status
      - lockfile-download
  - id: codeartifact-030
    q: A team wants CodeArtifact version changes to trigger a dependent application rebuild
      automatically. What event flow should it configure?
    a: Match CodeArtifact Package Version State Change events with an EventBridge rule, filter the
      relevant domain and repository, and target CodePipeline with an execution role that permits
      starting it.
    facts:
      - event-pattern
      - pipeline-trigger
      - pipeline-filter
      - pipeline-role
  - id: codeartifact-031
    q: Can a team publish different content under an existing CodeArtifact package asset name without
      deleting the package version first?
    a: No. Existing assets can be republished only with identical content. Different content requires
      deleting the version first.
    trap: true
    facts:
      - asset-overwrite
  - id: codeartifact-032
    q: Which command irreversibly disposes a CodeArtifact version, and can
      update-package-versions-status return it to Unfinished?
    a: Use dispose-package-versions for disposal. A published version cannot return to Unfinished.
    facts:
      - status-commands
      - no-unfinished-return
---

A CodeArtifact package version has a status that controls discovery and download access. Use status changes to withdraw a version temporarily; disposal permanently removes its assets.

### How it works

1. Publishing finalizes a version as `Published`. Generic and Maven packages can first be `Unfinished` while uploaded assets have not yet been finalized.
2. Use `Unlisted` to remove the version from package-manager version lists while preserving downloads. An npm lockfile, which records the chosen dependency versions, can still reference and install it.
3. Use `Archived` to block downloads. An uncached build that needs that version fails. Restore availability by changing the status to `Published` or `Unlisted`.
4. Use `dispose-package-versions` for irreversible deletion of the assets. The version cannot return to a downloadable status.
5. For dependent application rebuilds, match package-version events in EventBridge and target CodePipeline. Filter the domain and repository, and grant the target role permission to start the pipeline.

| Status | Package-manager discovery and downloads |
|---|---|
| `Published` | Listed and downloadable |
| `Unfinished` | Uploaded but not finalized; available for generic and Maven publishing workflows |
| `Unlisted` | Not listed, but downloadable by an existing reference |
| `Archived` | Not listed and not downloadable; status can be restored |
| `Disposed` | Assets permanently deleted; cannot restore status |

### Exam cues

- If the question says hide a version from resolution while preserving pinned npm installs, think Unlisted, because a lockfile can still download it.
- If the question says stop downloads but keep a reversible withdrawal, think Archived, because its status can return to Published or Unlisted.
- If the question says rebuild dependent applications when packages change, think EventBridge to CodePipeline, because CodeArtifact emits package-version state-change events.

### Remember

- `update-package-versions-status` targets Published, Unlisted, or Archived. A published version cannot return to Unfinished.
- Event source: `aws.codeartifact`. Detail type: `CodeArtifact Package Version State Change`.
- Events include creation, modification, and deletion, as well as upstream retention and public ingestion.

> **Trap:** Unlisted still permits downloads. Archived blocks them; Disposed deletes the assets permanently.

> **Trap:** Publishing different content under an existing asset name requires deleting the package version first. A status change does not overwrite the asset.
