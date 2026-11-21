---
title: Intelligent search
level: foundational
order: 10
facts:
  - id: what
    text: Amazon Kendra is a managed intelligent search and retrieval service that uses natural language processing and deep learning to rank documents and passages by semantic and contextual relevance instead of keyword matches.
    source: https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#what-is-kendra
  - id: sources
    text: A Kendra index ingests documents from connected data sources such as Amazon S3 and Microsoft SharePoint, so one search covers several repositories.
    source: https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#what-is-benefits
  - id: query-types
    text: Kendra answers factoid questions with a word or phrase, descriptive questions with a passage or document, and conversational keyword queries by inferring their meaning.
    source: https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#kendra-query-types
  - id: access-filtering
    text: Kendra search results can be filtered by user or group access to documents, so people see only what they are allowed to; authenticating users stays the customer's job.
    source: https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#what-is-benefits
  - id: genai-index
    text: A Kendra GenAI index serves retrieval augmented generation as well as enterprise search, and can back Amazon Q Business and Amazon Bedrock knowledge bases.
    source: https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html#what-is-kendra
  - id: availability
    text: Amazon Kendra entered maintenance mode on June 30, 2026, with no new features, and closed to new customers on July 30, 2026; AWS recommends Amazon Bedrock Managed Knowledge Base for new search applications.
    source: https://docs.aws.amazon.com/kendra/latest/dg/kendra-availability-change.html#kendra-availability-change-overview
cards:
  - id: kendra-001
    q: Employees need to ask "Where is the IT support desk?" and get an answer drawn from internal documents in S3 and SharePoint. Which AWS service was built for this?
    a: Amazon Kendra, a managed intelligent search service over company documents. It closed to new customers on July 30, 2026, so new builds use Amazon Bedrock Managed Knowledge Base.
    facts: [what, sources, query-types, availability]
  - id: kendra-002
    q: How does Amazon Kendra search differ from a keyword search engine?
    a: It ranks text by semantic and contextual relevance using NLP and deep learning, so it can answer a natural language question with a phrase, a passage or a document.
    facts: [what, query-types]
  - id: kendra-003
    q: "How does Amazon Kendra help users find relevant information in documents?"
    a: "Amazon Kendra uses natural language processing and deep learning to rank documents and passages by meaning and context."
    facts: [what]
  - id: kendra-004
    q: A team plans a new enterprise search application on AWS in late 2026. Should it start on Amazon Kendra?
    a: No. Kendra is in maintenance mode and closed to new customers on July 30, 2026. AWS recommends Amazon Bedrock Managed Knowledge Base.
    trap: true
    facts: [availability]
---
Amazon Kendra searches an organization's documents and answers questions in natural language, ranking results by meaning rather than by matching keywords.

### How it works

1. Create an index and connect data sources, such as Amazon S3 or Microsoft SharePoint, so Kendra crawls and ingests the documents.
2. Users ask a question through the search API from a website or app.
3. Kendra returns the most relevant phrase, passage or document, filtered by what that user may access.

### Exam cues

- If the question says natural language search or "find answers in our documents", think Amazon Kendra, because it is the managed intelligent document search service.
- If the question asks for a new search or RAG build after July 2026, think Amazon Bedrock Managed Knowledge Base, because Kendra closed to new customers.

### Remember

- Semantic search over connected repositories; answers factoid and descriptive questions.
- Maintenance mode since June 30, 2026; closed to new customers since July 30, 2026.

> **Trap:** Kendra finds answers in your documents. Amazon Textract extracts text from scanned documents, and Amazon Comprehend analyzes text you give it.
