import "../../index.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import React from "react";
import api from "../../utils/Api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup.js";

function App() {
  const avatarRef = React.useRef(null);
  const [cards, setRenderCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (cardInfo) => {
    setSelectedCard(cardInfo);
    setImagePopupOpen(!isImagePopupOpen);
  };

  const closePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setImagePopupOpen(false);
  };


  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .getEditUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closePopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarUrl) {
    setIsLoading(true);
    api
      .changeAvatar(avatarUrl)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closePopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setRenderCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((err) => {
      console.log(`${err}`);
    });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);

    api
      .getAddCard(card)
      .then((newCard) => {
        setRenderCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setRenderCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsItem) => {
        setRenderCards(cardsItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
        />
        <PopupWithForm
          isOpen={isDeleteCardPopupOpen}
          setActive={setIsDeleteCardPopupOpen}
          name="delete-card"
          title="Вы уверены?"
          button="Да"
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
          isOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>
  );
}

export default App;
