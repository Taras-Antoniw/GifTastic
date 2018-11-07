//Initialize topics
var downloadNumber = 10;

var topics = ["porsche", "volkswagen", "bmw", "audi"];

//Create buttons
function buttonCreator() {
$("#button-bar").text("");
    for (i=0; i<topics.length; i++) {
    $("#button-bar").append("<button id=choice class='btn btn-secondary' value=" + topics[i] + ">" + topics[i] + "</button><br><br>");
    console.log(topics[i]);
};
};
buttonCreator();
$(document).on('click', '.btn', function() {
    console.log("You clicked", $(this).val())
    target = $(this).val();
    console.log(target);


var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
target + "&api_key=dc6zaTOxFJmzC&limit="+downloadNumber;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      results = response.data
      for (i=0; i<10; i++) {
        $photoDiv = $("<div>");
        $p = $("<p>");
        $p.text("Rating: "+results[i].rating);
        $image = $("<img>");
        $image.attr("src",results[i].images.fixed_height_still.url);
        $image.attr("data-still",results[i].images.fixed_height_still.url);
        $image.attr("data-animate",results[i].images.fixed_height.url);
        $image.attr("data-state","still");
        $image.attr("class","gif");
        $photoDiv.append($image);
        $photoDiv.append($p);
        $("#photos-appear-here").prepend($photoDiv);
      }
  });

});

$("#add-car").on("click", function(event) {
    event.preventDefault();
    var carInput = $("#car-input").val().trim();

    topics.push(carInput);

    buttonCreator();
  });

  $(document).on("click",".gif", function() {
    console.log(this);
    var $image = $(this);
    console.log($image);
      var state = $image.attr("data-state");
      console.log(state);
      if (state === "still") {
        value = $(this).attr("data-animate");
        $(this).attr("src",value);
        $(this).attr("data-state","animate");
      }
       else if (state === "animate") {
      value = $(this).attr("data-still");
        $(this).attr("src",value);
        $(this).attr("data-state","still");
      }
  });