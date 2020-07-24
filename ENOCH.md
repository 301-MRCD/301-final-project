# ENOCH STROK and MICHELLE SALAZAR'S BOOKAPP README 
## copied for reference purposes on 7-23 from:
### https://github.com/enoch-strok/book_app/blob/master/README.md

**Author**: Michelle Salazar & Enoch Strok
**Version**: 1.0.2 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Going to create an app that allows the user to search for a book via google's online library and be able to add it to their collection and make notes or add books that are not in the library.

## Getting Started
Build the wireframe, connect to the api, send and post the data via full stack app to ejs, render it.

## Architecture
express, superagent, cors, ejs, morgan, pg.

## Change Log
07-09-2020 9:45pm - Application main structure now has a fully-functional express server, with GET and POST routes for the book resource.


## Credits and Collaborations
John Cokos - Lead Instructor
Ray Ruazol - Assistant Instructor
Michelle Salazar - Student A/Soft. Dev./Author A
Enoch Strok - Student B/Soft. Dev./Author B
Ryan Geddes - Student /Soft. Dev.: Shared ternary operator code for fixing error in object data constructor. 'this.isbn = ((obj.volumeInfo.industryIdentifiers) ? obj.volumeInfo.industryIdentifiers : 'no isbn') || 'error no isbn';'


## Features History ##
**Number and name of feature:** lab_11
**Estimate of time needed to complete:** 1:00
**Start time:** 5:00pm
**Finish time:**
**Actual time needed to complete:**

**Number and name of feature:** lab_11: Item#3 in Trello
**Estimate of time needed to complete:** Undefined.
**Start time:** 6:20PM 07/11/2020
**Finish time:** 11:28PM 07/11/2020
**Actual time needed to complete:** 5 hours 8 minutes
**Notes:** We got ALOT accomplished today!

**Number and name of feature:** lab_11: Item#3,4,6 in Trello
**Estimate of time needed to complete:** Undefined.
**Start time:** 8:00PM 07/12/2020
**Finish time:** 5:48AM 07/13/2020
**Actual time needed to complete:** 9 hours 48 minutes!!!!
**Notes:** App is complete! Except the CSS!

**Number and name of feature:** lab_12: Item#1in Trello
**Estimate of time needed to complete:** 8-12 Hours.
**Start time:** 9:30PM 07/13/2020
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