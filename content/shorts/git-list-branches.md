---
slug: "git-list-branches"
title: "Enhance the way you list Git branches with these 3 options"
date: 2023-08-20T22:37:33+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'branch']
description: Learn how to enhance your usage of git-branch to see exactly what you want to see
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

As a developer you may already be aware of the `git branch` command which is used to list all the
branches in your repository. The sample output of a `git branch` command looks like this:

```text
* color-hidden-files
  main
  show-abs-path-xargs
  size-in-bytes
```

Here, the asterisk (`*`) sign represents the current branch, i.e., the branch that the [HEAD
pointer]({{< relref "posts/git-branches-as-pointers.md" >}}) points to.

In this [short](/shorts) post, I intend to list some of the most used command line flags that can be
used with `git branch` command. These flags will help you:
1. View the last commit in each branch
2. List only merged/non-merged branches

## View the last commit in each branch
If you use the `--verbose` (`-v`) flag, you can view the last commit in each branch. The sample
output of running `-v` flag looks like this:

```text
* color-hidden-files  305e248 refactor: split into two methods
  main                28c188b Merge pull request #594 from ayushpoddar/show-abs-path-xargs
  show-abs-path-xargs 44c370b Revert "version bump"
  size-in-bytes       5f3b880 spec fix: not more than 3 lines in the spec output
```

## List only merged branches
If you want to see only those branches which have been merged into the current branch, then you need
to use the `--merged` command line flag. The output of running the command with the `--merged` flag
is similar to the output of a simple `git branch` command. However, it filters out all the branches
whose work are pending to be merged into the current branch.

{{< callout type=note >}}
You can delete the branches whose commits have been merged into the current branch, because the work
done in those branches is available in the current branch.
{{< /callout >}}

## List only non-merged branches
Similar to above, if you want to list only those branches who have some commits which are not part
of the current branch, then you can use the `--no-merged` command line flag.

## References
- [https://git-scm.com/book/en/v2/Git-Branching-Branch-Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)
