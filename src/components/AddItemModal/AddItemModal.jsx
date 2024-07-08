import React, {useState} from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";


const AddItemModal = ({closeActiveModal, onAddItem, activeModal}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({name, link});
  }

    return (
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image Url"
              value={link}
              onChange={handleUrlChange}
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                name="weather"
                type="radio"
                className="modal__radio_button_input"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                name="weather"
                type="radio"
                className="modal__radio_button_input"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                name="weather"
                type="radio"
                className="modal__radio_button_input"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;