---
title: Cross-account parameter sharing
level: professional
order: 150
facts:
  - id: share-owner
    text: Only the account that owns a parameter can share it; a recipient cannot reshare it.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#prereqs
  - id: share-tier
    text: Cross-account Parameter Store sharing through AWS RAM requires advanced parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#prereqs
  - id: share-ram
    text: An AWS RAM resource share specifies the parameters, consumer accounts or organization targets,
      and read-only permission set.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#share
  - id: share-invitation
    text: Consumers accept a resource-share invitation unless sharing within their AWS organization is
      enabled; organization or OU sharing requires that organization-sharing setting.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#share
  - id: share-readonly
    text: Recipients can read shared parameters but cannot update or delete them.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#sharing-permissions
  - id: share-key
    text: A shared SecureString must use a customer managed KMS key with separately authorized
      cross-account key access; AWS managed keys cannot be shared.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#prereqs
  - id: share-kms-policies
    text: Cross-account KMS key use needs permission in the owning key policy and in an IAM policy for
      the external identity.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html#key-policy-modifying-external-accounts
  - id: share-decrypt
    text: Retrieving SecureString plaintext requires kms:Decrypt permission on its KMS key.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-restrict-parameter-access.html#ps-restrict-parameter-access
  - id: share-arn
    text: GetParameter requests for a parameter shared from another account must identify it with its
      full ARN.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html#systemsmanager-GetParameter-request-Name
  - id: share-decrypt-flag
    text: GetParameter WithDecryption returns decrypted SecureString values and is ignored for String
      and StringList.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html#systemsmanager-GetParameter-request-WithDecryption
  - id: share-discovery
    text: describe-parameters --shared lists parameters shared with the consumer; they do not appear on
      the consumer My parameters page.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#identify
  - id: share-history-default
    text: AWSRAMDefaultPermissionSSMParameterReadOnly permits DescribeParameters, GetParameter, and
      GetParameters without GetParameterHistory.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#sharing-permissions
  - id: share-history-option
    text: AWSRAMPermissionSSMParameterReadOnlyWithHistory adds GetParameterHistory to the read-only
      permission set.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#sharing-permissions
  - id: share-cfn
    text: Shared parameters are supported as CloudFormation template parameter inputs, but not
      CloudFormation dynamic references.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#accessing
  - id: share-supported-integrations
    text: Shared parameters support EC2 launch templates, EC2 RunInstances ImageID references, the
      Parameters and Secrets Lambda extension, and retrieval in Automation runbooks.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#accessing
  - id: share-unsupported-integrations
    text: Shared parameters are unsupported as Run Command command parameters, CodeBuild or App Runner
      environment variable values, and ECS secret values.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#accessing
  - id: share-revoke
    text: Removing a parameter from a resource share ends the consumer account access to that parameter.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#unshare
  - id: share-throughput
    text: Shared-parameter retrieval throughput is enforced separately for each consuming account.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#throughput
  - id: share-charges
    text: The owner pays for advanced parameter storage, and each consumer pays for its API use of
      shared advanced parameters.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html#parameter-store-shared-parameters
cards:
  - id: systems-manager-098
    q: A company wants one Parameter Store configuration value read by several AWS accounts without
      copying it. What sharing setup fits?
    a: Store an advanced parameter in the owning account and add it to an AWS RAM resource share for the
      consumers. Recipients receive read-only access.
    facts:
      - share-tier
      - share-ram
      - share-readonly
  - id: systems-manager-099
    q: A shared Parameter Store SecureString is readable as encrypted data, but a consumer cannot
      retrieve plaintext. Which authorization layer needs checking?
    a: Check cross-account KMS access, including the owner key policy, consumer IAM permission for
      kms:Decrypt, and a request using WithDecryption. The RAM parameter share does not share the
      key.
    trap: true
    facts:
      - share-key
      - share-kms-policies
      - share-decrypt
      - share-decrypt-flag
  - id: systems-manager-100
    q: Can a Parameter Store SecureString encrypted with the default AWS managed key be shared across
      accounts through AWS RAM?
    a: Not with that key. Use a customer managed key and separately authorize cross-account key use; the
      parameter must be advanced.
    trap: true
    facts:
      - share-key
      - share-tier
  - id: systems-manager-101
    q: An application in another AWS account cannot retrieve a shared Parameter Store value using its
      short path. What identifier must GetParameter use?
    a: The full parameter ARN, including owner account and Region, rather than only its name.
    facts:
      - share-arn
  - id: systems-manager-102
    q: An AWS RAM consumer can read a shared Parameter Store value but cannot read its version history.
      Which permission set enables history?
    a: AWSRAMPermissionSSMParameterReadOnlyWithHistory. The default read-only set permits
      DescribeParameters, GetParameter, and GetParameters but omits GetParameterHistory.
    facts:
      - share-history-default
      - share-history-option
  - id: systems-manager-103
    q: Can a CloudFormation template use a shared Parameter Store value through a dynamic reference?
    a: No. Shared parameters support CloudFormation template parameter inputs, but not CloudFormation
      dynamic references.
    trap: true
    facts:
      - share-cfn
  - id: systems-manager-104
    q: A team receives a Parameter Store share from outside its AWS organization but cannot access the
      parameter yet. What sharing step may be missing?
    a: Accept the AWS RAM resource-share invitation. Invitation-free access requires enabled sharing
      within the same organization.
    facts:
      - share-invitation
  - id: systems-manager-105
    q: Can a recipient update or reshare a Parameter Store parameter received through AWS RAM, and what
      happens when the owner removes the share?
    a: No. Only the owner can change or share it. Removing the parameter from the share ends recipient
      access.
    facts:
      - share-owner
      - share-readonly
      - share-revoke
  - id: systems-manager-106
    q: Which account pays for a shared advanced Parameter Store value and which account consumes its
      read throughput?
    a: The owner pays storage. Each consumer pays its own API usage and has retrieval throughput
      enforced separately from other consumers.
    facts:
      - share-throughput
      - share-charges
diagrams:
  - id: systems-manager-parameter-sharing-access
    title: Parameter reads and decryption require separate cross-account authorization
    width: 800
    height: 330
    groups:
      - label: Owner account
        x: 20
        y: 20
        w: 240
        h: 290
        tone: mgmt
      - label: Consumer account
        x: 560
        y: 20
        w: 220
        h: 290
        tone: compute
    nodes:
      - id: parameter
        label: Parameter Store
        icon: res-systems-manager-parameter-store
        x: 45
        y: 70
        w: 180
        h: 86
        tone: mgmt
        sub: advanced parameter
      - id: ram
        label: RAM share
        icon: resource-access-manager
        x: 320
        y: 70
        w: 180
        h: 86
        tone: mgmt
        sub: read-only access
      - id: reader
        label: Application
        icon: res-ec2-instance
        x: 580
        y: 70
        w: 180
        h: 86
        tone: compute
        sub: "GetParameter: full ARN"
      - id: key
        label: KMS key
        icon: key-management-service
        x: 45
        y: 215
        w: 180
        h: 72
        tone: security
      - id: decrypt
        label: Decrypt permission
        x: 580
        y: 225
        w: 180
        h: 56
        tone: security
    edges:
      - from: parameter
        to: ram
        label: share
      - from: ram
        to: reader
        label: read
      - from: key
        to: decrypt
        label: key policy and consumer IAM
    steps: []
---
Cross-account Parameter Store sharing lets applications read configuration owned by another AWS account. AWS Resource Access Manager (RAM) shares the existing advanced parameter with consumers, the accounts allowed to use it. The owner keeps control of updates and deletion. [Sharing model](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html)

### How it works

1. In the owning account, create or upgrade to an advanced parameter. Only the owner can share it.
2. Add the parameter to a RAM resource share, a record of the resource, allowed consumers, and permissions. Select accounts or enabled AWS Organizations targets. An organizational unit (OU) is a group of accounts. Consumers accept an invitation unless sharing within the organization is enabled.
3. Choose read-only access with or without version history. A recipient can neither update, delete, nor reshare the parameter.
4. For `SecureString`, an encrypted parameter value, use a customer managed KMS key and authorize that key separately. The owner's key policy and the consumer's IAM permissions must permit key use. Plaintext retrieval requires `kms:Decrypt`.
5. Retrieve with `GetParameter` using the full ARN, the AWS identifier containing the Region, owner account, and parameter path. Set `WithDecryption: true` for plaintext. Use `describe-parameters --shared` for discovery; the consumer's `My parameters` page does not list these values. [Read API](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html) · [Cross-account key access](https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html)

| RAM permission set | Allowed reads | History |
|---|---|---|
| `AWSRAMDefaultPermissionSSMParameterReadOnly` | `DescribeParameters`, `GetParameter`, `GetParameters` | No |
| `AWSRAMPermissionSSMParameterReadOnlyWithHistory` | The same actions plus `GetParameterHistory` | Yes |

| Integration | Shared-parameter support |
|---|---|
| CloudFormation template parameter inputs | Supported |
| CloudFormation dynamic references, values resolved from an external store in resource properties | Unsupported |
| EC2 launch templates and `RunInstances` image references | Supported |
| Parameters and Secrets Lambda extension; Automation runbook retrieval | Supported |
| Run Command parameter references | Unsupported |
| CodeBuild or App Runner environment values; ECS secret values | Unsupported |

[Permissions and integration support](https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-shared-parameters.html)

### Exam cues

- If the question says centrally maintained configuration must be read across accounts, think an advanced parameter shared through RAM, because sharing preserves ownership and grants consumer reads.
- If the question says a shared SecureString cannot be decrypted, think separate KMS authorization, because sharing the parameter does not share the encryption key.
- If the question says read access works but history is denied, think the history-enabled RAM permission set, because default read-only access omits `GetParameterHistory`.
- If the question says use a shared parameter in CloudFormation, think template parameter inputs, because dynamic references do not support shared parameters.

### Remember

- Standard parameters cannot be shared through this feature.
- AWS managed KMS keys cannot be shared; encrypted sharing needs a customer managed key.
- Use the full parameter ARN for a cross-account read.
- The owner pays storage; each consumer pays its API use and has separate retrieval throughput.
- Removing the parameter from the share ends consumer access.

> **Trap:** A RAM share grants parameter access, not decryption by itself. Check the KMS key policy, consumer IAM permissions, and decryption request separately.
