# Weather Conditions Dashboard

![LICENSE](https://img.shields.io/github/license/tiffany-brand/weather-conditions-dashboard?style=plastic) 

## Link to Deployed Application

View the Weather Conditions Dashboard at: https://tiffany-brand.github.io/weather-conditions-dashboard/

## Table of Contents

1. [Description](#Description)
2. [Requirements](#Requirements)
3. [Technologies](#Technologies) 
4. [Screenshots](#Screenshots)
5. [License](#License)

## Description

This weather dashboard project allows the user to search for cities and view current weather conditions and a 5 day forecast with data from the OpenWeather API. A user can input a city and a state and/or country, and the relevent weather data will be retrieved from OpenwWeather. The past five searched cities will appear as buttons that, when clicked, will load the current weather data for that city. When the page is refreshed, the last-searched city's weather data is displayed.



## Requirements

### User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Technologies

HTML, CSS, & Javascript

OpenWeather API: https://openweathermap.org/api 

Bootstrap 4 CSS Framework: https://getbootstrap.com/

Moment JS: https://momentjs.com/ 

## Screenshots

### Desktop

![weather-screen-2](https://user-images.githubusercontent.com/16748389/89361446-4d184d00-d699-11ea-8683-0fd1b8395323.JPG)


### Mobile

![weather-mobile-4](https://user-images.githubusercontent.com/16748389/89361451-50133d80-d699-11ea-8d5a-3d8b42d728eb.JPG)

## License

[MIT License](./LICENSE)

