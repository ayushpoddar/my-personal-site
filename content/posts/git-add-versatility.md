---
slug: "git-add-versatility"
title: "Use the versatility of git-add to manage your next commit"
date: 2023-08-06T09:31:00+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'staging', 'tracking']
description: "Discover the versatility of the innocuous git-add as it helps you manage what goes
into your next commit"
showToc: true
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

You may have used the `git add` command. It is one of the first commands a developer runs when
initialising a new repository, or creating a commit. You may have a vague intuition of what it does. In
this post, I will try to provide structure to this intuition by exploring some of the concepts used
by Git to make `git add` work.

## Two states of files
Each file in your [working tree]({{< relref "three-states-of-git.md" >}}) can be either of these two
states: tracked and untracked.

### Tracked files
Files that were present in one of the previous snapshots (commits), as well as any newly
created files that have been staged by you. Further, tracked files can be:
1. unmodified: Files that are part of one of the previous commits, and have not been modified in the
   working tree.
2. modified: Files that are part of one of the previous commits, but have been modified in the
   working tree.
3. staged: Files that have been moved to the [staging area]({{< relref "three-states-of-git.md" >}}).

### Untracked files
Any file that is **not tracked** is said to be **untracked**, i.e., any file that is not part of a
previous commit and not in your staging area.

### Lifecycle of a file
When you clone a git repository, all the files are tracked. You will modify the files to make
something meaningful, making them **modified**. Then, you can add those modified files to the staging
area and commit all the files in the staging area.

{{< figure src="/images/git-file-lifecycle.png" caption="Lifecycle of a file in Git. [Image courtesy](https://git-scm.com)" width="550" >}}

## How to get the current state of files in your Git repository?
You can use `git status`. When you run this command and see the following output, it means that
there aren't any modified, staged or untracked files (which Git is aware of).

```bash
$ git status
On branch main
Your branch is up-to-date with 'origin/main'.
nothing to commit, working tree clean
```

`git status` gives a pretty good overview of modified files and untracked files which can be staged,
and staged files which can be committed.

## Creating untracked files and tracking them
When you create a new file, you are creating an untracked file. It will be listed under the section
**Untracked files** when you run `git status`. You can use `git add` to track the file and add it to
the staging area.

For example, if you create a new file called `untracked.json`, you can track it by running:

```bash
git add untracked.json
```

After staging the file, it is shown under the section **Changes to be committed** when you run
`git status`.

## Staging modified files
A tracked file which is modified is displayed under the section **Changes not staged for commit**
when you run `git status`.

Running `git add` on an already tracked, but modified, file just moves the file to the
staging area. For example, if you modified a tracked file - `tracked.json`, this command will add it
to the staging area:

```bash
git add tracked.json
```

{{< callout type=info >}}
As you can see, `git add` acts as a multi-purpose command. It can be used to track an untracked file
as well as stage a modified file.
{{< /callout >}}

## Modifying staged files
After staging the file `tracked.json`, if you make a change to the file again, then the file will be
listed under both the sections: **Changes to be committed** and **Changes not staged for commit**.

This means that when you perform a commit next time, only the changes made before staging will be
committed. The version currently present in the working tree will not go into the commit. This is
important to know when you are working with Git - only the changes in the staging area will go into
the next commit.

If you want to stage the new changes made to `tracked.json`, then you can re-run:

```bash
git add tracked.json
```

## Final thoughts
We have seen that the innocuous `git add` command is very versatile in its ability to handle both tracked
and untracked files. Understanding what changes will go into the next commit is essential to extract
the most out of Git.

## Sources
- [https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
