$(document).ready(function(){
// Initial array of animals
var animals = ["Sloth", "Emu", "Skunk", "Lion"];
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ animal +"&api_key=w4JC8PToVpdJEI85R8y8jq8v7qSEmeEz&limit=10";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   
    // For loop to create images/ratings for all returned responses 
    for (var i = 0; i < response.data.length; i++) {

    // Retrieves the Rating Data
    var rating = response.data[i].rating;

    // Creates an element to have the rating displayed
    var ratingData = $('<p class="ratings">').text('Rating: ' + rating);

    // Creates an element to hold the image
    var imageURL = response.data[i].images.fixed_height.url;
    var gif = $('<img class="column animalGif">').attr('src', imageURL);

    // Appends the image and rating data
    $("#animal-container").prepend(gif, ratingData);

  }});

}


// Function for displaying animal buttons
function renderButtons() {

  // Deletes the animals prior to adding new animals
  $("#animalButton").empty();

  // Loops through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generates buttons for each animal in the array
    var a = $("<button>");

    // Adds a class of animal-button to our button
    a.addClass("animal-button btn btn-info");

    // Added a data-attribute
    a.attr("data-name", animals[i]);

    // Provided the initial button text
    a.text(animals[i]);

    // Added the button to the animalButton div
    $("#animalButton").append(a);
  }
}

// This function handles events where the add animal button is clicked
$("#addAnimal").on("click", function(event) {
  event.preventDefault();

  // This line of code will grab the input from the textbox, and trim it to removes spaces and such
  var newAnimal = $("#animal-input").val().trim();

  // The animal from the textbox is then added to our array
  animals.push(newAnimal);

  $("#animal-input").empty();

  // Calling renderButtons which handles the processing of our animals array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "animal-button"
$(document).on("click", ".animal-button", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

});
