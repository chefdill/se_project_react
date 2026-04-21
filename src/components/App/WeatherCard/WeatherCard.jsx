import { useContext } from "react";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants.js";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../../utils/contexts/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Log weather data to see what we're getting from API
  console.log('Weather Data received:', weatherData);

  const filteredOptions = weatherOptions.filter((item) => {
    // Match both the day/night status and the weather condition
    return item.day === weatherData.isDay && 
           item.condition.toLowerCase() === weatherData.condition.toLowerCase();
  });

  // Get the appropriate weather option
  const weatherOption = filteredOptions.length > 0 
    ? filteredOptions[0] 
    : defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp?.[currentTemperatureUnit]} °{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption.url}
        alt={`Weather condition: ${weatherData.condition}`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;