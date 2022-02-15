window.addEventListener('load', function () {
    console.log('page is loaded')
    let apiKey = "vy7I7K2l9Og3K0Sx6cfa32N4zLcJtJGXj5qsNGkp";

    fetch("https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=" + apiKey)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let landingELement = document.getElementById('land-date');
        landingELement.innerHTML = "Landing date: " + data.photo_manifest.landing_date;

        let launchELement = document.getElementById('launch-date');
        launchELement.innerHTML = "Launch date: " + data.photo_manifest.launch_date;

        let statusELement = document.getElementById('rover-status');
        statusELement.innerHTML = "Mission status: " + data.photo_manifest.status;

        let totalELement = document.getElementById('total-photos');
        totalELement.innerHTML = "Total photos: " + data.photo_manifest.total_photos;
    })

    let button = document.getElementById('date-button');
    button.addEventListener('click', function() {
        let inputText = document.getElementById("date-input").value;

        let apiURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" +  inputText + "&api_key=" + apiKey;

        fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let imageElement = document.getElementById('img-1');
            imageElement.src = data.photos[0].img_src;

        })
    })
})

// user enters earth date
// for image, use query by earth date on api URL and concatenate api_key to the end of the URL