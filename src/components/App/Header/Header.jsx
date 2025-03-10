import React, { useContext } from "react";
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
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || avatar;

  return (
    <header className="header">
      <Link to="/">
        <img src={wtwr} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || ""}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn && currentUser ? (
          <>
            <button
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__profile">
                <p className="header__username">{userName}</p>
                <img src={userAvatar} alt="Avatar" className="header__avatar" />
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="header__auth-buttons">
              <button className="modal__button-header" onClick={onSignUpClick}>
                Sign Up
              </button>
              <button className="modal__button-header" onClick={onLoginClick}>
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
