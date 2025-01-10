import { useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";

const RegisterModal = ({
    handleCloseModal,
    onAddItem,
    isOpen,
    handleRegistration,
    onCreateModal,
    onLoginClick,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
}
