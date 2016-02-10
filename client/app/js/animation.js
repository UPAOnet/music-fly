$(document).ready(function () {
  if ($(window).width() < 870) {
      $('#player-menu').hide();
      $('#player-toggle').show();
    }
  if ($(window).width() > 870) {
    $('#player-menu').show(); 
    $('#player-toggle').hide();                       
  }
  $(window).resize(function () {
    if ($(window).width() < 870) {
      $('#player-menu').hide();
      $('#player-toggle').show()
    }
    if ($(window).width() > 870) {
      $('#player-menu').show();       
      $('#player-toggle').hide();  
    }
  })
})