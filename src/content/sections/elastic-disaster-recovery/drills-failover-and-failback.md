---
title: Drills, failover, and failback
level: professional
order: 20
facts:
  - id: drill
    text: DRS recovery drills do not disrupt source servers or their ongoing replication.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: application-test
    text: AWS recommends testing complete applications, recording launch order and dependencies, and including failback in drills.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: cleanup
    text: Running drill instances incur EC2 charges and should be terminated after the drill.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: readiness
    text: Before recovery, DRS guidance checks Ready for recovery, Healthy replication, and evidence of a successful drill launch.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-preparing-failover.html
  - id: point
    text: A recovery launch can use Use most recent data or a selected earlier point-in-time snapshot.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-preparing-failover.html
  - id: failover
    text: DRS launches recovery instances, but production traffic redirection is performed outside DRS.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-preparing-failover.html
  - id: validate
    text: AWS guidance validates recovered applications and dependencies before redirecting production traffic.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: failback
    text: Failback redirects traffic from recovery systems to primary systems and is performed outside DRS.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-performing-main.html
  - id: reverse
    text: Data written during recovery operation must be replicated back before redirecting users to the primary systems.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-performing-main.html
  - id: client
    text: For on-premises failback, boot the Failback Client on the destination server to receive data from its recovery instance.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-performing.html
  - id: architecture
    text: The Failback Client supports x86_64 servers; arm64 failback is supported within AWS, not to on-premises or another cloud.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-performing-main.html
  - id: capacity
    text: On-premises failback destination volumes must be equal to or larger than the recovery instance volumes.
    source: https://docs.aws.amazon.com/drs/latest/userguide/failback-performing.html
  - id: restart
    text: After failback, confirm the primary servers are replicating to AWS again.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
  - id: disconnect
    text: Disconnect from AWS removes source replication resources, including point-in-time recovery points.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
diagrams:
  - id: drs-failback
    title: Return recovery-site writes before switching traffic
    width: 800
    height: 180
    nodes:
      - id: recovery
        label: Recovery instance
        icon: res-ec2-instance
        tone: compute
        x: 30
        y: 45
        w: 200
        h: 86
      - id: primary
        label: Primary server
        icon: res-server
        tone: compute
        x: 300
        y: 45
        w: 200
        h: 86
      - id: routing
        label: Traffic routing
        icon: route-53
        tone: network
        x: 570
        y: 45
        w: 200
        h: 86
    edges:
      - from: recovery
        to: primary
        step: 1
      - from: primary
        to: routing
        step: 2
    steps:
      - Replicate recovery-site changes back and validate the restored primary system.
      - Redirect users to the primary system outside DRS.
cards:
  - id: elastic-disaster-recovery-004
    q: What do an AWS Elastic Disaster Recovery drill, failover, and failback each do?
    a: A drill tests recovery without disrupting source replication. Failover redirects traffic to recovery systems. Failback redirects traffic to restored primary systems after reverse replication. Traffic routing happens outside DRS.
    facts:
      - drill
      - failover
      - failback
      - reverse
  - id: elastic-disaster-recovery-005
    q: AWS DRS has launched recovery instances successfully, but users still reach the failed site. What step remains?
    a: Redirect production traffic outside DRS, after application validation. Launching recovery instances does not change traffic routing.
    trap: true
    facts:
      - failover
      - validate
  - id: elastic-disaster-recovery-009
    q: A team uses AWS DRS recovery instances for several days, then plans to redirect users to its repaired primary site. What must happen first?
    a: Replicate new recovery-site data back to the primary systems and validate the restored application before traffic redirection.
    facts:
      - reverse
      - validate
      - failback
  - id: elastic-disaster-recovery-010
    q: An AWS DRS drill boots each server successfully. Is this sufficient evidence that the application can recover?
    a: No. Test the application as a whole, including dependencies and launch order, and rehearse failback.
    trap: true
    facts:
      - application-test
  - id: elastic-disaster-recovery-011
    q: How does AWS Elastic Disaster Recovery begin failback to an on-premises x86_64 server?
    a: Boot the Failback Client on the destination server so it receives recovery-instance data. Destination volumes must be large enough.
    facts:
      - client
      - capacity
      - architecture
  - id: elastic-disaster-recovery-012
    q: After an AWS DRS failover, should operators immediately use Disconnect from AWS on the original source server?
    a: No. Disconnect removes replication resources and point-in-time recovery points that may still be needed.
    trap: true
    facts:
      - disconnect
---
A DRS drill rehearses recovery while the source continues operating. Failover moves production traffic to recovery systems; failback returns it to the primary systems after their data catches up. Traffic redirection is a separate network operation.

### How it works

1. Check recovery readiness and healthy replication. Launch a drill and test the complete application, including dependency order and failback. Terminate drill instances when finished to stop their EC2 charges.
2. During recovery, select recent data or an earlier point-in-time snapshot and launch recovery instances. Validate the applications and their dependencies.
3. Redirect production traffic using your routing service. DRS does not perform that routing change.
4. To return to the primary site, replicate changes made on the recovery systems back to the primary systems. For on-premises failback, boot the Failback Client on the destination server.
5. Complete failback, validate the restored application, redirect traffic back, and confirm replication from the primary servers to AWS has resumed.

### Exam cues

- If the question says rehearse recovery without interrupting production or replication, think a DRS drill, because drill launches leave the source running.
- If the question says recovery instances are healthy but users still reach the old site, think traffic redirection, because DRS launches instances without switching production routes.
- If the question says return to the original site after accepting writes in AWS, think reverse replication first, because the primary systems need those new writes before serving users.

### Remember

- Recovery readiness checks include Ready, Healthy replication, and a successful prior drill.
- The on-premises Failback Client supports x86_64. arm64 failback is supported within AWS.
- Failback destination volumes must be at least as large as recovery volumes.
- Disconnect from AWS removes replication resources and recovery points.

> **Trap:** Booting a recovered server is only part of recovery. The application, its dependencies, and traffic routing must also work before users are switched over.
