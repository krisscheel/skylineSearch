        

        const app = {};
        const app_key = "13056675-1508f8e14e7a2c3bd80346e5f";

       app.displayArchitecture = (photos) => { 
        if (photos.length > 0) {
        //loop over an array
        photos.forEach(function(photo){
            console.log(photo)
                const photoHtml = `            
                    <div class="photo-box">
                        <div class="img-box">
                            <img src="${photo.largeImageURL}" alt="">
                        </div>
                    </div>`

                    $('.results').append(photoHtml);

               })
            }
            else {
                $(`.results`).append(
                    "<h2>Your search didn't produce any results. Try another city or check your spelling!</h2>"
                    )
            }
        }

        app.getPhotos = (userInput) => {
            $.ajax({
                url: "https://pixabay.com/api/?",
                method: "GET",
                dataType: "json",
                data: {
                    key: app_key,
                    q: userInput,
                    category: "buildings",
                    safesearch: true
                }
            }).then(res => {
                const photoArray = res.hits;
                //Once we have photos, display photos to page
                app.displayArchitecture(photoArray);

            });
        }

        app.init = () => {
            //event listener to grab user input from form
            $('form').on("submit", function(e){
                e.preventDefault();

                    //Store user input in a variable
                    const userInput = $('input[type="text"]').val();

                    //pass that variable in the ajax call as a query

                //empty out results container after each search
                $('.results').empty();

                //send user input into app.getPhotos
                app.getPhotos(userInput);
            
            });

        };

        //Document ready
        $(() => {
            //initialize app
            app.init();
        });