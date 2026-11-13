---
title: Portfolio sharing and local access
level: professional
order: 60
facts:
  - id: reference
    text: Account-to-account and Organizations sharing provide an imported portfolio reference kept in sync with the original.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: copy
    text: Deploying catalog copies with CloudFormation StackSets requires redeployment to propagate catalog changes.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: local-access
    text: Recipients can grant local IAM users, groups, and roles access to an imported portfolio or distribute imported products through a local portfolio.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: read-only
    text: Recipients cannot edit imported products or constraints or re-share imported products.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: override
    text: To override a shared launch constraint, add the product to a local portfolio and apply a different launch constraint there.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: removal
    text: Removing a shared product removes it from imported and associated local portfolios; existing provisioned products continue running.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: same-region
    text: Portfolio imports occur in the same Region between the source and recipient accounts.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#catalogs_portfolios_sharing
  - id: principals
    text: Users, groups, and roles are not inherited by ordinary portfolio sharing.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing.html#shared-imported-portfolios-relationship
  - id: principal-names
    text: Optional Principal Name Sharing is available for Organizations shares and automatically associates matching local IAM principals.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing_how-to-share.html#principal-name-share
  - id: no-manual-import
    text: Account-to-account sharing requires a recipient import, while Organizations sharing needs no manual import.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing_how-to-share.html#catalogs_portfolios_sharing_how-to-share
  - id: org-targets
    text: Organizations shares can target an account, an OU, or the whole organization; sharing to a parent OU includes its accounts and child OUs.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/catalogs_portfolios_sharing_how-to-share.html#sharing-from-master
  - id: trusted-access
    text: Service Catalog trusted access enables Organizations integration for portfolio sharing.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/services-that-can-integrate-servicecatalog.html
  - id: local-role
    text: A local role name resolves in the launching account and must exist there and in the account that created the constraint.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-constraint
  - id: role-flow
    text: Service Catalog assumes the launch role to provision the product; end-user actions and console CloudFormation read access remain caller permissions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
  - id: version-flow
    text: New product template versions become available for users to select; provisioned products need an update to adopt them.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/productmgmt-update.html#productmgmt-update
diagrams:
  - id: catalog-share-and-launch
    title: Share a portfolio and launch with a local role
    width: 900
    height: 380
    groups:
      - label: Hub account (catalog admin)
        icon: group-aws-account
        x: 20
        y: 20
        w: 260
        h: 340
        tone: mgmt
      - label: Spoke account
        icon: group-aws-account
        x: 340
        y: 20
        w: 540
        h: 340
        tone: mgmt
    nodes:
      - id: portfolio
        label: Portfolio
        sub: products + constraints
        icon: service-catalog
        x: 45
        y: 60
        w: 210
        h: 86
        tone: mgmt
        info: The original (shared) portfolio. Launch and template constraints set here travel with the share.
      - id: versions
        label: Product versions
        sub: v1, v2 templates
        icon: res-cloudformation-template
        x: 45
        y: 250
        w: 210
        h: 86
        tone: mgmt
        info: A template change is a **new version**. Existing provisioned products stay on their version until someone updates them.
      - id: imported
        label: Imported portfolio
        sub: stays in sync
        icon: service-catalog
        x: 370
        y: 60
        w: 180
        h: 86
        tone: mgmt
        info: An imported portfolio stays in sync with the original in the same Region. The recipient grants local access, unless Principal Name Sharing already associates matching principals.
      - id: user
        label: End user
        sub: launch request
        icon: res-users
        x: 680
        y: 60
        w: 170
        h: 86
        tone: user
        info: The user needs portfolio access and Service Catalog end-user actions. CloudFormation console resource viewing separately needs user read permissions.
      - id: role
        label: Launch role
        sub: local role name
        icon: res-identity-access-management-role
        x: 370
        y: 250
        w: 180
        h: 86
        tone: security
        info: A local role name resolves to the role in the launching account. That name must also exist in the constraint-creating account.
      - id: stack
        label: Provisioned product
        sub: CloudFormation stack
        icon: res-cloudformation-stack
        x: 680
        y: 250
        w: 170
        h: 86
        tone: mgmt
        info: The running instance of a product version. Update or terminate it through Service Catalog.
    edges:
      - from: versions
        to: portfolio
        label: new version
      - from: portfolio
        to: imported
        step: 1
        label: share
      - from: user
        to: imported
        step: 2
        label: launch
      - from: imported
        to: role
        step: 3
        label: assume
      - from: role
        to: stack
        step: 4
        label: provision
    steps:
      - The administrator shares the portfolio. Account-to-account recipients import it; Organizations recipients do not need a manual import.
      - An authorized user in the spoke account launches a product version.
      - The launch constraint tells Service Catalog which role to assume.
      - Service Catalog provisions the stack with that role's permissions, not the user's.
cards:
  - id: service-catalog-010
    q: How does sharing an AWS Service Catalog portfolio differ from deploying catalog copies with StackSets?
    a: Sharing maintains a reference synchronized with the source. Catalog copies deployed with StackSets need redeployment for catalog changes.
    facts:
      - reference
      - copy
  - id: service-catalog-011
    q: What can a recipient administrator change in an imported AWS Service Catalog portfolio?
    a: Grant local principal access and distribute its products through local portfolios. Imported products and constraints cannot be edited, and imported products cannot be re-shared.
    facts:
      - local-access
      - read-only
  - id: service-catalog-012
    q: Does an AWS Service Catalog portfolio share automatically grant every user in the recipient account access?
    a: No. Grant local access, or use optional Organizations Principal Name Sharing to associate matching local principals. Neither grants all users access.
    trap: true
    facts:
      - principals
      - local-access
      - principal-names
  - id: service-catalog-013
    q: A shared AWS Service Catalog launch constraint must be replaced for one recipient account. How can its administrator do this?
    a: Add the product to a local portfolio and apply a different launch constraint there.
    facts:
      - override
  - id: service-catalog-014
    q: What happens to existing AWS Service Catalog provisioned products when their product is removed from a shared portfolio?
    a: They keep running. The product is removed from imported and associated local portfolios and is unavailable for future launches.
    facts:
      - removal
  - id: service-catalog-017
    q: A platform team needs centrally maintained AWS Service Catalog products with deployments in each member account. What sharing and role configuration fits?
    a: Share the portfolio through Organizations, grant local access or enable matching Principal Name Sharing, and use a local launch role name available in every launching account and the source account.
    facts:
      - reference
      - trusted-access
      - org-targets
      - local-access
      - principal-names
      - local-role
  - id: service-catalog-020
    q: A shared AWS Service Catalog portfolio is visible in a member account but developers cannot launch products. What should its administrator check?
    a: Check local portfolio access and whether any enabled Principal Name Sharing matches their IAM principals. Also check the required local launch role.
    trap: true
    facts:
      - local-access
      - principal-names
      - local-role
---
Portfolio sharing distributes AWS Service Catalog products to other accounts while the source administrator keeps control of the catalog. An imported portfolio is a reference that follows source changes. A local portfolio belongs to the recipient account.

### How it works

1. Enable Service Catalog trusted access for Organizations integration when using organizational sharing. Choose an account, organizational unit (OU), or the organization. An OU groups accounts within an organization.
2. Share the portfolio. Account-to-account recipients import it in the same Region; Organizations recipients do not need a manual import.
3. Grant recipient users, groups, or roles access. Optional Principal Name Sharing for Organizations automatically associates matching local IAM principals, the identities receiving access.
4. If the product uses a local launch role name, create that role in the source and launching accounts. Service Catalog assumes the launching account's role to provision resources.
5. Source catalog changes propagate to the imported reference. Existing provisioned products need their own update to adopt a new product version.

### Exam cues

- If the question says centrally maintain a catalog across accounts, think portfolio sharing, because imported references stay synchronized.
- If the question says a visible catalog is unavailable to developers, think local principal access and launch role checks, because sharing alone does not authorize everyone.
- If the question says one recipient needs a different launch role, think local portfolio with a replacement launch constraint, because that is the documented override path.

### Remember

| Distribution | Result | Catalog update behavior |
|---|---|---|
| Account share | Imported reference after recipient import | Source changes propagate |
| Organizations share | Imported reference without manual import | Source changes propagate |
| StackSets catalog deployment | Separate catalog copy | Redeploy catalog changes |

- Imports use the same Region. Imported products cannot be re-shared.
- Recipients can add local access but cannot edit imported products or constraints.
- Removing a shared product stops future launches; running provisioned products remain.

> **Trap:** Ordinary sharing does not inherit users, groups, and roles. Principal Name Sharing is an explicit Organizations option that associates matching local identities.
