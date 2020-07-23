'use strict';

require('dotenv').config();

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
app.get('/results',renderResults);
app.get('/details', renderDetail)
app.post('/add_ratings', addRatings);
app.get('/about', renderAbout);

app.use('*', handleNotFound);
app.use(handleError);


// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

function handleHome(req,res) {
let pokeArr = [];
const API = 'https://pokeapi.co/api/v2/pokemon';
// console.log(`API call: ${API}`)

superagent.get(API)
    .then(obj => {
        obj.body.results.forEach(critter =>{
        let pokeObj = new Pokemon(critter);
        pokeArr.push(pokeObj);
        });

        pokeArr.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });
        // res.status(200).json(pokeArr);
        res.render('show', {critters: pokeArr});
    })
    .catch(error => {
        console.log(`error with slashHandler: ${error}`)
        res.status(500).send(error);

    });
}

function addPokemon (req,res) {
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
function handleError(error, req, res, next) {
    console.error(error);
    res.status(500).send('Something Bad Happened')
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