import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteFormCardsPopup from "./DeleteFormCardsPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { registerApi, loginApi, getContent } from "../utils/Auth";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteFormCardsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSubmitSucceed, setIsSubmitSucceed] = useState(true);
  const [email, setEmail] = useState();
  const [cardForDelete, setCardForDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginSucceed, setIsLoginSuceed] = useState(true);
  const history = useHistory();

  useEffect(() => { 
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getCardsInfo()]) 
        .then(([dataUser, dataCards]) => { 
          setCurrentUser(dataUser); 
          setCards(dataCards); 
        }) 
        .catch((err) => { 
          console.log(err); 
        }); 
    }
    tokenCheck(); 
  }, [loggedIn]);

  function handleLogin(password, email) {
    loginApi(password, email)
      .then((res) => res.json())
      .then((res) => {
        if (!res.token) {
          setIsLoginSuceed(false);
          throw new Error("Missing jwt");
        }
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setIsLoginSuceed(true);
        setEmail(email);
        history.push("/react-mesto-auth");
      })
      .catch((error) => {
        console.log(error);
        setIsInfoTooltipOpen(true);
        setIsSubmitSucceed(false);
      });
  }

  
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    getContent(jwt)
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(true);
        history.push("/react-mesto-auth");
        setEmail(data.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleRegister(password, email) {
    registerApi(password, email)
      .then((res) => {
        if (res.status === 201) {
          handleSetIsInfoTooltipOpen(true);
        } else {
          handleSetIsInfoTooltipOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSetIsInfoTooltipOpen(isSubmitSucceed) {
    setIsSubmitSucceed(isSubmitSucceed);
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteFormCardsPopupOpen(false);
    setSelectedCard({});
  }

  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
    if (isSubmitSucceed) {
      history.push("/sign-in");
    }
  }

  function handleDeleteCardClick(card) {
    setCardForDelete(card);
    setDeleteFormCardsPopupOpen(true);
  }
  
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .changeInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((res) => {
          setCardsLike(res, card);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(card._id)
        .then((res) => {
          setCardsLike(res, card);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function setCardsLike(res, card) {
    setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
  }

  function handleCardDelete(card) {
    api
      .deleteCardById(card._id)
      .then(() => {
        const newCards = cards.filter((item) => {
          return item._id !== card._id;
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .createCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="App">
        <Header loggedIn={loggedIn} onLogout={handleLogout} email={email} />
        <Switch>
          <ProtectedRoute exact path="/react-mesto-auth" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
            <InfoTooltip
              name="info-tooltip"
              isSubmitSucceed={isSubmitSucceed}
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoToolTip}
            />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} isLoginSucceed={isLoginSucceed} />
            <InfoTooltip
              name="info-tooltip"
              isSubmitSucceed={isSubmitSucceed}
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoToolTip}
            />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <DeleteFormCardsPopup
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={cardForDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
