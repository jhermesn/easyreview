---
title: Image replication
level: professional
order: 50
facts:
  - id: replication-rules
    text: ECR private registry replication rules select destination Regions and accounts.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: destination-policy
    text: Cross-account replication requires a destination registry policy allowing the source
      ecr:ReplicateImage.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: repository-creation
    text: ecr:CreateRepository permits automatic destination repository creation; without it, matching
      destination repositories must already exist.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: source-policy
    text: The source configures replication rules and its configuring principal needs ECR permissions;
      no special source repository or registry replication policy is required.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: future-content
    text: Replication applies to content pushed or restored after configuration; preexisting images are
      not automatically copied.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: backfill
    text: Replication backfill copies existing images that match current replication rules to one
      selected destination per backfill.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication-backfill.html
  - id: backfill-date
    text: AWS documented replication backfill in October 2026.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/doc-history.html#doc-history
  - id: same-name
    text: ECR replication keeps the repository name unchanged.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: single-hop
    text: An ECR replication action occurs only once per image push or restore; replicated images do not
      trigger another replication hop.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: no-deletes
    text: ECR registry replication does not propagate deletion or archival actions.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: local-policies
    text: Repository and lifecycle policies are not replicated; repository creation templates can
      configure settings for newly created destination repositories.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: immutable-conflict
    text: If a destination immutable tag already exists, the replicated image arrives without that
      duplicate tag and may be untagged.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
  - id: repository-filter
    text: Replication rules can select repositories using a repository-name prefix.
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html#replication
diagrams:
  - id: ecr-replication-destination
    title: Destination permissions for cross-account replication
    width: 800
    height: 260
    groups:
      - label: Source account / Region
        x: 10
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
      - label: Target account / Region
        x: 440
        y: 10
        w: 350
        h: 240
        tone: mgmt
        icon: group-aws-account
    nodes:
      - id: source
        label: Source registry
        sub: Replication rules
        icon: elastic-container-registry
        x: 70
        y: 100
        w: 230
        h: 86
        tone: compute
        info: Rules select direct destinations and optional repository-name prefixes.
      - id: target
        label: Target registry
        sub: Registry policy
        icon: elastic-container-registry
        x: 500
        y: 100
        w: 230
        h: 86
        tone: compute
        info: Allow ReplicateImage and allow CreateRepository or precreate repositories with matching names.
    edges:
      - from: source
        to: target
        step: 1
        label: replicate
    steps:
      - ECR copies matching images into the destination with its registry permission; destination
        policies and retention are configured separately.
cards:
  - id: ecr-004
    q: How should a team configure ECR cross-account replication, including images that predate the
      rules?
    a: Set source registry replication rules. Allow ecr:ReplicateImage in the destination registry
      policy; allow ecr:CreateRepository or precreate matching repositories. Use backfill for
      preexisting images. Policies are not automatically replicated.
    trap: true
    facts:
      - replication-rules
      - destination-policy
      - repository-creation
      - backfill
      - local-policies
  - id: ecr-020
    q: A team grants ecr:ReplicateImage but not ecr:CreateRepository in an ECR destination registry. Can
      replication still work?
    a: Yes, if destination repositories with the same names already exist. CreateRepository is required
      for automatic creation, not for copying into existing repositories.
    trap: true
    facts:
      - repository-creation
      - same-name
  - id: ecr-021
    q: ECR replicates images from Region A to B and has another rule from B to C. Will a push in A reach
      C through B?
    a: No. Replication is one hop per push or restore. Configure C as a direct destination for A when it
      needs that image.
    trap: true
    facts:
      - single-hop
      - replication-rules
  - id: ecr-022
    q: An ECR source lifecycle policy deletes an image. Will registry replication delete the destination
      copy?
    a: No. Replication does not propagate deletions. Configure destination retention separately;
      lifecycle policies are not replicated.
    trap: true
    facts:
      - no-deletes
      - local-policies
  - id: ecr-023
    q: An ECR replication rule is enabled after a repository already contains images. How can the
      existing images be copied without repushing them?
    a: Start replication backfill for the configured destination. It includes existing images that match
      current replication rules.
    facts:
      - future-content
      - backfill
---
ECR replication copies container images between accounts or Regions using private registry rules. The source selects where images go; a destination account grants permission to receive them. A registry policy controls registry-level access, while a repository policy controls an individual repository.

### How it works

1. Configure source registry rules with destinations and optional repository-name prefixes. No special source repository or registry replication policy is required, but the configuring principal needs ECR permissions.
2. For another account, grant the source `ecr:ReplicateImage` in the destination registry policy. Also grant `ecr:CreateRepository`, or precreate destination repositories with matching names.
3. ECR copies newly pushed or restored content. Repository names remain unchanged. For older images, start replication backfill, which copies existing images matching the current rules to the selected destination.
4. Configure destination repository settings and retention. Policies do not copy automatically; repository creation templates can supply settings when ECR creates destination repositories.
5. Configure every required destination at the source. A replicated image does not trigger another replication hop. Deletes and archive actions do not propagate.

### Exam cues

- If the question says cross-account replication is denied, think destination registry policy, because that account must authorize incoming replication.
- If the question says image copies fail only when a destination repository is missing, think `ecr:CreateRepository` or precreation, because replication needs a repository with the same name.
- If the question says old images are absent after enabling replication, think backfill, because replication does not automatically copy preexisting images.

### Remember

- Each push or restore produces one replication hop.
- Backfill targets one destination per backfill; AWS documented it in October 2026.
- Policies, deletes and archive actions do not propagate automatically.

> **Trap:** A tag collision at an immutable destination does not necessarily stop the image copy. The image can arrive without the conflicting tag and be untagged.
