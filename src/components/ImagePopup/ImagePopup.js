import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen && "popup_opened"}`}>
      <div className="popup__img">
        <img
          className="popup__pic"
          src={`${props.card.link}`}
          alt={`${props.card.name}`}
        />
        <button
          type="button"
          className="popup__close-button popup__close-button_type_img"
          onClick={props.onClose}
        ></button>
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
