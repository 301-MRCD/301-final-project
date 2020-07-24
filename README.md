# 301-final-project
Team :  Davee Sok, Ryan Geddes, Chris Bortel, Michelle Salazar

**Heroku app**
https://mister-cd-301-final.herokuapp.com/

**Team Agreement**
https://docs.google.com/document/d/1Y4YqEGetRE68ka0oiSGRjK2Pk6_ijXd8kQBZpq8Xt2s/edit?usp=sharing

**Git hub project board**
https://github.com/users/Ryan-Geddes/projects/1

**Trello** 
https://trello.com/b/AziNDkvf/dog-parks

**Heroku team**
https://dashboard.heroku.com/apps/mister-cd-301-final/access

**Project Board**

https://docs.google.com/document/d/1cZqaHz-dsTCRPmIejseQbXNF0flnt9bQdDwKWoTsbKM/edit#

**lucid chart**

https://app.lucidchart.com/invitations/accept/2db81489-8ea8-4842-9463-e8f7d825005b

<img src=''>

**Links for reference**


# ENOCH STROK and MICHELLE SALAZAR'S BOOKAPP README 
## copied for reference purposes on 7-23 from:
### https://github.com/enoch-strok/book_app/blob/master/README.md

**Author**: Michelle Salazar & Enoch Strok
**Version**: 1.0.2 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Our final project for codefellows 301 

**User Story:** As a dog owner, I want to be able to find a list of dog parks in the seattle area.  I’d like to be able to filter these parks by different criteria such as dog size, terrain (i.e. beach, forest) off-leash, and other useful criteria.  I also want to be able to find nearby dog-friendly businesses I can take my dogs to on doggy dates after the park!  I would also like to be able to save a list of my favorite parks and be able to reference them later.  

## Getting Started
Build the wireframe, connect to the api, send and post the data via full stack app to ejs, render it.

## Architecture
express, superagent, cors, ejs, morgan, pg.

## Change Log
07-22-2020 9:45pm - Application main structure now has a fully-functional express server, with functioning file scaffolding and rendering basic Yelp API calls.

07-23-2020 9:23pm - Application now has functional render details page that displays basic park info upon click from user.1cZqaHz


07-23-2020 9:45pm - Application 

## Credits and Collaborations
John Cokos - Lead Instructor
Ray Ruazol - Assistant Instructor
Michelle Salazar - Student /Soft. Dev./Author M
Ryan Geddes - Student /Soft. Dev./Author R
Christoper Bortell - Student /Soft. Dev./Author C
Davee Sok - Student /Soft. Dev./Author D
Enoch Strok - Student /Soft. Dev.: shared Readme formatting.


## Features History ##
**Number and name of feature:** api_db
**Estimate of time needed to complete:** 2:30
**Start time:** 7:30pm 7/23/2020
**Finish time:**9:22 pm 7/23/2020
**Actual time needed to complete:**
**Notes:** Last night we set up the basic scaffolding for our site and made sure all the routes were semantically named and wired up correctly.  Tested a basic yelp API call and confirmed proof of life.  Goal for today was to get our results page rendered with accurate JSON data from the Yelp API as well as details.

**Number and name of feature:** 
**Estimate of time needed to complete:** 
**Start time:** 
**Finish time:** 
**Actual time needed to complete:** 
**Notes:** 

**Number and name of feature:** 
**Estimate of time needed to complete:** 
**Start time:** 
**Finish time:**
**Actual time needed to complete:**
**Notes:** 

**Number and name of feature:** 
**Estimate of time needed to complete:** 
**Start time:** 
**Finish time:** 
**Actual time needed to complete:**
**Notes:** We will be: 
--Adding a SQL server into the mix.
--Seting up the tables and structure.
--Adding functionality to save book searches into db.
--Be able to recall/view the "library" of books that we saved to the db.
--Sending that DB to Heroku.



## Resources
**FrontRow** 
301n18
07/08/2020
https://frontrowviews.com/Home/Event/Play/5ec5bc82d28f0a0cf8044a4b



## API Documentation
**Google: Books API**
1. First I searched for google books api using google.com.
2. Found information about OAuth 2.0: https://developers.google.com/books/docs/v1/using#APIKey
3. Found the section about JavaScript: https://developers.google.com/identity/protocols/oauth2
4. Opened Documentation for Javascipt: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
5. Open the API Library in the Google API Console and searched for "book": https://console.developers.google.com/apis/library?pli=1&project=radiant-cycle-281700&folder&organizationId&q=book
6. Enabled "Book API"
7. Found instructions on useing API: https://developers.google.com/books/docs/v1/reference/?apix=true

**Bookshelf**
Method	        REST    URI *	                                    Description
list	        GET     /users/userId/bookshelves	                Retrieves a list of public Bookshelf resource for the specified user.
get	            GET     /users/userId/bookshelves/shelf	            Retrieves a specific Bookshelf resource for the specified user.
* Relative to the base URI: https://www.googleapis.com/books/v1

**Volume**
Method	        REST    URI *	                                    Description
get	            GET     /volumes/volumeId	                        Retrieves a Volume resource based on ID.
list	        GET     /volumes?q={search terms}	                Performs a book search.
* Relative to the base URI: https://www.googleapis.com/books/v1

**Bookshelves.volumes**
Method	        REST    URI *	                                    Description
list	        GET     /users/userId/bookshelves/shelf/volumes	Retrieves volumes in a specific bookshelf for the specified user.
* Relative to the base URI: https://www.googleapis.com/books/v1

**Mylibrary.bookshelves**
Method	        REST    URI *	                                    Description
addVolume	    POST    /mylibrary/bookshelves/shelf/addVolume	    Adds a volume to a bookshelf.
clearVolumes	POST    /mylibrary/bookshelves/shelf/clearVolumes	Clears all volumes from a bookshelf.
get	            GET     /mylibrary/bookshelves/shelf	            Retrieves metadata for a specific bookshelf belonging to the authenticated user.
list	        GET     /mylibrary/bookshelves	                    Retrieves a list of bookshelves belonging to the authenticated user.
moveVolume	    POST    /mylibrary/bookshelves/shelf/moveVolume	    Moves a volume within a bookshelf.
removeVolume	POST    /mylibrary/bookshelves/shelf/removeVolume	Removes a volume from a bookshelf.
* Relative to the base URI: https://www.googleapis.com/books/v1

**///// Selected Method /////**
Method	        REST    URI *	                                    Description
list	        GET     /volumes?q={search terms}	                Performs a book search.
* Relative to the base URI: https://www.googleapis.com/books/v1
Example: https://www.googleapis.com/books/v1/volumes?q={search terms}
Postman Test 1: https://www.googleapis.com/books/v1/volumes?q=dogs
Result: Object of results. Successful!