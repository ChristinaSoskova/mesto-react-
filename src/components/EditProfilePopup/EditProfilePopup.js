import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      fullname: name,
      profession: description,
    });
  }
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__text">
        <input
          type="text"
          className="popup__point_content_name popup__point"
          name="fullname"
          id="name-input"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleName}
          value={name}
        />
        <span className="name-input-error popup__item-error"></span>
        <input
          type="text"
          className="popup__point_content_job popup__point"
          name="profession"
          id="profile-input"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescription}
          value={description}
        />
        <span className="profile-input-error popup__item-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
