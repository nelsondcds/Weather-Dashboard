var formEl = document.querySelector("#city-form");
var buttonEl = document.querySelector("#find-weather");
var responseContainerEl = document.querySelector(".responsive-container");

var url = "https://api.openweathermap.org/data/2.5/onecall?lat="

var buttonHandler = function(event) {
    event.preventDefault();

    var addressInput = document.querySelector("input[name='city']").value;

    if (!addressInput) {
        responseContainerEl.innerHTML = "";
        var addressAlert = document.createElement("h4");
        addressAlert.textContent = "You need to enter a city into the search bar!";
        formEl.setAttribute("search-id","addressAlert");
        responseContainerEl.appendChild(addressAlert);
        return false;
    }

    var geourl = "https://www.mapquestapi.com/geocoding/v1/address?key=i59AhjaYZTQaOPj86iKkHTeoACIvMK7I&location=" + addressInput

    formEl.reset();

    var newSearch = formEl.hasAttribute("search-id");

    if (newSearch) {
        responseContainerEl.innerHTML = "";
    }

    brewFetch(geourl,url);
}

var brewFetch = function(geourl,url) {
    formEl.setAttribute("search-id","true");

    fetch(geourl)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);

        console.log(response.results[0].locations[0].latLng);

        var lat = JSON.stringify(response.results[0].locations[0].latLng.lat);

        var lng = JSON.stringify(response.results[0].locations[0].latLng.lng);

        console.log(lat,lng);

        url = url + lat + "&lon=" + lng + "&units=imperial&appid=3b7aa86a0dc67fb4fff8c7d35644c260";

        console.log(url);

        fetch(url)
            .then(function(response){
                return response.json();
            })
            .then(function(response){
                console.log(response);

                responseContainerEl.textContent = response.current.temp + " °F";
            
            })

    })
}

buttonEl.addEventListener("click", buttonHandler);