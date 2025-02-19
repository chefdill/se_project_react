import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../../utils/contexts/CurrentUserContext";

function ItemModal({ 
  activeModal,
  onClose,
  selectedCard, 
  onDelete 
}) {
  const currentUser = useContext(CurrentUserContext);

  // Guard clause - if no selectedCard or no activeModal, don't render
  if (!selectedCard || activeModal !== "preview") {
    return null;
  }

  // Check if the current user owns the item
  const isOwn = currentUser && selectedCard && selectedCard.owner && 
    currentUser._id === selectedCard.owner;

  const itemDeleteModal = `modal__delete-button ${
    isOwn ? '' : 'modal__delete-button_hidden'
  }`;
  
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_item">
        <button type="button" className="modal__close-item" onClick={onClose} />
        <img
          src={selectedCard.imageUrl || ''}
          alt={selectedCard.name || ''}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name || ''}</h2>
          <button type="button" className={itemDeleteModal} onClick={onDelete}>
            Delete Item
          </button>
          <p className="modal__weather">Weather: {selectedCard.weather || ''}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
