---
title: Knowledge Bases and RAG
level: foundational
order: 30
facts:
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
  - id: kb-types
    text: Amazon Bedrock offers a Managed Knowledge Base, where Bedrock runs ingestion, indexing, storage and retrieval, and a customer-managed knowledge base, where you manage your own vector store such as OpenSearch Serverless, Aurora or Neptune.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html#knowledge-base
  - id: vector-stores
    text: Amazon OpenSearch Service is the recommended vector database for Amazon Bedrock; Amazon Aurora PostgreSQL and Amazon RDS for PostgreSQL store embeddings with the pgvector extension, and Amazon DocumentDB and Amazon MemoryDB also support vector search.
    source: https://aws.amazon.com/what-is/vector-databases/
  - id: kb-vector-stores
    text: "A customer-managed Bedrock knowledge base can store its vectors in Amazon OpenSearch Serverless, OpenSearch Service managed clusters, Amazon S3 Vectors, Amazon Aurora, Amazon Neptune Analytics (for GraphRAG), Pinecone, Redis Enterprise Cloud or MongoDB Atlas."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html#knowledge-base-setup
  - id: kb-data-sources
    text: "Knowledge base data sources include Amazon S3, Confluence, Microsoft SharePoint, Salesforce, a web crawler and custom sources; images, audio and video are ingested only from Amazon S3 and custom sources."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html#data-source-connectors
  - id: kb-connector-change
    text: "Starting September 30, 2026, new Confluence, SharePoint, Salesforce and web crawler connectors can no longer be created on customer-managed knowledge bases; existing ones keep working, and AWS recommends Bedrock Managed Knowledge Base for these sources."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html#data-source-connectors
  - id: s3-vectors
    text: "Amazon S3 Vectors is cost-optimized vector storage in vector buckets, with S3 durability and availability, no infrastructure to provision, and subsecond query latency (as low as 100 ms for frequent queries)."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html#s3-vectors-what-is
  - id: kb-quick-create
    text: "When you create a knowledge base, Bedrock can quick-create the vector store for you in Amazon OpenSearch Serverless, Amazon Aurora PostgreSQL Serverless or Amazon S3 Vectors, or you can connect a vector store you set up."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html#knowledge-base-create-console
cards:
  - id: bedrock-020
    q: A company wants its chatbot to answer from internal HR documents that change monthly, without retraining a model. Which approach and Amazon Bedrock feature fit?
    a: Retrieval augmented generation with Amazon Bedrock Knowledge Bases, which retrieves relevant document chunks and adds them to the prompt.
    facts: [rag, kb]
  - id: bedrock-021
    q: Put the RAG ingestion steps in order - store embeddings in a vector index, split documents into chunks, parse documents to text, create embeddings for each chunk.
    a: Parse documents to text, split into chunks, create embeddings, store them in a vector index.
    facts: [ingestion]
  - id: bedrock-022
    q: How can users of a RAG chatbot built on Amazon Bedrock Knowledge Bases check where an answer came from?
    a: Use the citations the knowledge base returns, which link parts of the response to the source documents.
    facts: [citations, apis]
  - id: bedrock-023
    q: Which AWS services can store vector embeddings for a RAG application?
    a: "Amazon OpenSearch Service (recommended for Bedrock), Aurora PostgreSQL and RDS for PostgreSQL (pgvector), Amazon Neptune, Amazon DocumentDB and Amazon MemoryDB."
    facts: [vector-stores, kb-types]
  - id: bedrock-024
    q: Which Amazon Bedrock Knowledge Bases API retrieves relevant chunks and generates the answer in a single call?
    a: RetrieveAndGenerate. Retrieve alone returns only the chunks.
    facts: [apis]
  - id: bedrock-025
    q: Why are documents split into chunks before they are embedded for RAG?
    a: So the relevant pieces fit into the model's context window and retrieval returns focused passages instead of whole files.
    facts: [chunking]
  - id: bedrock-026
    q: Does RAG change the foundation model's weights?
    a: "No. RAG adds retrieved context to the prompt at query time; fine-tuning is what changes the weights."
    trap: true
    facts: [rag, kb]
  - id: bedrock-056
    q: "A RAG application on Amazon Bedrock Knowledge Bases needs cost-optimized, durable vector storage with subsecond queries and no infrastructure to provision. Which vector store fits?"
    a: "Amazon S3 Vectors, one of the supported knowledge base vector stores. OpenSearch suits high-performance search, Aurora suits relational data, and Neptune Analytics suits GraphRAG."
    facts: [kb-vector-stores, s3-vectors]
  - id: bedrock-057
    q: "Which vector store do you pick for a Bedrock knowledge base that should use GraphRAG over connected entities?"
    a: "Amazon Neptune Analytics, the graph option among the supported knowledge base vector stores."
    facts: [kb-vector-stores]
  - id: bedrock-058
    q: "Why might a generative AI application use Amazon Bedrock Knowledge Bases?"
    a: "It brings proprietary information into responses using retrieval augmented generation without retraining the model."
    facts: [kb]
  - id: bedrock-066
    q: "Which AWS databases can store embeddings for an Amazon Bedrock knowledge base?"
    a: "Amazon Aurora and Amazon OpenSearch Service are among the supported options."
    facts: [vector-stores, kb-vector-stores]
---
Retrieval augmented generation (RAG) gives a model the facts it needs at question time: find the relevant passages in your data and put them in the prompt. Amazon Bedrock Knowledge Bases runs that pipeline for you, from ingestion to citations.

### How it works

1. **Ingest:** documents (often in Amazon S3) are parsed, split into chunks, embedded and stored in a vector store.
2. **Retrieve:** the user's question is embedded, and the vector store returns the most similar chunks.
3. **Augment:** the chunks are added to the prompt as context.
4. **Generate:** the model answers from that context, with citations back to the sources.

| Vector store option | Note |
|---|---|
| Amazon OpenSearch Service (Serverless) | Recommended vector database for Bedrock |
| Amazon Aurora PostgreSQL, Amazon RDS for PostgreSQL | pgvector extension |
| Amazon Neptune Analytics | Graph data with vectors |
| Amazon DocumentDB, Amazon MemoryDB | Vector search on existing data |

### Exam cues

- If the question says answers from private or frequently changing documents without retraining, think RAG with Bedrock Knowledge Bases.
- If the question says reduce hallucinations with company data, think RAG grounding.
- If the question says show sources for each answer, think citations from RetrieveAndGenerate.
- If the question says store embeddings or vector search, think OpenSearch Service, Aurora/RDS PostgreSQL with pgvector, or Neptune.
- If the question says cost-optimized durable vector storage for a knowledge base, think Amazon S3 Vectors; for GraphRAG, think Neptune Analytics.

### Remember

- RAG = retrieve, augment, generate; the model's weights don't change.
- Chunk, embed, index at ingestion; embed the query and search at runtime.

> **Trap:** RAG isn't fine-tuning. When the data changes often, RAG keeps answers current; fine-tuning would need retraining for every update.
