---
slug: "git-tags-part-2"
title: "Git Tags Continued - Share, Delete and Checkout"
date: 2023-08-16T11:22:26+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'tagging']
description: Explore operations like pushing tags, deleting tags and creating branches based off a tag in Git
summary:
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

In the [previous post introducing Git tags]({{< relref "git-tags.md" >}}), we learnt what Git tags
are, how they are created and how we can view the existing tags. By default, when we run `git push`,
Git does not push the tags you have created to the remote server (eg: [Github](https://github.com)).
We need to be explicit in our intention when we want to push the tags to the remote server.

This post will be a continuation of the [previous post]({{< relref "git-tags.md" >}}), discussing on
the following points:
- How to push tags to a remote server
- How to delete tags (locally and in the remote server)
- Create branches based off a tag

## How to push tags to a remote server
As already mentioned, merely running `git push` won't push the tags. In order to push tags to the
remote server, we need to use the `--tags` flag. Hence the command would be:

```bash
git push --tags

# In case you want to push to a different origin
git push <remote> --tags
```

{{< callout type=note >}}
Using the `--tags` flag will push both [annotated and lightweight tags]({{< relref "git-tags.md" >}}). If you want to push the [annotated tags only]({{< relref "git-tags.md" >}}), then you can use the `--follow-tags` flag instead.

There is no way to push just the [lightweight tags]({{< relref "git-tags.md" >}}).
{{< /callout >}}

## How to delete a tag
The command to delete a tag in your local Git repository is:

```bash
git tag -d <tagname>
```

### Deleting the tag in the remote server

If the tag has been pushed to the remote server before deleting it in the local Git repository, you
need to run another explicit command to delete the tag from the remote server too. The command is:

```bash
git push <remote> --delete <tagname>

# Example
git push origin --delete v1.0.1
```

{{< callout type=info >}}
There is another way to delete a tag in the remote server. The command is:
```bash
git push <remote> :refs/tags/<tagname>
```

The explanation of this command is: Push the part before the colon (`:`) to the remote tag
named `<tagname>`. In this case, the part before the colon (`:`) is **null**.
{{< /callout >}}

## How to create a branch based off a tag
The general command to create a branch is:

```bash
git checkout -b <newBranch> <reference>
```

where `reference` can be any valid Git object. Using this command, a new branch based off a tag can
be created using:

```bash
git checkout -b <newBranch> <tagname>
```

If you are looking to just explore the code that is versioned by the tag, you can also directly
checkout the tag using: `git checkout <tagname>`. Using this command puts your repository in
[detached HEAD](https://circleci.com/blog/git-detached-head-state/#what-does-detached-head-mean)
state. You can use the link provided to learn more about it. I will also be exploring it in a future
post of mine.

{{< callout type=info >}}
**TL;DR of detached HEAD**: In "detached HEAD", if you make some changes and commit them, the
changes will not belong to any branch and will be lost. The only way to reach the commit would be by
using its commit hash.
{{< /callout >}}

## Final words
My hope is that by now, you are well equipped with dealing with the basics of Git tags, and are
ready to tackle any new concepts that are thrown your way. Again, I also recommend reading my [first
post on Git tags]({{< relref "git-tags.md" >}}).

## References
- [https://git-scm.com/book/en/v2/Git-Basics-Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
