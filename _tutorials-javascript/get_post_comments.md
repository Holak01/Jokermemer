---
title: 'JS: Get Post Comments'
position: 7
description: By the end of this tutorial you would know how to get comments made by others on any post.
layout: full
canonical_url: get_post_comments.html
---
Full, runnable src of [Get Post Comments](https://gitlab.syncad.com/hive/devportal/-/tree/master/tutorials/javascript/07_get_post_comments) can be downloaded as part of: [tutorials/javascript](https://gitlab.syncad.com/hive/devportal/-/tree/master/tutorials/javascript) (or download just this tutorial: [devportal-master-tutorials-javascript-07_get_post_comments.zip](https://gitlab.syncad.com/hive/devportal/-/archive/master/devportal-master.zip?path=tutorials/javascript/07_get_post_comments)).

The purpose of this tutorial is to **a)** demonstrate how to get a list of articles from the trending list on the blockchain, and **b)** fetch the contents of the selected post to display its title and body and **c)** fetch comments of the post and display them with author, body, created time and number of votes.

We will also explain the most commonly used fields from the response object as well as parse body of each comment.

## Intro

Each post might have comments/replies that is interesting and contributes to the topic and discussion. Hive offers out of box API for pulling replies for particular post with `get_content_replies`. We will fetch replies and list them in simple user interface.

Also see:
* [get discussions]({{ '/search/?q=get discussions' | relative_url }})
* [database_api.find_comments]({{ '/apidefinitions/#database_api.find_comments' | relative_url }})
* [condenser_api.get_content]({{ '/apidefinitions/#condenser_api.get_content' | relative_url }})
* [tags_api.get_content_replies]({{ '/apidefinitions/#tags_api.get_content_replies' | relative_url }})
* [condenser_api.get_content_replies]({{ '/apidefinitions/#condenser_api.get_content_replies' | relative_url }})

## Steps

1. [**Fetching posts**](#fetching-posts) Getting trending posts
1. [**Post comments**](#post-comments) Open post and fetch comments
1. [**Query result**](#query-result) Result of the query

#### 1. Fetching post<a name="fetching-posts"></a>

As mentioned in our previous tutorials we can fetch various lists of posts with different filters. Here, we are reusing some parts of that tutorial to list the top 5 trending posts. And we parse content of selected post to display few fields in a meaningful way.

#### 2. Post comments<a name="post-comments"></a>

On selection of a particular post from the list, `openPost` function is fired as it is explained in [**Get Post Details**]() tutorial. This function will call the `get_content` function to fetch content of the post. Right after root post is displayed properly, we use `get_content_replies` function to fetch comments made on that post, function requires author and permlink of the root post to fetch its comments.

```javascript
client.database.call('get_content_replies', [author, permlink]).then(result => {
    const comments = [];
    for (var i = 0; i < result.length; i++) {
        comments.push(
            `<div class="list-group-item list-group-item-action flex-column align-items-start">\
            <div class="d-flex w-100 justify-content-between">\
              <h5 class="mb-1">@${result[i].author}</h5>\
              <small class="text-muted">${new Date(
                  result[i].created
              ).toString()}</small>\
            </div>\
            <p class="mb-1">${md.render(result[i].body)}</p>\
            <small class="text-muted">&#9650; ${result[i].net_votes}</small>\
          </div>`
        );
    }

    document.getElementById('postComments').style.display = 'block';
    document.getElementById('postComments').innerHTML = comments.join('');
});
```

We iterate each comment and format them properly in `comments` array. As mentioned in **Get Post Details** tutorial, we use `remarkable` library to parse the body of each comment into a readable format. Author, comment body, created time and number of votes on that comment is displayed with simple user interface.

```javascript
document.getElementById('postList').style.display = 'block';
document.getElementById('postBody').style.display = 'none';
document.getElementById('postComments').style.display = 'none';
```

The "go back" function simply hides and shows the post list.

#### 3. Query result<a name="query-result"></a>

The result is returned from the post content as a `JSON` object with the following properties:

```json
[
  {
    "abs_rshares": 0,
    "active": "2020-04-29T06:08:18",
    "active_votes": [],
    "allow_curation_rewards": true,
    "allow_replies": true,
    "allow_votes": true,
    "author": "hiveio",
    "author_reputation": "34879294456530",
    "author_rewards": 0,
    "beneficiaries": [],
    "body": "![#HuobiHive2020 ... an asset shining bright, provided by community member @nateaguila](https://files.peakd.com/file/peakd-hive/hiveio/XsnzlWHl-social_hive_flare.jpg)\n\n## Huobi has listed Hive! ...",
    "body_length": 0,
    "cashout_time": "1969-12-31T23:59:59",
    "category": "hiveblockchain",
    "children": 26,
    "children_abs_rshares": 0,
    "created": "2020-04-24T00:41:06",
    "curator_payout_value": "0.000 HBD",
    "depth": 0,
    "id": 85763874,
    "json_metadata": {
      "app": "peakd/2020.04.4",
      "format": "markdown",
      "description": "Hive is now listed on Huobi Global! This post contains all official links and AMA transcripts.",
      "tags": [
        "hiveblockchain",
        "exchangenews",
        "hiveama"
      ],
      "users": [
        "nateaguila",
        "roelandp"
      ],
      "links": [
        "/trending/huobihive2020",
        "/@nateaguila",
        "https://twitter.com/HuobiGlobal/status/1253210569194090497",
        "https://huobiglobal.zendesk.com/hc/en-us/articles/900000684263",
        "https://huobiglobal.zendesk.com/hc/en-us/articles/900000687166--EXCLUSIVE-Deposit-HIVE-on-Huobi-Global-to-Share-100-000-HIVE-",
        "https://twitter.com/HuobiGlobal/status/1252566140431130624",
        "/@roelandp",
        "/trending/notfinancialadvice",
        "https://developers.hive.io/",
        "https://hiveprojects.io/"
      ],
      "image": [
        "https://files.peakd.com/file/peakd-hive/hiveio/XsnzlWHl-social_hive_flare.jpg",
        "https://files.peakd.com/file/peakd-hive/hiveio/9tEYm2I9-image.png",
        "https://files.peakd.com/file/peakd-hive/hiveio/AXkoBSE3-image.png",
        "https://files.peakd.com/file/peakd-hive/hiveio/djdRACpx-image.png"
      ]
    },
    "last_payout": "2020-05-01T00:41:06",
    "last_update": "2020-04-24T00:41:06",
    "max_accepted_payout": "0.000 HBD",
    "max_cashout_time": "1969-12-31T23:59:59",
    "net_rshares": 0,
    "net_votes": 182,
    "parent_author": "",
    "parent_permlink": "hiveblockchain",
    "pending_payout_value": "0.000 HBD",
    "percent_hbd": 10000,
    "permlink": "huobi-global-official-hive-listing-announcement-giveaways-ama-chat-transcripts",
    "promoted": "0.000 HBD",
    "reblogged_by": [],
    "replies": [],
    "reward_weight": 10000,
    "root_author": "hiveio",
    "root_permlink": "huobi-global-official-hive-listing-announcement-giveaways-ama-chat-transcripts",
    "root_title": "Huobi Global Official Hive Listing Announcement, Giveaways, and AMA Chat Transcripts",
    "title": "Huobi Global Official Hive Listing Announcement, Giveaways, and AMA Chat Transcripts",
    "total_payout_value": "0.000 HBD",
    "total_pending_payout_value": "0.000 HBD",
    "total_vote_weight": 0,
    "url": "/hiveblockchain/@hiveio/huobi-global-official-hive-listing-announcement-giveaways-ama-chat-transcripts",
    "vote_rshares": 0
  }
]
```

From this result, you have access to comments made on selected post.

---

#### Try it

Click the play button below:

<iframe height="400px" width="100%" src="https://replit.com/@inertia186/js07getpostcomments?embed=1&output=1" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### To Run the tutorial

1. `git clone https://gitlab.syncad.com/hive/devportal.git`
1. `cd devportal/tutorials/javascript/07_get_post_comments`
1. `npm i`
1. `npm run dev-server` or `npm run start`
1. After a few moments, the server should be running at [http://localhost:3000/](http://localhost:3000/)
