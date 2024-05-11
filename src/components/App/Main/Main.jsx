import { useMemo, useContext } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../../utils/constants.js';
import './Main.css';
import { CurrentTemperatureUnitContext } from '../../context/currentTemperatureUnitContext.jsx';

function Main ({ weatherData, weatherTemp }) {
    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
    const temp = weatherTemp?.temperature?.[currentTemperatureUnit];
    const weatherType = useMemo(() => {
      if (
        (temp >= 70 && currentTemperatureUnit === "F") ||
        (temp >= 21.11 && currentTemperatureUnit === "C")
      ) {
        return "hot";
      } else if (
        (temp >= 60 && currentTemperatureUnit === "F") ||
        (temp >= 15.56 && currentTemperatureUnit === "C")
      ) {
        return "warm";
      } else if (
        (temp <= 45 && currentTemperatureUnit === "F") ||
        (temp >= 7.22 && currentTemperatureUnit === "C")
      ) {
        return "cold";
      }
    }, [weatherTemp]);
  
    const filteredCards = defaultClothingItems.filter((item) => {
      return item.weather === weatherType;
    });

return(
    <main>
    <WeatherCard />
    <section className="cards">
        <p className="cards__text">
            Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
            {filteredCards((item) => {
                return item.weather === weatherData.type;
            })
            .map((item) => {
                return <ItemCard key={item._id} item={item} />;
              })}
        </ul>
        </section>
    </main>
    );
}

export default Main;