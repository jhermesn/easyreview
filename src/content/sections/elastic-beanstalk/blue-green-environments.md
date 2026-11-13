---
title: Blue/green environments
level: associate
order: 40
facts:
  - id: blue-green
    text: Blue/green deploys and tests a new version in a separate environment, then swaps the environments' CNAME records.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html#using-features.CNAMESwap
  - id: incompatible
    text: An incompatible platform version update requires blue/green.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html#using-features.CNAMESwap
  - id: dns-cache
    text: Keep the old environment until DNS changes propagate and cached records expire; resolvers may retain records beyond their TTL.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html#using-features.CNAMESwap
  - id: external-db
    text: Blue/green requires an environment independent of its production database; use an external database or retain and decouple a coupled database.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html#using-features.CNAMESwap
  - id: clone-data
    text: Cloning does not copy RDS database contents.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: clone-unmanaged
    text: Cloning does not reproduce unmanaged resource changes.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: clone-managed
    text: Cloning reproduces Beanstalk-managed environment settings and resources.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: clone-branch
    text: Cloning can change platform versions only within the same platform branch.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: new-branch
    text: A different platform branch requires manually creating a new environment and adapting application code and settings as needed.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: clone-ingress
    text: Cloned environments do not carry over ingress security groups; reestablish the intended ingress rules.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.clone.html#using-features.managing.clone
  - id: termination-dependency
    text: References from another environment's security group to the retiring environment's group can prevent termination.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.terminating.html#using-features.terminating
  - id: dangling-dns
    text: Delete custom DNS records pointing to a terminated environment because its released CNAME can be reused.
    source: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.terminating.html#using-features.terminating
diagrams:
  - id: beanstalk-blue-green
    title: Environment URL swap with cached DNS
    width: 1060
    height: 360
    nodes:
      - id: client
        label: Client
        icon: res-client
        x: 20
        y: 120
        w: 180
        h: 72
        tone: user
      - id: dns
        label: DNS alias
        x: 350
        y: 120
        w: 180
        h: 86
        sub: environment URL
        tone: network
      - id: old
        label: Old environment
        icon: elastic-beanstalk
        x: 740
        y: 20
        w: 180
        h: 86
        sub: cached destination
        tone: compute
      - id: new
        label: New environment
        icon: elastic-beanstalk
        x: 740
        y: 240
        w: 180
        h: 86
        sub: tested release
        tone: compute
    edges:
      - from: client
        to: dns
        step: 1
      - from: dns
        to: new
        step: 2
        label: after swap
      - from: dns
        to: old
        step: 3
        label: cached record
        dashed: true
    steps:
      - Clients resolve the environment URL through DNS.
      - After testing the replacement, swap CNAMEs to direct the production name to it.
      - Keep the old environment available while cached records still direct clients there.
cards:
  - id: elastic-beanstalk-007
    q: How does Elastic Beanstalk blue/green deploy a version, and which lifecycle risks matter?
    a: Deploy and test in a separate environment, then swap environment URLs. Keep the database independent and retain the old environment until DNS caches expire.
    trap: true
    facts:
      - blue-green
      - external-db
      - dns-cache
  - id: elastic-beanstalk-017
    q: An Elastic Beanstalk team must move to an incompatible platform branch and test separately. What should it do?
    a: Create a new environment for the target branch, deploy and test, then swap environment URLs. Cloning only changes versions within the same branch.
    facts:
      - incompatible
      - blue-green
      - clone-branch
      - new-branch
  - id: elastic-beanstalk-018
    q: After an Elastic Beanstalk CNAME swap, some clients still reach the old environment. Why?
    a: DNS resolvers cache records and may retain them beyond their TTL. Keep the old environment until propagation and record expiration.
    trap: true
    facts:
      - dns-cache
  - id: elastic-beanstalk-046
    q: An Elastic Beanstalk clone lacks database data and manual resource changes. Is this unexpected?
    a: No. Cloning omits RDS contents and unmanaged changes. Reestablish the intended ingress security groups too.
    trap: true
    facts:
      - clone-data
      - clone-unmanaged
      - clone-managed
      - clone-ingress
  - id: elastic-beanstalk-047
    q: A retired Elastic Beanstalk environment still has a custom DNS alias. What must the team remove?
    a: Remove DNS records pointing to the terminated environment. Its released CNAME can be reused by another customer.
    facts:
      - dangling-dns
---
Elastic Beanstalk blue/green deployment tests a release in a separate environment before switching its public name. A CNAME is a DNS alias: swapping environment URLs changes where the environment names direct requests.

### How it works

1. Keep the production database independent of the environment. Use an external database, or retain and decouple a Beanstalk-created database before the change.
2. Clone the current environment or create a new one. Cloning stays within the same platform branch, the family of related platform versions. For an incompatible branch, create the target environment manually and adapt the code and settings.
3. Deploy and test the new version there. A clone omits RDS data and changes made outside Beanstalk. Reestablish ingress security groups, the rules controlling incoming traffic.
4. Choose **Swap environment URLs** to exchange the environments' CNAME records. Confirm the old production URL reaches the replacement.
5. Keep the old environment until DNS changes propagate and cached records expire. Before termination, remove dependencies that reference its security group. After termination, delete any custom DNS records still pointing to its released name.

### Exam cues

- If the question says an incompatible platform update needs separate testing, think a new environment and CNAME swap, because blue/green separates deployment from the traffic switch.
- If the question says the clone is missing database contents or manual resource edits, think cloning limits, because only managed configuration and resources are reproduced.
- If the question says clients still reach the old environment after swapping URLs, think cached DNS, because the swap does not invalidate resolver caches.

### Remember

- Clone within a platform branch; create an environment manually for a different branch.
- A clone does not copy RDS contents, unmanaged changes, or ingress security groups.
- TTL means time to live, the intended cache lifetime; some DNS resolvers retain old records longer.
- Blue/green needs a production database that survives independently.

> **Trap:** A completed CNAME swap is not permission to immediately terminate the old environment. Cached DNS can still send users there.
