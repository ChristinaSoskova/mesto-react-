import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
   
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__text">
        <input
          id="avatar-input"
          type="url"
          className="popup__point_avatar popup__point"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__item-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
