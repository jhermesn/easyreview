---
title: Build caching
level: associate
order: 60
facts:
  - id: cache-purpose
    text: CodeBuild caches reusable build components to avoid rebuilding or downloading them on later
      runs.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/build-caching.html
  - id: s3-cache
    text: An S3 cache is available across multiple build hosts.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-s3.html
  - id: cache-paths
    text: cache.paths selects files for S3 caching.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-s3.html
  - id: cache-key
    text: A cache key selects an immutable cache copy; changing the key creates a new cache.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-s3.html
  - id: cache-sharing
    text: Cross-project S3 cache sharing requires matching cacheNamespace, key, paths, bucket, and
      pathPrefix if set.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-s3.html#caching-s3-sharing
  - id: local-host
    text: A local cache is available only on the host where it is stored and is less useful for
      infrequent builds.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: source-cache
    text: Local source cache stores Git metadata so later downloads can retrieve changes between commits.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: docker-cache
    text: Local Docker layer cache reuses image layers and requires Linux and privileged mode.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: custom-cache
    text: Local custom cache stores buildspec-listed directories, not individual files.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: cache-collision
    text: Local custom cache links directories before source download; matching cache names can
      overwrite source directories.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
  - id: vpc-cache
    text: Local caching is unsupported for VPC builds.
    source: https://docs.aws.amazon.com/codebuild/latest/userguide/caching-local.html
diagrams: []
cards:
  - id: codebuild-012
    q: What distinguishes CodeBuild S3 caching from local caching, and can VPC builds use local cache?
    a: S3 cache is available across hosts. Local cache is available only on its host and is unsupported
      for VPC builds. Local Docker layer caching needs Linux and privileged mode.
    facts:
      - s3-cache
      - local-host
      - vpc-cache
      - docker-cache
    trap: true
  - id: codebuild-016
    q: What are the CodeBuild local cache modes?
    a: Source caches Git metadata; Docker layer caches image layers; custom caches buildspec-listed
      directories. Custom mode cannot cache individual files.
    facts:
      - source-cache
      - docker-cache
      - custom-cache
  - id: codebuild-036
    q: A CodeBuild VPC project needs reusable dependency downloads across build hosts. Which cache fits?
    a: Use an S3 cache. It is available across hosts; local caching is unsupported for VPC builds.
    facts:
      - s3-cache
      - vpc-cache
  - id: codebuild-037
    q: Two CodeBuild projects use an S3 cache key but do not share cached dependencies. Which settings
      must match?
    a: Match `cacheNamespace`, cache key, cache paths, S3 bucket, and `pathPrefix` if set.
    facts:
      - cache-sharing
---
CodeBuild caching reuses build components so later runs can avoid repeated work. A cache is stored data that a later build can reuse. Choose S3 caching for reuse across hosts or local caching for reuse on the same host.

### How it works

1. Select S3 or local caching on the project. S3 stores cached files in a bucket; local caching stores them on the build host.
2. Set `cache.paths` for S3 files or custom local directories. Local source and Docker modes cache their specific data.
3. For versioned S3 caches, select a `key`. Each key identifies an immutable cache copy; change the key to create another copy.
4. To share an S3 cache across projects, match `cacheNamespace`, key, paths, bucket, and `pathPrefix` if configured.

| Local mode | Cached content | Constraint |
|---|---|---|
| Source | Git metadata | Helps retrieve changes between commits. |
| Docker layer | Existing image layers | Requires Linux and privileged mode. |
| Custom | Listed directories | Individual files are unsupported. |

### Exam cues

- If the question says builds run on different hosts, think S3 cache, because a local cache is available only on its own host.
- If the question says a VPC build needs cached dependencies, think S3 cache, because VPC builds cannot use local caching.
- If the question says projects must reuse the same S3 cache, think matching namespace, key, paths, and S3 location, because those settings determine sharing.

### Remember

- Local caching is unsupported for VPC builds and is less useful for infrequent builds.
- Local Docker layer cache requires Linux and privileged mode.
- Local custom cache supports directories only.
- Matching local cache and source directory names can overwrite source contents.

> **Trap:** A local Docker layer cache is not shared storage. Another build host cannot use that host's cache.
