---
slug: "token-payment-using-bills"
title: "TBD"
date: 2023-06-28T08:56:31+05:30
author: 'Ayush Poddar'
tags: ["programming"]
keywords: ["programming"]
description: "Design a token payment system"
summary: "How we implemented a fully trackable payment system"
showReadingTime: true
hideComments: true
containsAnimation: true
mermaid: false
draft: true
---

You are asked to design a payment system where your users can transfer **"tokens"** to other users on your platform. They, obviously need to purchase those **tokens** first by making a payment using their credit cards.

For example, Harry purchases 5 tokens using his credit card. Then, he transfers 3 tokens to Tony. Next, Tony transfers all the 3 tokens he received to Pepper Potts.

> For the rest of the post, we will assume that your users have the tokens that they wish to transfer. We won't be exploring the purchase of tokens, since that is out of scope for this post.

## Designing a simple token transfer system
A simple **token** transfer system involves keep track of each user's *token balance*. A transfer of
tokens simply updates the token balances of the parties involved. You may choose to keep track of
the transaction history to show to the user, but it is not essential to the functioning of your
internal wallet. 

The following animation demonstrates how the balances are updated with each transfer:

{{< pixigsap token-payment-balance-update >}}
