import '../styling/bootstrap-slider.css';
import '../styling/flexslider.scss';
import '../styling/main.scss';
import '../scripts/flexslider';
import '../scripts/bootstrap-slider';
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'easy-autocomplete/dist/jquery.easy-autocomplete';
//import '../assets/resources/searchresults.json';
import "jquery-colorbox/jquery.colorbox.js";

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

$(window).on('load', function() {
  //settings for the photo slider at detail-page
  $('.photo-slider-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 147,
    itemMargin: 23,
    prevText: "",
    nextText: "",
    asNavFor: '.photo-slider-content'
  });

  $('.photo-slider-content').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: ".photo-slider-carousel"
  });

  // wizard
  $(".step").on('click', function(event) {
    var clickedStep = event.target.closest(".step");
    if (clickedStep) {
      if ($(clickedStep).hasClass("completed")) {
        $(clickedStep).removeClass("completed");
      }

      $(".step").each(function() {
        var step = $(this)[0];
        if (step === clickedStep) {
          return false;
        }
        if (!$(step).hasClass("completed")) {
          $(step).addClass("completed");
          console.log("completed step: " + step);
        }
      });
    }
  });

  // photogallery popup
  $(".slidelink").colorbox({
    rel: 'group3',
    transition: "none",
    width: "75%",
    height: "75%"
  });
});

$(function() {
  // sliders at zoeken
  $('#bouwjaar-slider').slider();
  $('#lengte-slider').slider();
  $('#diepgang-slider').slider();
  $('#doorvaarthoogte-slider').slider();

  //tooltips initialisation
  $('[data-toggle="tooltip"]').tooltip();

  var easyAutocompleteOptions = {
    url: function(phrase) {
      return "/screens/resources/searchresults.php";
    },
    getValue: function(element) {
      return element.name;
    },
    ajaxSettings: {
      dataType: "json",
      method: "POST",
      data: {
        dataType: "json"
      }
    },
    preparePostData: function(data) {
      data.phrase = $("#search-input").val();
      return data;
    },
    requestDelay: 100
  };

  var easyAutocompleteOptions2 = {
    url: function(phrase) {
      return "/screens/resources/searchresults.php";
    },
    getValue: function(element) {
      return element.name;
    },
    ajaxSettings: {
      dataType: "json",
      method: "POST",
      data: {
        dataType: "json"
      }
    },
    preparePostData: function(data) {
      data.phrase = $("#search-input-2").val();
      return data;
    },
    requestDelay: 100
  };
  $("#search-input").easyAutocomplete(easyAutocompleteOptions);
  $("#search-input-2").easyAutocomplete(easyAutocompleteOptions2);
});

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


  $('#filter-btn, #filter-btn-tablet').click(function() {
    $("#search-btn").addClass("sticky-btn");
  });


  if (document.getElementById("afstand-accordion") !== null) {
    $(window).scroll(function() {

      var vh = Math.max(window.innerHeight || 0);
      var topofDiv = $("#afstand-accordion").offset().top;
      //document.documentElement.clientHeight

      if ($(window).scrollTop() > (topofDiv - vh + 50)) {
        $("#search-btn").removeClass("sticky-btn");
        $("#filter-alert").removeClass("sticky-alert");
      } else {
        $("#search-btn").addClass("sticky-btn");
        $("#filter-alert").addClass("sticky-alert");
      }

    });
  }

  $("#bouwjaarmin, #bouwjaarmax, #lengteMin, #lengteMax, #diepgangMin, #diepgangMax, #doorvaarthoogteMin, #doorvaarthoogteMax").on('change', function() {

    var e = document.getElementById("bouwjaarmin");
    var bmin = e.options[e.selectedIndex].value;
    var f = document.getElementById("bouwjaarmax");
    var bmax = f.options[f.selectedIndex].value;

    var lmin = document.getElementById("lengteMin").value;
    var lmax = document.getElementById("lengteMax").value;

    var lminNumb = parseFloat(lmin);
    var lmaxNumb = parseFloat(lmax);

    var dmin = document.getElementById("diepgangMin").value;
    var dmax = document.getElementById("diepgangMax").value;

    var dminNumb = parseFloat(dmin);
    var dmaxNumb = parseFloat(dmax);

    var domin = document.getElementById("doorvaarthoogteMin").value;
    var domax = document.getElementById("doorvaarthoogteMax").value;

    var dominNumb = parseFloat(domin);
    var domaxNumb = parseFloat(domax);


    if (bmin > bmax || lminNumb > lmaxNumb || dminNumb > dmaxNumb || dominNumb > domaxNumb) {
      $("#search-btn").addClass("disabled");
      $("#search-btn").removeClass("validated");
      $("#search-btn").attr("type", "button");

    } else {
      $("#search-btn").removeClass("disabled");
      $("#search-btn").addClass("validated");
      $("#search-btn").attr("type", "submit");

      $("#filter-alert").addClass("d-none").removeClass("show");

    };

    $(".disabled").click(function() {
      $("#filter-alert").removeClass("d-none").addClass("show");
    });

    $(".validated").click(function() {

      $("#filter-alert").addClass("d-none").removeClass("show");
    });




    $(".disabled").on('click', function() {
      if (lminNumb > lmaxNumb) {
        $("#filter-alert li:nth-child(1)").removeClass("d-none");
      } else {
        $("#filter-alert li:nth-child(1)").addClass("d-none");
      }
      if (dminNumb > dmaxNumb) {
        $("#filter-alert li:nth-child(2)").removeClass("d-none");
      } else {
        $("#filter-alert li:nth-child(2)").addClass("d-none");
      }
      if (dominNumb > domaxNumb) {
        $("#filter-alert li:nth-child(3)").removeClass("d-none");
      } else {
        $("#filter-alert li:nth-child(3)").addClass("d-none");
      }
    });

    //$([document.documentElement, document.body]).animate({
    //  scrollTop: $("#lengte-filter-option-input").offset().top
    //}, 500);
    //console.log("wth");




  });

  $('#bouwjaarmin').on('change', function() {
    var $lastYear = $('#bouwjaarmax option')
    var startYearValue = this.value;

    $lastYear.prop("hidden", false);
    $lastYear.prop("disabled", false);

    if (startYearValue === 0) {
      return;
    }

    $lastYear.each(function() {
      if (this.value != 0 && this.value < startYearValue) {
        $(this).prop("hidden", true);
        $(this).prop("disabled", true);
      }
    })
  });

  $('#bouwjaarmax').on('change', function() {
    var $startYear = $('#bouwjaarmin option')
    var lastYearValue = this.value;

    $startYear.prop("hidden", false);
    $startYear.prop("disabled", false);

    if (lastYearValue == 0) {
      return;
    }

    $startYear.each(function() {
      if (this.value > lastYearValue) {
        $(this).prop("hidden", true);
        $(this).prop("disabled", true);
      }
    })
  });




  $('#prijsMin').on('change', function() {

    var prijsMax = $('#prijsMax option');
    var prijsMin = this.value.replace(/[^0-9]/g, '');
    var prijsMinNumb = parseFloat(prijsMin);

    prijsMax.prop("hidden", false);
    prijsMax.prop("disabled", false);

    if (prijsMinNumb === 0) {
      return;
    }

    prijsMax.each(function() {
      if (this.value.replace(/[^0-9]/g, '') != 0 && this.value.replace(/[^0-9]/g, '') < prijsMinNumb) {
        $(this).prop("hidden", true);
        $(this).prop("disabled", true);

      }
    })
  });

  $('#prijsMax').on('change', function() {

    var prijsMin = $('#prijsMin option');
    var prijsMax = this.value.replace(/[^0-9]/g, '');
    var prijsMaxNumb = parseFloat(prijsMax);

    prijsMin.prop("hidden", false);
    prijsMin.prop("disabled", false);

    if (prijsMaxNumb === 0) {
      return;
    }

    prijsMin.each(function() {
      if (this.value.replace(/[^0-9]/g, '') != 0 && this.value.replace(/[^0-9]/g, '') > prijsMaxNumb) {
        $(this).prop("hidden", true);
        $(this).prop("disabled", true);
      }
    })
  });

  $("#prijsMax, #prijsMin, #bouwjaarmin, #bouwjaarmax, #lengteMin, #lengteMax, #diepgangMin, #diepgangMax, #doorvaarthoogteMin, #doorvaarthoogteMax").trigger('change');

   function resultData() {

    // show that something is loading
    //  $('#response').html("<b>Loading response...</b>");

    /*
     * 'post_receiver.php' - where you will pass the form data
     * $(this).serialize() - to easily read form data
     * function(data){... - data contains the response from post_receiver.php
     */
    $.post('/ajax-search.php', $('#zoekform').serialize(), function(data) {

      // show the response
      $('#response').html(data);

      if (document.getElementById("response").innerHTML == "0") {
        $("#search-btn").addClass("disabled");
        $("#search-btn").attr("type", "button");
      } else {
        $("#search-btn").removeClass("disabled");
        $("#search-btn").attr("type", "submit");
      }


    }).fail(function() {

      // just in case posting your form failed
      //alert("Posting failed.");

    });

    // to prevent refreshing the whole page page
    return false;


  }
  $("#zoekform input, #zoekform select").on('change', resultData);
  $("#reset-btn").on('click', function() {
    document.getElementById("zoekform").reset();
    resultData();
  });

  $("#zoekform input").trigger('change');





});
