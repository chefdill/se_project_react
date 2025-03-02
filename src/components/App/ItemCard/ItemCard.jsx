import { useContext } from "react";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);

  const itemLikeButton = `unlike_button${
    isLiked ? "like_button" : ""
  }`;

  const handleLike = () => {
    onCardLike(item, isLiked);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>
        <button
          className={`${isLiked} ${itemLikeButton}`}
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
