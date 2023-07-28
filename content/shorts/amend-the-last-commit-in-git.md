---
slug: "amend-the-last-commit-in-git"
title: "How to add new changes to most recent git commit?"
date: 2023-07-28T10:50:14+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming', 'git']
keywords: ['git', 'gitignore']
description: Learn how to add new changes to the most recent git commit; and edit its commit message
summary:
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

If you've ever used Git for version control, you may have come across a situation where you realise
that you've made a mistake in your last commit and want to fix (modify) it. You could create a new
commit with the fix or you could **modify the existing commit and keep your commit history clean**.

## How to edit your most recent (last) commit?
The git command to be used is:

```git
git commit --amend
```

### More about `git commit --amend`
This is a powerful git command which allows you to modify the most recent commit. By using this
command, you can combine any staged changes into the most recent commit.

For all you care, it edits the commit. But, under the surface, it replaces the most recent commit
with a new commit, which has the combined changes. This means that the amended commit becomes a new
entity with its own reference.

### Changing the commit message of the most recent commit
This command can also be used to change the commit message of the most recent commit. Running
the command, `git commit --amend`, will open your text editor and allow you to edit the commit
message.

Else, you can also use the `-m` flag with the new commit message, bypassing the need to open your
text editor.

```git
git commit --amend -m "A better commit message"
```

### What if there are no staged changes?
You can use this command to just edit the commit message of the most recent commit.

### Keeping the same commit message
When git opens the text editor after you run the `git commit --amend` command, you can just save and
close the editor to keep the same commit message.

Else, you can use the `--no-edit` flag to tell git to amend the most recent commit without changing its
commit message. This will tell git not to open the text editor. 

```git
git commit --amend --no-edit
```

## Final words
`git commit --amend` is a powerful tool for software developers who want to keep their git commit
history clean. A git clean history, apart from looking _clean_, also helps you navigate your
repository's history easily by showing you the relevant final changes only.

## Sources
- [https://www.atlassian.com/git/tutorials/rewriting-history](https://www.atlassian.com/git/tutorials/rewriting-history)
