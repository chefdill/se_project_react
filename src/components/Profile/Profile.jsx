import { useContext } from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onLogoutClick,
  handleEditModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onLogoutClick={onLogoutClick}
          handleEditModal={handleEditModal}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
