// Copyright © 2016 - Drew Silcock

'use strict';

function scrollToId(targetId) {
  var $targetElement = $('#' + targetId);

  $('html,body').animate({
    scrollTop: $targetElement.offset().top,
  }, 'slow', 'swing');
}

function scrollToTop() {
  $('html,body').animate({
    scrollTop: 0,
  }, 'slow', 'swing');
}

function initialiseMap() {
  var farnhamCastleLocation = {
    lat: 51.219032,
    lng: -0.802639,
  };

  var mapElement = $('.hp-map').get(0);
  var map = new google.maps.Map(mapElement, {
    center: farnhamCastleLocation,
    zoom: 15
  });

  var marker = new google.maps.Marker({
    'title': 'Farnham Castle',
    position: farnhamCastleLocation,
    map: map,
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
  const weddingDate = new Date(2017, 5, 17, 14);
  const secondsToWedding = (weddingDate - new Date) * 0.001;

  const clock = $clock.FlipClock(secondsToWedding, {
    clockFace: 'DailyCounter',
    countdown: true,
    showSeconds: false,
    minimumDigits: 7,
  });
}

function initialiseScrollers() {
  const $scrollers = $('.hp-scroller');

  $scrollers.each(function(index, element) {
    const $element = $(element);
    const scrollToSelector = $element.data('scroll-to');
    const $scrollToElement = $(scrollToSelector);

    $element.on('click', function() {
      $('html,body').animate({
        scrollTop: $scrollToElement.offset().top,
      }, 'slow', 'easeInOutSine');
    });
  });
}

function initialiseScrollToTopButton() {
  var $mainContent = $('main');
  var mainContentScrollPosition = $mainContent.offset().top;

  $(window).on('scroll', function triggerFadeInOut() {
    var currentScrollPosition = $(this).scrollTop();

    if (currentScrollPosition > mainContentScrollPosition) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // scroll body to 0px on click
  var $backToTop = $('#back-to-top');
  $backToTop.on('click', function scrollToTopWithEvent(evt) {
    scrollToTop();
    evt.preventDefault();
  });

  $backToTop.tooltip('show');
}

// Reveal sections only when you scroll to them with ScrollReveal.js.
function initialiseReveal() {
  window.sr = ScrollReveal();
  sr.reveal('.hp-layout__image', { duration: 1000 });
  sr.reveal('.hp-map');
  sr.reveal('.gm-style');
  sr.reveal('.hp-timeline .timeline li', { duration: 2000, delay: 250 });
}

$(function() {
  initialiseMap();
  initialiseCountdown();
  initialiseScrollers();
  initialiseScrollToTopButton();
  initialiseReveal();
});
