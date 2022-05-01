function formatTime (timestamp) {
    let time = new Date (timestamp);
    let hours = time.getHours();
    if (hours<10){
        hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes<10){
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ];
    let day = days[time.getDay()];
    return `${day} ${hours}:${minutes}`;
}


function showTemp (response) {
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    celsiusTemp = Math.round(response.data.main.temp);
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temp").innerHTML=celsiusTemp;
document.querySelector("#description").innerHTML=response.data.weather[0].description;
document.querySelector("#pressure").innerHTML=response.data.main.pressure;
document.querySelector("#speed").innerHTML=Math.round(response.data.wind.speed);
timeElement.innerHTML = formatTime(response.data.dt * 1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search (city) {
    let apiKey = "49d519d3a707f25a178a456019ddf9de";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemp);
}

function handleSubmit (event){
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search (city);
}

function showPosition (position){
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiKey = "49d519d3a707f25a178a456019ddf9de";
    let units = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition (){
    navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemp (event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = Math.round((celsiusTemp*9)/5+32);
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = fahrenheitTemp;
}

function displayCelsiusTemp (event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let form = document.querySelector ("#search-engine");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Gdynia");
