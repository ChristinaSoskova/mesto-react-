import "../../index.js";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import React, { useState, useEffect } from "react";
import api from "../../utils/Api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup.js";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import ProtectedRoute from "../ProtectedRoute.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import * as auth from "../../utils/Auth";

function App() {
  const [cards, setRenderCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [personEmail, setPersonEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isCheckPopupOpen, setIsCheckPopupOpen] = useState({
    isOpen: false,
    successful: false,
  });

  const location = useLocation();
  const history = useHistory();

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

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setPersonEmail("");
    setLoggedIn(false);
    history.push('/sign-in');
  };


  const closePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setIsCheckPopupOpen(false);
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


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setPersonEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);


  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((data) => {
        if (data.data._id) {
          setIsCheckPopupOpen({successful: true });
        }
      })
      .catch((err) => {
        setIsCheckPopupOpen({ isOpen: true});
        console.log(err);
        history.push("/sign-up");
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setPersonEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsCheckPopupOpen({ isOpen: true });
        console.log(err);
        history.push("/sign-in");
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

    api
      .toggleLike(card._id, isLiked)
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

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
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
      <Header
        loggedIn={loggedIn}
        email={personEmail}
        onSignOut={handleSignOut}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Route path="/sign-in" render={() => <Login onLogin={handleLogin} />} />
        <Route
          path="/sign-up"
          render={() => <Register onRegister={handleRegister} />}
        />
      </Switch>

      <Footer />

      <InfoTooltip onClose={closePopups} status={isCheckPopupOpen} />
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
