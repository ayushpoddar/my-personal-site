---
slug: "limit-git-log-output"
title: "Less is more - Limit the size of your Git log output"
date: 2023-08-11T09:28:12+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'logging']
description: 'By default, git log returns all the commits. Generally, we require only a set of them.
Learn how to limit the size of your Git log output.'
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

In the [previous post]({{< relref "viewing-git-logs.md" >}}), we learned how to customise the output
of the `git log` command. That post dealt with the presentation of the logs.

When we run the `git log` command, we generally do it to answer a question that we have. Those questions can
be anything:
- When was this function last changed?
- What were the last 3 commits?
- What were the commits done by the X co-worker?
- Any other question

Essentially, log of all the commits is generally useless to us. We, often, only need a subset of
the log to find an answer to our questions. In this post, I will introduce you to some of the
options supported by `git log` that helps us limit the number of commits that are displayed.

## Show the last n commits
You can use `git log -<n>`, where `n` is any integer to show the last n commits. For example,
running `git log -3` will return the last 3 commits in the log.

## Show the commits made since X date
You can use `git log --since=<date>`, where `date` is either a specific date (like `2023-06-22` in
**YYYY-MM-DD** format) or a relative date (like `"2 days 1 hour ago"`) to show all the commits made since a certain date.
For example, running `git log --since="2 days ago"` will return all the commits made in the last 2 days.

{{< callout type="tip" >}}
I encourage you to explore `man git-log` to learn about other formats supported by the `--since` flag.
{{< /callout >}}

## Show the commits whose patch contains X string
Often times, you need to search for a commit whose patch contains a certain string. For instance, you may be
want to know which commit changed the API error message in your code.

The `-S` flag can be used to search for commits whose patch contains a certain string. In order to
view what exactly matched, this flag is best used with the
[`--patch` (`-p`)]({{< relref "viewing-git-logs.md#view-all-the-changes-associated-with-each-commit" >}}) flag.

For example, running `git log -S "error"` will return all the commits whose patch contains the
string `"error"`. The output of the command `git log -S "change" -p` is shown below. Notice the
string `"change"` in the last line of the diff output.

```diff
commit 596cb31a2d6e961ebc1fd413a384c342e19543f5
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Thu Jul 27 10:40:19 2023 +0530

    Update bat.md

diff --git a/bat.md b/bat.md
index a5c1966..6dda867 100644
--- a/bat.md
+++ b/bat.md
@@ -1 +1,3 @@
 Hello, world
+
+Making a change after removing it from index in local
```

## View the commits where a specific file(s) changed
You may be wanting to view the commits where a certain file/files was/were changed. The command looks like
this: `git log -- <filepath>`, where `filepath` can be the path to files you are investigating. The `--` (double dashes)
is used to separate the options provided to `git log` from `<filepath>`. If a list of file paths are
provided, then all the commits where **ANY one** of the files was changed is returned. It basically
acts as a **OR** matcher instead of **AND** matcher.

For example, the sample output of running `git log --stat -- ammend.md foo.txt` is shown below. I have
used the `--stat` option so that I can show you that only the commits where either `ammend.md` OR
`foo.txt` changed are outputted.

```diff
commit 1062877fc12c3b3d54ca17f539abc71ccb3cc324
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Wed Aug 9 09:47:20 2023 +0530

    some change

 foo.txt | 1 +
 1 file changed, 1 insertion(+)

commit 596cb31a2d6e961ebc1fd413a384c342e19543f5
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Thu Jul 27 10:40:19 2023 +0530

    Update bat.md

 ammend.md | 3 +++
 1 file changed, 3 insertions(+)
```

## More options
`git log` supports more options. The best way to explore them would be to use `man git-log`. Here
are some of the most common ones:

| Option            | Description                                                                  |
|-------------------|------------------------------------------------------------------------------|
| `-<n>`        | Show only the last n commits.                                                |
| `--since`, `--after`  | Limit the commits to those made after the specified date.                    |
| `--until`, `--before` | Limit the commits to those made before the specified date.                   |
| `--author`          | Only show commits in which the author entry matches the specified string.    |
| `--committer`       | Only show commits in which the committer entry matches the specified string. |
| `--grep`            | Only show commits with a commit message containing the string.               |
| `-S`                | Only show commits adding or removing code matching the string.               |

{{< callout type=note >}}
It is possible to specify more than one instance of `--grep` and `--author` search criteria. In
other words you can do this: `git log --grep foo --author Ayush --grep bar --author Candy`. In such
cases, the output will be those commits which match **ANY** of the authors provided **and** **ANY**
of the `grep` patterns.

If you want commits which match **ALL** the `grep` patterns provided, then you can use the `--all-match`
flag. For example: `git log --all-match --grep foo --grep bar` will output all commits whose commit messages
contain both `foo` **AND** `bar`.

`--all-match` only works for `--grep`. In fact, you do not need it for `--author` since any commit
will have only one author.
{{< /callout >}}

## Final words
A key part of root cause investigations is browsing your Git logs. You go through the Git logs to
figure out which exact change caused the bug and why was the change made. 

Now you are in the position to do so more efficiently. You can use a combination of the options
shown in this post and the [previous post]({{< relref "viewing-git-logs.md" >}}) to speed up your
investigations.

## Source
- [https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)
