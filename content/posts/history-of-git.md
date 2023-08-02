---
slug: "history-of-git"
title: "A brief history of git OR version control systems"
date: 2023-08-02T13:15:28+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git', 'history']
keywords: ['git', 'history', 'version control systems', 'vcs', 'linux']
description: "How did version control systems evolve? Here is a brief history of how present version
control systems and git took shape."
summary:
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

Git is the most popular version control system in the world. When developers think of version
control, they think **Git**. Heck, I could go as far as to say that some developers may not know the
term **version control**, but have used **git**.

In this post I try to answer these questions: How did **git** or the present day version control system evolve? What is its history?
What methods did developers follow before git came along?

## Copy and Paste
The crudest form of version control that one can think of is the **"copy and paste"** method. You
copy your files into another directory and modify the original files. You may also label the
"version-directories" with versions to be able to fetch the right version when needed.

Quite evidently, this method is error prone. You may copy the wrong files, modify the wrong files,
etc.

Hence, a dedicated version control system (VCS) tool was developed. The earliest version was a local
VCS.

## Local version control system
This tool maintained a local database (called a **version database**) which stored the changes made to version-controlled file. It
worked by storing the patches (changes) that were made to a file from one version to next. When one
needed to revert a file to a previous version, it could re-create the file by adding up all the
patches upto the desired version.

{{< figure src="/images/local-vcs.png" caption="Local Version Control System. [Credit](https://git-scm.com/)" width="450" >}}

One of the most popular local VCS tool was [Revision Control System
(RCS)](https://www.gnu.org/software/rcs/).

However, one of the major issues with this tool was that you could not collaborate with other
developers owing to the fact that the database was local to a developer and could not be accessed by
others.

So, Central Version Control Systems (CVCS) emerged.

## Central Version Control System (CVCS)
The main difference between a CVCS and a local VCS is that the database is centralized in a server and shared
between all the developers.

{{< figure src="/images/cvcs.png" caption="Central Version Control System. [Credit](https://git-scm.com/)" width="450" >}}

An experienced developer will immediately identify the problem with this system. It is an easy
candidate for **single point of failure**. If the central server goes down or gets corrupted (fails
for any reason), your team could lose:
- All the history of your project
- Ability to collaborate or pull previous versions until the server comes back up.

{{< callout type="warning" >}}
If you are thinking that the chances of your server failing are very low when you rent it from a
reliable vendor like AWS - Think again!

AWS guarantees minimum 99.5% uptime for its EC2 instances - _[AWS EC2
SLA](https://aws.amazon.com/compute/sla/#:~:text=100%25-,Instance%2DLevel%20SLA,-For%20each%20individual)_. This means:
- ~7 minutes of downtime in a day
- ~3 hours of downtime in a month
- ~43 hours of downtime in a year
{{< /callout >}}

The solution to this problem is a VCS which stores copies of the database in multiple systems.

## Distributed Version Control System (DVCS) - Git
**Git** is an example of DVCS. There are others, too, like Mercurial, Bazaar, etc.

If you have ever worked with git, you may have cloned a repository. When you cloned a repository,
you may have noticed that in addition to the latest snapshot of the repository, you also receive all
information about the repository's version history (commit logs).

Essentially, in addition to the remote server 
(eg: Github, Bitbucket, etc.), **git** stores the version database in your local machine as well.
Every clone is actually a full backup of the version database.

So, in case the central server goes down, the version history can be restored by copying any of the
multiple local copies present in the developers' computers.

{{< figure src="/images/dvcs.png" caption="Distributed version control system. [Credit](https://git-scm.com/)" width="450" >}}

## Development of Git
In 2002, Linux kernel project used to use a proprietary DVCS called **BitKeeper**. In 2005, the
relationship between the Linux development community and the company owning BitKeeper soured,
leading to the tool being switched from free-to-use to paid.

This prompted the Linux development community (led by **Linus Torvalds**, the creator of Linux) to
develop their own tool - **Git**.

The goals set during the development of **git** were:
- Speed
- Simple design
- Strong support for non-linear development (thousands of parallel branches)
- Fully distributed
- Able to handle large projects efficiently.

## Final words
Git is probably the most widely used tool by developers. Version control is ubiquitous. Yet, we know
very little about its evolution, its architecture, etc.

This is just another chapter in my endeavour to explore [git](/tags/git).

## Sources
- [https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)
