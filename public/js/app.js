console.log('Hello App.js works');

$('.groomers_button').click(() => {
  $( '.truck_card').hide();
  $('.vet_car').hide();
  $('.dayCare_card').hide();
  $( '.groomer_card' ).css('visibility', 'visible');
} );

$( '.truck_button' ).click( () => {
  $( '.groomer_card' ).hide();
  $( '.vet_car' ).hide();
  $( '.dayCare_card' ).hide();
  $( '.truck_card' ).css( 'visibility', 'visible' );
} );

$( '.vet_button' ).click( () => {
  $( '.truck_card' ).hide();
  $( '.groomer_card' ).hide();
  $( '.dayCare_card' ).hide();
  $( '.vet_card' ).css( 'visibility', 'visible' );
} );

$( '.dayCare_button' ).click( () => {
  $( '.truck_card' ).hide();
  $( '.vet_car' ).hide();
  $( '.groomer_card' ).hide();
  $('.dayCare_card').css('visibility', 'visible');
} );