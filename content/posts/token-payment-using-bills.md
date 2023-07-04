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
enableAnimation: true
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

{{< pixigsap "balance-transfer.js" token-payment-balance-update >}}

## Problem #1 - Some tokens will expire; some won't
The normal flow for the internal wallet until now was that the user purchases a few tokens from the
platform. Then the user can choose to transfer a part of those tokens to other users on the
platform.

Now, a business requirement comes up that the tokens received by a user will expire in a month if
the transfer satisfies some conditions, i.e., the receiver should use those tokens within a month of
receipt.

The conditions are not essential to the idea behind the post. They can be as crazy as - *the
transfers take place in the first week of the month.*

For example, if Tony transfers 3 tokens to Pepper Potts on June 2, then Pepper must use those tokens
by July 2.

### Storing the expiration date
As clearly evident, just storing the balance will not suffice. We need multiple records now - each
representing the token balance and its corresponding expiry.

After a few people send some tokens to Pepper (*people really like her, it seems*🙃), her records
would look like this:

| Balance | Expiration Date | *Comments (not part of the database)* |
| ------ | ------- | ------- |
| 5 | `nil` | *Her initial balance - never expires* |
| 3 | July 2, 2023 | *Received from Tony on June 2* |
| 10 | July 3, 2023 | *Received on June 3 from someone* |
| 5 | July 6, 2023 | *Received on June 6 from someone* |

The following animation aptly demo-es how Pepper's balances will be updated if someone, now, sends 5 tokens on June 7.

{{< pixigsap "tokens-for-expiry.js" "token-payment-with-expiration-date" >}}

## Pepper wants to transfer tokens
Common sense says that when you want to transfer tokens to someone, you should be sending the tokens
that are closest to their expiry date. We will try to achieve that requirement.

For example, if Pepper has to transfer 3 tokens to Tony, then she will choose the tokens which will
expire on July 2 to send first.

Assume that she wants to send 11 tokens to Tony. As per the logic of using the tokens closest to their
expiry date, the following tokens will be sent:

1. 3 tokens due for expiry on July 2
2. 10 tokens due for expiry on July 3

But, the sum of these two will equal 13. That is a problem!

### The solution - Keep the change
What would you do if you faced this scenario when making a payment in the grocery store. Imagine you
have two currency bills (real paper money) of values $3 and $10 respectively.

{{< figure src="/images/money-assorted.jpg" caption="Money, money and more money" width="600" >}}

You would give these two bills to the cashier and the cashier would return the change, i.e., $2.

Similarly, we could model our system to follow this transactional system, with added advantage of being able to
break up a paper bill into smaller denominations of any value. The $10 bill can be torn (broken)
into a $2 bill and a $8 bill.
