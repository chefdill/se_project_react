import './Header.css';
import wtwr from '../../../assets/wtwr.svg';
import avatar from '../../../assets/avatar.png';

function Header() {
    return (
        <header className="header">
            <img 
            src={wtwr} 
            alt="Logo" 
            className="header__logo"/>
            <p className="header__date-and-location"> DATE, LOCATION </p>
            <button className="header__add-clothes-btn"> + Add Clothes</button>
            <div className="header_-user-container">
                <p className="header__username">NAME</p>
                <img 
                src={avatar} 
                alt="Avatar" 
                className="header__avatar" />
            </div>

        </header>
    )
}

export default Header;