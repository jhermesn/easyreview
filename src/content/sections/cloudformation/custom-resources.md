---
title: Custom resources
level: professional
order: 190
facts:
  - id: custom-logic
    text: CloudFormation custom resources run provider-defined provisioning logic for Create, Update,
      and Delete lifecycle requests.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html#template-custom-resources
  - id: service-token
    text: ServiceToken identifies a Lambda function or SNS topic in the same Region as the stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-customresource.html#cfn-cloudformation-customresource-servicetoken
  - id: update-request
    text: CloudFormation sends Update to a custom resource provider when the custom resource properties
      change.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref.html#crpg-ref
  - id: response
    text: The custom resource provider must send a JSON SUCCESS or FAILED response to the presigned S3
      ResponseURL for each lifecycle request.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref.html#crpg-ref
  - id: response-network
    text: A provider in a VPC needs access to the CloudFormation-specific S3 bucket to send its
      response; otherwise the stack operation fails.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-customresource.html#aws-resource-cloudformation-customresource
  - id: timeout
    text: Custom resource ServiceTimeout ranges from 1 to 3600 seconds and defaults to 3600 seconds.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-customresource.html#cfn-cloudformation-customresource-servicetimeout
  - id: physical-id
    text: An Update response with a different PhysicalResourceId means replacement and causes
      CloudFormation to send Delete for the old resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-customresource.html#aws-resource-cloudformation-customresource--remarks
  - id: custom-data
    text: Fn::GetAtt reads provider-defined custom resource return attributes.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-cloudformation-customresource.html#aws-resource-cloudformation-customresource--remarks
  - id: empty-bucket
    text: The CDK S3 autoDeleteObjects feature uses a custom resource to remove bucket objects during
      deletion and prevent new writes during cleanup.
    source: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3-readme.html#bucket-deletion
  - id: destroy-option
    text: The CDK bucket deletion example combines autoDeleteObjects true with RemovalPolicy.DESTROY.
    source: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3-readme.html#bucket-deletion
  - id: bucket-nonempty
    text: CloudFormation cannot delete a bucket unless its objects have been removed.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options
cards:
  - id: cloudformation-018
    q: What must a CloudFormation custom resource provider do when it receives a lifecycle request?
    a: Handle Create, Update, or Delete and send JSON SUCCESS or FAILED to the presigned S3 ResponseURL.
      ServiceToken identifies the same-Region Lambda function or SNS topic; GetAtt reads returned
      attributes.
    facts:
      - custom-logic
      - response
      - service-token
      - custom-data
  - id: cloudformation-019
    q: A CloudFormation custom resource Lambda returns normally but the stack waits until timeout. Why?
    a: The provider has not delivered a response to ResponseURL, possibly because its network cannot
      reach the S3 response bucket. Every lifecycle request needs a response. ServiceTimeout
      defaults to 3600 seconds.
    trap: true
    facts:
      - response
      - response-network
      - timeout
  - id: cloudformation-020
    q: What does a changed PhysicalResourceId in a CloudFormation custom resource Update response mean?
    a: Replacement. CloudFormation sends a Delete request for the old physical resource, so the provider
      must handle the old resource separately.
    facts:
      - physical-id
  - id: cloudformation-116
    q: A CloudFormation stack owns a disposable S3 bucket and must remove its objects automatically
      before deletion. What can supply the cleanup logic?
    a: A deletion-handling custom resource. The CDK autoDeleteObjects feature uses that mechanism; its
      bucket deletion example pairs autoDeleteObjects true with RemovalPolicy.DESTROY.
    facts:
      - empty-bucket
      - destroy-option
      - bucket-nonempty
  - id: cloudformation-117
    q: A CloudFormation custom resource handles Create and Update but never responds to Delete. What
      goes wrong?
    a: Deletion cannot complete successfully without the required response and eventually times out.
      Handle Delete and send its SUCCESS or FAILED response as well.
    trap: true
    facts:
      - response
      - timeout
  - id: cloudformation-118
    q: How can a CloudFormation custom resource shorten the wait for an unresponsive provider?
    a: Set ServiceTimeout between 1 and 3600 seconds. Its default is 3600 seconds.
    facts:
      - timeout
diagrams:
  - id: cfn-custom-response
    title: Complete a custom resource lifecycle request
    width: 840
    height: 210
    nodes:
      - id: stack
        label: Stack request
        icon: res-cloudformation-stack
        info: CloudFormation sends Create, Update, or Delete with a presigned ResponseURL.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: provider
        label: Lambda provider
        icon: lambda
        info: The ServiceToken selects the provider that performs the custom work.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: response
        label: S3 response URL
        icon: res-simple-storage-service-bucket
        info: The provider sends JSON SUCCESS or FAILED to ResponseURL so CloudFormation can proceed.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: stack
        to: provider
        step: 1
      - from: provider
        to: response
        step: 2
    steps:
      - Send the lifecycle request to the provider.
      - Upload the required response to the presigned S3 URL.
---
A custom resource lets a CloudFormation template delegate provisioning work to code. Its provider, the code handling that resource, must complete a request-and-response exchange before CloudFormation can continue.

### How it works

1. Set `ServiceToken` to a Lambda function or SNS topic in the stack's Region.
2. CloudFormation sends `Create`, `Update`, or `Delete` with properties and a `ResponseURL`. Property changes cause an update request.
3. The provider performs its work and sends a JSON `SUCCESS` or `FAILED` response to that presigned S3 URL. A presigned URL grants access for that specific request; VPC networking must allow the S3 response path.
4. Return attributes for `Fn::GetAtt`. During update, keep `PhysicalResourceId` unchanged for an update in place; a changed ID makes CloudFormation replace the resource and delete the old one.

### Exam cues

- If the question says a Lambda finishes but its CloudFormation resource hangs, think the response URL, because a normal Lambda return does not deliver the required S3 response.
- If the question says a disposable S3 bucket must empty itself before stack deletion, think a custom resource with deletion logic, because CloudFormation cannot delete a non-empty bucket. CDK `autoDeleteObjects` uses that mechanism.
- If the question says a provider returns a new physical ID on update, think replacement, because CloudFormation sends deletion for the old ID.

### Remember

- `ServiceTimeout`: 1 to 3600 seconds, default 3600 seconds.
- Every lifecycle request needs a response, including `Delete`.
- The CDK deletion example uses `autoDeleteObjects: true` with `RemovalPolicy.DESTROY`.

> **Trap:** Successful execution of the provider does not complete the CloudFormation custom resource. The provider must send the lifecycle response to ResponseURL.
