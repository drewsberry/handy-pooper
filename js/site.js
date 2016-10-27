// Copyright Drew Silcock (2016)

'use strict';

function scrollToId(targetId) {
  var $targetElement = $('#' + targetId);

  $('html,body').animate({
    scrollTop: $targetElement.offset().top,
  }, 'slow', 'swing');
}

function initialiseMap() {
  var farnhamCastleLocation = {
    lat: 51.2186021,
    lng: -0.8049171,
  };

  var mapElement = $('.hp-map').get(0);
  var map = new google.maps.Map(mapElement, {
    center: farnhamCastleLocation,
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: farnhamCastleLocation,
    map: map,
    'title': 'Farnham Castle',
    animation: google.maps.Animation.DROP,
  });

  var infoWindow = new google.maps.InfoWindow({
    'title': 'Farnham Castle',
    content: '<div class="hp-map__info-title">Farnham Castle</div>' +
             '<div class="hp-map__info">This is where the magic happens!</div>',
  });

  infoWindow.open(map, marker);

  marker.addListener('click', function() {
    if (infoWindow.map === null) {
      infoWindow.open(map, marker);
    }
  });
}

function initialiseCountdown() {
  const $clock = $('.hp-header__countdown');
  const weddingDate = new Date(2017, 5, 17, 12);
  const secondsToWedding = (weddingDate - new Date) * 0.001;

  const clock = $clock.FlipClock(secondsToWedding, {
    clockFace: 'DailyCounter',
    countdown: true,
    showSeconds: false,
  });
}

$(function() {
  initialiseMap();
  initialiseCountdown();
});
