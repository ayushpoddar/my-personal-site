---
slug: "viewing-git-logs"
title: "Customise how you view your Git commit logs with these options"
date: 2023-08-10T16:04:08+05:30
author: 'Ayush Poddar'
tags: ['git', 'programming']
keywords: ['git', 'logging']
description: 'Git provides a number of options to customise how you view your commit logs. Learn about the
most common ones.'
showToc: true
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
---

Viewing your Git commit logs is an important part of a software development process. Git provides the
powerful `git log` to help us to do so. By default, this command displays the commit hash, author, date
and the message for each commit. But, sometimes, you may feel the need to view more details on each log,
or may be just quickly glance over the logs.

In this post, we will explore some of the most common options provided by Git for `git log` which can
be used to customise how you view your commit logs.

## View all the changes associated with each commit
Using the `--patch` (or `-p`) command line flag with `git log` displays the changes made to each
commit. The sample output of the command `git log -p` is shown below. _Notice the details of changes
shown under each commit._

```bash
commit 1062877fc12c3b3d54ca17f539abc71ccb3cc324
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Wed Aug 9 09:47:20 2023 +0530

    some change

diff --git a/foo.txt b/foo.txt
new file mode 100644
index 0000000..1a76b8a
--- /dev/null
+++ b/foo.txt
@@ -0,0 +1 @@
+Some random text

commit 596cb31a2d6e961ebc1fd413a384c342e19543f5
Author: Ayush Poddar <ayush.mail.id@gmail.com>
Date:   Thu Jul 27 10:40:19 2023 +0530

    Update bat.md

diff --git a/ammend.md b/ammend.md
new file mode 100644
index 0000000..2cb4113
--- /dev/null
+++ b/ammend.md
@@ -0,0 +1,3 @@
+To be ammended
+
+To be ammended - 2
diff --git a/bat.md b/bat.md
index a5c1966..6dda867 100644
--- a/bat.md
+++ b/bat.md
@@ -1 +1,3 @@
 Hello, world
+
+Making a change after removing it from index in local
```

## View stats associated with each commit
Viewing all the change details for each commit can get overwhelming sometimes. You may want to just
get the stats associated with each commit, i.e., view the number of lines added/deleted in each
commit. The `--stat` flag with `git log` will help you achieve this. Sample output of the command
`git log --stat` is shown below.

```bash
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
 bat.md    | 2 ++
 2 files changed, 5 insertions(+)
```

## Change the output format
The `--pretty` flag with `git log` can be used to change the format of the output. The `--pretty`
flag takes in a value which determines the format of the output.

### View each commit in a single line
The value `oneline` prints each commit in a single line. Sample output of `git log --pretty=oneline` is
given below.

```bash
1062877fc12c3b3d54ca17f539abc71ccb3cc324 some change
596cb31a2d6e961ebc1fd413a384c342e19543f5 Update bat.md
```

### Other values
There are other values as well like `short`, `full` and `fuller`. As the names suggest, they
determine how verbose your commit logs will be. I encourage you to try out each of these values by
yourself. For example: You could try out `git log --pretty=full`

### Customise the output format

You can also customise your log output as per your custom requirements by passing the value `format`
to the `--pretty` flag. The sample output of the command `git log --pretty=format:"%h - %an, %ar :
%s"` is shown below.

```bash
1062877 - Ayush Poddar, 31 hours ago : some change
596cb31 - Ayush Poddar, 2 weeks ago : Update bat.md
```

Some of the most useful specifiers for `--pretty=format` is given below:

 Specifier | Description of Output                           |
|-----------|-------------------------------------------------|
| `%H`        | Commit hash                                     |
| `%h`        | Abbreviated commit hash                         |
| `%T`        | Tree hash                                       |
| `%t`        | Abbreviated tree hash                           |
| `%P`        | Parent hashes                                   |
| `%p`        | Abbreviated parent hashes                       |
| `%an`       | Author name                                     |
| `%ae`       | Author email                                    |
| `%ad`       | Author date (format respects the --date=option) |
| `%ar`       | Author date, relative                           |
| `%cn`       | Committer name                                  |
| `%ce`       | Committer email                                 |
| `%cd`       | Committer date                                  |
| `%cr`       | Committer date, relative                        |
| `%s`        | Subject                                         |

## View the branch and merge history
The `--graph` flag displays a ASCII graph showing your branch and merge history. It is particularly
useful when used with `--pretty=oneline` option. I encourage you to try this out with different
values for `--pretty` to know why I have written so. The sample output of `git log --graph --pretty=oneline`
is shown below.

```bash
* 305e2486f4431fc7e0487423f90ed380852194b2 refactor: split into two methods
* 6f7f4ab47d0a1d8fdf86fcf9b6f27fde34f1ef1e modify the instance doubles ensuring green specs
* fe59bb7c5f7f2b69e11902dda063f5ab487e57c7 add logic to show different color for hidden files/directories
* 4f1333ff66cb6510d95d01f65997147b95a80c86 add colors for hidden files/directories
* 1e1f10c7635ea0126eadb28f8f31c8ec38a77695 modify indentations
*   28c188bbd62ba47072c26fbc1124f9e4288a7932 Merge pull request #594 from ayushpoddar/show-abs-path-xargs
|\  
| * 44c370b4c6f5b384f10a95a9bbacca627328800c Revert "version bump"
| * 414820b23bfdcf0a386614b3ad2efd2a31431c18 version bump
| * c5fdcf6e9261809e1e3e3738e85fa52f9115e5ae relevant feature spec
| * 86daeef7ec8b504085b8388da331d6b8cd5f0c87 rubocop fixes
| * 1001aa28327fd91d18e198187d93e0ca5d2cf223 refactor: DRY the fileinfo stub for spec readability
| * 4c5ef39093593d579cc861870a98d20fc1fa02b5 fix the stubs in specs
| * 688188de6f37eda67ebbffe0e996196bb073ae9b show relative filepath when argument is file
|/  
*   d1e28edcd0721ff0e082b041eba35e12ffae0af4 Merge pull request #589 from ayushpoddar/size-in-bytes
|\  
| * 5f3b8807d3865339327b68a622e81869f20cb411 spec fix: not more than 3 lines in the spec output
| * 03ebc748ad9052b88d94f24f3fc14faf804214bf add check for the new flag
| * 93fa6872c9fe4c6349644a22b7cd912010ee0473 remove --nh flag
| * d4fdd94d97c72f8b386cea21b890ce54e6081b26 justify size unit only when displaying human readable sizes
| * d11bd9241fa8e5bb241d758d9afc3e1c6b97e4a6 update the version as per semantic versioning specification
| * 346ec6c53e8ba8c6fa19e87ae85336afd3e8346f update the readme
| * 214cb436e28bc5027f968ce1aba8f4267da491d5 silence rubocop
| * 69988e1b2e602502815c8cf7ae8096c648c4537d improve the regex
| * 81ced364a4cc851be86425587dbfe419ab781e67 fix: fix failing spec due to new fixture file
| * 7eda794a07a125917a1cbf606c628f120550f2ea spec: add spec to flags spec
| * 0421206076465ab9845bf2c51e287d759d35038d rubocop fix
| * 6f5abb25a0d9e72af40b91708ccf75d6de561b6b increase the number of characters allotted to displaying size
| * e231708f30996ccd76057185e0e501a926d8c840 add support for --non-human-readable flag
* |   23a1b726792dc6d715c31d6f0213fd12ccfb8c58 Merge pull request #590 from athityakumar/dependabot/bundler/rubocop-rspec-tw-2.20.0
|\ \  
| |/  
|/|   
```

## Final words
Being able to control how the commit logs are displayed to you can help you analyse your repository
quickly and more efficiently. You may require different amount of detail in your logs at different
times depending on your use case.

After reading this post, you are in a better position to control the verbosity of your commit logs.

## Further exploration
- Play around with some of the flags mentioned in this post. Try out combinations of flags.
- You can view more [supported options here](https://git-scm.com/book/en/v2/ch00/log_options).

## Sources
- [https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)
