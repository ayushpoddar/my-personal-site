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

You are asked to design a internal wallet for your application where users can transfer "token money" (also called **tokens**) to each other. They can purchase the tokens by making a credit card payment, and then transfer those tokens to each other.

For example, Harry purchases 5 tokens from your platform (app) and then transfers 3 tokens to Tony. Next, Tony transfers 2 tokens to Pepper.

{{< callout type=info >}}
For the rest of the post, we will assume that the users have the tokens that they wish to transfer. We won't be exploring the purchase of tokens.
{{< /callout >}}

## Designing a simple token transfer system
A simple **token** transfer system involves keeping track of each user's *token balance*. A transfer of
tokens simply updates the token balances of the parties involved. You may choose to keep track of
the transaction history to show to the user, but it is not essential to the functioning of your
internal wallet. 

The following animation demonstrates how the balances are updated with each transfer:

{{< pixigsap "balance-transfer.js" >}}

## Problem #1 - Some tokens will expire; some won't
A business requirement comes up that some of the tokens received by a user will expire in a month if
the transfer satisfies some conditions,[^1] i.e., the receiver should use those tokens within a month of
receipt.

For example, if Tony transfers 3 tokens to Pepper Potts on June 2, then Pepper must use those tokens
by July 2.

### Solution - Store the expiration date
As clearly evident, just storing the balance will not suffice. We need multiple records now - each
representing the token balance and its corresponding expiry.

After a few people send some tokens to Pepper, her records would look like this:

| Balance | Expiration Date | *Comments (not part of the database)* |
| ------ | ------- | ------- |
| 5 | `nil` | *Her initial balance - never expires* |
| 3 | July 2, 2023 | *Received from Tony on June 2* |
| 10 | July 3, 2023 | *Received on June 3 from someone* |
| 5 | July 6, 2023 | *Received on June 6 from someone* |

The following animation aptly demo-es how Pepper's balances will be updated if someone, now, sends 5 tokens on June 7.

{{< pixigsap "tokens-for-expiry.js" >}}

## Problem #2 - Pepper wants to transfer tokens
An additional requirement that comes up with this problem is that when transferring tokens, tokens
closest to their expiry date should be sent first.

Assume that Pepper wants to send 11 tokens to Tony. Then, the following tokens should be
transferred _(refer the table above)_:

1. 3 tokens due for expiry on July 2
2. 10 tokens due for expiry on July 3

But, the sum of these two equals 13. That is a problem!

### Solution - Keep the change
What would you do if you faced this scenario when making a payment in a grocery store. Imagine you
have two currency bills (real paper money) of values $3 and $10 respectively.

{{< figure src="/images/money-assorted.jpg" caption="Why is the term 'green' used for cash? 🤔" width="600" >}}

You would give these two bills to the cashier and the cashier would return the change, i.e., $2.

Similarly, we could model our system to follow this transactional system, with added advantage of being able to
break up a paper bill into smaller denominations of any value. The $10 bill can be broken (torn,
split) into a $2 bill and a $8 bill. This will lead to Pepper possessing these token "bills":

1. 3 tokens due for expiry on July 2
2. 8 tokens due for expiry on July 3
3. 2 tokens due for expiry on July 3

Next, the 3-token bill and the 8-token bill can be transferred to Tony, updating his respective
token balances.

{{< pixigsap "splitting-of-tokens.js" >}}

## Problem #3 - Tracking each token's lifecycle

For simplicity's sake, lets assume that none of the tokens ever expire.

Consider this scenario: Pepper receives 2 tokens each from Tony, Jarvis, Happy, Rhodey and Joker. This means
that she has a balance of 10 tokens after these transactions. Now, she wants to transfer 4 tokens to
Peter. The balances will be updated for Pepper and Peter. But, we don't have a way to find whether
the tokens received by Peter were originally transferred by Tony and Jarvis OR Happy and Joker OR
some other combination.

Essentially, the problem is: As an admin, I want to know who were the owners of each token that you
(as a user) currenly have in your wallet. In other words, I want to keep track of each token's
lifecycle as it changes hands.

### Solution - Your wallet's balance is the sum of all the paper money it holds

In one of the paragraphs above, we had discussed about paying money using paper money. What if there
was a way to add the name of the owner to the currency bill as it changed hands. So, when Pepper
collects a $10 bill from the bank, her name is written on the bill. Next, when Pepper transfers the
same bill to Peter, Peter's name is added to the bill.

{{< callout type=info >}}
For the rest of this discussion, this list will be referred as <code>owner_history</code> list.
{{< /callout >}}

**What if Pepper wants to transfer $7 to Peter, not $10?** We split the currency bill into two
parts: $3 and $7 ensuring that the `owner_history` list is cloned.

**So, can we look at a user's wallet as a collection of "token bills" instead of just a lump sum
balance?** Based on the discussion until now, these are the benefits that usage of "token bills"
bring:
- They enable tracking of each token's lifecycle that has been issued in the platform.
- We can attach properties with each "token bill". For example:
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
- He is issued two "token bills" with face value of `5` → _`bill-2` and `bill-3`_
- His ID is added to the `owner_history` list of these "token bills" too (`bill-2` and `bill-3`).
- Joey wants to transfer 7 tokens to Kramer.
- `bill-2` is split into two bills - `bill-2-1` worth 2 tokens and `bill-2-2` worth 3 tokens. The
  `owner_history` list is cloned from `bill-2` for both the new splits.
- `bill-1` (5 tokens) and `bill-2-1` (2 tokens) are transferred to Kramer.
- Kramer's ID is added to the `owner_history` list of `bill-1` and `bill-2-1`

The following animation shows a slightly more complex version of this where Pepper receives two
tokens each from Rhodey and Joker. Then, she transfers 2 tokens to the intern - Peter.

{{< pixigsap "transfer-token-notes.js" >}}

#### Technical Deep Dive
There are two technical questions that need to be addressed:
1. How do we find the "token bills" which will be used for the transaction?
2. How do we perform the split when we don't have _exact change_?

##### Finding the "token bills"
{{< callout type="info" >}}
Since relational databases (like MySQL, PostgreSQL) are the most widely used, the following
discussion will be based on them.
{{< /callout >}}

The most intuitive option is to load all the "token bills" belonging to the sender user in
the application. Then, we can iterate over them and save the relevant "token bills" in a separate
list. The benefit of this approach is that your query to fetch the "token bills" from the database
will be simple. However, it is not scalable. If a user has tens of thousands "token bills", then
we will be loading massive amount of unnecessary data even for transactions involving just one "token bill".

The second option is to write your SQL query such that only the relevant "token bills" are loaded
into the application memory. The query will use [window
functions](https://stackoverflow.com/a/22843199/6212985) to aggregate all relevant rows.

This is what the query will look like _(Assuming a transaction of 10 tokens)_:
1. Start iterating over each "token bill" row in the database. _For the sake of simplicity, we will
   assume that the "token bills" are ordered by `id`._
2. For each row, calculate the running cumulative sum. Here is a simplified snippet of the query
   _(`value` being the face value of each "token bill")_.

```sql
SELECT sum(value)
OVER (ORDER BY id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
    AS cumulative_sum
FROM token_bills
```

3. Also, calculate the running cumulative sum upto the row preceding the current row.

```sql
SELECT sum(value)
OVER (ORDER BY id
        ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING)
    AS pre_cumulative_sum
FROM token_bills
```

4. Finally, select all rows where either:
    - `cumulative_sum` is less than 10 tokens (indicates rows which will be used for the
      transaction)
    - OR `cumulative_sum` is greater than or equal to 10 tokens **AND** `pre_cumulative_sum` is
      less than 10 tokens (the last row in the list of relevant "token bills")

This is the skeleton of the final query:

```sql
SELECT *
FROM (SELECT *, 
        SUM(value) OVER (ORDER BY id
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sum,
        SUM(value) OVER (ORDER BY id
            ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS pre_cumulative_sum
    FROM token_bills
    WHERE user_id=1) AS tb
WHERE cumulative_sum < 10
    OR (cumulative_sum >= 10 AND (pre_cumulative_sum < 10 OR pre_cumulative_sum IS NULL))
```

<!-- TODO: Animation showing cumulative sum and pre_cumulative_sum -->

##### Performing the split
If the "token bills" fetched do not total to the exact change, we need to split
the last "token bill" into two. One of the parts will remain with the user, and the other will be
used for transaction.

For the part that will remain with the user, you can clone the original "token bill" and insert it
into the database. The `value` of the new "token bill" will be equal to the number of tokens that
should remain with the user.

For the part that will be used for the transaction, we can just update the `value` of the original
"token bill".

For example, if the "token bill" of `value=5` is split into a part of `value=2` (to be used for
transaction) and a part of `value=3` (to be kept with the user), then the queries will look like
this:

```sql
INSERT INTO token_bills (user_id, value) VALUES (:sender_id, 3);
UPDATE token_bills SET value=3 WHERE id=:original_token_bill_id;
```

## Conclusion
We started with a simple solution of just storing the balances, but we soon found it to be
inflexible and unable to accomodate any possible feature requests.

Modeling our wallet as a collection of "token bills" helped us break down a complex problem into
smaller, manageable problems. Additionally, it prepared our system for the future, ensuring we
could readily accommodate any potential feature requests that might arise.

## Footnotes

[^1]: The conditions are not essential to the idea behind the post. They can be as crazy as - *the
transfers take place in the first week of the month.*

