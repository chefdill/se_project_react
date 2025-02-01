import { useContext } from "react";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some(id => id === currentUser?._id);

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
      <button 
      onClick={handleLike} 
      className={itemLikeButton}
      >
        Like
      </button>
    </li>
  );
}

export default ItemCard;
