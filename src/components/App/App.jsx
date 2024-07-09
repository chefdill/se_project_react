import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { coordinates, APIkey } from "../../utils/constants";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from '../Profile/Profile';
import Footer from "./Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import  CurrentTemperatureUnitContext  from '../contexts/CurrentTemperatureUnitContext'

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [weatherType, setWeatherType] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');


  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setWeatherType("");
  };

  const onAddItem = (values) => {
    console.log(values)
  };

  const handleToggleSwitchChange = () => {
    if(currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F')
    if(currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C')
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}} >

        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route path="/se_project_react/" element={<Main weatherData={weatherData} handleCardClick={handleCardClick} />} />
          <Route path="/se_project_react/profile" element={<Profile />} />
        </Routes>

        <AddItemModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onAddItem={onAddItem}
          />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
