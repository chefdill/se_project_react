import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import wtwr from "../../../assets/wtwr.svg";
import avatar from "../../../assets/avatar.png";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";

const Header = ({ 
  handleAddClick, 
  weatherData, 
  onSignUpClick, 
  onLoginClick, 
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <header className="header">
      <Link to="/">
        <img src={wtwr} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}{" "}
      </p>
      <div className="header__user-container">
      <ToggleSwitch />
        {isLoggedIn ? (
        <>
        <button className="header__add-clothes-btn" onClick={handleAddClick}>
          + Add Clothes
        </button>
        <p className="header__name">{currentUser}</p>
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            <p className="header__username"></p>
            <img
              src={avatar}
              alt="Avatar"
            />
          </div>
        </Link>
        </>
        ) : (
          <>
          <button className="modal__button-header" onClick={onSignUpClick}>
            Sign Up
          </button>
          <button className="modal__button-header" onClick={onLoginClick}>
            Log In
          </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
