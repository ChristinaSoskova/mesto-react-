import edit from "../../images/editAvatar.png";
import React from "react";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватар пользователя"
          onClick={props.onEditAvatar}
        />
        <img
          className="profile__avatar-edit"
          src={edit}
          alt="Редактировать аватар пользователя"
        />
        <div className="intro">
          <div className="intro__text">
            <h1 className="intro__title">{currentUser.name}</h1>
            <p className="intro__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            aria-label="Редактировать"
            className="intro__edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
