var my_api = "0e1d02bd5b3cc597c62b8861e8ce580c";
var city_name;
var five_day_api;
var part = "minutely,hourly"
const srchBox = document.getElementById("srchBox");

srchBox.addEventListener("click", function(event) {
    var removeCard = document.getElementById("container");
    var removeBox = document.getElementById("bigBox");
    removeCard.remove();
    removeBox.remove();
    var aliveCard = document.createElement("div");
    aliveCard.setAttribute("id", "container");
    var aliveBox = document.createElement("div");
    aliveBox.setAttribute("id", "bigBox");
    document.body.appendChild(aliveBox);
    document.body.appendChild(aliveCard);


    event.preventDefault();
    var input = document.getElementById("city").value;
    city_name = input;
    getCordinates(city_name);
});


function getCordinates(city_name) {

    five_day_api = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${my_api}`;


    fetch(five_day_api)

    .then(function(response) {
        if (response.ok) {

            response.json().then(function(data) {
                console.log(data.city.coord.lat);
                console.log(data.city.coord.lon);
                
                latitude = data.city.coord.lat;
                longitude = data.city.coord.lon;
                get0n3DyaWeather(latitude, longitude)
            });
        }
    });
}




function get0n3DyaWeather(latitude, longitude) {
    one_call_api =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${my_api}`
    
    
    fetch(one_call_api)

    .then(function(response) {
        if (response.ok) {

            response.json().then(function(data) {
                console.log(data);

                console.log(data.current.humidity);
                var currentHumidity = data.current.humidity;

                console.log(data.current.temp);
                var currentTemperature = Math.round((data.current.temp-273.15)*(9/5) +32);

                console.log(data.current.uvi);
                var currentUVI = data.current.uvi;

                console.log(data.current.wind_deg);
                console.log(data.current.wind_speed);
                var currentWindDir = data.current.wind_deg;
                var curreentWindSpeed = data.current.wind_speed;
                console.log(data.current.weather[0].main);
                
                
                var currentIcon = data.current.weather[0].icon;


                console.log(data.daily);
                superBigBox(currentHumidity, currentTemperature, currentUVI, curreentWindSpeed, currentIcon);

                for (var i = 1; i <= 5; i++) {
                    console.log(data.daily[i]);

                    // get humidity
                    console.log(data.daily[i].humidity);
                    var dailyHumidity = data.daily[i].humidity;
                    // get day time tempeture
                    console.log(data.daily[i].temp.day);
                    var dailyTemp = Math.round((data.daily[i].temp.day-273.15)*(9/5) +32);
                    // get date time
                    console.log(data.daily[i].dt);
                    var dailyDateTime = data.daily[i].dt;
                    // weather status
                    console.log(data.daily[i].weather[0].main);
                    // get the icon
                    console.log(data.daily[i].weather[0].icon);
                    var dailyIcon = data.daily[i].weather[0].icon;

                    // <img id="wicon" src="" alt="Weather 

                    console.log(data.daily[i].wind_speed);
                    var dailyWind = data.daily[i].wind_speed;

                    weatherCards(dailyTemp, dailyIcon, dailyHumidity, dailyDateTime, dailyWind)
                }

                
            })
        }
    })
};

function weatherCards(dailyTemp, dailyIcon, dailyHumidity, dailyDateTime, dailyWind) {
    var node = document.createElement("div");    
    var date = document.createElement("H5");
    console.log(dailyDateTime)
    var dTime = moment.unix(dailyDateTime).format("MMM Do YY");
    date.textContent = dTime;
    console.log(dTime);
    var url = `http://openweathermap.org/img/wn/${dailyIcon}@2x.png`
    var icon = document.createElement("image");
    icon.setAttribute("href", url);
    var temp = document.createElement("p");
    temp.textContent= `Temperature: ${dailyTemp} F`;
    var wind = document.createElement("p");
    wind.textContent = `Wind: ${dailyWind} MPH`;
    var humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${dailyHumidity} %`;
    node.appendChild(date);
    node.appendChild(icon);
    node.appendChild(temp);
    node.appendChild(wind);
    node.appendChild(humidity);
    document.getElementById("container").appendChild(node);
};



function superBigBox(currentHumidity, currentTemperature, currentUVI, curreentWindSpeed, currentIcon) {
    var node = document.createElement("div");    
    var date = document.createElement("H5");
    var dTime = moment().format("MMM Do YY");
    date.textContent = dTime;
    console.log(dTime);
    var url = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
    var icon = document.createElement("image");
    icon.setAttribute("href", url);
    var temp = document.createElement("p");
    temp.textContent= `Temperature: ${currentTemperature} F`;
    var wind = document.createElement("p");
    wind.textContent = `Wind: ${curreentWindSpeed} MPH`;
    var humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${currentHumidity} %`;
    var uvi = document.createElement("p");
    uvi.textContent = `UVI: ${currentUVI}`;
    node.appendChild(date);
    node.appendChild(icon);
    node.appendChild(temp);
    node.appendChild(wind);
    node.appendChild(humidity);
    document.getElementById("bigBox").appendChild(node);
};

// append EE to Div


// append node to the container






// Card

{/* <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}






// Form

      