---
slug: "different-remote-local-branches"
title: "How to set a different Git branch name on remote"
date: 2023-08-23T21:42:58+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git']
description: You don't necessarily need to use the same branch name when pushing it to remote. Learn how.
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

Some software development teams - who use project management tools like JIRA - enforce conventions
like naming your branches after the ticket IDs _(e.g. `T-1234`)_. This practice helps create automated
workflows and debugging. However, you might want a more descriptive branch name in your local
development workflow _(e.g. `feat-user-auth`)_.

In this post, we will be discussing how you can use different names for the same branch in your
local and remote repositories.

## How?
When we run the command `git push origin branchName`, under the hood, Git expands the command to
`git push origin branchName:branchName`. This expanded command means that the local branch named
"branchName" should be pushed to remote branch named "branchName".

So, using this as a hint, the way to use a different branch name in remote would be:

```bash
git push origin localBranchName:remoteBranchName
```

In the context of our example, the command would be:

```bash
git push origin feat-user-auth:T-1234
```

{{< callout type=info >}}
You could also add the `--set-upstream` flag to the command, so that you can directly run `git push`
next time when trying to push the changes in `feat-user-auth` to its corresponding remote branch - `T-1234`.
{{< /callout >}}

## Final words
When working in teams, having conventions for branch names is a very common practice. That does not
mean that you should be losing your freedom to have your own custom branch names. Since now, you are
in the position to have your own custom branch name while also following the conventions followed by
your development team.

## Reference
- [https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches)
