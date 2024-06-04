import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{/*weatherData.temp.F*/} 75&deg; F</p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.day}
        // alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
        //   weatherOption?.condition
        // } weather`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
