---
title: Document text extraction
level: foundational
order: 10
facts:
  - id: detect
    text: Amazon Textract detects typed and handwritten text in documents such as financial reports, medical records and tax forms.
    source: https://docs.aws.amazon.com/textract/latest/dg/what-is.html#what-is
  - id: forms-tables
    text: Amazon Textract extracts text, forms and tables from documents with structured data through its Document Analysis API.
    source: https://docs.aws.amazon.com/textract/latest/dg/what-is.html#what-is
  - id: specialized
    text: Amazon Textract has specialized APIs for invoices and receipts (AnalyzeExpense) and identity documents (AnalyzeID).
    source: https://docs.aws.amazon.com/textract/latest/dg/what-is.html#what-is
  - id: queries
    text: "Textract Queries let you ask a natural language question about a document, such as the year-to-date gross pay, and return the answer with its confidence and location on the page."
    source: https://docs.aws.amazon.com/textract/latest/dg/queryresponse.html#queryresponse
  - id: analyze-lending
    text: "Textract Analyze Lending splits a mortgage document packet into pages, classifies each by document type and extracts and validates its information."
    source: https://docs.aws.amazon.com/textract/latest/dg/lending-document-classification-extraction.html#lending-document-classification-extraction
cards:
  - id: textract-001
    q: An insurer receives thousands of scanned claim forms and must extract the fields and tables. Which AWS service fits?
    a: Amazon Textract, which extracts text, forms and tables from documents.
    facts: [forms-tables]
  - id: textract-002
    q: Which AWS service reads handwritten text in scanned documents?
    a: Amazon Textract.
    facts: [detect]
  - id: textract-003
    q: A finance team wants totals and vendor names pulled out of receipts automatically. Which AWS service helps?
    a: Amazon Textract, with its AnalyzeExpense API for invoices and receipts.
    facts: [specialized]
  - id: textract-004
    q: Does Amazon Textract determine the sentiment of the text it extracts?
    a: No. Textract extracts text and structure; sentiment analysis is Amazon Comprehend.
    trap: true
    facts: [detect]
  - id: textract-005
    q: "An app must pull one value, the total amount due, from scanned bills of varying layouts by asking for it in plain language. Which Textract feature fits?"
    a: "Textract Queries, which answer a natural language question about the document with the value, its confidence and its location."
    facts: [queries]
---
Amazon Textract pulls text and structure out of documents. It reads printed and handwritten text and keeps form fields and tables intact, so scanned paperwork becomes data. [What is Amazon Textract?](https://docs.aws.amazon.com/textract/latest/dg/what-is.html#what-is)

### How it works

1. Send a document image or PDF, from Amazon S3 or directly.
2. Textract detects the text, plus forms and tables with Document Analysis.
3. Use specialized APIs for receipts and invoices or for identity documents.

### Exam cues

- If the question says extract text, forms or tables from scanned documents, think Amazon Textract.

### Remember

- Printed and handwritten text; forms and tables; receipts and IDs.

> **Trap:** Textract gets the words out; Comprehend works out what they mean.
