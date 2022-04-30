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
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temp").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML=response.data.weather[0].description;
document.querySelector("#pressure").innerHTML=response.data.main.pressure;
document.querySelector("#speed").innerHTML=Math.round(response.data.wind.speed);
timeElement.innerHTML = formatTime(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}


let apiKey = "49d519d3a707f25a178a456019ddf9de";
let city = "Madrid";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
