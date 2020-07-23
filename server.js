'use strict';

require('dotenv').config();
// stuff
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const client = new pg.Client(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT;

app.set('view engine','ejs');

app.use(cors());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

// ----------------------------------------------
// Routes
// ----------------------------------------------

app.get('/', handleHome);
app.get('/surch', renderResults);
// app.get('/details', renderDetail)
// app.post('/add_ratings', addRatings);
// app.get('/about', renderAbout);

app.use('*', handleNotFound);
app.use(handleError);


// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

function handleHome(req,res) {
    res.status(200).render('pages/index')
    .catch(error => handleError(error,res));
}

function renderResults(req,res) {

const searchQuery = req.query.searchQuery;
const API = `https://api.yelp.com/v3/businesses/search`;


let queryObject = {
 categories: 'dog_parks',
 sort_by: 'distance',
 location: searchQuery,
 limit: 5
}

superagent.get(API)
  .set("Authorization", `Bearer ${process.env.YELP_API_KEY}`)
  .query(queryObject)
  .then(obj =>{
    res.status(200).send(obj.body)
    // res.status(200).render('pages/results')
    // console.log('obj.body++++++',obj.body);
  })

    .catch(error => handleError(error,res))
}

function comebacktome (req,res) {
    console.log(`req.body: ${req.body.name}`);
    let SQL = 'INSERT INTO poketable (name, url) VALUES ($1, $2) RETURNING *;';

    let param = [req.body.name, req.body.url];

    client.query(SQL, param)
        .then(results => {
            console.log(`results: ${results.rows}`)
            res.redirect(`/`)
        })
        .catch(error => {
            console.log(`error with addPokemon: ${error}`)
            res.status(500).send(error);}
        );
};

function handleFavorites(req, res) {

    //create query
    const SQL = 'SELECT * from poketable';

    //give our SQL query to our pg 'agent'
    client.query(SQL)
        .then (results => {
          res.render('favorites', {savedCritters:results.rows})
            // res.status(200).json(results);
        })
        .catch(error => {
            console.log(`error with handleFavorites: ${error}`)
            res.status(500).send(error);}
        );   
}

function handleNotFound(req, res) {
    res.status(404).send('Could Not Find What You Asked For');
}
  
  // 500 (catastrophic) error handler. Log it, and then tell the user
function handleError(error, res) {
    console.error(error);
    res.status(500).render('error',{error_data: error})
} 



// ----------------------------------------------
// CONSTRUCTORS
// ----------------------------------------------

function Parks(obj) {
    this.yelp_id = obj.id;
    this.name = obj.name;
    this.url = obj.image_url;
    this.addr = obj.location.display_address;
    this.lat = obj.coordinates.latitude;
    this.long = obj.coordinates.longitude;

    this.ratings = '';
    this.dogsize = '';
    this.washStation = '';
    this.trails = '';
    this.water = '';
    this.description = '';
};


// ----------------------------------------------
// CONNECT
// ----------------------------------------------

//app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));


client.connect()
    .then( () => {
    app.listen(PORT, ()=> console.log('server running on port', PORT));
    })
    .catch(err => {
        throw `PG startuperror: ${err.message}`;
});