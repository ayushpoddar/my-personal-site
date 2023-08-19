---
slug: "basic-git-undo"
title: "Un-stage and un-modify a file in Git - Part 2"
date: 2023-08-12T08:42:44+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'undo']
description: 'Learn how to un-stage a file, or undo all modifications made to a file in Git'
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

In a [previous post]({{< relref "unstage-a-file.md" >}}), we learned about the `git rm` command
which helps you un-stage a file, and delete any modifications made. However, the `git rm` command is
essentially meant to "delete" files, not undo them.

Git offers a dedicated command to undo modifications, or undo staging of a file. In this post, I will
introduce you to `git restore` which can be used to perform both these tasks.

{{< callout type=info >}}
Git introduced `git restore` in version 2.23.0. Earlier, the commands `git reset` and `git checkout`
were used for the same purposes. But, `git restore` was introduced as a more dedicated tool for
these specific purposes.
{{< /callout >}}

I will not cover the details of the `git restore` command since Git is very helpful with these
commands, and I think it is best for you to explore them yourself. When you run `git status`,
Git exactly tells you the commands to un-stage or undo any unstaged modifications. This is
how the output of `git status` looks like. Notice the commands mentioned for undo-ing.

```diff
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    README.md -> README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   ammend.md
```

## Fair warning
If you use `git restore <file>` to undo any unstaged modifications to a file, then you will lose all
those changes forever. Git only helps you recover changes that have ever been committed.

If you are feeling uneasy about losing those modifications forever, but still want to undo the modifications,
a better way is to use `git stash`. I will explore this command in a later post.

## Further exploration
As always, I encourage you to explore the command further using `man git-restore`.
