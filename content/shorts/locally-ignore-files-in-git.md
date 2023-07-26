---
slug: "locally-ignore-files-in-git"
title: "How to ignore files in git? Without changing gitignore"
date: 2023-07-26T09:59:47+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming']
keywords: ['git', 'gitignore']
description: Learn how to maintain a list of files to ignore locally in git and keep your workflow-specific files to yourself.
summary:
showToc: false
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: true
---

{{< callout type=note >}}
    {{% shorts-intro-single %}}
{{< /callout >}}

You might have a situation where you create some files in a git repository that is specific to your
workflow. For example, you might create a `tags` file that helps you to navigate in the codebase.

Naturally, you do not want to push this file to the remote repository. But, adding this file
to the repository's `.gitignore` leads to your team members unnecessarily knowing about this file.

So, is there a way to maintain a list of files-to-ignore locally?

## Git-ignoring a file locally
- Open the file `.git/info/exclude` in your editor.
- Treat this file as your personal `.gitignore`.
- Add the name of the file you wish to ignore (e.g., `tags`) to the `.git/info/exclude` file.

## Further exploration
You can use the following resources to explore further on this topic:
- [Git Ignore documentation](https://git-scm.com/docs/gitignore#:~:text=should%20go%20into%20the%20%24GIT_DIR/info/exclude%20file)

## Sources
- [https://luisdalmolin.dev/blog/ignoring-files-in-git-without-gitignore/](https://luisdalmolin.dev/blog/ignoring-files-in-git-without-gitignore/)

