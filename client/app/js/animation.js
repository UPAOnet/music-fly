$(document).ready(function () {
  if ($(window).width() < 870) {
      $('#player-menu').hide();
    }
 else if ($(window).width() > 870) {
    $('#player-menu').show();                     
  }
 
  $(window).resize(function () {
    if ($(window).width() < 870) {
      $('#player-menu').hide();
    }
    else if ($(window).width() > 870) {
      $('#player-menu').show();       
    }
  })  
})

$('.artist-box').dimmer({
    on: 'hover'
  })

