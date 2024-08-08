import { useContext } from "react";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants.js";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../../utils/contexts/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((i) => {
      return i.day === weatherData.day && i.type === weatherData.condition;

  });

  console.log(weatherData);

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.day ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
