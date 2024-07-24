import "./ItemModal.css";

function ItemModal({ activeModal, onClose, selectedCard, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_item">
        <button type="button" className="modal__close-item" onClick={onClose} />
        <img src={selectedCard.link} alt={selectedCard.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <button type="button" className="delete__modal" onClick={onDelete}>Delete Item</button>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
