---
slug: "locally-ignore-tracked-files"
title: "How to ignore files in git? Without changing gitignore - Part II"
date: 2023-07-27T10:28:44+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming', 'git']
keywords: ['git', 'gitignore']
description: Learn how to untrack a tracked file in your local git repository
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

In the [previous post]({{% relref "locally-ignore-files-in-git.md" %}}), I mentioned that you can use `.git/info/exclude` file as your personal local `.gitignore`. However, it only works on files that are untracked, i.e., which have never been tracked using `git add`.

## How to locally ignore tracked files?
- Run this command: `git update-index --assume-unchanged <filename>`.

For example, if your filename is called `my-awesome-file.txt`, then run the command:

```git
git update-index --assume-unchanged my-awesome-file.txt
```

### Breaking down the command
- `update-index`: Ask git to update its index, that is used to track changes to existing files and
  creation of new files.
- `--assume-unchanged`: Ask git to assume that the file will be unchanged from now. Remove it
  from the index.

### Caveat
If someone else modifies the file in the remote repository:
- You will receive the updated file content after running `git pull`.
    - If you have made changes to the file before running `git pull`, git will most probably throw an
      error warning you that your local changes will be lost.
- The file will be added to the index again, and thus tracked.

## How to undo? Re-adding the file to index
```git
git update-index --no-assume-unchanged <filename>
```

## Sources
- [https://luisdalmolin.dev/blog/ignoring-files-in-git-without-gitignore/](https://luisdalmolin.dev/blog/ignoring-files-in-git-without-gitignore/)

