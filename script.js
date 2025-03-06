let cityInput = document.querySelector('.city-input')
let searchBtn = document.querySelector('.search-btn')
let notFound = document.querySelector('.not-found')
let searchCity = document.querySelector('.search-city')
let weatherInfo = document.querySelector('.weather-info')
let weatherContainer = document.querySelector('.weather-container-box');
let locationDate = document.querySelector('.current-date')
let apiKey = `0a92a278dbbdcbab8a9af3536e3d1b3a`;

searchBtn.addEventListener('click', (event) => {
    if (cityInput.value.trim() !== '') {
        console.log(cityInput.value);
        updateweatherInfo(cityInput.value);
        cityInput.value = ''
    } else {
        console.log('error or empty');
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateweatherInfo(cityInput.value);
        cityInput.value = '';
    } else {
        console.log('error or empty');
    }
});

async function getfetchData(endPoint, city) {
    let apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiURL)
    return response.json();
}

function getWeatherImage(condition){
    condition = condition.toLowerCase();
    if(condition.includes("clear")){
        return "/image/sunny.png";
    }
    else if(condition.includes("cloud")){
        return "/image/cloud.png";
    }
    else if(condition.includes("rain")){
        return "/image/slowrain.png";
    }
    else if(condition.includes("snow")){
        return "/image/snow.png";
    }
    else if(condition.includes("thunderstorm")){
        return "/image/highrain.png";
    }
    else {
        return "/image/default.png"
    }
}


function getCurrentDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.toLocaleDateString('default',{month:'short'})
    let year = date.getFullYear();

    return `${day} ${month} , ${year}`
}
async function updateweatherInfo(city) {
    let weatherData = await getfetchData('weather', city);
    if (weatherData.cod != 200) {
        showDisplaySection(notFound)
        return;
    }

    // searchCity.textContent = weatherData.name;
    let weatherCondition = weatherData.weather[0].main;
    let weatherImage = getWeatherImage(weatherCondition)
    let correntDate = getCurrentDate();

    weatherContainer.innerHTML = `
    <div class="location-date">
                    <span class="location">
                        <i class="fa-solid fa-location-dot"></i>
                        <h4 class="countary-text">${weatherData.name}</h4>
                    </span>
                    <h5 class="current-date regulrt-txt">${correntDate}</h5>
                </div>
                <div class="weather-summary-container">
                    <img src="${weatherImage}" alt="cloudImage">
                    <div class="weather-summary-inner">
                        <h1 class="condition-txt regular-txt"> ${weatherData.weather[0].main}</h1>
                        <h3 class="temp-txt">${weatherData.main.temp} °C</h3>
                    </div>
                </div>

                <div class="weather-conditions-container">
                    <div class="condition-item">
                        <i class="fa-solid fa-droplet"></i>
                        <div class="condition-info">
                            <h5 class="regular-txt">Humidity</h5>
                            <h5 class="humidity-value">${weatherData.main.humidity}</h5>
                        </div>
                    </div>
                    <div class="wind-container">
                    <i class="fa-solid fa-wind"></i>
                    <div class="condition-info">
                        <h5 class="regular-txt">Wind Speed</h5>
                        <h5 class="wind-value">${weatherData.wind.speed}</h5>
                    </div>
                </div>
    `
    showDisplaySection(weatherInfo)
}

function showDisplaySection(activeSection) {
    [weatherInfo, searchCity, notFound]
        .forEach(section => section.style.display = 'none')

    activeSection.style.display = 'flex'
}


