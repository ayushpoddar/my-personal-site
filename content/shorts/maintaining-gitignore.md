---
slug: "maintaining-gitignore"
title: "Use your gitignore efficiently - Learn supported patterns."
date: 2023-08-07T09:39:47+05:30
author: 'Ayush Poddar'
tags: ['programming', 'git']
keywords: ['git', 'gitignore']
description: "Learn the patterns supported by gitignore to use it efficiently and avoid weird bugs"
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

`.gitignore` is an indispensable part of any Git project. It is used to maintain a list of files/directories
that Git should not [track]({{< relref "posts/git-add-versatility.md" >}}).
Those files can be anything: build files, tmp directories, log files, etc.

You may also have used this file when working on a software development project. In this post, I
want to tell you about some of the patterns that can help you:
1. Avoid weird bugs
2. Make your `.gitignore` more efficient

For example, did you know that if your `.gitignore` file contains the following line, then all
directories in your project named `nestedDir` will be ignored. It does not matter if the directory
is in the root directory.

```gitignore
nestedDir/
```

One of the fundamental things to learn about `.gitignore` is to know that any pattern found in the
`.gitignore` file will be searched for recursively in your repository and then, ignored.

## Patterns supported
- Blank lines and lines starting with `#` are ignored. Lines starting with `#` can be considered as
  comments.
- Standard glob patterns are supported _(more on this below)_.
- Patterns starting with `/` avoid recursivity. For example, a pattern like `/rootFile` will only
  ignore the `rootFile` present in the root of the repository.
- In order to specify a directory, end the pattern with a `/`.
- Patterns starting with `!` will be negated. For example, if your `.gitignore` contains `*.log`
  (ignoring all log files) but you want to track `production.log` file specifically, you need to add
  `!production.log` to your `.gitignore`.

### Examples
```gitignore
# Ignore all log files present anywhere in the repository
*.log

# But, track the production.log file
!production.log

# Ignore the config.yaml file present in the root directory ONLY
/config.yaml

# Ignore all directories named `posts` present anywhere in the repository
posts/

# Ignore all txt files which are present directly inside manual directory
manual/*.txt

# Ignore all exe files which are present inside the bin directory and its subdirectories
bin/**/*.exe
```

You can also look up the list of good `.gitignore` [file examples here](https://github.com/github/gitignore).

## Understanding basic glob patterns
- Asterisk (`*`) matches zero or more characters. Example: `*.log` would match any file ending with
  `.log`.
- Question mark (`?`) matches one character. Example: `?.log` would match files like `1.log`,
  `p.log` but not match `test.log`.
- If you list characters inside square brackets (`[]`), it would match all files/directories containing
  any of those characters. Example: `[abc].log` will match `a.log`, `b.log`, `c.log` but not `abc.log` or `d.log`.
- Square brackets also supports ranges. So, `[12345]` is equivalent to `[1-5]`.
- Double asterisks (`**`) will match nested directories. Example: `a/**/z` will match `a/z`,
  `a/b/z`, `a/b/c/z` and so on.

## One more thing
It is not necessary to have only one `.gitignore` file per repository. You can create separate `.gitignore`
files for subdirectories. The rules in a `.gitignore` will be applied on the files under the
directory where each `.gitignore` is located.

## What's your ONE takeaway?
When I learned about these patterns, one of the biggest takeaways for me was that the rules are
applied recursively on all subdirectories. What's yours? Tell me about it on [my email](mailto:ayush.mail.id@gmail.com).

## Further exploration
Run `man gitignore` in your terminal to learn more about using `.gitignore`.

## Sources
- [https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
