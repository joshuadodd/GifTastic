/* Initial array of fails */
 
$(document).ready(function() {
    var topics = ['Wedding fail', 'Sports fail', 'Kid fail', 'Animal fail', 'Drunk fail', 'Driving fail'];

    /* create topics array buttons */
     
     

    function buttonFail() {
        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {

            /* create all buttons */
            
            var a = $('<button>');
            a.addClass('results');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }
    buttonFail();


    /* on button click */
     
    $(document).on('click', '.results', function() {

            var fail = $(this).html();


            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fail + "&api_key=5c71d8a3ce494d76a335c4172e55f742";

            $.ajax({ url: queryURL, method: 'GET' })
                .done(function(response) {
                    /* grabs the data */
                     
                    var results = response.data;

                    /* empties the div before adding more gifs */
                     
                    $('#failView').empty();
                    /* loops through the data */
                     
                    for (var j = 0; j < results.length; j++) {
                        var imageDiv = $('<div>');
                        var imageView = results[j].images.fixed_height.url;
                        var still = results[j].images.fixed_height_still.url;

                        var failImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                        failImage.attr('data-state', 'still');
                        $('#failView').prepend(failImage);
                        failImage.on('click', playGif);

                        /* pulling the rating */
                         
                        var rating = results[j].rating;
                        
                        var displayRated = $('<p>').text("Rating: " + rating);
                        $('#failView').prepend(displayRated);

                    }
                });

            function playGif() {
                var state = $(this).attr('data-state');
                console.log(state);
                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            }
            /* on click fail */
             

        })
        /* document on click */
         




    /* adding new button */
     
    $(document).on('click', '#addFail', function() {
        if ($('#fail-input').val().trim() == '') {
            alert('Input can not be left blank');
        } else {
            var fail = $('#fail-input').val().trim();
            topics.push(fail);
            $('#fail-input').val('');
            buttonFail();
            return false;

        }

    });



}); 
