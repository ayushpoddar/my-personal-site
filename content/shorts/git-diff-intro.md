---
slug: "git-diff-intro"
title: "View the changes you have made to your Git repository - Intro to git-diff"
date: 2023-08-08T19:27:12+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'git', 'programming']
keywords: ['git', 'git-diff']
description: Learn how you can view the changes you have made to your Git repository.
showToc: false
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

{{< callout type=note >}}
{{% shorts-intro-single %}}
{{< /callout >}}

In an [earlier post]({{< relref "posts/git-add-versatility.md" >}}), we discussed how you can stage
changes that you make in your Git repository.

What if you want to view the changes you have made before staging your changes? What if you want to
view the changes that are there in the staging area before you commit your changes? In this post, I
will tell you about `git diff` which can help you with these questions.

## About the command
The command simply is:

```bash
git diff <filePath>
```

where `<filePath>` is the path to a file whose changes you want to view. The argument `<filePath>`
is optional. If you don't specify the path, `git diff` will display the changes from all the modified files.

As it is, this command will show you all the changes you have made to your
[working tree]({{< relref "three-states-of-git.md" >}}) that are ready to be staged.

### How to view the staged changes?
If you want to view the staged changes, i.e., the changes that are ready to be committed, you should
use the `--staged` (or `--cached`) command line flag.

```bash
git diff --staged
```

## Further exploration
Run `man git-diff` in your terminal to learn more about using `git diff`.

## Sources
- [https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
