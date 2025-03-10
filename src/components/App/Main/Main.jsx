import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../../utils/contexts/CurrentTemperatureUnitContext.jsx";

function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit];
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
      (temp <= 59 && currentTemperatureUnit === "F") ||
      (temp <= 15.55 && currentTemperatureUnit === "C")
    ) {
      return "cold";
    }
  }, [weatherData]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather === weatherType;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} temp={temp} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
