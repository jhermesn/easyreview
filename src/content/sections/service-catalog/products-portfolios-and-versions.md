---
title: Products, portfolios, and versions
level: associate
order: 10
facts:
  - id: product
    text: A product packages AWS resources for deployment from an infrastructure template.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-product
  - id: template
    text: A CloudFormation template describes resources, their relationships, and parameters that users supply at launch.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-product
  - id: portfolio
    text: A portfolio groups products and manages who can use them and how.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-portfolio
  - id: access
    text: Administrators grant portfolio access to IAM users, groups, or roles; IAM permissions govern catalog actions.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-permissions
  - id: version
    text: Products can have multiple template versions, and a new version becomes available to users with portfolio access.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-versioning
  - id: instance
    text: For a CloudFormation product, a provisioned product is the deployed stack, a collection of resources managed together.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/what-is_concepts.html#what-is_concepts-provprod
  - id: constraint-scope
    text: Constraints govern a product within a specific portfolio and take effect immediately for versions not yet launched.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints.html#constraints
  - id: constraint-types
    text: Constraint types include launch, template, notification, tag update, and StackSet.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints.html#constraints
  - id: product-types
    text: The product creation guide lists CloudFormation, Terraform Cloud, and External product types; External supports Terraform Community Edition.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/productmgmt-cloudresource.html#productmgmt-cloudresource
  - id: terraform-engine
    text: Terraform Community Edition and Terraform Cloud products require a configured provisioning engine.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/getstarted-Terraform.html#getstarted-Terraform
  - id: external-transition
    text: The October 2023 documentation update introduced the transition from Terraform Open Source to External.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/history.html#document-history-archive
  - id: legacy-terraform
    text: Terraform Open Source is no longer valid for new products or provisioned products; existing resources support only update or termination before migration.
    source: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/update_terraform_open_source_to_external.html#update_terraform_open_source_to_external
cards:
  - id: service-catalog-019
    q: Auditors need to know who can launch an AWS Service Catalog product and which role and parameter restrictions apply. Where should they look?
    a: The portfolio access associations and the product constraints in that portfolio. IAM permissions also govern catalog actions.
    facts:
      - access
      - constraint-scope
      - portfolio
  - id: service-catalog-023
    q: A platform team needs one AWS Service Catalog template offered to different teams with different launch rules. What should it configure?
    a: Put the product in separate portfolios and configure access and product constraints in each portfolio.
    facts:
      - portfolio
      - constraint-scope
  - id: service-catalog-024
    q: In AWS Service Catalog, how does a product version differ from a provisioned product?
    a: A version is an available template revision. A provisioned CloudFormation product is a running stack created from a selected version.
    facts:
      - version
      - instance
  - id: service-catalog-025
    q: A team adds a new version to an AWS Service Catalog product. Who can select it?
    a: Users who already have access to a portfolio containing that product.
    facts:
      - version
  - id: service-catalog-037
    q: A team creates a new AWS Service Catalog product for Terraform Community Edition. Which product type should it use?
    a: External, with a configured Terraform provisioning engine. Terraform Open Source is the legacy product type and cannot be used for new products or provisioned products.
    facts:
      - product-types
      - terraform-engine
      - legacy-terraform
---
AWS Service Catalog gives users approved infrastructure templates they can deploy themselves. A product is the offering, a portfolio is its access-controlled collection, and a provisioned product is a deployed instance.

### How it works

1. An administrator imports a CloudFormation template describing resources and their relationships, or configures a Terraform provisioning engine for a Terraform product. Parameters are inputs the user supplies at launch.
2. The administrator adds the product to a portfolio, grants access to IAM users, groups, or roles, and configures constraints. A constraint is a rule governing deployment through that portfolio.
3. An authorized user chooses a product version and launches it. For a CloudFormation product, Service Catalog creates a stack, a collection of resources managed together.
4. The administrator can publish additional versions. Users with portfolio access can select them.

### Exam cues

- If the question says different teams need different rules for the same template, think separate portfolios, because constraints belong to a product within a portfolio.
- If the question says identify the deployed resources behind a CloudFormation catalog launch, think provisioned product, because that instance is a stack.

### Remember

| Concept | Purpose |
|---|---|
| Product | Infrastructure offering defined by a template |
| Version | Template revision available for selection |
| Portfolio | Products, access associations, and deployment rules |
| Provisioned product | Deployed instance of a product |

- Current product types are CloudFormation, Terraform Cloud, and External. External supports Terraform Community Edition.
- The October 2023 documentation update introduced the transition from Terraform Open Source to External. The legacy type cannot create new products or provisioned products; existing resources support only update or termination before migration.
- IAM permissions govern catalog actions as well as portfolio access.
- Constraints take effect immediately for versions that have not been launched.

> **Trap:** A product and a provisioned product have different lifecycles. Publishing a version makes it available for selection; it does not describe a newly deployed stack.
