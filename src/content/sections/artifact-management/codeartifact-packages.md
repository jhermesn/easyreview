---
title: CodeArtifact packages
level: foundational
order: 5
facts:
  - id: packages
    text: AWS CodeArtifact stores software packages and works with package managers such as npm and pip.
    source: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
cards:
  - id: artifact-management-010
    q: What does AWS CodeArtifact store for developers using package managers such as npm or pip?
    a: Software packages.
    facts: [packages]
---
AWS CodeArtifact stores software packages used in application development.

### How it works

1. Store software packages in CodeArtifact.
2. Use a supported package manager to work with them.

### Exam cues

- If the question says store packages for a package manager, think CodeArtifact, because it provides a package repository.

### Remember

- CodeArtifact works with package managers such as npm and pip.

> **Trap:** CodeArtifact stores software packages; a package manager accesses them.
