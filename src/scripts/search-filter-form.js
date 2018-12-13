$(function() {

  $('#filter-btn, #filter-btn-tablet').click(function() {
    $("#search-btn").addClass("sticky-btn");
  });



  $(window).scroll(function() {

    var vh = Math.max(window.innerHeight || 0);
    var topofDiv = $("#afstand-accordion").offset().top;

    //document.documentElement.clientHeight,

    if ($(window).scrollTop() > (topofDiv - vh + 50)) {
      $("#search-btn").removeClass("sticky-btn");
      $("#filter-alert").removeClass("sticky-alert");
    } else {
      $("#search-btn").addClass("sticky-btn");
      $("#filter-alert").addClass("sticky-alert");
    }
  });

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


});
