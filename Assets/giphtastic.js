var character;
var queryURL;
var data_char = ["Homer Simpson" , "Marge Simpson" , "Bart Simpson", "Lisa Simpson", "Maggie Simpson", "Santas Little Helper", "Mr Burns", "Moe Szyslak", "Barney Gumble", "Milhouse"];


function renderButtons(){ 

    $("#renderButtons").empty();

    for (var j = 0; j < data_char.length; j++){

        var newButton = $("<button>") 
        newButton.attr("class", "char-btn");
        newButton.attr("id", "input")  
        newButton.attr("data-name", data_char[j]); 
        newButton.text(data_char[j]); 
        $("#renderButtons").append(newButton); 
    }
}

renderButtons()

$("button").on("click", function () {
    character = $(this).attr("data-name");
    console.log(character);

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=aP1JtX6qhjRwytwweX5ZMDeioKQqBmjV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing a div tag
                characterDiv = $("<div>");
                characterDiv.attr("id", "characterDiv");

                // Creating and storing an image tag
                characterImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-state", "still");
                characterImage.addClass("gif");


                // Appending the paragraph and image tag to the animalDiv
                characterDiv.append(characterImage);
                characterDiv.append(p);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(characterDiv);


            }

        });
})

$("#gifs-appear-here").on("click", ".gif", function () {
    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state === "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
});

