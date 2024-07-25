import { useContext } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
// import { defaultClothingItems } from '../../../utils/constants.js';
import './Main.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

function Main ({ weatherData, handleCardClick, clothingItems }) {

const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)
const filteredCards = clothingItems.filter((item => {
    return item.weather === weatherData;
}))

return(
    <main>
    <WeatherCard weatherData={weatherData}/>
    <section className="cards">
        <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]} &deg; / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredCards
            .map((item) => {
                return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />;
              })}
        </ul>
        </section>
    </main>
    );
}

export default Main;