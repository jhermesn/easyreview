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
---
Retrieval augmented generation (RAG) gives a model the facts it needs at question time: find the relevant passages in your data and put them in the prompt. Amazon Bedrock Knowledge Bases runs that pipeline for you, from ingestion to citations. [Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)

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

### Remember

- RAG = retrieve, augment, generate; the model's weights don't change.
- Chunk, embed, index at ingestion; embed the query and search at runtime.

> **Trap:** RAG isn't fine-tuning. When the data changes often, RAG keeps answers current; fine-tuning would need retraining for every update.
