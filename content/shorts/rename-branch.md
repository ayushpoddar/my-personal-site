---
slug: "rename-branch"
title: "How to rename a Git branch (in remote too)"
date: 2023-08-22T21:51:31+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'branch', 'rename']
description: You might know how to rename a Git branch. But, do you know how to rename a remote branch too?
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

You may be working on a feature named `good-feature`. As you work on it, an inspiration strikes and
you decide to rename your feature as `unicorn-feature`. To keep things consistent, you want to rename your feature
branch from `good-feature` to `unicorn-feature`. You might already be deep into development and
pushed quite a few changes to [remote]({{< relref "posts/git-remote-commands.md" >}}).

In this post, I will tell you:
1. How to rename a branch in your local Git repository?
2. How to rename the corresponding branch in remote?

## Renaming local Git branch
The command is:

```bash
git branch --move <old-name> <new-name>
```

In our example, the command would be:

```bash
git branch --move good-feature unicorn-feature
```

## How do you rename the branch in remote too?
You simply treat the branch - with the new name - as a new branch, and push the branch to remote.

```bash
git push --set-upstream origin <new-name>
```

In our case, the command would be:

```bash
git push --set-upstream origin unicorn-feature
```

This will create a new branch in our remote (origin) named `unicorn-feature`. However, the old
branch still remains in remote. To verify, you can run `git branch --all` to list all the branches - including
the ones in remote. The next step, then, is to delete the old branch (`good-feature`) from remote.

### Deleting the old branch from remote
In an [earlier post about Git tags]({{< relref "posts/git-tags-part-2.md" >}}), I had written about the
following command:

```bash
git push <remoteName> --delete <gitReference>
```

In our case, we need to run:

```bash
git push origin --delete good-feature
```

{{< callout type=warning >}}
If the branch is being used by other collaboraters too, then be careful about renaming the branch in
remote. After the rename, they too should configure their local repositories to use the new branch.
{{< /callout >}}

## Final words
Since now, you won't be stuck with a branch name once chosen. You can always rename it later.

## References
- [https://git-scm.com/book/en/v2/Git-Branching-Branch-Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)
