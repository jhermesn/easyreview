# Diagrams

Diagrams are data in a section's front matter, rendered to SVG by `src/components/Diagram.astro`. Coordinates are in a `width` x `height` viewBox (default 800 x 420).

```yaml
diagrams:
  - id: unique-kebab-id
    title: What the diagram shows
    width: 800
    height: 420
    groups:   # optional dashed containers: accounts, regions, VPCs, Auto Scaling groups
      - { label: "Account A", x: 20, y: 20, w: 360, h: 380, tone: mgmt }
    nodes:
      - { id: pipe, label: CodePipeline, x: 40, y: 60, w: 150, h: 72, tone: devtools, icon: codepipeline, info: "Hover text. Supports `code` and **bold**." }
    edges:
      - { from: pipe, to: cfn, step: 1 }
    steps:   # step N explains the edge with step: N
      - "First thing that happens."
```

## Rules

- Tones: `compute`, `storage`, `network`, `security`, `mgmt`, `database`, `devtools`, `integration`, `user`, `neutral`.
- Keep `label` under 18 characters and `sub` under 26. Quote any value that contains a comma (`sub: "sessions, reads"`): in the one-line `{ ... }` form, YAML ends an unquoted value at the comma.
- Every AWS service or resource node gets `icon: <id>` from `src/data/aws-icons.json`: services such as `codedeploy` or `route-53`, resources such as `res-ec2-instance` or `res-client`, group frames such as `group-region` or `group-aws-account`. An icon node needs `h: 72` without `sub` and `h: 86` with it.
- A new icon must be copied into `public/aws-icons/`: download the official package from https://aws.amazon.com/architecture/icons/, unzip it outside the repository and run `node scripts/sync-aws-icons.mjs <package dir>`. The build fails on an icon that was not copied.
- Give edges a `step` and put the text in `steps`. Edge labels overlap the boxes in these layouts, so don't use them.
- Leave at least 40 px between boxes and keep every box inside its group and the viewBox. Nodes inside a group need about 30 px of top padding for the group label.
- Arrows are straight lines between box centres: place boxes so that no arrow passes through a third box.
- `npm run lint` reports overlaps, arrows crossing boxes, boxes outside the viewBox and steps without an edge. A finished section has none.

## Reference architectures

The `reference-architectures` unit draws, end to end, the designs an exam builds its scenario questions on. Single-service mechanics stay in their own units; a reference architecture shows how those services work together and why each one is there.

### Which scenarios a cert needs

A scenario is a design that a guide task asks the candidate to build or recognize, combining three or more services in one flow (for example, a pipeline in one account that deploys into others). Every guide task of that kind is covered by at least one scenario, and one scenario may cover several tasks. Each guide lists its scenarios in `scenarios` (see [certifications.md](certifications.md)), and every cert, foundational ones included, has a reference architecture for each.

### What a complete one contains

- **Level.** The section's `level` is the level of the lowest cert that uses it. When a deeper cert needs more, write a separate section at that level instead of adding deeper cards to the shared one.
- **Services.** Every service the scenario's guide items name, and every service in the request, data or deployment path, is a node.
- **Boundaries.** Every boundary that changes permissions or failure domains is a group: account, Region, VPC, Availability Zone, on premises.
- **Trust across boundaries.** Every permission that crosses a boundary is an edge with its own step: an assumed role, a bucket or key policy, a cross-account link, a delegated administrator. Mentioning it only in the body is not enough.
- **Failure paths.** Failover, rollback, remediation, retries and dead-letter queues that the exam asks about are drawn as `dashed: true` edges with their own steps.
- **Lifecycle.** Steps go from setup through normal operation to failure and recovery, one action per step.
- **Variants.** When the exam contrasts variants (Lambda or ECS, active-passive or active-active), draw each as its own diagram or compare them in a table.
- **Decisions.** The body has a table of every choice the exam asks about, with when each option fits. Each decision and each trap has a scenario card, and every claim a step makes is backed by a fact.
- **Mapping.** The section is mapped into every guide item it serves, in every cert at or above its level.

A complete design is usually 12 to 18 nodes and 7 to 12 steps. Fewer than that usually means a boundary, a trust edge or a failure path is missing.
