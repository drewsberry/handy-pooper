function scrollToId(targetId) {
  var $targetElement = $('#' + targetId);

  $('html,body').animate(
      { scrollTop: $targetElement.offset().top },
      'slow',
      'swing');
}
