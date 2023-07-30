---
slug: "git-rebase-possibilities"
title: "Can you rebase on just the main branch? No."
date: 2023-07-30T10:06:51+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming', 'git']
keywords: ['git', 'rebase']
description: "Your feature branch can be rebased on anything, not only a branch"
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

In an [earlier post]({{% relref "git-rebase-intro.md" %}}), I introduced you to the powerful
`git-rebase` command. The syntax for the command is:

```sh
git rebase <baseBranch>
```

## Rebase on anything
The `baseBranch` need not necessarily be a branch. It can be anything - a tag, a commit ID, relative reference
to `HEAD`, etc. 

For example, if you have a commit with ID as `e92aa98f`, you can do:

```sh
git rebase e92aa98f
```

And voila, your feature branch's base would change to this commit.

### To be noted - for next post
The commit ID can be any commit, i.e., it can also be a commit that is already part of your feature branch.
This ability to rebase on any commit is extremely useful for the purposes of rewriting history. You
will find out more about this when I explore the **interactive mode** of `git-rebase` in my upcoming
post.

## Sources
- [https://www.atlassian.com/git/tutorials/rewriting-history](https://www.atlassian.com/git/tutorials/rewriting-history)
- [https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
