---
title: AI, ML, deep learning and generative AI
level: foundational
order: 10
facts:
  - id: ai-umbrella
    text: Artificial intelligence is an umbrella term for techniques that let machines solve problems in human-like ways; machine learning and deep learning fall under it, but not all AI is machine learning.
    source: https://aws.amazon.com/what-is/artificial-intelligence/
  - id: ml
    text: Machine learning is one branch of AI that develops algorithms and statistical models which learn patterns from data instead of following explicit rules.
    source: https://aws.amazon.com/what-is/artificial-intelligence/
  - id: deep-learning
    text: Deep learning is machine learning with neural networks of many layers, which learn complex patterns in images, text and sound.
    source: https://aws.amazon.com/what-is/deep-learning/
  - id: neural-network
    text: An artificial neural network is made of artificial neurons (nodes) that process information together, loosely mirroring how the brain works.
    source: https://aws.amazon.com/what-is/artificial-intelligence/
  - id: genai-subset
    text: Generative AI is the subset of AI that creates new content such as text, images, video and audio; deep generative learning is the basis of modern generative AI and foundation models.
    source: https://aws.amazon.com/what-is/deep-learning/
  - id: branches
    text: Natural language processing interprets and generates human language, computer vision extracts information from images and video, and speech recognition turns speech into text; all three rely on deep learning.
    source: https://aws.amazon.com/what-is/artificial-intelligence/
  - id: agentic
    text: Agentic AI is an autonomous AI system that acts independently to reach a goal, planning and carrying out complex tasks without step-by-step prompting.
    source: https://aws.amazon.com/what-is/agentic-ai/
  - id: discriminative
    text: Traditional discriminative models classify data, predicting a label from features; generative models learn the distribution of the data so they can create new samples, such as animal images that were not in the training set.
    source: https://aws.amazon.com/what-is/generative-ai/
cards:
  - id: ai-ml-fundamentals-001
    q: Order these from broadest to narrowest - deep learning, artificial intelligence, generative AI, machine learning.
    a: "Artificial intelligence, then machine learning, then deep learning, then generative AI.\nEach is a subset of the one before it."
    facts: [ai-umbrella, ml, deep-learning, genai-subset]
  - id: ai-ml-fundamentals-002
    q: What makes deep learning different from other machine learning?
    a: It uses neural networks with many layers, which learn complex patterns in unstructured data such as images, text and sound.
    facts: [deep-learning, neural-network]
  - id: ai-ml-fundamentals-003
    q: Is every AI system a machine learning system?
    a: "No. AI is the umbrella term; machine learning is one branch of it.\nA rule-based expert system is AI without machine learning."
    trap: true
    facts: [ai-umbrella, ml]
  - id: ai-ml-fundamentals-004
    q: A model reads thousands of animal photos and then draws new animals that were not in its training set. Is it discriminative or generative?
    a: Generative. It learned the distribution of the data and creates new samples; a discriminative model would only label photos.
    facts: [discriminative, genai-subset]
  - id: ai-ml-fundamentals-005
    q: Which AI branch would a company use to flag inappropriate images in uploaded content?
    a: Computer vision, which extracts information from images and video.
    facts: [branches]
  - id: ai-ml-fundamentals-006
    q: What separates agentic AI from a chatbot that answers one prompt at a time?
    a: An agentic system works toward a goal on its own, planning steps and taking actions (calling tools) without a prompt for each step.
    facts: [agentic]
---
Artificial intelligence (AI) is the broad goal of making machines solve problems the way people do. Machine learning (ML) is the part of AI where a system learns from data; deep learning is ML with many-layered neural networks; generative AI uses deep learning to create new content. Picture four nested circles. [What is AI?](https://aws.amazon.com/what-is/artificial-intelligence/)

### How it works

1. **AI** covers any technique that makes a machine act intelligently, including hand-written rules.
2. **Machine learning** replaces rules with a model trained on data: the algorithm finds the patterns, and the trained model makes predictions on new data.
3. **Deep learning** uses neural networks with many layers of nodes, which can learn from images, audio and text directly.
4. **Generative AI** uses large deep learning models to produce new text, images, audio or video instead of only labeling data.
5. **Agentic AI** adds autonomy: the system plans and takes actions toward a goal, often calling tools along the way.

| Branch | Works on | Example |
|---|---|---|
| Natural language processing (NLP) | Text and language | Sentiment of reviews |
| Computer vision | Images and video | Content moderation |
| Speech recognition | Audio | Call transcripts |

### Exam cues

- If the question asks for the hierarchy, think AI > ML > deep learning > generative AI, because each is a subset of the one before.
- If the question says the model creates new content, think generative AI; if it assigns labels, think a discriminative (traditional) model.
- If the question says the system decides its next steps and uses tools on its own, think agentic AI.

### Remember

- Neural networks are layers of connected nodes; "deep" means many layers.
- Foundation models and large language models are deep generative models.

> **Trap:** "AI" and "machine learning" aren't synonyms. A system that follows fixed rules is AI but involves no learning.
