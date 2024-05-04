---
slug: "staircase-ascent"
title: "Staircase Ascent"
date: 2024-04-30T11:20:19+05:30
author: 'Ayush Poddar'
tags: ["programming"]
keywords:
description: "Analysing approaches to climbing stairs problem"
summary: "Analysing approaches"
showToc: false
showReadingTime: true
hideComments: true
enableAnimation: false
mermaid: false
draft: false
params:
    math: true
---

Consider this common leetcode problem: [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/description/). The problem statement goes something like this:

There are `n` steps in a staircase. You can take either 1, 2, or 3 steps at a time. In how many distinct ways can you climb the stairs?[^1]

The solution to this problem is pretty straight-forward. The aim of this post is not discuss the correct solution but rather discuss the importance of analysing the solution beyond the asymptotic analysis, i.e., the time and space complexity. The best solution to this problem has a linear time complexity and a constant space complexity, but I want to analyse the approaches where the time complexity is in the order of \(O(2^n)\).

## Basic Approach

As an example consider a staircase with 5 steps `(n = 5)`.
{{< figure src="https://d32g573a6sduc5.cloudfront.net/images/first.png" width="400" caption="\"Stairing\" into the abyss" >}}

From the initial position, you can either go to **step 1** or **step 2** or **step 3**.
{{< figure src="https://d32g573a6sduc5.cloudfront.net/images/first-step.png" width="600" caption="The first step (or leap)" >}}

Essentially, now the problems breaks down into the sum of three sub-problems:
1. Number of ways you can get to **step 5** from **step 1**. _Or_, the number of ways you can climb a 4-step staircase `(n = 4)`.
2. Number of ways you can get to **step 5** from **step 2**. _Or_, the number of ways you can climb a 3-step staircase `(n = 3)`.
3. Number of ways you can get to **step 5** from **step 3**. _Or_, the number of ways you can climb a 2-step staircase `(n = 2)`.

Mathematically speaking, if the function \(f(n)\) is defined as the number of ways you can climb a staircase of \(n\) steps, then:

$$
f(n) = f(n-1) + f(n-2) + f(n-3)
$$

A straight-forward code implementation for the same is:

```python
def basicRecursive(n):
    if n <= 2:
        # When n = 1, 2, 3; return 1, 1, 2 respectively.
        # You can climb a 0 or 1 step staircase in one way only
        # and climb a 2-step staircase in 2 ways ((1, 1) and (2))
        return (1, 1, 2)[n]
    return basicRecursive(n - 1) + basicRecursive(n - 2) + basicRecursive(n - 3)
```

## Tree based approach
Another way that this problem can be approached is by thinking in terms of a tree, where each node of the tree represents your current position on the staircase. There are three possible children from each node since you can take either 1 or 2 or 3 steps from your current position.

{{< figure src="https://d32g573a6sduc5.cloudfront.net/images/2ivc7gxas8ngb9sd.png" width="600" caption="The tree representation. [Larger representation](https://excalidraw.com/#json=jkRYUK73s3UPTmnamOfjb,k_e4S0R7AvcrpBe5ItlZjQ)" link="https://d32g573a6sduc5.cloudfront.net/images/2ivc7gxas8ngb9sd.png" target="blank" >}}

Next, you can find all the paths to the desired node (`position`). Each node (`position`) can be represented by a number, which represents your current position on the staircase. Initially, you start with `position = 0` and you need to find all possible paths to `position = n` (`position = 5` in this case).

{{< figure src="https://d32g573a6sduc5.cloudfront.net/images/5aowaiqgilxuwuad.png" width="600" caption="Tree. Nodes represented as number" >}}

This turns into a classic graph/tree problem, which you can solve either by performing a breadth-first search (BFS) or depth-first search (DFS). Implementing a depth-first search would basically replicate the recursive solution implemented earlier, with the only difference being that you would be manually managing the stack, instead of the program managing the stack in the form of call stack. The `python` implementation of a DFS solution would be:

```python
from collections import deque

def graphDFS(n):
    stack = deque()
    stack.append(0)  # start with position = 0
    count = 0
    while stack:
        x = stack.pop()  # get next position to evaluate
        if n - x <= 2:  # if current position is 0 or 1 or 2
            count += (1, 1, 2)[n - x]  # just add to count
            continue  # further evaluation not needed
        # Append the children to the stack
        stack.append(x + 1)
        stack.append(x + 2)
        stack.append(x + 3)
    return count
```

The core logic of the `basicRecursive` function has been replicated as-it-is to ensure that both functions are as equivalent as possible. Further, the breadth-first version of the solution would be:

```python
from collections import deque

def graphBFS(n):
    count = 0
    queue = deque()
    queue.append(0)  # start with position = 0
    while queue:
        x = queue.popleft()  # get next position to evaluate
        if n - x <= 2:  # if current position is 0 or 1 or 2
            count += (1, 1, 2)[n - x]  # just add to count
            continue  # further evaluation not needed
        # Push the children to the queue
        queue.append(x + 1)
        queue.append(x + 2)
        queue.append(x + 3)
    return count
```

The two functions are the same except for the usage of stack in one and queue on another.

## Footnotes
[^1]: Leetcode presents a variant of this problem where you can take only 1 or 2 steps at a time.
