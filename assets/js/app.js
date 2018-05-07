//global variables

//topics

var aesthetics = ["scenery","cinemagraph","nature","timelapse","architecture"];
var gallery = $("#gallery");


//creates the buttons in aesthetics array
function createInputs() {
	$("#gallery-buttons").empty();

	for (var i= 0; i < aesthetics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("subject");
		newButton.attr("data-name",aesthetics[i]);
		newButton.text(aesthetics[i]);

		$("#gallery-buttons").append(newButton);
	}
};

//adds user's input to the end of the array and creates a button for it
$("#addToGallery").on("click", function(event){
	event.preventDefault();

	var subject = $("#subject-input").val().trim();
	aesthetics.push(subject);
	createInputs();
});

function displayGallery(){

	var gallerySubject  = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gallerySubject + "&api_key=E5tZleXqhxHbqi6ns8x5xTX15OVhBNZv&limit=9";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		console.log(queryURL);
		console.log(response);

		var results = response.data;
		for (var i = 0; i < results.length; i++){
			currentGif = results[i];

			var gifDiv = $("<div class='col-4'>");
			var p = $("<p>");

			p.text("Rated " + currentGif.rating);

			var galleryGif = $("<img>");

			var stillGif = currentGif.images.original_still.url;
			var animatedGif = currentGif.images.original.url;


			galleryGif.attr("class", "img-fluid gif")
			galleryGif.attr("src", stillGif);
			galleryGif.attr("data-state", "still");
			galleryGif.attr("data-still", stillGif);
			galleryGif.attr("data-animate", animatedGif);

			gifDiv.append (p, galleryGif);
			gallery.append(gifDiv);
		}
	});
};


$(document).on("click", ".subject", displayGallery);
createInputs();

//animate on hover
$(document).on({
	mouseenter:function() {

  var gif = $(this);
  var animated = gif.attr("data-animate");

  gif.attr("data-state","animate");
  gif.attr("src", animated);
	},
	mouseleave:function(){

  var gif = $(this);
  var still = gif.attr("data-still");

  	gif.attr("data-state","still");
    gif.attr("src",still);
	}
}, ".gif");



