const apiKey = "0e6240f4b67a2645a200abf62335c87d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        console.log(`Fetching weather data for city: ${city}`);
        const response = await fetch (apiUrl + city + `&appid=${apiKey}`);
        console.log(`Response status: ${response.status}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";

    } else if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
        document.querySelector(".weather-name").innerHTML = data.weather[0].main;

        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = "clouds.png";
                break;
            case 'Clear':
                weatherIcon.src = "clear.png";
                break;
            case 'Rain':
                weatherIcon.src = "rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "mist.png";
                break;
            case 'Snow':
                weatherIcon.src = "snow.png";
                break;
            case 'Haze':
                weatherIcon.src = "haze.png";
                break;
            default:
                weatherIcon.src = "error.webp";
        }
         
        displayCurrentDate();

        document.querySelector(".weather-info").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
catch (error) {       
    console.error('An error occurred:', error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
}
}

function displayCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    document.getElementById('current-date').textContent = formattedDate;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBar.value);
});

document.addEventListener("DOMContentLoaded", displayCurrentDate);