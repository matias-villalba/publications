#! /usr/bin/python
# -*- coding: utf-8 -*-
import requests
import json
import datetime
import random
import sys
import re
import time

if(len(sys.argv) < 2 or sys.argv[1] is None):
    print "First argument: publicationsAPIUrl was not found"
    sys.exit(1)

if(len(sys.argv) < 3 or sys.argv[2] is None or not bool(re.match('^[0-9]+:[0-9]+$', sys.argv[2]))):
    print "second argument authorsCount:maxPublicationsPerAuthor is invalid or missed. It will use default authorsCount=500 and maxPublicationsPerAuthor=20"
    authorsCount = 500
    maxPublicationsPerAuthor = 20
else:
    authorsCount = int(sys.argv[2].split(":")[0])
    maxPublicationsPerAuthor = int(sys.argv[2].split(":")[1])
    print "authorsCount:", authorsCount
    print "maxPublicationsPerAuthor:", maxPublicationsPerAuthor

publicationsAPIUrl = sys.argv[1]

print "Publications API url", publicationsAPIUrl

def randomPublicationDate(birthdate):
    birthdate = birthdate.replace(year=birthdate.year + 14)
    end = datetime.datetime.now()
    return birthdate + datetime.timedelta(seconds=random.randint(0, int((end - birthdate).total_seconds())),)


def getRequestWithRetry(url):
    i = 1
    while i <= 30:
        try:
           return requests.get(url, verify=False)
        except ConnectionError as e:
            print "error with request", url, "retry:", i
            time.sleep(1)
        except SocketError as e:
            print "error with request", url, "retry:", i
            time.sleep(1)
        i+=1
    print "error with request to get mock data"
    exit(1)

#get publication titles to any author
response = requests.get("https://titlegenerator.com/random?rnd=0.07381345974158027", verify=False)
if(response.ok):
    titles = json.loads(response.content)["last_names"]
    titlesIterator = iter(titles)

# get random data to create 500 authors
response = getRequestWithRetry("https://uinames.com/api/?amount="+str(authorsCount)+"&region=United%20States&ext")
if(response.ok):
    if(authorsCount == 1):
        persons = [json.loads(response.content)]
    else:
        persons = json.loads(response.content)
    for person in persons:
        authorBirthdateObject = datetime.datetime.strptime(person["birthday"]["mdy"], '%m/%d/%Y')
        data = {
             "firstName": person["name"],
              "lastName": person["surname"],
              "email": person["email"],
              "birthdate": authorBirthdateObject.isoformat()
            }
        #create an author
        print "email of author to create:", person["email"]
        response = requests.post(publicationsAPIUrl+"/authors", data=json.dumps(data) , verify=False)
        if(response.ok):
            author = json.loads(response.content)
            print "Author created id: ", author["id"]

        # get a number of random publications for the current author
        publicationsCount = random.randint(1, maxPublicationsPerAuthor)
        i = 1
        while i <= publicationsCount:
            print "creating publication: ", i, " from ", publicationsCount, " of author: ", person["email"]

            # get publication title for current author
            title = next(titlesIterator, None)
            if title is None:
                response = getRequestWithRetry("https://titlegenerator.com/random?rnd=0.07381345974158027")
                if(response.ok):
                    titles = json.loads(response.content)["last_names"]
                    titlesIterator = iter(titles)
                    title = next(titlesIterator, None)


            response = getRequestWithRetry("https://baconipsum.com/api/?type=meat-and-filler&paras=12")
            if(response.ok):
                paragraphs = json.loads(response.content)
                seperator = '. '
                body = seperator.join(paragraphs)

            publicationDate = randomPublicationDate(authorBirthdateObject)
            data = {
                     "title": title,
                     "body": body,
                     "author": {
                        "id": author['id']
                     },
                     "publicationDatetime": publicationDate.isoformat()
                   }
            #create an publication
            print "creating publication with title:", title, "of author:", author["id"]
            response = requests.post(publicationsAPIUrl+"/publications", data=json.dumps(data), verify=False)
            if(response.ok):
                publicationId = json.loads(response.content)['id']
                print "publication created with id:", publicationId

            i+=1

print "END"
