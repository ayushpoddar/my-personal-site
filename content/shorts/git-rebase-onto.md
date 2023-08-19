---
slug: "git-rebase-onto"
title: "Advanced Git Rebasing: The Powerful --onto Flag"
date: 2023-08-01T13:24:27+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git', 'git-rebase', 'onto']
description: "If you want to change the current base of your feature branch, the --onto flag should
help you."
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

Apart from the [interactive mode]({{% relref "interactive-git-rebasing.md" %}}) of `git-rebase`, you can also use the `--onto` flag to change the current
base of your feature branch.

## Command
```sh
git rebase --onto <newBase> <oldBase> <featureBranch>
```

What does it do?
------

Consider the scenario below:

{{< figure src="/images/rebase-onto-1.png" width="450" >}}

Let's say that you don't want `featureB` branch to be based off `featureA`, but you want it to be
branched off the `main` branch, as shown below:

{{< figure src="/images/rebase-onto-2.png" width="450">}}

The `--onto` flag will help you to change the base of `featureB` branch from `featureA` to `main`. The
command that you need to use will be:

```sh
git rebase --onto main featureA featureB
```

## Sources
- [https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
