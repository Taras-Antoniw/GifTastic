//Initialize data
var downloadNumber = 10;
var topics = ["porsche", "volkswagen", "bmw", "audi"];
var downloadIndex = [1,1,1,1];
//Start application
buttonCreator();

$(document).on('click', '.btn', function() {
    //console.log("You clicked", $(this).val())
    target = $(this).val();
    //console.log(target);
    for (j=0; j<topics.length; j++) {
      //console.log("j "+j);
      if (target === topics[j]) {
        //console.log ("topics "+topics[j]);
        var downloadMult = downloadIndex[j];
        //console.log("index "+ downloadIndex);
        var downloadTotal = downloadMult*downloadNumber;
        var downloadStart = (downloadMult-1)*downloadNumber;
        //console.log(downloadTotal);
         downloadIndex[j] ++;
         //console.log("updated index "+downloadIndex);
      }
    } 

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    target + "&api_key=C11J3fVoCqwB3kPXS1507oAHLWUAytxc&limit="+downloadTotal;

    $.ajax({
      url: queryURL,
      method: "GET"
      }).then(function(response) {
        //console.log(response);
        results = response.data
        for (i=downloadStart; i<(downloadTotal); i++) {
          $photoDiv = $("<div>");
          $p = $("<p>");
          $p.text("Title: "+results[i].title);
          $p.append("<br>Rating: "+results[i].rating);
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
//Add another car maufucatuere routine
$("#add-car").on("click", function(event) {
    event.preventDefault();
    console.log(this);
    var carInput = $("#car-input").val().trim();
    topics.push(carInput);
    downloadIndex.push(1);
    //$("#car-form").attr("#add-car","");
    //console.log(downloadIndex);
    buttonCreator();
  });
//Stop or animate the gif toggle
  $(document).on("click",".gif", function() {
    //console.log(this);
    var $image = $(this);
    //console.log($image);
      var state = $image.attr("data-state");
      //console.log(state);
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
//Button creator function
  function buttonCreator() {
    $("#button-bar").text("");
        for (i=0; i<topics.length; i++) {
        $("#button-bar").append("<button id=choice class='btn btn-secondary' value=" + topics[i] + ">" + topics[i] + "</button><br><br>");
        //console.log(topics[i]);
    };
    };
    