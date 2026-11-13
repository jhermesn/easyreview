---
title: Repository migration
level: associate
order: 50
facts:
  - id: migration-destination
    text: A Git repository can be migrated to CodeCommit by creating a destination repository, cloning the source locally, and pushing its contents to CodeCommit.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html
  - id: mirror-clone
    text: The documented migration procedure uses git clone --mirror to create a bare local copy for migration rather than daily development.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html#how-to-migrate-existing-clone
  - id: mirror-push
    text: Git push --mirror can push all references at once when migrating a repository to a new CodeCommit repository.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html#how-to-migrate-existing-clone
  - id: branch-push
    text: git push with --all pushes all branches but does not push other references such as tags.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html#how-to-migrate-existing-clone
  - id: tag-push
    text: After the initial branch push completes, git push with --tags transfers the tags to the destination.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html#how-to-migrate-existing-clone
  - id: normal-clone
    text: After migration, git clone without --mirror creates a local repository suitable for working with the CodeCommit repository.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-migrate-repository-existing.html#how-to-migrate-existing-clone
  - id: tag-reference
    text: A Git tag names a particular commit in a repository's history.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-basic-git.html#how-to-basic-git-tags
  - id: branch-reference
    text: A Git branch is a reference pointing to its latest commit.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-conditional-branch.html#how-to-conditional-branch-create-policy
  - id: remote-url
    text: A local Git repository connects to a remote repository through a configured URL.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-basic-git.html#how-to-basic-git-remotes
  - id: incremental-push
    text: Incremental migration pushes commits in chunks and can retry only chunks that did not succeed after an interruption.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-push-large-repositories.html
  - id: incremental-size
    text: AWS suggests considering incremental migration for a repository larger than 2 GB when migrating its entire contents, as well as for unreliable network connections.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-push-large-repositories.html#how-to-push-large-repositories-determine
  - id: regional-repository
    text: Each CodeCommit repository is associated with a Region and requires that Region's Git connection endpoint.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/regions.html#regions-git
  - id: cross-region-pattern
    text: The CodeCommit integration guide lists continuous replication from one AWS Region to another as a serverless integration pattern using Fargate.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/integrations.html#integrations-community
  - id: event-replication-pattern
    text: The CodeCommit integration guide also lists replication workflows using repository events, event rules, and Lambda.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/integrations.html#integrations-community
  - id: two-remotes
    text: A local Git repository can push changes to two remote repositories to keep an existing repository in use while trying CodeCommit.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-mirror-repo-pushes.html
  - id: two-push-urls
    text: When using git remote set-url --add --push to configure two push destinations, both destination URLs must be explicitly added because the first command replaces the default push URL.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-mirror-repo-pushes.html
  - id: push-order
    text: With the documented two-destination Git configuration, pushes run in destination order and failure at the first destination prevents the push to the second.
    source: https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-mirror-repo-pushes.html
diagrams:
  - id: codecommit-migration-transfer
    title: Transfer branches and tags before daily work
    width: 800
    height: 230
    nodes:
      - { id: source, label: Source repository, sub: Existing Git history, x: 20, y: 80, w: 190, h: 86, tone: neutral }
      - { id: local, label: Migration copy, sub: Bare local repository, icon: res-client, x: 310, y: 80, w: 180, h: 86, tone: user }
      - { id: destination, label: CodeCommit, sub: New repository, icon: codecommit, x: 590, y: 80, w: 180, h: 86, tone: devtools }
    edges:
      - { from: source, to: local, step: 1 }
      - { from: local, to: destination, step: 2 }
    steps:
      - Use git clone --mirror to create the migration copy from the source.
      - Push branches with --all, then tags with --tags. After migration, make a normal clone for daily work.
  - id: codecommit-regional-copy
    title: Cross-Region replication uses an integration workflow
    width: 800
    height: 240
    groups:
      - { label: Source Region, icon: group-region, x: 20, y: 20, w: 220, h: 200, tone: mgmt }
      - { label: Destination Region, icon: group-region, x: 560, y: 20, w: 220, h: 200, tone: mgmt }
    nodes:
      - { id: source, label: CodeCommit, sub: Source repository, icon: codecommit, x: 45, y: 95, w: 170, h: 86, tone: devtools }
      - { id: workflow, label: Replication, sub: Integration workflow, x: 310, y: 95, w: 180, h: 86, tone: integration, info: The integration guide lists event-driven Lambda and Fargate examples. }
      - { id: destination, label: CodeCommit, sub: Separate repository, icon: codecommit, x: 585, y: 95, w: 170, h: 86, tone: devtools }
    edges:
      - { from: source, to: workflow, step: 1 }
      - { from: workflow, to: destination, step: 2 }
    steps:
      - A replication integration processes changes from the source repository.
      - The workflow transfers changes to a repository using the destination Region's endpoint.
cards:
  - id: codecommit-010
    q: A team must move an existing Git repository to CodeCommit with all branches, tags and history. What are the steps?
    a: |-
      Create the destination CodeCommit repository and run `git clone --mirror <old-url>` for the migration copy.
      From that copy, run `git push <codecommit-url> --all`, wait for completion, then run `git push <codecommit-url> --tags`. The --all option sends branches, not tags.
      Use incremental pushes if needed for a large transfer, then make a normal clone from CodeCommit for daily work.
    trap: true
    facts: [migration-destination, mirror-clone, branch-push, tag-push, incremental-push, normal-clone]
  - id: codecommit-025
    q: What does git push --all transfer during a CodeCommit migration, and what needs another push?
    a: It transfers all branches. Tags need a separate push with --tags after the branch push completes.
    facts: [branch-push, tag-push]
  - id: codecommit-026
    q: A team is migrating an entire Git repository larger than 2 GB to CodeCommit over an unreliable connection. What approach reduces repeated work after failures?
    a: Use incremental migration. Push commits in chunks and retry the chunks that did not succeed after a failure.
    facts: [incremental-size, incremental-push]
  - id: codecommit-027
    q: A team needs ongoing copies of a CodeCommit repository in another AWS Region. What kind of solution does the CodeCommit integration guide describe?
    a: A replication integration workflow between regional repositories. The guide lists serverless Fargate and event-driven Lambda patterns; each repository uses its own Region's endpoint.
    facts: [cross-region-pattern, event-replication-pattern, regional-repository]
  - id: codecommit-028
    q: A team wants local Git pushes to reach both its current repository and CodeCommit during a transition. What configuration detail matters?
    a: Add both destination URLs explicitly with git remote set-url --add --push. The first such command replaces the default push URL. If the first destination fails, the second is not pushed to.
    trap: true
    facts: [two-remotes, two-push-urls, push-order]
  - id: codecommit-029
    q: A team has made a mirror clone of a Git repository and wants to push all its references to a new empty CodeCommit repository at once. Which Git option can it use?
    a: Use git push --mirror to push the references at once to the new empty repository. For large repositories, consider incremental migration.
    facts: [mirror-clone, mirror-push, incremental-push]
---
Repository migration transfers an existing Git repository into CodeCommit. The documented process creates a local migration copy, pushes its branches and tags, and then creates a separate working clone for developers.

### How it works

1. Create the destination CodeCommit repository and copy its clone URL, the address Git uses to connect. Use the Git endpoint for the repository's Region.
2. Run `git clone --mirror <source-url>` and enter the new directory. This creates a bare repository, the local copy used for transfer rather than daily editing.
3. Run `git push <destination-url> --all` to send every branch. A branch points to its latest commit in the repository's history.
4. Wait for the branch push to complete, then run `git push <destination-url> --tags`. A tag is a named reference to a point in the repository's history; `--all` does not send tags.
5. For a large transfer or unreliable connection, consider incremental migration, which sends chunks of commits and retries unsuccessful chunks. After migration, use `git clone <destination-url>` without `--mirror` for normal development.

For a new empty destination, `git push <destination-url> --mirror` is an alternative to separate branch and tag pushes. It pushes all references at once, including branches and tags.

Ongoing replication is a separate workflow that keeps another repository updated. The AWS integration guide lists continuous replication between Regions using Fargate and an event-driven Lambda replication example. Treat each regional copy as a separate repository with its own Git endpoint. The regional diagram shows that integration pattern.

During a transition, a local repository can also push to two remotes, which are repositories reached through configured Git URLs. Explicitly add both push URLs with `git remote set-url --add --push`; the first addition replaces the default push URL. Push order matters: if the first destination fails, Git does not push to the second.

### Exam cues

- If the question says move an existing Git repository's branches and tags to CodeCommit, think mirror clone followed by branch and tag pushes, because the branch push alone leaves tags behind.
- If the question says a large migration repeatedly fails on a poor connection, think incremental pushes, because only unsuccessful chunks need retrying.
- If the question says keep a repository copied into another Region, think an ongoing replication integration, because each CodeCommit repository has a regional endpoint.
- If the question says keep the current Git host while trying CodeCommit, think two configured push destinations, because one local repository can send changes to both.

### Remember

- Migration order: destination repository, mirror clone, `--all` push, `--tags` push, normal clone.
- `--all` sends branches; `--tags` sends tags.
- For a new empty destination, `--mirror` can push all references at once.
- AWS suggests considering incremental migration when transferring an entire repository larger than 2 GB or using an unreliable connection.
- With two push destinations, a failure at the first prevents the second push.

> **Trap:** A mirror clone does not make `git push --all` include tags. Push tags separately after the branch push.

> **Trap:** The bare mirror is a migration copy. Make a normal clone from CodeCommit for daily work.
