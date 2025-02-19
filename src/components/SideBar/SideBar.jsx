import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

function SideBar({ onLogoutClick }) {
const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
      <img 
      src={currentUser.avatar || avatar}
      alt="Default Avatar" 
      className="sidebar__avatar" 
      />
      <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__user-buttons">
        <button 
        className="sidebar__user-info-button">
          Change profile data
        </button>
      <button 
      className="sidebar__logout-button" 
      onClick={onLogoutClick}
      >
        Log out
      </button>
      </div>
    </div>
  );
}


export default SideBar;
