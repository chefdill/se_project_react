import { weatherOptions } from "../../../utils/constants.js";
import './WeatherCard.css';

function WeatherCard ({weatherData}) {
    const filteredOptions = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && 
            option.condition === weatherData.condition
            );
        });

        const weatherOption = filteredOptions[0]
  
    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img 
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__img" 
        />
    </section>;
}

export default WeatherCard;