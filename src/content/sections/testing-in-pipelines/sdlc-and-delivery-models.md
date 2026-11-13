---
title: SDLC and delivery models
level: foundational
order: 10
facts:
  - id: lifecycle
    text: The software development lifecycle organizes work to design, build, release, and maintain
      software.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: phases
    text: Common SDLC phases are plan, design, implement, test, deploy, and maintain.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: testing-overlap
    text: Testing can run alongside implementation; production is the software environment customers use.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: waterfall
    text: Waterfall puts phases in sequence, with each phase depending on the previous result.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: iterative
    text: The iterative model begins with some requirements and improves the software through repeated
      versions.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: agile
    text: Agile uses short cycles and incremental changes with repeated evaluation of requirements and
      feedback.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: spiral
    text: Spiral combines repeated development cycles with sequential work and prioritizes risk analysis.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: devsecops
    text: DevSecOps integrates security testing throughout software development.
    source: https://aws.amazon.com/what-is/sdlc/
  - id: delivery
    text: Continuous delivery automatically builds, tests, and stages changes, leaving the production
      release decision to a person.
    source: https://aws.amazon.com/devops/continuous-delivery/
  - id: deployment
    text: Continuous deployment releases to production automatically after the pipeline checks, without
      explicit approval.
    source: https://aws.amazon.com/devops/continuous-delivery/
cards:
  - id: testing-in-pipelines-005
    q: What phases and models does the software development lifecycle use?
    a: Plan, design, implement, test, deploy, and maintain. Waterfall is sequential; iterative
      development improves versions; Agile uses short incremental cycles; Spiral emphasizes risk
      analysis. DevSecOps integrates security testing throughout.
    facts:
      - phases
      - waterfall
      - iterative
      - agile
      - spiral
      - devsecops
  - id: testing-in-pipelines-006
    q: How do continuous delivery and continuous deployment differ at the production release step?
    a: Continuous delivery keeps a tested release ready for a person to approve. Continuous deployment
      releases automatically after checks pass.
    facts:
      - delivery
      - deployment
  - id: testing-in-pipelines-013
    q: A team automatically builds, tests, and stages each change but requires a person to authorize
      production. Which delivery model is this?
    a: Continuous delivery, because the final production decision remains manual.
    facts:
      - delivery
  - id: testing-in-pipelines-014
    q: A project needs repeated prototypes and explicit risk analysis as requirements change. Which SDLC
      model fits?
    a: Spiral, because it combines repeated development cycles with risk analysis.
    facts:
      - spiral
  - id: testing-in-pipelines-015
    q: In an SDLC, must testing wait until all implementation has finished?
    a: No. Testing can run alongside implementation; DevSecOps also puts security testing throughout
      development.
    facts:
      - testing-overlap
      - devsecops
    trap: true
---
The software development lifecycle (SDLC) organizes the work from planning software through maintaining it. A delivery pipeline automates the build, test, and release steps within that lifecycle.

### How it works

1. Plan requirements and design the solution.
2. Implement the code and test its behavior. Testing can happen during implementation.
3. Deploy the release to its target environment. Production is the environment customers use.
4. Maintain the software by fixing problems and monitoring performance and security.

| Model | How work progresses |
|---|---|
| Waterfall | Sequential phases depend on previous results. |
| Iterative | Repeated versions expand an initial subset of requirements. |
| Agile | Short cycles deliver incremental changes and use feedback. |
| Spiral | Repeated cycles include risk analysis. |

DevSecOps means including security testing throughout development. Continuous delivery prepares tested changes for a human release decision. Continuous deployment makes that production release automatic.

### Exam cues

- If the question says every change reaches staging but production requires approval, think continuous delivery, because the final release decision is manual.
- If the question says passing changes reach production automatically, think continuous deployment, because no explicit approval remains.
- If the question says repeated prototypes with risk analysis, think Spiral, because risk analysis drives its cycles.

### Remember

- Common phases: plan, design, implement, test, deploy, maintain.
- Agile uses incremental changes and feedback.
- DevSecOps includes security testing throughout the lifecycle.

> **Trap:** Continuous delivery does not require every passing change to reach production automatically. That describes continuous deployment.
