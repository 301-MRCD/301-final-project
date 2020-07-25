'use strict';
// ----------------------------------------------
// LIBRARIES AND DECLARATIONS
// ----------------------------------------------
require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');
const client = new pg.Client(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT;
const override = require('method-override');

app.set('view engine', 'ejs');
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(override('_method'));

// ----------------------------------------------
// ROUTES
// ---------------------------------------------
app.get('/', handleHome);
app.get('/render_results', renderResults);
app.post('/render_details', renderDetail);
app.post('/add_ratings', addRatings);
// app.get('/render_about', renderAbout);

app.use('*', handleNotFound);
app.use(handleError);

// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

function handleHome(req, res) {
  res
    .status(200)
    .render('pages/index')
    .catch((error) => handleError(error, res));
}

function renderResults(req, res) {
  const searchQuery = req.query.searchQuery;
  const API = `https://api.yelp.com/v3/businesses/search`;

  let queryObject = {
    categories: 'dog_parks',
    sort_by: 'distance',
    location: searchQuery,
    limit: 5,
  };

  superagent
    .get(API)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .query(queryObject)
    .then((obj) => {
      let apiData = obj.body.businesses.map((park) => new Park(park));
      res.status(200).render('pages/results', { parkArr: apiData });
    })

    .catch((error) => handleError(error, res));
}

function renderDetail(req, res) {
  let SQL = `SELECT * FROM parks_table WHERE yelp_id=$1`;
  // let SQL = `SELECT yelp_id, park_name, sum(total_ratings/total_votes) as avg_rating FROM parks_table WHERE yelp_id=$1 ORDER BY avg DESC;`;
  let values = [req.body.yelp_id];
  client
    .query(SQL, values)
    .then((results) => {
      if (results.rowCount === 0) {
        console.log(
          'results from line 74++++++++++++++++++++++++++++++',
          results
        );
        createParkRating(req.body.yelp_id, req.body.name, res);
      } else {
        // render existing rating

        let average =
          results.rows[0].total_ratings / results.rows[0].total_votes || 0;
        console.log('I am average 94+++++++++++++++++', average);
        res
          .status(200)
          .render('pages/details', {
            ratings: results.rows[0],
            average1: average,
          });
      }
    })
    .catch((error) => handleError(error, res));
}

function createParkRating(yelp_id, park_name, res) {
  let SQL = `INSERT INTO parks_table (yelp_id, park_name, total_ratings, total_votes)  VALUES ($1, $2, $3, $4) RETURNING *;`;
  let safequery = [yelp_id, park_name, 0, 0];
  client
    .query(SQL, safequery)
    .then((results) => {
      console.log(
        'I am results.rows+++++++++++++++++++++++++++',
        results.rows[0]
      );
      let average =
        results.rows[0].total_ratings / results.rows[0].total_votes || 0;
      console.log('I am average 94+++++++++++++++++', average);
      res
        .status(200)
        .render('pages/details', {
          ratings: results.rows[0],
          average1: average,
        });
    })
    .catch((error) => handleError(error, res));
}

function addRatings(req, res) {
  //on submit of rating send users rating to database and increment # of ratings by 1
  //pull update park rating and render to page
}

function comebacktome(req, res) {
  console.log(`req.body: ${req.body.name}`);
  let SQL = 'INSERT INTO parks (name, url) VALUES ($1, $2) RETURNING *;';

  let param = [req.body.name, req.body.url];

  client
    .query(SQL, param)
    .then((results) => {
      console.log(`results: ${results.rows}`);
      res.redirect(`/`);
    })
    .catch((error) => {
      console.log(`error with addPokemon: ${error}`);
      res.status(500).send(error);
    });
}

function handleFavorites(req, res) {
  //create query
  const SQL = 'SELECT * from parks';

  //give our SQL query to our pg 'agent'
  client
    .query(SQL)
    .then((results) => {
      res.render('favorites', { savedCritters: results.rows });
      // res.status(200).json(results);
    })
    .catch((error) => {
      console.log(`error with handleFavorites: ${error}`);
      res.status(500).send(error);
    });
}

function handleNotFound(req, res) {
  res.status(404).send('Could Not Find What You Asked For');
}

// 500 (catastrophic) error handler. Log it, and then tell the user
function handleError(error, res) {
  console.error(error);
  res.status(500).render('error', { error_data: error });
}

// ----------------------------------------------
// CONSTRUCTORS
// ----------------------------------------------

function Park(obj) {
  //api data
  this.yelp_id = obj.id;
  this.name = obj.name;
  this.image_url = obj.image_url;
  this.address = obj.location.display_address;
  this.lat = obj.coordinates.latitude;
  this.long = obj.coordinates.longitude;
  // //db data
  // this.ratings = '';
  // this.dogsize = '';
  // this.washStation = '';
  // this.trails = '';
  // this.water = '';
  // this.description = '';
}
// ----------------------------------------------
// CONNECT
// ----------------------------------------------

//app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));

client
  .connect()
  .then(() => {
    app.listen(PORT, () => console.log('server running on port', PORT));
  })
  .catch((err) => {
    throw `PG startuperror: ${err.message}`;
  });
