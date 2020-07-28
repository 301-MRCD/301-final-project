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
// const axios = require('axios');
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
app.get('/render-results', renderResults);
// app.get('/render-maps', renderMap);
app.post('/render-details', renderDetail);
app.post('/add-ratings', addRatings);
app.get('/render_about', renderAbout);

app.use('*', handleNotFound);
app.use(handleError);

// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------

function handleHome(req, res) {
  // axios.get('https://maps.googleapis.com/maps/api/js?key='+process.env.GOOGLE_API_KEY+'&callback=initMap')
  //   .then(result => {
  //     res.send(result.data);
  //   })
  res.status(200).render('pages/index')
    .catch((error) => handleError(error, res));
}

function renderAbout(req, res) {
  // axios.get('https://maps.googleapis.com/maps/api/js?key='+process.env.GOOGLE_API_KEY+'&callback=initMap')
  //   .then(result => {
  //     res.send(result.data);
  //   })
  res.status(200).render('pages/about')
    .catch((error) => handleError(error, res));
}

function renderResults(req, res) {
  const searchQuery = req.query.searchQuery;
  const API = `https://api.yelp.com/v3/businesses/search`;

  let queryObject = {
    categories: 'dog_parks',
    sort_by: 'distance',
    location: searchQuery,
    limit: 20,
  };

  superagent
    .get(API)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .query(queryObject)
    .then((obj) => {
      let apiData = obj.body.businesses.map((park) => new Park(park));
      renderMap(req, res);
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
        createParkRating(req.body.yelp_id, req.body.name, res, req.body.image_url, req.body.address);
      } else {
        let average =results.rows[0].total_ratings / results.rows[0].total_votes || 0;
        res.status(200).render('pages/details', {
          ratings: results.rows[0],
          average1: average,
          image_url: req.body.image_url,
          name: req.body.name,
          address: req.body.address,
          yelp_id: req.body.yelp_id
        });
      }
    })
    .catch((error) => handleError(error, res));
}

function createParkRating(yelp_id, park_name, res, imageurl, address) {
  let SQL = `INSERT INTO parks_table (yelp_id, park_name, total_ratings, total_votes)  VALUES ($1, $2, $3, $4) RETURNING *;`;
  let safequery = [yelp_id, park_name, 0, 0];
  client
    .query(SQL, safequery)
    .then((results) => {
      let average =
        results.rows[0].total_ratings / results.rows[0].total_votes || 0;
      res.status(200).render('pages/details', {
        ratings: results.rows[0],
        average1: average,
        image_url: imageurl,
        name: park_name,
        yelp_id: yelp_id,
        address: address
      });
    })
    .catch((error) => handleError(error, res));
}

function addRatings(req, res) {
  let SQL = ` UPDATE parks_table
  SET total_ratings = $1, total_votes = $2
  WHERE yelp_id = $3
  RETURNING * `;
  let newTotalRatings = +req.body.total_ratings + +req.body.rating;
  let newTotalVotes = +req.body.total_votes + 1;
  let params = [newTotalRatings, newTotalVotes, req.body.yelp_id];

  client
    .query(SQL, params)
    .then(results => {
      let average =results.rows[0].total_ratings / results.rows[0].total_votes || 0;
      res.status(200).render('pages/details', {
        ratings: results.rows[0],
        average1: average,
        image_url: req.body.image_url,
        name: req.body.name,
        address: req.body.address,
        yelp_id: req.body.yelp_id
      });
    });
}

function renderMap(req, res){
// // const API =  https://www.google.com/maps/embed/v1/search?key=GOOGLE_API_KEY&q=record+stores+in+Seattle
//   //this function needs to take in the user's search location and return a map of the area with all the parks rendered on the map.  This will be on the results page
//   const searchQuery = req.query.searchQuery;
//   console.log('searchQuery from renderMap++++++++++++++++++++++', searchQuery);
//   const API = `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&GOOGLE_API_KEY`;
//   let queryObject = {
//     GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
//     // callback: 'initMap',
//     // query: '47.608013, -122.335167',
//     // type: 'park',
//     // keyword: 'dog'
//   };
//   console.log('this is the queryObject from line 144+++++++++++++++++++++', queryObject)

//   superagent
//     .get(API)
//     .query(queryObject)
//     .then((obj)=>{
//       let googleApiData = obj;
//       console.log('googleapidata obj.body line 156+++++++++++++++++++++', googleApiData);

//     });
//   //we need to pass in both the user's search queried location, and also the locations of all the parks that are returned by the Yelp API


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
