import "./ItemModal.css";

function ItemModal ({activeModal, onClose, card}) {
    return (
        <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
            <div className="modal__content modal__content_item">
            <button 
            type="button" 
            className="card__close"
            onClick={onClose} />
            <img src={card.link} alt="" className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            </div>
        </div>
    )
}

export default ItemModal;