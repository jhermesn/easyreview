---
title: Frontend and mobile apps
level: foundational
order: 10
facts:
  - id: hosting
    text: AWS Amplify Hosting provides a Git-based workflow for hosting full-stack serverless web applications with continuous deployment.
    source: https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html#welcome
  - id: cdn
    text: Amplify deploys apps to the AWS global content delivery network (CDN).
    source: https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html#welcome
  - id: frameworks
    text: Amplify Hosting supports SSR frameworks such as Next.js and Nuxt, SPA frameworks such as React, Angular and Vue.js, and static site generators such as Hugo and Gatsby.
    source: https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html#amplify-framework-support
cards:
  - id: amplify-001
    q: A frontend team wants to deploy a React web app from Git with continuous deployment and global delivery, without managing servers. Which AWS service fits?
    a: AWS Amplify (Amplify Hosting).
    facts: [hosting, cdn, frameworks]
  - id: amplify-002
    q: Which AWS service helps create and deploy frontend web and mobile applications?
    a: AWS Amplify.
    facts: [hosting]
  - id: amplify-003
    q: Does AWS Amplify require a team to set up its own web servers to host an app?
    a: No. Amplify Hosting deploys the app to the AWS CDN with a Git-based workflow.
    trap: true
    facts: [hosting, cdn]
---
AWS Amplify is the AWS toolset for frontend web and mobile developers. Amplify Hosting deploys a full-stack app from a Git repository on every push and serves it through the AWS global CDN. [Welcome to AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html#welcome)

### How it works

1. Connect a Git repository.
2. Amplify builds and deploys on each commit (continuous deployment).
3. The app is served from the AWS global CDN.

### Exam cues

- If the question says build and deploy frontend web or mobile apps quickly, think AWS Amplify.

### Remember

- Git-based continuous deployment; global CDN; common web frameworks.

> **Trap:** Amplify is for building and hosting app frontends; running a fleet of web servers yourself is Amazon EC2 or Elastic Beanstalk.
