window.harrison = window.harrison || {};

window.harrison.moodslider = window.harrison.moodslider || {};

window.harrison.moodslider.UPLOAD_URL = "/films"

window.harrison.moodslider.calm = 5;
window.harrison.moodslider.sad = 5;
window.harrison.moodslider.awake = 5;
window.harrison.moodslider.courage = 5;

window.harrison.moodslider.init = function(){
  $(".slider").slider({
      max: 9,
      value: 5
  });
}

window.harrison.moodslider.getFilms = function(){
  var url = window.location.protocol + "//" + window.location.host + window.harrison.moodslider.UPLOAD_URL;
  $.ajax({
    url: url,
    type: "GET",
    data: {
      calm: window.harrison.moodslider.calm,
      sad: window.harrison.moodslider.sad,
      awake: window.harrison.moodslider.awake,
      courage: window.harrison.moodslider.courage
    },
    success: function(data) {
        $(".film").each(function(i, e){
            if(i >= data.length) {
              window.harrison.moodslider.setNoContent(e);
            } else {
              $(".film-img", e).attr("src", data[i].image);
              $(".film-title", e).text(data[i].name);
            }
        });
    },
    error: function(data, other, another) {

        $(".film").each(window.harrison.moodslider.setNoContent);
        $("#film-container").prepend("Error retrieving films...");
    }
  });
}

window.harrison.moodslider.updateMoodValue = function(attributeName, sliderId) {
    if(window.harrison.moodslider[attributeName]) {
        window.harrison.moodslider[attributeName] = $(sliderId + ".slider").slider("option", "value");
    }
}

$("#courage-slider").on("slidechange", function(e, ui) {
    window.harrison.moodslider.courage = $("#courage-slider").slider("option", "value");
    window.harrison.moodslider.getFilms();
});
$("#calm-slider").on("slidechange", function(e, ui) {
    window.harrison.moodslider.calm = $("#calm-slider").slider("option", "value");
    window.harrison.moodslider.getFilms();
});
$("#awake-slider").on("slidechange", function(e, ui) {
    window.harrison.moodslider.awake = $("#awake-slider").slider("option", "value");
    window.harrison.moodslider.getFilms();
});
$("#sad-slider").on("slidechange", function(e, ui) {
    window.harrison.moodslider.sad = $("#sad-slider").slider("option", "value");
    window.harrison.moodslider.getFilms();
});

window.harrison.moodslider.setNoContent = function(filmElement) {
  $(".film-img", filmElement).attr("src", "images/img-placeholder.jpg");
  $(".film-title", filmElement).text("No Content");
}
