// Initial array of topics
var topics = [
  "Dad",
  "Neighbor's Cat",
  "Macho Man Randy Savage",
  "Hot Rod",
  "Pokemon",
  "Rollerblading",
  "Climbing",
  "Skateboards",
  "Bugs",
  "Yugiyoh Cards"
];

// Generic function for capturing the topic name from the data-attribute
function handleTopicClick() {
  let query = $(this).val();
  displayTopicGifs(query);
}

function displayTopicGifs(query) {
  $("label").html("#" + query);

  let queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=lwtBoBJI3Tf5pEJ4lfDapjREB8gPwYb3&limit=10&q=" +
    query;

  jQuery.support.cors = true;
  var settings = {
    url: queryURL,
    method: "GET"
  };

  $.ajax(settings).then(response => {
    let gifs = $("<div>");
    gifs.addClass("gifs");
    response.data.map(gif => {
      //   console.log(gif);
      //   console.log(gifs);
      let gifContainer = $("<div>");
      gifContainer.addClass("gif-container");
      let gifEl = $("<img>");
      gifEl.addClass("gif");
      gifEl.attr("src", gif.images.original_still.url);
      gifEl.attr("data-still", gif.images.original_still.url);
      gifEl.attr("data-animate", gif.images.original.url);
      gifEl.attr("data-state", "still");
      gifContainer.append(gifEl);
      gifContainer.append("Rating: " + gif.rating.toUpperCase());

      gifs.prepend(gifContainer);
    });
    $("#gifs-container").html(gifs);
  });

  $(document).trigger("change");
}

// Function for displaying topic data
function renderButtons() {
  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("topic");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    a.val(topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the HTML
    $("#buttons-view").append(a);
  }
}

function animationToggle() {
  let state = $(this).attr("data-state");
  let stillImage = $(this).attr("data-still");
  let animatedImage = $(this).attr("data-animate");

  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", animatedImage);
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", stillImage);
  }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var topic = $("#topic-input")
    .val()
    .trim();

  if (topic !== "" && !topics.includes(topic)) {
    topics.push(topic);
    displayTopicGifs(topic);
  }

  $("#topic-input").val("");

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Function for displaying the topic info
// We're adding a click event listener to all elements with the class "topic"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".topics").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".topic", handleTopicClick);

$(document).on("click", ".gif", animationToggle);

// Calling the renderButtons function to display the intial buttons
renderButtons();
