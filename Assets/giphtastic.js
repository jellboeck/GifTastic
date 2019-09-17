var character
var queryURL

$("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    character = $(this).attr("data-char");
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

                // Creating and storing a div tag
                var characterDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);
            
                // Creating and storing an image tag
                var characterImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                characterImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                characterDiv.append(characterImage);
                characterDiv.append(p);
             

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(characterDiv);
            }
        });
})