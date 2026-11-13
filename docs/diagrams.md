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
- Keep `label` under 18 characters and `sub` under 26.
- Every AWS service or resource node gets `icon: <id>` from `src/data/aws-icons.json`: services such as `codedeploy` or `route-53`, resources such as `res-ec2-instance` or `res-client`, group frames such as `group-region` or `group-aws-account`. An icon node needs `h: 72` without `sub` and `h: 86` with it.
- A new icon must be copied into `public/aws-icons/`: download the official package from https://aws.amazon.com/architecture/icons/, unzip it outside the repository and run `node scripts/sync-aws-icons.mjs <package dir>`. The build fails on an icon that was not copied.
- Give edges a `step` and put the text in `steps`. Edge labels overlap the boxes in these layouts, so don't use them.
- Leave at least 40 px between boxes and keep every box inside its group and the viewBox. Nodes inside a group need about 30 px of top padding for the group label.
- Arrows are straight lines between box centres: place boxes so that no arrow passes through a third box.
- `npm run lint` reports overlaps, arrows crossing boxes, boxes outside the viewBox and steps without an edge. A finished section has none.
