---
slug: "git-remote-commands"
title: "Git Remotes for Beginners: An Introductory Guide"
date: 2023-08-13T11:25:35+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git', 'open source', 'beginners']
description: 'Learn how to use "Git remotes" to share your code with the world, collaborate with
others, and keep your repositories up-to-date.'
showToc: true
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

{{< callout type=note >}}
{{% shorts-intro-single %}}
{{< /callout >}}

If you have read my post on [the history of Git]({{< relref "history-of-git.md" >}}), you
would know that in order to have effective collaboration, we need to have a
[version database]({{< relref "shorts/git-storage-of-versions.md" >}}) that is accessible to everyone on
the team.

You must also be aware of [Github](https://github.com/) which is a very popular service that helps
developers maintain their Git repositories online and enable easy collaboration by acting as the
central [version database]({{< relref "shorts/git-storage-of-versions.md" >}}).

In this post, I am interested in introducing you to the concept of **Git remotes**. The repository
that you have uploaded to Github is an example of a **Git remote**. It is basically a copy of your
local Git repository that is accessible to anyone you choose to share your repository with.

## There can be more than one remote

Your repository can have multiple remotes, i.e., multiple remote copies of the repository with
different read/write permissions for different users. A common case for multiple remotes is in the
world of open source projects.

Generally, contributors clone the primary project repository and maintain their own
remote copy of the repository _(ever heard of forking?)_, where they push any changes they make.
After they are sure of the changes they have made, they request the project maintainers to pull
those changes into the primary repository.

A Git remote is represented by the URL of the repository. You must have seen URLs which are of the
form `git://github.com/<username>/<repo-name>`. Since remembering URLs is difficult, Git also
allows you to assign **shortnames** that map to these URLs. By default, when you clone a Git
repository, Git assigns the shortname `origin` to the URL from where you have cloned.

## How to list all remotes?
The command `git remote` lists all the remotes associated with your repository. Without any options,
it just lists the shortnames. If you want to view the associated URLs too, then you need to use the
`--verbose` (`-v`) option. Below is the sample output of the `git remote -v` command.

```bash
origin	git@github.com:ayushpoddar/colorls.git (fetch)
origin	git@github.com:ayushpoddar/colorls.git (push)
upstream	https://github.com/athityakumar/colorls.git (fetch)
upstream	https://github.com/athityakumar/colorls.git (push)
```

## How to add a remote repository?
Apart from the default `origin` remote, you can add a remote to your repository explicitly. The
command for doing so is:

```bash
git remote add <shortname> <url>
```

The `shortname` can be anything that you choose. As an example, you can add a remote named `upstream` with the following command:

```bash
git remote add upstream https://github.com/athityakumar/colorls.git
```

In order to fetch all the information from this new remote, you could run `git fetch <shortname>`.
For example, running `git fetch upstream` in context of the above examples will output:

```bash
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Total 4 (delta 3), reused 4 (delta 3), pack-reused 0
Unpacking objects: 100% (4/4), 555 bytes | 61.00 KiB/s, done.
From https://github.com/athityakumar/colorls
 * [new branch]      disable-mfa -> upstream/disable-mfa
   d1e28ed..28c188b  main        -> upstream/main
```

You can now access upstream's main branch at `upstream/main`.

{{< callout type=warning >}}
If you try to run `git checkout upstream/main`, Git will display an elaborate warning.
I will get into the details of this warning in a later post.
{{< /callout >}}

### Does "git fetch" make any modifications?
No, it just downloads the repository data to your local repository. It does not merge any changes or
modify any of your files.

## References
- [https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
