import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangePlaceName(e) {
    setName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add-card"
      title="Новое место"
      button="Сохранить"
    >
      <div className="popup__text">
        <input
          id="text-input"
          type="text"
          className="popup__point_content_place popup__point"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangePlaceName}
        />
        <span className="text-input-error popup__item-error"></span>
        <input
          id="url-input"
          type="url"
          className="popup__point_content_alt popup__point"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangePlaceLink}
        />
        <span className="url-input-error popup__item-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
