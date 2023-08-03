---
slug: "three-states-of-git"
title: "The three states of Git - Looking into a typical Git workflow"
date: 2023-08-03T11:28:23+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'programming', 'git']
keywords: ['git', 'working tree', 'staging area', 'git directory', 'workflow']
description: "What does a typical workflow in Git project look like? Lets find out."
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

Continuing with my exploration of [Git](/tags/git), this post will try to formalise the knowledge
around the states of Git. As a developer, you may already be using them in your workflow.

{{< callout type=info >}}
This post refers to the term "version database" repeatedly. It simply is a database that Git maintains to
store the versions of files in your version-controlled repository. Read more about it in [this
post]({{< relref "posts/history-of-git.md" >}}).
{{< /callout >}}

## The three states
1. `modified`: This means that the file has been modified, but not committed (saved) to the version
   database.
2. `staged`: This means that you have marked the modified file in its current version to be saved to the
   version database when you make you next commit.
3. `committed`: This means that the current version of the file has been saved to the version database.

These three states give way to three sections of a Git project.

## The three sections
1. Working tree: This is a single version of your project checked out, where you can make some
   meaningful modifications to build a world-conquering application. Usually, it is the latest
   version, but you may have checked out a previous version which then becomes the working
   tree.
2. Staging area: It stores information about which modified files will be part of your next commit
   (or saved into the version database).
3. Git directory: Basically, it stores all information on your version-controlled repository,
   maintains the version database, stores any related metadata. This is the most important part of
   Git, and is duplicated when a repository is "git-cloned".

{{< figure src="/images/git-sections.png" caption="A typical Git workflow. [Image courtesy](https://git-scm.com)" width="450" >}}

## Final words
With a formalised knowledge of the three states/sections of Git, a typical Git workflow would like:
1. Modify files in the working tree.
2. Select the files you want to move to the staging area.
3. Commit - Store a snapshot of the current version permanently to the Git directory.

As I have written above, you have probably interacted with all the three states/sections of Git.
Yet, I believe it is always helpful to be aware of what exactly is going on. This builds an
appreciation for the effort put behind the development of tools, like Git.

## Sources
- [https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)
