// Weather App
// API: WeatherAPI
// Note: Client-side API key used for educational purposes


const apiKey = "5fc91da46e8a4a4daf774753251112";

const citySection = document.getElementById("city")
let cityName = null;

const search = document.getElementById("search");

search.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        cityName = search.value;

        if (cityName) {
            try {
                const weatherData = await getWeatherData(cityName);
                displayWeatherInfo(weatherData);
            }
            catch (error) {
                console.error(error);
                displayError();
            }
        }
        else {
            citySection.textContent = "Select a City!"
        }
    }
})

async function getWeatherData(cityName) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=1&aqi=no&alerts=no`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        citySection.textContent = "Enter valid city";
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const { location: {
        name: city
    },
        current: {
            temp_c, wind_kph,
            humidity,
            uv,
            feelslike_c,
            condition: {
                code
            }
        },
        forecast: {
            forecastday: [{
                date,
                day: {
                    maxtemp_c,
                    mintemp_c,
                    daily_chance_of_rain,
                    condition: {
                        text: dayDescription
                    }
                },
                astro: {
                    sunrise,
                    sunset
                },
                hour: hours
            }
            ]
        }
    } = data;

    const receivedDate = date;
    const dayName = new Date(receivedDate).toLocaleDateString("en-US", {
        weekday: "long"
    });
    const day = document.querySelector(".day");
    day.textContent = dayName;
    console.log(dayName);

    const dateClass = document.querySelector(".date");
    dateClass.textContent = formatDate(date);

    const hourly = hours.map(h => ({
        temp: `${Math.round(h.temp_c)}°C`,
        code: h.condition.code,
        image: weatherIcons[h.condition.code] || "Resources/weather-icons/Default.svg"
    }));

    const currentWeatherImg = weatherIcons[code];
    document.getElementById("currentWeatherImg").src = currentWeatherImg;

    citySection.textContent = city;
    const currentTemp = document.querySelector(".currentTemp");
    currentTemp.textContent = `${Math.round(temp_c)}°C`;

    const wind = document.querySelector("#wind");
    wind.textContent = `${wind_kph} Km/h`;

    const feelsLike = document.getElementById("feelslike_c");
    feelsLike.textContent = `${Math.round(feelslike_c)}°C`;

    const uvIndex = document.getElementById("UV-index");
    uvIndex.textContent = uv;

    const high = document.getElementById("high");
    high.textContent = `${Math.round(maxtemp_c)}°C`;

    const low = document.getElementById("low");
    low.textContent = `${Math.round(mintemp_c)}°C`;

    const weatherDescription = document.querySelector(".weatherDescription");
    weatherDescription.textContent = dayDescription;

    const RealFeel = document.getElementById("RealFeel-index");
    RealFeel.textContent = `${Math.round(feelslike_c)}°C`;

    const rainChance = document.getElementById("RainChance");
    rainChance.textContent = `${daily_chance_of_rain}%`;

    const Humidity = document.getElementById("Humidity");
    Humidity.textContent = `${humidity}%`;

    const sunriseTime = document.getElementById("sunriseTime");
    sunriseTime.textContent = sunrise;

    const sunsetTime = document.getElementById("sunsetTime");
    sunsetTime.textContent = sunset;

    const value = 25
    // Assign Today's Forecast
    const time_12am = document.getElementById("time_12am");
    time_12am.textContent = hourly[0].temp;

    const time_2am = document.getElementById("time_2am");
    time_2am.textContent = hourly[2].temp;

    const time_4am = document.getElementById("time_4am");
    time_4am.textContent = hourly[4].temp;

    const time_6am = document.getElementById("time_6am");
    time_6am.textContent = hourly[6].temp;

    const time_8am = document.getElementById("time_8am");
    time_8am.textContent = hourly[8].temp;

    const time_10am = document.getElementById("time_10am");
    time_10am.textContent = hourly[10].temp;

    const time_12pm = document.getElementById("time_12pm");
    time_12pm.textContent = hourly[12].temp;

    const time_2pm = document.getElementById("time_2pm");
    time_2pm.textContent = hourly[14].temp;

    const time_4pm = document.getElementById("time_4pm");
    time_4pm.textContent = hourly[16].temp;

    const time_6pm = document.getElementById("time_6pm");
    time_6pm.textContent = hourly[18].temp;

    const time_8pm = document.getElementById("time_8pm");
    time_8pm.textContent = hourly[20].temp;

    const time_10pm = document.getElementById("time_10pm");
    time_10pm.textContent = hourly[22].temp;

    document.getElementById("img_12am").src = `${hourly[0].image}`;
    document.getElementById("img_2am").src = `${hourly[2].image}`;
    document.getElementById("img_4am").src = `${hourly[4].image}`;
    document.getElementById("img_6am").src = `${hourly[6].image}`;
    document.getElementById("img_8am").src = `${hourly[8].image}`;
    document.getElementById("img_10am").src = `${hourly[10].image}`;
    document.getElementById("img_12pm").src = `${hourly[12].image}`;
    document.getElementById("img_2pm").src = `${hourly[14].image}`;
    document.getElementById("img_4pm").src = `${hourly[16].image}`;
    document.getElementById("img_6pm").src = `${hourly[18].image}`;
    document.getElementById("img_8pm").src = `${hourly[20].image}`;
    document.getElementById("img_10pm").src = `${hourly[22].image}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

const weatherIcons = {
    1000: "Resources/weather-icons/sunny.svg",
    1003: "Resources/weather-icons/partly-cloudy.svg",
    1006: "Resources/weather-icons/cloudy.svg",
    1009: "Resources/weather-icons/overcast.svg",
    1030: "Resources/weather-icons/mist.svg",
    1063: "Resources/weather-icons/patchy-rain-possible.svg",
    1066: "Resources/weather-icons/patchy-snow-possible.svg",
    1069: "Resources/weather-icons/patchy-sleet-possible.svg",
    1072: "Resources/weather-icons/patchy-freezing-drizzle-possible.svg",
    1087: "Resources/weather-icons/thundery-outbreaks-possible.svg",
    1114: "Resources/weather-icons/blowing-snow.svg",
    1117: "Resources/weather-icons/blizzard.svg",
    1135: "Resources/weather-icons/fog.svg",
    1147: "Resources/weather-icons/fog.svg",
    1150: "Resources/weather-icons/light-drizzle.svg",
    1153: "Resources/weather-icons/light-drizzle.svg",
    1168: "Resources/weather-icons/light-drizzle.svg",
    1171: "Resources/weather-icons/light-drizzle.svg",
    1180: "Resources/weather-icons/light-rain.svg",
    1183: "Resources/weather-icons/light-rain.svg",
    1186: "Resources/weather-icons/moderate-rain.svg",
    1189: "Resources/weather-icons/moderate-rain.svg",
    1192: "Resources/weather-icons/heavy-rain-at-times.svg",
    1195: "Resources/weather-icons/heavy-rain.svg",
    1198: "Resources/weather-icons/light-rain.svg",
    1201: "Resources/weather-icons/moderate-rain.svg",
    1204: "Resources/weather-icons/patchy-sleet-possible.svg",
    1207: "Resources/weather-icons/patchy-sleet-possible.svg",
    1210: "Resources/weather-icons/snow.svg",
    1213: "Resources/weather-icons/snow.svg",
    1216: "Resources/weather-icons/snow.svg",
    1219: "Resources/weather-icons/snow.svg",
    1222: "Resources/weather-icons/snow.svg",
    1225: "Resources/weather-icons/snow.svg",
    1237: "Resources/weather-icons/snow.svg",
    1240: "Resources/weather-icons/light-drizzle.svg",
    1243: "Resources/weather-icons/moderate-rain.svg",
    1246: "Resources/weather-icons/moderate-rain.svg",
    1249: "Resources/weather-icons/moderate-rain.svg",
    1252: "Resources/weather-icons/moderate-rain.svg",
    1255: "Resources/weather-icons/snow.svg",
    1258: "Resources/weather-icons/snow.svg",
    1261: "Resources/weather-icons/snow.svg",
    1264: "Resources/weather-icons/snow.svg",
    1273: "Resources/weather-icons/thundery-outbreaks-possible.svg",
    1276: "Resources/weather-icons/thundery-outbreaks-possible.svg",
    1279: "Resources/weather-icons/thundery-outbreaks-possible.svg",
    1282: "Resources/weather-icons/thundery-outbreaks-possible.svg"
}

function displayError() {
    console.log("Something went Wrong!")
}