---
slug: "git-remote-part-2"
title: "Git Remotes for Beginners: Inspect, Rename and Remove"
date: 2023-08-14T11:57:06+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git', 'remote']
description: "Being able to inspect, rename and remove a Git remote are essential to managing your
repository's remotes. Learn how to effectively manage your Git remotes."
summary:
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

In the [previous post, I introduced you to the concept of Git remotes]({{< relref "git-remote-commands.md" >}}). I showed you that a Git repository can have more than one remote and how you can fetch data from a particular remote.

In this post, I am about to answer the following questions:
1. How do you view more details about a particular remote? The branches present in the remote, and
   how those branches map to your local branches.
2. How do you rename a remote?
3. How do you stop tracking (remove) a remote from your Git repository?

## View (Inspect) a Git remote
The command to achieve this is: `git remote show <shortname>`. For example, the sample output of running `git
remote show origin` is shown below.

```bash
* remote origin
  Fetch URL: git@github.com:ayushpoddar/colorls.git
  Push  URL: git@github.com:ayushpoddar/colorls.git
  HEAD branch: main
  Remote branches:
    color-hidden-files  tracked
    main                tracked
    show-abs-path-xargs tracked
    size-in-bytes       tracked
  Local branches configured for 'git pull':
    color-hidden-files  merges with remote color-hidden-files
    main                merges with remote main
    show-abs-path-xargs merges with remote show-abs-path-xargs
    size-in-bytes       merges with remote size-in-bytes
  Local refs configured for 'git push':
    color-hidden-files  pushes to color-hidden-files  (up to date)
    main                pushes to main                (up to date)
    show-abs-path-xargs pushes to show-abs-path-xargs (up to date)
    size-in-bytes       pushes to size-in-bytes       (up to date)
```

I want you make the following observations:
- This command outputs the full URL of the remote that the shortname is mapped to.
- The list of branches in remote have been "fetched" to your local repository.
- It lists the mapping between your local branches and remote branches. This helps you with knowing
  the remote branch that will be used when running `git pull` or `git push` on a local branch.

{{< callout type=info >}}
If you are wondering if the branch names in remote and the corresponding branch names in local can
be different, I would encourage you to read [this Github article](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository#renaming-branches).
{{< /callout >}}

## How to rename a remote shortname?
Simple command.

```bash
git remote rename <old-shortname> <new-shortname>
```

## How to remove a remote?
If you want to stop tracking a remote, you need to remove all references to the remote from your
local repository. The command to do so is:

```bash
git remote remove <shortname>

# rm is an alias for remove
git remote rm <shortname>
```

## Final words
After reading the [first post]({{< relref "git-remote-commands.md" >}}) and this post, you are
equipped enough to understand any advanced ideas or commands that you may encounter. You can explore
more on your own using `man git-remote` or `git help remote`.

## References
- [https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
