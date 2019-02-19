#!/usr/bin/python
import praw
import pdb
import re
import os
import urllib
import urllib2
import json
import requests

# Create the Reddit instance
reddit = praw.Reddit('bot1')

# and login
#reddit.login(REDDIT_USERNAME, REDDIT_PASS)

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


#using push api instead
pushurl = "https://api.pushshift.io/reddit/search/comment/?q=total-price&sort=desc&size=20&fields=id,body&subreddit=pythonforengineers"
data = json_dump_and_parse("comment_data.json", requests.get(pushurl))

comments = data['data'];

for comment in comments:

    print(comment)

    id = comment["id"];
    c = reddit.comment(id=id)

    if id not in comment_replied_to:

        m = re.search("!total-price (.*)", comment["body"], re.IGNORECASE)
        if (m):

            cart = "";
            totalsea = 0;
            totalglobal = 0;

            search = m.group(1).split(",")

            for q in search:

                q = q.strip()
                qty = q.split("*")

                q = qty[0];

                if len(qty) > 1:
                    qty = int(qty[1]);
                else:
                    qty = 1;


                url= "https://www.romexchange.com/api?exact=false&item=" + urllib.quote_plus(q)

                print(url)

                contents = urllib2.urlopen(url).read()
                items = json.loads(contents)

                if (len(items)):
                    for x in range(qty):
                        item = items[0]
                        price = "Item:**" + item['name'] + "** SEA:" + fmt(item['sea']['latest']) + " Global:" + fmt(item['global']['latest']) + " \n\n ";

                        cart = cart + price
                        totalsea = totalsea + item['sea']['latest']
                        totalglobal = totalglobal + item['global']['latest']

            if (cart):
                cart = cart + "**TOTAL:** SEA: " + fmt(totalsea) + " Global: " + fmt(totalglobal)

                print(cart)
                #c.reply(cart)
                #comment_replied_to.append(id)


# Write our updated list back to the file
with open("comment_replied_to.txt", "w") as f:
    for post_id in comment_replied_to:
        f.write(post_id + "\n")



