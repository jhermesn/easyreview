---
title: Nova models
level: foundational
order: 10
facts:
  - id: categories
    text: "Amazon Nova models come in three categories: understanding, creative and speech."
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: micro
    text: Amazon Nova Micro is a text-only model with the lowest latency at very low cost.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: lite
    text: Amazon Nova Lite is a very low-cost multimodal model that processes image, video and text inputs quickly.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: pro-premier
    text: Amazon Nova Pro is a multimodal model with the best combination of accuracy, speed and cost for a wide range of tasks, and Amazon Nova Premier is the most capable multimodal model for complex tasks.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: canvas-reel
    text: Amazon Nova Canvas generates images and Amazon Nova Reel generates videos, both from text and image inputs.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: sonic
    text: Amazon Nova Sonic understands and generates conversational speech, taking speech in and returning speech with text transcriptions.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#nova-model-categories
  - id: context
    text: In Nova version 1, Nova Micro has a 128K-token context window, Nova Lite and Nova Pro 300K, and Nova Premier 1M.
    source: https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html#understanding-model-specs
  - id: nova2
    text: Amazon Nova 2 adds new models with up to 1 million tokens of context and extended reasoning.
    source: https://docs.aws.amazon.com/nova/latest/nova2-userguide/what-is-nova-2.html
  - id: nova2-models
    text: "Amazon Nova 2 includes Nova 2 Lite (text, image, video and document input with text output, for fast, cost-efficient high-volume use), Nova 2 Sonic (speech in and out) and Nova Multimodal Embeddings (embeddings from text, images, documents, video and audio)."
    source: https://docs.aws.amazon.com/nova/latest/nova2-userguide/what-is-nova-2.html#model-families
  - id: canvas-editing
    text: "Nova Canvas edits images with a mask: inpainting replaces the content inside the masked region, and outpainting changes the area outside it, for example to replace a background."
    source: https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html#image-generation
  - id: canvas-watermark
    text: "Nova Canvas adds an invisible watermark to every generated image, and watermark detection can confirm whether an image came from an Amazon Nova model."
    source: https://docs.aws.amazon.com/nova/latest/userguide/image-generation.html#image-generation
cards:
  - id: nova-001
    q: A chatbot only handles text and needs the fastest, cheapest responses. Which Amazon Nova model fits?
    a: Amazon Nova Micro, the text-only, lowest-latency model.
    facts: [micro]
  - id: nova-002
    q: An app must answer questions about product photos and short videos at very low cost. Which Amazon Nova model fits?
    a: Amazon Nova Lite, a low-cost multimodal model for text, image and video inputs.
    facts: [lite]
  - id: nova-003
    q: A marketing team wants to generate short promotional video clips from text and image prompts. Which Amazon Nova model fits?
    a: Amazon Nova Reel. (Nova Canvas generates images.)
    facts: [canvas-reel]
  - id: nova-004
    q: Which Amazon Nova model generates images from text descriptions?
    a: Amazon Nova Canvas.
    facts: [canvas-reel]
  - id: nova-005
    q: A voice assistant must hold natural spoken conversations. Which Amazon Nova model fits?
    a: Amazon Nova Sonic, the speech-to-speech model.
    facts: [sonic]
  - id: nova-006
    q: Can Amazon Nova Micro analyze an uploaded image?
    a: "No. Nova Micro is text-only; Nova Lite, Pro and Premier accept images and video."
    trap: true
    facts: [micro, lite, pro-premier]
  - id: nova-007
    q: "A semantic search application must find matches across text, images, video and audio with one embedding model. Which Amazon Nova model fits?"
    a: "Amazon Nova Multimodal Embeddings, which turns text, images, documents, video and audio into embeddings for semantic search and similarity matching."
    facts: [nova2-models]
  - id: nova-008
    q: "A marketer wants Nova Canvas to keep a product photo but replace everything behind the product. Which editing mode fits?"
    a: "Outpainting, which regenerates the area outside the masked subject. Inpainting changes only the area inside the mask."
    facts: [canvas-editing]
  - id: nova-009
    q: "What does Amazon Nova Canvas add to every generated image to help identify its origin?"
    a: "An invisible watermark that watermark detection tools can check."
    facts: [canvas-watermark]
---
Amazon Nova is Amazon's own model family in Amazon Bedrock. Pick by modality and size: Micro for fast text, Lite and Pro for multimodal understanding, Premier for the hardest tasks, Canvas and Reel to create images and video, and Sonic for speech.

### How it works

| Model | Input | Output | Best for |
|---|---|---|---|
| Nova Micro | Text | Text | Lowest latency and cost |
| Nova Lite | Text, image, video | Text | Low-cost multimodal |
| Nova Pro | Text, image, video | Text | Balance of accuracy, speed, cost |
| Nova Premier | Text, image, video | Text | Most complex tasks |
| Nova Canvas | Text, image | Image | Image generation |
| Nova Reel | Text, image | Video | Video generation |
| Nova Sonic | Speech | Speech and text | Voice conversations |

### Exam cues

- If the question says text only, fastest and cheapest, think Nova Micro.
- If the question says images or video as input at low cost, think Nova Lite.
- If the question says generate images, think Nova Canvas; generate video, think Nova Reel.
- If the question says spoken conversation, think Nova Sonic.
- If the question says one Nova model for embeddings across text, images, video and audio, think Nova Multimodal Embeddings.

### Remember

- Three categories: understanding, creative, speech.
- Nova 2 adds models with up to 1 million tokens of context and reasoning.

> **Trap:** Nova Canvas and Nova Reel create media; they aren't the models to describe an image. For understanding images, use Lite, Pro or Premier.
