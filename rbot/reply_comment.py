#!/usr/bin/python
import praw
import pdb
import re
import os
import urllib
import urllib2
import json
import requests
import time


# Have we run this code before? If not, create an empty list
if not os.path.isfile("comment_replied_to.txt"):
    comment_replied_to = []

# If we have run the code before, load the list of posts we have replied to
else:
    # Read the file into a list and remove any empty values
    with open("comment_replied_to.txt", "r") as f:
        comment_replied_to = f.read()
        comment_replied_to = comment_replied_to.split("\n")
        comment_replied_to = list(filter(None, comment_replied_to))


# parse json
def json_dump_and_parse(file_name, request):
    with open(file_name, "w+") as f:
        json.dump(request.json(), f, sort_keys = True, ensure_ascii = False, indent = 4)
    with open(file_name) as f:
        data = json.load(f)
    return data


# Get all comments
def getSubComments(comment, allComments, verbose=True):
    allComments.append(comment)
    if not hasattr(comment, 'replies'):
        replies = comment.comments()
        if verbose:
            print 'fetching (' + str(len(allComments)) \
                + ' comments fetched total)'
    else:
        replies = comment.replies
    for child in replies:
        getSubComments(child, allComments, verbose=verbose)


def getAll(r, submissionId, verbose=True):
    submission = r.submission(submissionId)
    comments = submission.comments
    commentsList = []
    for comment in comments:
        getSubComments(comment, commentsList, verbose=verbose)
    return commentsList

def fmt(i):
    return "{:,}".format(i) + "z"

def run_bot(reddit):
    #using push api instead
    pushurl = "https://api.pushshift.io/reddit/search/comment/?q=price-check&sort=desc&size=20&fields=id,body&subreddit=pythonforengineers"
    data = json_dump_and_parse("comment_data.json", requests.get(pushurl))

    comments = data['data'];

    for comment in comments:

        id = comment["id"];
        c = reddit.comment(id=id)

        if id not in comment_replied_to:

            m = re.search("!price-check (.*)", comment["body"], re.IGNORECASE)
            if (m):
                print("Bot replying to : ", comment["body"])

                url= "https://www.romexchange.com/api?exact=false&item=" + urllib.quote_plus(m.group(1))

                print(url)

                contents = urllib2.urlopen(url).read()
                items = json.loads(contents)

                if (len(items)):
                    item = items[0]
                    price = "Item:**" + item['name'] + "** \n\n SEA:" + fmt(item['sea']['latest']) + " \n\n Global:" + fmt(item['global']['latest']);
                    c.reply(price)
                    print(price)
                    comment_replied_to.append(id)
                else:
                    c.reply("Item not found")
                    print("not found")
                    comment_replied_to.append(id)





# Write our updated list back to the file
with open("comment_replied_to.txt", "w") as f:
    for post_id in comment_replied_to:
        f.write(post_id + "\n")



while True:
    # Create the Reddit instance
    reddit = praw.Reddit('bot1')

    run_bot(reddit)
    time.sleep(10)
    print("...")