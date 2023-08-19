---
slug: "interactive-git-rebasing"
title: "Interactive Git Rebasing"
date: 2023-07-31T09:30:54+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git', 'git-rebase', 'interactive']
description: Rebase your git branch with more control using the interactive mode
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

In the previous posts, I have discussed the standard way of rebasing a branch. I showed that you can
[alter the base of your feature branch]({{% relref "git-rebase-intro.md" %}}) using the `git rebase
<baseBranch>` command. Then, I showed you that `baseBranch` [can be anything like commit ID, branch,
etc]({{% relref "git-rebase-possibilities.md" %}}).

## More power in your hands - Interactive mode
The standard rebase command blindly moves all your commits to the new base. Whereas, the interactive
mode gives you greater control by offering you the opportunity to alter each individual commit after
they have been moved to the new base. The command for invoking the interactive mode is _(note the
`-i` flag, which stands for "interactive")_:

```sh
git rebase -i <baseBranch>
```

After rebasing your commits onto the new base just like the standard `git rebase` command, it opens
your editor where you can alter the individual commits using certain commands. The `git-rebase-todo` file opened in the
editor lists the rebased commits from older to newer commit.

{{< figure src="/images/rebase-screenshot.png" caption="Screenshot of the editor in interactive mode of git-rebase" width="600" >}}

As you can see in the screenshot above, the UI is very helpful in the sense that it lists all
commands that you can use. All you need to do is prefix the desired command to each commit. 

For example: the fourth commit is prefixed by `squash` in
the screenshot above. After you are done specifying the commands, you can save the file and close
the editor, which will trigger `git-rebase` to run the commands.

{{< callout type="note" >}}
By default, each commit is prefixed by the `pick` command.
{{< /callout >}}

{{< callout type="info" >}}
The commands are executed one by one from the top. In the screenshot above, it will run the
`pick` command on the commit: "Shorts No. 1". Next it will run the `pick` command on the commit:
"Shorts No. 2" and so on.
{{< /callout >}}

### What are the commands available?
All the possible commands are listed out in the `git-rebase-todo` file opened by the interactive
mode. Here are some of the most used commands with their explanations:
1. `pick`: This is the default command. It leaves the commit untouched. The commit will stay
   as-it-is in the commit history.
2. `drop`: It discards the commit from the commit history. Any changes made as part of this commit
   will be discarded.
3. `squash`: It keeps the changes of the commit in the commit history, but the commit is squashed
   (combined) into the previous commit. Essentially, you can use it to combine changes made by two
   commits into one commit.

There are a few more commands that are available for use, but in order to keep this post brief, I
will discuss them in a future post.

## Final words
Interactive rebasing is a powerful tool that provides you precise control over the commit history,
which can be used to rewrite a cleaner and more understandable commit history, making collaboration and
debugging easier.

## Sources
- [https://www.atlassian.com/git/tutorials/rewriting-history](https://www.atlassian.com/git/tutorials/rewriting-history)
- [https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
