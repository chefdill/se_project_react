import { useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";

const RegisterModal = ({
    closeActiveModal,
    onAddItem,
    activeModal,
    handleRegistration,
    onCreateModal,
    onLoginClick,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const handleNameChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };
    const handleAvatarChange = (e) => {
        console.log(e.target.value);
        setAvatar(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(name, email, password, avatar);
    };

    return (
        <ModalWithForm
        title="Sign up"
        isOpen={activeModal}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
        >
            <label>
                Email *
                <input
                type="email"
                name="email"
                minLength="1"
                maxLength="30"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="email_input"
                />
            </label>
            <label>
                Password *
                <input
                type="password"
                name="password"
                minLength="1"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                />
            </label>
            <label>
                Avatar URL *
                <input
                type="url"
                name="avatar"
                placeholder="Avatar URL"
                value={avatar}
                onChange={handleAvatarChange}
                />
            </label>
            <div className="modal__button-div">
            <button type="submit" className="modal__button">
                Sign Up
            </button>
            <button type="button" className="modal__button" onClick={onLoginClick}>
                {" "}
                or Log In
            </button>
            </div>
        </ModalWithForm>
    );
};

export default RegisterModal;
