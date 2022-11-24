import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name="profileForm"
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
