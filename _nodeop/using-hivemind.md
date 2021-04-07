---
title: Using Hivemind
position: 4
description: Hivemind setup and API functionality
exclude: true
layout: full
canonical_url: using-hivemind.html
---

## Intro

Hive is a "consensus interpretation" layer for the Hive blockchain, maintaining the state of social features such as post feeds, follows, and communities. Written in Python, it synchronizes an SQL database with chain state, providing developers with a more flexible/extensible alternative to the raw hived API. This means that you can bypass hived and access data in a more traditional way, for example, with SQL. But you can't use SQL on hived. So Hivemind solves that problem. Hive does not support any queries to do with wallets, orders, escrow, keys, recovery, or account history.

<!-- A good source of additional information on hive and how to use it can be found in [this Hive article](https://hive.blog/hivemind/@inertia/hivemind-queries) by @inertia. -->

#### Supported API functionality:

**Core API set available in Hive:**

*   condenser_api.get_follow_count
*   condenser_api.get_followers
*   condenser_api.get_following
*   condenser_api.get_discussions_by_trending
*   condenser_api.get_discussions_by_hot
*   condenser_api.get_discussions_by_promoted
*   condenser_api.get_discussions_by_created
*   condenser_api.get_discussions_by_blog
*   condenser_api.get_discussions_by_feed
*   condenser_api.get_discussions_by_comments
*   condenser_api.get_discussions_by_last_update
*   condenser_api.get_content
*   condenser_api.get_state

**Additional functions available within hivemind library**

The majority of these functions are reliant on hived so any changes to hived would affect these function calls. The only two functions not directly reliant on hived are `stream_blocks` and `get_hive_per_mvest`.

*   get_accounts
*   get_all_account_names
*   get_content_batch
*   get_block
*   stream_blocks
*   \_gdgp (get dynamic global properties)
*   head_time
*   head_block
*   last_irreversible
*   gdgp_extended
*   get_hive_per_mvest
*   get_feed_price
*   get_hive_price
*   get_blocks_range

Detailed information on the hivemind library can be found in the [Hivemind repo](https://gitlab.syncad.com/hive/hivemind/-/blob/master/hive/steem/client.py).

#### Hivemind dependencies and setup

<!-- Hivemind is available as a pre-built docker image which can be downloaded directly from Dockerhub at [https://hub.docker.com/r/hive/hivemind/](https://hub.docker.com/r/hive/hivemind/). -->

If you would prefer to install Hivemind yourself you can do so following the basic instructions below.

This setup can be performed on an Ubuntu server.

There are two dependencies for setting up the dev environment on ubuntu for running hivemind:

*   Python

```bash
$ sudo apt-get update
$ sudo apt-get install python3 python3-pip
```

*   Postgres

```bash
$ sudo apt-get install postgresql
```

More detailed documentation on the setup of Hivemind can be found at the [Hivemind github repository](https://gitlab.syncad.com/hive/hivemind).

Once the dependencies have been installed the database can be created and the environment variables set.

```bash
$ sudo service postgresql start
$ su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'postgres';\""
$ su - postgres -c "createdb hive"
$ su - postgres -c "psql -d hive -c \"CREATE EXTENSION intarray;\""
$ export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hive
$ export PG_PASSWORD=postgres
$ sudo service postgresql restart
```

##### Installation

```bash
$ git clone https://gitlab.syncad.com/hive/hivemind.git
$ cd hivemind
$ git submodule update --init --recursive
$ python3 setup.py build
$ sudo python3 setup.py install
```

By default Hivemind will connect to the mainnet [https://api.hive.blog](https://api.hive.blog) but if required you can change this to connect to a testnet. To do this set the environment variable as described below.

```bash
# Note as of 2021-03-30, hivemind still internally uses the environment variable called STEEMD_URL for this.
$ export STEEMD_URL='{"default":"http://127.0.0.1:8091"}'
```

Now that the basic setup is done you are able to sync the database.

```bash
$ hive sync
```

You can also check the status of your synced database.

```bash
$ hive status
```

Once the synchronization is complete you can start the Hivemind server which will allow you to start performing queries on your local database.

```bash
$ hive server
```

By default the server is available on [http://0.0.0.0:8080](http://0.0.0.0:8080), this can also be changed by adding an environment variable.

```bash
$ export HTTP_SERVER_PORT=8090
```