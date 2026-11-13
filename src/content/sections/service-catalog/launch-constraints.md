---
title: Launch constraints
level: associate
order: 20
facts:
  - id: launch-role
    text: A launch constraint selects an IAM role that Service Catalog assumes for product launch, update, and termination.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
  - id: role-definition
    text: An IAM role provides permissions that a user or AWS service can assume temporarily.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
  - id: scope
    text: A launch constraint applies to a product-portfolio association, not every product or every portfolio.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
  - id: without-role
    text: Without a launch constraint, end users need their own Service Catalog, CloudFormation, and underlying service permissions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
  - id: role-permissions
    text: A CloudFormation launch role needs CloudFormation permissions, permissions for template resources, and read access to the template in a service-owned S3 bucket.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: role-trust
    text: The launch role trust policy must allow Service Catalog to assume the role.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: template-read
    text: The documented template-read policy uses s3:GetObject with s3:ExistingObjectTag/servicecatalog:provisioning equal to true.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: end-user-actions
    text: ProvisionProduct, UpdateProvisionedProduct, and TerminateProvisionedProduct are end-user permissions, not permissions assigned to the launch role.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: console-read
    text: Viewing provisioned CloudFormation products and resources in the console requires end-user CloudFormation read access and does not use the launch role.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: local-role
    text: A local launch role name resolves in the launching account and must exist there and in the account that created the constraint.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-constraint
  - id: role-arn
    text: A launch role ARN selects that specific role even for a user in another account; the role-owning account provisions and pays for the resources.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: role-choice
    text: A launch constraint specifies either RoleArn or LocalRoleName, never both.
    source: https://docs.aws.amazon.com/servicecatalog/latest/APIReference/API_CreateConstraint.html#API_CreateConstraint_RequestParameters
  - id: caller-access
    text: End users need portfolio access and IAM permissions for catalog actions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-permissions
  - id: trust-definition
    text: A role trust policy identifies the principals allowed to assume the role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#id_roles_terms-and-concepts
  - id: arn-definition
    text: An Amazon Resource Name (ARN) identifies a specific AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns
cards:
  - id: service-catalog-001
    q: Developers must launch an RDS product through AWS Service Catalog without direct RDS write permissions. What should the administrator configure?
    a: A launch constraint with an IAM role that can provision the product. Give developers portfolio access and the required Service Catalog end-user actions.
    facts:
      - launch-role
      - role-permissions
      - end-user-actions
      - caller-access
  - id: service-catalog-002
    q: What happens when an AWS Service Catalog CloudFormation product has no launch constraint?
    a: The end user launches and manages it with their own credentials and needs Service Catalog, CloudFormation, and resource permissions.
    trap: true
    facts:
      - without-role
  - id: service-catalog-003
    q: What must an AWS Service Catalog CloudFormation launch role permit?
    a: Its trust policy must allow Service Catalog to assume it. Its permissions must cover CloudFormation, template resources, and template reads from the service-owned S3 bucket. Catalog end-user actions belong to the caller.
    facts:
      - role-trust
      - role-permissions
      - template-read
      - end-user-actions
  - id: service-catalog-004
    q: A shared AWS Service Catalog product must deploy into each recipient account using a role with the same name. Should the constraint specify a name or an ARN?
    a: Use LocalRoleName. That role must exist in the creating account and each launching account. An ARN selects a specific role.
    facts:
      - local-role
      - role-choice
      - role-arn
  - id: service-catalog-005
    q: Does an AWS Service Catalog launch constraint automatically cover every product in a portfolio or the same product in other portfolios?
    a: No. Apply it separately to each product-portfolio association.
    trap: true
    facts:
      - scope
  - id: service-catalog-026
    q: An AWS Service Catalog user can launch a CloudFormation product through a role but cannot view its resources in the console. What permission is missing?
    a: Check the user's CloudFormation read permissions. Console resource viewing does not use the launch role.
    trap: true
    facts:
      - console-read
---
A launch constraint lets AWS Service Catalog deploy approved resources with a designated IAM role. A role is a set of permissions that a service can assume temporarily, so users can request infrastructure without receiving its write permissions directly.

### How it works

1. Create a role whose trust policy allows Service Catalog to assume it. A trust policy identifies who may use a role.
2. Grant the role CloudFormation permissions, permissions for the resources in the template, and access to read the template from the service-owned S3 bucket. The documented read condition is s3:ExistingObjectTag/servicecatalog:provisioning=true.
3. Attach the launch constraint to the product in its portfolio. Choose either RoleArn, the role's Amazon Resource Name (ARN) identifying it, or LocalRoleName.
4. Service Catalog uses that role for launches, updates, and termination. The caller still needs Service Catalog end-user permissions and portfolio access.

### Exam cues

- If the question says developers must create approved databases without direct database write permissions, think launch constraint, because Service Catalog assumes the deployment role.
- If the question says a shared product must deploy locally in each account, think LocalRoleName, because it resolves to a role in the launching account.
- If the question says launches work but console resource viewing fails, think user CloudFormation read permissions, because that view does not use the launch role.

### Remember

- Without a launch constraint, the user's own permissions must cover provisioning.
- The constraint belongs to a product in a particular portfolio.
- A local role name must exist in both the creating account and the launching account.
- A role ARN selects the specific role; its account provisions and pays for the resources.
- ProvisionProduct, UpdateProvisionedProduct, and TerminateProvisionedProduct belong to the end user's permissions.

> **Trap:** A launch role removes the need for direct resource write permissions, but it does not grant portfolio access or console read permissions to the user.
