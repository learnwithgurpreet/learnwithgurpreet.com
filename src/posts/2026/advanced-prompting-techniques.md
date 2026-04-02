---
title: Advanced prompting techniques
date: '2026-04-02'
description: Below guide will help you to identify different prompt types with examples.
tags:
  - 'AI'
  - 'Tech'
---

If you often get confused when someone ask you to use Context prompt vs. Devil's advocate prompt, you are on right place. Below guide will help you to identify different prompt types with examples.

## Context Engineering

Context engineering is the practice of providing AI with specific, relevant information to improve output quality, while prompt engineering focuses on how you phrase your request.

### Example Prompt

*Help me draft a technical proposal for implementing an agentic workflow solution for our client's customer service platform. The audience is the client's CTO and VP of Engineering who are evaluating multiple vendors. Reference the discovery meeting notes from last week where they mentioned their current response time is 4 hours and they want to reduce it to under 30 minutes, plus the competitive analysis document showing what their main competitor is doing. Keep it to 2 pages maximum and focus on our AI platform capabilities rather than general consulting services.*


## Role-Based Prompting

Without a defined role, AI produces generic responses that lack the specialized perspective and depth needed for enterprise technology decisions.

### Example Prompt

*Act as a senior technical architect who has led 15+ enterprise AI platform implementations across retail, finance, and healthcare. You're known for being pragmatic and focusing on sustainable solutions over quick fixes. I'm working on designing an agentic workflow system using Node.js and Next.js for a client's customer service automation. Can you review my proposed architecture and identify potential scalability issues I should address before development begins?*


## Devil's Advocate Prompts

AI systems are programmed to be helpful and agreeable, which means they will naturally affirm your ideas and proposals rather than question or challenge them.

### Example Prompt

*Play devil's advocate on my proposal to migrate our legacy Node.js monolith to a microservices architecture with agentic workflows. What would a skeptical CTO argue against this plan, specifically around the risks of introducing Al agents into production systems that currently handle customer transactions?*


## Few-Shot Prompting

Few-shot prompting is the technique of including concrete examples in your prompt to demonstrate the exact pattern, format, or style you want the AI to replicate.

### Style of the Prompt

A developer at X company needed AI to generate consistent commit messages for their Node.js project. Instead of writing "create brief, imperative commit messages," they showed the AI three examples: "Add user authentication middleware," "Fix memory leak in event handler," and "Update API response formatting." The AI immediately started producing commit messages in the same concise, imperative style without any additional explanation needed.


### Example Prompt

*My team at x company is launching an internal newsletter about AI platform updates where they are planning to launch "Context-Aware Code generation" flow. Following are two examples of the style I want you to follow and also apply brand guidelines for future newsletters. "Example 1: We've just rolled out semantic search across our enterprise AI platform. What does this mean for you? Instead of hunting for the exact keyword, you can now ask questions naturally and get relevant results instantly. Think of it as having a conversation with your data rather than interrogating it." "Example 2: Our agentic workflows just got smarter with multi-step reasoning. The system can now break down complex tasks into logical steps, execute them in sequence, and adapt if something changes midway. It's like having a digital teammate who actually thinks through problems with you." I want you to generate new announcement about a feature called "Context-Aware Code Generation" that helps developers write node.js and next.js code faster and understanding their project structure.*


## Iterative Refinement

Effective iterative refinement follows a three-part loop: evaluate what worked and what didn't in the output, diagnose the specific issue (whether it's tone, structure, depth, accuracy, or focus), and refine by crafting a targeted follow-up prompt that addresses that gap.

### Example Prompt

*Rewrite this documentation in a conversational tone that a frontend developer new to agentic workflows would understand.*