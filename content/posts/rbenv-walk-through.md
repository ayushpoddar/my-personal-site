---
slug: "rbenv-walk-through"
title: "How does RBENV execute your ruby gem binary"
date: 2023-05-20T10:18:15+05:30
author: 'Ayush Poddar'
tags:
keywords:
description:
summary:
showReadingTime: true
hideComments: true
mermaid: false
draft: true
---

So, you have installed rubocop for your ruby project. To ensure that things always work as expected, you use a ruby version manager - rbenv. Now, you run the humble command in your project directory:

```sh
rubocop
```

It does its job. It shows you that there are no errors. You feel good about yourself. But, wait! You have rubocop installed in another project of yours with a different version. And when you run `which rubocop`, all you get is `~/.rbenv/shims/rubocop`.

How does rbenv know that which version of rubocop to run in your project? How does it find the right version of rubocop?

Let's walkthrough the code.

## RBENV shims

The path that we get on running `which rubocop` (`~/.rbenv/shims/rubocop`) is called a rbenv shim.
What is it? I'll let ChatGPT answer that question:
> A rbenv shim is a lightweight executable file that acts as a proxy for the actual Ruby binary. It is installed and managed by the rbenv version manager, which allows multiple versions of Ruby to be installed on the same system. The shims allow the user to easily switch between different versions of Ruby without having to modify their PATH environment variable or worry about conflicting dependencies.
-- ChatGPT

To keep it simple, you can think of it as a router which ensures that the correct version of the
actual rubocop binary is used.

