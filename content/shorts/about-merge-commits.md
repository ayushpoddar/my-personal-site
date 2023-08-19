---
slug: "about-merge-commits"
title: "When (and more importantly why) are merge commits created?"
date: 2023-08-20T00:28:32+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'merge']
description: "Learn the relevance of a merge commit and when are they created"
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

If you have worked with Git, you must have come across merge commits. These commits are not created
every time you merge, but only on some special scenarios. In this post, we will learn about merge
commits and when are they created. At the end of the post, I will also provide a way to avoid them.

## First, the simple fast-forward merge
Consider that you have a branch named `featureX` which diverges from the `main` branch like shown
below.

{{< figure src="/images/fast-forward-merge.png" width="600" >}}

If you try to merge `featureX` into `main` using `git merge featureX`, you will see the text
`Fast-forward` in the merge output. Git uses this merge strategy when the commit pointed to by the branch that is being
merged into - `main` in this case - is a direct ancestor of the branch that is being merged -
`featureX` in this case.

In other words, if you start following the parent starting from the commit
pointed to by `featureX` and you reach the commit pointed to by `main` after some jumps, Git will
simply move _(fast-forward)_ the `main` branch pointer to the commit pointed to by `featureX`.

{{< figure src="/images/fast-forward-merge-final.png" width="600" >}}

{{< callout type=warning >}}
I have used the `main` branch as an example. I don't mean to convey that merges can only happen into
the `main` branch. Any Git branch can be merged into any Git branch.
{{< /callout >}}

## When main branch is NOT an ancestor of your feature branch
Consider the scenario below where the `main` branch has moved ahead from the point where `featureX` diverged.

{{< figure src="/images/three-way-merge-1.png" width="600" >}}

In this case, the commit pointed to by `main` is not an ancestor of the `featureX` branch. So, Git
tries to find the common ancestor of `main` and `featureX`. Then, Git performs a three-way merge
between the common ancestor commit, the commit pointed to by `main`, and the commit pointed to by
`featureX`. It creates a new snapshot that results from this merge, and creates a "merge commit" on
the `main` branch _(or the branch being merged into)_.

{{< figure src="/images/three-way-merge-2.png" width="600" >}}

{{< callout type=note >}}
A merge commit has more than one parent.
{{< /callout >}}

## Avoiding merge commits
To avoid merge commits, you can rebase the `featureX` branch on the `main` branch. After the rebase, the commit pointed to by `main` will become an ancestor of `featureX`. In order to learn more about rebasing, I suggest you to read my [post introducing git rebase]({{< relref "shorts/git-rebase-intro.md" >}}).

## References
- [https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [https://blog.git-init.com/the-magic-of-3-way-merge/](https://blog.git-init.com/the-magic-of-3-way-merge/)
