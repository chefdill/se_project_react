// import { useContext } from "react";
// import {
//   weatherOptions,
//   defaultWeatherOptions,
// } from "../../../utils/constants.js";
// import "./WeatherCard.css";
// import CurrentTemperatureUnitContext from "../../../utils/contexts/CurrentTemperatureUnitContext.jsx";

// function WeatherCard({ weatherData, temp }) {
//   const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

//   console.log(weatherData);

//   const filteredOptions = weatherOptions.filter((i) => {
//     return i.day === weatherData.isDay && i.condition === weatherData.condition;

// });

//   let weatherOption;
//   if (filteredOptions.length === 0) {
//     weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
//   } else {
//     weatherOption = filteredOptions[0];
//   }

//   return (
//     <section className="weather-card">
//       <p className="weather-card__temp">
//         {temp} &deg;{" "}
//         {currentTemperatureUnit}
//       </p>
//       <img
//         src={weatherOption?.url}
//         alt={`Card showing ${weatherOption?.isDay ? "day" : "night"}time ${
//           weatherOption?.condition
//         } weather`}
//         className="weather-card__img"
//       />
//     </section>
//   );
// }

// export default WeatherCard;

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