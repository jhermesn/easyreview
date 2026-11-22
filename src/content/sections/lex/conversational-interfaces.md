---
title: Conversational interfaces
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Lex V2 builds conversational interfaces for applications using voice and text, with natural language understanding (NLU) and automatic speech recognition (ASR).
    source: https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html#what-is
  - id: no-expertise
    text: Amazon Lex needs no deep learning expertise; you define the basic conversation flow in the console and Lex manages the dialog.
    source: https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html#what-is
  - id: channels
    text: Lex chatbots can be added to mobile devices, web applications and chat platforms.
    source: https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html#what-is
  - id: intents
    text: "A Lex intent is an action the user wants to perform; it has a name, sample utterances showing how users ask for it, and a fulfillment, usually an AWS Lambda function."
    source: https://docs.aws.amazon.com/lexv2/latest/dg/how-it-works.html#how-it-works
  - id: slots
    text: "Slots are the parameters an intent needs; Lex prompts the user for each required slot value before it fulfills the intent, and each slot has a built-in or custom slot type."
    source: https://docs.aws.amazon.com/lexv2/latest/dg/how-it-works.html#how-it-works
  - id: kendra-search
    text: "Amazon Lex V2 can use AMAZON.KendraSearchIntent to search documents indexed by Amazon Kendra."
    source: https://docs.aws.amazon.com/lexv2/latest/dg/built-in-intent-kendra-search.html
cards:
  - id: lex-001
    q: A company wants a chatbot on its website that understands customers' typed and spoken questions. Which AWS service fits?
    a: Amazon Lex, which builds conversational interfaces with voice and text.
    facts: [purpose, channels]
  - id: lex-002
    q: Which two capabilities does Amazon Lex combine for voice bots?
    a: Automatic speech recognition (ASR) and natural language understanding (NLU).
    facts: [purpose]
  - id: lex-003
    q: Does a team need machine learning experts to build a bot with Amazon Lex?
    a: No. You define the conversation flow in the console and Lex manages the dialog.
    trap: true
    facts: [no-expertise]
  - id: lex-004
    q: "Which AWS service can build a conversational interface that accepts both voice and text?"
    a: "Amazon Lex builds conversational interfaces using speech recognition and natural language understanding."
    facts: [purpose]
  - id: lex-005
    q: "How can an Amazon Lex V2 bot search documents indexed by Amazon Kendra?"
    a: "Use AMAZON.KendraSearchIntent."
    facts: [kendra-search]
---
Amazon Lex builds chatbots and voice bots. It understands what a user means, manages the conversation, and plugs into web, mobile and chat channels.

### How it works

1. Define the intents the bot handles and the information it needs from the user.
2. Lex recognizes speech (ASR) and understands the request (NLU).
3. Lex asks follow-up questions until it has what it needs, then calls your logic.
4. Publish the bot to web, mobile or chat platforms.

### Exam cues

- If the question says a Lex bot must search indexed documents, think Amazon Kendra search intent, because it searches an Amazon Kendra index.
- If the question says chatbot or conversational interface, think Amazon Lex.
- If the question says the bot must collect details before acting, think slots of an intent fulfilled by Lambda.

### Remember

- Lex = ASR + NLU for conversations.

> **Trap:** Lex builds the conversation, not the voice. Turning text into speech is Amazon Polly.
