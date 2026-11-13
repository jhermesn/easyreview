---
title: Launch failure troubleshooting
level: associate
order: 90
facts:
  - id: launch-evidence
    text: Auto Scaling activity history is available on the group Activity tab or through
      describe-scaling-activities; StatusCode and StatusMessage identify failures.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/CHAP_Troubleshooting.html#CHAP_Troubleshooting
  - id: launch-history
    text: Auto Scaling retains six weeks of scaling activity history.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/CHAP_Troubleshooting.html#CHAP_Troubleshooting
  - id: launch-template-check
    text: A fully-formed-launch-template error has a more specific cause in its following message;
      run-instances with --dry-run can help diagnose the template.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html#ts-as-launch-template
  - id: launch-dry-run
    text: DryRunOperation means the EC2 dry-run permission check succeeded; UnauthorizedOperation
      indicates missing permission.
    source: https://docs.aws.amazon.com/ec2/latest/devguide/errors-overview.html#errors-overview
  - id: launch-caller-permissions
    text: A launch-template caller needs ec2:RunInstances, ec2:CreateTags when launch tags are
      specified, and iam:PassRole when the template includes an instance profile.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html#ts-as-launch-template
  - id: launch-shared-ami
    text: A private AMI owned by another account must be shared with the launching account.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html#ts-as-launch-template
  - id: launch-ami-state
    text: A deleted, pending, or disabled AMI can prevent an Auto Scaling launch; use a valid available
      AMI.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-ami.html#ts-as-ami
  - id: launch-architecture
    text: The AMI processor architecture must match the selected instance type.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-ami.html#ts-as-ami
  - id: launch-deleted-resources
    text: Deleted security groups or key pairs referenced by launch settings prevent launch and require
      corrected launch settings on the group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html#ts-as-instancelaunchfailure
  - id: launch-capacity
    text: Insufficient instance capacity can be addressed by waiting, enabling additional AZs, or using
      additional suitable instance types.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/troubleshooting-launch.html#troubleshooting-launch-capacity
  - id: launch-quota
    text: An EC2 instance quota error requires reducing instance use or requesting a quota increase,
      rather than treating it as an AZ capacity shortage.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html#ts-as-instancelaunchfailure
  - id: launch-subnet
    text: InsufficientFreeAddressesInSubnet means the subnet lacks enough free addresses for the request.
    source: https://docs.aws.amazon.com/ec2/latest/devguide/errors-overview.html#errors-overview
  - id: launch-key-access
    text: Encrypted EBS launches using a customer managed KMS key require access for the Auto Scaling
      service-linked role, not just the role attached to the instance.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#key-policy-requirements-EBS-encryption
  - id: launch-key-grant
    text: The customer managed key policy must allow key use and kms:CreateGrant for the service-linked
      role; a cross-account key also requires a grant to that role.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#key-policy-requirements-EBS-encryption
  - id: launch-aws-key
    text: Auto Scaling needs no additional authorization to use the default AWS managed EBS key in the
      same account.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#key-policy-requirements-EBS-encryption
  - id: launch-suspension
    text: Auto Scaling can administratively suspend processes after repeated launch failures; suspended
      processes can be resumed after repair.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html#as-suspend-resume-processes
cards:
  - id: ec2-auto-scaling-059
    q: Where should an operator find the reason an EC2 Auto Scaling group cannot launch instances?
    a: Read the group Activity history or describe-scaling-activities, especially StatusCode and
      StatusMessage. Six weeks of activity history is available.
    facts:
      - launch-evidence
      - launch-history
  - id: ec2-auto-scaling-060
    q: An EC2 Auto Scaling group reports insufficient instance capacity in its configured AZs, but its
      account quota is sufficient. What should the operator change?
    a: Try additional suitable instance types or enabled AZs, or retry after capacity changes. A quota
      increase does not by itself create physical capacity.
    facts:
      - launch-capacity
      - launch-quota
  - id: ec2-auto-scaling-061
    q: An EC2 Auto Scaling group reports an EC2 instance quota has been reached. Is choosing a different
      AZ enough?
    a: No. Reduce instance use or request the relevant quota increase. A quota error differs from a
      temporary instance-capacity shortage.
    trap: true
    facts:
      - launch-quota
  - id: ec2-auto-scaling-062
    q: An EC2 Auto Scaling launch fails after a team selects a customer managed KMS key for its EBS
      volumes. The instance role can decrypt. Which permission path still needs checking?
    a: The Auto Scaling service-linked role needs key-policy access and CreateGrant permission. A
      cross-account key also needs a grant to that role.
    trap: true
    facts:
      - launch-key-access
      - launch-key-grant
  - id: ec2-auto-scaling-063
    q: An EC2 Auto Scaling user can read a launch template but gets an authorization error when the
      template includes an instance profile. What permission is relevant?
    a: iam:PassRole for the role in the instance profile, alongside the EC2 launch permissions.
    facts:
      - launch-caller-permissions
  - id: ec2-auto-scaling-064
    q: An EC2 Auto Scaling group reports a generic fully-formed-launch-template error. How can an
      operator narrow down the cause without launching an instance?
    a: Read the specific message following the generic error and test the selected template version with
      run-instances --dry-run. DryRunOperation indicates the permission check succeeded.
    facts:
      - launch-template-check
      - launch-dry-run
  - id: ec2-auto-scaling-065
    q: An EC2 Auto Scaling group uses an Arm instance type with an x86 AMI. What must change?
    a: Select an AMI and instance type with matching processor architectures.
    facts:
      - launch-architecture
  - id: ec2-auto-scaling-066
    q: An EC2 Auto Scaling launch reports InsufficientFreeAddressesInSubnet. Which resource is
      exhausted?
    a: The subnet free IP address pool. Check subnet address capacity rather than raising the EC2
      instance quota.
    facts:
      - launch-subnet
      - launch-quota
  - id: ec2-auto-scaling-067
    q: An EC2 Auto Scaling launch configuration has been repaired, but launches remain stopped after
      repeated failures. What group setting should an operator inspect?
    a: Suspended processes. Auto Scaling can impose an administrative suspension after repeated launch
      failures; resume the affected process after fixing the cause.
    facts:
      - launch-suspension
---
EC2 Auto Scaling launch troubleshooting starts with the failed scaling activity, which records why the group could not add an instance. Separate an invalid launch configuration from exhausted capacity or missing permissions before changing scaling policies. [Troubleshooting entry point](https://docs.aws.amazon.com/autoscaling/ec2/userguide/CHAP_Troubleshooting.html)

### How it works

1. Open the group's `Activity` tab or use `describe-scaling-activities`. Read `StatusCode` and `StatusMessage` for the failed launch.
2. Match the error to the resource or permission it names. A launch template is a versioned instance configuration; check the version actually selected by the group.
3. For a generic template error, read the more specific message and test the selected version with `run-instances --dry-run`. A dry run checks the request without launching an instance. `DryRunOperation` means the permission check succeeded.
4. Correct the cause, update the group's launch settings when required, and inspect subsequent activities. If launches remain stopped, check for an administratively suspended process. [Template diagnosis](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html) · [Suspensions](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html)

| Evidence | Meaning | Response |
|---|---|---|
| Insufficient instance capacity | Requested capacity is unavailable | Retry or broaden suitable instance types and enabled AZs |
| EC2 quota reached | Account usage limit is exhausted | Reduce usage or request an increase |
| `InsufficientFreeAddressesInSubnet` | Subnet address pool is exhausted | Check free addresses in the selected subnet |
| Missing or inaccessible AMI | The machine image, the software used to boot, cannot be used | Check existence, state, sharing, and processor architecture |
| Deleted security group or key pair | Launch settings refer to a missing resource | Correct the settings used by the group |
| Launch-template authorization failure | Caller lacks required launch or role-passing access | Check `ec2:RunInstances`, launch-tag `ec2:CreateTags`, and profile-related `iam:PassRole` |
| Encrypted-volume `Client.InternalError` | The Auto Scaling role may lack key access | Check the customer managed key policy and grants |

[Launch errors](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html) · [EC2 error meanings](https://docs.aws.amazon.com/ec2/latest/devguide/errors-overview.html) · [AMI errors](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-ami.html)

An instance profile supplies a role to software running on EC2. A service-linked role supplies permissions to Auto Scaling itself. For customer managed EBS encryption keys, the latter needs key use and `kms:CreateGrant`. Cross-account keys additionally need a grant to that role, meaning an explicit KMS permission delegation. [Encryption permissions](https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html)

### Exam cues

- If the question says sufficient quota but no instance capacity, think more suitable types or AZs, because quota and available hardware are different constraints.
- If the question says encrypted launches fail despite instance-role permissions, think the Auto Scaling service-linked role, because that service launches the encrypted resources.
- If the question says the template includes an instance profile and its caller is denied, think `iam:PassRole`, because the caller must be allowed to pass that role.
- If the question says launches remain suspended after repair, think resume the affected process, because administrative suspension can outlast the original error.

### Remember

- Scaling activity history covers six weeks.
- `DryRunOperation` is a successful permission-check result; `UnauthorizedOperation` is not.
- AMI and instance processor architectures must match.
- The default AWS managed EBS key needs no additional Auto Scaling authorization in the same account.

> **Trap:** Granting decrypt permission to the instance role does not give the Auto Scaling service-linked role permission to launch customer-key-encrypted volumes.
