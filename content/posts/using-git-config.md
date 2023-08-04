---
slug: "using-git-config"
title: "Getting started with git-config"
date: 2023-08-05T09:36:11+05:30
author: 'Ayush Poddar'
tags: ['shorts', 'git', 'programming']
keywords: ['git', 'configuration', 'git config']
description: "How does Git manage configurations? What are the CLI flags provided by git-config to
help you manage your configurations?"
showToc: false
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

If you've ever used Git, you must be aware of the command to configure Git:

```shell
git config
```

This post tries to answer the following questions: How does Git manage the configurations?
What are the command line flags that you can use with `git config` to manage your configuration?

## The Basics
Any Git configuration is basically a key-value pair. For example, to configure the user's name that
should be attached to every commit you make you need to configure the key: `user.name`. You would configure
its value using the following command.

```shell
# Setting user.name to "Alan Turing"
git config user.name "Alan Turing"
```

If you want to read the currently set value for a key, you can use the following command:

```shell
git config <key>
```

In the case of reading the value for `user.name`, we enter the following command into the shell:

```shell
git config user.name
#=> Output: Alan Turing
```

Now, you may have certain questions. I have multiple git repositories on my computer. Does this
command set the key-value pair for all the repositories? If no, then do I have re-run these
configuration setting commands for each repository (which will get tedious)?

## How does Git store the configurations?
Git stores the configuration key-value pairs in three places:
1. **System level**: These configurations are applicable to all the users on your system and thereby all their repositories.
   The configuration key-value pairs are stored in the `[path]/etc/gitconfig` file. `[path]` may
   vary from system-to-system. In my MacBook Air (2018), is was `/usr/local`. You can find out the
   value of `[path]` in your system using the command: `git config --system --list --show-origin`.
   By the end of the post, you will be able to make sense of this command.
2. **Global level**: These configurations are applicable to you (the current user). It affects all
   the repositories you have. The configuration key-value pairs are stored either in `~/.gitconfig`
   or `~/.config/git/config`. You can find the file for this by using the command: `git config
   --global --list --show-origin`. By the end of the post, you will be able to make sense of this command.
3. **Repository (local) level**: These configurations are applicable to only the repository for
   which they have been set, i.e., they are local to a particular repository. As you might expect,
   the configuration key-value pairs are stored inside the repository directory itself in the file
   `[repo_path]/.git/config`. These configurations are accessed using the `--local` command line
   flag. For example: `git config --local --list`.

{{< callout type=info >}}
Git supports two more levels called `--worktree` and `--file`. I have left these levels out of the
discussion since they are rarely used. If you are interested, you can read the help file of `git
config` using `git config --help`.
{{< /callout >}}

## Setting a configuration key-value
To set a configuration at a particular level, you can use the flags `--system`, `--global` and
`--local` for system, global and local configuration levels respectively. For example, if you want
to set `user.name` to `"Alan Turing"` for every repository in your system, you can use the following
command:

```shell
git config --global user.name "Alan Turing"
```

If you don't use a flag when setting a configuration, by default Git will set it at the local
(repository) level, i.e., the following two commands are equivalent:

```shell
# These two commands have the same effect,
# when your working directory is a git repository
git config user.name "Alan Turing"
git config --local user.name "Alan Turing"
```

## Reading a configuration key
In order to read the value of a configuration set a particular level, you can specify the level
using one of the three flags: `--system`, `--global` or `--local`. For example, to read the value of
`user.name` at the global level, you can use the following command:

```shell
git config --global user.name
#=> Output: Alan Turing
```

If you don't use a flag when reading a configuration key, Git will fetch the nearest configuration
level. In other words, Git will first read the local configuration file to check if the key is
present. If the key is found, then the value configured at the local level will be returned.
Otherwise, it will check the configuration at the global level. If the key is found, then the
value configured at the global level will be returned. Lastly, it will check the system-level
configuration.

So, if you have the same configuration key configured with different values at the local level and
the global level, Git will prefer the local configuration.

The following example demonstrates the discussion on reading a configuration:

```shell
git config --global user.name "Alan Turing"
git config --local user.name "Donald Knuth"
git config user.name  # Will prefer the local configuration
#=> Output: Donald Knuth

git config --global user.name  # Read the global configuration
#=> Output: Alan Turing
```

## Delete (Un-set) a configuration
You can use the `--unset` flag to delete a configuration. As always, you can also use one of
`--system`, `--global` or `--local` flags to specify the level from which the configuration should
be deleted.

Not specifying the configuration level will default to deleting the configuration from the local
level. Command:

```shell
# Delete user.name from global configuration
git config --global --unset user.name

# Delete user.name from local configuration
# Both commands are equivalent
git config --local --unset user.name
git config --unset user.name
```

## List all the configurations
`--list` command line flag will list all the configurations. Needless to mention, you can specify
the configuration level by passing either of `--local`, `--global` or `--system` flags.

If you don't mention the configuration level, it will list the configuration at all levels.
When doing so, you may view different values for the same key. This happens because you may have the
same configuration key set to different values at two different levels.

Command to list all the configurations:

```shell
# List all configurations
git config --list

# List all configurations at the global level
git config --global --list
```

## Show origin of a configuration value
When reading a configuration value, you may be interested to know whether the value is read from the
local level or the global level or the system level. To do this, use the `--show-origin` flag. For
example:

```shell
git config --show-origin user.name
#=> Output: file:/Users/alanturing/.gitconfig   Alan Turing
```

When used with the `--list` flag, you can get the file where each configuration is stored in the
list of configurations.

```shell
git config --show-origin --list
```

{{< callout type=tip >}}
This command can be used as a hack to know where exactly Git is storing your configurations at a
particular level. For example, the following command will give you the file name where the global level
configurations are stored.

```
git config --show-origin --global --list
```
{{< /callout >}}

## Edit configuration in the editor
Instead of setting configuration one key at a time, you can also open up the editor and directly
edit one of the configuration files. Command:

```shell
# Edit the global configuration
git config --global --edit

# Not specifying the level, will default to the local level
git config --edit  # Open the local level configuration file
```

Once you are done making the changes, save the file and close the editor.

## Final words
In this post, I have told you about the basic structure followed by Git in order to manage your
configurations. Since now, you will be in a better position to decide on the best way to configure
Git to work for you.

## Sources
- [https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
