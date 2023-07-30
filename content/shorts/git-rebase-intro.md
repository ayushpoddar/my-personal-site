---
slug: "git-rebase-intro"
title: "Stop merging the main branch into your feature branch! Try rebasing"
date: 2023-07-29T16:03:17+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming', 'git']
keywords: ['git', 'rebase']
description: "Learn how to use git rebase to incorporate changes from the main branch, while keeping your feature branch clean"
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

If you have ever worked in a software development team, you must have faced a situation where a bug
fix is present in the `main` branch and you require it in your feature branch to progress.

A trivial way to solve this problem is to merge the `main` branch into your feature branch. But,
this leads to a dirty commit history in your feature branch. Your feature branch will consist of few
(or many) commits that are unrelated to your task.

## What if?
What if you could create a new branch of the `HEAD` of the `main` branch and migrate all your
feature branch commits into the new branch?

This would give you two-pronged benefits:
- You will have the bug fix in your "new" feature branch
- You will have a clean commit history in your feature branch.

## Using git-rebase
You can use the following command to get this desired result:

```
git rebase <branch-to-rebase-to>
```

Mostly, you'll be using `git rebase main`, which means that your feature branch's history will be
rewritten such that the base of your feature branch will be altered to the `HEAD` of the `main`
branch.

{{< figure src="/images/git-rebase.svg" caption="The green commits form after the rebase" width="600" >}}

### Caveat
Since this command rewrites history, you may have to use the `--force` flag when pushing your
changes in the feature branch to the remote repository.

## Sources
- [https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [https://www.atlassian.com/git/tutorials/rewriting-history](https://www.atlassian.com/git/tutorials/rewriting-history)
