---
title: Rollback and schema compatibility
level: professional
order: 40
facts:
  - id: cd-redeploy
    text: CodeDeploy rollback redeploys a previous revision as a new deployment with a new deployment ID.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html
  - id: script-effects
    text: CodeDeploy does not automatically revert actions performed by scripts in a previous deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html
  - id: rolling-redeploy
    text: After a failed Beanstalk rolling application deployment, deploy a fixed or known good version;
      completed batches can be on the new version while pending batches remain old.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-rollingdeployments-method
  - id: immutable-abort
    text: A failed Beanstalk immutable application deployment is reversed by terminating its new Auto
      Scaling group.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environmentmgmt-updates-immutable.html
  - id: traffic-abort
    text: Aborting or failing Beanstalk traffic splitting moves traffic back to the original instances
      and terminates the new instances.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html#environments-cfg-trafficsplitting-method
  - id: blue-green-dns
    text: Beanstalk blue/green swaps environment CNAME records; retain the old environment until DNS
      changes propagate and cached records expire.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html
  - id: data-both
    text: Blue and green applications need current data both for serving new traffic and for rollback to
      the old application.
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html
  - id: schema-first
    text: If a shared database schema changes before code, the schema must remain compatible with the
      old application.
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html#decoupling-schema-changes-from-code-changes
  - id: code-first
    text: If application code changes before the shared schema, the new code must remain compatible with
      the old schema.
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html#decoupling-schema-changes-from-code-changes
  - id: additive
    text: Adding fields and entities before code deployment can preserve compatibility, provided
      application code tolerates additional fields.
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html#decoupling-schema-changes-from-code-changes
  - id: destructive
    text: Removing database fields after code deployment can make the earlier application version
      unusable.
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html#decoupling-schema-changes-from-code-changes
  - id: refresh-window
    text: An instance refresh can be rolled back while in progress; after completion another refresh is
      required.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html
cards:
  - id: deployment-strategies-003
    q: How do rollback mechanisms differ between Beanstalk rolling application deployment, immutable
      deployment, and traffic splitting?
    a: Rolling needs another deployment of a fixed or known good version. A failed immutable deployment
      terminates its new Auto Scaling group. Traffic splitting can return traffic to the old
      instances and terminate the new ones during deployment.
    facts:
      - rolling-redeploy
      - immutable-abort
      - traffic-abort
  - id: deployment-strategies-005
    q: A CodeDeploy lifecycle script changes a database schema. Does redeploying the prior application
      revision automatically reverse that script action?
    a: No. CodeDeploy does not automatically reverse previous script actions. Keep shared schema changes
      compatible with the application version that rollback would restore.
    trap: true
    facts:
      - script-effects
      - schema-first
  - id: deployment-strategies-007
    q: A team changes a shared database schema before a blue/green code release. What keeps rollback to
      old code viable?
    a: The new schema must remain compatible with the old application. Additive changes can help if old
      code tolerates extra fields; removing required fields can make the old version unusable.
    facts:
      - schema-first
      - additive
      - destructive
  - id: deployment-strategies-021
    q: A team deploys new application code before changing its shared database schema. What
      compatibility must it preserve?
    a: The new code must work with the old schema until the database change is applied.
    facts:
      - code-first
  - id: deployment-strategies-022
    q: A Beanstalk team has swapped blue/green environment URLs. Can it immediately terminate old blue?
    a: No. Retain it until DNS changes propagate and cached records expire. Some clients can still
      resolve the old environment.
    trap: true
    facts:
      - blue-green-dns
  - id: deployment-strategies-023
    q: Does a CodeDeploy rollback restore the original deployment ID?
    a: No. It creates a new deployment of an earlier application revision, with a new deployment ID.
    facts:
      - cd-redeploy
  - id: deployment-strategies-024
    q: An Auto Scaling instance refresh has completed and the team discovers a problem. Can it invoke
      rollback on that completed refresh?
    a: No. Rollback applies while the refresh is in progress. Start another refresh to apply the
      required configuration after completion.
    trap: true
    facts:
      - refresh-window
---

Rollback restores an earlier application revision or returns traffic to a retained version. Its mechanism depends on the deployment platform. A database schema is the structure of tables and fields; [AWS schema guidance](https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/best-practices-for-managing-data-synchronization-and-schema-changes.html#decoupling-schema-changes-from-code-changes) explains why that structure must remain compatible with both application versions during a shared-database release.

### How it works

1. Identify what recovery actually changes. CodeDeploy creates a new deployment of a previous revision. It does not automatically reverse actions that earlier lifecycle scripts performed.
2. For a failed Beanstalk rolling application deployment, deploy a fixed or known good version. Some completed batches can already run the new version. A failed immutable deployment terminates its new group; traffic splitting can return requests to the original instances before terminating the new group.
3. With Beanstalk blue/green, keep old blue available until DNS changes propagate and cached records expire. A CNAME is a DNS alias record; swapping the environment aliases redirects requests as clients resolve them.
4. Separate shared database schema changes from code changes. If schema goes first, old code must work with it. If code goes first, new code must work with the old schema.
5. Add fields while preserving compatibility, then remove obsolete fields only when earlier application versions are no longer needed. Additive changes still require code that tolerates extra fields. Both environments need current data for a usable rollback.

### Exam cues

- If the question says redeploying old code must undo a database migration script, think separate handling of script effects, because CodeDeploy does not automatically reverse them.
- If the question says old and new applications share one database, think backward compatibility, meaning old code can still use the changed data structure.
- If the question says immediate cleanup after a Beanstalk CNAME swap, think DNS propagation and cache expiry, because some clients can still use the old destination.

### Remember

- CodeDeploy rollback is a new deployment with a new ID.
- Beanstalk rolling application failure can leave mixed application versions until another deployment.
- Removing a required database field can make rollback to old code unusable.
- An instance refresh can roll back only while it is in progress; a completed refresh needs another refresh.

> **Trap:** Returning traffic to old application code does not make incompatible database fields reappear. Preserve compatibility with the retained version before depending on traffic rollback.
