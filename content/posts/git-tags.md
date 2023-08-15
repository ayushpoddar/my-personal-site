---
slug: "git-tags"
title: "Introduce checkpoints in your code - Learn how to use tagging in Git"
date: 2023-08-15T13:08:53+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'tagging']
description: Git tags are like checkpoints in your repository's history. Learn how to create them, list them and view their details.
showToc: true
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

Tags in Git can be likened to checkpoints of a game. You can tag points in a repository's history
that are important to you. Typically, tags are used to mark release versions like `v1.0.0`, `v2.0.0`, etc.

Tags are associated with a specific commit in your repository. In other words, after you create a
commit, you can tag that commit with any name of you liking - e.g., `v1.0.0`, `v2.0.0`, etc.

In this post, I am going to tell you about the two types of tags in Git and how to create them.

## Types of tags
There are two types of tags in Git:
1. Lightweight
2. Annotated

### Lightweight tags
These tags are simply pointers to a commit. You can think of them as "bookmarks" to a commit. They
cannot store any metadata apart from the name of the tag itself. As a best practice, these tags are
generally used for temporary bookmarking and private use.

The command to create a lightweight tag is:

```bash
git tag <tagname>
```

where `tagname` can be anything that you want.

### Annotated tags
Annotated tags are stored as independent objects in the Git database, with its own SHA1 hash, and
metadata. They are capable of storing metadata such as author of the tag, email of the tagger, date
of tagging and a message describing the tag. The command to create an annotated tag is:

```bash
git tag -a <tagname> -m <message>

# Example
git tag -a v1.0.0 -m "App is open to the public now"
```

If you provide a message using the `-m` flag, then you don't even need to provide the `-a` flag. You
can just do: `git tag <tagname> -m <message>`

Annotated tags are useful when you want to push the tag to the public domain. They are useful
because they can hold metadata like tagger's name and date of tagging. This information can help,
for example, when trying to track the root cause of a bug.

## Can a tag only point to the latest commit?
No. You can also create a tag that points to a previous commit. Consider the following git log:

```text
305e248 - Ayush Poddar, 10 weeks ago : refactor: split into two methods
6f7f4ab - Ayush Poddar, 10 weeks ago : modify the instance doubles ensuring green specs
fe59bb7 - Ayush Poddar, 10 weeks ago : add logic to show different color for hidden files/directories
4f1333f - Ayush Poddar, 10 weeks ago : add colors for hidden files/directories
1e1f10c - Ayush Poddar, 10 weeks ago : modify indentations
28c188b - Claudio Bley, 3 months ago : Merge pull request #594 from ayushpoddar/show-abs-path-xargs
44c370b - Ayush Poddar, 3 months ago : Revert "version bump"
```

What if we want to create a tag that points to commit `1e1f10c` (modify indentations)? You can
simply add the commit hash (`1e1f10c`) at the end of the `git tag` command. So the command would
look like this:

```bash
# Lightweight tag
git tag <tagname> 1e1f10c

# Annotated tag
git tag -a <tagname> -m <tag message> 1e1f10c
```

## Viewing details of a tag
To view details of a tag, you can use the `git show` command. The command is:

```bash
git show <tagname>
```

The output differs slightly for lightweight and annotated tags. In case of lightweight tags, only
the associated commit's information is displayed. The sample output is shown below.

```diff
commit 305e2486f4431fc7e0487423f90ed380852194b2
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Wed Jun 7 18:00:34 2023 +0530

    refactor: split into two methods

diff --git a/lib/colorls/core.rb b/lib/colorls/core.rb
index b558968..f5f7707 100644
--- a/lib/colorls/core.rb
+++ b/lib/colorls/core.rb
@@ -416,20 +416,32 @@ module ColorLS
 
     def options(content)
       if content.directory?
-        key = content.name.downcase.to_sym
-        key = @folder_aliases[key] unless @folders.key? key
-        key = :folder if key.nil?
-        color = content.hidden? ? @colors[:hidden_dir] : @colors[:dir]
-        group = :folders
+        options_directory(content).values_at(:key, :color, :group)
       else
-        key = File.extname(content.name).delete_prefix('.').downcase.to_sym
-        key = @file_aliases[key] unless @files.key? key
-        color = file_color(content, key)
-        group = @files.key?(key) ? :recognized_files : :unrecognized_files
-        key = :file if key.nil?
+        options_file(content).values_at(:key, :color, :group)
       end
+    end
+
+    def options_directory(content)
+      key = content.name.downcase.to_sym
+      key = @folder_aliases[key] unless @folders.key?(key)
+      key = :folder if key.nil?
+
+      color = content.hidden? ? @colors[:hidden_dir] : @colors[:dir]
+
+      {key: key, color: color, group: :folders}
+    end
+
+    def options_file(content)
+      key = File.extname(content.name).delete_prefix('.').downcase.to_sym
+      key = @file_aliases[key] unless @files.key?(key)
+
+      color = file_color(content, key)
+      group = @files.key?(key) ? :recognized_files : :unrecognized_files
+
+      key = :file if key.nil?
 
-      [key, color, group]
+      {key: key, color: color, group: group}
     end
 
     def tree_contents(path)
```

In case of annotated tags, additional metadata such as tagger name, tagging date, etc. are also displayed. A sample output is given below. Notice the metadata displayed above the commit information.

```diff
tag annotated-tag
Tagger: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Tue Aug 15 13:38:36 2023 +0530

This is the sample tag

commit 305e2486f4431fc7e0487423f90ed380852194b2
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Wed Jun 7 18:00:34 2023 +0530

    refactor: split into two methods

diff --git a/lib/colorls/core.rb b/lib/colorls/core.rb
index b558968..f5f7707 100644
--- a/lib/colorls/core.rb
+++ b/lib/colorls/core.rb
@@ -416,20 +416,32 @@ module ColorLS
 
     def options(content)
       if content.directory?
-        key = content.name.downcase.to_sym
-        key = @folder_aliases[key] unless @folders.key? key
-        key = :folder if key.nil?
-        color = content.hidden? ? @colors[:hidden_dir] : @colors[:dir]
-        group = :folders
+        options_directory(content).values_at(:key, :color, :group)
       else
-        key = File.extname(content.name).delete_prefix('.').downcase.to_sym
-        key = @file_aliases[key] unless @files.key? key
-        color = file_color(content, key)
-        group = @files.key?(key) ? :recognized_files : :unrecognized_files
-        key = :file if key.nil?
+        options_file(content).values_at(:key, :color, :group)
       end
+    end
+
+    def options_directory(content)
+      key = content.name.downcase.to_sym
+      key = @folder_aliases[key] unless @folders.key?(key)
+      key = :folder if key.nil?
+
+      color = content.hidden? ? @colors[:hidden_dir] : @colors[:dir]
+
+      {key: key, color: color, group: :folders}
+    end
+
+    def options_file(content)
+      key = File.extname(content.name).delete_prefix('.').downcase.to_sym
+      key = @file_aliases[key] unless @files.key?(key)
+
+      color = file_color(content, key)
+      group = @files.key?(key) ? :recognized_files : :unrecognized_files
+
+      key = :file if key.nil?
 
-      [key, color, group]
+      {key: key, color: color, group: group}
     end
 
     def tree_contents(path)
```

## Listing tags
To list all tags in a repository, you can use the `git tag` command _(without any arguments)_. You
can also supply the `--list` (`-l`) flag which takes an optional argument.

Using `git tag --list`, as it is, will also list all the tags just like `git tag` would. The sample
output of running `git tag --list` or `git tag` is shown below.

```text
v1.0.0
v1.0.1
v1.0.2
v1.0.3
v1.0.4
v1.0.5
v1.0.7
v1.0.8
v1.0.9
v1.1.0
v1.1.1
v1.2.0
v1.3.0
v1.3.1
v1.3.2
v1.3.3
v1.4.0
v1.4.1
v1.4.2
v1.4.3
v1.4.4
v1.4.5
v1.4.6
```

### How to filter the tags by their name?
You can provide an argument to the `--list` flag to filter the tags. The argument needs to be the
pattern that you want to filter by. The pattern can be the exact string to match or a [shell
wildcard](https://linuxhint.com/bash_wildcard_tutorial/). For example, if we want to view only those
tags which start with "v1.0", we can do:

```bash
$ git tag --list 'v1.0.*'

# Output
v1.0.0
v1.0.1
v1.0.2
v1.0.3
v1.0.4
v1.0.5
v1.0.7
v1.0.8
v1.0.9
```

### How to filter for multiple patterns?
The `--list` flag can also take multiple arguments. In such a case, all tags which match **any** of
the provided patterns will be listed. For example, if we want to list all tags which start with
"v1.0", along with the tags which start with "v1.4" we can do:

```bash
$ git tag --list 'v1.0.*' 'v1.4.*'

# Output
v1.0.0
v1.0.1
v1.0.2
v1.0.3
v1.0.4
v1.0.5
v1.0.7
v1.0.8
v1.0.9
v1.4.0
v1.4.1
v1.4.2
v1.4.3
v1.4.4
v1.4.5
v1.4.6
```

## Conclusion
In this post, you learned about Git tags and the different types of tags supported by it. You also
learned:
- how to create tags
- view details of a specific tag
- List all the tags and filter them by their name

## References
- [This stackoverflow answer](https://stackoverflow.com/a/4971817/6212985)
- [https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag#:~:text=Annotated%20tags%20store%20extra%20meta,quick%20links%20to%20relevant%20commits.)
- [https://git-scm.com/book/en/v2/Git-Basics-Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [https://git-scm.com/docs/git-tag](https://git-scm.com/docs/git-tag)
