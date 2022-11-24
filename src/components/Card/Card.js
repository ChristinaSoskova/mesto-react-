import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    !isLiked ? "element__like-button" : "element__like-button_type_click"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__picture"
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="reset"
          className="element__delete-button"
          onClick={handleCardDelete}
        ></button>
      )}
      <div className="element__rectangle">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            className={`element__like-button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          ></button>
          <span className="element_like-meter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
