# Reblog post

We will show how to reblog or resteem post using Python, with username and posting private key.

Tutorial will also explain and show you how to sign/broadcast transaction on **Steem** blockchain using the [steem-python](https://github.com/steemit/steem-python) library.

## Intro

Steem python library has built-in function to commit transaction and broadcast it to the network. 

## Steps

1.  [**App setup**](#app-setup) - Library install and import
1.  [**Post list**](#post-list) - List of posts to select from trending filter 
1.  [**Enter user credentials**](#credentials-list) - Enter user credentails to sign transaction

#### 1. App setup <a name="app-setup"></a>

In this tutorial we use 3 packages, `pick` - helps us to select filter interactively. `steem` - steem-python library, interaction with Blockchain. `pprint` - print results in better format.

First we import all three library and initialize Steem class

```python
    import pprint
    from pick import pick
    # initialize Steem class
    from steem import Steem

    s = Steem()
```

#### 2. Post list <a name="post-list"></a>


Next we will fetch and make list of accounts and setup `pick` properly.

```python
    query = {
      "limit":5, #number of posts
      "tag":"" #tag of posts
    }
    # post list from trending post list
    posts = s.get_discussions_by_trending(query)

    title = 'Please choose post to reblog: '
    options = []
    # post list
    for post in posts:
      options.append('@'+post["author"]+'/'+post["permlink"])

```

This will show us list of posts to select in terminal/command prompt. And after selection we will get formatted post as an `option` variable.

#### 3. Enter user credentials <a name="credentials-list"></a>

Next in order to sign transaction, application asks for username and posting private key to sign transaction and broadcast it.

```python
  # get index and selected post
  option, index = pick(options, title)
  pprint.pprint("You selected: "+option)

  account = input("Enter your username? ")
  wif = input("Enter your Posting private key? ")

  # commit or build transaction
  c = Commit(steem=Steem(keys=[wif]))

  # broadcast transaction
  c.resteem(option, account=account)

```


That's it, if transaction is successful you shouldn't see any error messages, otherwise you will be notified.

### To Run the tutorial

1.  [review dev requirements](../00_getting_started)
1.  `git clone https://gitlab.syncad.com/hive/devportal.git`
1.  `cd devportal/tutorials/devportal-tutorials-py/tutorials/14_reblogging_post`
1.  `pip install -r requirements.txt`
1.  `python index.py`
1.  After a few moments, you should see output in terminal/command prompt screen.
