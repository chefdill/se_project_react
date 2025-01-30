import React,{ useState, useEffect, useContext } from "react";

import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal =({
    closeActiveModal,
    activeModal,
    onSubmit,
    onCreateModal,
    handleEditProfile,
}) => {
    const [name, setName] = useState("");
    const { currentUser } = useContext(CurrentUserContext);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(currentUser?.name);
            setImageUrl(currentUser?.avatar);
        }
    }, [isOpen]);

    handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({name, avatar: imageUrl});
    };

    return (
        <ModalWithForm
        title="Change Profile Data"
        buttonText="Save Changes"
        isOpen={activeModal === "edit profile"}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
        onClick={onCreateModal}
        >
            <label>
                Name * 
                <input
                    className="modal__input"
                    type="text"
                    name="name"
                    minLength="1"
                    maxLength="30"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Avatar URL *
                <input
                    className="modal__input"
                    type="url"
                    name="link"
                    minLength="1"
                    placeholder="Avatar URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>
            <button type="submit" className="modal__save-changes-button">
                Save Changes
            </button>
        </ModalWithForm>
    )
}