import { Link } from "react-router-dom";
import "./Header.css";
import wtwr from "../../../assets/wtwr.svg";
import avatar from "../../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ handleAddClick, weatherData }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/se_project_react/">
        <img src={wtwr} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}{" "}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button className="header__add-clothes-btn" onClick={handleAddClick}>
        + Add Clothes
        </button>
        <Link to="se_project_react/profile" className="header__link">
        <div className="header__profile">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
