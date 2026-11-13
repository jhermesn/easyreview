---
title: Templates and Globals
level: associate
order: 10
facts:
  - id: transform
    text: "SAM templates require Transform: AWS::Serverless-2016-10-31."
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html#sam-specification-template-anatomy
  - id: resources
    text: SAM templates require a Resources section and can mix SAM resources with ordinary CloudFormation
      resources.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy.html#sam-specification-template-anatomy
  - id: function
    text: AWS::Serverless::Function defines a Lambda function; its Events property describes sources that trigger
      it.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html#sam-resource-function
  - id: api
    text: AWS::Serverless::Api defines API Gateway resources and methods exposed through HTTPS endpoints.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html
  - id: implicit-api
    text: SAM creates an implicit API from function Api events that do not reference an explicit
      AWS::Serverless::Api resource.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html
  - id: simple-table
    text: AWS::Serverless::SimpleTable creates a DynamoDB table with a single-attribute primary key; use
      AWS::DynamoDB::Table for advanced configuration.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-simpletable.html#sam-resource-simpletable
  - id: table-key
    text: The default SimpleTable primary key is a String attribute named id.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-simpletable.html#sam-resource-simpletable
  - id: table-billing
    text: SimpleTable uses PAY_PER_REQUEST when ProvisionedThroughput is omitted.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-simpletable.html#sam-resource-simpletable
  - id: global-support
    text: Globals supplies shared supported properties, including Function Runtime and Timeout; unsupported
      properties cannot be placed in Globals.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html#sam-specification-template-anatomy-globals
  - id: scalar
    text: A resource-specific primitive value replaces the corresponding Globals value.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html#sam-specification-template-anatomy-globals
  - id: map
    text: Resource map entries merge with global entries, with resource entries winning duplicate keys.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html#sam-specification-template-anatomy-globals
  - id: list
    text: Global list entries are prepended to the resource-specific list.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html#sam-specification-template-anatomy-globals
  - id: remove
    text: A resource cannot remove a property inherited from Globals.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html#sam-specification-template-anatomy-globals
  - id: expansion
    text: SAM transforms its serverless resource declarations into CloudFormation resources at deployment.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-api.html
  - id: runtime-definition
    text: A runtime is the language-specific execution environment used by a Lambda function.
    source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-build.html
cards:
  - id: sam-006
    q: A team has several event-driven Lambda functions with the same runtime. How should it define the
      application in AWS SAM?
    a: Declare AWS::Serverless::Function resources with Events. Put the shared supported Runtime setting in
      Globals and include the required SAM transform and Resources section.
    facts:
      - function
      - global-support
      - transform
      - resources
  - id: sam-008
    q: Which Transform declaration is required by an AWS SAM template?
    a: "Transform: AWS::Serverless-2016-10-31."
    facts:
      - transform
  - id: sam-009
    q: An AWS SAM function needs one environment variable changed while preserving shared global variables. How
      does Globals inheritance handle it?
    a: Maps merge. Resource-specific entries replace duplicate global keys while other global entries remain.
    facts:
      - map
  - id: sam-010
    q: An AWS SAM function declares a list that is also set in Globals. Does the function list replace the global
      list?
    a: No. Global entries are prepended to the function list. A resource cannot remove inherited global
      properties.
    facts:
      - list
      - remove
    trap: true
  - id: sam-011
    q: An AWS SAM application needs only a DynamoDB table with a single String key and on-demand billing. Which
      resource and defaults fit?
    a: AWS::Serverless::SimpleTable. Its default key is String id, and omitting ProvisionedThroughput sets
      PAY_PER_REQUEST.
    facts:
      - simple-table
      - table-key
      - table-billing
  - id: sam-012
    q: An AWS SAM function declares Api events without an explicit AWS::Serverless::Api resource. What happens?
    a: SAM creates an implicit API from those events. Use an explicit AWS::Serverless::Api when configuring the
      API directly.
    facts:
      - implicit-api
      - api
---
AWS Serverless Application Model (SAM) describes a serverless application using a CloudFormation template with shorter resource declarations. A transform is the instruction that expands those declarations into the CloudFormation resources deployed to AWS.

### How it works

1. Include `Transform: AWS::Serverless-2016-10-31` and a `Resources` section. Mix SAM and ordinary CloudFormation resources when needed.
2. Choose the resource declaration that matches the application.

   | Resource | What it defines |
   |---|---|
   | `AWS::Serverless::Function` | Lambda function and its event sources |
   | `AWS::Serverless::Api` | API Gateway resources and methods for HTTPS endpoints |
   | `AWS::Serverless::SimpleTable` | DynamoDB table with a single-attribute primary key |

3. Put triggers in the function's `Events` property. An `Api` event without an explicit API reference contributes to an implicit API created by SAM.
4. Put common supported settings, such as function `Runtime` and `Timeout`, in `Globals`. A runtime is the language environment that executes a function.
5. Apply inheritance according to the property's data type.

   | Data type | Resource-specific behavior |
   |---|---|
   | Primitive, such as a string or number | Replaces the global value |
   | Map, a set of named values | Merges entries; local entries win duplicate keys |
   | List, an ordered collection | Follows the global entries, which are prepended |

### Exam cues

- If the question says many functions share a runtime and timeout, think `Globals.Function`, because supported properties can be inherited.
- If the question says an API event has no explicit API resource, think implicit API, because SAM builds it from the function events.
- If the question says a basic table needs a single key, think `SimpleTable`, because advanced DynamoDB configuration can use the ordinary CloudFormation table resource.

### Remember

- Required sections: `Transform` and `Resources`.
- SimpleTable default key: String attribute `id`.
- Omit `ProvisionedThroughput` for `PAY_PER_REQUEST` billing.
- Only supported properties belong in `Globals`.

> **Trap:** Resource-specific settings do not universally replace global settings. Maps merge, lists accumulate, and a resource cannot remove an inherited property.
