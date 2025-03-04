import { useContext } from "react";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    console.log('Like clicked, current state:', isLiked);
    handleCardLike(item, isLiked);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={`notliked_button ${isLiked ? "like_button" : ""}`}
          onClick={handleLike}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
