#!/usr/bin/python
import praw
import pdb
import re
import os
import urllib
import urllib2
import json


# Create the Reddit instance
reddit = praw.Reddit('bot1')

# and login
#reddit.login(REDDIT_USERNAME, REDDIT_PASS)

# Have we run this code before? If not, create an empty list
if not os.path.isfile("posts_replied_to.txt"):
    posts_replied_to = []

# If we have run the code before, load the list of posts we have replied to
else:
    # Read the file into a list and remove any empty values
    with open("posts_replied_to.txt", "r") as f:
        posts_replied_to = f.read()
        posts_replied_to = posts_replied_to.split("\n")
        posts_replied_to = list(filter(None, posts_replied_to))




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


# Get the top 5 values from our subreddit
subreddit = reddit.subreddit('pythonforengineers')
for submission in subreddit.hot(limit=10):
    #print(submission.title)

    # If we haven't replied to this post before
    if submission.id not in posts_replied_to:

        # Do a case insensitive search
        if re.search("Bot test", submission.title, re.IGNORECASE):
            # Reply to the post
            # submission.reply("test")
            print("Bot replying to : ", submission.title)

            # Store the current id into our list
            # posts_replied_to.append(submission.id)

            comments = getAll(reddit, submission.id)
            print(comments)

            for comment in comments:
                if comment.id not in posts_replied_to:

                    m = re.search("!price (.*)", comment.body, re.IGNORECASE)
                    if (m):
                        print("Bot replying to : ", comment.body)

                        url= "https://www.romexchange.com/api?exact=false&item=" + urllib.quote_plus(m.group(1))

                        print(url)

                        contents = urllib2.urlopen(url).read()
                        items = json.loads(contents)

                        if (len(items)):
                            item = items[0]
                            price = "Item:**" + item['name'] + "** \n\n SEA:" + fmt(item['sea']['latest']) + " \n\n Global:" + fmt(item['global']['latest']);
                            comment.reply(price)
                            print(price)

                            posts_replied_to.append(comment.id)
                        else:
                            comment.reply("Item not found")
                            print("not found")

                            posts_replied_to.append(comment.id)



# Write our updated list back to the file
with open("posts_replied_to.txt", "w") as f:
    for post_id in posts_replied_to:
        f.write(post_id + "\n")



