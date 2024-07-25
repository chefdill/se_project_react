import './ClothesSection.css';
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from '../App/ItemCard/ItemCard';

function ClothesSection({ handleCardClick, clothingItems }) {

    const profileCards = clothingItems; 

    return (
        <div className="clothes-section">
            <div className="items-section">
                <p className="items__label">Your Items</p>
                <button className="items__button">+ Add New</button>
            </div>
            <ul className="clothes-section__items">
            {/* {defaultClothingItems
            .filter((item) => {
                return item.weather === weatherData.type;
            }) */} {profileCards
            .map((item) => {
                return <ItemCard key={item._id} item={item} onCardClick={handleCardClick}/>;
              })}
        </ul>
        </div>
    )
}

export default ClothesSection;