---
slug: "unstage-a-file"
title: "Un-stage (rm) a file in Git"
date: 2023-08-09T09:36:23+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'git', 'programming']
keywords: ['git', 'staging']
description: "If you accidentally stage a file, how do you un-stage it?"
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

You have used the [`git add` command]({{< relref "posts/git-add-versatility.md" >}}) to stage a
file. But, if you accidentally stage an undesired file (like a log file), then how do you
un-stage it?

## The git-rm command
The command will work in this manner:

```bash
git rm --cached /path/to/file
```

The `--cached` flag specifically refers to the staging area. This command un-does the effect of `git
add /path/to/file` command

## What does the command do without the flag?
You must be familiar with the plain old unix `rm` command which deletes a file from your local disk.
`git rm` is similar with some added flavor.

{{< callout type=note >}}
`git rm` does not work on newly created files. It only
works on [tracked files]({{< relref "posts/git-add-versatility.md" >}}).
{{< /callout >}}

First, lets revisit the [states of a file]({{< relref "three-states-of-git.md" >}}) in a Git repository. A tracked file can be unmodified, modified or staged before being committed.

### In case of unmodified file
`git rm /path/to/file` does two things:
1. Deletes the file from your local disk
2. Adds this change (deletion of file) to the staging area.

In essence it is equivalent to:

```bash
rm /path/to/file
git add /path/to/file
```

### In case of modified file or staged file
You need to use the `--force` (or `-f`) flag. This is a safety feature since any modification is not
saved in any of your previous version snapshots. If you run `git rm` on a modified or staged file as
it is, then Git will throw an error.

Adding the `--force` option deletes the file from your local disk and stages this change (deletion
of file).

{{< callout type=info >}}
You may have noticed that usage of `--cached` flag on staged files does not delete the files from
the local disk. It only un-stages the files.
{{< /callout >}}

## Further exploration
Run `man git-rm` in your terminal to learn more about using `git rm`.

## Sources
- [https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
