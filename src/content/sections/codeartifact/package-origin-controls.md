---
title: Package origin controls
level: professional
order: 30
facts:
  - id: origin-purpose
    text: Package origin controls limit how versions enter a repository to reduce dependency
      substitution risk.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-controls
  - id: substitution-risk
    text: Dependency substitution can occur when a same-name public package is consumed in place of an
      internal package.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-control-scenarios
  - id: publish-control
    text: The package publish control uses ALLOW or BLOCK to permit or reject direct publishing.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-control-settings
  - id: upstream-control
    text: The package upstream control uses ALLOW or BLOCK for both internal upstream retention and
      public package ingestion.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-control-settings
  - id: direct-default
    text: When all associated package-group restrictions allow entry, a first directly published version
      defaults to Publish ALLOW and Upstream BLOCK.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#default-package-origin-control-settings
  - id: public-default
    text: When all associated package-group restrictions allow entry, a first public import defaults to
      Publish BLOCK and Upstream ALLOW.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#default-package-origin-control-settings
  - id: restricted-group-default
    text: When an associated package group has a BLOCK or ALLOW_SPECIFIC_REPOSITORIES restriction,
      package defaults are Publish ALLOW and Upstream ALLOW.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#default-package-origin-control-settings
  - id: block-precedence
    text: A BLOCK in package or package-group origin controls overrides an ALLOW in the other.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-controls-interaction-package-groups
  - id: group-pattern
    text: Package groups match package format, namespace, and name patterns to apply controls across
      multiple packages.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-groups.html#package-groups
  - id: group-entry-types
    text: Package groups distinguish direct PUBLISH, public EXTERNAL_UPSTREAM, and internal
      INTERNAL_UPSTREAM entry.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-group-origin-controls.html#package-group-origin-controls
  - id: group-restrictions
    text: Package-group restrictions support ALLOW, BLOCK, ALLOW_SPECIFIC_REPOSITORIES, and INHERIT from
      a parent group.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-group-origin-controls.html#package-group-origin-controls
  - id: legacy-origin-default
    text: Packages existing before around May 2022 can have both package origin controls set to ALLOW
      and need manual changes; new defaults were enforced when origin controls launched in July
      2022.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#default-package-origin-control-settings
  - id: namespace-definition
    text: A package namespace groups related package names, such as an npm scope or Maven group ID.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/codeartifact-concepts.html#welcome-concepts-package-namespace
cards:
  - id: codeartifact-006
    q: An internal package name also exists in a public registry reachable from CodeArtifact. Which
      package origin settings protect the internal name?
    a: Set Publish to ALLOW and Upstream to BLOCK. Upstream BLOCK prevents public ingestion and internal
      upstream retention for that package.
    trap: true
    facts:
      - origin-purpose
      - substitution-risk
      - publish-control
      - upstream-control
  - id: codeartifact-019
    q: A CodeArtifact package allows publishing, but its package group blocks publishing. Can a client
      publish a new version?
    a: No. BLOCK wins across package and package-group controls.
    trap: true
    facts:
      - block-precedence
  - id: codeartifact-020
    q: A CodeArtifact team must allow internal upstream dependencies while blocking public imports for a
      package group. Which restriction types separate those paths?
    a: Allow INTERNAL_UPSTREAM and block EXTERNAL_UPSTREAM. Package-level Upstream combines both paths,
      while package groups distinguish them.
    facts:
      - group-entry-types
      - upstream-control
  - id: codeartifact-021
    q: Do CodeArtifact first-version origin defaults apply unconditionally to every package?
    a: No. They depend on associated package-group restrictions. With every group restriction allowing
      entry, direct-first means Publish ALLOW / Upstream BLOCK, while public-first gives the
      reverse.
    trap: true
    facts:
      - direct-default
      - public-default
      - restricted-group-default
---

Package origin controls decide how new versions can enter a CodeArtifact repository. They reduce dependency substitution risk, where a public package with an internal package's name is consumed in its place.

### How it works

1. Set the package `publish` control to `ALLOW` or `BLOCK` for direct publishing by package tools.
2. Set `upstream` to `ALLOW` or `BLOCK` for both retaining versions from internal upstreams and importing public versions.
3. Check the associated package group, a set of packages matched by format, namespace (a prefix grouping related package names), and name patterns. Its restrictions can separately control direct publishing, public imports, and internal upstreams.
4. Evaluate both layers. A `BLOCK` at either layer defeats an `ALLOW` at the other.

| Package-group restriction | Entry path |
|---|---|
| `PUBLISH` | Direct publishing |
| `EXTERNAL_UPSTREAM` | Public registry import |
| `INTERNAL_UPSTREAM` | Internal upstream retention |

Each group restriction supports `ALLOW`, `BLOCK`, `ALLOW_SPECIFIC_REPOSITORIES`, or `INHERIT`. The last option takes its setting from a parent group.

### Exam cues

- If the question says a public package collides with an internal name, think Publish allow and Upstream block, because the package must remain locally published without importing a same-name version.
- If the question says package-level Allow still rejects a publish, think package-group restrictions, because a group Block takes precedence.
- If the question says keep internal upstreams but reject public packages, think separate group restrictions, because package-level Upstream covers both paths.

### Remember

- When every group restriction allows entry, first direct publication defaults to Publish allow / Upstream block; first public import defaults to Publish block / Upstream allow.
- A group with a Block or allow-specific-repositories restriction gives the package Allow / Allow defaults, leaving group restrictions effective.
- Older packages from before around May 2022 can retain Allow / Allow. New defaults began enforcement in July 2022.

> **Trap:** First-arrival defaults are conditional. Inspect both package and package-group controls before assuming a package is protected.
