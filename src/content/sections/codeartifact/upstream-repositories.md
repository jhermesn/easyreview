---
title: Upstream repositories
level: associate
order: 20
facts:
  - id: single-endpoint
    text: Upstream relationships let a client access packages in multiple CodeArtifact repositories
      through one repository endpoint.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repos-upstream.html#repos-upstream
  - id: direct-upstream-limit
    text: A CodeArtifact repository can have at most 10 direct upstream repositories.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repos-upstream.html#repos-upstream
  - id: external-limit
    text: A CodeArtifact repository can have one external connection to a public repository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repos-upstream.html#repos-upstream
  - id: search-limit
    text: CodeArtifact can search at most 25 repositories when resolving a package version through
      upstream relationships.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#repo-upstream-behavior
  - id: local-first
    text: A requested version already in the repository is returned locally; otherwise CodeArtifact
      searches its upstream repositories.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#repo-upstream-behavior
  - id: priority-stop
    text: Upstream priority follows the configured order, and searching stops when the requested version
      is found.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-search-order.html#repo-upstream-search-order
  - id: not-found
    text: If the requested version is absent from the repository and its upstreams, the client receives
      HTTP 404 Not Found.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#repo-upstream-behavior
  - id: downstream-retention
    text: A version fetched through upstreams is retained by reference in the requesting downstream
      repository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-upstream-repos
  - id: retention-isolation
    text: Deleting, disconnecting, or modifying the upstream version or repository does not alter the
      retained downstream version.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-upstream-repos
  - id: intermediate-retention
    text: A downstream request does not retain its fetched version in intermediate repositories in the
      upstream chain.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-intermediate-repositories
  - id: external-retention
    text: A version imported from a public registry is also retained in the repository that owns the
      external connection.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repo-upstream-behavior.html#package-retention-intermediate-repositories
  - id: upstream-permission
    text: Associating an upstream repository requires codeartifact:AssociateWithDownstreamRepository
      permission on that upstream.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/repos-upstream.html#repos-upstream
  - id: console-stores
    text: The console uses an appropriate -store repository with an external connection and adds that
      store as an upstream of the selected repository.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/external-connection.html#external-connection
  - id: ingestion-origin-control
    text: The Upstream origin control can block retention from internal upstreams and ingestion from
      public sources.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/package-origin-controls.html#package-origin-control-settings
diagrams:
  - id: codeartifact-upstream
    title: Resolve a dependency through upstream repositories
    width: 1000
    height: 300
    nodes:
      - id: client
        label: Build client
        icon: res-client
        x: 25
        y: 105
        w: 140
        h: 72
        tone: user
        info: A package manager requests a version from one CodeArtifact repository endpoint.
      - id: repo
        label: Team repository
        icon: codeartifact
        x: 275
        y: 105
        w: 160
        h: 72
        tone: devtools
        info: A missing version is searched for in upstream priority order. The requested downstream
          repository retains a reference to the returned version.
      - id: upstream
        label: Upstream repo
        sub: external connection
        icon: codeartifact
        x: 563
        y: 105
        w: 150
        h: 86
        tone: devtools
        info: The repository with the external connection retains imported public versions. A request
          through a longer chain does not retain the version in intermediate repositories.
      - id: public
        label: Public registry
        x: 825
        y: 105
        w: 130
        tone: integration
        info: The external connection imports packages from a public registry. A repository can have one
          external connection.
    edges:
      - from: client
        to: repo
        step: 1
        label: request
      - from: repo
        to: upstream
        step: 2
        label: search
      - from: upstream
        to: public
        step: 3
        label: fetch
    steps:
      - The package manager requests a version from its configured CodeArtifact repository.
      - If it is absent locally, CodeArtifact searches upstreams in configured priority order.
      - A repository with an external connection can import a missing public version if origin
        controls allow it; that repository and the requesting downstream retain it.
cards:
  - id: codeartifact-004
    q: How do CodeArtifact upstream repositories differ from external connections?
    a: Upstreams are CodeArtifact repositories exposed through one downstream endpoint. An external
      connection imports from a public registry. A repository supports up to 10 direct upstreams and
      one external connection.
    facts:
      - single-endpoint
      - direct-upstream-limit
      - external-limit
  - id: codeartifact-005
    q: A CodeArtifact client requests a public package through downstream A, intermediate B, and C with
      the external connection. Which repositories retain the fetched version?
    a: A and C. The request retains a reference in the requesting downstream and the repository with the
      external connection, but does not populate intermediate B.
    facts:
      - downstream-retention
      - intermediate-retention
      - external-retention
  - id: codeartifact-016
    q: A CodeArtifact upstream package is deleted after a team repository has already fetched it. Can
      the team repository still serve its retained version?
    a: Yes. Upstream deletion does not remove the retained downstream version.
    facts:
      - retention-isolation
  - id: codeartifact-017
    q: Two CodeArtifact upstreams contain the same requested package version. Which upstream supplies
      it?
    a: The first match in configured upstream priority order. Searching stops when the version is found.
    facts:
      - priority-stop
  - id: codeartifact-018
    q: Does the 10-upstream limit mean CodeArtifact can search only 10 repositories for a package
      version?
    a: No. It permits 10 direct upstreams and searches at most 25 repositories through the upstream
      graph.
    trap: true
    facts:
      - direct-upstream-limit
      - search-limit
---

Upstream repositories let a package manager fetch dependencies from several CodeArtifact repositories through one endpoint. An external connection adds a public package registry to that lookup path.

### How it works

1. Point the package manager, a tool that installs software packages and their dependencies, at the downstream repository endpoint.
2. CodeArtifact returns a version held locally. For a missing version, it searches upstream repositories in configured priority order and stops at the first match.
3. If an upstream owns an external connection, it can import a missing version from the public registry when origin controls permit it.
4. The requesting downstream retains a reference to the fetched version. A public import is also retained by the repository with the external connection. Intermediate repositories are not populated by that request.
5. The retained downstream version survives upstream deletion, disconnection, or edits. If no version is found, the request returns HTTP 404, meaning not found.

| Relationship | Source | Per-repository limit |
|---|---|---|
| Direct upstream | CodeArtifact repository | 10 |
| External connection | Public registry | 1 |
| Transitive lookup | Repositories reached through upstreams | 25 searched |

### Exam cues

- If the question says expose several dependency sources through one URL, think upstream repositories, because the client uses one downstream endpoint.
- If the question says deleting an upstream broke a retained version, think independent downstream retention, because the retained reference survives that deletion.
- If the question says connect several public registries, think separate store repositories used as upstreams, because each repository has only one external connection.

### Remember

- Upstream association needs `codeartifact:AssociateWithDownstreamRepository` on the upstream.
- The console adds the relevant `-store` repository as an upstream for public connections.
- Origin controls can block public ingestion or internal upstream retention.

> **Trap:** A lookup through an intermediate repository does not automatically retain the fetched version there. Retention occurs in the requesting downstream and, for public imports, the external-connection repository.
