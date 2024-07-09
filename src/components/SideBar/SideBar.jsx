import './SideBar.css';
import avatar from '../../assets/avatar.png';

function SideBar() {
    return (
        <div className="sidebar">
            <img src={avatar} alt="" className="sidebar__avatar" />
        </div>
    )
}

export default SideBar;