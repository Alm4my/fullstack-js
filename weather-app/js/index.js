const openWeatherAppId = '149becde875ad008414ce575083f4b62';
const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather'

/**
 * @function prepareData
 * This function gets the name of the city from the input box, checks if it is valid and
 * try to get the data. Otherwise it alerts an error message.
 *
 * @param units units of the requested weather data either imperial or metric
*/
const prepareData = function (units) {
    let cityName = $('#city-name').val();
    if (cityName && cityName !== ''){
        cityName = cityName.trim();
        getData(openWeatherUrl, cityName, openWeatherAppId, units);
    }
    else{
        alert('Please enter the city name!')
    }
}

/**
 * @function getData
 * This function gets weather data from the OpenWeather API by sending ajax requests
 *
 * @param url API endpoint
 * @param cityName name of the city we are looking for
 * @param appId application ID
 * @param units unit of the result (metric or imperial)
 */
function getData(url, cityName, appId, units){
    $.ajax({
        url: url,
        dataType: 'jsonp',
        data: {
            q: cityName,
            appId: appId,
            units: units,
        },
        success: function () {
            switch (units){
                case 'metric':
                    addDegOrFah(' °C');
                    break;
                default:
                    addDegOrFah('  °F')
                    break;
            }
        },
        jsonpCallback: 'fetchData',
        type: 'GET'
    }).fail(function (error){
        console.error(error);
        alert('Error sending Request')
    });
}

/**
 * @function addDegOrFah
 * Adds degree celsius or fahrenheit to temperature
 *
 * @param value string to add
 */
function addDegOrFah(value){
    $('#temp').append(value);
}

/**
 * @function fetchData
 * This is the callback of our ajax jsonp request. It gets the data and appends
 * it to an html variable
 *
 * @param forecast
 */
function fetchData(forecast){
    console.log(forecast);
    let html = '',
        cityName = forecast.name,
        country = forecast.sys.country;

    html += `<h3> Weather Forecast for ${cityName}, ${country} </h3>`
    html += `<em>Temperature: <b id="temp">${forecast.main.temp}</b></em>
                <p>Weather: ${forecast.weather[0].main} <br>
                   Description: ${forecast.weather[0].description}</p>`

    // for (const entry of forecast.weather)
    //     html += `<p>Weather: ${entry.main} <br>
    //                 Description: ${entry.description}</p>`;


    $('#log').html(html);
}



$(document).ready(function (){
    $('.btn-metric').click(function (){
        prepareData('metric');
    })

    $('.btn-imperial').click(function (){
        prepareData('imperial');
    })
})