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
    )
}