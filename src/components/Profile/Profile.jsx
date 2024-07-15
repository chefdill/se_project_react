import './Profile.css'
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile ({ handleCardClick }) {
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection handleCardClick={handleCardClick}/>
            </section>
        </div>
    )
}

export default Profile;