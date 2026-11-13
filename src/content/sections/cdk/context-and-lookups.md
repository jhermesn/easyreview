---
title: Context and lookups
level: associate
order: 70
facts:
  - id: context
    text: CDK context consists of key-value pairs associated with apps, stacks or constructs.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: context-types
    text: CDK context includes cached environment values, feature flags and application settings.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: cache
    text: cdk.context.json caches environment lookups such as Availability Zones and AMI IDs so external
      changes do not silently alter synthesis.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: missing
    text: When context is missing, the CLI queries the AWS account, stores the result in
      cdk.context.json and runs the app again.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html#context-methods
  - id: commit
    text: Commit cdk.json and cdk.context.json with application source so CI uses the same project
      context.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html#context-construct
  - id: reset
    text: cdk context --reset <key-or-number> removes a cached context entry.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html#context-viewing
  - id: refresh
    text: The next synthesis refreshes a reset cached context entry.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html#context-viewing
  - id: settings
    text: Keep noncached application context under the context key in cdk.json.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: managed-cache
    text: Do not manually edit cached context lookup values.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: ami
    text: Without context caching, a new latest AMI can cause instance replacement on a later deployment.
    source: https://docs.aws.amazon.com/cdk/v2/guide/context.html
  - id: lookup
    text: The bootstrap LookupRole provides read-only permissions for environment lookups.
    source: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html#bootstrapping-env-default
diagrams:
  - id: cdk-context-lookup
    title: Filling a missing context value
    width: 1000
    height: 160
    nodes:
      - id: app
        label: App lookup
        icon: cloud-development-kit
        tone: devtools
        x: 30
        y: 45
        w: 180
        h: 72
      - id: query
        label: Lookup role
        icon: res-identity-access-management-role
        tone: security
        x: 410
        y: 45
        w: 180
        h: 72
      - id: cache
        label: Context cache
        icon: res-documents
        tone: user
        x: 790
        y: 45
        w: 180
        h: 72
    edges:
      - from: app
        to: query
        step: 1
        label: missing value
      - from: query
        to: cache
        step: 2
        label: save result
    steps:
      - The CLI queries the environment when a required context value is missing.
      - The CLI saves the result in cdk.context.json, then runs the app again with that context.
cards:
  - id: cdk-017
    q: Why should an AWS CDK team commit cdk.context.json to source control?
    a: It freezes environment lookups such as AMI IDs for repeatable synthesis in CI. Refresh
      intentionally with cdk context --reset <key-or-number>, then synthesize again.
    trap: true
    facts:
      - cache
      - commit
      - reset
      - refresh
  - id: cdk-037
    q: An AWS CDK team wants to adopt a newer AMI deliberately without refreshing every cached lookup.
      What should it do?
    a: Reset only the AMI lookup entry with cdk context --reset <key-or-number>, then synthesize to
      refresh that entry.
    facts:
      - reset
      - refresh
      - cache
  - id: cdk-038
    q: An AWS CDK application setting must survive clearing cached lookups. Where should the team store
      it?
    a: Under the context key in cdk.json. Keep cached lookup values managed by the CLI in
      cdk.context.json.
    facts:
      - settings
      - managed-cache
  - id: cdk-039
    q: What happens when an AWS CDK app requests a context lookup that is not cached?
    a: The CLI queries the account, saves the result in cdk.context.json and runs the app again.
    facts:
      - missing
---
CDK context stores settings and environment lookup results used during synthesis. Its cache freezes values such as an Amazon Machine Image (AMI), an EC2 launch image, so a changed external value does not silently change the template.

### How it works

1. A construct requests an environment value such as an AMI ID or an Availability Zone.
2. If the cache lacks the value, the CLI queries AWS with read-only lookup permissions, saves the result in `cdk.context.json` and runs the app again.
3. Commit `cdk.json` and `cdk.context.json` so CI uses the same context.
4. Refresh an entry deliberately with `cdk context --reset <key-or-number>`; the next synthesis fetches it again.

### Exam cues

- If the question says a later deployment unexpectedly replaces instances after a new AMI appears, think cached context, because uncached latest-image lookups can change the template.
- If the question says an app setting must survive cache clearing, think the `context` key in `cdk.json`, because cached lookup data belongs in a separate file.

### Remember

- `LookupRole` provides read-only lookup access.
- `cdk context --reset` accepts an entry key or number.
- Context includes feature flags and app settings as well as cached lookups.

> **Trap:** Deleting cached context to make CI succeed can change the generated template. Refresh specific values deliberately.
