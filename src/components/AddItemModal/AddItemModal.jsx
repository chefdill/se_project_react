import React, { useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";

function AddItemModal({ 
  onClose, 
  onAddItem, 
  activeModal, 
  isLoading
}) {


  
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleButtonChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={activeModal === "add-garment"}
      onClose={onClose}
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
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            value="warm"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            value="cold"
            name="weather"
            type="radio"
            className="modal__radio_button_input"
            onChange={handleButtonChange}
          />{" "}
          Cold
        </label>
      </fieldset>
      <button className="modal__submit">
          Add Garment
      </button>
    </ModalWithForm>
  );
}

export default AddItemModal;
