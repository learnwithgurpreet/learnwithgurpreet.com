---
title: 'Mole - a handy tool to clean your Mac'
date: '2026-08-27'
description: 'Clean, analyze and optimize your Mac directly from the terminal.'
tags:
  - Tech
---

I recently came across [Mole](https://github.com/tw93/mole), a simple open-source CLI tool for macOS, and found it surprisingly useful.

It brings together a few things I normally need separate applications for: cleaning unnecessary files, completely uninstalling applications, analyzing disk usage and checking system resources.

Installation is as simple as:

```bash
brew install mole
```

Then just run:

```bash
mo
```

It opens an interactive menu where you can choose what you want to do.

One thing I particularly like is the `--dry-run` option. Before deleting anything, you can preview what Mole is planning to clean.

```bash
mo clean --dry-run
```

If you like keeping your Mac clean without installing another heavy utility, Mole is definitely worth checking out.

## Resources

- [Mole on Github](https://github.com/tw93/mole)
