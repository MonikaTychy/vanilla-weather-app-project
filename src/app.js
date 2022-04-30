function showTemp (response) {
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temp").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML=response.data.weather[0].description;
document.querySelector("#pressure").innerHTML=response.data.main.pressure;
document.querySelector("#speed").innerHTML=Math.round(response.data.wind.speed);
console.log(response);
}


let apiKey = "49d519d3a707f25a178a456019ddf9de";
let city = "Madrid";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
