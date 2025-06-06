import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, handleLogin, activeModal, onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email,
      password,
    });
  };
  return (
    <ModalWithForm
      title="Login"
      isOpen={activeModal === "login"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="1"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="modal__button-div">
        <button type="submit" className="modal__submit">
          Log In{" "}
        </button>
        <button type="button" className="modal__button" onClick={onSignUpClick}>
          {" "}
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
