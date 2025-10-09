---
title: 'Top 5 ways to structure a frontend project'
date: '2021-09-11'
description: Open-source projects you get very little chance to structure the project, but you still can set guidelines upfront
tags:
  - 'Tech'
---

While working on the open-source projects you get very little chance to structure the project, but you still can set some guidelines upfront and stick to them.

## READMe file

Readme plays a crucial role in your project. Right from new team members to new teams, it helps you to understand about project/module.

It is important to set up `README.MD` meaningfully. Below are some example sections which can be part of your README file.

### Project Title

The file should have a project/module name as a title, where people can easily relate to it.

### Explanation

Write something about the project or module, like some introduction to the project.

### Installation Guide

Provide clear installation steps so new team members can easily set up. Make sure you address Mac/Linux vs. Windows path problems and other important points like node version etc.

![carbon](/assets/images/blog/EBC7dKHqU-1024x1016.png "carbon")

Example screenshot

## .gitignore file

Every technology has its own project structure and standards. These standards help you to decide on what all project files are required and what all is actually needed only on your local machine or can be generated automatically by the build tool.

I would recommend creating a new project repository via the GUI tool on GitHub so you get the option to select the relevant `.gitignore` file.

## Github Project Board (Kanban)

Sometimes while working on an open-source personal project you get very little time to keep track of your progress. I would suggest creating a Kanban board to track your progress.

![kanban board](/assets/images/blog/cECKytumv-1024x387.png "kanban board")

Kanban board on github

## Branching strategy

`main`: Branch where you can keep your final code which includes all production code.

`release`: Branch where you can push your changes right after production release.

`feature`: On-going branch where you can push your features. However, you can create another branch `fix` for defects.

## Editor choice

My personal editor choice is VSCode since it has support for almost all languages. Not only web projects but you can also work on native projects, like Flutter or ReactNative.

Feel free to share your own project experience and the tools you are using.
