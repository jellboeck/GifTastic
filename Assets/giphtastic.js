var character;
var queryURL;
var data_char = ["Homer Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson", "Santas Little Helper", "Mr Burns", "Moe Szyslak", "Barney Gumble", "Milhouse"];

renderButtons()

function renderButtons() {

    $("#renderButtons").empty();

    for (var j = 0; j < data_char.length; j++) {

        var newButton = $("<button>")
        newButton.addClass("char-btn");
        newButton.attr("id", "input")
        newButton.attr("data-name", data_char[j]);
        newButton.text(data_char[j]);
        $("#renderButtons").append(newButton);
        console.log(data_char[j]);
    }
}

$("#submitChar").on("click", function () {
    event.preventDefault();
    var newCharacter = $("#newCharacter").val().trim();
    data_char.push(newCharacter);
    console.log(data_char);
    renderButtons();

})

$("#renderButtons").on("click", ".char-btn" , function () {
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
            $("#gifs-appear-here").empty();

            for (var i = 0; i < results.length; i++) {

                var p = $("<p>").text("Rating: " + results[i].rating);

                characterDiv = $("<div>");
                characterDiv.attr("id", "characterDiv");

                characterImage = $("<img>");
                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-state", "still");
                characterImage.addClass("gif");

                characterDiv.append(characterImage);
                characterDiv.append(p);

                $("#gifs-appear-here").append(characterDiv);

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

