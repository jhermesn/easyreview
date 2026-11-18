---
title: "PLACEHOLDER storage-gateway/operations-in-depth"
level: professional
order: 30
facts:
  - id: notify-scope
    text: NotifyWhenUploaded requests an EventBridge notification after all files written to a file
      share up to the request time have uploaded to S3.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: notify-async
    text: NotifyWhenUploaded returns a NotificationId and does not wait synchronously for file upload
      completion.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: notify-targets
    text: EventBridge can route the upload completion notification to targets such as SNS or Lambda.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: refresh-inventory
    text: RefreshCache updates the cached inventory of S3 objects after changes outside the gateway; it
      does not import file contents into local cache storage.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/refresh-cache.html
  - id: ttl-refresh
    text: TTL-based cache refresh runs when a directory is accessed after its time to live has expired;
      it is non-recursive and blocks that directory access while refreshing.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/refresh-cache.html
  - id: upload-notification
    text: NotificationPolicy requests individual file upload notifications, whereas NotifyWhenUploaded
      tracks a working file set.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/monitoring-file-gateway.html#get-notification
  - id: cached-limit
    text: Cached volumes support 1 GiB to 32 TiB per volume and up to 32 volumes per gateway.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html#storage-gateway-cached-concepts
  - id: stored-limit
    text: Stored volumes support 1 GiB to 16 TiB per volume and up to 32 volumes per gateway.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html#storage-gateway-stored-volume-concepts
cards:
  - id: storage-gateway-005
    q: A workflow must run only after an AWS S3 File Gateway working file set reaches S3. What should it
      use?
    a: Call NotifyWhenUploaded after writing the file set and handle the later EventBridge completion
      notification. The API response itself is not upload completion.
    facts:
      - notify-scope
      - notify-async
      - notify-targets
  - id: storage-gateway-006
    q: An application writes objects directly into the S3 bucket backing an S3 File Gateway share. How
      should the gateway discover those changes?
    a: Refresh the cached inventory with RefreshCache, or configure TTL-based refresh for directory
      access. Refreshing inventory does not preload file contents.
    facts:
      - refresh-inventory
      - ttl-refresh
  - id: storage-gateway-007
    q: Does AWS S3 File Gateway TTL-based cache refresh scan every directory periodically?
    a: No. It refreshes only the directory accessed after its TTL expires, without recursively
      refreshing subdirectories. Access waits for the refresh.
    trap: true
    facts:
      - ttl-refresh
  - id: storage-gateway-008
    q: How do NotificationPolicy and NotifyWhenUploaded differ in AWS S3 File Gateway?
    a: NotificationPolicy requests a notification for each completed file upload. NotifyWhenUploaded
      requests completion for all files written to the share up to the request time.
    facts:
      - upload-notification
      - notify-scope
  - id: storage-gateway-014
    q: What are the per-volume size ranges for AWS Volume Gateway cached and stored volumes?
    a: "Cached: 1 GiB to 32 TiB. Stored: 1 GiB to 16 TiB. Each mode supports up to 32 volumes per
      gateway."
    facts:
      - cached-limit
      - stored-limit
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
