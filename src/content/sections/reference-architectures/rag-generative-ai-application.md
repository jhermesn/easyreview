---
title: A generative AI assistant with RAG
level: foundational
order: 7
facts:
  - id: token
    text: A token is a sequence of characters that a model reads or predicts as one unit of meaning, such as a word, part of a word ("-ed"), a punctuation mark or a common phrase.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: embedding
    text: An embedding turns input into a vector of numbers so that objects can be compared for similarity, such as two sentences with similar meaning or an image and a caption.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: context-window
    text: The context window is the maximum amount of text, measured in tokens, that an LLM can process in a single inference call; exceeding it causes inference failures.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
  - id: rag
    text: "Retrieval augmented generation (RAG) has three steps: retrieve information from a data source, augment the prompt with it, and get a better-grounded response from the foundation model."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: kb
    text: Amazon Bedrock Knowledge Bases brings proprietary information into generative AI applications with RAG, without retraining the model.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html#knowledge-base
  - id: citations
    text: Knowledge Bases can include citations in the generated response, so readers can check the original source and its accuracy.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html#knowledge-base
  - id: ingestion
    text: To prepare unstructured data for RAG, documents are converted to text, split into chunks, turned into embeddings by an embedding model and written to a vector index that keeps a link to the original document.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html#kb-how-it-works
  - id: runtime
    text: At query time an embedding model turns the user's question into a vector, the vector index returns semantically similar chunks, and those chunks are added to the prompt.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html#kb-how-it-works
  - id: chunking
    text: Chunking breaks large files into small pieces so the foundation model can fit the data into its context window.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: apis
    text: The Retrieve API returns the most relevant source chunks, and RetrieveAndGenerate retrieves chunks and calls the model to generate an answer in one step.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html#kb-how-retrieval
  - id: vector-stores
    text: Amazon OpenSearch Service is the recommended vector database for Amazon Bedrock; Amazon Aurora PostgreSQL and Amazon RDS for PostgreSQL store embeddings with the pgvector extension, and Amazon DocumentDB and Amazon MemoryDB also support vector search.
    source: https://aws.amazon.com/what-is/vector-databases/
  - id: s3-vectors
    text: Amazon S3 Vectors is cost-optimized vector storage in vector buckets, with S3 durability and availability, no infrastructure to provision, and subsecond query latency (as low as 100 ms for frequent queries).
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html#s3-vectors-what-is
  - id: data-sources
    text: Knowledge base data sources include Amazon S3, Confluence, Microsoft SharePoint, Salesforce, a web crawler and custom sources; images, audio and video are ingested only from Amazon S3 and custom sources.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html#data-source-connectors
  - id: guardrails
    text: Amazon Bedrock Guardrails applies configurable safeguards to user inputs and model responses, consistently across foundation models, to filter undesirable content and protect sensitive information.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html#guardrails
  - id: grounding
    text: Contextual grounding checks detect hallucinations by flagging responses that aren't grounded in the reference source or aren't relevant to the user's query, for example in RAG and summarization applications.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
  - id: sensitive
    text: Sensitive information filters block or mask personally identifiable information (PII), such as SSNs, birth dates and addresses, and can also match custom regular expressions.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html#guardrails
  - id: prompt-attacks
    text: The prompt attack filter detects jailbreaks (bypassing the model's safety), prompt injection (overriding the developer's instructions) and prompt leakage (extracting the system prompt).
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html
  - id: hallucination
    text: A hallucination, a confident but incorrect or fabricated answer, can lead to bad decisions, financial loss or compliance violations, which makes it a reliability and reputational concern for enterprises.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-quality
  - id: bedrock-shared
    text: Under the shared responsibility model for Amazon Bedrock, AWS protects the infrastructure, and the customer controls its content, access permissions and security settings.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
  - id: provider-access
    text: Model providers have no access to the Amazon Bedrock model deployment accounts, so they can't see Amazon Bedrock logs or customer prompts and completions.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
  - id: bedrock-privatelink
    text: An interface VPC endpoint with AWS PrivateLink gives a private connection from a VPC to Amazon Bedrock, so traffic doesn't cross the internet.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html
  - id: invocation-logging
    text: Model invocation logging collects the full request data, response data and metadata of model calls in a Region and sends them to Amazon CloudWatch Logs or Amazon S3; it is disabled by default.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html#model-invocation-logging
  - id: encryption
    text: Training datasets, fine-tuning datasets and vector databases should be encrypted at rest with fine-grained access controls, and prompts, outputs and retrieved context should be protected in transit with TLS.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-considerations-gen-ai/security.html#security-pipeline
  - id: macie
    text: Amazon Macie discovers sensitive data in Amazon S3 using machine learning and pattern matching, and evaluates buckets for security and access risks.
    source: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#what-is-macie
diagrams:
  - id: rag-generative-ai-application
    title: Company documents are indexed for retrieval, and answers are grounded and checked
    facts: [token, embedding, context-window, rag, kb, citations, ingestion, runtime, chunking, apis, vector-stores, s3-vectors, data-sources, guardrails, grounding, sensitive, prompt-attacks, hallucination, bedrock-shared, provider-access, bedrock-privatelink, invocation-logging, encryption, macie]
    width: 1240
    height: 680
    groups:
      - { label: Region, x: 200, y: 20, w: 1020, h: 640, tone: neutral, icon: group-region }
      - { label: VPC, x: 220, y: 380, w: 420, h: 220, tone: neutral, icon: group-virtual-private-cloud-vpc }
    nodes:
      - { id: users, label: Employees, sub: chat questions, x: 20, y: 440, w: 150, h: 86, tone: user, icon: res-users }
      - { id: macie, label: Macie, sub: sensitive data scan, x: 260, y: 80, w: 160, h: 86, tone: security, icon: macie }
      - { id: s3, label: S3 bucket, sub: company documents, x: 460, y: 80, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: kb, label: Knowledge Bases, sub: Amazon Bedrock, x: 700, y: 80, w: 160, h: 86, tone: integration, icon: bedrock, info: "Ingestion converts documents to text, splits them into chunks, embeds them and writes the vectors. RetrieveAndGenerate answers with citations." }
      - { id: emb, label: Embedding model, sub: text to vectors, x: 960, y: 80, w: 170, h: 86, tone: integration, icon: bedrock }
      - { id: vector, label: Vector store, sub: OpenSearch Serverless, x: 960, y: 280, w: 170, h: 86, tone: database, icon: opensearch-service, info: "Encrypted at rest with fine-grained access control. Aurora PostgreSQL or S3 Vectors are other options." }
      - { id: app, label: Chat app, sub: Lambda in the VPC, x: 260, y: 440, w: 160, h: 86, tone: compute, icon: lambda }
      - { id: vpce, label: VPC endpoint, sub: PrivateLink, x: 460, y: 440, w: 160, h: 86, tone: network, icon: privatelink }
      - { id: guard, label: Guardrail, sub: grounding and PII, x: 700, y: 480, w: 160, h: 86, tone: security, icon: bedrock }
      - { id: fm, label: Foundation model, sub: Amazon Bedrock, x: 960, y: 480, w: 170, h: 86, tone: integration, icon: bedrock }
    edges:
      - { from: macie, to: s3, step: 1 }
      - { from: s3, to: kb, step: 2 }
      - { from: kb, to: emb, step: 2 }
      - { from: kb, to: vector, step: 2 }
      - { from: users, to: app, step: 3 }
      - { from: app, to: vpce, step: 3 }
      - { from: vpce, to: kb, step: 4 }
      - { from: kb, to: fm, step: 5 }
      - { from: guard, to: fm, step: 5 }
      - { from: guard, to: vpce, step: 6, dashed: true }
    steps:
      - "Before indexing, Macie scans the document bucket for sensitive data such as personal information."
      - "A knowledge base ingests the documents: it converts them to text, splits them into chunks, turns each chunk into an embedding and stores the vectors."
      - "An employee asks a question. The app calls Amazon Bedrock through an interface VPC endpoint, so the traffic stays off the internet."
      - "The knowledge base embeds the question and retrieves the most similar chunks from the vector store."
      - "It adds those chunks to the prompt and calls the foundation model. A guardrail checks the input and the response; the answer comes back with citations."
      - "If the response is not grounded in the retrieved sources, or contains blocked content such as PII, the guardrail intervenes instead of returning it."
cards:
  - id: reference-architectures-196
    q: "A company wants a chatbot that answers from its own documents without retraining a foundation model. Which approach and AWS feature fit?"
    a: "**Retrieval augmented generation (RAG)** with **Amazon Bedrock Knowledge Bases**: retrieve relevant content, add it to the prompt, then generate."
    facts: [rag, kb]
  - id: reference-architectures-197
    q: "Must the company fine-tune or retrain the model every time its documents change?"
    a: "No. With RAG, a knowledge base re-ingests the documents; the model itself is not retrained."
    trap: true
    facts: [kb, ingestion]
  - id: reference-architectures-198
    q: "Why are documents split into chunks and turned into embeddings before RAG?"
    a: "**Chunks** fit the model's context window, and **embeddings** are vectors that let the system find text with similar meaning to the question."
    facts: [chunking, embedding, context-window, ingestion]
  - id: reference-architectures-199
    q: "At question time, what does a knowledge base do before calling the model?"
    a: "It turns the question into a vector, retrieves the most similar chunks from the vector store and adds them to the prompt. RetrieveAndGenerate does both steps."
    facts: [runtime, apis]
  - id: reference-architectures-200
    q: "Which AWS services can store the vectors of a Bedrock knowledge base?"
    a: "**Amazon OpenSearch Service** (recommended, including Serverless), **Aurora PostgreSQL** or **RDS for PostgreSQL**, and **Amazon S3 Vectors**, among others."
    facts: [vector-stores, s3-vectors]
  - id: reference-architectures-201
    q: "The assistant sometimes gives confident answers that are not in the company documents. What reduces and detects this?"
    a: "RAG grounds answers in retrieved sources, and **Guardrails contextual grounding checks** flag responses that are not grounded or relevant."
    facts: [hallucination, grounding, rag]
  - id: reference-architectures-202
    q: "Responses must never show customers' personal information, and the documents bucket must be checked for it. Which services fit?"
    a: "**Bedrock Guardrails sensitive information filters** block or mask PII in prompts and responses; **Amazon Macie** finds sensitive data in S3."
    facts: [sensitive, macie]
  - id: reference-architectures-203
    q: "The app runs in a VPC and must call Amazon Bedrock without traffic crossing the internet. What fits?"
    a: "An **interface VPC endpoint** with **AWS PrivateLink** for Amazon Bedrock."
    facts: [bedrock-privatelink]
  - id: reference-architectures-204
    q: "Users want to check where an answer came from. Which knowledge base feature helps?"
    a: "**Citations** in the generated response point to the source documents."
    facts: [citations]
  - id: reference-architectures-205
    q: "Can the model provider see a company's prompts and answers in Amazon Bedrock?"
    a: "No. Providers have **no access** to the model deployment accounts. Under shared responsibility, the customer controls its content, access and settings."
    trap: true
    facts: [provider-access, bedrock-shared]
---
AI Practitioner questions describe an assistant that must answer from company data, stay accurate and protect sensitive information, and ask which concept or AWS feature does each job. This design shows retrieval augmented generation end to end on Amazon Bedrock.

### How it works

1. Documents in S3 are scanned by Macie and ingested by a Bedrock knowledge base: text, chunks, embeddings, vectors. [Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html#knowledge-base)
2. The app calls Bedrock privately through a VPC endpoint.
3. The knowledge base retrieves similar chunks and adds them to the prompt.
4. The foundation model answers with citations, and a guardrail checks grounding and sensitive content.

| Need | Feature |
|---|---|
| Answer from company data without retraining | RAG with Bedrock Knowledge Bases |
| Find similar meaning | Embeddings in a vector store |
| Fit long documents into the prompt | Chunking |
| Detect ungrounded answers | Guardrails contextual grounding checks |
| Block or mask PII in answers | Guardrails sensitive information filters |
| Find sensitive data in S3 | Amazon Macie |
| Private access from a VPC | Interface VPC endpoint (PrivateLink) |
| Record prompts and responses | Model invocation logging |

### Exam cues

- If the question says use company documents without retraining, think RAG with Knowledge Bases.
- If the question says store embeddings for similarity search, think a vector store such as OpenSearch Service.
- If the question says reduce hallucinations, think RAG and grounding checks.
- If the question says block harmful content or PII, think Bedrock Guardrails.
- If the question says no internet path to Bedrock, think PrivateLink.

### Remember

- RAG: retrieve, augment the prompt, generate.
- Embeddings are vectors; similar meaning sits close together.
- Guardrails filter both the input and the response.

> **Trap:** RAG does not change the model. If the question says the model's knowledge must come from company data that changes often, retraining is the wrong answer.
