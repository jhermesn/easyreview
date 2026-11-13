---
title: Cross-account DNS sharing
level: professional
order: 80
facts:
  - id: ram
    text: Resolver forwarding rules can be shared with accounts through AWS Resource Access Manager (RAM).
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: associate-rule
    text: A recipient associates a shared Resolver rule with its VPCs to use it.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: read-only
    text: A recipient cannot change or delete a shared Resolver rule.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: regional
    text: Resolver rules and their VPC associations are Regional resources.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: authorize
    text: For direct cross-account private-zone association, the zone owner calls CreateVPCAssociationAuthorization for each VPC.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html#hosted-zone-private-associate-vpcs-different-accounts
  - id: associate-zone
    text: After authorization, the VPC owner calls AssociateVPCWithHostedZone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html#hosted-zone-private-associate-vpcs-different-accounts
  - id: no-console
    text: The Route 53 console cannot authorize or create this direct cross-account private-zone association.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html#hosted-zone-private-associate-vpcs-different-accounts
  - id: delete-auth
    text: Deleting the authorization after association does not remove the existing association.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html#hosted-zone-private-associate-vpcs-different-accounts
  - id: flags
    text: The VPC must have enableDnsSupport and enableDnsHostnames set to true for private-zone resolution.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
cards:
  - id: route53-024
    q: A central account owns Route 53 Resolver forwarding rules. How can other accounts reuse them?
    a: Share the rules through AWS RAM, then associate the shared rules with recipient VPCs in the Region. Recipients cannot edit or delete them.
    facts:
      - ram
      - associate-rule
      - regional
      - read-only
  - id: route53-025
    q: How does a team directly associate a Route 53 private hosted zone with a VPC owned by another account?
    a: The zone owner calls CreateVPCAssociationAuthorization for the VPC, then the VPC owner calls AssociateVPCWithHostedZone. Use API, CLI or SDK rather than the console, and enable both VPC DNS attributes.
    facts:
      - authorize
      - associate-zone
      - no-console
      - flags
  - id: route53-047
    q: A Route 53 zone owner deletes a cross-account VPC association authorization after the VPC has been associated. Is DNS access removed?
    a: No. Removing the authorization does not remove the existing association.
    facts:
      - delete-auth
    trap: true
diagrams:
  - id: route53-cross-account-association
    title: Direct private-zone association across accounts
    width: 840
    height: 180
    nodes:
      - id: zone
        label: Zone owner
        icon: route-53
        sub: authorize each VPC
        x: 20
        y: 50
        w: 220
        h: 86
        tone: network
      - id: vpc
        label: VPC owner
        icon: group-virtual-private-cloud-vpc
        sub: associate VPC
        x: 310
        y: 50
        w: 220
        h: 86
        tone: network
      - id: result
        label: Private DNS
        icon: route-53
        sub: zone resolves in VPC
        x: 600
        y: 50
        w: 220
        h: 86
        tone: network
    edges:
      - from: zone
        to: vpc
        step: 1
      - from: vpc
        to: result
        step: 2
    steps:
      - The zone owner creates a VPC association authorization.
      - The VPC owner completes the association; later authorization deletion leaves it intact.
---
Cross-account DNS can reuse central forwarding rules or let another account's VPC resolve a private hosted zone. These are separate operations: a shared rule forwards queries, while a zone association makes private records available to a VPC.

### How it works

1. To reuse forwarding, share the Resolver rule through AWS Resource Access Manager (RAM), the service for sharing supported AWS resources between accounts.
2. The recipient associates the rule with its VPCs in the Region. It can use the rule but cannot edit or delete it.
3. For a direct private-zone association, the zone owner authorizes each VPC with CreateVPCAssociationAuthorization.
4. The VPC owner calls AssociateVPCWithHostedZone. This direct cross-account workflow uses an API, CLI or SDK, because the console cannot perform it.
5. After association, delete the authorization if it is no longer needed. The association remains. Set both VPC DNS attributes to true.

### Exam cues

- If the question says many accounts need the same forwarding domain, think share the Resolver rule through RAM, because each recipient can associate it with its VPCs.
- If the question says a VPC in another account needs records in a private zone, think authorize then associate, because the zone owner and VPC owner each perform a step.

### Remember

- Shared Resolver rules are Regional.
- Create one direct zone-association authorization per VPC.
- Deleting an authorization does not delete its completed association.

> **Trap:** Sharing a forwarding rule does not directly associate a VPC with a private hosted zone.
