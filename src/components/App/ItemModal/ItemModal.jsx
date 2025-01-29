import "./ItemModal.css";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";

function ItemModal({ 
  activeModal,
  onClose,
  selectedCard, 
  onDelete 
}) {
  const isOwn = selectedCard.owner === CurrentUserContext._id;
  const itemDeleteModal = (
    `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
  );

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_item">
        <button type="button" className="modal__close-item" onClick={onClose} />
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <button type="button" className={itemDeleteModal} onClick={onDelete}>
            Delete Item
          </button>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
