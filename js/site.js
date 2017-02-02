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

function initialiseCountdown() {
  var $clock = $('.hp-header__countdown');
  var weddingDate = new Date(2017, 5, 17, 14);
  var secondsToWedding = (weddingDate - new Date) * 0.001;

  var clock = $clock.FlipClock(secondsToWedding, {
    clockFace: 'DailyCounter',
    countdown: true,
    showSeconds: false,
    minimumDigits: 7,
  });
}

function initialiseScrollers() {
  var $scrollers = $('.hp-scroller');

  $scrollers.each(function(index, element) {
    var $element = $(element);
    var scrollToSelector = $element.data('scroll-to');
    var $scrollToElement = $(scrollToSelector);

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

  var triggerFadeInOut = function () {
    var currentScrollPosition = $(this).scrollTop();

    if (currentScrollPosition > mainContentScrollPosition) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  };

  $(window).on('scroll', triggerFadeInOut);
  triggerFadeInOut();

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
  sr.reveal('.gm-style');
  sr.reveal('.hp-timeline .timeline li', { duration: 2000, delay: 50 });
  sr.reveal('.hp-course', { duration: 1000 });
  sr.reveal('.hp-thumbnail', { duration: 2000 }, 200);

  return sr;
}

function initialiseMap(scrollReveal) {
  var farnhamCastleLocation = {
    lat: 51.219032,
    lng: -0.802639,
  };

  var mapElement = $('.hp-map').get(0);
  var map = new google.maps.Map(mapElement, {
    center: farnhamCastleLocation,
    zoom: 15,
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

  marker.addListener('click', function () {
    if (infoWindow.map === null) {
      infoWindow.open(map, marker);
    }
  });

  // Initialise with scroll reveal only after map has loaded.
  google.maps.event.addListener(map, 'bounds_changed', function () {
    // Event fires after load; only want this to run once on load.
    google.maps.event.clearListeners(map, 'bounds_changed');

    var $map = $('.hp-map');

    $map.addClass('fade-in');
    scrollReveal.reveal('.hp-map');
  });
}

$(function() {
  initialiseCountdown();
  initialiseScrollers();
  initialiseScrollToTopButton();
  var scrollReveal = initialiseReveal();
  initialiseMap(scrollReveal);
});