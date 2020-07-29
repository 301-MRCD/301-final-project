"use strict";
console.log('Hello App.js works');


$('.truck_button').click(() => {
  $('.groomer_card').hide();
  $('.vet_car').hide();
  $('.dayCare_card').hide();
  $('.truck_card').show();
});

$('.groomers_button').click(() => {
  $('.truck_card').hide();
  $('.vet_car').hide();
  $('.dayCare_card').hide();
  $('.groomer_card').show();
});

$('.vet_button').click(() => {
  $('.truck_card').hide();
  $('.groomer_card').hide();
  $('.dayCare_card').hide();
  $('.vet_card').show();
});

$('.dayCare_button').click(() => {
  $('.truck_card').hide();
  $('.vet_card').hide();
  $('.groomer_card').hide();
  $('.dayCare_card').show();
});

//
// let map;

// function initMap() {

//     var mapProp = {
//         center:new google.maps.LatLng(51.508742,-0.120850),
//         zoom:5,
//     };
    
// map = new google.maps.Map(document.getElementById("map"), mapProp);