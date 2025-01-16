import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Api from "../../utils/api";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { coordinates, APIkey } from "../../utils/constants";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import Footer from "./Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "./LoginModal/LoginModal.jsx";
import Auth from "../../utils/auth.js";

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

const auth = new Auth({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //ACTIVATES THE ADDED CARD
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //PREVIEW OF THE CARD
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //CLOSE MODAL
  const closeActiveModal = () => {
    setActiveModal("");
  };

  //REGISTRATION MODAL
  const handleRegisterModal = () => {
    setActiveModal("register");
  }

  //LOGIN MODAL
  const handleLoginModal = () => {
    setActiveModal("login");
  }

  const toggleModal = () => {
    setActiveModal((prevModal) => 
      prevModal === "register" ? "login" : "register"
    );
  };

  //API ADD ITEM
  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        console.log(item);
        closeActiveModal();
      })
      .catch(console.error);
  };
  
  //AUTHORIZING REGISTRATION
  const handleRegistration = ({ name, avatar, email, password }) => {
    if (name && avatar && email && password) {
      auth
      .registerUser({ name, avatar, email, password })
      .then((res) => {
        closeActiveModal();
    })
    .catch((err) => console.error(err));
    }
  }; 

  //AUTHORIZING LOGIN
  const handleLogin = ({ email, password }) => {
    if(email && password) {
      auth
      .loginUser({ email, password })
      .then((token) => {
        return auth.verifyToken(token);
    })
    .then((currentUser) => {
      setCurrentUser(currentUser);
      closeActiveModal();
      setIsLoggedIn(true);
    })
    .catch((err) => console.error(err));
    }
  };

  //LOGOUT HANDLER
  const handleLogout = () => {
    setIsloggedIn(false);
    setCurrentUser(currentUser === null);
    localStorage.removeItem("jwt");
  }

  //SWITCHING F => C
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //DELETE ITEM
  const deleteItemSubmit = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  //CLOSING WITH ESCAPE KEY
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  //API GET CARDS
  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setClothingItems(res);
        console.log(res);
      })
      .catch(console.error);
  }, []);

  //API GET WEATHER
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if(token) {
      auth
      .verifyToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
    })
    .catch((err) => {
      console.error(err);
    });
    }
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header 
          handleAddClick={handleAddClick} 
          weatherData={weatherData} 
          onSignupClick={handleRegisterModal}
          onLoginClick={handleLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  onLogoutClick={handleLogout}
                />
              }
            />
          </Routes>

          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            onClose={closeActiveModal}
            onDelete={deleteItemSubmit}
          />

          <RegisterModal 
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            handleLogin={handleLogin}
            onCreateModal={handleRegisterModal}
          />

          <LoginModal 
            activeModal={activeModal}
            handleLogin={handleLogin}
            onCreateModal={handleLoginModal}
            onSignUpClick={toggleModal}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
 }


export default App;
