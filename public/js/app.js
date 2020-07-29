console.log('Hello App.js works');
$('.truck_button').click(() => {
  $('.groomer_card').css('display', 'none');
  $('.vet_car').css('display', 'none');
  $('.dayCare_card').css('display', 'none');
  $('.truck_card').css('display', 'grid');
});
$('.groomers_button').click(() => {
  $('.truck_card').css('display', 'none');
  $('.vet_car').css('display', 'none');
  $('.dayCare_card').css('display', 'none');
  $('.groomer_card').css('display', 'grid');
});
$('.vet_button').click(() => {
  $('.truck_card').css('display', 'none');
  $('.groomer_card').css('display', 'none');
  $('.dayCare_card').css('display', 'none');
  $('.vet_card').css('display', 'grid');
});
$('.dayCare_button').click(() => {
  $('.truck_card').css('display', 'none');
  $('.vet_card').css('display', 'none');
  $('.groomer_card').css('display', 'none');
  $('.dayCare_card').css('display', 'grid');
});