$(function() {
  //Fixed header on scroll
  window.onscroll = function() {
    stickyHeader()
  };

  function stickyHeader() {
    if (window.pageYOffset > 100) {
      $("#sticky-header").addClass("sticky");
    } else {
      $("#sticky-header").removeClass("sticky");
    }
  }
});
