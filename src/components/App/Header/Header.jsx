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
      <img src={wtwr} alt="Logo" className="header__logo" />
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}{" "}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button className="header__add-clothes-btn" onClick={handleAddClick}>
        + Add Clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
