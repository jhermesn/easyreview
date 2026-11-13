---
title: Development and resource management commands
level: professional
order: 90
facts:
  - id: hotswap
    text: cdk deploy --hotswap updates supported resources through service APIs using current
      credentials rather than bootstrap roles.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: drift
    text: Hotswap deliberately introduces CloudFormation drift and is for development only.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: reconcile
    text: cdk deploy --revert-drift reconciles drift through a drift-aware change set.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: ignore
    text: --hotswap ignores changes that it cannot apply directly.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: fallback
    text: --hotswap-fallback performs a full CloudFormation deployment when changes require it.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: watch
    text: cdk watch monitors local changes and automatically deploys.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-watch.html
  - id: watch-default
    text: cdk watch uses hotswap by default.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-watch.html
  - id: import
    text: cdk import uses CloudFormation resource import to bring existing resources into a CDK stack.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: detect-drift
    text: cdk drift detects configuration drift.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: refactor
    text: cdk refactor preserves deployed resources during code refactoring.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: orphan
    text: cdk orphan detaches resources without deleting them.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: diff
    text: cdk diff compares infrastructure changes.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd.html#ref-cli-cmd-commands
  - id: rollback
    text: --no-rollback leaves changes in place after a deployment failure.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: replacement
    text: Deployments using --no-rollback cannot replace resources.
    source: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy-options
  - id: retain
    text: RemovalPolicy.RETAIN leaves the resource outside stack management when the stack is destroyed;
      the resource must be managed or deleted separately.
    source: https://docs.aws.amazon.com/cdk/v2/guide/resources.html#resources-removal
  - id: destroy
    text: RemovalPolicy.DESTROY requests deletion of the resource when its stack is destroyed.
    source: https://docs.aws.amazon.com/cdk/v2/guide/resources.html#resources-removal
  - id: removal-default
    text: The CDK resource guide describes RETAIN as the default for persistent data resources, but
      other resource types can have different removal defaults.
    source: https://docs.aws.amazon.com/cdk/v2/guide/resources.html#resources-removal
  - id: bucket
    text: CloudFormation cannot delete a nonempty S3 bucket with DESTROY alone.
    source: https://docs.aws.amazon.com/cdk/v2/guide/resources.html#resources-removal
  - id: empty-bucket
    text: "autoDeleteObjects: true makes CDK delete a bucket's objects before destroying the bucket."
    source: https://docs.aws.amazon.com/cdk/v2/guide/resources.html#resources-removal
cards:
  - id: cdk-021
    q: What do AWS CDK hotswap and watch do, and how should a team reconcile hotswap changes?
    a: They speed development by updating supported resources directly; watch uses hotswap by default.
      Hotswap uses current credentials and causes drift. Reconcile with cdk deploy --revert-drift.
    trap: true
    facts:
      - hotswap
      - drift
      - reconcile
      - watch
      - watch-default
  - id: cdk-023
    q: Which AWS CDK commands handle existing resources, drift, code moves and detaching resources?
    a: cdk import adopts existing resources; cdk drift detects drift; cdk refactor preserves deployed
      resources during code changes; cdk orphan detaches without deleting; cdk diff compares
      changes.
    facts:
      - import
      - detect-drift
      - refactor
      - orphan
      - diff
  - id: cdk-042
    q: An AWS CDK team must preserve a data resource when destroying its stack. Which removal policy
      fits?
    a: RemovalPolicy.RETAIN. The resource remains but leaves the destroyed stack's management.
    facts:
      - retain
  - id: cdk-043
    q: An AWS CDK development bucket uses RemovalPolicy.DESTROY but stack deletion fails because the
      bucket contains objects. What setting is missing?
    a: "autoDeleteObjects: true, which deletes the bucket's files before CloudFormation removes the
      bucket. Use it only when deleting those objects is intended."
    trap: true
    facts:
      - destroy
      - bucket
      - empty-bucket
  - id: cdk-044
    q: An AWS CDK deployment with --no-rollback needs to replace a resource. Can it succeed with that
      option?
    a: No. --no-rollback deployments that require replacement fail.
    trap: true
    facts:
      - rollback
      - replacement
  - id: cdk-045
    q: What happens to unsupported changes during AWS CDK --hotswap, and how does --hotswap-fallback
      differ?
    a: --hotswap ignores unsupported changes. --hotswap-fallback performs a full CloudFormation
      deployment when required.
    facts:
      - ignore
      - fallback
---
CDK development commands shorten the edit and deploy cycle or manage resources already in an account. Drift means a deployed resource differs from the configuration CloudFormation records for it.

### How it works

1. Use `cdk diff` to inspect proposed changes. Use `cdk import` to adopt existing resources into a stack.
2. During development, use `--hotswap` for supported direct service updates or `cdk watch` to deploy on local changes. Hotswap uses current credentials and introduces drift.
3. Reconcile hotswap drift with `cdk deploy --revert-drift`. Choose `--hotswap-fallback` when unsupported changes should trigger a full deployment.
4. Set a removal policy before destroying a stack. `RETAIN` keeps the resource outside the stack; `DESTROY` requests deletion.

| Command | Purpose |
|---|---|
| `cdk drift` | Detect deployed configuration drift |
| `cdk refactor` | Preserve deployed resources during code refactoring |
| `cdk orphan` | Detach resources without deleting them |
| `cdk watch` | Deploy on local changes; hotswap by default |

### Exam cues

- If the question says a development update should skip CloudFormation, think hotswap, because it calls service APIs directly and causes drift.
- If the question says data must survive stack destruction, think `RemovalPolicy.RETAIN`, because the resource remains outside stack management.
- If the question says a disposable bucket must be deleted with its contents, think `DESTROY` plus `autoDeleteObjects: true`, because CloudFormation cannot delete a nonempty bucket.

### Remember

- Hotswap is for development only and does not assume bootstrap roles.
- `--hotswap` ignores unsupported changes; `--hotswap-fallback` falls back to CloudFormation.
- `--no-rollback` leaves changes after failure and cannot replace resources.
- Persistent data resources commonly default to `RETAIN`; check each resource's documented default.

> **Trap:** `DESTROY` alone does not empty an S3 bucket. Also, retaining a resource preserves it outside the destroyed stack, not inside a stack that still manages it.
