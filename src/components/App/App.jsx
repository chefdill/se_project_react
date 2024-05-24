import { useState, useEffect } from "react";
import './App.css';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import { coordinates, APIkey } from "../../utils/constants.js";
import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import { getWeather } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect (() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      console.log(data);
    }).catch(console.error);
  }, []);

  return (
 <div className="page">
  <div className="page__content">
    <Header handleAddClick={handleAddClick} />
    <Main weatherData={weatherData} handleCardClick={handleCardClick} />
    </div>
    <ModalWithForm 
      title="New Garment" 
      buttonText="Add Garment" 
      activeModal={activeModal}
      onClose={closeActiveModal}
    >
    <label htmlFor="name" className="modal__label">
            Name {" "}
            <input 
            type="text" 
            className="modal__input" 
            id="name" 
            placeholder="Name" />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
            Image {" "}
            <input 
            type="url" 
            className="modal__input" 
            id="imageUrl" 
            placeholder="Image Url" />
        </label>
        <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" 
            className="modal__label modal__label_type_radio">
                <input id="cold" type="radio" 
                className="modal__radio-input" 
                /> Hot
            </label>
            <label htmlFor="warm" 
            className="modal__label modal__label_type_radio">
                <input id="cold" type="radio" 
                className="modal__radio-input" 
                /> Warm
            </label>
            <label htmlFor="cold" 
            className="modal__label modal__label_type_radio">
                <input id="cold" type="radio" 
                className="modal__radio-input" 
                /> Cold
            </label>
        </fieldset>
    </ModalWithForm>
    <ItemModal 
    activeModal={activeModal} 
    card={selectedCard} 
    onClose={closeActiveModal} 
    />
 </div>
 );
}

export default App

