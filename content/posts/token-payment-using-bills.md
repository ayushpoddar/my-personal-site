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

{{< pixigsap "balance-transfer.js" >}}

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

{{< pixigsap "tokens-for-expiry.js" >}}

## Problem #2 - Pepper wants to transfer tokens
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

{{< figure src="/images/money-assorted.jpg" caption="Why is the term 'green' used for cash? 🤔" width="600" >}}

You would give these two bills to the cashier and the cashier would return the change, i.e., $2.

Similarly, we could model our system to follow this transactional system, with added advantage of being able to
break up a paper bill into smaller denominations of any value. The $10 bill can be broken (torn)
into a $2 bill and a $8 bill. This will lead to Alice possessing these token "bills":

1. 3 tokens due for expiry on July 2
2. 8 tokens due for expiry on July 3
3. 2 tokens due for expiry on July 3

Next, the 3-token bill and the 8-token bill can be transferred to Tony, updating his respective
token balances.

{{< pixigsap "splitting-of-tokens.js" >}}

## Problem #3 - Tracking each token's lifecycle

For simplicity's sake, lets assume that all the tokens in our platform never expire. Every user has
a token balance to their name.

For example: Pepper receives 2 tokens each from Tony, Jarvis, Happy, Rhodey and Joker. This means
that she has a balance of 10 tokens after these transactions. Now, she wants to transfer 4 tokens to
Peter. The balances will be updated for Pepper and Peter. But, we don't have a way to find whether
the tokens received by Peter were originally transferred by Tony and Jarvis OR Happy and Joker.

Essentially, the problem is: As an admin, I want to know who were the owners of each token that you
(as a user) currenly have in your wallet. In other words, I want to keep track of each token's
lifecycle as it changes hands.

### Solution - Your wallet's balance is the sum of all the paper money it holds

In one of the paragraphs above, we had discussed about paying money using paper money. What if there
was a way to add the name of the owner to the currency bill as it changed hands. So, when Pepper
collects a $10 bill from the bank, her name is written on the bill. Next, when Pepper transfers the
same bill to Peter, Peter's name is added to the bill. Following this, this list will be referred as
`owner_history` list.

**What if Pepper wants to transfer $7 to Peter, not $10?** We split the currency bill into two
parts: $3 and $7 ensuring that the owner list is cloned.

**So, can we look at a user's wallet as a collection of "token bills" instead of just a lump sum
balance?** Based on the discussion until now, these are the benefits that usage of "token bills"
bring:
- They enable tracking of each token's lifecycle that has been issued in the platform.
- You can attach properties with each "token bill". For example:
    - You can set expiry dates for a "token bill".
    - If you are ever required to categorise tokens, you can attach that information to any relevant
      "token bill".
    - You may choose to define certain transaction pre-requisites based on the properties defined in
      a "token bill".

Essentially, representing a user's wallet as a collection of "token bills" provides immense
flexibility. It enables you to accomodate any possible future feature requests.

**What is the trade-off for this flexibility?** The queries we perform when transferring tokens
from one user to another will be more complex. Instead of simply updating the respective balances,
our queries will be executing the following tasks:
- Fetch all relevant "token bills" which need to be transferred to the recipient user.
- Split the last "token bill" in case we do not have "exact change".
- Add the recipient user's ID to the `owner_history` list for each transferrable "token bill".
- Update current owner of each transferred "token bill".

When representing a user's wallet as a collection of "token bills", a typical payment flow would go like this:
- Joey purchases 5 tokens from the platform.
- He is issued a "token bill" with face value of `5`. _We will refer this "token bill" as `bill-1`._
- His ID is added to the `owner_history` list of this "token bill".
- He purchases 5 tokens twice (at different times) from the platform.
- He is issued two "token bills" with face value of `5`. _`bill-2` and `bill-3`_
- His ID is added to the `owner_history` list of these "token bills" too (`bill-2` and `bill-3`).
- Joey wants to transfer 7 tokens to Kramer.
- `bill-2` is split into two bills - `bill-2-1` worth 2 tokens and `bill-2-2` worth 3 tokens. The
  `owner_history` list is cloned from `bill-2` for both the new splits.
- `bill-1` (5 tokens) and `bill-2-1` (2 tokens) are transferred to Kramer.
- Kramer's ID is added to the `owner_history` list of `bill-1` and `bill-2-1`

The following animation shows a slightly more complex version of this where Pepper receives two
tokens each from Tony, Jarvis, Happy, Rhodey and Joker. Then, she transfers 4 tokens to the intern -
Peter.

<!-- TODO: Animation for the above paragraph -->

#### Technical Deep Dive
