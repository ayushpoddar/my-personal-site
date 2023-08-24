---
slug: "switch-to-remote-branch"
title: "Magical Git when creating a branch off a remote branch"
date: 2023-08-25T00:18:34+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git']
description: Git makes it extremely easy to create a new branch off a remote branch. Learn how it does so behind the scenes.
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

Imagine that you clone a Git repository with many branches. After the clone is successful, if
you run `git branch`, you'd see that you only have the `main` branch in your local repository.
However, the command `git branch --all` will output a list of branches prefixed by `remotes/origin/`. Here is the top 5 lines of the output when running this command on the [discourse project](https://github.com/discourse/discourse).

```text
* main
  remotes/origin/0-ansible-eggs
  remotes/origin/0-app-events-revolution
  remotes/origin/0-array-lint
  remotes/origin/0-assets-spec
```

Assuming that you want to switch to the `0-ansible-eggs` branch, you can run the following command:

```bash
git checkout 0-ansible-eggs
```

If you have read my [earlier post on Git branches]({{< relref "posts/git-branches-as-pointers.md" >}}), you'd know that `git checkout` can be used to switch to an existing branch, not to an non-existent branch. As already mentioned above, `0-ansible-eggs` does not exist in your local repository.

In this post, I will be exploring the magic that Git performs in making this short command work.

## Behind the scenes
Assume that you want to switch to the `0-ansible-eggs` (`remotes/origin/0-ansible-eggs`) branch, but
not with the same name. You may want to use a different name for the corresponding local branch,
then the command that you'd use is:

```bash
git checkout -b <localBranchName> remotes/origin/0-ansible-eggs
```

The `localBranchName` can be any name, even the same name you hated initially: `0-ansible-eggs`.

So, when you run `git checkout 0-ansible-eggs` and Git figures out that the branch `0-ansible-eggs`
does not exist _(it is not present in local)_ AND this branch is present in **only one remote**, then
Git will:
1. Automatically create the local branch with the same name
2. Set up tracking between the local branch and the remote branch
3. Switch to the local branch

In other words, Git expands `git checkout 0-ansible-eggs` into `git checkout -b 0-ansible-eggs remotes/origin/0-ansible-eggs`.

## What did you learn in this post?
You learned how the commonly used `git checkout` command works behind the scenes even when the
branch does not exist, in case of branches with the same name in remote.

## Reference
- [https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
