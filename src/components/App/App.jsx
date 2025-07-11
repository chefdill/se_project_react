import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "./LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Auth from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { baseUrl } from "../../utils/constants"

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const auth = new Auth({
  baseUrl: baseUrl,
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

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setSelectedCard(null);
  };

  //REGISTRATION MODAL
  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  //LOGIN MODAL
  const handleLoginModal = () => {
    setActiveModal("login");
  };

  //EDIT MODAL
  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const toggleModal = () => {
    setActiveModal((prevModal) =>
      prevModal === "signup" ? "login" : "signup"
    );
  };

  //API ADD ITEM
  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((res) => {
        setClothingItems([res.item, ...clothingItems]);
        console.log(item);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //HANDLE REGISTRATION
  const handleRegistration = ({ name, avatar, email, password }) => {
    if (name && avatar && email && password) {
      auth
        .registerUser({ name, avatar, email, password })
        .then((res) => {
          return auth.loginUser({ email, password });
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
            return auth.verifyToken(data.token);
          }
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  //AUTHORIZING LOGIN
  const handleLogin = ({ email, password }) => {
    if (email && password) {
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
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  //HANDLE EDIT PROFILE
  const handleEdit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (name && avatar) {
      api
        .editUser(token, name, avatar)
        .then((res) => {
          closeActiveModal();
          setCurrentUser(res);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  //HANDLE CARD LIKE
  const handleCardLike = ( item, isLiked ) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === item._id ? updatedCard.data : card))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(item._id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === item._id ? updatedCard.data : card))
            );
          })
          .catch((err) => console.log(err));
  };

  //LOGOUT HANDLER
  const handleLogout = () => {
    closeActiveModal();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
    setSelectedCard(null);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  //SWITCHING F => C
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //DELETE ITEM
  const deleteItemSubmit = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found");
      return;
    }
    api
      .deleteItem(selectedCard._id, token)
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
      .catch((err) => console.error(err));
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

  //LOCAL STORAGE TOKEN
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .verifyToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          api
            .getCards(token)
            .then((items) => {
              setClothingItems(items);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser({});
          setClothingItems([]);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
      setClothingItems([]);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={handleRegisterModal}
              onLoginClick={handleLoginModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route path="/" element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              } />
              <Route path="/profile" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onLogoutClick={handleLogout}
                    handleCardLike={handleCardLike}
                    handleEditModal={handleEditModal}
                  />
                </ProtectedRoute>
              } />
            </Routes>

            <AddItemModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              onAddItem={handleAddItemSubmit}
              isLoading={isLoading}
            />
            <ItemModal
              activeModal={activeModal}
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              onDelete={deleteItemSubmit}
              isLoading={isLoading}
            />

            <RegisterModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLogin={handleLogin}
              onCreateModal={handleRegisterModal}
              onLoginClick={toggleModal}
              isLoading={isLoading}
            />

            <LoginModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              onCreateModal={handleLoginModal}
              onSignUpClick={toggleModal}
              isLoading={isLoading}
            />

            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleEdit={handleEdit}
              isOpen={activeModal === "edit"}
              onCreateModal={handleEditModal}
              isLoading={isLoading}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
